# Система обучения (TutorialManager)

#convention #tutorial #ui

**Дата:** 2026-07-13
**Где:** `src/systems/TutorialManager.js`

## Решение

Панельное обучение с 2 уровнями:

### Зонные туторы (при первом входе в зону)
- Forest: WASD, SPACE, F, сундуки
- Arena: ДОДЖ (ПКМ), 3 фазы босса
- Mine: темнота, щиты, вагонетка, новые квесты
- Cave: големы/маги/пауки
- Village: хилеры, ассассины, NPC
- Hell: лава, комбо врагов

### Туторы врагов (при первой встрече)
- Shield: "Атакуй СБОКУ или СЗАДИ!"
- Healer: "Убей их первым!"
- Mage: "Следи за красными кругами!"
- Assassin: "Двигайся!"

### Туторы способностей
- Shadow Step: "SHIFT + Right Click — Phase through walls!"
- Time Slow: "CTRL + Right Click — Slow all enemies!"
- Vision: "You can now see invisible enemies"
- Map: "Press Map button to view all chapters"

## Визуал
- Тёмный overlay 70%
- Панель 520px с рамкой по цвету
- `setScrollFactor(0)` — всегда на экране
- Fade-in 0.5сек, SPACE/Click для закрытия

## Связано
- [[decision-reward-system]] — туторы для наград
