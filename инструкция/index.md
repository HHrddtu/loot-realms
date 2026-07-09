# Loot Realms — Карта знаний

#moc #navigation

Это корневая карта навигации (MOC) по документации проекта. Используй граф связей для навигации.

---

## 🗺 Зоны

| # | Зона | Босс | Связи |
|---|------|------|-------|
| 1 | [[02-zones/Meadow\|Meadow]] | — | → [[02-zones/Forest\|Forest]] |
| 2 | [[02-zones/Forest\|Forest]] | [[03-bosses/Treant\|Treant]] | → [[02-zones/Arena\|Arena]], → [[02-zones/Mine\|Mine]] |
| 3 | [[02-zones/Arena\|Arena]] | [[03-bosses/SkeletonLord\|Skeleton Lord]] | ← Forest |
| 4 | [[02-zones/Mine\|Mine]] | [[03-bosses/SkeletonLord\|Skeleton Lord]] | → [[02-zones/Cave\|Cave]] |
| 5 | [[02-zones/Cave\|Cave]] | [[03-bosses/GiantBat\|Giant Bat]] | → [[02-zones/Village\|Village]] |
| 6 | [[02-zones/Village\|Village]] | [[03-bosses/PurpleDemon\|Purple Demon]] | → [[02-zones/Cemetery\|Cemetery]], → [[02-zones/Snowy\|Snowy]] |
| 7 | [[02-zones/Cemetery\|Cemetery]] | — | → [[02-zones/Hell\|Hell]] |
| 8 | [[02-zones/Hell\|Hell]] | [[03-bosses/RedDemon\|Red Demon]] | → [[02-zones/Snowy\|Snowy]] |
| 9 | [[02-zones/Snowy\|Snowy]] | [[03-bosses/IceSpirit\|Ice Spirit]] | → [[02-zones/Village\|Village]] (восстановленная) |
| 10 | [[02-zones/Castle\|Castle]] | [[03-bosses/BanditLeader\|Bandit Leader]] | ← Village (после восстановления) |

См. [[02-zones/_zones_index|Все зоны]]

---

## ⚔ Боссы

- [[03-bosses/Treant|Treant]] — Forest
- [[03-bosses/SkeletonLord|Skeleton Lord]] — Arena + Mine
- [[03-bosses/GiantBat|Giant Bat]] — Cave
- [[03-bosses/PurpleDemon|Purple Demon]] — Village (Cemetery)
- [[03-bosses/RedDemon|Red Demon]] — Hell
- [[03-bosses/IceSpirit|Ice Spirit]] — Snowy
- [[03-bosses/BanditLeader|Bandit Leader]] — Castle

См. [[03-bosses/_bosses_index|Все боссы]]

---

## 🧠 Системы

- [[04-systems/CombatSystem|CombatSystem]] — атака, урон, криты
- [[04-systems/PlayerSystem|PlayerSystem]] — игрок, статы, инвентарь
- [[04-systems/SpellSystem|SpellSystem]] — заклинания, снаряды
- [[04-systems/UISystem|UISystem]] — HUD, инвентарь, тултипы
- [[04-systems/NpcSystem|NpcSystem]] — NPC, диалоги, квесты
- [[04-systems/PetSystem|PetSystem]] — питомцы
- [[04-systems/SaveSystem|SaveSystem]] — сохранения
- [[04-systems/HUDSystem|HUD]] — HUD интерфейс игрока
- [[04-systems/BossAI|BossAI]] — базовый AI боссов
- [[04-systems/SpellProjectile|SpellProjectile]] — снаряды с object pool

См. [[04-systems/_systems_index|Все системы]]

---

## 🧙 Классы

- [[05-classes/Sage|Sage]] — маг, 100 HP, 20 DMG
- [[05-classes/Alchemist|Alchemist]] — алхимик, 110 HP, 18 DMG
- [[05-classes/Angel|Angel]] — ангел, 90 HP, 15 DMG

См. [[05-classes/_classes_index|Все классы]]

---

## 📐 Механики

- [[06-mechanics/Combat|Combat formulas]]
- [[06-mechanics/Spells|Spells]] — все заклинания
- [[06-mechanics/Animations|Animations]] — все анимации
- [[06-mechanics/Loot|Loot & Rarity]]
- [[06-mechanics/Talents|Class Talents]]
- [[06-mechanics/AccountTalents|Account Talents]]
- [[06-mechanics/Crafting|Crafting]]
- [[06-mechanics/Quests|Quests]]
- [[06-mechanics/Pets|Pets]] (12 шт)
- [[06-mechanics/Books|Books (Bestiary/Material/Soul)]]
- [[06-mechanics/Difficulty|Difficulty]]
- [[06-mechanics/Progression|Progression]]
- [[06-mechanics/SetItems|Set Items]] — сетовые бонусы
- [[06-mechanics/Economy|Economy]]
- [[06-mechanics/Multiplayer|Multiplayer]]

---

## 🏗 Архитектура

- [[01-tech/TECH_STACK|Tech Stack]]
- [[01-tech/ARCHITECTURE|Architecture]]
- [[01-tech/FILE_TREE|File Tree]]
- [[01-tech/SAVE_FORMAT|Save Format]]

---

## 🎬 Сцены

См. [[07-scenes/_scenes_index|Все сцены]]

---

## 🐛 Баги

См. [[11-bugs/_bugs_index|Все баги]]

---

## 📋 Планы

См. [[12-plans/_plans_index|Все планы]]

---

> [!INFO] Как пользоваться
> Используй `Ctrl+O` (Cmd+O) для быстрого поиска заметок.
> Используй граф (Graph View) для визуализации связей.
> Теги: `#zone`, `#boss`, `#system`, `#class`, `#mechanics`, `#scene`, `#tech`, `#plan`, `#bug`
