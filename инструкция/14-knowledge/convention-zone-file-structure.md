# Конвенция: Структура файлов зоны

#convention #zone #structure

**Дата:** 2026-07-21

## Summary

Каждая зона (кроме Meadow) реализуется как отдельный класс в `src/zones/`. Стандартная структура: Zone + Spawner + Boss (+ опционально Projectiles). Это позволяет изолировать логику зон и не засорять GameScene.

## Правило

Стандартный набор файлов для зоны:

```
src/zones/
  ZoneNameZone.js        — основная логика зоны (setup, clear, update)
  ZoneNameSpawner.js     — спавн врагов и сундуков
  ZoneNameBoss.js        — AI босса
  ZoneNameProjectiles.js — (опционально) снаряды зоны
```

## Примеры

| Зона | Zone | Spawner | Boss | Projectiles |
|------|------|---------|------|-------------|
| Village | VillageZone.js | VillageSpawner.js | VillageBoss.js | VillageProjectiles.js |
| Cave | CaveZone.js | CaveSpawner.js | CaveBoss.js | — |
| Hell | HellZone.js | HellSpawner.js | HellBoss.js | — |
| Depths | DepthsZone.js | DepthsSpawner.js | DepthsBoss.js | — |
| Castle | CastleZone.js | — | — | — |

## Обязательные методы Zone

```js
export class ForestZone extends BaseZone {
    constructor(scene) {
        super(scene);          // ← вызов BaseZone
    }

    setup() {
        // Создание врагов, сундуков, портала, NPC
    }

    update(time, delta) {
        // Обновление логики зоны каждый кадр
    }

    _destroyZoneSpecific() {
        // Cleanup специфичных для зоны объектов
    }
}
```

## Интеграция с GameScene

```js
// GameScene.js — create():
import { ForestZone } from '../zones/ForestZone.js';
this.forestZone = new ForestZone(this);

// GameScene.js — update():
if (this.zone === 'forest') this.forestZone.update(time, delta);

// Смена зоны:
this.forestZone.clear();         // cleanup
this.zone = 'mine';
this.mineZone.setup();           // setup новой зоны
```

## Meadow — исключение

Meadow не вынесен в отдельный класс. `_setupMeadow()` и `_clearMeadow()` остаются в GameScene. Это осознанное решение — Meadow слишком проста (только трава и точка старта).

## Когда применяется

- Добавление новой зоны
- Рефакторинг существующей зоны
- Вынос логики из GameScene

## Связи

- [[convention-zone-cleanup]] — как корректно чистить зону
- [[01-tech/ARCHITECTURE|Architecture]] — делегирование GameScene → Zones
- [[02-zones/_zones_index|Все зоны]]
