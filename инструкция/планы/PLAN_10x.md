# Loot Realms: План достижения 10/10

## Текущая оценка: ~6/10

| Аспект | Оценка | Проблема |
|--------|--------|----------|
| Идея | 7/10 | Сильная концепция, но перегружена системами |
| Архитектура | 6/10 | Systems — правильно, но God files и tight coupling |
| Чистота кода | 5/10 | Дублирование, magic numbers, нет тестов |
| Реализация | 6/10 | Технически впечатляет, но VillageZone — хаос |
| Баланс | 5/10 | 12 систем прогрессии, инверсия кристаллов, крафт для 1 зоны |

---

## Фаза 1: Кодовая чистота (неделя 1-2)
_Убираем технический долг, чтобы всё остальное было легче делать_

### 1.1 Устранить дублирование зон
- [ ] Создать `src/zones/BaseZone.js` с базовым `clear()` (fireballs, projectiles, shield, enemies cleanup — один раз написать)
- [ ] Вынести overlap `player ↔ enemies` в фабричный метод `createEnemyOverlap(scene)`
- [ ] Вынести trap-damage логику в `createTrapOverlap(scene, trapGroup, dmg, kb)` — один вызов вместо копипасты
- [ ] Все 8 зон наследуют `extends BaseZone` или используют импортированные утилиты

### 1.2 Убить magic numbers
- [ ] Создать `src/config/balance.js`: `TRAP_DMG: {min:10, max:20}`, `KNOCKBACK_FORCE: 150`, `CHEST_HP: 40`, `ENEMY_WALK_SPEED: 50`, `INVINCIBLE_DURATION: 500`, `CAMERA_SHAKE: {intensity:100, duration:0.002}`, `AUTOSAVE_INTERVAL: 300000`, `PORTAL_DIST: 50`, `CAMPFIRE_DIST: 80`, `GATE_DIST: 70`
- [ ] Создать `src/config/ui.js`: `TOOLTIP_MAX_X: 780`, `TOOLTIP_MAX_Y: 590`, `HP_BAR_COLOR: 0xe74c3c`, `GOLD_COLOR: 0xf1c40f`, `BG_DARK: 0x0a0a1a` — все hex-литералы UI → константы
- [ ] Заменить все встраивания в коде на импорты из конфигов

### 1.3 Унифицировать стили кода
- [ ] Привести VillageZone, CastleZone, SnowyZone к паттерну `const s = this.scene` (5 зон уже так делают)
- [ ] Перенести forest boss AI из `GameScene.js:1539-1810` в `src/zones/ForestZone.js` или отдельный `src/systems/BossAI.js`
- [ ] Meadow → отдельный `MeadowZone.js`, Cemetery → вынести из VillageZone

### 1.4 Убрать delegate-методы
- [ ] 84 pass-through метода в GameScene (`attack()`, `takeDamage()`, `floatingText()` и т.д.) — зоны и системы должны вызывать `scene.combat.attack()` напрямую, не через сцену
- [ ] Удалить строки 1015-1114 из GameScene, обновить все вызовы

### 1.5 Рефакторинг SPACE-handler
- [ ] `GameScene.js:1216-1309` (93 строки else-if) → dispatch-таблица:
```js
const spaceActions = {
    forest: () => { ... },
    mine: () => { ... },
    village: () => { ... },
};
```

---

## Фаза 2: Тесты (неделя 2)
_Без тестов каждый рефакторинг — лотерея_

### 2.1 Подключить тестовый фреймворк
- [ ] `npm install -D vitest` (Vite-совместимый)
- [ ] Добавить `"test": "vitest"` в package.json

### 2.2 Написать unit-тесты для критичных систем
- [ ] `src/utils.js` — `rollZoneEquip()`, `rollZoneMaterial()` (drop rates)
- [ ] `src/config/gold.js` — gold drop formulas
- [ ] `src/systems/CombatSystem.js` — `hitEnemy()`, `hitChest()`, `hitStump()` damage math
- [ ] `src/systems/SpellSystem.js` — corruption calculations, cooldown logic
- [ ] `src/talents.js` — `getTalentCost()`, `unlockTalent()` tree logic
- [ ] `src/crafting.js` — recipe validation
- [ ] `src/save.js` — save/load serialization roundtrip

