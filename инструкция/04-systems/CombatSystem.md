# CombatSystem

#system #combat

Управление боевыми взаимодействиями.

## Методы
| Метод                  | Описание                      |
| ---------------------- | ----------------------------- |
| `hitEnemy(enemy, dmg)` | Нанести урон врагу            |
| `hitChest(chest)`      | Разбить сундук                |
| `killEnemy(enemy)`     | Убить врага (exp, gold, loot) |
| `takeDamage(amount)`   | Игрок получает урон           |
| `checkLevelUp()`       | Проверить повышение уровня    |

## Формулы

### Урон
```js
base_damage = weapon.damage + str * 1.5
actual_damage = base_damage * (1 - target.defense / (target.defense + 100))
crit_damage = actual_damage * crit_damage_multiplier
final_damage = crit ? crit_damage : actual_damage
```

### Крит
```js
crit_chance = 0.05 + dex * 0.008 + lck * 0.005
crit_damage = 1.5 + (weapon.crit_bonus || 0)
```

### Уклонение
```js
dodge_chance = 0.02 + dex * 0.005
dodge_chance = Math.min(dodge_chance, 0.3) // макс 30%
```

## Интеграция
- Используется всеми [[02-zones/_zones_index|зонами]]
- Вызывает `recalcStats()` из [[04-systems/PlayerSystem|PlayerSystem]]
- См. [[06-mechanics/Combat|Combat mechanics]]

---

> См. также: [[06-mechanics/Combat|Combat formulas]], [[06-mechanics/Loot|Loot]], [[04-systems/PlayerSystem|PlayerSystem]]
