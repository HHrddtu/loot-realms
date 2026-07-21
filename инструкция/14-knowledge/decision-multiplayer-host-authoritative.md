# Решение: host-authoritative архитектура синхронизации мультиплеера

#decision

**Дата:** 2026-07-12
**Контекст:** Синхронизация игрового состояния в мультиплеере (Phaser 3 + PeerJS, до 3 игроков: 1 хост + 2 гостя).

## Summary

Хост — единственный источник правды по игровому состоянию. Снэпшоты мира (20Hz) рассылаются всем клиентам; гости только шлют свой инпут (30Hz) и attack_action. Remote-спрайты интерполируются со сдвигом рендера 100ms. Отключение любого пира завершает игру для всех.

## Context

Старая схема (legacy `MultiplayerSync` / `MultiplayerManager`) имела проблемы:
- Двойной урон: `hitEnemy` на госте уменьшал `mob.stats.hp` локально и одновременно слал `broadcastMobDamage` хосту, который уменьшал ещё раз.
- Ghost-мобы создавались и на хосте, и на госте через `_handleMobSync`, рассинхронизируясь с реальной `s.enemies` группой.
- Remote-спрайты не создавались на лету (только при первом `setup()`).
- Нет интерполяции — позиции remote-игроков ставились телепортом.
- Старые message types дублировали одну задачу (`state` + `player_update` + `mob_sync` + `mob_update`).

## Decision / Finding

### Message types

**Гость → хост** (input channel):
- `input` (30Hz): `{x, y, vx, vy, facing, attacking, casting, hp, maxHp, zone}` — текущее состояние игрока
- `attack_action` (событие): `{ax, ay, facing, attackDamage, weaponSlot, isRanged}` — намерение удара, хост валидирует и считает итог
- `chest_interact` (событие): `{chestId}` — открытие сундука
- `loot_pickup` (событие): `{lootId}` — подбор лута
- `portal_enter` (событие): опционально (для будущего)

**Хост → все (broadcast):**
- `snapshot` (20Hz): полное состояние мира (`players`, `mobs`, `bosses`, `chests`, `loot`, `zoneFlags`)
- `playerJoin` / `playerLeave` (события) — спавн/деспавн remote-спрайтов (race со снэпшотом)
- `entity_spawn` / `entity_despawn` (события) — для мгновенного feedback (опционально, снэпшот обычно достаточно)
- `chest_opened` / `loot_collected` (события) — мгновенный feedback
- `zone_state` (событие) — глобальные флаги зон
- `game_over` (событие) — завершение игры

### Структура `snapshot`

```js
{
  t: <serverTime>,
  seq: <sequence>,
  players: { [peerId]: {x, y, vx, vy, facing, attacking, casting, hp, maxHp, alive, zone, classKey} },
  mobs:   [{id, x, y, vx, vy, hp, maxHp, type, texKey}],
  bosses: [{id, x, y, hp, maxHp, phase, type, texKey}],
  chests: [{id, x, y, opened, texKey}],
  loot:   [{id, x, y, type, ownerPeerId, texKey}],
  zoneFlags: {...}
}
```

### Кто что считает

| Домен | Хост | Гость |
|---|---|---|
| Своя позиция | считает локально | считает локально (предиктивно) |
| Позиции других игроков | авторитет (в снэпшоте) | принимает, интерполирует |
| Своя HP | авторитет (в снэпшоте) | принимает |
| HP других игроков | авторитет (в снэпшоте) | принимает, рисует HP-бар |
| Мобы | авторитет (AI локально) | ghost-спрайты по снэпшоту, без AI |
| Урон от атаки | **только хост** через `applyAttackAt(ax, ay, dmg, cls, {bypassModifiers: true})` | не считает, шлёт `attack_action` |
| Сундуки (opened) | авторитет (в снэпшоте + `chest_opened`) | ghost по снэпшоту/событию |
| Ground loot | авторитет (в снэпшоте + `loot_collected`) | ghost по снэпшоту, пикап → `loot_pickup` |
| Зона, в которой игрок | авторитет (из `input.zone`) | шлёт в `input` |
| Инвентарь, gold, level | **локальный у каждого** | не синхронизируется |
| Pet AI / pet combat | локальный у каждого (host-симуляция не требуется) | локальный |

### Interpolation

`InterpolationBuffer` хранит до 6 снапов на каждого remote-игрока. В `update(delta)`:
```js
const renderT = performance.now() - RENDER_DELAY_MS; // 100ms
const sample = buffer.sample(renderT);
sprite.x = sample.x; sprite.y = sample.y;
```
Линейная интерполяция между двумя ближайшими снапами. HP не интерполируется.

### Disconnect = game over

- Хост теряет гостя (`conn.on('close')`): broadcast `game_over {reason: 'player_disconnect'}`, fire `_onGameOver` локально, scene → MenuScene.
- Гость теряет хоста (`conn.on('close')`): fire `_onDisconnect('host')`, scene → MenuScene.
- Peer теряет соединение (`peer.on('disconnected')`): fire `_onDisconnect('peer_disconnected')`.

### Файловая структура

