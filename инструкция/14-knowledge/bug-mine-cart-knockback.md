# Bug: Mine cart knockback pushes player up

#bug #mine #physics

**Дата:** 2026-07-13
**Где:** `src/zones/MineZone.js:374`
**Симптом:** Игрок улетает вверх при столкновении с вагонеткой в Mine

## Корневая причина

Mine cart knockback использовал фиксированный Y-вектор `-150`:
```js
s.player.body.setVelocity(knockDir * 200, -150);
```

Это всегда толкало игрока **вверх**, независимо от позиции вагонетки.

## Исправление

Заменено на angle-based knockback:
```js
const angle = Math.atan2(s.player.y - cart.y, s.player.x - cart.x);
const knockX = Math.cos(angle) * 200;
const knockY = Math.min(0, Math.sin(angle) * 150);
s.player.body.setVelocity(knockX, knockY);
```

- Knockback идёт **от вагонетки по углу**
- `Math.min(0, ...)` не даёт улететь вверх
- Аналогично исправлен knockback для врагов

## Связано
- [[bug-mine-cart-knockback]] — похожий паттерн
- [[convention-enemy-texture-template]] — визуал врагов
