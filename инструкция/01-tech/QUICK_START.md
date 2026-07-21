# QUICK START — Быстрый старт для AI-агента

#quickstart #ai

> **Цель:** за 60 секунд понять контекст проекта и не сломать ничего.

## Что это

**Loot Realms** — браузерная PvE-игра (Phaser 3, Vite, JS ES6). 15 зон, 12 боссов, 3 класса, питомцы, крафт, мультиплеер на PeerJS. Все текстуры процедурные (Canvas 2D), без PNG.

## Где что лежит

| Нужно | Идти сюда |
|-------|-----------|
| Логика боя | `src/systems/CombatCore.js` (384 стр), `CombatFacade.js` (94 стр) |
| Логика игрока | `src/systems/PlayerSystem.js` (467 стр) |
| Заклинания | `src/systems/SpellSystem.js`, `SpellCast.js`, `SpellEffects.js` |
| Зоны (14 шт) | `src/zones/*Zone.js` (+ `*Boss.js`, `*Spawner.js`) |
| Конфиги (21 файл) | `src/config/*.js` — враги, предметы, квесты, баланс |
| Сохранения | `src/save.js` (localStorage) + `src/systems/SaveLoadSystem.js` |
| Мультиплеер | `src/multiplayer.js` (ghost-слои) + `src/systems/MultiplayerManager.js` |
| Текстуры | `src/textures/*.js` — процедурная генерация |
| Сцены | `src/scenes/GameScene.js` (727 стр) — главная, остальные по 150-620 |

## Архитектура (ключевое)

```
GameScene = thin delegation skeleton
├── Systems (все в src/systems/)
├── Zones (все в src/zones/, наследуют BaseZone)
└── Оставлено в GameScene: _handleInput(), _updateEnemies(), save/load
```

**BaseZone** (`src/systems/BaseZone.js`) — базовый класс всех зон. Обязательно вызывать `super.clear()` при cleanup.

## Запуск

```bash
npm run dev    # dev-сервер
npm run build  # production → dist/
```

## ТОП-5 правил

1. **Не трогай GameScene без запроса** — это delegation skeleton, не логика
2. **Все параметры в `src/config/`** — без магических чисел в коде
3. **Наследуй BaseZone** для новых зон, вызывай `super.clear()`
4. **Buff = SET + CONSUME** — если сеттится `_buff`, он должен читаться в формуле
5. **После `destroy()` → `= null`** — иначе orphaned ref → краш

## Anti-patterns (не повторять)

См. `AGENTS.md` → секция "Anti-Patterns".

## Что читать дальше

| Задача | Прочитать |
|--------|-----------|
| Исправить баг | `инструкция/14-knowledge/INDEX.md` → нужная запись |
| Добавить зону | `convention-zone-file-structure.md`, `convention-zone-cleanup.md` |
| Добавить врага | `src/config/enemies.js`, `convention-enemy-texture-template.md` |
| Добавить предмет | `src/config/items.js` |
| Мультиплеер | `decision-multiplayer-host-authoritative.md` |

---

*Актуально для v0.16.0. Не заменяет ORIENTATION.md — это только быстрый вход.*
