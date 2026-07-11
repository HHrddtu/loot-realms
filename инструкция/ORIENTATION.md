# ORIENTATION — Loot Realms v0.16.0

#orientation #tech #design

> [!INFO] Связанные заметки
> - [[index|MOC]] — карта навигации по всем разделам
> - [[01-tech/TECH_STACK|Tech Stack]] — технологический стек
> - [[01-tech/ARCHITECTURE|Architecture]] — архитектура проекта
> - [[планы/PROJECT_STATE|PROJECT STATE]] — текущее состояние
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
| **Системы** | [[04-systems/_systems_index\|Все системы]] (25 систем) |
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
  config/     — items, pets, gold, classes, spells, balance, difficulty, sets (data only)
  scenes/     — Boot, Login, Menu, Game, Talent, Bestiary, Craft, Pet, Keybinds, Intro, Map, etc.
  systems/    — PlayerSystem, CombatSystem, UISystem, SpellSystem, ParticleSystem, PetSystem, etc.
  zones/      — 15 zones: Meadow, Forest, Arena, Mine, Cave, Village, Cemetery, Hell, Snowy, Castle, Depths, Cursed, Shadow, Tower, Throne
  textures/   — all procedural draw functions (no PNG files)
  sound.js    — Web Audio oscillator sounds
  save.js     — localStorage + account management
  i18n.js     — 3 languages (700+ keys)
```

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
