# Set Items — Сеты Экипировки

#mechanics #sets #items

Система сетовых бонусов: при экипировке нескольких предметов одного сета игрок получает дополнительные бонусы.

## Сеты

### Forest Wanderer (Странник Леса)
| Параметр | Значение |
|----------|---------|
| Части | rusty_sword, leather_armor, wood_ring |

| Кол-во | Бонус | Эффекты |
|--------|-------|---------|
| 2 | Forest Touch | hpPercent+5, regenFlat+1 |
| 3 | Forest Guardian | hpPercent+10, damagePercent+5, regenFlat+2 |

### Iron Warden (Железный Страж)
| Параметр | Значение |
|----------|---------|
| Части | iron_sword, iron_armor, ruby_ring |

| Кол-во | Бонус | Эффекты |
|--------|-------|---------|
| 2 | Iron Will | damageReduction+5, hpPercent+8 |
| 3 | Iron Fortress | damageReduction+15, hpPercent+15, damagePercent+10 |

### Flame Slayer (Пламенный Убийца)
| Параметр | Значение |
|----------|---------|
| Части | flame_blade, dragon_scale, sapphire_ring |

| Кол-во | Бонус | Эффекты |
|--------|-------|---------|
| 2 | Flame Power | damagePercent+15, critPercent+5 |
| 3 | Inferno | damagePercent+25, critPercent+10, spellPercent+10 |

### Dragon Knight (Драконий Рыцарь)
| Параметр | Значение |
|----------|---------|
| Части | flame_blade, dragon_scale, ruby_ring, crown |

| Кол-во | Бонус | Эффекты |
|--------|-------|---------|
| 2 | Dragon Blood | hpPercent+15, damagePercent+10 |
| 3 | Dragon Heart | hpPercent+25, damagePercent+20, critPercent+8 |
| 4 | Dragon Soul | hpPercent+35, damagePercent+30, critPercent+15, spellPercent+15 |

### Class Mastery Sets (Account Equipment)

| Сет | Кол-во | Бонус | Эффекты |
|-----|--------|-------|---------|
| **Sage Mastery** | 3 | Scholar | spellPercent+10, critPercent+5 |
| | 5 | Grand Sage | spellPercent+25, critPercent+12, corruptionMax+20 |
| **Alchemist Mastery** | 3 | Transmuter | spellPercent+8, hpPercent+10 |
| | 5 | Philosopher | spellPercent+20, damagePercent+15, hpPercent+20 |
| **Angel Mastery** | 3 | Holy Light | regenPercent+5, dodgePercent+5 |
| | 5 | Divine Avatar | hpPercent+20, regenPercent+10, corruptionMax+25, spellPercent+15 |

## Код
- `src/config/sets.js` — EQUIPMENT_SETS, getSetBonuses(), getSetInfo()
- UI: show active set bonuses in inventory (v0.17+)

## Интеграция
- `recalcStats()` в PlayerSystem учитывает сетовые бонусы
- Отображение: активные сеты показываются в инвентаре
- Прогресс: X/Y частей надето

---

> См. также: [[10-economy/Items|Items]], [[04-systems/PlayerSystem|PlayerSystem]]
