# SpellProjectile — Система снарядов

#system #spell #projectile

Система управления снарядами с object pooling. `src/systems/SpellProjectile.js`

## Архитектура
- Object pool: переиспользует неактивные снаряды
- Автоматическое отслеживание коллизий
- Масштабирование урона и скорости от статов

## Методы

### `_getPooledProjectile(texKey)`
Берёт снаряд из пула или создаёт новый.

### `_returnToPool(fb)`
Возвращает снаряд в пул (deactivate + disable physics).

### `_getFacingVelocity(speed, offset)`
Возвращает скорость и смещение по направлению взгляда игрока.

### `_castProjectile(spell)`
Создаёт и запускает снаряд с параметрами заклинания.

## Параметры
- `speed` — базовая скорость × множитель от spellSpeed
- `damage` — базовый урон × множитель от spellDamage
- Текстура: зависит от ключа заклинания (fireball, acid_flask, soul_strike)

## Фишки
- Pooling снижает нагрузку на GC
- Автоматическое tint/scale/setDepth
- Physics body подгоняется под размер текстуры

---

> См. также: [[04-systems/SpellSystem|SpellSystem]], [[06-mechanics/Spells|Spells]]
