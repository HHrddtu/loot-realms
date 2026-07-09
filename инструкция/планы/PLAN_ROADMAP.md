# PLAN: Рефакторинг + Новые механики (v0.12.0+)

#plan #roadmap #design

> [!INFO] Связанные заметки
> - [[TECHNICAL_DESIGN]] — архитектура (цель рефакторинга)
> - [[TASK_QUEUE]] — задачи (v0.12.0 детали)
> - [[PROJECT_STATE]] — текущий статус
> - [[TODO_v017]] — следующий этап после roadmap
> - [[README]] — карта содержимого

## Общая дорожная карта

```
v0.12.0 — Рефакторинг кода (GameScene.js → модули)
v0.13.0 — Пит-система + Магазин
v0.14.0 — Улучшения баланса/UX/баги
v0.15.0 — Мультиплеер кооп (PeerJS)
```

---

# ЧАСТЬ 1: Рефакторинг (v0.12.0)

## Проблема
- `GameScene.js` — **6830 строк**, один файл содержит ВСЮ логику всех зон
- `config.js` — **1510 строк**, все данные в куче
- `textures.js` — **4100 строк**, без разделения по зонам
- При баге в Hellzone ломается Forest, при изменении Village — рискуем сломать Cave

## Цель
Разбить монолитные файлы на модули по ответственности. Каждый файл **200-500 строк**.

## Новая структура файлов

```
src/
├── main.js                    (без изменений)
├── config.js                  (УМЕНЬШИТЬ: вынести подмодули)
├── i18n.js                    (без изменений)
├── classes.js                 (без изменений)
├── utils.js                   (без изменений)
├── sound.js                   (без изменений)
├── save.js                    (без изменений)
│
├── config/                    (НОВАЯ ПАПКА: данные из config.js)
│   ├── index.js               (реэкспорт всего)
│   ├── difficulties.js        (DIFF_MULT, сложности)
│   ├── enemies.js             (ENEMY_TYPES, MINE/CAVE/VILLAGE/HELL/SNOWY_ENEMY_TYPES)
│   ├── bosses.js              (BOSS_TYPE, MINE_BOSS, CAVE_BOSS, VILLAGE_BOSS, HELL_BOSS, SNOWY_BOSS)
│   ├── zones.js               (размеры зон, координаты, позиции лагерей/сундуков)
│   ├── items.js               (MAGMA_ARMOR, HEAT_CRYSTAL, WARMTH_CORE, реликвии,材料)
│   ├── npcs.js                (CART_DRIVER_NPC, VILLAGE_CHILD_HOUSE, позиции NPC)
│   ├── spells.js              (SPELLS, заклинания по классам)
│   └── crafting.js            (рецепты крафта)
│
├── systems/                   (НОВАЯ ПАПКА: логика из GameScene)
│   ├── CombatSystem.js        (attack, hitEnemy, killEnemy, _dealAttackDamage, spells, projectiles)
│   ├── PlayerSystem.js        (_createPlayer, recalcStats, takeDamage, heal, movement, respawn)
│   ├── UISystem.js            (openInventory, closeInventory, drawInventory, tooltips, stats UI)
│   ├── SpellSystem.js         (_castSpell, _castProjectile, _castShield, _castHeal, cooldowns)
│   └── NpcSystem.js           (_spawnNPCs, _interactWithNpc, _talkToChild, quests UI)
│
├── zones/                     (НОВАЯ ПАПКА: каждая зона отдельно)
│   ├── BaseZone.js            (общий интерфейс: setup(), clear(), update(), spawnCamps())
│   ├── ForestZone.js          (лес: portal, Trent boss, stumps, enemies)
│   ├── ArenaZone.js           (арена: выход)
│   ├── MineZone.js            (шахта: rocks, crystals, chests, Skeleton Lord)
│   ├── CaveZone.js            (пещера: corridor, mobs, chests, Giant Bat, stairs)
│   ├── VillageZone.js         (деревня: 8 camps, decor, child NPC, cemetery gate)
│   ├── CemeteryZone.js        (кладбище: Purple Demon boss, Hell portal)
│   ├── HellZone.js            (ад: 10 camps, lava, heat damage, Red Demon, imps)
│   └── SnowyZone.js           (замороженная деревня: winter mobs, Ice Spirit, campfire)
│
├── textures.js                (УМЕНЬШИТЬ: импорт из подмодулей)
│   ├── index.js               (главный экспорт, вызывает все рисовалки)
│   ├── playerTextures.js      (спрайты классов, анимации)
│   ├── enemyTextures.js       (мобы Forest/Mine/Cave/Hell/Snowy)
│   ├── bossTextures.js        (Trent, Skeleton Lord, Giant Bat, Purple Demon, Red Demon, Ice Spirit)
│   ├── zoneTextures.js        (ground textures по зонам)
│   ├── itemTextures.js        (предметы, экипировка, materials)
│   └── uiTextures.js          (UI элементы, VFX)
│
├── bestiary.js                (без изменений)
├── materialBook.js            (без изменений)
├── soulBook.js                (без изменений)
├── quests.js                  (без изменений)
├── crafting.js                (без изменений)
├── talents.js                 (без изменений)
├── accountTalents.js          (без изменений)
│
└── scenes/
    ├── MenuScene.js           (без изменений)
    ├── ClassSelectScene.js    (без изменений)
    ├── GameScene.js           (ГОЛЫЙ КАРКАС: create/update + delegation на системы/зоны)
    ├── TalentScene.js         (без изменений)
    ├── BestiaryScene.js       (без изменений)
    ├── MaterialBookScene.js   (без изменений)
    ├── SoulBookScene.js       (без изменений)
    └── CraftScene.js          (без изменений)
```

