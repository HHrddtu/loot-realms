# Bug: floatingText улетает с камерой

#bug #ui #gotcha

> Дата: 2026-07-11

## Проблема

`floatingText()` в `HUD.js` создавал текст в world space без `setScrollFactor(0)`. При движении камеры текст "улетал" вместе с миром вместо того чтобы оставаться на месте.

## Корневая причина

```js
// БЫЛО (неправильно):
const t = this.scene.add.text(x, y, text, {...}).setOrigin(0.5);
// x, y — world coordinates, текст привязан к миру

// СТАЛО (правильно):
const sx = x - cam.scrollX;
const sy = y - cam.scrollY;
const t = this.scene.add.text(sx, sy, text, {...})
    .setOrigin(0.5)
    .setScrollFactor(0)
    .setDepth(200);
```

## Правило

**Весь UI текст (damage numbers, notifications, hints) ДОЛЖЕН иметь `setScrollFactor(0)` и использовать screen coordinates.**

## Шаблон

```js
floatingText(worldX, worldY, text, color) {
    const cam = this.scene.cameras.main;
    const sx = worldX - cam.scrollX;
    const sy = worldY - cam.scrollY;
    const t = this.scene.add.text(sx, sy, text, {...})
        .setOrigin(0.5)
        .setScrollFactor(0)
        .setDepth(200);
    this.scene.tweens.add({ targets: t, y: sy - 30, alpha: 0, duration: 700, onComplete: () => t.destroy() });
}
```

## Связи

- [[bug-npc-quest-icon-position]] — похожая проблема с позиционированием
- [[convention-ui-depth-layers]] — depth для UI элементов
