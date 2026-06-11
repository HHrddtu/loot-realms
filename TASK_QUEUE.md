# TASK QUEUE

## Текущий билд: v0.11.0

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

---

## Оставшиеся задачи

### Приоритет
| # | Задача | Статус |
|---|--------|--------|
| — | **Рефакторинг GameScene.js → systems/ + zones/** (детали в PLAN_ROADMAP.md) | План готов |
| — | **Пит-система + Магазин** — PetSystem, ShopScene, Gold/Souls/Tokens | План готов |
| — | **Баланс + UX** — миникарта, damage numbers, sound effects | План готов |
| — | **Мультиплеер кооп (2-4 игрока)** — PeerJS (WebRTC P2P), LobbyScene, sync | План готов |
| — | Долгосрочная прогрессия — Difficulty Unlock, Prestige, Mastery | План готов |
| — | Перевод описаний Bestiary/Material/Soul Book на RU/DE | Ожидает |

### Мультиплеер (план)
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

### Рефакторинг (план v0.12.0)
| # | Задача | Файлы | Сложность |
|---|--------|-------|-----------|
| 1 | CombatSystem | attack, hitEnemy, killEnemy, _dealAttackDamage | Средняя |
| 2 | PlayerSystem | createPlayer, recalcStats, takeDamage, heal | Средняя |
| 3 | SpellSystem | _castSpell, _castProjectile, _castShield, _castHeal | Средняя |
| 4 | UISystem | openInventory, closeInventory, tooltips | Лёгкая |
| 5 | NpcSystem | _spawnNPCs, _interactWithNpc, quests UI | Лёгкая |
| 6 | HellZone | setup, clear, update, camps, boss, lava | Средняя |
| 7 | SnowyZone | setup, clear, update, camps, boss, campfire | Средняя |
| 8 | VillageZone | setup, clear, update, camps, decor, cemetery | Средняя |
| 9 | ForestZone | setup, clear, update, portal, Trent | Средняя |
| 10 | CaveZone | setup, clear, update, Giant Bat | Средняя |
| 11 | MineZone | setup, clear, update, Skeleton Lord | Средняя |
| 12 | config.js → config/ | enemies, bosses, zones, items, spells, crafting | Лёгкая |
| 13 | textures.js → textures/ | player, enemy, boss, zone, item, ui textures | Лёгкая |
| 14 | GameScene.js → каркас | Заменить методы на delegation, ~800 строк | Средняя |
| 15 | Тестирование | Полный прогон всех зон, боссов, квестов | Обязательно |

### Пит-система + Магазин (план v0.13.0)
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

### Баланс + UX (план v0.14.0)
| # | Улучшение | Описание |
|---|-----------|----------|
| 1 | Баланс всех зон | HP/damage по зонам, heat damage, lava |
| 2 | Миникарта | Маленькая карта в углу с метками |
| 3 | Damage numbers | Красивые всплывающие числа урона |
| 4 | Boss HP bar | Полоса HP + имя + фаза |
| 5 | Loot auto-pickup | Автоподбор золота при прохождении |
| 6 | Death screen | Экран смерти с кнопкой respawn |
| 7 | Sound effects | Звуки атаки, урона, лута |

### Новые идеи (обсуждение)
| # | Задача | Статус |
|---|--------|--------|
| — | Процедурные подземелья — рандомные комнаты | Обсуждение |
| — | Арена/PvP — рейтинговые бои | Обсуждение |

---

## Текущая точка остановки

**Последнее сделано:** v0.11.0 — Snowy Village + GitHub Pages деплой

**Следующий шаг:** v0.12.0 — Рефакторинг кода (детали в `PLAN_ROADMAP.md`)

**URL игры:** https://hhrdtu.github.io/loot-realms/

**Roadmap:**
- v0.12.0: Рефакторинг GameScene.js → systems/ + zones/ + config/ + textures/
- v0.13.0: Пит-система + Магазин (PetSystem, ShopScene, Gold/Souls/Tokens)
- v0.14.0: Баланс + UX + Баги (миникарта, damage numbers, sound effects)
- v0.15.0: Мультиплеер кооп (PeerJS, LobbyScene, Host/Guest, sync)

**Что было в v0.11.0:**
1. Snowy Village — замороженная деревня после Hell (5 типов мобов, Ice Spirit босс, campfire, Warmth Core, восстановление)
2. Багфиксы — HP:NaN, campfire equipBag, warmth_core id, villageRestored flag
3. GitHub Pages деплой — .gitignore, deploy.yml workflow, gh-pages ветка

**Важно для следующего агента:**
- `GameScene.js` — ~6830 строк
- 9 сцен зарегистрировано в main.js
- Class таланты: 47×3=141, Account таланты: 70, Всего: 211
- `this.difficulty` — СТРОКА ("Normal"/"Hard"/"Expert"/etc), НЕ число
- `this.diffMulti` — объект множителей `{ hp, dmg, exp }` из DIFF_MULT[difficulty]
- Warmth Core в `this.equipBag`, ключ `id: 'warmth_core'`
- `this.villageRestored` — permanente flag, НЕ сбрасывается в `_clearVillage()`
- **Деплой:** `npm run build` → push dist/ на `gh-pages` ветку (force). Корневой `index.html` — dev-ссылки, НЕ для Pages
