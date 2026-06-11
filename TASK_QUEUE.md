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

---

## Оставшиеся задачи

### Приоритет
| # | Задача | Статус |
|---|--------|--------|
| — | Долгосрочная прогрессия — Difficulty Unlock, Prestige, Mastery (детали в PLAN_PROGRESSION.md) | План готов |
| — | Перевод описаний Bestiary/Material/Soul Book на RU/DE | Ожидает |
| — | UI tree — увеличить scroll area для талант-дерева (row 0-14 = 15 строк) | Рекомендация |

### Новые идеи (обсуждение)
| # | Задача | Статус |
|---|--------|--------|
| — | Процедурные подземелья — рандомные комнаты | Обсуждение |
| — | Арена/PvP — рейтинговые бои | Обсуждение |
| — | Гильдии/кооп — совместные рейды | Обсуждение |

---

## Текущая точка остановки

**Последнее сделано:** v0.11.0 — Snowy Village (замороженная деревня после Hell)

**Что было в v0.11.0:**
1. config.js — 5 зимних мобов, Ice Spirit босс, Warmth Core, 10 позиций сундуков, Bestiary/Soul Book (14 записей)
2. textures.js — _drawSnowyVillage(): snow_ground, snow_house, snowy_barrel, campfire, campfire_active, warmth_core, ice_shard, frost_wave_vfx, blizzard_vfx, 5 winter mobs + spritesheets, ice_spirit + spritesheet
3. GameScene.js — villageFrozen flag, _setupVillage(frozen), 4 camps × 4 mobs, Ice Spirit boss AI (Frost Wave/Blizzard/Summon Shards), campfire + Warmth Core interaction, villageRestored flag
4. Багфиксы — HP:NaN (difficulty string→key), campfire (inventoryBag→equipBag, key→id), villageRestored (no mobs after restore), NaN protection

**Важно для следующего агента:**
- `GameScene.js` — ~6830 строк
- 9 сцен зарегистрировано в main.js
- Class таланты: 47×3=141, Account таланты: 70, Всего: 211
- `this.difficulty` — СТРОКА ("Normal"/"Hard"/"Expert"/etc), НЕ число. Boss stats читаются как `boss.hp[diffKey]`
- `this.diffMulti` — объект множителей `{ hp: 1.5, dmg: 1.3, exp: 1.2 }` из DIFF_MULT[difficulty]
- Warmth Core хранится в `this.equipBag` (не inventoryBag), ключ `id: 'warmth_core'` (не `key`)
- `this.villageRestored` — permanente flag, НЕ сбрасывается в `_clearVillage()`
- Snowy Village flow: Hell → frozen village → kill mobs → Ice Spirit → Warmth Core → campfire → restored village
- Деревня после восстановления: только декор, мобов нет
