# Баги

#bug #index

## Активные (требуют доработки)
| # | Баг | Статус | Коммит |
|---|-----|--------|--------|
| 1 | Fire Auth: баг ника (race condition onAuthStateChanged) | ⚠️ | — |
| 2 | LoginScene HTML инпуты нестабильны при resize | ⚠️ | — |
| 3 | Multiplayer: нет offline fallback | ⚠️ | — |

## Исправленные (последние 10 коммитов)

### Scene Management
| # | Баг | Фикс | Коммит |
|---|-----|------|--------|
| 4 | Сцены не возобновляют GameScene при закрытии | Добавлен shutdown cleanup, resume handlers | 0f54962 |
| 5 | Scene back button не работал корректно | Упрощён back button, shutdown cleanup | fda7834 |
| 6 | Scene freezes при переключении сцен | Добавлены shutdown handlers во все scene | 5b6cf0d |

### Castle Child NPC
| # | Баг | Фикс | Коммит |
|---|-----|------|--------|
| 7 | Castle child NPC исчезал после разговора | Добавлен respawn на re-enter | 99eeea8 |
| 8 | isThriving изменение ломало spawn child NPC | Revert isThriving изменения | ec65a62 |
| 9 | CastleChildNPC уничтожался при входе в Castle | Защита от destroy на castle entry | 2ad1347 |
| 10 | CastleChildNPC не восстанавливался при ре-энтере | cleanup + respawn на village return | e473aa6 |
| 11 | Child NPC больше не возвращается после побега | Castle child runs away after talking, never returns | 209cab7 |

### Village & Guard
| # | Баг | Фикс | Коммит |
|---|-----|------|--------|
| 12 | Child NPC не появлялся при повторном входе | Добавлен respawn trigger | 641d75e |
| 13 | Village guard visibility | Исправлена видимость guard | f10a5c8 |
| 14 | Village NPC sync в мультиплеере | Multiplayer mob damage sync + village NPC | bacb28b |

### Combat & Spells
| # | Баг | Фикс | Коммит |
|---|-----|------|--------|
| 15 | PhysicsGroup crash в SpellProjectile | Null check + защита PhysicsGroup | f1dc518 |
| 16 | Shield glow не очищался | BaseZone._destroyShield() cleanup | 9bd5d63 |
| 17 | Shield glow cleanup не полный | Полный cleanup shield, guard, zone | f10a5c8 |
| 18 | Child NPC не виден (текстура слишком мала) | child_npc текстура увеличена 10×14→24×28 | 1536dad |

### Save & UI
| # | Баг | Фикс | Коммит |
|---|-----|------|--------|
| 19 | Save indicator crash при shutdown | Null check save indicator | 3bd1529 |
| 20 | PauseMenu crash при уничтожении группы врагов | Null check enemies group | b68fbf8 |
| 21 | Save indicator не обновлялся | Добавлен null check + улучшение текстур эффектов | 4013c23 |

## История багов (старые)

| # | Баг | Версия |
|---|-----|--------|
| 22 | HP:NaN после Ice Spirit | v0.11.0 |
| 23 | Campfire не работал | v0.11.0 |
| 24 | Cave stairs ghost | v0.9.8 |
| 25 | Account equipment save | v0.9.8 |
| 26 | Ресет зоны после PetScene | v0.17.0 |

---

> См. также: [[12-plans/TASK_QUEUE|TASK_QUEUE]], [[12-plans/ROADMAP|Roadmap]]
