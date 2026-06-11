# FILE TREE

## Текущая структура (v0.11.0)

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
    ├── config.js             (~1510 строк — ВСЕ данные + HELL + Snowy Village + Bestiary/Soul Book)
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
    ├── textures.js           (~4100 строк — процедурные текстуры + Hell + Snowy Village)
    └── scenes/
        ├── MenuScene.js      (~370 строк — меню + advanced overlay + язык)
        ├── ClassSelectScene.js (~157 строк — 3 карточки + локализация)
        ├── GameScene.js      (~6830 строк — ВСЯ ИГРА + Hell + Snowy Village + багфиксы)
        ├── TalentScene.js    (~330 строк — дерево талантов со скроллом)
        ├── BestiaryScene.js  (~297 строк — Bestiary UI + локализация)
        ├── MaterialBookScene.js (~281 строк — Material Book UI)
        ├── SoulBookScene.js  (~295 строк — Soul Book UI)
        └── CraftScene.js     (~425 строк — UI крафта с вкладками)
```

---

## Деплой (GitHub Pages)

| Параметр | Значение |
|----------|----------|
| URL | https://hhrddtu.github.io/loot-realms/ |
| Репозиторий | https://github.com/HHrddtu/loot-realms |
| Ветка деплоя | `gh-pages` (содержимое = `dist/`) |
| Workflow | `.github/workflows/deploy.yml` (GitHub Actions) |
| Build команда | `npm run build` → `dist/` |

### Процесс деплоя (ручной)
```bash
npm run build
cd dist
git init && git checkout -b gh-pages
git add -A && git commit -m "Deploy v0.11.0"
git remote add origin https://github.com/HHrddtu/loot-realms.git
git push -f origin gh-pages
Remove-Item -Recurse -Force dist/.git
```

### Важно
- Корневой `index.html` содержит dev-ссылку `/src/main.js` — НЕ для продакшена
- `dist/index.html` содержит bundled JS (`./assets/index-*.js`) — для Pages
- При обновлении: пересобрать (`npm run build`), force push на `gh-pages`

---

## Модули — ответственность

| Файл | Зависит от | Ответственность |
|------|-----------|-----------------|
| `main.js` | config, textures, i18n, scenes | Точка входа, 9 сцен, loadLang() |
| `config.js` | — | ВСЕ данные: сложности, мобы, книги, spells, экипировка, NPC, квесты, крафт, HELL, Snowy Village |
| `i18n.js` | — | Локализация EN/RU/DE: t(), translateName(), getLang(), setLang() |
| `classes.js` | — | CLASS_DB: Sage/Alchemist/Angel |
| `talents.js` | — | CLASS_TALENTS (47×3), CLASS_BRANCHES, getTalentEffects() |
| `accountTalents.js` | — | ACCOUNT_TALENTS (70), ACCOUNT_BRANCHES, getAccountTalentEffects() |
| `bestiary.js` | config, save | Bestiary: encounters, kills, levels, bonuses |
| `materialBook.js` | config, save | Material Book: collected, levels, bonuses |
| `soulBook.js` | config, save | Soul Book: souls, levels, bonuses, corDecay |
| `quests.js` | config | Квесты: initQuests, acceptQuest, onKill, onCollect, completeQuest |
| `crafting.js` | config, materialBook | Крафт: canCraft(), craft(), getRecipeStatus(), countMaterials() |
| `save.js` | — | LocalStorage: game + account + миграция v1→v2 |
| `textures.js` | utils | Процедурные текстуры: классы + мобы + боссы + projectiles + NPC + Hell + Snowy Village |
| `scenes/MenuScene.js` | config, save, i18n | Меню + Advanced overlay + язык |
| `scenes/ClassSelectScene.js` | classes, config, i18n | Выбор класса + локализация |
| `scenes/GameScene.js` | ВСЁ | ВСЯ игровая логика: Forest/Mine/Cave/Village/Cemetery/Hell/Snowy Village + боссы + NPC + крафт |
| `scenes/TalentScene.js` | talents, accountTalents | UI дерева талантов: ветки, скролл, тултипы, respec |
| `scenes/BestiaryScene.js` | bestiary, config, i18n | Bestiary UI + локализация |
| `scenes/MaterialBookScene.js` | materialBook, config, i18n | Material Book UI |
| `scenes/SoulBookScene.js` | soulBook, config, i18n | Soul Book UI |
| `scenes/CraftScene.js` | crafting, config, i18n | UI крафта: вкладки, рецепты, проверка материалов |

---

## Ключевые функции в GameScene.js (~6830 строк)

### Общие
| Функция | Назначение |
|---------|------------|
| `create()` | Инициализация, загрузка данных, initBestiary/MaterialBook/SoulBook/Quests |
| `_createPlayer()` | Создание спрайта с walkTexKey класса |
| `recalcStats()` | Пересчёт HP/DMG/Speed + bestiary + material + soul + talent bonuses |
| `hitEnemy()` | Урон + talent + bestiary + bossDamage + critDamage + lifeSteal |
| `killEnemy()` | Убийство → recordKill + recordSoulCollect + onKill(квесты) |
| `takeDamage()` | Получение урона + shield + NaN protection |
| `doSave()` | Сохранение + saveBestiary + saveMaterialBook + saveSoulBook + saveQuests |

### Forest / Arena
| Функция | Назначение |
|---------|------------|
| `_checkPortalProximity()` | Проверка входа в портал |
| `_enterPortal()` / `_exitArena()` | Переход между зонами |

### Mine
| Функция | Назначение |
|---------|------------|
| `_setupMine()` / `_clearMine()` | Настройка/очистка Mine |
| `_spawnMineBoss()` / `_updateMineBoss()` | Mine босс (Skeleton Lord) |
| `_checkMineExitProximity()` | Выход из Mine |

### Cave
| Функция | Назначение |
|---------|------------|
| `_setupCave()` / `_clearCave()` | Настройка/очистка Cave |
| `_setupCaveBoss()` / `_updateCaveBoss()` | Giant Bat босс |
| `_caveBossSpawnCheck()` | Спавн босса после убийства мобов |

### Village / Cemetery
| Функция | Назначение |
|---------|------------|
| `_setupVillage(frozen)` | Настройка деревни (frozen=true → Snowy Village) |
| `_clearVillage()` | Очистка: enemies, chests, decor, bosses, campfire, snowyIceSpirit |
| `_spawnVillageCamps()` | 8 лагерей × 4 моба = 32 моба (обычная деревня) |
| `_spawnVillageDecor()` | Houses, corpses, gardens, fences, cemetery gate |
| `_checkVillageProgress()` | После убийства всех мобов → child NPC + cemetery gate |
| `_spawnVillageBoss()` | Purple Demon босс |
| `_enterCemetery()` / `_enterHell()` | Переход Cemetery → Hell |

### Hell
| Функция | Назначение |
|---------|------------|
| `_setupHell()` / `_clearHell()` | Настройка/очистка Hell (900×2500) |
| `_spawnHellCamps()` | 10 лагерей × 5 мобов = 50 мобов |
| `_updateHellMobs()` | AI hell мобов (role-dependent) |
| `_spawnHellBoss()` / `_updateHellBoss()` | Red Demon (Fire Wave, Meteor, Summon Imps) |
| `_victoryHellBoss()` | Победа: Heat Crystal + loot + portal back |
| `_exitHell()` | Hell → Village (frozen=true если не restored) |

### Snowy Village (v0.11.0)
| Функция | Назначение |
|---------|------------|
| `_spawnSnowyVillageCamps()` | 4 лагеря × 4 моба = 16 зимних мобов |
| `_makeSnowyVillageEnemy()` | Создание зимнего моба (blue HP bar) |
| `_spawnSnowyVillageChests()` | 10 snowy_barrel сундуков |
| `_createSnowyVillageChest()` | Создание сундука snowy_barrel |
| `_spawnSnowyCampfire()` | Костёр (24×30) вверху деревни |
| `_spawnSnowyVillageBoss()` | Ice Spirit босс с HP bar (80px) |
| `_updateSnowyVillageBoss()` | AI: Frost Wave (5с), Blizzard (8с), Summon Shards (12с) |
| `_snowyFrostWave()` | Линейная AoE атака босса |
| `_snowyBlizzard()` | AoE вокруг босса |
| `_snowySummonShards()` | Спавн 3 Ice Shards (minions) |
| `_snowyIceSpiritDied()` | Победа: Warmth Core (guaranteed) + floating text |
| `_updateSnowyVillageMobs()` | AI зимних мобов (role-dependent, blue HP bars) |
| `_checkSnowyVillageProgress()` | Все мобы убиты → Ice Spirit spawns |
| `_activateCampfire()` | SPACE: проверяет equipBag для warmth_core, fade → _setupVillage(false) |

### Collision / Damage
| Функция | Назначение |
|---------|------------|
| `_dealAttackDamage(ax, ay)` | Melee attack: enemies, stumps, chests, hellImps, snowyIceSpirit, snowyIceShards |
| Fireball collision loop | Радиусные проверки: enemies, bosses (mine/cave/village/hell/snowy), stumps, chests, shards |
| `hitEnemy()` | BossDamage check: boss, mineBoss, caveBoss, villageBoss, hellBoss, snowyIceSpirit |

### UI / NPC / Books
| Функция | Назначение |
|---------|------------|
| `_interactWithNpc()` | Взаимодействие с NPC → take/turn in quest |
| `_openBestiary()` | Проверяет classKey → Bestiary/MaterialBook/SoulBook |
| `_openCrafting()` | Пауза + запуск CraftScene |
| `_showItemTooltip(x,y,item)` | Тултип: название, редкость, статы |
| `openPause()` / `_openPauseAdvanced()` | Пауза + расширенные настройки |
| `_destroyOrphanedCaveStairs()` | Поиск и уничтожение спрайтов cave_stairs |

---

## Ключевые константы Snowy Village (config.js)

```javascript
SNOWY_VILLAGE_ENEMY_TYPES = {
    tank:      { key: 'ice_golem',    hp: 160, dmg: 15, exp: 50, bw: 22, bh: 24, role: 'tank' },
    assassin:  { key: 'frost_wraith', hp: 80,  dmg: 25, exp: 50, bw: 14, bh: 16, role: 'assassin' },
    archer:    { key: 'snow_wolf',    hp: 100, dmg: 18, exp: 50, bw: 18, bh: 16, role: 'archer' },
    healer:    { key: 'ice_elemental', hp: 90, dmg: 12, exp: 50, bw: 14, bh: 18, role: 'healer' },
    mage:      { key: 'frost_mage',   hp: 85,  dmg: 22, exp: 50, bw: 14, bh: 18, role: 'mage' }
}

