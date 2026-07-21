# Gotcha: Phaser Sprite не имеет addChild

#gotcha

**Дата обнаружения:** 2026-07-18

## Summary

`Phaser.GameObjects.Sprite` не имеет метода `addChild()`. Этот метод есть только у `Phaser.GameObjects.Container`. Попытка вызвать `sprite.addChild(child)` выбросит `TypeError: addChild is not a function`.

## Symptoms

```
Uncaught TypeError: elder.addChild is not a function
    at VillageSpawner.spawnMapElder (VillageSpawner.js:457:15)
```

## Root Cause

Phaser 3 использует свою иерархию объектов. `Sprite` — это не DOM-элемент и не DisplayObjectContainer. Для группировки объектов используется `Container`.

## Prevention

Для привязки дочерних элементов к NPC использовать отдельные спрайты с фиксированными координатами:
```js
// Правильно:
const icon = s.add.sprite(npc.x, npc.y - 44, 'quest_icon').setDepth(10);

// Неправильно:
const icon = s.add.sprite(0, -44, 'quest_icon');
npc.addChild(icon); // TypeError!
```

## References

- `src/zones/VillageSpawner.js:457` — исправленный вызов
- Связано: [[bug-npc-quest-icon-position]]
