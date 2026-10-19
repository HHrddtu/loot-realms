# ПЛАН РАЗРАБОТКИ v0.18

#tasks #plan #state

> [!INFO] Связанные заметки
> - [[12-plans/TASK_QUEUE|TASK QUEUE]] — очередь задач
> - [[12-plans/PROJECT_STATE|PROJECT STATE]] — текущее состояние
> - [[12-plans/TODO_v017|TODO v0.17]] — предыдущий этап (выполнен)
> - [[12-plans/PLAN_ROADMAP|PLAN_ROADMAP]] — дорожная карта
> - [[index|MOC]] — карта содержимого

## 🔴 Группа A — Геймплей

- [x] **A1: Система Achievement/Badge** — ✅ уже реализована (`src/achievements.js`, `src/config/achievements.js`)
- [x] **A2: Новые зоны** — ✅ Desert (скорпион, змея, краб, ящерица, джинн; босс Sand Wyrm) и Swamp (черепаха, лягушка, комар, шаман, огонёк; босс Slime King). Опциональные зоны, вход через портал в деревне. Файлы: `src/zones/DesertZone.js`, `src/zones/SwampZone.js` + Spawner/Boss.
- [x] **A3: New Game+** — ✅ уже реализовано как Prestige (`src/systems/PrestigeSystem.js`, `src/config/prestige.js`)
- [x] **A4: Elite мобы** — ✅ уже реализованы (elite-модификаторы в Spawner'ах и CombatCore)
- [x] **A5: Система Buff/Debuff** — ✅ StatusIcons: панель баффов игрока (DMG/SPD/DEF/Crit/Lifesteal/Divine/Poison/Shield с таймерами) + ❄ slow-иконка над врагами. Дополнительно: статусы врагов `EnemyAI._applyStatus/_updateStatuses` (poison ☠ / burn 🔥 / freeze ❄ / stun ⚡ с DoT-уроном, tint-подсветкой и иконкой над врагом); подключены к Poison Cloud и сету Inferno (burnOnCrit). Файлы: `src/systems/StatusIcons.js`, `src/systems/EnemyAI.js`, `src/systems/SpellEffects.js`, `src/systems/CombatCore.js`

## 🟠 Группа B — UI/UX

- [ ] **B1: Миникарта** — маленькая карта в углу показывающая расположение врагов, NPC, сундуков
- [ ] **B2: Damage Numbers** — floating combat numbers (криты = больше, другой цвет)
- [ ] **B3: Health Bars над мобами** — HP бары над каждым врагом (видны при атаке/рядом)
- [ ] **B4: Boss HP Bar** — большой HP бар босса внизу экрана во время боя
- [ ] **B5: Loot Filter** — настройка какие предметы показывать в луте (по rarity)

## 🟡 Группа C — Визуал

- [ ] **C1: Particles переработка** — пыль, искры, кровь, магия — больше визуальных эффектов
- [ ] **C2: Screen Effects** — screen shake при критах, vignette при низком HP, flash при получении урона
- [ ] **C3: Day/Night Cycle** — смена дня и ночи влияет на спавн мобов и освещение
- [ ] **C4: Water/Lava Tiles** — интерактивные тайлы (вода замедляет, лава горит)

## 🟢 Группа D — Прогрессия

- [x] **D1: Крафт-рецепты расширение** — ✅ уже обширные (657 строк конфига)
- [x] **D2: Set Items** — ✅ уже реализованы (`src/config/sets.js`)
- [x] **D3: Enchanting** — ✅ зачарование оружия/брони за кристаллы: 7 зачарований (fire, frost, vital, stone, arcane, swift, lucky), вкладка «Enchant» в магазине деревни. Файлы: `src/config/enchanting.js`, изменения в VillageShop/InventoryUI/PlayerSystem.
- [x] **D4: Mastery System** — ✅ мастерство с 15 уровня: 5 нод на класс, отдельные очки мастерства за уровни, вкладка «MASTERY» в TalentScene. Файлы: `src/config/mastery.js`, `src/mastery.js`, изменения в TalentScene/PlayerSystem.

## 🔵 Группа E — Локализация

- [ ] **E1: Китайский (ZH)** — добавить 4-й язык
- [ ] **E2: Озвучка NPC** — текстовые звуки при диалогах (beep-beep звуки)
- [ ] **E3: Tooltip переводы** — всеOLTIPы на всех языках

## ⚫ Группа F — Мультиплеер

- [ ] **F1: Chat System** — текстовый чат между игроками
- [ ] **F2: Party System** — группа до 4 игроков, общий exp, shared loot
- [ ] **F3: Trading** — обмен предметами между игроками
