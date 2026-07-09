# FILE TREE

#structure #tech

> [!INFO] Связанные заметки
> - [[TECHNICAL_DESIGN]] — архитектура
> - [[PROJECT_STATE]] — текущее состояние
> - [[README]] — карта содержимого

## Текущая структура (v0.14.0)

```
WebGame/
├── index.html                (favicon: inline SVG sword)
├── package.json              (phaser ^3.80.0, vite ^8.0.16)
├── vite.config.js
├── .gitignore                (node_modules/, dist/)
├── .github/workflows/
│   └── deploy.yml            (GitHub Actions → gh-pages)
├── node_modules/
├── dist/                     (сборка для деплоя, НЕ коммитится)
├── инструкция.txt            (правила разработки — ОБЯЗАТЕЛЬНО ЧИТАТЬ)
├── GAME_VISION.md            (видение игры)
├── GAME_DESIGN.md            (механики, формулы, баланс)
├── TECH_STACK.md             (выбранные технологии)
├── TECHNICAL_DESIGN.md       (архитектура проекта)
├── PROJECT_STATE.md          (текущее состояние — АКТУАЛЬНОЕ)
├── FILE_TREE.md              (этот файл)
├── TASK_QUEUE.md             (очередь задач)
├── PLAN_BOSS.md              (план босса Трент — реализован)
├── PLAN_PROGRESSION.md       (план прогрессии — не реализован)
├── PLAN_SNOWY_VILLAGE.md     (план Snowy Village — реализован v0.11.0)
├── PLAN_ROADMAP.md           (рефакторинг + питы + магазин + мультиплеер — v0.12.0+)
├── BUGFIX_CAVE_STAIRS.md     (баги v0.9.8: cave stairs ghost + account equip save)
└── src/
    ├── main.js               (27 строк — 9 сцен + loadLang)
    ├── i18n.js               (700+ строк — локализация EN/RU/DE)
    ├── classes.js            (96 строк — Sage/Alchemist/Angel)
    ├── bestiary.js           (~154 строк — Bestiary логика)
    ├── materialBook.js       (~120 строк — Material Book логика)
    ├── soulBook.js           (~130 строк — Soul Book логика)
    ├── quests.js             (~131 строк — квестовая логика)
    ├── talents.js            (~700 строк — 47 талантов на класс × 9 веток)
    ├── accountTalents.js     (~180 строк — 70 account талантов)
    ├── crafting.js           (108 строк — логика крафта)
    ├── utils.js              (~45 строк — утилиты)
    ├── sound.js              (168 строк — процедурные звуки)
    ├── save.js               (99 строк — LocalStorage + миграция)
    ├── config/               (НОВОЕ v0.12.0)
    │   ├── index.js          (реэкспорт всех данных)
    │   ├── difficulties.js   (DIFF_MULT — множители по сложностям)
    │   ├── enemies.js        (ENEMY_TYPES, MINE/CAVE/VILLAGE/HELL/SNOWY_ENEMY_TYPES, BANDIT_TYPES)
    │   ├── bosses.js         (BOSS_TYPES, ARENA/MINE/CAVE/VILLAGE/HELL/SNOWY_BOSS, BANDIT_LEADER_BOSS)
    │   ├── zones.js          (ZONE_CONFIGS, VILLAGE_CAMP_POSITIONS, HELL_CAMP_POSITIONS, SNOWY_VILLAGE_CAMP_POSITIONS, CASTLE_* constants)
    │   ├── items.js          (ALL_ITEMS — шлемы, броня, оружие, зелья, лут, реликвии, CASTLE_KEY)
    │   ├── spells.js         (SPELLS, SPELL_UPGRADES, CLASS_SPELLS)
    │   ├── crafting.js       (CRAFT_RECIPES, MATERIAL_ITEMS)
    │   ├── quests.js         (QUESTS — 6 квестов с наградами)
    │   ├── difficulty.js     (DIFFICULTY_KEYS, DIFFICULTY_UNLOCK_MAP)
    │   ├── rarity.js         (RARITY_COLORS, RARITY_MULT, RARITY_STARS)
    │   └── gold.js           (НОВОЕ v0.14.0 — GOLD_DROPS, CONSUMABLES, SHOP_*, SELL_PRICE_RATIO)
    ├── textures/             (НОВОЕ v0.12.0)
    │   ├── index.js          (generateAllTextures — вызывает все генераторы)
    │   ├── zones.js          (meadow, forest, mine, cave, hell, village, snowy, cemetery, castle_ground, castle_door, castle_bars, castle_stairs)
    │   ├── player.js         (hero, walk cycle, attack)
    │   ├── npcs.js           (merchant, blacksmith, elder, child_npc, sage, alchemist, angel, snowy_npc_*, villager_rescued, village_shop)
    │   ├── items.js          (loot textures, equipment, potions, gems)
    │   ├── enemies.js        (goblin, skeleton, wolf, spider, bat, golem, wraith, elemental, mage, imp, frozen_*, bandit_melee/ranger/elite)
    │   ├── bosses.js         (treant, skeleton_lord, giant_bat, demon, demon_minion, purple_demon, ice_spirit, ice_shard, bandit_leader)
    │   ├── expansion.js      (village textures: house, corpse, garden, fence, cemetery gate)
    │   ├── effects.js        (projectiles: fireball, ice_shard, purify, corruption, shield, heal)
    │   ├── animations.js     (slash, hit, level_up, arrow, meteor, fire_wave, frost_wave, blizzard)
    │   ├── snowy.js          (snow textures, frozen trees, ice textures)
    │   └── mine.js           (mine textures: rocks, rails, crystals, chests)
    ├── systems/              (НОВОЕ v0.12.0)
    │   ├── CombatSystem.js   (attack, hitEnemy, killEnemy, takeDamage, makeEnemy, dealAttackDamage, checkLevelUp)
    │   ├── PlayerSystem.js   (createPlayer, recalcStats, inventory management, levelup, heal, shield)
    │   ├── SpellSystem.js    (castSpell, castProjectile, castShield, castHeal, castPurify, castCorruption)
    │   ├── UISystem.js       (HUD, inventory, stats panel, tooltips, pause, crafting overlay, bestiary overlay, map buttons)
    │   └── NpcSystem.js      (NPC spawning, proximity, dialogue, quest log, cart ride, campfire interaction)
    ├── zones/                (НОВОЕ v0.12.0)
    │   ├── ForestZone.js     (setup, clear, update: enemies, stumps, portal, Trent)
    │   ├── ArenaZone.js      (setup, clear, update: arena, skeleton lord boss, exit)
    │   ├── MineZone.js       (setup, clear, update: mine, rocks, crystals, chests, boss arena, skeleton lord)
    │   ├── CaveZone.js       (setup, clear, update: cave, corridor, giant bat boss, stairs)
    │   ├── VillageZone.js    (setup, clear, update: village, camps, decor, cemetery, hell boss, child NPC, snowy village, castle child NPC, castle skip)
    │   ├── HellZone.js       (setup, clear, update: hell, lava, camps, red demon boss, imps, portals)
    │   ├── SnowyZone.js      (unused standalone — snowy village handled by VillageZone)
    │   └── CastleZone.js     (НОВОЕ v0.13.0 — 7 rooms + attic, bandits, Bandit Leader boss, chest, rescue, time skip)
    └── scenes/
        ├── MenuScene.js      (~370 строк — меню + advanced overlay + язык)
        ├── ClassSelectScene.js (~157 строк — 3 карточки + локализация)
        ├── GameScene.js      (~1102 строк — delegation skeleton: systems/zones + _handleInput + save/load + meadow + castle)
        ├── TalentScene.js    (~330 строк — дерево талантов со скроллом)
        ├── BestiaryScene.js  (~297 строк — Bestiary UI + локализация)
        ├── MaterialBookScene.js (~281 строк — Material Book UI)
        ├── SoulBookScene.js  (~295 строк — Soul Book UI)
        └── CraftScene.js     (~425 строк — UI крафта с вкладками)
```

