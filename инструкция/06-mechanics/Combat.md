# Combat — Формулы боя

#mechanics #combat

## Урон
```js
base_damage = weapon.damage + str * 1.5
actual_damage = base_damage * (1 - target.defense / (target.defense + 100))
crit_damage = actual_damage * crit_damage_multiplier
final_damage = crit ? crit_damage : actual_damage
```

## Крит
```js
crit_chance = 0.05 + dex * 0.008 + lck * 0.005
crit_damage = 1.5 + (weapon.crit_bonus || 0)
```

## Уклонение
```js
dodge_chance = 0.02 + dex * 0.005
dodge_chance = Math.min(dodge_chance, 0.3)  // макс 30%
```

## Восстановление
- HP: 1/сек после боя (5 сек задержка)
- MP: 2/сек

## Зависимости
- [[04-systems/CombatSystem|CombatSystem]] — реализация
- [[05-classes/_classes_index|Classes]] — базовые статы
- [[06-mechanics/Loot|Loot]] — лут с мобов
- [[06-mechanics/Difficulty|Difficulty]] — множители сложности

---

> См. также: [[04-systems/CombatSystem|CombatSystem]], [[06-mechanics/Loot|Loot]], [[06-mechanics/Difficulty|Difficulty]]
