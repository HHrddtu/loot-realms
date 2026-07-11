# FILE TREE — Структура файлов

#tech #structure

```
WebGame/
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
├── .github/workflows/deploy.yml
├── src/
│   ├── main.js                    # Точка входа, lazy loading 15 сцен
│   ├── i18n.js                    # Локализация EN/RU/DE (700+ ключей)
│   ├── classes.js                 # CLASS_DB: Sage/Alchemist/Angel
│   ├── talents.js                 # 47 талантов на класс × 9 веток
│   ├── accountTalents.js          # 70 account талантов
│   ├── bestiary.js                # Бестиарий
│   ├── materialBook.js            # Книга материалов
│   ├── soulBook.js                # Книга душ
│   ├── quests.js                  # Квесты
│   ├── crafting.js                # Крафт
│   ├── utils.js                   # Утилиты
│   ├── sound.js                   # Web Audio звуки
│   ├── save.js                    # LocalStorage + Firebase (v3)
│   ├── auth.js                    # Firebase Auth
│   ├── firebase.js                # Firebase SDK
│   ├── multiplayer.js             # PeerJS мультиплеер
│   ├── network.js                 # PeerJS wrapper
│   ├── keybinds.js                # Бинды клавиш
│   ├── config/
│   │   ├── index.js, items.js, pets.js, gold.js
│   │   ├── enemies.js, zones.js
│   │   ├── spells.js, crafting.js, quests.js
│   │   ├── rarity.js, difficulty.js
│   │   ├── sets.js — сетевые бонусы (27 сетов)
│   │   ├── balance.js — константы баланса
│   │   ├── ui.js — цвета и размеры UI
│   │   ├── animations.js — конфиги анимаций
│   │   ├── talents.js — данные талантов
│   │   ├── intro.js, lore.js — интро и лор
│   │   ├── systemQuests.js — системные квесты
│   │   ├── systemQuests.js — системные квесты
│   ├── textures/
│   │   ├── zones.js, player.js, npcs.js
│   │   ├── items.js, enemies.js, bosses.js
│   │   ├── expansion.js, effects.js, animations.js
│   │   ├── snowy.js
│   ├── systems/
│   │   ├── CombatSystem.js, CombatCore.js, CombatLoot.js
│   │   ├── PlayerSystem.js, SpellSystem.js, SpellProjectile.js
│   │   ├── UISystem.js, NpcSystem.js, ParticleSystem.js
│   │   ├── HUD.js, InventoryUI.js, PauseMenu.js
│   │   ├── BossAI.js, BaseBossAI.js, EnemyAI.js
│   │   ├── PetSystem.js, QuestTracker.js
│   │   ├── SaveLoadSystem.js, AccountEquipUI.js
│   │   ├── BaseZone.js, SpellCast.js, SpellEffects.js
│   ├── zones/
│   │   ├── MeadowZone.js, ForestZone.js, ArenaZone.js
│   │   ├── MineZone.js, CaveZone.js, VillageZone.js
│   │   ├── CemeteryZone.js, HellZone.js, SnowyZone.js
│   │   ├── CastleZone.js, DepthsZone.js, CursedZone.js
│   │   ├── ShadowZone.js, TowerZone.js, ThroneZone.js
│   │   ├── *Boss.js (12 файлов), *Spawner.js (8 файлов)
│   │   ├── village/ — VillageShop.js, VillageProjectiles.js
│   └── scenes/
│       ├── BootScene.js, LoginScene.js, MenuScene.js
│       ├── ClassSelectScene.js, GameScene.js
│       ├── IntroScene.js, MapScene.js
│       ├── TalentScene.js, BestiaryScene.js
│       ├── MaterialBookScene.js, SoulBookScene.js
│       ├── CraftScene.js, LobbyScene.js, PetScene.js
│       ├── KeybindScene.js
├── инструкция/
│   ├── index.md                   # MOC — карта навигации
│   ├── RULES.md                   # Правила ИИ
│   ├── ORIENTATION.md             # Ориентация по проекту
│   ├── 00-vision/                 # Видение
│   ├── 01-tech/                   # Технологии
│   ├── 02-zones/                  # Зоны (15 зон)
│   ├── 03-bosses/                 # Боссы (12 боссов)
│   ├── 04-systems/                # Системы (19 систем)
│   ├── 05-classes/                # Классы (3 класса)
│   ├── 06-mechanics/              # Механики (15 механик)
│   ├── 07-scenes/                 # Сцены (15 сцен)
│   ├── 08-textures/               # Текстуры
│   ├── 09-enemies/                # Враги
│   ├── 10-economy/                # Экономика
│   ├── 11-bugs/                   # Баги
│   ├── 12-plans/                  # Планы
│   ├── 13-resources/              # Внешние ресурсы
│   └── 14-knowledge/              # Знания ИИ
```

См. [[01-tech/ARCHITECTURE|Architecture]] для описания делегирования.

---

> См. также: [[07-scenes/GameScene|GameScene]], [[04-systems/_systems_index|Systems]]