---

## Архитектура v0.14.0

### Делегирование в GameScene.js

GameScene (~1106 строк) — thin delegation skeleton:

1. **Systems** (constructor):
   - `this.combat = new CombatSystem(this)` —攻击, урон, killEnemy
   - `this.playerSystem = new PlayerSystem(this)` — createPlayer, recalcStats, inventory
   - `this.spellSystem = new SpellSystem(this)` — заклинания, снаряды
   - `this.uiSystem = new UISystem(this)` — HUD, overlays, tooltips
   - `this.npcSystem = new NpcSystem(this)` — NPC, квесты, cart ride

2. **Zones** (create):
   - `this.forestZone = new ForestZone(this)` — forest
   - `this.arenaZone = new ArenaZone(this)` — arena
   - `this.mineZone = new MineZone(this)` — mine
   - `this.caveZone = new CaveZone(this)` — cave
   - `this.villageZone = new VillageZone(this)` — village + cemetery + snowy village + castle child
   - `this.hellZone = new HellZone(this)` — hell
   - `this.castleZone = new CastleZone(this)` — castle (7 rooms + attic, Bandit Leader boss, rescue, time skip)

3. **Оставлено в GameScene:**
   - `_handleInput()` — весь ввод
   - `_updateEnemies()` + `_updateBoss()` + `_bossAoE()` — updates мобов/боссов
   - `_setupMeadow()` + `_clearMeadow()` — meadow zone (не вынесена в класс)
   - `create()` — save/load, init всех систем/зон

