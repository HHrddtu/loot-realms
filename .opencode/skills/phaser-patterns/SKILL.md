---
name: phaser-patterns
description: Use when writing or reviewing Phaser 3 code for Loot Realms. Covers scenes, game objects, input, audio, and performance patterns.
---

# Phaser 3 Patterns — Loot Realms

## Scene structure
```js
export class MyScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MyScene' });
  }

  preload() { /* assets */ }
  create(data) { /* setup */ }
  update(time, delta) { /* per-frame logic */ }
}
```

## Common patterns
- **Registry / Events**: use `this.registry` for cross-scene state, `this.events` for scene-local events.
- **Object pooling**: reuse sprites via `this.add.group({ classType, maxSize, runChildUpdate: true })`.
- **Input**: prefer `this.input.on('pointerdown', ...)` and clean up in `shutdown`.
- **Tweens**: store tween references and stop them on scene exit.
- **Audio**: use `this.sound.add(key)` and manage volume via `src/sound.js`.

## Performance tips
- Disable `runChildUpdate` for static groups.
- Use `setActive(false).setVisible(false)` instead of destroying temporary objects.
- Avoid creating textures every frame.
- Use `this.textures.get(key)` to check existence before generating.

## UI integration
- Use `this.add.dom(x, y).createFromHTML(html)` for complex HTML UI.
- Keep DOM input styling consistent with `index.html` CSS.
- Call `this.scene.launch('UIScene')` / `this.scene.stop('UIScene')` to manage overlays.

## Anti-patterns
- Do not call `new Phaser.Game` more than once.
- Do not rely on global `game` variable; inject the game instance.
- Do not update the whole UI every frame; use event-driven updates.
