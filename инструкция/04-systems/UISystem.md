# UISystem

#system #ui

Управление пользовательским интерфейсом.

## Методы
| Метод | Описание |
|-------|----------|
| `drawHUD()` | HP/MP бары, золото, кристаллы |
| `openInventory()` | Открыть инвентарь |
| `closeInventory()` | Закрыть инвентарь |
| `drawInventory()` | Отрисовать сетку инвентаря |
| `showTooltip(item)` | Показать тултип предмета |
| `showPause()` | Меню паузы |

## Элементы HUD
- HP Bar (слева сверху)
- MP Bar (под HP)
- Gold / Crystals
- Кнопки: Инвентарь (I), Статы (TAB), Таланты (T), Книга (B), Квесты (N)
- Pet HUD (кнопка питомца)
- Consumable slot (клик для использования)
- Minimap (TODO v0.18)

## Инвентарь
- Сетка предметов
- ПКМ: Lock/Unlock
- Shift+Click: продать (50% цены)
- Drag-drop: экипировка

## Тултипы
- Показывают: имя, редкость (цвет), статы, описание
- Позиционирование: избегает краёв экрана

---

> См. также: [[04-systems/PlayerSystem|PlayerSystem]], [[06-mechanics/Loot|Loot]], [[07-scenes/_scenes_index|Scenes]]
