# PROJECT STATE

## Текущий билд: v0.11.0

## Статус: PvE-игра (Forest/Arena/Mine/Cave/Village/Hell/Snowy Village) + таланты + крафт/алхимия + Meadow/Cave зоны + реликвии + Bestiary/Soul Book + Hell Zone + Snowy Village (Ice Spirit boss, campfire, Warmth Core) + GitHub Pages деплой

---

## Краткая сводка для следующего агента

### Что это за игра
**Loot Realms** — PvE Adventure Loot Game на Phaser 3. Игрок исследует биомы, убивает мобов, собирает лут, улучшает персонажа, побеждает боссов, выполняет квесты.

### Технологии
- **Движок:** Phaser 3 (^3.80.0)
- **Язык:** JavaScript ES6+ (БЕЗ TypeScript)
- **Сборка:** Vite (^8.0.16)
- **Хранилище:** LocalStorage + JSON
- **Рендеринг:** Процедурные текстуры (Canvas 2D), без внешних ассетов
- **Локализация:** 3 языка (EN/RU/DE), система i18n

### Важно
- Сцены SecretMine/Village/Cemetery полностью удалены (код + документация + текстуры)
- Осталось 9 сцен (Boot + Menu + ClassSelect + Game + TalentTree + Bestiary + MaterialBook + SoulBook + Craft)
- Village зона многофункциональная: обычный village → cemetery → Hell → snowy village → восстановление

### Деплой (v0.11.0)
- **URL:** https://hhrddtu.github.io/loot-realms/
- **Репозиторий:** https://github.com/HHrddtu/loot-realms
- **Метод:** GitHub Pages, ветка `gh-pages` (собранный `dist/`)
- **Workflow:** `.github/workflows/deploy.yml` — GitHub Actions, но пока deploy вручную через force push dist/ на gh-pages
- **Как обновить:** `npm run build` → зайти в `dist/` → `git init && git checkout -b gh-pages && git add -A && git commit && git remote add origin URL && git push -f origin gh-pages` → удалить `.git` из dist
- **Важно:** корневой `index.html` содержит dev-ссылку `/src/main.js` — НЕ отдавать через Pages. Только `dist/index.html` (с bundled JS)

---

## 3 класса
| Класс | HP | DMG | SPD | CorMax | Decay | Книга | Заклинания |
|-------|-----|-----|-----|--------|-------|-------|------------|
| **Sage** | 100 | 20 | 180 | 100 | 0.08 | Bestiary | Fireball, Shield, Heal |
| **Alchemist** | 110 | 18 | 170 | 80 | 0.08 | Material Book | Acid Flask, Iron Skin, Healing Potion |
| **Angel** | 90 | 15 | 190 | 120 | 0.10 | Soul Book | Soul Strike, Life Link, Purify |

---

## Зоны (v0.11.0 — актуальные)

| # | Зона | Босс | Описание |
|---|------|------|----------|
| 1 | Forest | Treant | Гоблины, крысы, пни, лестница в шахту, NPC-старейшина |
| 2 | Arena | — | Переходная зона перед шахтой |
| 3 | Mine | Skeleton Lord | Скелеты, камни, кристаллы, сундуки, NPC-шахтёр |
| 4 | Meadow | — | Луг, ключ от Skeleton Lord, лестница в пещеру |
| 5 | Cave | Giant Bat | Узкий коридор 500×1200, пауки/летучие/големы/черви, сундуки, реликвии |
| 6 | Village | Purple Demon | 700×2000, 8 лагерей (32 моба), сундуки, houses, cemetery |
| 7 | Hell | Red Demon | 900×2500, 10 лагерей (50 мобов), лавовые круги, heat damage |
| 7b | Snowy Village | Ice Spirit | Замороженная деревня после Hell, 4 лагеря (16 мобов), campfire, Warmth Core |

### Последовательность прохождения
```
Forest → Mine → Meadow → Cave → Village → Cemetery → Purple Demon → Hell → Red Demon → Snowy Village → Ice Spirit → Warmth Core → Campfire → Village restored
```

