# Loot Realms — Context Pack для внешнего AI-ревью

> Версия: `0.16.0`
> Ветка: `autopilot`
> Срез: 2026-11-01, коммиты `2e1afcc` / `4d8faec`
> Назначение: дать внешней модели (Claude Haiku 5.5 и др.) достаточно контекста, чтобы провести жёсткий, доказательный аудит игры и выдать направление развития.
>
> ВАЖНО: документация в проекте частично устарела. Проверяй утверждения по коду, а не по докам.

---

## 1. Что это за игра

**Loot Realms** — браузерная PvE-игра про лут и приключения.

- Жанр: top-down action RPG / loot crawler.
- Движок: Phaser 3.80.
- Язык: vanilla JavaScript, ES modules, без TypeScript.
- Сборка: Vite 8.
- Бэкенд: Firebase Auth + облачные сохранения.
- Мультиплеер: PeerJS 1.5, P2P, host-authoritative.
- Ассеты: процедурные текстуры, генерируются кодом; внешних спрайтов почти нет.
- Языки: EN / RU / DE.
- Сложность: одна — Normal (`src/config/difficulty.js`).

### Формула игры по докам

```
Исследование → Бой → Лут → Прогрессия → Новые сложности → Новые биомы
```

Ключевое обещание из `инструкция/00-vision/GAME_VISION.md`: **«Ещё один забег»** — каждый прогон должен ощущаться уникальным.

### Фактическое состояние по коду

- 147 JS-файлов, ~59 000 строк в `src/`.
- 3 класса.
- 15 zone-классов; Snowy и Cemetery — режимы `VillageZone`, не отдельные классы.
- 14 боссов.
- 27 заклинаний в `src/config/spells.js`.
- 43 квеста в `src/config/quests.js`.
- 20 NPC в `NPC_DB`.
- 27 сетов по `PROJECT_STATE` (в `src/config/sets.js`).
- 12 питомцев по `PROJECT_STATE`.
- 6 типов питомцев/редкостей и 8 слотов account equipment.
- 63 unit-теста (`tests/`), сборка проходит.

---

## 2. Как запускать и проверять

```bash
npm run dev    # dev-сервер Vite
npm run build  # production-сборка в dist/
npm test       # vitest run
```

Тестовая среда:

- `vitest.config.js` — alias `phaser` → `tests/mocks/phaser.js`.
- `tests/setup.js` — jsdom + canvas mock.
- Тесты покрывают `CombatCore`, `CombatLoot`, `EnemyAI`, `BaseZone`, `recalcStats`, `statusIcons`.
- Интеграционных тестов зон и полного flow нет.

---

## 3. Карта архитектуры

```
src/
├── main.js                  — entry point, конфиг Phaser
├── scenes/
│   ├── BootScene.js         — генерация текстур, анимаций
│   ├── LoginScene.js        — Firebase auth, HTML input overlay
│   ├── LobbyScene.js        — мультиплеер-лобби
│   ├── MenuScene.js         — главное меню, аккаунт, лор
│   ├── ClassSelectScene.js  — выбор класса
│   ├── IntroScene.js        — интро
│   ├── IntroCutscene.js     — сюжетная кат-сцена
│   ├── GameScene.js         — главный игровой контроллер (~795 строк)
│   ├── TalentScene.js       — таланты + mastery
│   ├── BestiaryScene.js     — книга зверей
│   ├── SoulBookScene.js     — книга душ
│   ├── MaterialBookScene.js — книга материалов
│   ├── PetScene.js          — питомцы
│   ├── MapScene.js          — карта мира
│   └── KeybindScene.js      — настройка клавиш
├── zones/                   — 15 zone-классов + spawner/boss на зону
├── systems/                 — 33 системы
├── config/                  — 25 конфигов баланса и контента
├── textures/                — процедурные текстуры
├── sound.js                 — Web Audio
├── save.js                  — localStorage + Firebase
├── i18n.js                  — EN/RU/DE
├── quests.js / systemQuests.js
├── talents.js / mastery.js / accountTalents.js
├── bestiary.js / soulBook.js / materialBook.js
├── auth.js / firebase.js / network.js / multiplayer.js
└── utils.js
```

### Ключевые системы (`src/systems/`)

