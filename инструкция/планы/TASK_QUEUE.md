# TASK QUEUE

## Текущий билд: v0.13.0

---

## Завершённые задачи

| # | Задача | Билд |
|---|--------|------|
| 1-9 | Инфраструктура, персонаж, враги, меню, спрайты, пеньки, инвентарь, материалы | v0.0.1-v0.0.6 |
| 10 | Рефакторинг: 1 файл → 7 файлов | v0.0.7 |
| 11-12 | Босс Ancient Treant, Две зоны, порталы | v0.0.7 |
| 13-14 | UI, Звук | v0.0.8-v0.0.9 |
| 15 | Сохранения | v0.1.0 |
| 16-18 | Классы, таланты, коррупция | v0.2.0 |
| 19-22 | Account система, багфиксы | v0.2.1 |
| 23-27 | Тёмная Шахта, багфиксы, три-тиерная экипировка | v0.3.0-v0.3.2 |
| 28-29 | Инвентарь account эквипа, account level | v0.3.3 |
| 30-38 | Система заклинаний | v0.4.0-v0.4.1 |
| 39 | Анимации | v0.5.0 |
| 40-43 | Bestiary + классы Alchemist/Angel | v0.6.0 |
| 44-56 | Material Book, Soul Book, spells, talent trees, меню, описания, lore, favicon | v0.7.0 |
| 57 | Class persistence bug fix | v0.8.0 |
| 58 | Account equipment per-class | v0.8.0 |
| 59-60 | Material/Soul Book — описание целей и таблица уровней | v0.8.0 |
| 61 | Увеличение шрифтов во всех сценах | v0.8.0 |
| 62 | Tooltip на предметах | v0.8.0 |
| 63 | Квестовая система — NPC, 13 квестов, журнал, награды | v0.9.0 |
| 64 | Локализация EN/RU/DE — 300+ ключей, выбор языка в настройках | v0.9.0 |
| 65 | Оптимизация NPC/квестов — 1 NPC на зону, 6 квестов | v0.9.0 |
| 66 | Talent expansion — 32 account + 24×3 class, new effects, branch tabs, scroll UI | v0.9.2 |
| 67 | Crafting system — 15 рецептов, 4 категории, UI, Alchemist bonus | v0.9.3 |
| 68 | Очистка мёртвого контента — удалены Secret Mine, Village, Cemetery | v0.9.4 |
| 69 | Cave Zone — 300×1200, 20 мобов, 10 сундуков, Giant Bat, ступени | v0.9.5 |
| 70 | Cave мобы — cave_spider, cave_bat, stone_golem, earth_worm, giant_bat, small_bat | v0.9.5 |
| 71 | Giant Bat AI — Dash, Screech AoE, Summon 3 small bats | v0.9.5 |
| 72 | Реликвии — 3 легендарные (Sage, Alchemist, Angel) | v0.9.5 |
| 73 | Cave Bestiary/Soul/Material Book — 5 мобов + 4 материала | v0.9.5 |
| 74 | Meadow → Cave переход | v0.9.5 |
| 75 | Village Bestiary/Soul Book — 6 записей | v0.9.6 |
| 76-81 | Hell Zone — 900×2500, 50 мобов, Red Demon, Heat Crystal, порталы | v0.9.6 |
| 82-85 | Hell Bestiary/Soul Book + материалы + HP bar fix | v0.9.7 |
| 86-87 | Cave stairs ghost fix + account equip save fix | v0.9.8 |
| 88 | Talent tree expansion — +28 талантов (row 8-9), spellSpeed | v0.9.9 |
| 89 | Massive talent expansion — +130 талантов (row 10-14) | v0.10.0 |
| 90 | **Snowy Village** — замороженная деревня, 5 типов мобов, Ice Spirit босс, campfire, Warmth Core, восстановление деревни | v0.11.0 |
| 91 | Snowy Village textures — 13 процедурных текстур (snow_ground, snow_house, icy mobs, campfire, warmth_core, VFX) | v0.11.0 |
| 92 | Snowy Village bugs — HP:NaN fix, campfire equipBag fix, warmth_core id fix, villageRestored flag, NaN protection | v0.11.0 |
| 93 | GitHub Pages деплой — .gitignore, .github/workflows/deploy.yml, gh-pages ветка, ручной deploy dist/ | v0.11.0 |
| **94-108** | **Рефакторинг v0.12.0** — см. ниже | v0.12.0 |
| **109-115** | **Castle Questline v0.13.0** — см. ниже | v0.13.0 |

---

## Рефакторинг v0.12.0 — подробности