SNOWY_VILLAGE_CAMP_POSITIONS = [
    { x: 120, y: 350 }, { x: 580, y: 600 },
    { x: 150, y: 900 }, { x: 550, y: 1200 }
]

SNOWY_VILLAGE_BOSS_TYPE = {
    key: 'ice_spirit', bw: 40, bh: 44,
    hp:  { Normal: 4000, Hard: 6000, Expert: 10000, Nightmare: 16000, Hell: 28000, Abyss: 48000 },
    frostWaveInterval: 5000, blizzardInterval: 8000, summonInterval: 12000
}

WARMTH_CORE = {
    id: 'warmth_core', rarity: 'legendary', slot: 'accessory',
    stats: { hp: 60, dmg: 25, speed: 12, regenPercent: 3 }
}
```

---

## Ключевые переменные GameScene (Snowy Village)

| Переменная | Тип | Описание |
|-----------|-----|----------|
| `this.villageFrozen` | bool | деревня заморожена (Snowy Village mode) |
| `this.villageRestored` | bool | деревня восстановлена (permanente, не сбрасывается) |
| `this.snowyIceSpirit` | sprite | Ice Spirit босс |
| `this.snowyIceSpiritNameText` | text | Имя босса на экране |
| `this.snowyIceSpiritAbilities` | object | Таймеры: frostWaveTimer, blizzardTimer, summonTimer |
| `this.snowyIceShards` | group | Physics group для Ice Shards (minions) |
| `this.snowyVillageAllCleared` | bool | Все зимние мобы убиты |
| `this.campfire` | image | Campfire sprite |
| `this.campfireHint` | text | Подсказка "SPACE = restore village" |
