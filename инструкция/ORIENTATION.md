# ORIENTATION — Loot Realms v0.16.0

#orientation #tech #design

> [!INFO] Связанные заметки
> - [[index|MOC]] — карта навигации по всем разделам
> - [[01-tech/TECH_STACK|Tech Stack]] — технологический стек
> - [[01-tech/ARCHITECTURE|Architecture]] — архитектура проекта
> - [[12-plans/PROJECT_STATE|PROJECT STATE]] — текущее состояние
> - [[01-tech/FILE_TREE|File Tree]] — структура файлов
> - [[RULES|Правила разработки]]
> - [[AGENTS]] — руководство по AI-агентам

## What is this
PvE Adventure Loot Game. Phaser 3, Vite, JS ES6, Firebase auth, PeerJS multiplayer.
No TypeScript. No external assets — all procedural (Canvas 2D).

## Quick links
| Раздел | Ссылка |
|--------|--------|
| **Зоны** | [[02-zones/_zones_index\|Все зоны]] (15 зон) |
| **Боссы** | [[03-bosses/_bosses_index\|Все боссы]] (12 боссов) |
| **Системы** | [[04-systems/_systems_index\|Все системы]] (33 файла в systems/) |
| **Классы** | [[05-classes/_classes_index\|Все классы]] (3 класса) |
| **Механики** | [[06-mechanics/_mechanics_index\|Все механики]] (15 механик) |
| **Сцены** | [[07-scenes/_scenes_index\|Все сцены]] (15 сцен) |
| **Архитектура** | [[01-tech/ARCHITECTURE\|Architecture]] |
| **Планы** | [[12-plans/_plans_index\|Все планы]] |

## Stack
- Engine: Phaser 3 (physics, scenes, tweens)
- Build: Vite
- Auth: Firebase (email/pass, display name, auto-create)
- Multiplayer: PeerJS (P2P rooms)
- Audio: Web Audio API (oscillators, no files)
- Save: localStorage (game state) + Firebase (account)
- i18n: EN/RU/DE

## Version
Current: v0.16.0 (package.json version)
Account version: v3 (migration from v2 built-in)

## Key directories
```
src/
  config/     — 21 файл: items, pets, gold, classes, spells, balance, difficulty, sets, enemies, quests, crafting, prestige, rarity, ui, animations, lore, intro, mapData, systemQuests, zones, index
  scenes/     — 15 сцен: Boot, Login, Menu, ClassSelect, Game, Intro, Map, Talent, Bestiary, MaterialBook, SoulBook, Craft, Pet, Keybinds, Lobby
  systems/    — 33 файла: CombatCore/Facade/Loot, PlayerSystem, SpellSystem/Cast/Effects/Projectile, UISystem/HUD/InventoryUI/PauseMenu, NpcSystem, PetSystem, EnemyAI, BossAI/Base, ParticleSystem, TutorialManager, MultiplayerManager, QuestTracker, SaveLoadSystem, InputSystem, BaseZone, InterpolationBuffer, UIButton, AccountEquipUI, PrestigeSystem, LootDistributor, LoreItemSystem, SpellCast
  zones/      — 14 Zone + 11 Boss + 8 Spawner + 1 Projectiles = 34 файла: Meadow, Forest, Arena, Mine, Cave, Village, Hell, Snowy, Castle, Depths, Cursed, Shadow, Tower, Throne (Cemetery нет отдельного файла — часть VillageZone)
  textures/   — процедурные draw-функции (без PNG)
  sound.js    — Web Audio oscillator sounds
  save.js     — localStorage + account management
  auth.js     — Firebase Auth
  firebase.js — Firebase SDK
  multiplayer.js — PeerJS мультиплеер (ghost-слои, snapshot)
  network.js  — PeerJS wrapper, message types
  i18n.js     — 3 языка (EN/RU/DE, 700+ ключей)
```

## Config index (`src/config/`)

| Файл | Содержит | Строк |
|------|----------|-------|
| `enemies.js` | Типы врагов по зонам (ENEMY_TYPES, VILLAGE_ENEMY_TYPES, ...) | 1086 |
| `quests.js` | Квесты с наградами, NPC_DB, CURSED_ENEMY_TYPES | 898 |
| `crafting.js` | Рецепты крафта (CRAFT_RECIPES, MATERIAL_ITEMS) | 657 |
| `items.js` | Все предметы: оружие, броня, аксессуары, зелья, реликвии | 551 |
| `sets.js` | Сетовые бонусы (27 сетов) | 451 |
| `spells.js` | Заклинания, улучшения, привязка к классам | 409 |
| `talents.js` | Данные талантов (47×3 class + 70 account) | 255 |
| `zones.js` | Размеры зон, позиции лагерей, константы | 257 |
| `lore.js` | Тексты лора по локациям | 181 |
| `pets.js` | Питомцы (12 шт), редкости, типы | 148 |
| `index.js` | Реэкспорт всех данных | 127 |
| `balance.js` | Константы баланса (криты, уклонение, скорость) | 123 |
| `gold.js` | Золотые дропы, консьюмаблес, магазин | 107 |
| `ui.js` | Цвета и размеры UI | 31 |
| `intro.js` | Тексты интро | 26 |
| `mapData.js` | Данные для карты | 67 |
| `systemQuests.js` | Системные квесты | 62 |
| `animations.js` | Конфиги анимаций | 88 |
| `difficulty.js` | Множители по сложностям | 18 |
| `rarity.js` | Цвета, множители, звёзды по редкостям | 15 |
| `prestige.js` | Prestige уровни и эффекты (3 уровня) | 12 |

## Build & push
```bash
npm run build        # Vite build, check for errors
git add -A && git commit -m "..." && git push
```
**NEVER push without testing. Run build first.**

## Account data structure (save.js)
```js
{
  version: 3,
  gold, crystals, exp, level, zone, difficulty,
  equipment: { weapon, armor, accessory },
  materials: [], bag: [],
  accountEquipment: { hat, mantle, legs, weapon, accessory, ring, charm, relic },
  unlockedTalents: [],
  petLevels: {},       // { pet_id: level }
  ownedPets: [],       // [ 'pet_slime', ... ]
  equippedPet: null,   // pet_id
  unlockedClasses: ['sage'],
  unlockedZones: ['forest'],
  // + kills, chests, bestiary, souls, etc.
}
```

## Zones (progression order)
Meadow → Forest → Mine → Cave → Village → Cemetery → Hell → Snowy → Castle → Depths → Cursed → Shadow → Tower → Throne
Подробно: [[02-zones/_zones_index|Все зоны]]

## Pets
12 pets, 4 rarities, 4 types. Подробно: [[06-mechanics/Pets|Pets]] и [[04-systems/PetSystem|PetSystem]]

## Combat flow
CombatSystem.hitEnemy() → damage, crit → killEnemy() → exp, gold, loot
PlayerSystem.recalcStats() → all stats from class + level + talents + equipment + pets

## Spell system
Each class has 4 spells. Подробно: [[04-systems/SpellSystem|SpellSystem]]

## Key patterns
- Procedural textures: draw in `src/textures/*.js`, registered in BootScene
- Floating text: `scene.floatingText(x, y, text, color)`
- Zone transitions: `scene._saveGame()` → `scene.scene.restart()`
- Account save: `_saveAccount()` calls `saveGame()` + Firebase write

## What NOT to do
- Don't create new files without updating FILE_TREE.md
- Don't use TypeScript
- Don't add external assets (images, audio files)
- Don't change the save format without migration code
- Don't push without `npm run build` passing