| Система | Файл | Роль |
|---------|------|------|
| BaseZone | `BaseZone.js` | Базовый класс зон: cleanup, overlap, obstacles, projectiles |
| CombatCore | `CombatCore.js` | Урон, криты, комбо, щит, смерть, respawn, spell hit |
| CombatLoot | `CombatLoot.js` | Дроп, сундуки, боссы, лут-данные |
| CombatFacade | `CombatFacade.js` | Фасад между GameScene и combat |
| EnemyAI | `EnemyAI.js` | Поведение мобов, роли, статусы |
| InputSystem | `InputSystem.js` | Ввод, dodge, shadow step, time slow, revive |
| PlayerSystem | `PlayerSystem.js` | Игрок, статы, экипировка |
| SpellSystem / SpellCast / SpellProjectile / SpellEffects | `Spell*.js` | Заклинания и эффекты |
| NpcSystem | `NpcSystem.js` | NPC, диалоги, квесты, cart ride |
| SaveLoadSystem | `SaveLoadSystem.js` | Сохранение/загрузка |
| UISystem / HUD / InventoryUI / PauseMenu / StatusIcons | `*UI*.js`, `HUD.js` | Интерфейс |
| PetSystem | `PetSystem.js` | Питомцы |
| PrestigeSystem | `PrestigeSystem.js` | Prestige / New Game+ |
| MultiplayerManager | `MultiplayerManager.js` | P2P синхронизация |
| TutorialManager | `TutorialManager.js` | Обучение |
| QuestTracker | `QuestTracker.js` | Системные квесты (см. известные проблемы) |

---

## 4. Игровой цикл и прогрессия

### Базовый цикл

1. Игрок входит в зону.
2. Мобы патрулируют/преследуют, игрок бьёт SPACE или мышью.
3. Ломает сундуки/пеньки, собирает золото, материалы, экипировку.
4. Убивает босса.
5. Появляется портал/лестница в следующую зону.
6. Повторяет в следующей зоне.

### Системы прогрессии

| Система | Где | Что даёт |
|---------|-----|----------|
| Class level | `PlayerSystem.js` | HP/DMG/SPD |
| Account level | `SaveLoadSystem.js`, `accountTalents.js` | account-бонусы |
| Equipment | `config/items.js` | weapon/armor/accessory |
| Account equipment | `config/items.js` | 8 слотов, общие на классы |
| Talents | `talents.js`, `config/talents.js` | ветки классов |
| Mastery | `mastery.js`, `config/mastery.js` | очки мастерства с 15 уровня |
| Sets | `config/sets.js` | бонусы за 2/3 предмета |
| Enchanting | `config/enchanting.js` | зачарования за кристаллы |
| Crafting | `config/crafting.js` | рецепты |
| Pets | `config/pets.js`, `PetSystem.js` | companion/attacker/tank/collector |
| Books | `bestiary.js`, `soulBook.js`, `materialBook.js` | пассивные бонусы |
| Prestige | `config/prestige.js`, `PrestigeSystem.js` | New Game+, permanent бонусы |
| Crystals | `config/pets.js` | валюта за боссов |

### Боевые механики

- Базовая атака: SPACE / ЛКМ, типы `cleave`, `thrust`, `burst`, `bash`, `spin` и др.
- 27 заклинаний: по 8 на класс, 4 слота (Q/W/E/R). Новые открываются на уровнях 5/10/15/20 (`src/config/spells.js`, `src/systems/UISystem.js`).
- Corruption: ресурс/риск магии.
- Dodge roll (ПКМ), Shadow Step, Time Slow — открываются позже.
- Status effects: poison, burn, freeze, stun, slow.
- Crit, combo (в мультиплеере), shield, lifelink, reflect.
- Мультиплеер: class synergy, combo damage, revive.

---

## 5. Зоны и поток

```
Meadow
  → Forest → Arena → Mine → Cave
  → Village → Cemetery → Hell / Snowy
  → Castle → Depths → Cursed → Shadow → Tower → Throne
  → Desert / Swamp (опциональные, из Village после Depths)
```

