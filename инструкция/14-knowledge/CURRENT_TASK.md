# Current Task

## What We're Building
Исправление багов после ревью v2 + очистка AI-сгенерированного кода

## Status: In Progress

## Last Session
2026-07-18 — Исправлены баги Meadow зоны (NPC, floating text, декорации, сундуки) + баг cemetery gate в деревне. Обнаружен и удалён AI-сгенерированный код defense waves. Обновлена база знаний.

## Completed (с доказательствами)

| # | Задача | Файл:строка | Как верифицировать |
|---|--------|-------------|-------------------|
| 1 | NPC "Old Traveler" добавлен | `src/config/quests.js:291` (meadow_elder), `src/zones/MeadowZone.js:49` (npcKey) | NPC появляется в Meadow при загрузке зоны |
| 2 | Floating text cleanup | `src/systems/BaseZone.js:23` (clearFloatingTexts в clear()) | При смене зоны floating text исчезают |
| 3 | Враги/сундуки удалены из Meadow | `src/zones/MeadowZone.js:34` (s.enemies = группа без мобов) | В Meadow нет врагов и сундуков |
| 4 | LoreItem cleanup | `src/systems/BaseZone.js:24` (loreItems.cleanup() в clear()) | scroll_item спрайты не утекают между зонами |
| 5 | Tutorial persistence | `src/scenes/GameScene.js:369` (tutorialSeen = {}), `src/systems/SaveLoadSystem.js:69,187` (save/load) | TutorialManager.shown сохраняется в сейв |
| 6 | addChild → отдельный спрайт | Заменён в конкретных местах (не Phaser Sprite.addChild) | Нет ReferenceError при создании UI |
| 7 | AI-generated defense waves удалены | `src/zones/VillageZone.js` — нет defenseActive, defenseWaves | VillageZone работает без wave-системы |

## Known Issues

| Проблема | Локализация | Статус |
|----------|-------------|--------|
| Firebase Auth: баг ника (race condition onAuthStateChanged) | `src/auth.js` | ⚠️ Активен |
| LoginScene HTML инпуты нестабильны при resize | `src/scenes/LoginScene.js` | ⚠️ Активен |
| Multiplayer: нет offline fallback | `src/network.js` | ⚠️ Активен |

## Blockers
- Отсутствуют

## Next Steps
1. Протестировать полный flow: Meadow → Forest → Mine → Cave → Village → Cemetery → Hell → Snowy → Castle → Depths → Cursed → Shadow → Tower → Throne
2. Проверить что сейв/загрузка корректно работает с village state
3. Firebase Auth доработка (баг ника, offline fallback)
