---
name: loot-realms
description: Use ONLY when working on the Loot Realms browser game (Phaser 3, Vite, Firebase, PeerJS). Covers project structure, conventions, and safe practices.
---

# Loot Realms Project Context

## Overview
**Loot Realms** is a browser-based PvE loot adventure game. Stack:
- **Phaser 3.80** — game engine
- **Vite 8.x** — build tool and dev server
- **Firebase 12.x** — auth, cloud save
- **PeerJS 1.5.x** — peer-to-peer multiplayer

## Directory layout
```
src/
  main.js              # Entry point, game config, boot
  scenes/              # Phaser scenes (Boot, Menu, Game, UI, etc.)
  systems/             # Game systems (combat, inventory, spawner, etc.)
  config/              # Static config files
  textures/            # Generated or imported assets
  *.js                 # Top-level modules (auth, save, quests, talents, etc.)
index.html             # HTML shell and global CSS
vite.config.js         # Vite config (base: './', outDir: 'dist')
package.json           # Scripts: dev, build
```

## Key modules
- `src/auth.js` — player authentication
- `src/save.js` — local/cloud save handling
- `src/firebase.js` — Firebase initialization
- `src/multiplayer.js` / `src/network.js` — P2P networking
- `src/classes.js` — player classes
- `src/talents.js` / `src/accountTalents.js` — talent systems
- `src/bestiary.js` — enemy data
- `src/materialBook.js` / `src/soulBook.js` — collection books
- `src/crafting.js` — crafting recipes
- `src/quests.js` — quest logic
- `src/i18n.js` — localization
- `src/keybinds.js` — input bindings
- `src/sound.js` — audio management
- `src/utils.js` — shared helpers

## Conventions
- ES modules, vanilla JavaScript.
- Prefer `export`/`import` over global namespace.
- Scene classes extend `Phaser.Scene`.
- Use `preload()`, `create()`, and `update(time, delta)` lifecycle methods.
- Avoid direct DOM manipulation unless inside Phaser DOM containers.

## Safe practices
- Never expose Firebase API keys in committed code (use env or config injected at runtime).
- Maintain backward compatibility with existing save data when changing formats.
- Validate network messages before applying them.
- Clean up event listeners and tweens in `shutdown`/`destroy`.

## Build and run
```bash
npm run dev      # development server
npm run build    # production build -> dist/
```

## When to use this skill
Use this skill whenever you are editing, reviewing, or debugging code in the Loot Realms project.