| Зона | Босс | Особенность | Файл |
|------|------|-------------|------|
| Meadow | — | туториал, ворота | `MeadowZone.js` |
| Forest | Treant | портал в Arena | `ForestZone.js` |
| Arena | Treant (арена) | босс-арена | `ArenaZone.js` |
| Mine | Skeleton Lord | тьма, тележка, ключ | `MineZone.js` |
| Cave | Giant Bat | лестница в Village | `CaveZone.js` |
| Village | Purple Demon | хаб, магазин, inn, NPC | `VillageZone.js` |
| Cemetery | — | режим Village | `VillageZone.js` |
| Hell | Red Demon | лава, heat | `HellZone.js` |
| Snowy | Ice Spirit | режим Village | `VillageZone.js`, `SnowyZone.js` |
| Castle | Bandit Leader | комнаты, лестницы, attic | `CastleZone.js` |
| Depths | Lich King | портал в Cursed | `DepthsZone.js` |
| Cursed | Ancient Evil | портал в Shadow | `CursedZone.js` |
| Shadow | Shadow King | портал в Tower | `ShadowZone.js` |
| Tower | Fallen King | 6 комнат, лестницы | `TowerZone.js` |
| Throne | Eternity Lord | финал, Prestige | `ThroneZone.js` |
| Desert | Sand Wyrm | опциональная | `DesertZone.js` |
| Swamp | Slime King | опциональная | `SwampZone.js` |

---

## 6. Контент

| Категория | Объём | Файл |
|-----------|-------|------|
| Классы | 3: Sage, Alchemist, Angel | `classes.js`, `config/classes.js` |
| NPC | 20 | `config/quests.js` (`NPC_DB`) |
| Квесты | 43 | `config/quests.js` (`QUEST_DB`) |
| Заклинания | 27 | `config/spells.js` |
| Враги | 27 ключей в базовых пулах + зоновые | `config/enemies.js` |
| Материалы/предметы | 219 записей `id` | `config/items.js` |
| Сеты | 27 по PROJECT_STATE | `config/sets.js` |
| Питомцы | 12 | `config/pets.js` |
| Рецепты | ~657 строк конфига | `config/crafting.js` |
| Достижения | НЕТ, хотя TODO_v018 помечает как сделанные | — |

---

## 7. Хуки: куда добавлять контент и механики

Это самый важный раздел для ревьюера. Не предлагай механику, не указав точку интеграции.

### 7.1 Новая зона

1. Создать `src/zones/MyZone.js`, наследовать `BaseZone`.
2. Реализовать контракт:
   - `setup()` — фон, bounds, игрок, группы, спавн, `s.zone = 'my_zone'`.
   - `update(time, delta)` — логика зоны.
   - `handleSpace()` — взаимодействие SPACE.
   - `_destroyZoneSpecific()` — удалить уникальные объекты и обнулить ссылки.
   - `clear()` — вызывать `super.clear()` при переопределении.
3. Зарегистрировать в `GameScene`:
   - `this.zones = { ..., my_zone: new MyZone(this) }`.
   - ветка `_savedZone === 'my_zone'` в `create()`.
   - при необходимости — ветка в `_setupZone`.
4. Добавить флаги в `SaveLoadSystem.collectSaveData()` / `doLoad()`.
5. Добавить зону в `src/config/mapData.js`.
6. Добавить музыку в `src/sound.js` (`ZONE_DEFS`).
7. Добавить текстуры в `src/textures/*.js` и регистрацию в `BootScene`.

### 7.2 Новый враг

- Пул врагов: `src/config/enemies.js`.
- Спавн: `src/zones/<Zone>Spawner.js`.
- Поведение/роль: `src/systems/EnemyAI.js` (`role`: tank, archer, healer, mage, assassin, poison, necro, fire, swarm).
- Статусы: `EnemyAI._applyStatus()` / `_updateStatuses()`.
- Лут: `CombatLoot.killEnemy()`.
- Бестиарий: `bestiary.js` + `config/enemies.js`.

### 7.3 Новый босс

- AI: `src/zones/<Zone>Boss.js` или `BaseBossAI.js`.
- Спавн: босс-спавн в зоне/спавнере.
- Смерть: `victory<Zone>Boss()`, порталы, лут, кристаллы.
- HP bar/name: `BossAI.js`, `BaseBossAI.js`.
- Флаги: `SaveLoadSystem`, `config/quests.js`, `NpcSystem`.

### 7.4 Новый предмет / сет / рецепт

- Предметы: `src/config/items.js`.
- Сеты: `src/config/sets.js`, чтение бонусов в `PlayerSystem.recalcStats()`.
- Крафт: `src/config/crafting.js`.
- Enchanting: `src/config/enchanting.js`.
- Дроп: `src/config/gold.js`, `src/utils.js` (`rollZoneEquip`, `rollZoneMaterial`, `rollZoneAccountEquip`).

### 7.5 Новый квест

- Данные: `src/config/quests.js` (`QUEST_DB`, `NPC_DB`).
- Хуки прогресса: `src/quests.js`:
  - `onKill(enemyKey)`
  - `onCollect(itemKey)`
  - `onExplore(zoneKey)`
  - `onTalk(npcKey)`
  - `onEscort(npcKey, delta)`
