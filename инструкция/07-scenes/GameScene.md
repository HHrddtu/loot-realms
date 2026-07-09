# GameScene — Основная игровая сцена

#scene #gamescene

Центральная сцена игры. ~1102 строки, thin delegation skeleton.

## Ответственность
- create(): инициализация всех систем и зон
- update(): _handleInput + делегирование системам/зонам
- _handleInput(): весь ввод (клавиатура, мышь)
- _updateEnemies() + _updateBoss(): AI мобов/боссов
- _setupMeadow() + _clearMeadow(): луг (не вынесен)
- save/load

## Делегирование

### Systems (constructor)
| Система | Файл |
|---------|------|
| [[04-systems/CombatSystem\|CombatSystem]] | `src/systems/CombatSystem.js` |
| [[04-systems/PlayerSystem\|PlayerSystem]] | `src/systems/PlayerSystem.js` |
| [[04-systems/SpellSystem\|SpellSystem]] | `src/systems/SpellSystem.js` |
| [[04-systems/UISystem\|UISystem]] | `src/systems/UISystem.js` |
| [[04-systems/NpcSystem\|NpcSystem]] | `src/systems/NpcSystem.js` |

### Zones (create)
| Зона | Файл |
|------|------|
| [[02-zones/Forest\|ForestZone]] | `src/zones/ForestZone.js` |
| [[02-zones/Arena\|ArenaZone]] | `src/zones/ArenaZone.js` |
| [[02-zones/Mine\|MineZone]] | `src/zones/MineZone.js` |
| [[02-zones/Cave\|CaveZone]] | `src/zones/CaveZone.js` |
| [[02-zones/Village\|VillageZone]] | `src/zones/VillageZone.js` |
| [[02-zones/Hell\|HellZone]] | `src/zones/HellZone.js` |
| [[02-zones/Castle\|CastleZone]] | `src/zones/CastleZone.js` |

## Ключевые поля
- `this.difficulty` — строка ("Normal"/"Hard"/etc)
- `this.diffMulti` — объект множителей { hp, dmg, exp }
- `this.zone` — текущая зона
- `this.currentZone` — текущий экземпляр зоны

---

> См. также: [[04-systems/_systems_index|Systems]], [[02-zones/_zones_index|Zones]]
