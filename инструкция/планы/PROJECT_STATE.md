# PROJECT STATE

## Текущий билд: v0.15.0

## Статус: Firebase Auth добавлен (базовый) — требуется доработка

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

### Архитектура v0.12.0
```
src/
├── config/        (9 файлов: difficulties, enemies, bosses, zones, items, spells, crafting, quests, rarity)
├── textures/      (11 файлов: все процедурные текстуры по модулям)
├── systems/       (5 систем: Combat, Player, Spell, UI, NPC)
├── zones/         (6 зон: Forest, Arena, Mine, Cave, Village, Hell)
└── scenes/
    └── GameScene.js  (~1058 строк delegation skeleton)
```

GameScene — thin delegation skeleton: systems/zones + _handleInput + save/load + meadow.
Все зоны используют `this.scene.*` для вызова методов GameScene.

### Деплой (v0.12.0)
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

## Зоны (v0.12.0 — актуальные)

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

## Структура файлов (v0.14.0)

```
src/
├── main.js               (27 строк — 9 сцен + loadLang)
├── config/               (10 файлов: difficulties, enemies, bosses, zones, items, spells, crafting, quests, rarity, gold)
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
├── save.js               (107 строк — LocalStorage + миграция)
├── textures/             (11 файлов: процедурные текстуры)
├── systems/              (6 систем: Combat, Player, Spell, UI, NPC, Particle)
├── zones/                (8 зон: Forest, Arena, Mine, Cave, Village, Hell, Snowy, Castle)
└── scenes/               (9 сцен)
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

**VillageZone.js:**
- `this.villageFrozen` — флаг замороженной деревни
- `this.villageRestored` — флаг восстановленной деревни (permanente)
- `setup(frozen)` — принимает параметр frozen, выбирает текстуры и мобов
- `_spawnVillageCamps()` — 8 лагерей × 4 моба = 32 моба
- `_spawnSnowyVillageCamps()` — 4 лагеря × 4 моба = 16 зимних мобов
- `_makeEnemy()` — создание моба с role-dependent AI
- `_spawnSnowyChests()` — 10 snowy_barrel сундуков
- `_spawnSnowyCampfire()` — костёр (24×30) вверху деревни
- `_spawnIceSpirit()` — Ice Spirit босс с HP bar
- `_updateIceSpirit()` — AI: Frost Wave (5с), Blizzard (8с), Summon Ice Shards (12с)
- `_frostWave()` — линейная AoE атака
- `_blizzard()` — AoE вокруг босса
- `_summonIceShards()` — спавн 3 Ice Shards
- `_iceSpiritDied()` — победа: Warmth Core drop + floating text
- `_updateSnowyVillageMobs()` — AI зимних мобов (role-dependent)
- `_checkSnowyVillageProgress()` — после убийства всех мобов спавнится Ice Spirit
- `_activateCampfire()` — SPACE interaction, проверяет equipBag для warmth_core, fade transition
- `_clearVillage()` — очистка: campfire, snowyIceSpirit, snowyIceShards, villageRestored/villageFrozen
- Fireball collision для Ice Spirit + Ice Shards
- Melee attack (dealAttackDamage) для Ice Spirit + Ice Shards
- hitEnemy() — добавлен snowyIceSpirit в bossDamage check
- SPACE handler — village zone: campfire proximity check, icy boss attack check

### Поток Snowy Village
```
exitHell() → VillageZone.setup(true) → snowy grounds + 4 camps (16 mobs) + chests + campfire
  → kill all mobs → _checkSnowyVillageProgress() → Ice Spirit spawns
  → kill Ice Spirit → _iceSpiritDied() → Warmth Core (guaranteed drop)
  → approach campfire → SPACE → _activateCampfire()
  → check equipBag for warmth_core → fadeOut → clearVillage() → setup(false)
  → village restored: only decor + NPCs, no mobs, villageRestored = true (permanent)
