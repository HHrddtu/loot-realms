# Bug: LoreItem sprites утекают между зонами

#bug

**Дата обнаружения:** 2026-07-18
**Дата исправления:** 2026-07-18
**Серьёзность:** medium

## Summary

`LoreItemSystem` создаёт `scroll_item` спрайты в ForestZone, но `cleanup()` никогда не вызывается при смене зоны. Свитки остаются в сцене на всех зонах.

## Symptoms

Два маленьких элемента-свитка (16×20px) видны на каждой зоне в одних и тех же мировых координатах.

## Root Cause

`LoreItemSystem.cleanup()` существует и правильно уничтожает `s.loreItemSprites`, но **нигде не вызывается**. `BaseZone.clear()` не знает о lore items.

## Fix

Добавлен вызов в `BaseZone.clear()`:
```js
if (s.loreItems) s.loreItems.cleanup();
```

## Prevention

При добавлении новых систем с визуальными объектами — всегда добавлять cleanup-вызов в `BaseZone.clear()`.

## References

- `src/systems/LoreItemSystem.js:171` — метод `cleanup()`
- `src/systems/BaseZone.js:24` — вызов cleanup
- Связано: [[bug-floating-text-scrollfactor]]
