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
│   ├── main.js                    # Точка входа, 12 сцен
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
│   │   ├── index.js, items.js, pets.js, gold.js, classes.js
│   │   ├── enemies.js, bosses.js, zones.js
│   │   ├── spells.js, crafting.js, quests.js
│   │   ├── difficulties.js, rarity.js, difficulty.js
│   │   ├── sets.js [NEW] — сетовые бонусы
│   │   ├── balance.js [NEW] — константы баланса
│   │   ├── ui.js [NEW] — цвета и размеры UI
│   │   ├── animations.js [NEW] — конфиги анимаций
│   │   ├── talents.js [NEW] — данные талантов
│   ├── textures/
│   │   ├── index.js, zones.js, player.js, npcs.js
│   │   ├── items.js, enemies.js, bosses.js
│   │   ├── expansion.js, effects.js, animations.js
│   │   ├── snowy.js, mine.js
│   │   ├── pets.js [NEW] — текстуры питомцев
│   ├── systems/
│   │   ├── CombatSystem.js, PlayerSystem.js, SpellSystem.js
│   │   ├── UISystem.js, NpcSystem.js, ParticleSystem.js
│   │   ├── HUD.js [NEW] — HUD интерфейс
│   │   ├── SpellProjectile.js [NEW] — снаряды с pool
│   │   ├── BossAI.js [NEW] — базовый AI боссов
│   ├── zones/
│   │   ├── ForestZone.js, ArenaZone.js, MineZone.js
│   │   ├── CaveZone.js, VillageZone.js, HellZone.js
│   │   ├── SnowyZone.js (unused), CastleZone.js
│   │   ├── VillageBoss.js [NEW] — бой с боссом деревни
│   └── scenes/
│       ├── BootScene.js, LoginScene.js, MenuScene.js
│       ├── ClassSelectScene.js, GameScene.js
│       ├── TalentScene.js, BestiaryScene.js
│       ├── MaterialBookScene.js, SoulBookScene.js
│       ├── CraftScene.js, LobbyScene.js, PetScene.js
├── инструкция/
│   ├── index.md                   # MOC — карта навигации
│   ├── 00-vision/                 # Видение
│   ├── 01-tech/                   # Технологии
│   ├── 02-zones/                  # Зоны (10 файлов)
│   ├── 03-bosses/                 # Боссы (8 файлов)
│   ├── 04-systems/                # Системы (9 файлов)
│   ├── 05-classes/                # Классы (4 файла)
│   ├── 06-mechanics/              # Механики (12 файлов)
│   ├── 07-scenes/                 # Сцены (13 файлов)
│   ├── 08-textures/               # Текстуры
│   ├── 09-enemies/                # Враги
│   ├── 10-economy/                # Экономика
│   ├── 11-bugs/                   # Баги
│   └── 12-plans/                  # Планы
```

См. [[01-tech/ARCHITECTURE|Architecture]] для описания делегирования.

---

> См. также: [[07-scenes/GameScene|GameScene]], [[04-systems/_systems_index|Systems]]