## GameScene.js после рефакторинга (~800 строк)

```javascript
// БЫЛО: 6830 строк всего
// СТАЛО: ~800 строк — только каркас + делегирование

create() {
    this._createPlayer();
    this._initInventory();
    this._initStats();
    this._createUI();
    this._bindKeys();
    // ... инициализация систем
    this.combat = new CombatSystem(this);
    this.spells = new SpellSystem(this);
    this.ui = new UISystem(this);
    this.npc = new NpcSystem(this);
}

update(time, delta) {
    this._handleInput();
    this.combat.update(delta);
    this.spells.update(delta);
    // Зона определяет свой update
    this.currentZone?.update(time, delta);
    this.ui.update();
}

// Зоны подключаются динамически
_setupZone(zoneName) {
    this.currentZone?.clear();
    this.currentZone = this.zones[zoneName];
    this.currentZone.setup();
}
```

## Порядок работ

| # | Задача | Что двигаем | Сложность |
|---|--------|-------------|-----------|
| 1 | Создать `systems/CombatSystem.js` | attack, hitEnemy, killEnemy, _dealAttackDamage | Средняя |
| 2 | Создать `systems/PlayerSystem.js` | createPlayer, recalcStats, takeDamage, heal | Средняя |
| 3 | Создать `systems/SpellSystem.js` | _castSpell, _castProjectile, _castShield, _castHeal | Средняя |
| 4 | Создать `systems/UISystem.js` | openInventory, closeInventory, tooltips | Лёгкая |
| 5 | Создать `systems/NpcSystem.js` | _spawnNPCs, _interactWithNpc, quests UI | Лёгкая |
| 6 | Создать `zones/HellZone.js` | setup, clear, update, camps, boss, lava | Средняя |
| 7 | Создать `zones/SnowyZone.js` | setup, clear, update, camps, boss, campfire | Средняя |
| 8 | Создать `zones/VillageZone.js` | setup, clear, update, camps, decor, cemetery | Средняя |
| 9 | Создать `zones/ForestZone.js` | setup, clear, update, portal, Trent | Средняя |
| 10 | Создать `zones/CaveZone.js` | setup, clear, update, Giant Bat | Средняя |
| 11 | Создать `zones/MineZone.js` | setup, clear, update, Skeleton Lord | Средняя |
| 12 | Разбить `config.js` → `config/` | Разделить по категориям | Лёгкая |
| 13 | Разбить `textures.js` → `textures/` | Разделить по типам | Лёгкая |
| 14 | Обновить GameScene.js | Заменить методы на delegation | Средняя |
| 15 | Тестирование | Полный прогон всех зон, боссов, квестов | Обязательно |

