# PlayerSystem

#system #player

Управление персонажем игрока.

## Методы
| Метод | Описание |
|-------|----------|
| `createPlayer()` | Создать спрайт игрока |
| `recalcStats()` | Пересчитать все статы |
| `takeDamage(amount)` | Получить урон |
| `heal(amount)` | Лечение |
| `levelUp()` | Повысить уровень |
| `addItem(item)` | Добавить предмет в инвентарь |
| `useConsumable()` | Использовать расходник |

## Статы игрока
| Параметр | Базовое значение |
|----------|-----------------|
| HP | 100 (зависит от [[05-classes/_classes_index|класса]]) |
| DMG | 15-20 (зависит от класса) |
| SPD | 170-190 (зависит от класса) |
| MP | 50 + INT * 5 |

## Пересчёт статов
`recalcStats()` учитывает:
- Базовые статы класса
- Уровень (+10 HP, +2 к атрибутам)
- Экипировку (5 слотов + account слоты)
- Таланты ([[06-mechanics/Talents|class]] + [[06-mechanics/AccountTalents|account]])
- Баффы питомцев ([[06-mechanics/Pets|Pets]])
- Баффы книг ([[06-mechanics/Books|Bestiary/Material/Soul]])

## Инвентарь
- 20 слотов (расширяемо до 30)
- Макс стак: 99
- Экипировка: Hat, Mantle, Legs, Weapon, Accessory
- Account экипировка: 5 слотов (per-class)
- Item Lock: ПКМ toggle, auto-lock epic/legendary

---

> См. также: [[04-systems/CombatSystem|CombatSystem]], [[04-systems/SaveSystem|SaveSystem]], [[05-classes/_classes_index|Classes]]