| # | Задача | Файл | Строк | Статус |
|---|--------|------|-------|--------|
| 94 | config/ — 9 файлов (difficulties, enemies, bosses, zones, items, spells, crafting, quests, rarity) | `src/config/` | ~800 | ✅ |
| 95 | textures/ — 11 файлов (zones, player, npcs, items, enemies, bosses, expansion, effects, animations, snowy, mine) | `src/textures/` | ~1500 | ✅ |
| 96 | CombatSystem.js | `src/systems/` | ~200 | ✅ |
| 97 | PlayerSystem.js | `src/systems/` | ~250 | ✅ |
| 98 | SpellSystem.js | `src/systems/` | ~200 | ✅ |
| 99 | UISystem.js | `src/systems/` | ~300 | ✅ |
| 100 | NpcSystem.js | `src/systems/` | ~300 | ✅ |
| 101 | ForestZone.js | `src/zones/` | ~200 | ✅ |
| 102 | ArenaZone.js | `src/zones/` | ~180 | ✅ |
| 103 | MineZone.js | `src/zones/` | ~300 | ✅ |
| 104 | CaveZone.js | `src/zones/` | ~250 | ✅ |
| 105 | VillageZone.js | `src/zones/` | ~500 | ✅ |
| 106 | HellZone.js | `src/zones/` | ~400 | ✅ |
| 107 | GameScene.js — delegation skeleton | `src/scenes/` | ~1058 | ✅ |
| 108 | Багфиксы: frozen village child NPC, hell zone currentZone, mine boss arena, snowy progress | — | — | ✅ |

### Ключевые решения v0.12.0

- **Systems** инициализируются в начале `create()` (до `_createUI`, `_initStats`), чтобы delegation stubs работали при инициализации
- **Zones** используют `this.scene.*` — GameScene загоняет все методы через thin wrapper stubs
- **Meadow** не вынесена в класс — `_setupMeadow()`/`_clearMeadow()` остаются в GameScene
- **_handleInput()**, **_updateEnemies()**, **_updateBoss()**, save/load остаются в GameScene
- **VillageZone** покрывает обычную деревню, cemetery, hell portal и frozen village (snowy)
- **SnowyZone.js** существует но не используется — snowy village обрабатывается VillageZone(frozen=true)
- Backup: `src/scenes/GameScene.js.bak` — оригинал для ссылки

---

## Castle Questline v0.13.0 — подробности

| # | Задача | Файл | Строк | Статус |
|---|--------|------|-------|--------|
| 109 | Config — BANDIT_TYPES, BANDIT_LEADER_BOSS, CASTLE_* constants, CASTLE_KEY | `src/config/` | ~100 | ✅ |
| 110 | Textures — bandit_melee/ranger/elite, bandit_leader, castle_ground/door/bars/stairs, villager_rescued, village_shop | `src/textures/` | ~300 | ✅ |
| 111 | CastleZone.js — 7 rooms + attic, bandit AI (melee/range/elite), boss AI (windup/strike/whirlwind/summon), chests, rescue, time skip | `src/zones/CastleZone.js` | ~1020 | ✅ |
| 112 | VillageZone.js — castle child NPC after campfire, dialogue, cart skip to castle | `src/zones/VillageZone.js` | +100 | ✅ |
| 113 | GameScene.js — CastleZone import, delegation, SPACE handler, save/load for castle flags | `src/scenes/GameScene.js` | +50 | ✅ |
| 114 | Village thriving — villageThriving flag, child NPC spawning, time skip transition | — | — | ✅ |
| 115 | Bug fixes — boss room → attic transitions, defeatedLoot array mutation, attic door visibility, stairsUp/bossDoor hints | — | — | ✅ |

### Ключевые решения v0.13.0

- **CastleZone** — 7 комнат (400×350) + чердак (room 8). Бандиты: melee, ranger, elite. Boss: Bandit Leader (slow windup → fast strike, whirlwind AoE, summon guards)
- **Rescue mechanic** — спасение пленников в attic через текст + cutscene (как cart ride)
- **Time skip** — fade to black → "20 years later..." → fade in to thriving village
- **Village thriving** — villageThriving flag, новый child NPC у 2-го дома, диалог про бандитов, cart skip в castle
- **Room transitions** — fade in/out, stairs up/down, boss door → attic (после ключа от босса)
- **Chests** — breakable barrels с loot (equip или gold), hint "SPACE = open"

---

## Оставшиеся задачи

### Приоритет
| # | Задача | Статус |
|---|--------|--------|
| — | **Пит-система + Магазин** — PetSystem, ShopScene, Gold/Souls/Tokens | План готов |
| — | **Баланс + UX** — миникарта, damage numbers, sound effects | План готов |
| — | **Мультиплеер кооп (2-4 игрока)** — PeerJS (WebRTC P2P), LobbyScene, sync | План готов |
| — | Долгосрочная прогрессия — Difficulty Unlock, Prestige, Mastery | План готов |
| — | Перевод описаний Bestiary/Material/Soul Book на RU/DE | Ожидает |

