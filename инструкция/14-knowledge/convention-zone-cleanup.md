# Конвенция: Cleanup при смене зоны

#convention #cleanup #zone

**Дата:** 2026-07-21

## Summary

При смене зоны (через portal, death, restart) необходимо корректно уничтожить все объекты предыдущей зоны. Некорректный cleanup приводит к orphaned-спрайтам, утечке таймеров и крашам.

## Правило

Каждая зона наследует `BaseZone` и вызывает `this.clear()` при уходе. `BaseZone.clear()` выполняет базовую очистку, а зона добавляет свою через `_destroyZoneSpecific()`.

```js
// Правильно — зона наследует BaseZone:
export class ForestZone extends BaseZone {
    _destroyZoneSpecific() {
        const s = this.scene;
        if (s.stumps) { s.stumps.clear(true, true); s.stumps.destroy(); s.stumps = null; }
        if (s.portal) { s.portal.destroy(); s.portal = null; }
    }
}

// Неправильно — зона пишет свой кастомный clear без BaseZone:
export class ForestZone {
    clear() {
        this.scene.enemies.clear(true, true); // Дублирует BaseZone._destroyEnemies()
        this.scene.stumps.clear(true, true);  // OK, но容易 забыть
    }
}
```

## Чистка объектов

Все scene-ссылки на зонные объекты **должны быть обнулены** после destroy:

```js
// Правильно:
if (s.portal) { s.portal.destroy(); s.portal = null; }

// Неправильно:
if (s.portal) s.portal.destroy(); // portal уничтожен, но s.portal = destroyed object → следующий вызов упадёт
```

## Таймеры

**Не полагаться на таймеры для установки критических флагов.** `BaseZone._destroyVillageObjects()` вызывает `s.time.removeAllEvents()` — это убивает ВСЕ таймеры сцены.

Альтернативы:
- Синхронная установка флагов (сразу при создании)
- Проверка по состоянию (группа пуста → враги мертвы) вместо флагов
- Изолированные таймеры через `s.time.addEvent()` с сохранением ссылки для ручного удаления

## Порядок cleanup

```
BaseZone.clear() →
  1. tweens.killAll()
  2. physics.world.colliders.destroy()
  3. floatingTexts cleanup
  4. loreItems cleanup
  5. _destroyFireballs / _destroyEnemyProjectiles / _destroyShield
  6. _destroyEnemies
  7. _destroyStumps
  8. _destroyDefeatedUI
  9. _destroyZoneSpecific()  ← зона добавляет свою логику
  10. _destroyNPCs
  11. _destroyVillageObjects → removeAllEvents()
```

## Когда применяется

- Смена зоны через portal
- Death → restart зоны
- Выход в MenuScene
- Переключение сцен (TalentTree, Bestiary и т.д.)

## Связи

- [[gotcha-remove-all-events]] — removeAllEvents убивает все таймеры
- [[bug-lore-item-cleanup]] — утечка loreItems между зонами
- [[bug-tutorial-persistence]] — tutorial не сохранялся в сейв
- [[01-tech/ARCHITECTURE|Architecture]]
