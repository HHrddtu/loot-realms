# Bug: Tutorial панели повторяются при перезагрузке

#bug

**Дата обнаружения:** 2026-07-18
**Дата исправления:** 2026-07-18
**Серьёзность:** low

## Summary

`TutorialManager.shown` — словарь показанных туториалов — никогда не сохранялся в сейв. При перезагрузке страницы все туториали показывались заново.

## Symptoms

Туториал зон (включая "Break chests for loot") появлялся при каждом входе в зону после перезагрузки.

## Root Cause

`TutorialManager.save()` и `load()` существовали, но не вызывались из `SaveLoadSystem`.

## Fix

Добавлено в `SaveLoadSystem.collectSaveData()`:
```js
tutorialSeen: s.tutorialMgr ? s.tutorialMgr.save() : {}
```

И в `SaveLoadSystem.doLoad()`:
```js
if (s.tutorialMgr && data.tutorialSeen) s.tutorialMgr.load(data.tutorialSeen);
```

## Prevention

При добавлении новых систем с in-memory состоянием — проверять сохраняется ли оно в сейв.

## References

- `src/systems/SaveLoadSystem.js:69,168` — save/load
- `src/systems/TutorialManager.js:365-371` — save/load методы
- Связано: [[convention-tutorial-manager]]