### Snowy Village — ключевые механики
- **Вход:** после убийства Red Demon в Hell, портал возвращает в замороженную деревню
- **Мобы:** Ice Golem (tank), Frost Wraith (assassin), Snow Wolf (archer), Ice Elemental (healer), Frost Mage (mage)
- **Босс Ice Spirit:** Frost Wave (5с), Blizzard (8с), Summon 3 Ice Shards (12с)
- **Campfire:** костёр в верхней части деревни
- **Warmth Core:** legendary accessory, 100% дроп с Ice Spirit, нужен для campfire
- **Восстановление:** SPACE на campfire с Warmth Core → fade transition → деревня恢复正常, мобов больше нет
- **Восстановление permanente:** villageRestored flag

---

## Системы

### Система талантов (v0.10.0)
- **Account таланты:** 4 ветки = 70 узлов (row 0-14)
- **Class таланты:** 9 веток = 47 узлов на класс, 141 всего (row 0-14)
- **Поинты:** class level up (+1), account level up (+1), квесты (+1-2)
- **UI:** ветки-табы с цветовой кодировкой, вертикальный скролл

### Локализация (v0.9.0)
- **Файл:** `src/i18n.js` — 300+ ключей перевода для EN/RU/DE

### Квестовая система (v0.9.0)
- **NPC:** 2 NPC (старейшина в лесу, шахтёр в шахте)
- **Квесты:** 6 квестов — 3 в лесу, 3 в шахте

### Книги Знаний (клавиша B)
- **Bestiary (Sage):** 26 мобов (goblin, slime, rat, skeletons, treant, cave mobs, village mobs, hell mobs, snowy mobs)
- **Material Book (Alchemist):** 14 материалов (forest, mine, cave, hell)
- **Soul Book (Angel):** 26 мобов

### Заклинания (Q/W/E)
| Класс | Q | W | E |
|-------|---|---|---|
| Sage | Fireball (40+50%DMG) | Shield (50+10%maxHP) | Heal (+30%maxHP) |
| Alchemist | Acid Flask (30+DoT) | Iron Skin (40+30%DR) | Healing Potion (+35%maxHP) |
| Angel | Soul Strike (35, fast) | Life Link (60+5%maxHP/s) | Purify (-40COR+15%maxHP) |

### Account Equipment (per-class)
- 5 слотов: Hat, Mantle, Legs, Weapon, Accessory
- Accessory: Magma Armor (Hell), Heat Crystal (Hell), Warmth Core (Snowy Village)

---

## Управление
| Клавиша | Действие |
|---------|----------|
| Стрелки | Движение |
| SPACE | Атака / Портал / NPC / Лестница / Campfire |
| Q / W / E | Заклинания |
| I | Инвентарь |
| TAB | Статы |
| T | Таланты |
| B | Книга знаний |
| N | Журнал квестов |
| P | Пауза |
| M | Звук |

---

## Структура файлов (v0.11.0)

```
src/
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
    ├── MenuScene.js      (~370 строк)
    ├── ClassSelectScene.js (~157 строк)
    ├── GameScene.js      (~6830 строк — ВСЯ ИГРА + Hell + Snowy Village)
    ├── TalentScene.js    (~330 строк — дерево талантов со скроллом)
    ├── BestiaryScene.js  (~297 строк)
    ├── MaterialBookScene.js (~281 строк)
    ├── SoulBookScene.js  (~295 строк)
    └── CraftScene.js     (~425 строк)
```

---

## Изменения v0.11.0 — Snowy Village

### Что сделано

**config.js:**
- `SNOWY_VILLAGE_ENEMY_TYPES` — 5 типов зимних мобов (ice_golem, frost_wraith, snow_wolf, ice_elemental, frost_mage) с ключами Normal/Hard/Expert/Nightmare/Hell/Abyss
- `SNOWY_VILLAGE_CAMP_POSITIONS` — 4 позиция лагерей (координаты x,y)
- `SNOWY_VILLAGE_BOSS_TYPE` — Ice Spirit (hp/dmg/exp по сложностям, способности: frostWaveInterval/blizzardInterval/summonInterval)
- `SNOWY_BOSS_MINION` — Ice Shard (80 HP, 15 DMG)
- `WARMTH_CORE` — legendary accessory (60 HP, 25 DMG, 12 SPD, 3% regen)
- `SNOWY_VILLAGE_CHEST_COUNT` = 10, `SNOWY_VILLAGE_CHEST_DROP_CHANCE` = 0.45
- 7 Bestiary записей + 7 Soul Book записей (ice_golem, frost_wraith, snow_wolf, ice_elemental, frost_mage, ice_spirit, ice_shard)