## Важные правила рефакторинга
1. **Не менять логику** — только переставлять код, не изменять поведение
2. **После каждого шага** — `npm run build` + ручная проверка
3. **Один модуль за раз** — не трогать несколько файлов одновременно
4. **Сохранять все ссылки** — `this` контекст GameScene должен работать через delegation
5. **Коммитить после каждого успешного шага**

---

# ЧАСТЬ 2: Пит-система + Магазин (v0.13.0)

## Концепт
Питомцы — компаньоны, которые дают пассивные бонусы и косметику. Магазин — место где покупаются питомцы, скины, зелья.

## Архитектура

### Питомцы (PetSystem)
```
src/
├── pets/
│   ├── index.js               (реэкспорт)
│   ├── PET_DB.js              (все питомцы: id, name, texKey, bonuses, rarity, cost)
│   ├── PetEntity.js           (класс питомца: follow, attack, ability)
│   └── PetUI.js               (отображение питомца в HUD)
```

### Типы питомцев
| Тип | Поведение | Пример |
|-----|-----------|--------|
| **Спутник** | Идёт за игроком, +статы | Феникс (+DMG), Щиток (+HP) |
| **Атакующий** | Бьёт ближайшего врага | Огненный волк, Ледяной голем |
| **Собиратель** | Подбирает лут автоматически | Магический шар |
| **Танк** | Отводит агроту врагов | Каменный голем |

### Магазин (ShopSystem)
```
src/
├── shop/
│   ├── index.js
│   ├── SHOP_DB.js             (все товары: питомцы, зелья,材料, скины)
│   ├── ShopScene.js           (сцена магазина)
│   └── ShopUI.js              (интерфейс магазина в GameScene)
```

### Валюта
| Валюта | Источник | Тратится на |
|--------|----------|-------------|
| **Gold** | Мобы, сундуки, квесты | Зелья, обычные питомцы |
| **Souls** | Soul Book | Редкие питомцы, ability upgrade |
| **Account Tokens** | Account Level Up | Легендарные питомцы, скины |

### Прогрессия питомцев
```
Уровень 1 → 2 → 3 → 4 → 5
  │          │     │     │     │
  +5% DMG  +10%  +15%  +20%  +25% (каждый уровень усиливает бонус)
  
Эволюция: Уровень 5 + редкий материал → Новая форма (новая текстура + ability)
```

### Интеграция с GameScene
- Питомец = спрайт в GameScene, следует за игроком
- AI питомца обновляется в update()
- Бонусы питомца добавляются в recalcStats()
- Магазин доступен через NPC или кнопку в меню

## Порядок работ

| # | Задача | Описание |
|---|--------|----------|
| 1 | PET_DB + текстуры | Определить питомцев, нарисовать спрайты |
| 2 | PetEntity класс | Спрайт, follow AI, attack AI, stats bonus |
| 3 | PetSystem интеграция | GameScene: spawn питомца, update, recalcStats |
| 4 | SHOP_DB | Определить товары, цены |
| 5 | ShopScene UI | Сцена магазина с вкладками |
| 6 | Валюта система | Gold/Souls/Account Tokens, отображение в HUD |
| 7 | Питомец HUD | Маленький питомец рядом с HP bar |
| 8 | Эволюция питомцев | UI эволюции, проверка условий |
| 9 | Тестирование | Баланс цен, проверка бонусов |

---

# ЧАСТЬ 3: Мультиплеер кооп (v0.15.0)

## Концепт
2-4 игрока вместе сражаются против мобов/боссов. PeerJS (WebRTC P2P), без сервера.

## Архитектура
```
src/
├── network/
│   ├── index.js
│   ├── PeerManager.js         (создание/вход в комнату, P2P соединение)
│   ├── HostLogic.js           (хост: spawn мобов, проверка урона, лут)
│   ├── GuestLogic.js          (гость: отправка input, получение state)
│   ├── SyncProtocol.js        (протокол: какие данные, как часто)
│   └── LobbyUI.js             (экран лобби: имя, код комнаты)
```

