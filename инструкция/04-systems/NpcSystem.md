# NpcSystem

#system #npc

Управление NPC, диалогами и квестами.

## Методы
| Метод | Описание |
|-------|----------|
| `spawnNPCs(zone)` | Создать NPC для зоны |
| `interactWithNpc()` | Взаимодействие с NPC |
| `showDialogue(text)` | Показать диалоговое окно |
| `showQuestLog()` | Журнал квестов |

## NPC по зонам
| Зона | NPC | Функция |
|------|-----|---------|
| [[02-zones/Village\|Village]] | Merchant | Магазин расходников |
| [[02-zones/Village\|Village]] | Child | Диалог, квесты |
| [[02-zones/Village\|Village]] | Innkeeper | Лечение |
| [[02-zones/Snowy\|Snowy]] | Campfire | Warmth Core |
| [[02-zones/Village\|Village]] (thriving) | Child | Диалог про Castle |
| [[02-zones/Village\|Village]] (thriving) | Merchant | Магазин |

## Диалоги
- Panel с портретом NPC
- Текст + кнопки действий
- Локализация EN/RU/DE

## Cart Ride
- Cutscene поездки на телеге (Village → Castle)
- fade to black → анимация → fade in

## Квесты
См. [[06-mechanics/Quests|Quests]]

---

> См. также: [[06-mechanics/Quests|Quests]], [[02-zones/_zones_index|Zones]], [[07-scenes/GameScene|GameScene]]
