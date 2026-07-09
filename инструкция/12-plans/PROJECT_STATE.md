# PROJECT STATE — v0.16.0+

#state #tasks #design

> [!INFO] Этот файл — краткий обзор. Все детали разнесены по специализированным заметкам.

## Статус: Пит-система полностью реализована. Баланс кристаллов. Типы питомцев работают.

---

## Ссылки на подробные заметки

| Раздел | Где смотреть |
|--------|-------------|
| **Зоны** | [[02-zones/_zones_index\|Все зоны]] (10 отдельных файлов) |
| **Боссы** | [[03-bosses/_bosses_index\|Все боссы]] (7 отдельных файлов) |
| **Системы** | [[04-systems/_systems_index\|Все системы]] (8 файлов) |
| **Классы** | [[05-classes/_classes_index\|Все классы]] (3 файла) |
| **Механики** | [[06-mechanics/_mechanics_index\|Все механики]] (12 файлов) |
| **Сцены** | [[07-scenes/_scenes_index\|Все сцены]] (12 файлов) |
| **Архитектура** | [[01-tech/ARCHITECTURE\|Architecture]] |
| **Технологии** | [[01-tech/TECH_STACK\|Tech Stack]] |
| **Файлы** | [[01-tech/FILE_TREE\|File Tree]] |
| **Экономика** | [[10-economy/_economy_index\|Economy]] |
| **Баги** | [[11-bugs/_bugs_index\|Баг-трекер]] |
| **Планы** | [[12-plans/_plans_index\|Все планы]] |

---

## Сводка

### Зоны (порядок прохождения)
```
Meadow → Forest → Mine → Cave → Village → Cemetery → Hell → Snowy → Castle
```
Подробно: [[02-zones/_zones_index]]

### Классы
| Класс | HP | DMG | SPD |
|-------|-----|-----|-----|
| Sage | 100 | 20 | 180 |
| Alchemist | 110 | 18 | 170 |
| Angel | 90 | 15 | 190 |

Подробно: [[05-classes/_classes_index]]

### Питомцы (v0.16.0)
12 питомцев, 4 редкости, 4 типа. 3 кейса: Wooden (30 кр), Iron (80 кр), Golden (200 кр).
Подробно: [[06-mechanics/Pets]] и [[04-systems/PetSystem]]

### Управление
| Клавиша | Действие |
|---------|----------|
| Стрелки | Движение |
| SPACE | Атака / Портал / NPC / Лестница |
| Q/W/E | Заклинания |
| TAB | Статы |
| T | Таланты |
| B | Книга знаний |

### Account Equipment
5 слотов: Hat, Mantle, Legs, Weapon, Accessory
+ Account-wide: 5 слотов
+ Item Lock: ПКМ toggle

---

## Текущие известные ограничения
- Bundle: 2.3MB (Phaser + весь код)
- Нет code splitting
- Дублирование AI логики по зонам
- Нет звуков collector/tank питомцев

## Следующие шаги
1. Daily quests (кристаллы за повторяемые задания)
2. Achievement system
3. Класс-специфичные реворки
4. Collector pet: авто-подбор лута
5. Bundle optimization / code splitting

---

> См. подробности в специализированных заметках через [[index|MOC]]
