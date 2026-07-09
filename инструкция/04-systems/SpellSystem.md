# SpellSystem

#system #spell

Управление заклинаниями и снарядами.

## Методы
| Метод | Описание |
|-------|----------|
| `castSpell(slot)` | Активировать заклинание (Q/W/E) |
| `castProjectile(config)` | Запустить снаряд |
| `castShield()` | Создать щит |
| `castHeal()` | Лечение |
| `castPurify()` | Очищение (Angel) |

## Заклинания по классам

| Класс | Q | W | E |
|-------|-----|-----|-----|
| [[05-classes/Sage\|Sage]] | Fireball | Shield | Heal |
| [[05-classes/Alchemist\|Alchemist]] | Acid Flask | Iron Skin | Healing Potion |
| [[05-classes/Angel\|Angel]] | Soul Strike | Life Link | Purify |

## Механика
- Cooldown: per-spell
- Mana cost
- Damage scaling: INT * multiplier
- Снаряды: физические объекты с коллизией
- См. [[06-mechanics/Combat|Combat formulas]]

---

> См. также: [[05-classes/_classes_index|Classes]], [[06-mechanics/Combat|Combat]], [[04-systems/CombatSystem|CombatSystem]]
