# GAME DESIGN

#design #balance

> [!INFO] GAME_DESIGN — исторический документ.
> **Сейчас все разделы разнесены по специализированным заметкам.**
> Используй [[index|MOC]] для навигации.

## Ссылки на актуальные заметки

| Раздел | Где находится |
|--------|--------------|
| **Формулы боя** (урон, криты, уклонение) | [[06-mechanics/Combat\|Combat mechanics]] |
| **Редкости и лут** | [[06-mechanics/Loot\|Loot mechanics]] |
| **Сложности** (множители, разблокировка) | [[06-mechanics/Difficulty\|Difficulty mechanics]] |
| **Боссы** (статы, абилки) | [[03-bosses/_bosses_index\|Все боссы]] |
| **Зоны** (мобы, биомы) | [[02-zones/_zones_index\|Все зоны]] |
| **Классы** | [[05-classes/_classes_index\|Все классы]] |
| **Инвентарь и экипировка** | [[04-systems/PlayerSystem\|PlayerSystem]] |
| **Экономика** | [[10-economy/_economy_index\|Economy]] |
| **Прогрессия** | [[06-mechanics/Progression\|Progression]] |
| **Сохранения** | [[04-systems/SaveSystem\|SaveSystem]] |
| **Квесты** | [[06-mechanics/Quests\|Quests]] |
| **Крафт** | [[06-mechanics/Crafting\|Crafting]] |
| **Питомцы** | [[06-mechanics/Pets\|Pets]] |
| **Таланты** | [[06-mechanics/Talents\|Talents]] |

---

## Базовые характеристики игрока

### Уровень
- Максимальный уровень: 100
- Формула: `EXP_required = 100 * level^1.5`
- Каждый уровень: +10 HP, +2 к атрибутам

### Атрибуты
| Атрибут | Влияние |
|---------|---------|
| STR | +1.5 урон/очко |
| DEX | +0.8% крит/очко, +0.5% уклонения/очко |
| INT | +2 урон заклинаний/очко, +5 MP/очко |
| VIT | +15 HP/очко |
| LCK | +1% шанс редкого лута/очко, +0.5% крита/очко |

### Здоровье
- Базовое: 100 HP. Реген: 1 HP/сек после боя (5 сек задержка)
- Мана: 50 MP. Реген: 2 MP/сек

---

## Формулы (исторические)
```javascript
crit_chance = 0.05 + dex * 0.008 + lck * 0.005
crit_damage = 1.5 + (weapon.crit_bonus || 0)
dodge_chance = 0.02 + dex * 0.005  // макс 30%
base_damage = weapon.damage + str * 1.5
actual_damage = base_damage * (1 - target.defense / (target.defense + 100))
```

---

> 🔗 **Актуальные механики:** [[06-mechanics/Combat|Combat]], [[06-mechanics/Loot|Loot]], [[06-mechanics/Difficulty|Difficulty]]
