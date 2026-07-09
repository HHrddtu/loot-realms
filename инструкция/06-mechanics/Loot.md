# Loot — Система лута

#mechanics #loot

## Редкости

| Редкость | Цвет | Множитель статов | Шанс |
|----------|------|-----------------|------|
| Common | Серый | ×1.0 | 60% |
| Uncommon | Зелёный | ×1.2 | 25% |
| Rare | Синий | ×1.5 | 10% |
| Epic | Фиолетовый | ×2.0 | 4% |
| Legendary | Оранжевый | ×3.0 | 0.9% |
| Mythic | Красный | ×5.0 | 0.1% |

## Формула шанса
```js
modified_chance = base_chance * (1 + luck * 0.01) * difficulty_mult
```

## Типы предметов
| Тип | Слот | Влияние |
|-----|------|---------|
| Weapon | Руки | Урон |
| Shield | Левая рука | Защита |
| Helmet | Голова | HP, Защита |
| Armor | Тело | HP, Защита |
| Gloves | Руки | Атрибуты |
| Boots | Ноги | Скорость |
| Ring | Палец | Атрибуты |
| Amulet | Шея | Атрибуты |
| Relic | Спец | Особые эффекты |

## Item Lock
- ПКМ toggle
- Auto-lock epic/legendary

## Продажа
- Shift+Click в инвентаре
- 50% от цены редкости

---

> См. также: [[04-systems/CombatSystem|CombatSystem]], [[10-economy/_economy_index|Economy]], [[06-mechanics/Difficulty|Difficulty]]