```

### Исправленные баги (v0.12.0)
1. **Frozen village child NPC** — `_checkVillageProgress()` спавнил ребёнка-НПС в замороженной деревне. Добавлена проверка `villageFrozen`
2. **Hell zone currentZone** — `enterHell()` не устанавливал `s.currentZone = this`, из-за чего HellZone.update() не вызывался
3. **Cave stairs null guard** — `portalHint` мог быть destroyed/null в ForestZone.checkPortalProximity()
4. **Mine boss arena** — скелеты спавнились до инициализации MineZone
5. **NpcSystem cart ride** — вызывал `_setupMeadow()` напрямую из GameScene
6. **recordSoulCollect import** — bestiary.js → soulBook.js

### Изменённые файлы (v0.12.0)
- `src/config/` — 9 новых файлов (difficulties, enemies, bosses, zones, items, spells, crafting, quests, rarity)
- `src/textures/` — 11 новых файлов (zones, player, npcs, items, enemies, bosses, expansion, effects, animations, snowy, mine)
- `src/systems/` — 5 новых файлов (Combat, Player, Spell, UI, NPC)
- `src/zones/` — 6 новых файлов (Forest, Arena, Mine, Cave, Village, Hell)
- `src/scenes/GameScene.js` — переписан как delegation skeleton (~1058 строк вместо ~6830)
- `src/scenes/GameScene.js.bak` — бэкап оригинала

---

## Изменения v0.14.0 — Shop & Inn

### Что сделано

**config/gold.js (НОВЫЙ):**
- `GOLD_DROPS` — золото за мобов/сундуки/боссов по 8 зонам (forest, mine, cave, village, cemetery, hell, snowy, castle)
- `rollGold()`, `rollChestGold()`, `rollBossGold()` — функции броска золота
- `CONSUMABLES` — 6 зелий (heal small/medium/large, berserker, speed, iron) с ценами
- `SHOP_MATERIALS` — материалы для магазина (forest, cave, hell) с ценами
- `SHOP_EQUIP_PRICES` — цены экипировки по редкости (uncommon: 60, rare: 120, epic: 240)
- `SELL_PRICE_RATIO` = 0.50 — коэффициент продажи (50% от покупки)

**CombatSystem.js:**
- Gold drops при убийстве мобов: `rollGold(zone) * goldBonus` (account talent goldPercent)
- Gold drops при открытии сундуков: `rollChestGold(zone) * goldBonus`
- Gold drops при убийстве боссов: `rollBossGold(zone) * goldBonus`

**PlayerSystem.js:**
- `this.consumable` — текущее зелье в слоте
- `useConsumable()` — применение зелья (heal, damage_boost, speed_boost, defense_boost)

**UISystem.js:**
- Consumable HUD slot — отображение текущего зелья
- Click to use — клик по зелью активирует его
- Gold counter в HUD: `Gold: X`
- Equipment selling: shift+click в инвентаре → продажа за золото (50% rarity price)
- Подсказка: `(click=equip, shift+click=sell)`

**textures/npcs.js:**
- `villager_merchant` — процедурная текстура 28×36 (торговец)
- `village_bed` — процедурная текстура 32×20 (кровать в inn)

**VillageZone.js:**
- `_spawnVillageShop()` — спавн merchant NPC в restored village (house #2 + 40px offset)
- `_spawnVillageInn()` — спавн кровати (house #3), physics body 32×20
- `_useInn()` — heal to full + 50 EXP, одноразово (innUsed flag)
- `_openShop()` — UI магазина: CONSUMABLES grid, gold price, buy, tooltip, close
- `_closeShop()` — очистка shopGroup, resume physics
- Cleanup в `clear()`: merchant, merchantHint, inn, innHint, shopGroup

**GameScene.js:**
- Delegation stubs: `_openShop()`, `_useInn()`
- Proximity check: nearbyShop (merchant, dist < 50), nearbyInn (bed, dist < 40)
- SPACE handler: nearbyShop → _openShop(), nearbyInn → _useInn()
- Save/load: gold, innUsed

### Поток магазина
```
villageRestored → _spawnVillageShop() + _spawnVillageInn()
  → player подходит к merchant → SPACE → _openShop()
  → UI: CONSUMABLES grid + Gold counter + CLOSE
  → клик по предмету → проверка gold → покупка → consumable слот
  → shift+click в инвентаре → продажа экипировки за gold (50% rarity price)
```

---

## Изменения v0.15.0 — Firebase Auth (НЕ ЗАВЕРШЕНО)

### Статус: Базовый функционал работает, но есть баги. Требуется доработка.

### Что сделано
- `src/firebase.js` — конфиг Firebase (projectId: oot-realms)
- `src/auth.js` — register, login, loginAsGuest, logout, onAuthChange, saveAccountToFirestore, loadAccountFromFirestore
- `src/scenes/LoginScene.js` — UI: Name/Email/Password, Login/Register/Guest, show password toggle
- `src/scenes/BootScene.js` — проверка onAuthState → LoginScene или MenuScene
- `src/scenes/MenuScene.js` — ник золотом, кнопка Logout, syncAccountFromCloud
- `src/save.js` — saveAccount пишет в Firestore (для залогиненных), syncAccountFromCloud загружает
- `src/i18n.js` — ключи login.* для EN/RU/DE
- `src/main.js` — LoginScene добавлена, dom: { createContainer: true }
- `index.html` — CSS override для инпутов (убран белый фон)

### Что требует доработки
- **Баг ника:** при повторном логине displayName может не отображаться корректно (race condition с onAuthStateChanged)
- **Firestore Rules:** нужно проверить что rules правильные для чтения/записи
- **Offline fallback:** если нет интернета — должен работать через localStorage
- **UI инпутов:** инпуты работают через нативные HTML элементы поверх canvas (может быть нестабильно при resize)
- **Тестирование:** полное тестирование регистрации, логина, logout, синхронизации

### Firebase конфиг
```
projectId: oot-realms
authDomain: oot-realms.firebaseapp.com
```

### Firestore коллекция
```
users/{uid}:
  email: string
  displayName: string
  createdAt: number
  accountData: object (or null)
```

---

## Следующие шаги

### Приоритет
- **v0.15.1:** Firebase Auth доработка (баг ника, тестирование, offline fallback)
- **v0.16.0:** Пит-система (PetSystem, follow AI, attack AI, эволюция, HUD)
- **v0.17.0:** Баланс + UX (миникарта, damage numbers, sound effects)
- **v0.18.0:** Мультиплеер кооп (PeerJS, LobbyScene, Host/Guest, sync)