### Пит-система + Магазин (план v0.14.0)
| # | Задача | Описание |
|---|--------|----------|
| 1 | PET_DB + текстуры | Определить питомцев, нарисовать спрайты |
| 2 | PetEntity класс | Спрайт, follow AI, attack AI, stats bonus |
| 3 | PetSystem интеграция | GameScene: spawn питомца, update, recalcStats |
| 4 | SHOP_DB | Определить товары, цены (Gold/Souls/Tokens) |
| 5 | ShopScene UI | Сцена магазина с вкладками |
| 6 | Валюта система | Gold/Souls/Account Tokens, отображение в HUD |
| 7 | Питомец HUD | Маленький питомец рядом с HP bar |
| 8 | Эволюция питомцев | UI эволюции, проверка условий |
| 9 | Тестирование | Баланс цен, проверка бонусов |

### Баланс + UX (план v0.15.0)
| # | Улучшение | Описание |
|---|-----------|----------|
| 1 | Баланс всех зон | HP/damage по зонам, heat damage, lava |
| 2 | Миникарта | Маленькая карта в углу с метками |
| 3 | Damage numbers | Красивые всплывающие числа урона |
| 4 | Boss HP bar | Полоса HP + имя + фаза |
| 5 | Loot auto-pickup | Автоподбор золота при прохождении |
| 6 | Death screen | Экран смерти с кнопкой respawn |
| 7 | Sound effects | Звуки атаки, урона, лута |

### Мультиплеер (план v0.16.0)
| # | Задача | Описание |
|---|--------|----------|
| — | Добавить PeerJS | `npm install peerjs`, wrapper в `src/network.js` |
| — | LobbyScene | UI: ввод имени, создание/вход в комнату (код) |
| — | Host mode | Хост запускает GameScene, spawn мобов, проверяет урон |
| — | Guest mode | Гость отправляет input (позиция, атака, спеллы) |
| — | Sync позиций | 20 раз/сек: host ↔ guest |
| — | Sync мобов | Host → гости: HP мобов, позиции, alive/dead |
| — | Sync лута | Host решает кто получил предмет |
| — | Аватары игроков | Спрайты других игроков в GameScene |
| — | Disconnect handling | Если хост отключился — показать сообщение |

---

## Текущая точка остановки

**Последнее сделано:** v0.13.0 — Castle Questline (7 rooms + attic, Bandit Leader boss, rescue, time skip, village thriving)

**Следующий шаг:** v0.14.0 — Пит-система + Магазин (PetSystem, ShopScene, Gold/Souls/Tokens)

**URL игры:** https://hhrdtu.github.io/loot-realms/

**Roadmap:**
- v0.14.0: Пит-система + Магазин (PetSystem, ShopScene, Gold/Souls/Tokens)
- v0.15.0: Баланс + UX + Баги (миникарта, damage numbers, sound effects)
- v0.16.0: Мультиплеер кооп (PeerJS, LobbyScene, Host/Guest, sync)

**Что было в v0.13.0:**
1. Config — BANDIT_TYPES (melee/ranger/elite), BANDIT_LEADER_BOSS, CASTLE_* constants, CASTLE_KEY
2. Textures — 10 новых процедурных текстур (bandits, castle elements, villager_rescued, village_shop)
3. CastleZone.js — 1020 строк: 7 комнат + чердак, bandit AI, boss AI (idle→windup→strike), chest system, rescue, time skip
4. VillageZone.js — castle child NPC + dialogue + cart skip to castle
5. GameScene.js — CastleZone delegation, SPACE handler for castle, save/load for 5 new flags
6. Bug fixes — attic transitions, defeatedLoot mutation, stairsUp/bossDoor hints, castleQuestDone flag

**Важно для следующего агента:**
- `GameScene.js` — ~1102 строк (delegation skeleton)
- Systems/zones инициализируются в начале `create()` (до `_createUI`)
- `_handleInput()`, `_updateEnemies()`, `_updateBoss()`, save/load остаются в GameScene
- Meadow не вынесена в класс — `_setupMeadow()`/`_clearMeadow()` в GameScene
- VillageZone покрывает обычную деревню + cemetery + frozen village + castle child NPC
- CastleZone — 7 комнат (0-6) + attic (room 8). Boss в room 6. Ключ от attic в луте босса.
- `this.difficulty` — СТРОКА ("Normal"/"Hard"/"Expert"/etc), НЕ число
- `this.diffMulti` — объект множителей `{ hp, dmg, exp }`
- **Деплой:** `npm run build` → push dist/ на `gh-pages` ветку (force)