**textures.js:**
- Метод `_drawSnowyVillage()` (~400 строк): snow_ground (64×64 tile), snow_house (60×50), snowy_barrel (18×22), campfire (24×30), campfire_active (24×30), warmth_core (14×14), ice_shard (10×12), frost_wave_vfx (24×24), blizzard_vfx (32×32), 5 winter enemy spritesheets (4 кадра), ice_spirit spritesheet (40×44, 4 кадра)

**GameScene.js:**
- `this.villageFrozen` — флаг замороженной деревни
- `this.villageRestored` — флаг восстановленной деревни (permanente)
- `_setupVillage(frozen)` — принимает параметр frozen, выбирает текстуры и мобов
- `_spawnSnowyVillageCamps()` — 4 лагеря × 4 моба = 16 зимних врагов
- `_makeSnowyVillageEnemy()` — создание зимнего моба с role-dependent AI
- `_spawnSnowyVillageChests()` — 10 snowy_barrel сундуков
- `_createSnowyVillageChest()` — создание сундука
- `_spawnSnowyCampfire()` — костёр (24×30) вверху деревни
- `_spawnSnowyVillageBoss()` — Ice Spirit босс с HP bar
- `_updateSnowyVillageBoss()` — AI: Frost Wave (5с), Blizzard (8с), Summon Ice Shards (12с)
- `_snowyFrostWave()` — линейная AoE атака
- `_snowyBlizzard()` — AoE вокруг босса
- `_snowySummonShards()` — спавн 3 Ice Shards
- `_snowyIceSpiritDied()` — победа: Warmth Core drop + floating text
- `_updateSnowyVillageMobs()` — AI зимних мобов (role-dependent)
- `_checkSnowyVillageProgress()` — после убийства всех мобов спавнится Ice Spirit
- `_activateCampfire()` — SPACE interaction, проверяет equipBag для warmth_core, fade transition
- `_clearVillage()` — очистка: campfire, snowyIceSpirit, snowyIceShards, villageRestored/villageFrozen
- Fireball collision для Ice Spirit + Ice Shards
- Melee attack (_dealAttackDamage) для Ice Spirit + Ice Shards
- hitEnemy() — добавлен snowyIceSpirit в bossDamage check
- SPACE handler — village zone: campfire proximity check, icy boss attack check

### Поток Snowy Village
```
_exitHell() → _setupVillage(true) → snowy grounds + 4 camps (16 mobs) + chests + campfire
  → kill all mobs → _checkSnowyVillageProgress() → Ice Spirit spawns
  → kill Ice Spirit → _snowyIceSpiritDied() → Warmth Core (guaranteed drop)
  → approach campfire → SPACE → _activateCampfire()
  → check equipBag for warmth_core → fadeOut → _clearVillage() → _setupVillage(false)
  → village restored: only decor + NPCs, no mobs, villageRestored = true (permanent)
```

### Исправленные баги
1. **HP:NaN** — boss stats использовали `this.difficulty - 1` (строка "Hard" - 1 = NaN). Исправлено на `SNOWY_VILLAGE_BOSS_TYPE.hp[diffKey]`
2. **Campfire не работал** — `_activateCampfire()` искал warmth_core в `inventoryBag` (не существует), а предмет в `equipBag`. Исправлено
3. **Warmth Core key** — проверялся `bag[i].key`, а предмет имеет `id: 'warmth_core'`. Добавлена проверка обеих
4. **Мобы после восстановления** — деревня после campfire снова спавнила мобов. Добавлен `villageRestored` flag
5. **NaN защита** — `takeAmount(amount)` теперь `Math.floor(amount) || 0`

### Изменённые файлы
- `src/config.js` — +SNOWY_VILLAGE_* константы, +WARMTH_CORE, +7 Bestiary, +7 Soul Book
- `src/textures.js` — +`_drawSnowyVillage()` (~400 строк)
- `src/scenes/GameScene.js` — +~500 строк Snowy Village логики
- `PROJECT_STATE.md` — обновление документации

---

## Следующие шаги

### Приоритет
- Долгосрочные планы прогрессии (детали в `PLAN_PROGRESSION.md`)

### Долгосрочные планы
- Difficulty Unlock — постепенно после боссов
- Prestige System — сброс прогресса за вечные бонусы
- Mastery System — пер-классовый прогресс (1-100)
- Перевод описаний в книгах на RU/DE
