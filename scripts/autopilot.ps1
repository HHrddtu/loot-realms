<#
  AutoPilot — вечный двигатель для Loot Realms
  Читает панель управления AUTO_CONTROL.md и очередь AUTO_TASKS.md,
  выполняет задачи через headless opencode server, коммитит результат.

  Управление: измените FLAG в AUTO_CONTROL.md на RUN / PAUSE / STOP.
  Лимит токенов — TOKEN_BUDGET в AUTO_CONTROL.md.
#>

param(
    [int]$IntervalSec = 1800,
    [string]$ServerUrl = "http://localhost:4096",
    [string]$ServerUser = "opencode",
    [string]$ServerPass = $env:OPENCODE_SERVER_PASSWORD,
    [string]$ProjectDir = $PSScriptRoot.Replace("\scripts", "")
)

$ErrorActionPreference = "Stop"
$ControlFile = Join-Path $ProjectDir "AUTO_CONTROL.md"
$TasksFile   = Join-Path $ProjectDir "AUTO_TASKS.md"
$LogFile     = Join-Path $ProjectDir "scripts\autopilot.log"

function Write-Log([string]$msg) {
    $line = "[{0}] {1}" -f (Get-Date -Format "yyyy-MM-dd HH:mm:ss"), $msg
    Write-Host $line
    Add-Content -Path $LogFile -Value $line -Encoding UTF8
}

function Get-AuthHeader {
    $pair = "$ServerUser`:$ServerPass"
    $bytes = [Text.Encoding]::ASCII.GetBytes($pair)
    return "Basic " + [Convert]::ToBase64String($bytes)
}

function Read-Control {
    if (-not (Test-Path $ControlFile)) { throw "AUTO_CONTROL.md not found" }
    $raw = Get-Content $ControlFile -Raw -Encoding UTF8
    $cfg = @{ FLAG = "RUN"; TOKEN_BUDGET = 0; TOKENS_SPENT = 0; MODEL = "" }
    if ($raw -match "FLAG:\s*(\w+)") { $cfg.FLAG = $Matches[1] }
    if ($raw -match "TOKEN_BUDGET:\s*(\d+)") { $cfg.TOKEN_BUDGET = [long]$Matches[1] }
    if ($raw -match "TOKENS_SPENT:\s*(\d+)") { $cfg.TOKENS_SPENT = [long]$Matches[1] }
    if ($raw -match "MODEL:\s*(\S+)") { $cfg.MODEL = $Matches[1] }
    return $cfg
}

function Write-Control([hashtable]$cfg, [string]$status) {
    $content = @"
# AutoPilot — Панель управления

## Флаг состояния
FLAG: $($cfg.FLAG)
## Бюджет токенов
TOKEN_BUDGET: $($cfg.TOKEN_BUDGET)
TOKENS_SPENT: $($cfg.TOKENS_SPENT)
## Модель
MODEL: $($cfg.MODEL)
## Статус последнего цикла
LAST_RUN: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
$status
"@
    Set-Content -Path $ControlFile -Value $content -Encoding UTF8
}

function Get-NextTask {
    if (-not (Test-Path $TasksFile)) { return $null }
    $lines = Get-Content $TasksFile -Encoding UTF8
    foreach ($line in $lines) {
        if ($line -match "^\s*- \[ \]\s+(.+)$") {
            return @{ Index = [array]::IndexOf($lines, $line); Text = $Matches[1] }
        }
    }
    return $null
}

function Set-TaskDone([int]$index) {
    $lines = Get-Content $TasksFile -Encoding UTF8
    $lines[$index] = $lines[$index] -replace "- \[ \]", "- [x]"
    Set-Content -Path $TasksFile -Value $lines -Encoding UTF8
}

function New-Session([string]$model) {
    $body = @{ title = "autopilot" }
    if ($model -match "^(?<provider>[^/]+)/(?<id>.+)$") {
        $body.model = @{ id = $Matches.id; providerID = $Matches.provider }
    }
    $json = $body | ConvertTo-Json -Depth 4
    $bytes = [Text.Encoding]::UTF8.GetBytes($json)
    $r = Invoke-RestMethod -Uri "$ServerUrl/session" -Method Post -Headers @{ Authorization = (Get-AuthHeader) } -ContentType "application/json; charset=utf-8" -Body $bytes
    return $r.id
}

function Send-Prompt([string]$sessionId, [string]$text) {
    $body = @{ parts = @(@{ type = "text"; text = $text }) } | ConvertTo-Json -Depth 6
    $bytes = [Text.Encoding]::UTF8.GetBytes($body)
    $r = Invoke-RestMethod -Uri "$ServerUrl/session/$sessionId/prompt_async" -Method Post -Headers @{ Authorization = (Get-AuthHeader) } -ContentType "application/json; charset=utf-8" -Body $bytes
    return $r
}

