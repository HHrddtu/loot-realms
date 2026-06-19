// ── Combat ──
export const INVINCIBILITY_DURATION = 500;
export const MELEE_RANGE = 55;
export const MELEE_COOLDOWN = 280;
export const MELEE_DMG_MULT = 1.0;
export const MELEE_HIT_RADIUS = 35;
export const MELEE_SLASH_COLOR = 0xaaddff;
export const RANGED_PROJECTILE_SPEED = 350;
export const RANGED_ATTACK_RANGE = 120;
export const RANGEDProjectile_TINT = 0xf1c40f;

export const MAX_ARMOR_SHRED_STACKS = 3;
export const ARMOR_SHRED_PER_STACK_PCT = 5;
export const LOW_HP_DAMAGE_BONUS_THRESHOLD = 0.3;
export const ARMOR_SHRED_DAMAGE_BONUS_PER_STACK = 0.05;
export const LIFELINK_DAMAGE_REDUCTION = 0.7;

export const CHEST_RESPAWN_MS = 12000;
export const STUMP_RESPAWN_MS = 8000;
export const ENEMY_RESPAWN_MS = 3000;
export const VILLAGE_CHEST_DESTROY_DELAY = 2500;

export const COIN_DROP_COUNT = 3;
export const COIN_SPREAD_X = 12;
export const COIN_SPREAD_Y = 8;
export const COIN_FLOAT_DISTANCE = 25;
export const COIN_ANIM_BASE_DURATION = 500;
export const COIN_ANIM_PER_COIN = 100;
export const COIN_ANIM_STAGGER = 80;

export const BOSS_SECOND_DROP_CHANCE_FOREST = 0.5;
export const BOSS_SECOND_DROP_CHANCE_MINE = 0.6;
export const BOSS_SECOND_DROP_CHANCE_CAVE = 0.6;

export const ENEMY_DROP_MATERIAL_COUNT = 2;
export const CHEST_DROP_MATERIAL_COUNT = 2;

// ── Camera ──
export const DAMAGE_SHAKE_DURATION = 100;
export const DAMAGE_SHAKE_INTENSITY = 0.002;
export const RESPAWN_SHAKE_DURATION = 200;
export const RESPAWN_SHAKE_INTENSITY = 0.01;
export const BOSS_DEATH_SHAKE_DURATION = 200;
export const BOSS_DEATH_SHAKE_INTENSITY = 0.008;

// ── Spells ──
export const PROJECTILE_DMG_SCALING = 0.5;
export const METEOR_DMG_SCALING = 0.5;
export const ACID_FLASK_DMG_SCALING = 0.3;
export const SHIELD_HP_BONUS_PCT = 0.1;
export const CHAIN_LIGHTNING_DAMAGE_MULT = 0.6;
export const CHAIN_LIGHTNING_SEARCH_RADIUS = 722;
export const DOT_TICK_INTERVAL = 500;

export const SPELLProjectile_OFFSET = 20;
export const SOUL_STRIKE_SPEED = 350;
export const SOUL_STRIKE_HEAL_ON_HIT_PCT = 0.5;
export const PURIFY_HEAL_MULT = 1.05;

// ── Spell Radii ──
export const METEOR_CAST_RANGE = 300;
export const METEOR_RADIUS = 100;
export const CHEMICAL_CLOUD_CAST_RANGE = 200;
export const CHEMICAL_CLOUD_RADIUS = 90;
export const ACID_FLASK_CAST_RANGE = 250;
export const ACID_FLASK_RADIUS = 50;
export const HOLY_SHIELD_SEARCH_RADIUS = 60;
export const HOLY_NOVA_RADIUS = 120;
export const TOXIC_PUDDLE_CAST_RANGE = 200;
export const TOXIC_PUDDLE_RADIUS = 70;
export const TOXIC_PUDDLE_SLOW_PCT = 40;
export const HEAL_ZONE_RADIUS = 80;
export const HEAL_ZONE_DURATION = 3.0;
export const HEAL_ZONE_HEAL_PER_SEC = 0.04;

// ── Player ──
export const BASE_CRIT_DAMAGE_MULT = 1.5;
export const DEFAULT_CORRUPTION_DECAY = 0.08;
export const LEVEL_UP_XP_BASE = 200;
export const LEVEL_UP_XP_EXPONENT = 1.5;

export const UPGRADE_HP_PER_LVL = 5;
export const UPGRADE_DMG_PER_LVL = 5;
export const UPGRADE_SPD_PER_LVL = 5;
export const UPGRADE_CRIT_PER_LVL = 3;
export const UPGRADE_REGEN_PER_LVL = 2;

export const INVENTORY_SLOTS = 20;
export const EQUIP_BAG_DIVISOR = 2;

export const CONSUMABLE_DURATION_MS = 60000;
export const CONSUMABLE_LIFESTEAL_DURATION_MS = 45000;

// ── Item Rarity XP Multipliers ──
export const RARITY_XP_MULT = { common: 1, uncommon: 2, rare: 3, epic: 4, legendary: 5 };
export const ITEM_DELETE_XP_BASE = 10;
export const ITEM_DELETE_XP_LEVEL_SCALE = 0.05;
export const ACCOUNT_XP_FRACTION = 0.5;

// ── Respawn ──
export const ARENA_RESPAWN_X = 400;
export const ARENA_RESPAWN_Y = 500;

// ── Enemy Behavior ──
export const ENEMY_WANDER_SPEED = 50;
export const ENEMY_WANDER_TICK_THRESHOLD = 60;
export const BOSS_CLONE_BASE_SPEED = 60;
export const BOSS_CLONE_CLOSE_RANGE_SPEED_MULT = 1.4;
export const BOSS_CLONE_MIN_DISTANCE = 16;

// ── Player Body ──
export const PLAYER_BODY_WIDTH = 18;
export const PLAYER_BODY_HEIGHT = 38;
export const PLAYER_BODY_OFFSET_X = 7;
export const PLAYER_BODY_OFFSET_Y = 8;
export const REMOTE_PLAYER_ALPHA = 0.7;
export const REMOTE_PLAYER_NAME_OFFSET_Y = 28;

// ── Multiplayer Sync ──
export const MP_STATE_SEND_INTERVAL = 50;
export const MP_MOB_SYNC_INTERVAL = 100;

// ── Timers ──
export const AUTO_SAVE_INTERVAL = 300000;
export const BOSS_DEFEATED_TEXT_DURATION = 5000;
