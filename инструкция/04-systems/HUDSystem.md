# HUD — Интерфейс игрока

#system #hud

Отвечает за отрисовку HUD поверх игрового экрана. Реализован в `src/systems/HUD.js`.

## Элементы

### Top Bar (левый верхний угол)
| Элемент | Описание | Позиция |
|---------|----------|---------|
| heroPanelBg | Фоновая панель | (95, 44), 190×88 |
| heroIcon | Иконка класса | (30, 44) |
| heroClassName | Имя класса | (58, 16) |
| heroLevel | Уровень | (185, 16) |
| heroDmgText | Текст урона | (58, 32) |
| heroHpBar | HP бар | (58, 44), 126×10 |
| heroShieldFill | Щит (поверх HP) | синий, 0.4 alpha |
| heroHpText | Текст HP | (121, 44) |
| heroCorBar | Corruption бар | (80, 54), 104×5 |
| heroAccBar | Account EXP бар | (100, 64), 84×4 |
| heroHint | Подсказка | (58, 74) |
| diffText | Текст сложности | (185, 4) |
| zoneText | Название зоны | (400, 4) |
| goldText | Золото | (185, 86) |
| crystalText | Кристаллы | (185, 98) |
| petBtnText | Кнопка питомца | (185, 114) |

### Другие элементы
| Элемент | Позиция |
|---------|---------|
| hintText | (400, 588) — нижний центр |
| saveIndicator | (790, 18) — правый верхний |

### Spell Slots
- Q/W/E слоты заклинаний
- Сохранение позиции: `loot_realms_spell_slot_pos`

## Интеграция
- HUD обновляется каждый frame через UISystem
- Все элементы имеют `setScrollFactor(0)` (фиксированы на экране)
- Depth: 20-23 (поверх всего)

---

> См. также: [[04-systems/UISystem|UISystem]], [[05-classes/_classes_index|Classes]]
