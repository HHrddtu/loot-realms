<#
  WatchBot — наблюдатель за Telegram-ботом opencode.
  Если демон бота завис (процесс жив, но нет соединений к Telegram API),
  перезапускает его через opencode-telegram.

  Лёгкий: одна проверка каждые 300 сек, потребляет почти ничего.

  Запуск:
    powershell -NoProfile -ExecutionPolicy Bypass -File scripts\watch-bot.ps1
#>

param(
    [int]$IntervalSec = 300,
    [int]$StrikeLimit = 2
)

$ErrorActionPreference = "Continue"
$LogFile = Join-Path $PSScriptRoot "watch-bot.log"

function Write-Log([string]$msg) {
    $line = "[{0}] {1}" -f (Get-Date -Format "yyyy-MM-dd HH:mm:ss"), $msg
    Write-Host $line
    Add-Content -Path $LogFile -Value $line -Encoding UTF8
}

function Get-BotPid {
    $p = Get-CimInstance Win32_Process -Filter "Name='node.exe'" -ErrorAction SilentlyContinue |
        Where-Object { $_.CommandLine -like "*@grinev*opencode-telegram-bot*" } |
        Select-Object -First 1
    if ($p) { return [int]$p.ProcessId }
    return 0
}

function Test-BotAlive([int]$botProcId) {
    $conns = Get-NetTCPConnection -OwningProcess $botProcId -State Established -ErrorAction SilentlyContinue
    return ($conns | Where-Object { $_.RemotePort -eq 443 }).Count -gt 0
}

Write-Log "=== WatchBot START (interval=${IntervalSec}s) ==="

$strikes = 0

while ($true) {
    try {
        $botPid = Get-BotPid
        if ($botPid -eq 0) {
            # процесс полностью отсутствует — пользователь сам его убирал, не трогаем
            $strikes = 0
            Write-Log "Демон бота не запущен (процесс отсутствует) — не вмешиваюсь"
        }
        elseif (Test-BotAlive $botPid) {
            $strikes = 0
            Write-Log "OK: бот жив (PID $botPid), соединения есть"
        }
        else {
            $strikes++
            Write-Log "Завис (PID $botPid, соединений нет). Засчитано: $strikes/$StrikeLimit"
            if ($strikes -ge $StrikeLimit) {
                Write-Log "Перезапускаю бота..."
                & opencode-telegram stop 2>&1 | Out-Null
                Start-Sleep -Seconds 3
                & opencode-telegram start --daemon 2>&1 | Out-Null
                Write-Log "Перезапуск выполнен"
                $strikes = 0
            }
        }
    }
    catch {
        Write-Log "Ошибка: $($_.Exception.Message)"
    }
    Start-Sleep -Seconds $IntervalSec
}

Write-Log "=== WatchBot STOPPED ==="