- Выдача/сдача: `NpcSystem.interactWithNpc()`.
- UI: `NpcSystem.openQuestLog()` / журнал квестов.
- Системные квесты: `src/config/systemQuests.js` + `QuestTracker.js` (сейчас не подключён).

### 7.6 Новое заклинание / способность

- Данные: `src/config/spells.js`.
- Каст: `src/systems/SpellSystem.js`.
- Эффекты: `SpellEffects.js`, `SpellProjectile.js`, `SpellCast.js`.
- Стоимость/кулдаун: `config/balance.js`, `config/spells.js`.
- UI: `UISystem`, `HUD`.
- Классовая привязка: `classes.js`, `config/classes.js`.

### 7.7 UI / HUD

- HUD: `src/systems/HUD.js`.
- Общий UI: `src/systems/UISystem.js`.
- Инвентарь: `InventoryUI.js`, `AccountEquipUI.js`.
- Пауза: `PauseMenu.js`.
- Статусы: `StatusIcons.js`.
- Тултипы/шрифты: `config/ui.js`, `UISystem`.

### 7.8 Сохранения

- `SaveLoadSystem.collectSaveData()` — что сохраняется.
- `SaveLoadSystem.doLoad()` — что загружается.
- `save.js` — localStorage + Firebase.
- Новый флаг прогресса обязан быть добавлен в оба места.

### 7.9 Мультиплеер

- `MultiplayerManager.js` — host-authoritative синхронизация.
- `network.js` — сообщения (`portal_enter`, `inventory_update`, `attack`, `chest_interact` и др.).
- `LootDistributor.js` — распределение лута.
- `mpSync` — мобы, состояние.
- Ограничение: нет host migration.

### 7.10 Текстуры и звук

- `src/textures/*.js` — процедурные текстуры по модулям.
- `src/config/animations.js` — анимации.
- `BootScene` — регистрация.
- `src/sound.js` — Web Audio, `ZONE_DEFS`.

---

## 8. Известные проблемы и несостыковки

### Технические

| Проблема | Где | Комментарий |
|----------|-----|-------------|
| GameScene — god object | `src/scenes/GameScene.js` (~795 строк, ~100 делегатов) | Замедляет изменения |
| Bundle 2.3 MB | build | Нет code splitting; Phaser ~1.2 MB |
| Генерация текстур ~8с | `BootScene` | Блокирует загрузку |
| Частицы без пула | `ParticleSystem.js` | Аллокации |
| `completedZones` не сохраняется | `MapScene.js` читает, `SaveLoadSystem` не пишет | Карта всегда пустая |
| `QuestTracker` не используется | `src/systems/QuestTracker.js` | Системные квесты мертвы |
| Achievements отсутствуют | — | TODO_v018 ошибочно отмечает сделанными |
| Мало тестов | `tests/` | Нет зон/интеграции/save roundtrip |

### Дизайнерские (по критическому ревью от 13.07.2026)

Ревью частично устарело: Prestige, Desert/Swamp, статусы, elite-мобы уже сделаны. Но ядро критики актуально:

- Лор: несколько абзацев на 15 зон.
- Квесты: в основном kill/collect, мало ситуаций и выборов.
- NPC: мало уникальных спрайтов/диалогов, слабая реакция на прогресс.
- Классы: бэкграунды почти не влияют на геймплей.
- Зоны: один и тот же цикл «убей мобов → убей босса».
- Враги: роли есть в коде, но на практике воспринимаются как рескины.
- Прогрессия: числовая, без качественных скачков.
- Экономика: мобы/сундуки респавнятся, фарм бесконечен.
- Мультиплеер: кооп без синергии и целей.
- Первые 15 минут: не учат ничему новому после Forest.

### Прямая жалоба владельца проекта

Игра ощущается **глупой и слабой**:

- личный прогресс слабый;
- способности и анимации слабые;
- синергии и квесты не нужны;
- локации проходятся слишком быстро;
- локаций много, но они одинаковые;
- смысла мало, скучно и циклично.

Ревьюер обязан объяснить, какие конкретные решения в коде и контенте создают это ощущение, а не просто повторить жалобу.

---

### Ловушки для анализа (проверено по коду)

