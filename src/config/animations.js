// Animation definitions - data-driven
// Each entry: { key, texture, frames?, frameRate, repeat }
// frames: { start, end } for sprite sheets, or [single frame] for static

const WALK_ANIMS = [
    // Players
    { key: 'sage_walk_right', texture: 'player_sage_walk', frames: { start: 0, end: 3 }, frameRate: 8, repeat: -1 },
    { key: 'alchemist_walk_right', texture: 'player_alchemist_walk', frames: { start: 0, end: 3 }, frameRate: 7, repeat: -1 },
    { key: 'angel_walk_right', texture: 'player_angel_walk', frames: { start: 0, end: 3 }, frameRate: 7, repeat: -1 },
    // Forest
    { key: 'goblin_walk', texture: 'goblin_walk', frames: { start: 0, end: 3 }, frameRate: 6, repeat: -1 },
    { key: 'slime_walk', texture: 'slime_walk', frames: { start: 0, end: 3 }, frameRate: 5, repeat: -1 },
    { key: 'rat_walk', texture: 'rat_walk', frames: { start: 0, end: 3 }, frameRate: 8, repeat: -1 },
    // Mine
    { key: 'skeleton_walk', texture: 'skeleton_walk', frames: { start: 0, end: 3 }, frameRate: 5, repeat: -1 },
    { key: 'skeleton_archer_walk_anim', texture: 'skeleton_archer_walk', frames: { start: 0, end: 3 }, frameRate: 5, repeat: -1 },
    { key: 'skeleton_shaman_walk_anim', texture: 'skeleton_shaman_walk', frames: { start: 0, end: 3 }, frameRate: 4, repeat: -1 },
    { key: 'treant_walk', texture: 'treant_walk', frames: { start: 0, end: 3 }, frameRate: 3, repeat: -1 },
    { key: 'skeleton_lord_walk', texture: 'skeleton_lord_walk', frames: { start: 0, end: 3 }, frameRate: 4, repeat: -1 },
    // Cave
    { key: 'cave_spider_walk_anim', texture: 'cave_spider_walk', frames: { start: 0, end: 3 }, frameRate: 8, repeat: -1 },
    { key: 'cave_bat_walk_anim', texture: 'cave_bat_walk', frames: { start: 0, end: 3 }, frameRate: 7, repeat: -1 },
    { key: 'stone_golem_walk_anim', texture: 'stone_golem_walk', frames: { start: 0, end: 3 }, frameRate: 3, repeat: -1 },
    { key: 'earth_worm_walk_anim', texture: 'earth_worm_walk', frames: { start: 0, end: 3 }, frameRate: 4, repeat: -1 },
    { key: 'giant_bat_walk_anim', texture: 'giant_bat_walk', frames: { start: 0, end: 3 }, frameRate: 5, repeat: -1 },
    { key: 'small_bat_walk_anim', texture: 'small_bat_walk', frames: { start: 0, end: 3 }, frameRate: 7, repeat: -1 },
    // Village
    { key: 'village_brute_walk_anim', texture: 'village_brute_walk', frames: { start: 0, end: 3 }, frameRate: 4, repeat: -1 },
    { key: 'village_stalker_walk_anim', texture: 'village_stalker_walk', frames: { start: 0, end: 3 }, frameRate: 9, repeat: -1 },
    { key: 'village_spitter_walk_anim', texture: 'village_spitter_walk', frames: { start: 0, end: 3 }, frameRate: 6, repeat: -1 },
    { key: 'village_curser_walk_anim', texture: 'village_curser_walk', frames: { start: 0, end: 3 }, frameRate: 5, repeat: -1 },
    { key: 'zombie_walk_anim', texture: 'zombie_walk', frames: { start: 0, end: 3 }, frameRate: 3, repeat: -1 },
    // Hell
    { key: 'purple_demon_walk_anim', texture: 'purple_demon_walk', frames: { start: 0, end: 3 }, frameRate: 4, repeat: -1 },
    { key: 'hell_guard_walk_anim', texture: 'hell_guard_walk', frames: { start: 0, end: 3 }, frameRate: 4, repeat: -1 },
    { key: 'hell_stalker_walk_anim', texture: 'hell_stalker_walk', frames: { start: 0, end: 3 }, frameRate: 9, repeat: -1 },
    { key: 'hell_archer_walk_anim', texture: 'hell_archer_walk', frames: { start: 0, end: 3 }, frameRate: 6, repeat: -1 },
    { key: 'hell_mage_walk_anim', texture: 'hell_mage_walk', frames: { start: 0, end: 3 }, frameRate: 5, repeat: -1 },
    { key: 'hell_priest_walk_anim', texture: 'hell_priest_walk', frames: { start: 0, end: 3 }, frameRate: 5, repeat: -1 },
    { key: 'hell_imp_walk_anim', texture: 'hell_imp_walk', frames: { start: 0, end: 3 }, frameRate: 8, repeat: -1 },
    { key: 'red_demon_walk_anim', texture: 'red_demon_walk', frames: { start: 0, end: 3 }, frameRate: 4, repeat: -1 },
    { key: 'ancient_evil_walk_anim', texture: 'ancient_evil_walk', frames: { start: 0, end: 3 }, frameRate: 4, repeat: -1 },
    // Castle (single-frame)
    { key: 'bandit_melee_walk_anim', texture: 'bandit_melee', frames: null, frameRate: 1, repeat: -1 },
    { key: 'bandit_ranger_walk_anim', texture: 'bandit_ranger', frames: null, frameRate: 1, repeat: -1 },
    { key: 'bandit_elite_walk_anim', texture: 'bandit_elite', frames: null, frameRate: 1, repeat: -1 },
    { key: 'bandit_leader_walk_anim', texture: 'bandit_leader', frames: null, frameRate: 1, repeat: -1 },
];

