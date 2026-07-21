# Система наград за боссов и NPC

#decision #rewards #abilities

**Дата:** 2026-07-13
**Где:** `src/systems/InputSystem.js`, `src/config/prestige.js`, `src/scenes/MapScene.js`, `src/systems/TutorialManager.js`

## Решение

Каждый босс даёт уникальную награду, привязанную к сюжету:

| Босс | Награда | Эффект |
|------|---------|--------|
| Giant Bat (Cave) | Дар Видения | Видеть невидимых врагов |
| Bandit Leader (Castle) | Карта | Новая вкладка в меню |
| Shadow King (Shadow) | Shadow Step | SHIFT+ПКМ — фазирование сквозь стены |
| Eternity Lord (Throne) | Замедление Времени | CTRL+ПКМ — все враги −50% скорости 3 сек |

## Механики

### Shadow Step
- Рывок 100px **сквозь стены** (gravity off на 0.2сек)
- Кулдаун: 5 сек
- Визуал: полупрозрачный герой + 3 призрака + фиолетовый tint

### Time Slow
- Все враги −50% скорости на 3 сек
- Кулдаун: 30 сек
- Визуал: синий overlay на экране + tint на врагах

### Дар Видения
- Невидимые враги: `alpha=0.15`, `tint=0xffffff`
- При атаке: reveal (`alpha=1`, `clearTint`)
- С Vision: невидимые враги видны нормально

## Карта (Map)
- 5 глав, 2-уровневый UI
- Unlock после квеста кастла + тайм-скип 20 лет
- Старейшина у фонтана даёт карту

## Связано
- [[game-design-review-critical]] — ревью определило награды
- [[bug-mine-cart-knockback]] — баг-фиксы в этом же патче