- `src/network.js` — транспорт (PeerJS), message types, `MAX_PLAYERS = 3`
- `src/systems/InterpolationBuffer.js` — буфер + lerp (новый файл)
- `src/multiplayer.js` — `MultiplayerSync`: ghost-слои мобов/боссов/сундуков/лута, `buildSnapshot`/`broadcastSnapshot` (хост), `onSnapshot` handler (гость)
- `src/systems/MultiplayerManager.js` — remote player sprites, snapshot buffering, input send, host-side handlers (`attack_action` → `applyAttackAt`, `chest_interact` → `breakChest`, `loot_pickup` → pickup + gold broadcast)
- `src/systems/CombatCore.js` — `attack()` рефакторинг: `_playAttackVisuals()` (новая, общая для локал и guest) + `applyAttackAt(ax, ay, dmg, cls, opts)` (новая, для хоста-обработчика `attack_action`); `hitEnemy(enemy, dmg, {bypassModifiers})`
- `src/scenes/GameScene.js` — `attack()` для гостя шлёт `attack_action`; `takeDamage` хоста бродкастит `damage_event`; `_onMultiplayerGameOver` / `_onMultiplayerDisconnect` → MenuScene

## Rationale

**Почему host-authoritative:**
- Избегаем двойного урона (главный баг исходной схемы).
- Pet damage локальный (без сетевого roundtrip) — допустимо расхождение цифр.
- Зоны/mobs синхронизируются через полный снэпшот (20Hz, 50ms лаг) — простой код, ghost-слои идемпотентны.

**Почему snapshot вместо дельт:**
- Мобов/боссов много, состояние меняется часто — дельты дороже по объёму сообщений.
- 20Hz × ~50 сущностей × ~30 байт = 30KB/s на клиента — приемлемо для PeerJS.

**Почему render delay 100ms:**
- 2 снапа запаса при 20Hz — стандартная практика (Glenn Fiedler / Valve), плавно скрывает джиттер сети.
- Не слишком большой лаг для кооп-игры.

**Почему `applyAttackAt` принимает позицию от гостя:**
- Гость считает свою позицию локально, шлёт в `attack_action` (а не в `input`) для точности.
- Хост валидирует попадание в свой реальный мир мобов, не тратя трафик на continuous позицию attack.
- `bypassModifiers: true` — у гостя уже применены его таланты/модификаторы к `attackDamage`, хост не должен повторно.

**Почему chest/boss loot идёт хосту (v1 limitation):**
- Refactor `breakChest` / `killBoss` для возврата items и рассылки через `inventory_update` — большой объём работы.
- v1: хост получает items от сундуков/боссов, гости видят visual но не получают items. Баланс нарушен, но shippable.
- TODO v2: добавить `sendInventoryUpdate(peerId, items)` в network.js + per-player chest loot.

## Consequences

- **Pet damage может различаться у разных клиентов** (допустимо, user подтвердил).
- **PvP отключено** (как и в single-player).
- **`peer.disconnected` теперь хэндлится** и завершает игру — раньше тихо ломал connection.
- **Тесты `tests/baseZone.test.js`, `tests/combat.test.js`, `tests/loot.test.js` падают** — pre-existing проблемы (отсутствует `phaser3spectorjs`, jsdom setup), не связано с этой задачей.
- **`mpId` формат:** для мобов `mob_<type>_<n>`, для боссов `boss_<key>_<n>`, для chest `chest_<n>`, для loot `loot_<n>` — global counter, уникальный в пределах сессии.
- **`broadcastZoneChange` удалён** — зона теперь приходит в `input.zone` хосту и в `snapshot.players[].zone` гостям.
- **Pet cross-visibility реализован:** позиция и texKey пета в `snapshot.players[].pet` (для хоста — из локального `s.petSys`) и в `input.pet` (для гостей). `MultiplayerManager` создаёт ghost-петы для remote игроков, обновляет позицию по snapshot, уничтожает при despawn.
- **Per-player chest/boss loot (routed to breaker/killer only):** `CombatLoot.breakChest/breakStump/breakVillageChest/killEnemy/killGenericBoss` возвращают `lootData` (не пишут в локальный инвентарь). `_routeLoot(lootData, targetPeerId)` отправляет `inventory_update` (unicast, через `sendInventoryUpdate(peerId, ...)`) только тому, кто взаимодействовал (host атаковал/нажал E, или guest чей `_lastAttackerPeerId` / чей `chest_interact` пришёл). `CombatCore.hitEnemy` сохраняет `enemy._lastAttackerPeerId` из `opts.attackerPeerId`. `CombatCore.hitChest` / `hitStump` пробрасывают `opts.attackerPeerId` через `_dealAttackDamage`. `MultiplayerManager._handleAttackAction` передаёт `attackerPeerId: peerId` в `applyAttackAt`. `MultiplayerManager._handleChestInteract` маршрутизирует к `peerId`. Поддерживаются `items` (equip/material/accountEquip), `gold`, `exp`, `crystals`, `defeatedText`+`lootItemTexts` (для боссов, видны только killer'у), `zoneFlags` (e.g., `mine.hasSecretKey`, применяются per-player).

## References

## References

- Файлы:
  - `src/network.js` (полностью переписан)
  - `src/systems/InterpolationBuffer.js` (новый)
  - `src/multiplayer.js` (полностью переписан)
  - `src/systems/MultiplayerManager.js` (полностью переписан)
  - `src/systems/CombatCore.js` (рефакторинг `attack` + `applyAttackAt` + `hitEnemy` opts)
  - `src/systems/CombatLoot.js` (`broadcastBossKilled` → `notifyBossKilled`)
  - `src/scenes/GameScene.js` (`_guestAttack`, `_onMultiplayerGameOver`, `_onMultiplayerDisconnect`, `takeDamage` broadcast)
  - `src/zones/ForestZone.js`, `src/zones/CaveZone.js` (overlap callback → `mpManager.handleLocalLootPickup`)
- Документация: стандартная схема snapshot interpolation — Glenn Fiedler "Networking for Game Programmers" (https://gafferongames.com/post/snapshot_interpolation/)
- Связанные знания: [[convention-enemy-texture-template]], [[convention-hp-bar-depth]]
