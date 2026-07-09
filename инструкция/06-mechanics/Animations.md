# Animations — Анимации

#mechanics #animations

Все игровые анимации определены в `src/config/animations.js` через функцию `createAllAnimations()`.

## Walk Animations

### Игроки
| Ключ | Текстура | FrameRate | Repeat |
|------|----------|-----------|--------|
| sage_walk_right | player_sage_walk | 8 | ∞ |
| alchemist_walk_right | player_alchemist_walk | 7 | ∞ |
| angel_walk_right | player_angel_walk | 7 | ∞ |

### Forest
| Ключ | Текстура | FrameRate |
|------|----------|-----------|
| goblin_walk | goblin_walk | 6 |
| slime_walk | slime_walk | 5 |
| rat_walk | rat_walk | 8 |

### Mine
| Ключ | Текстура | FrameRate |
|------|----------|-----------|
| skeleton_walk | skeleton_walk | 5 |
| skeleton_archer_walk_anim | skeleton_archer_walk | 5 |
| skeleton_shaman_walk_anim | skeleton_shaman_walk | 4 |
| treant_walk | treant_walk | 3 |
| skeleton_lord_walk | skeleton_lord_walk | 4 |

### Cave
| Ключ | Текстура | FrameRate |
|------|----------|-----------|
| cave_spider_walk_anim | cave_spider_walk | 8 |
| cave_bat_walk_anim | cave_bat_walk | 7 |
| stone_golem_walk_anim | stone_golem_walk | 3 |
| earth_worm_walk_anim | earth_worm_walk | 4 |
| giant_bat_walk_anim | giant_bat_walk | 5 |

### Village
| Ключ | Текстура | FrameRate |
|------|----------|-----------|
| village_brute_walk_anim | village_brute_walk | 4 |
| village_stalker_walk_anim | village_stalker_walk | 9 |
| village_spitter_walk_anim | village_spitter_walk | 6 |
| village_curser_walk_anim | village_curser_walk | 5 |
| zombie_walk_anim | zombie_walk | 3 |

### Hell
| Ключ | Текстура | FrameRate |
|------|----------|-----------|
| purple_demon_walk_anim | purple_demon_walk | 4 |
| hell_guard_walk_anim | hell_guard_walk | 4 |
| hell_stalker_walk_anim | hell_stalker_walk | 9 |
| hell_archer_walk_anim | hell_archer_walk | 6 |
| hell_mage_walk_anim | hell_mage_walk | 5 |
| hell_priest_walk_anim | hell_priest_walk | 5 |
| hell_imp_walk_anim | hell_imp_walk | 8 |
| red_demon_walk_anim | red_demon_walk | 4 |

### Castle (single-frame)
| Ключ | Текстура |
|------|----------|
| bandit_melee_walk_anim | bandit_melee |
| bandit_ranger_walk_anim | bandit_ranger |
| bandit_elite_walk_anim | bandit_elite |
| bandit_leader_walk_anim | bandit_leader |

## Attack Animations
| Ключ | Текстура | FrameRate |
|------|----------|-----------|
| sage_attack | player_sage_attack | 10 |
| alchemist_attack | player_alchemist_attack | 10 |
| angel_attack | player_angel_attack | 10 |
| goblin_attack | goblin_attack | 10 |
| skeleton_attack | skeleton_attack | 8 |
| skeleton_lord_attack | skeleton_lord_attack | 6 |

## Idle Animations
| Ключ | Текстура |
|------|----------|
| sage_idle | player_sage |

---

> См. также: [[08-textures/_textures_index|Textures]], [[09-enemies/_enemies_index|Enemies]]
