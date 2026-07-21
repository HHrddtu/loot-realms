# Баг-фиксы: карта, role icons, нав-панель

#bug #ui #navigation

**Дата:** 2026-07-13

## Баг 1: Карта не разблокировала нав-панель

**Где:** `VillageZone.js`, `HUD.js`
**Симптом:** После разговора со старейшиной и получения карты, кнопка Map не появлялась в нав-панели.

**Причина:** Нав-панель создавалась один раз при `create()` и не обновлялась при изменении `mapUnlocked`.

**Исправление:** Добавлен метод `HUD.refreshNavPanel()`, вызывается в `_giveMap()`.

## Баг 2: Role icons отсутствовали в 6 зонах

**Где:** Все Spawner файлы
**Симптом:** Над врагами в Village, Cave, Hell, Depths, Cursed, Tower, Castle не отображались значки ролей.

**Причина:** Role icons добавлялись только в `CombatCore.makeEnemy()` и `ShadowSpawner.js`. Остальные спавнеры создавали врагов напрямую без roleIcon.

**Исправление:** Добавлен roleIcon + shieldIcon во все 8 Spawner файлов.

## Баг 3: clearStroke не работает на Sprite

**Где:** `CombatCore.js:281`
**Симптом:** `Uncaught TypeError: enemy.clearStroke is not a function`

**Причина:** `setStrokeStyle` и `clearStroke` — методы `Phaser.GameObjects.Graphics`, а не `Sprite`.

**Исправление:** Заменено на `setTint(0xffffff)` / `clearTint()`.

## Связано
- [[convention-enemy-visual]] — визуальная дифференциация
- [[bug-mine-cart-knockback]] — другие баг-фиксы в этом патче