### 2.3 Интеграционные тесты
- [ ] Проверить что `ForestZone.setup()` создаёт все необходимые группы
- [ ] Проверить что `breakChest()` корректно обновляет state
- [ ] Проверить что `rollZoneEquip('cave')` возвращает предметы только из cave-пула

---

## Фаза 3: Консолидация прогрессии (неделя 3-4)
_12 систем → 5-6, каждая ощутимая_

### 3.1 Объединить 3 book-системы → "Tome of Knowledge"
- [ ] Создать `src/tome.js` — единая система с треками: `beast`, `soul`, `material`
- [ ] Каждый трек: 6 уровней, требует kill/collect count × difficulty_mult
- [ ] Sage: beast track → beast bonuses
- [ ] Angel: beast + soul → beast + soul bonuses
- [ ] Alchemist: beast + material → beast + material bonuses
- [ ] Один UI-экран `TomeScene` вместо BestiaryScene + SoulBookScene + MaterialBookScene
- [ ] Миграция: конвертировать сохранения (bestiary_data → tome.beast, soulBook_data → tome.soul, materialBook_data → tome.material)

### 3.2 Обрезать таланты на 50%
- [ ] С 23 нод на ветку → 12 нод
- [ ] Убрать +3%/+5% инкременты, заменить на квантовые скачки:
  - "Fireball +15% DMG" вместо 4 нод по +4%
  - "Killing an enemy heals 5% HP" вместо 3 ноды regen
  - "Shield reflects 20% damage" вместо "reflect 5%", "reflect 8%", "reflect 12%"
- [ ] Итого: 36 талантов на класс вместо 69. Каждый ощутим

### 3.3 Крафт для всех зон
- [ ] Добавить рецепты для Cave, Village, Hell, Snowy, Castle материалов
- [ ] Пример: Cave Stone + Cave Crystal → Cave Armor (+15 DEF)
- [ ] Пример: Hell Ash + Hell Ember → Hell Blade (+25 DMG, +fire damage)
- [ ] Итого: ~50 рецептов вместо 18

### 3.4 Расширить квесты
- [ ] Добавить 2-3 квеста на каждую зону (всего ~20 квестов вместо 6)
- [ ] Типы: kill X enemies, collect Y items, clear camp, defeat boss, discover secret
- [ ] Квесты дают permanent talent points + gold + rare item

---

## Фаза 4: Баланс и геймплей (неделя 4-5)
_Чтобы игрок чувствовал каждый стат и выбор_

### 4.1 Выровнять power curve
- [ ] Снаряжение → percentage-based (как таланты), чтобы оба масштабировались вместе
- [ ] Или: таланты → flat-based (как снаряжение), чтобы не перекрывали на хай-энде
- [ ] Рекомендация: снаряжение flat, таланты percentage — но ограничить таланты максимумом +50% total

### 4.2 Исправить кристальную инверсию
- [ ] Abyss cap: 200 → 150
- [ ] Normal cap: 200 → 100
- [ ] Hard cap: 50 → 80
- [ ] Abyss multiplier: 0.4x → 0.7x
- [ ] Итого: Abyss эффективнее для farming кристаллов, что логично

### 4.3 Дифференцировать ИИ мобов
- [ ] Tank: медленный, high HP, charge attack
- [ ] Assassin: быстрый, teleports, backstab bonus
- [ ] Archer: стоит на дистанции, dodge roll
- [ ] Healer: лечит nearby allies, приоритет на убийство
- [ ] Mage: AoE attack, telegraphed, requires dodging
- [ ] Сейчас роли скорее label, чем реальное поведение. AI должен отражать role

### 4.4 Spell-system рефакторинг
- [ ] Corruption decay: сделать zone-specific (в boss fight decay медленнее → больше pressure)
- [ ] Добавить corruption "surge" mechanic: при >80% corruption — +30% spell damage, но -20% defense
- [ ] Angel Holy Nova reduce corruption 30 → 15 (overpowered сейчас)

