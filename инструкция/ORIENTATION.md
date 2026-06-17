# ORIENTATION — Loot Realms v0.16.0+

## What is this
PvE Adventure Loot Game. Phaser 3, Vite, JS ES6, Firebase auth, PeerJS multiplayer.
No TypeScript. No external assets — all procedural (Canvas 2D).

## Stack
- Engine: Phaser 3 (physics, scenes, tweens)
- Build: Vite
- Auth: Firebase (email/pass, display name, auto-create)
- Multiplayer: PeerJS (P2P rooms)
- Audio: Web Audio API (oscillators, no files)
- Save: localStorage (game state) + Firebase (account)
- i18n: EN/RU/DE

## Version
Current: v0.16.0+ (package.json version)
Account version: v3 (migration from v2 built-in)

## Key directories
```
src/
  config/        — items.js, pets.js, gold.js, classes.js, spells.js (data only)
  scenes/        — BootScene, MenuScene, GameScene, PetScene, etc.
  systems/       — PlayerSystem, CombatSystem, UISystem, SpellSystem, ParticleSystem
  zones/         — ForestZone, MineZone, CaveZone, VillageZone, HellZone, SnowyZone, CastleZone
  textures/      — all procedural draw functions (no PNG files)
  sound.js       — Web Audio oscillator sounds
  save.js        — localStorage + account management
  i18n.js        — 3 languages
  utils.js       — loot roll functions
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
  accountEquipment: {},
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
1. Forest → 2. Mine → 3. Cave → 4. Village → 5. Cemetery → 6. Hell → 7. Snowy → 8. Castle

Each zone has: mobs, boss, chests, portal/door, shop (some).
Zone files handle: spawning, enemy AI, boss mechanics, room transitions.

## Pets (pets.js)
12 pets, 4 rarities (common/uncommon/rare/legendary), 4 types:
- **companion**: stat boost only
- **attacker**: auto-attacks nearest enemy (1.5s cooldown)
- **tank**: draws mob aggro (enemies chase pet instead of player within 150px)
- **collector**: +gold bonus, +equip drop chance (from lootPercent stat)

3 cases: Wooden (30cr), Iron (80cr), Golden (200cr). Each has unique pet pool.
Pet combat: `_updatePetCombat()` in GameScene. Follow: `_updatePetFollow()`.
Pet sounds: `playPetAttack()`, `playPetPickup()` in sound.js.

## Combat flow
CombatSystem.hitEnemy() → applies damage, crit, armor reduction, DOT
CombatSystem.killEnemy() → exp, gold, crystals (boss only), equip drops, quest triggers
PlayerSystem.recalcStats() → recomputes all stats from class + level + talents + account + equipment + pets

## Spell system
Each class has 4 spells. Spells defined in spells.js. Cast via `SpellSystem.castSpell(slot)`.
Cooldowns, mana, spell damage scaling.

## Key patterns
- Procedural textures: draw in `src/textures/*.js`, registered in BootScene
- Floating text: `scene.floatingText(x, y, text, color)`
- Enemy HP bars: created per-enemy, updated in zone update loops
- Zone transitions: `scene._saveGame()` → `scene.scene.restart()`
- Account save: `_saveAccount()` calls `saveGame()` + Firebase write
- Mute: `toggleMute()` in sound.js, stored in localStorage

## Known performance notes
- Pet level cached in `_createPet()`, no per-frame loadAccount()
- Account loaded at scene start, not per-frame
- Particle systems use Phaser particle manager
- BootScene has 8s timeout for texture generation

## What NOT to do
- Don't create new files without updating FILE_TREE.md
- Don't use TypeScript
- Don't add external assets (images, audio files)
- Don't change the save format without migration code
- Don't push without `npm run build` passing
