# BossAI — Базовый AI боссов

#system #boss #ai

Базовый класс для управления AI боссов. `src/systems/BossAI.js`

## Методы

### `updateHpBar(boss, options)`
Обновляет HP bar босса.

Опции:
| Параметр | Описание |
|----------|----------|
| x, y | Позиция |
| width | Ширина HP bar |
| fillOffsetX | Смещение заполнения |
| nameText | Текст имени босса |
| nameYOffset | Смещение имени |
| show | Показать/скрыть |

## Использование
- Используется в `VillageBoss.js` и других зонах
- Статический класс (не требует new)

---

> См. также: [[03-bosses/_bosses_index|Bosses]], [[02-zones/_zones_index|Zones]]