---

## Фаза 5: UI/UX полировка (неделя 5-6)
_Игра должна выглядеть и ощущаться как finished product_

### 5.1 Tutorial / Onboarding
- [ ] Первый запуск: серия подсказок (Arrow keys → SPACE → TAB → T)
- [ ] "Your next goal: defeat the Forest Treant" — направлять игрока
- [ ] Menu screen: показать "suggested next step" на основе текущего прогресса

### 5.2 HP bars над мобами
- [ ] Реализация уже в TODO_v018 — приоритет
- [ ] Добавить damage numbers (floating combat text) — уже есть, но сделать color-coded (white = normal, yellow = crit, red = player damage taken)

### 5.3 Achievement система
- [ ] 20-30 достижений: "First Blood", "Clear Forest", "Collect 100 Souls", "Craft Legendary", "Beat Abyss"
- [ ] Награды: cosmetic titles, unique skins, bonus gold
- [ ] Achievements →永久 account progress

### 5.4 Buff/Debuff визуал
- [ ] Иконки buff'ов под HP баром игрока
- [ ] Toxic/poison: green tint + "TOXIC" text
- [ ] Shield: blue glow
- [ ] Regen: green sparkle

### 5.5 Миникарта
- [ ] Corner minimap showing zone layout, enemy dots, chest markers
- [ ] Fog of war for unexplored areas

---

## Фаза 6: Контент (неделя 6-8)
_Игра должна иметь достаточно контента для 20+ часов_

### 6.1 Secrets и easter eggs
- [ ] Скрытые комнаты в каждой зоне (секретный passage → rare chest)
- [ ] Ancient Key → cart driver → Secret vendor
- [ ] Секретный босс: появляется только при определённых условиях

### 6.2 Endless / Infinite mode
- [ ] После Beat all bosses → "Endless Dungeon" с random zone modifiers
- [ ] Каждые 10 уровней: harder enemies + better loot
- [ ] Leaderboard

### 6.3 Daily/Weekly challenges
- [ ] Randomized zone layout + modifier
- [ ] "Today: Forest with +50% enemy speed, no healing"
- [ ] Rewards: unique cosmetics, bonus crystals

### 6.4 Новый класс: Necromancer
- [ ] Summon skeleton allies
- [ ] Life steal mechanics
- [ ] Corruption-heavy playstyle

---

## Фаза 7: Multiplayer полировка (неделя 7-8)

### 7.1 Co-op PvE
- [ ] 2-4 игрока в одной зоне
- [ ] Shared loot, shared XP
- [ ] Boss HP scales with player count

### 7.2 Trading
- [ ] Player-to-player item trading
- [ ] Trade window with confirmation

### 7.3 PvP Arena
- [ ] 1v1 duels
- [ ] Arena rating system

---

## Приоритизация

| Приоритет | Фаза | Время | Оценка до → после |
|-----------|------|-------|-------------------|
| 1 (критично) | Фаза 1: Чистота кода | 2 недели | 5/10 → 7/10 |
| 2 (критично) | Фаза 2: Тесты | 3 дня | 5/10 → 7/10 |
| 3 (важно) | Фаза 3: Консолидация прогрессии | 2 недели | 7/10 → 8/10 |
| 4 (важно) | Фаза 4: Баланс | 1 неделя | 7/10 → 8/10 |
| 5 (полировка) | Фаза 5: UI/UX | 2 недели | 8/10 → 9/10 |
| 6 (контент) | Фаза 6: Контент | 3 недели | 9/10 → 9.5/10 |
| 7 (мультиплеер) | Фаза 7: Multiplayer | 2 недели | 9.5/10 → 10/10 |

**Итого: ~12 недель полной работы до 10/10.**

---

## Чего делать НЕ стоит

- Не добавляй новые зоны до консолидации текущих
- Не добавляй 4-й класс до объединения book-систем
- Не делай PvP до стабильного PvE
- Не оптимизируй рендер до готового gameplay

---

## Стартовое действие

Начать с Фазы 1.3 (унификация стилей) + 1.2 (magic numbers) — быстрый win, который сразу делает код чище.