const ATTACK_ANIMS = [
    { key: 'sage_attack', texture: 'player_sage_attack', frames: { start: 0, end: 2 }, frameRate: 10, repeat: 0 },
    { key: 'alchemist_attack', texture: 'player_alchemist_attack', frames: { start: 0, end: 2 }, frameRate: 10, repeat: 0 },
    { key: 'angel_attack', texture: 'player_angel_attack', frames: { start: 0, end: 2 }, frameRate: 10, repeat: 0 },
    // Dedicated enemy attack sheets
    { key: 'goblin_attack', texture: 'goblin_attack', frames: { start: 0, end: 2 }, frameRate: 10, repeat: 0 },
    { key: 'skeleton_attack', texture: 'skeleton_attack', frames: { start: 0, end: 2 }, frameRate: 8, repeat: 0 },
    { key: 'skeleton_lord_attack', texture: 'skeleton_lord_attack', frames: { start: 0, end: 2 }, frameRate: 6, repeat: 0 },
    { key: 'shadow_child_attack', texture: 'shadow_child_attack', frames: { start: 0, end: 2 }, frameRate: 10, repeat: 0 },
    { key: 'ancient_evil_attack', texture: 'ancient_evil_attack', frames: { start: 0, end: 3 }, frameRate: 7, repeat: 0 },
    // Fast walk-cycle reuse: gives melee mobs a readable wind-up without new assets
    { key: 'slime_attack_anim', texture: 'slime_walk', frames: { start: 0, end: 3 }, frameRate: 14, repeat: 0 },
    { key: 'rat_attack_anim', texture: 'rat_walk', frames: { start: 0, end: 3 }, frameRate: 14, repeat: 0 },
    { key: 'village_brute_attack_anim', texture: 'village_brute_walk', frames: { start: 0, end: 3 }, frameRate: 12, repeat: 0 },
    { key: 'hell_guard_attack_anim', texture: 'hell_guard_walk', frames: { start: 0, end: 3 }, frameRate: 12, repeat: 0 },
    { key: 'tower_knight_attack_anim', texture: 'tower_knight_walk', frames: { start: 0, end: 3 }, frameRate: 12, repeat: 0 },
];

const DEATH_ANIMS = [
    { key: 'ancient_evil_death', texture: 'ancient_evil_death', frames: { start: 0, end: 5 }, frameRate: 8, repeat: 0 },
];

// Mob key -> attack animation key. Mobs without an entry use a generic lunge VFX.
const ENEMY_ATTACK_ANIMS = {
    goblin: 'goblin_attack',
    slime: 'slime_attack_anim',
    rat: 'rat_attack_anim',
    skeleton_warrior: 'skeleton_attack',
    skeleton_archer: 'skeleton_attack',
    skeleton_shaman: 'skeleton_attack',
    skeleton_shield: 'skeleton_attack',
    skeleton_lord: 'skeleton_lord_attack',
    shadow_child: 'shadow_child_attack',
    village_brute: 'village_brute_attack_anim',
    hell_guard: 'hell_guard_attack_anim',
    tower_knight: 'tower_knight_attack_anim',
    ancient_evil: 'ancient_evil_attack'
};

export function getEnemyAttackAnim(key) {
    return ENEMY_ATTACK_ANIMS[key] || null;
}

export function hasDeathAnim(key) {
    return key === 'ancient_evil';
}

const IDLE_ANIMS = [
    { key: 'sage_idle', texture: 'player_sage', frames: null, frameRate: 1, repeat: -1 },
];

/**
 * Create all game animations from config.
 * @param {Phaser.Animations.AnimationManager} anims
 */
export function createAllAnimations(anims) {
    const all = [...WALK_ANIMS, ...ATTACK_ANIMS, ...DEATH_ANIMS, ...IDLE_ANIMS];

    for (const def of all) {
        if (anims.exists(def.key)) continue;

        let frames;
        if (def.frames === null) {
            // Single-frame animation
            frames = [{ key: def.texture, frame: 0 }];
        } else {
            // Sprite sheet animation
            frames = anims.generateFrameNumbers(def.texture, def.frames);
        }

        anims.create({
            key: def.key,
            frames,
            frameRate: def.frameRate,
            repeat: def.repeat
        });
    }
}