---

## Деплой (GitHub Pages)

| Параметр | Значение |
|----------|----------|
| URL | https://hhrddtu.github.io/loot-realms/ |
| Репозиторий | https://github.com/HHrddtu/loot-realms |
| Ветка деплоя | `gh-pages` (содержимое = `dist/`) |
| Workflow | `.github/workflows/deploy.yml` (GitHub Actions) |
| Build команда | `npm run build` → `dist/` |

---

## Модули — ответственность

| Файл | Зависит от | Ответственность |
|------|-----------|-----------------|
| `main.js` | config, textures, i18n, scenes | Точка входа, 9 сцен, loadLang() |
| `config/*.js` | — | Данные: difficulties, enemies, bosses, zones, items, spells, crafting, quests, rarity, gold |
| `textures/*.js` | utils | Процедурные текстуры: все спрайты |
| `i18n.js` | — | Локализация EN/RU/DE |
| `classes.js` | — | CLASS_DB: Sage/Alchemist/Angel |
| `talents.js` | — | CLASS_TALENTS (47×3), CLASS_BRANCHES, getTalentEffects() |
| `accountTalents.js` | — | ACCOUNT_TALENTS (70), ACCOUNT_BRANCHES |
| `bestiary.js` | config, save | Bestiary: encounters, kills, levels, bonuses |
| `materialBook.js` | config, save | Material Book: collected, levels, bonuses |
| `soulBook.js` | config, save | Soul Book: souls, levels, bonuses, corDecay |
| `quests.js` | config | Квесты: initQuests, acceptQuest, onKill, onCollect |
| `crafting.js` | config, materialBook | Крафт: canCraft(), craft() |
| `save.js` | — | LocalStorage: game + account + миграция |
| `systems/CombatSystem.js` | — | Атака, урон, убийство, checkLevelUp, gold drops |
| `systems/PlayerSystem.js` | — | Игрок: recalcStats, inventory, levelup, consumable |
| `systems/SpellSystem.js` | — | Заклинания, снаряды, щит, исцеление |
| `systems/UISystem.js` | — | HUD, инвентарь, тултипы, пауза, оверлеи, consumable slot, equipment selling |
| `systems/NpcSystem.js` | — | NPC, квесты, cart ride, campfire |
| `zones/ForestZone.js` | — | Лес: мобы, пеньки, портал |
| `zones/ArenaZone.js` | — | Арена: Skeleton Lord boss |
| `zones/MineZone.js` | — | Шахта: мобы, сундуки, Skeleton Lord boss |
| `zones/CaveZone.js` | — | Пещера: Giant Bat boss, ступени |
| `zones/VillageZone.js` | — | Деревня: лагери, decor, cemetery, Hell boss, snowy village, castle child NPC, castle skip, shop, inn |
| `zones/HellZone.js` | — | Ад: лава, лагери, Red Demon, imps |
| `zones/CastleZone.js` | — | Замок: 7 комнат + чердак, бандиты, Bandit Leader boss, спасение пленников, time skip |
| `scenes/GameScene.js` | systems, zones | Delegation skeleton + ввод + save/load + meadow + castle |
| `scenes/TalentScene.js` | talents, accountTalents | UI дерева талантов |
| `scenes/BestiaryScene.js` | bestiary, config, i18n | Bestiary UI |
| `scenes/MaterialBookScene.js` | materialBook, config, i18n | Material Book UI |
| `scenes/SoulBookScene.js` | soulBook, config, i18n | Soul Book UI |
| `scenes/CraftScene.js` | crafting, config, i18n | UI крафта |
