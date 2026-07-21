# Gotcha: removeAllEvents убивает ВСЕ таймеры

#gotcha

**Дата обнаружения:** 2026-07-18

## Summary

`BaseZone._destroyVillageObjects()` вызывает `s.time.removeAllEvents()` при уходе из зоны. Это убивает **абсолютно все** таймеры сцены, включая те, которые были созданы в других зонах или модулях.

## Symptoms

- Флаги (например `defenseActive`) застревают в `true` навсегда
- Таймеры, которые должны выставить флаг в `false`, уничтожаются
- Логика зависитящая от таймеров перестаёт работать после смены зоны

## Root Cause

```js
// BaseZone._destroyVillageObjects() строка 66:
s.time.removeAllEvents();
```

Phaser `Time.removeAllEvents()` удаляет **все** pending timed events на сцене. Нет способа удалить только "свои" таймеры.

## Prevention

Не полагаться на таймеры для установки критических флагов. Использовать:
- Синхронную установку флагов (сразу при создании)
- Проверку по состоянию (если группа пуста → враги мертвы) вместо флагов
- Изолированные таймеры через `s.time.addEvent()` с сохранением ссылки для ручного удаления

## References

- `src/systems/BaseZone.js:66` — `removeAllEvents()`
- `src/zones/VillageZone.js` — `defenseActive` застревал в true
- Связано: [[bug-village-defense-waves]]
