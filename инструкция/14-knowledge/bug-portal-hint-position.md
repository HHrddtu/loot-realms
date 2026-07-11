# Bug: Portal hint текст не следует за порталом

#bug #portal #ui

> Дата: 2026-07-11

## Проблема

Hint текст портала создавался с статичной позицией, но портал имел tween который менял Y. Текст "отлипал" от портала.

## Корневая причина

```js
// БЫЛО (неправильно):
this.scene.depthsPortal = this.scene.add.sprite(dpx, dpy, 'portal').setDepth(6);
this.scene.tweens.add({ targets: this.scene.depthsPortalGlow, scaleY: 2.3, ... });
this.scene.depthsPortalHint = this.scene.add.text(dpx, dpy - 40, '', {...});
// Hint позиция статична, portal tween двигает portal

// СТАЛО (правильно):
// В update loop:
if (s.depthsPortalHint) s.depthsPortalHint.setPosition(s.depthsPortal.x, s.depthsPortal.y - 40);
```

## Правило

**Hint тексты которые привязаны к движущимся объектам ДОЛЖНЫ обновлять позицию в update loop.**

## Альтернатива

Можно привязать hint к portal через tween:
```js
this.scene.tweens.add({
    targets: [this.scene.depthsPortal, this.scene.depthsPortalHint],
    y: dpy - 5,
    duration: 1200,
    yoyo: true,
    repeat: -1
});
```

## Связи

- [[bug-npc-quest-icon-position]] — похожая проблема с привязкой позиций
- [[bug-floating-text-scrollfactor]] — проблема world vs screen coordinates