## Синхронизация
| Данные | Направление | Частота |
|--------|-------------|---------|
| Позиция игрока | Guest → Host | 20/сек |
| Атака/спелл | Guest → Host | По событию |
| Позиции всех игроков | Host → Guest | 20/сек |
| HP/позиция мобов | Host → Guest | 10/сек |
| Лут | Host → Guest | По событию |
| Chat | Both ways | По событию |

## Порядок работ
| # | Задача |
|---|--------|
| 1 | PeerJS установка + PeerManager |
| 2 | LobbyUI (создание/вход в комнату) |
| 3 | HostLogic (GameScene для хоста) |
| 4 | GuestLogic (GameScene для гостя) |
| 5 | SyncProtocol (оптимизация трафика) |
| 6 | Аватары других игроков |
| 7 | Disconnect handling |
| 8 | Тестирование на 2-4 игрока |

---

# ЧАСТЬ 4: Баланс + UX + Баги (v0.14.0)

## Баланс
| Зона | Проблема | Решение |
|------|----------|---------|
| Forest | Trent слишком лёгкий | Увеличить HP на 20% |
| Mine | Skeleton Lord без шахтёра | Добавить подсказку |
| Cave | Giant Bat dash непредсказуем | Сделать Telegraph (подсветка направления) |
| Village | Purple Demon split | Баланс HP клонов |
| Hell | 50 мобов + lava damage | Проверить что heat damage не убивает слишком быстро |
| Snowy | Ice Shards слишком быстрые | Уменьшить speed на 20% |

## UX улучшения
| # | Улучшение | Описание |
|---|-----------|----------|
| 1 | Миникарта | Маленькая карта в углу с метками лагерей/боссов |
| 2 | Damage numbers | Красивые всплывающие числа урона |
| 3 | Boss HP bar улучшение | Полоса HP + имя + фаза |
| 4 | Loot pickup auto | Автоподбор золота при прохождении рядом |
| 5 | Death screen | Экран смерти с кнопкой respawn |
| 6 | Zone transition | Анимация перехода между зонами |
| 7 | Sound effects | Звуки атаки, получения урона, лута |

## Известные баги
| # | Баг | Статус |
|---|-----|--------|
| 1 | HP:NaN после Ice Spirit (исправлен в v0.11.0) | Fixed |
| 2 | Campfire не работал (исправлен в v0.11.0) | Fixed |
| 3 | Мобы после восстановления деревни (исправлен в v0.11.0) | Fixed |
| 4 | Cave stairs ghost (исправлен в v0.9.8) | Fixed |
| 5 | Account equipment save (исправлен в v0.9.8) | Fixed |

---

# ИТОГОВАЯ ДОРОЖНАЯ КАРТА

```
Сейчас (v0.11.0) ✅
  │
  ├── v0.12.0: Рефакторинг кода (GameScene → модули)
  │   ├── systems/Combat, Player, Spell, UI, NPC
  │   ├── zones/Forest, Mine, Cave, Village, Hell, Snowy
  │   ├── config/ → enemies, bosses, zones, items
  │   └── textures/ → по категориям
  │
  ├── v0.13.0: Пит-система + Магазин
  │   ├── Pet DB (10+ питомцев, 4 типа)
  │   ├── Pet AI (follow, attack, collect, tank)
  │   ├── Shop (Gold/Souls/Account Tokens)
  │   ├── Pet HUD
  │   └── Эволюция питомцев
  │
  ├── v0.14.0: Баланс + UX + Баги
  │   ├── Баланс всех зон
  │   ├── Миникарта
  │   ├── Damage numbers
  │   ├── Boss HP bar
  │   └── Sound effects
  │
  └── v0.15.0: Мультиплеер кооп
      ├── PeerJS (WebRTC P2P)
      ├── LobbyScene
      ├── Host/Guest логика
      ├── Sync позиций/урона/лута
      └── Disconnect handling
```
