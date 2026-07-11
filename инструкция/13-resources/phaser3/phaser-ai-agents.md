# Phaser + AI — Агенты и скиллы

#resource #phaser3 #ai

**Источник:** Сборник ресурсов по связке Phaser + AI-агенты
**Тип:** github, article, docs
**Дата добавления:** 2026-07-10
**Статус:** Изучено по URL

## Ключевые идеи

### 1. phaser4-gamedev — Готовые AI скиллы (ИЗУЧЕНО)
**github.com/Yakoub-ai/phaser4-gamedev** — Claude Code plugin + portable skills

**Что внутри:**
- **20 Portable Skills** — устанавливается через `npx skills add` для Codex, Claude Code, Cursor, OpenCode
- **4 Claude Code Agents:**
  - `phaser-architect` — дизайн архитектуры: сцены, конфиг, модули, state management
  - `phaser-coder` — основной coding agent: сцены, физика, инпут, анимации, твины, аудио, тайлмапы
  - `phaser-debugger` — диагностика: чёрный экран, невидимые спрайты, физика, анимации, миграция v3→v4
  - `phaser-asset-advisor` — спрайтшиты, атласы, аудио, Tiled, оптимизация
- **6 Slash Commands:** `/phaser-new`, `/phaser-run`, `/phaser-validate`, `/phaser-build`, `/phaser-gdd`, `/phaser-analyze`
- **2 Claude Hooks:** PreToolUse v3 API guard (ловит deprecated API до сохранения), SessionStart детектор
- **9 Game Archetypes:** platformer, top-down RPG, space shooter, match-3, tower defense, endless runner, card game, fighting, racing
- **Game Design Documents** — генерация 12-секционных GDD
- **Device Profiles** — оптимизация под iOS, Android, desktop, Capacitor, PWA

**Установка:**
```bash
# Список скиллов
npx skills add Yakoub-ai/phaser4-gamedev --list

# Установить все для Codex
npx skills add Yakoub-ai/phaser4-gamedev --skill '*' --agent codex --global

# Установить все для Claude Code
npx skills add Yakoub-ai/phaser4-gamedev --skill '*' --agent claude-code --global

# Установить все для всех агентов
npx skills add Yakoub-ai/phaser4-gamedev --all
```

**Ключевые скиллы:**
| Скилл | Что делает | Триггер |
|-------|-----------|---------|
| `/phaser-init` | Scaffold нового проекта (TypeScript + Vite) | "create a Phaser 4 game" |
| `/phaser-scene` | Создание сцен (Boot, Preloader, Menu, HUD, Pause) | "create a scene" |
| `/phaser-gameobj` | Спрайты, текст, графика, частицы, тайлмапы | "add a sprite" |
| `/phaser-physics` | Arcade/Matter.js физика, коллизии, группы | "add physics" |
| `/phaser-input` | Клавиатура, мышь, геймпад,.pointer | "add keyboard controls" |
| `/phaser-audio` | Звуки, музыка, audio sprites | "add sound" |
| `/phaser-tween` | Анимации, переходы, эффекты | "animate something" |
| `/phaser-tilemap` | Tiled тайлмапы, слои, коллизии | "load a tilemap" |
| `/phaser-particle` | Системы частиц, эмиттеры | "add particle effects" |
| `/phaser-camera` | Камера, следование, эффекты | "add camera follow" |
| `/phaser-hud` | HUD, параллельные сцены, overlay | "create a HUD" |
| `/phaser-state` | Registry, events, state management | "manage game state" |

**Для Loot Realms:**
- Установить скиллы локально: `npx skills add Yakoub-ai/phaser4-gamedev --skill '*' --agent codex --global`
- Использовать `/phaser-debugger` для диагностики багов
- Использовать `/phaser-physics` для коллизий в [[04-systems/CombatSystem|CombatSystem]]
- Использовать `/phaser-tween` для эффектов в [[04-systems/SpellSystem|SpellSystem]]

### 2. Статья Phaser Game Agent (ИЗУЧЕНО)
**phaser.io/news — How We Built the Phaser Game Agent**

**Ключевая методология:** не пихать знание об играх в движок, а хранить переиспользуемые **"блоки" (компоненты)**, названные по способности:
- "стреляет очередью" — не "Phaser sprites"
- "летающий корабль" — не "Phaser physics"
- "спавнит по волнам" — не "Phaser groups"

**Применение к Loot Realms:**
Знания в Obsidian организовать как ответы на **"что должен уметь агент"**:
| Способность | Компонент | Файл проекта |
|-------------|-----------|-------------|
| "Стреляет снарядами" | SpellProjectile | [[04-systems/SpellProjectile|SpellProjectile]] |
| "Спавнит врагов по волнам" | EnemySpawner | [[04-systems/EnemyAI|EnemyAI]] |
| "Управляет инвентарём" | InventoryPanel | [[04-systems/InventoryPanel|InventoryPanel]] |
| "Следует за игроком" | CameraFollow | [[07-scenes/GameScene|GameScene]] |
| "Наносит урон при касании" | DamageDealer | [[04-systems/CombatCore|CombatCore]] |

### 3. Официальные .agents/skills в репо Phaser
- В **github.com/phaserjs/phaser** лежит папка `.agents/skills/`
- Набор скиллов по: сценам, физике, инпуту, анимациям, тайлмапам, твинам, партиклам, камерам
- Можно скопировать себе как готовый скелет

## Практическое применение

### Установка phaser4-gamedev:
```bash
# Установить portable skills (без Claude Code plugin)
npx skills add Yakoub-ai/phaser4-gamedev --skill '*' --global
```

### Структура скиллов для копирования:
```
.skill/
  scenes/SKILL.md        → [[07-scenes/_scenes_index|Scenes]]
  physics/SKILL.md       → [[04-systems/CombatSystem|Combat]]
  input/SKILL.md         → [[04-systems/PlayerSystem|Player]]
  animations/SKILL.md    → [[06-mechanics/Animations|Animations]]
  tilemaps/SKILL.md      → [[02-zones/_zones_index|Zones]]
  tweens/SKILL.md        → [[04-systems/SpellSystem|Spells]]
  particles/SKILL.md     → [[04-systems/ParticleSystem|Particles]]
  cameras/SKILL.md       → [[07-scenes/GameScene|GameScene]]
```

## Ссылки

| Ресурс | URL | Назначение |
|--------|-----|-----------|
| Phaser4 GameDev | https://github.com/Yakoub-ai/phaser4-gamedev | 20 скиллов, 4 агента, 6 команд |
| Game Agent Article | https://phaser.io/news | Методология компонентов-способностей |
| Official .agents/skills | https://github.com/phaserjs/phaser | Официальные скиллы в репо |

## Связи

- [[инструкция/14-knowledge/INDEX|Knowledge Base]] — наша система знаний
- [[13-resources/phaser3/phaser-ecosystem|Phaser Ecosystem]] — базовые ресурсы
- [[04-systems/CombatSystem|CombatSystem]] — физика, коллизии
- [[04-systems/SpellSystem|SpellSystem]] — твины, эффекты
- [[04-systems/PlayerSystem|PlayerSystem]] — инпут, управление
- [[04-systems/SpellProjectile|SpellProjectile]] — стрельба снарядами
- [[06-mechanics/Animations|Animations]] — анимации
- [[02-zones/_zones_index|Zones]] — тайлмапы
