# Bug: Shield icon persists after enemy death

#bug #shield #cleanup

**Дата:** 2026-07-13
**Где:** Все зоны с врагами (CastleZone, DepthsZone, HellZone, CursedZone, ShadowZone, TowerZone, ThroneZone, VillageZone)
**Симптом:** 🛡 индикатор щита не исчезает когда враг умирает

## Корневая причина

При уничтожении врагов в zone cleanup код удалял `hpBg` и `hpFill`, но не `shieldIcon`. ВCombatLoot.js и BaseZone._destroyEnemies() shieldIcon уже удалялся, но в zone-specific cleanup коде — нет.

## Исправление

Добавлен `if (e.shieldIcon) e.shieldIcon.destroy();` во все zone файлы:
- CastleZone.js
- DepthsZone.js
- HellZone.js
- CursedZone.js
- ShadowZone.js
- TowerZone.js
- ThroneZone.js
- VillageZone.js

## Связано
- [[convention-hp-bar-depth]] — паттерн UI элементов врагов
