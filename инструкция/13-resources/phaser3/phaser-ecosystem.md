# Phaser — База и экосистема

#resource #phaser3

**Источник:** Сборник официальных ресурсов Phaser
**Тип:** docs, hub, examples
**Дата добавления:** 2026-07-10
**Статус:** Изучено по URL

## Ключевые идеи

### phaser.io/learn — Хаб туториалов (ИЗУЧЕНО)
- **Getting Started** — установка Phaser Launcher, код-редактор, медиа-браузер, создание первого проекта
- **Making your first Game** — создание игры с нуля: игрок, платформы, звёзды, враги
- **5000+ Code Examples** — на examples сайте, можно скачать локально
- **Phaser Sandbox** — браузерный редактор с последними версиями Phaser, можно форкать и шарить
- **Hundreds of Tutorials** — комьюнити-туториалы: кастомные game objects, шейдеры
- **Developer Logs** — 11 лет логов, туториалы и структурные гайды
- **GameDev Academy** — 11 курсов, 175 уроков, 28+ часов видео с загружаемыми файлами

### phaser.io/tutorials/getting-started-phaser3 (ИЗУЧЕНО)
- **Phaser — HTML5 game framework** для браузеров (desktop, mobile, Discord, SnapChat, Facebook)
- **2D only** — нет 3D рендеринга/физики из коробки
- **JavaScript или TypeScript** — все примеры на JS, TS definitions доступны
- **Нужен локальный веб-сервер** — `file://` блокирует загрузку ресурсов из-за безопасности браузера. Под `file://` нет концепции доменов, нет серверной безопасности. JavaScript под `file://` может загружать любые файлы и отправлять их куда угодно — поэтому браузеры блокируют всё
- **Chromium blog** — детали про security restrictions

### labs.phaser.io (ИЗУЧЕНО)
- 2000+ рабочих примеров с редактированием в браузере
- Практически самый ценный ресурс для быстрого поиска "как сделать X"
- Сайт — зеркало репо `phaserjs/examples`

### github.com/phaserjs/examples (ИЗУЧЕНО)
- Все исходники примеров с labs.phaser.io
- Можно клонировать локально: `npm install` → `npm start` → http-server
- `npm run update` — пересобрать `examples.json` при добавлении нового примера
- **Лиценза:** код — MIT, ассеты — НЕТ (нельзя использовать в коммерческих играх)
- По умолчанию serving latest dev version Phaser 4

### docs.phaser.io
- Актуальная официальная документация (старая на photonstorm.github.io устарела на 4+ года)
- 403 при прямом fetch — нужен браузер

### Phaser 4
- Новый WebGL-рендерер "Beam"
- API почти совместим с v3, но под капотом всё другое
- Если проект на v3 — учитывать миграцию

## Практическое применение

### Локальные ресурсы (удалены из проекта для оптимизации):

> **Внимание:** Examples и Docs удалены из проекта чтобы opencode не индексировал 7000+ файлов.
> При необходимости переклонировать (см. команды ниже).

**Solution 2: Phaser Examples**
```bash
git clone --depth 1 https://github.com/phaserjs/examples.git <path>
```
- 5163 JS-файлов, 3 версии (3.24, 3.55, 3.86)
- Поиск: `grep -r "keyword" <path>/public/3.86/src/`

**Solution 1: TypeDoc (API Docs)**
```bash
git clone --depth 1 --branch v3.80.0 https://github.com/phaserjs/phaser.git <path>
cd <path>
typedoc ./types/phaser.d.ts --out ./docs --includeVersion --skipErrorChecking
```
- 1971 файл, 62MB, полный API-справочник

**Solution 3: .agents/skills в репо Phaser**
- 404 — папка `.agents/skills` не найдена в main ветке
- **Альтернатива:** phaser4-gamedev (Yakoub-ai) — 20 готовых скиллов
cd phaser
npx typedoc ./types/*.d.ts --out docs --includeVersion --skipErrorChecking
```
- Генерирует полный API-справочник из TypeScript-типов
- Можно указать `--theme markdown` для .md формата (для Obsidian)

**Solution 4: Старые доки (запасной вариант)**
- https://photonstorm.github.io/phaser3-docs/ — статичный HTML
- Заморожена на Phaser 3.51 (4+ года)
- Только для базовых концепций, не для новых API

### Для Loot Realms:
- **grep по examples** — первый заход при поиске "как сделать X"
- **phaser.io/learn** — начать с "Making your first Game"
- **GameDev Academy** — 11 курсов для углублённого изучения
- **Важно:** всегда использовать локальный сервер (`npm run dev`), не `file://`

### Конкретные системы:
- [[04-systems/CombatSystem|CombatSystem]] — коллизии, физика → `grep -r "collider" 09-enemies/phaser-examples/`
- [[04-systems/SpellSystem|SpellSystem]] — твины → `grep -r "tween" 09-enemies/phaser-examples/`
- [[04-systems/PlayerSystem|PlayerSystem]] — инпут → `grep -r "keyboard" 09-enemies/phaser-examples/`
- [[04-systems/HUDSystem|HUDSystem]] — UI → `grep -r "text" 09-enemies/phaser-examples/`
- [[04-systems/ParticleSystem|ParticleSystem]] — частицы → `grep -r "particle" 09-enemies/phaser-examples/`
- [[07-scenes/GameScene|GameScene]] — lifecycle → `grep -r "create()" 09-enemies/phaser-examples/`

## Ссылки

| Ресурс | URL | Назначение | Статус |
|--------|-----|-----------|--------|
| Learn Hub | https://phaser.io/learn | Хаб туториалов, 5000+ примеров | ✅ Изучено |
| Getting Started | https://phaser.io/tutorials/getting-started-phaser3 | Установка окружения | ✅ Изучено |
| GameDev Academy | https://phaser.io/learn | 11 курсов, 28+ часов | ✅ Изучено |
| Examples (LOKALNO) | `09-enemies/phaser-examples/` | 5163 JS-файлов, 3 версии | ✅ Клонировано |
| Docs (генерация) | TypeDoc из TypeScript-типов | Полный API-справочник | ⏳ Не сделано |
| GitHub Examples | https://github.com/phaserjs/examples | Исходники (MIT код) | ✅ Изучено |
| Docs | https://docs.phaser.io | Актуальная документация | ❌ 403 |
| Old Docs | https://photonstorm.github.io/phaser3-docs/ | Phaser 3.51 (устаревшие) | ⚠️ Запасной |
| GitHub Phaser | https://github.com/phaserjs/phaser | Исходники движка | ✅ Изучено |

## Связи

- [[01-tech/TECH_STACK|Tech Stack]] — Phaser 3.80 как основной движок
- [[01-tech/ARCHITECTURE|Architecture]] — структура сцен и систем
- [[04-systems/CombatSystem|CombatSystem]] — Arcade Physics, коллизии
- [[04-systems/SpellSystem|SpellSystem]] — твины, эффекты
- [[04-systems/PlayerSystem|PlayerSystem]] — инпут, анимации
- [[04-systems/HUDSystem|HUDSystem]] — UI паттерны
- [[13-resources/phaser3/phaser-ai-agents|Phaser + AI]] — AI скиллы для Phaser