function Wait-Session([string]$sessionId) {
    $timeout = [DateTime]::Now.AddMinutes(120)
    $lastCount = 0
    $quietRounds = 0
    while ([DateTime]::Now -lt $timeout) {
        $msgs = Invoke-RestMethod -Uri "$ServerUrl/session/$sessionId/message" -Headers @{ Authorization = (Get-AuthHeader) }
        $done = $msgs | Where-Object { $_.info.role -eq "assistant" -and $_.info.time.completed }
        if ($done) { return $done }
        $count = @($msgs).Count
        if ($count -eq $lastCount) { $quietRounds++ } else { $quietRounds = 0 }
        $lastCount = $count
        if ($quietRounds -ge 6) {
            Write-Log "Сессия $sessionId без прогресса 60 сек — считаю зависшей"
            return $null
        }
        Start-Sleep -Seconds 10
    }
    return $null
}

function Get-SessionTokens([string]$sessionId) {
    $s = Invoke-RestMethod -Uri "$ServerUrl/session/$sessionId" -Headers @{ Authorization = (Get-AuthHeader) }
    $t = $s.tokens
    if (-not $t) { return 0 }
    $total = 0
    foreach ($k in @("input","output","reasoning")) { if ($t.$k) { $total += $t.$k } }
    if ($t.cache) { $total += $t.cache.read + $t.cache.write }
    return [long]$total
}

Write-Log "=== AutoPilot START (interval=${IntervalSec}s, server=${ServerUrl}) ==="

# убеждаемся что мы в ветке autopilot
Push-Location $ProjectDir
$currentBranch = git rev-parse --abbrev-ref HEAD 2>$null
if ($currentBranch -ne "autopilot") {
    $existing = git branch --list autopilot 2>$null
    if ($existing) { git checkout autopilot 2>&1 | Out-Null } else { git checkout -b autopilot 2>&1 | Out-Null }
    Write-Log "Switched to branch: autopilot"
}
Pop-Location

while ($true) {
    try {
        $cfg = Read-Control

        if ($cfg.FLAG -eq "STOP") {
            Write-Log "FLAG=STOP — останавливаюсь"
            break
        }

        if ($cfg.FLAG -eq "PAUSE") {
            Write-Log "FLAG=PAUSE — сплю $IntervalSec сек"
            Start-Sleep -Seconds $IntervalSec
            continue
        }

        if ($cfg.TOKEN_BUDGET -gt 0 -and $cfg.TOKENS_SPENT -ge $cfg.TOKEN_BUDGET) {
            Write-Log "Бюджет исчерпан ($($cfg.TOKENS_SPENT) >= $($cfg.TOKEN_BUDGET)) — STOP"
            $cfg.FLAG = "STOP"
            Write-Control $cfg ""
            break
        }

        $task = Get-NextTask
        if (-not $task) {
            Write-Log "Очередь пуста — сплю $IntervalSec сек"
            Start-Sleep -Seconds $IntervalSec
            continue
        }

        Write-Log "Задача: $($task.Text)"

        # защита от параллельного запуска — смотрим, нет ли уже busy-сессии автопилота
        $sessionId = New-Session $cfg.MODEL
        Write-Log "Сессия: $sessionId"

        $prompt = @"
Проект Loot Realms. Ты автономный агент улучшения кода.
Правила (обязательно):
1. Соблюдай AGENTS.md проекта.
2. НЕ добавляй новые игровые механики без явного запроса. Только рефакторинг, баги, документация, тесты, оптимизация.
3. Задача из очереди: $($task.Text)
4. Когда закончишь, кратко опиши что сделал.
Работай в текущей директории.
"@

        Send-Prompt $sessionId $prompt | Out-Null
        $done = Wait-Session $sessionId
        if (-not $done) {
            Write-Log "Таймаут сессии $sessionId — помечаю как пропущенную"
            $cfg.FLAG = "PAUSE"
            Write-Control $cfg "STATUS: timeout on $sessionId"
            continue
        }

        $tokens = Get-SessionTokens $sessionId
        $cfg.TOKENS_SPENT += $tokens
        Write-Log "Задача завершена. Токены: $tokens, всего: $($cfg.TOKENS_SPENT)/$($cfg.TOKEN_BUDGET)"

        Set-TaskDone $task.Index

        # коммит результата
        Push-Location $ProjectDir
        git add -A 2>&1 | Out-Null
        $dirty = git diff --cached --quiet; if ($LASTEXITCODE -eq 1) {
            git commit -m "autopilot: $($task.Text)" 2>&1 | Out-Null
            Write-Log "Коммит создан"
        } else {
            Write-Log "Изменений нет — коммит пропущен"
        }
        Pop-Location

        Write-Control $cfg "STATUS: ok | task: $($task.Text) | tokens: $tokens"
        Write-Log "Сплю $IntervalSec сек до следующей задачи"
        Start-Sleep -Seconds $IntervalSec
    }
    catch {
        Write-Log "Ошибка: $($_.Exception.Message)"
        Start-Sleep -Seconds 60
    }
}

Write-Log "=== AutoPilot STOPPED ==="
