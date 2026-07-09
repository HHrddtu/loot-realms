# Balance Config — Конфигурация баланса

#tech #balance

Все числовые константы вынесены в `src/config/balance.js` и `src/config/ui.js`.

## Combat Constants (`balance.js`)

### Бой
| Константа | Значение | Описание |
|-----------|----------|----------|
| INVINCIBILITY_DURATION | 500ms | Длительность неуязвимости после получения урона |
| MELEE_RANGE | 55px | Дистанция ближнего боя |
| MELEE_COOLDOWN | 280ms | Кулдаун атаки |
| MELEE_DMG_MULT | 1.0 | Множитель урона ближнего боя |
| MELEE_HIT_RADIUS | 35px | Радиус попадания |

### Armor Shred
| Константа | Значение |
|-----------|----------|
| MAX_ARMOR_SHRED_STACKS | 3 |
| ARMOR_SHRED_PER_STACK_PCT | 5% |
| LOW_HP_DAMAGE_BONUS_THRESHOLD | 30% HP |
| LIFELINK_DAMAGE_REDUCTION | 0.7 (30% reduction) |

### Respawn Timers
| Объект | Таймер |
|--------|--------|
| Chest | 12s |
| Stump | 8s |
| Enemy | 3s |
| Village Chest Destroy | 2.5s |

### Boss Drop Chances
| Босс | Шанс второго дропа |
|------|-------------------|
| Forest (Treant) | 50% |
| Mine (Skeleton Lord) | 60% |
| Cave (Giant Bat) | 60% |

### Spell Config
| Параметр | Значение |
|----------|----------|
| PROJECTILE_DMG_SCALING | 0.5 |
| METEOR_DMG_SCALING | 0.5 |
| ACID_FLASK_DMG_SCALING | 0.3 |
| SHIELD_HP_BONUS_PCT | 10% |
| DOT_TICK_INTERVAL | 500ms |
| SOUL_STRIKE_HEAL_ON_HIT | 50% |
| PURIFY_HEAL_MULT | 1.05 |

### Level Up
| Параметр | Значение |
|----------|----------|
| BASE_XP | 300 |
| EXPONENT | 1.6 |
| HP_PER_LVL | 5 |
| DMG_PER_LVL | 5 |
| SPD_PER_LVL | 5 |
| CRIT_PER_LVL | 3% |
| REGEN_PER_LVL | 2 |

### Player
| Параметр | Значение |
|----------|----------|
| PLAYER_BODY_WIDTH | 18px |
| PLAYER_BODY_HEIGHT | 38px |
| INVENTORY_SLOTS | 20 |
| CONSUMABLE_DURATION | 60s |
| BASE_CRIT_DAMAGE_MULT | 1.5 |
| DEFAULT_CORRUPTION_DECAY | 0.08 |

### Multiplayer
| Параметр | Значение |
|----------|----------|
| STATE_SEND_INTERVAL | 50ms |
| MOB_SYNC_INTERVAL | 100ms |

### Timers
| Параметр | Значение |
|----------|----------|
| AUTO_SAVE_INTERVAL | 300s (5 min) |
| BOSS_DEFEATED_TEXT | 5s |

## UI Colors (`ui.js`)

| Константа | Цвет | Назначение |
|-----------|------|------------|
| COLOR_HP_BAR_BG | 0x333333 | Фон HP бара |
| COLOR_HP_BAR_FILL | 0xe74c3c | Заполнение HP (красный) |
| COLOR_GOLD | 0xf1c40f | Золото (жёлтый) |
| COLOR_BG_DARK | 0x0a0a1a | Тёмный фон |
| COLOR_CORRUPTION_TINT | 0x9b59b6 | Коррупция (фиолетовый) |
| COLOR_METEOR | 0xe74c3c | Метеор (красный) |
| COLOR_SOUL_STRIKE | 0xf1c40f | Soul Strike (жёлтый) |
| COLOR_CHEMICAL_CLOUD | 0x27ae60 | Chemical Cloud (зелёный) |

---

> См. также: [[06-mechanics/Combat|Combat]], [[04-systems/SpellSystem|SpellSystem]]