- `balance.js:113-120` (`LEVEL_UP_XP_*`, `UPGRADE_*`) экспортируются, но нигде не используются. В `PlayerSystem.js:457` захардкожено `300 * L^1.6`; в `:130-134` — апгрейды магазина `*5/*5/*5/*3/*2`.
- `BaseZone._destroyZoneSpecific()` пуст намеренно: это хук, зоны его переопределяют.
- `BaseZone.js:145` спавнит босса, когда `enemies.length === 0`; это не значит, что в зоне нет других целей — их просто нет в коде.
- `EnemyAI.js:418` кап 15 относится только к `_raiseDead`, не ко всем мобам.
- `VillageZone.js:138` и `VillageSpawner.js:294` — это cemetery gate, а не общий квест-гейт.
- Общего квест-гейта переходов нет: `_setupZone` проверяет только `chapter.requireItem`.
- 16 файлов `*Zone.js`, но `VillageZone` обслуживает Snowy и Cemetery. Размер файлов 134–1052 строки.
- `DepthsSpawner`, `CursedSpawner`, `DesertSpawner`, `SwampSpawner` — по ~91 строке и похожей структуре, но это не обязательно копипаста.
- У игроков есть 3-кадровые attack-анимации (`config/animations.js`), у большинства мобов — только walk. Ударный VFX — tween-спрайты. Hit-stop отсутствует.
- Базовые спеллы работают в соло; `SpellSystem.js:67` отключает только class synergy, `CombatCore.js:601` — только MP combo.

## 9. Вопросы, на которые должен ответить аудит

1. В чём 30-секундное удовольствие игры? Ощущается ли оно?
2. Какое осмысленное решение игрок принимает каждую минуту?
3. Где первый заметный power spike? Через сколько минут?
4. Зачем игроку зона N, если он уже видел зону N-1?
5. Какие 30-50% систем можно объединить или удалить без потери смысла?
6. Что делает билд билдом, а не набором цифр?
7. Почему квесты и синергии сейчас не нужны и как сделать их обязательными?
8. Что именно в анимациях/фидбеке делает бой «ватным»?
9. Что удерживает игрока после первого прохождения?
10. Какой минимальный набор изменений даст максимальный сдвиг за 2 недели?

---

## 10. Документы проекта

| Документ | Статус | Что внутри |
|----------|--------|-----------|
| `docs/LOOT_REALMS_CONTEXT_PACK.md` | этот файл | контекст для AI-ревью |
| `docs/PROMPT_HAIKU_5_5.md` | готовый промпт | аудит и направление |
| `инструкция/12-plans/TODO_v018.md` | актуален, но чекбоксы устарели | B/C/E/F задачи |
| `инструкция/12-plans/PROJECT_STATE.md` | актуален частично | состояние, следующие шаги |
| `инструкция/12-plans/TASK_QUEUE.md` | актуален частично | очередь задач |
| `инструкция/12-plans/PLAN_10x.md` | исторический | путь 6/10 → 10/10 |
| `инструкция/14-knowledge/game-design-review-critical.md` | исторический, частично устарел | жёсткая критика дизайна |
| `PLAN_GAMEPLAY.md` | июль, во многом реализован | геймплей, лут, лор |
| `PLAN_GAME_PURPOSE.md` | июль, во многом реализован | сюжет, NPC, акты |
| `PLAN_NEW_ZONES.md` | устарел | Shadow/Tower/Throne/Prestige |
| `PLAN_VISUAL.md` | актуален | анимации, модели, эффекты |
| `BENCHMARKS.md` | актуален | производительность |

---

## 11. Правила изменений (из AGENTS.md)

1. Не добавлять крупные механики без явного запроса.
2. Все числовые параметры — в `src/config/*.js`.
3. Зоны наследуют `BaseZone` и вызывают `super.clear()`.
4. После `destroy()` обнулять ссылки.
5. Не использовать `removeAllEvents()` бездумно.
6. Любая новая механика должна иметь точку чтения в формулах, а не только сеттинг.
7. После изменений: `npm run build` и `npm test`.

---

## 12. Что считать хорошим ответом ревьюера

Хороший ответ:

- ссылается на конкретные файлы и функции;
- отделяет симптомы от причин;
- предлагает сокращения, а не только добавления;
- даёт 2-недельный план с измеримым результатом;
- объясняет, как изменения повлияют на ощущение игры;
- не предлагает новую зону/класс до починки core loop;
- признаёт, где данных не хватает.

Плохой ответ:

- общие советы («улучшить баланс», «добавить контент»);
- список из 50 задач без приоритетов;
- предложения механик, которые уже есть в коде;
- игнорирование текущих ограничений Phaser/архитектуры;
- попытка переписать всё с нуля.
