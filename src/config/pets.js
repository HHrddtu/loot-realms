// Pet types: companion(+stats), attacker(dps), tank(aggro), collector(loot)
export const PET_TYPES = {
    companion: { name: 'Companion', nameRu: 'Спутник', desc: 'Follows and boosts stats' },
    attacker:  { name: 'Attacker',  nameRu: 'Атакер',  desc: 'Attacks nearest enemy' },
    tank:      { name: 'Tank',      nameRu: 'Танк',    desc: 'Draws enemy aggro' },
    collector: { name: 'Collector', nameRu: 'Собиратель', desc: 'Auto-picks loot' }
};

export const PET_RARITY = {
    common:    { color: 0xaaaaaa, name: 'Common',    nameRu: 'Обычный',   dropChance: 1.0 },
    uncommon:  { color: 0x2ecc71, name: 'Uncommon',  nameRu: 'Необычный', dropChance: 1.0 },
    rare:      { color: 0x3498db, name: 'Rare',      nameRu: 'Редкий',    dropChance: 1.0 },
    legendary: { color: 0xf39c12, name: 'Legendary', nameRu: 'Легендарный', dropChance: 1.0 }
};

export const PET_DB = [
    // Common
    { id: 'pet_slime',     name: 'Slime',      nameRu: 'Слайм',      type: 'companion', rarity: 'common',   texKey: 'pet_slime',     stats: { hpPercent: 2 },              desc: 'A bouncy companion that adds a bit of health.' },
    { id: 'pet_rat',       name: 'Rat',         nameRu: 'Крыса',      type: 'collector', rarity: 'common',   texKey: 'pet_rat',       stats: { lootPercent: 3 },             desc: 'Sniffs out nearby treasures.' },
    { id: 'pet_bat',       name: 'Bat',         nameRu: 'Летучая',    type: 'attacker',  rarity: 'common',   texKey: 'pet_bat',       stats: { damagePercent: 2 },           desc: 'A tiny fanged friend.' },

    // Uncommon
    { id: 'pet_wolf',      name: 'Wolf Pup',    nameRu: 'Волчонок',   type: 'attacker',  rarity: 'uncommon', texKey: 'pet_wolf',      stats: { damagePercent: 4, critPercent: 2 }, desc: 'A fierce pup with sharp instincts.' },
    { id: 'pet_spider',    name: 'Spider',      nameRu: 'Паук',       type: 'collector', rarity: 'uncommon', texKey: 'pet_spider',    stats: { lootPercent: 5, speedPercent: 2 }, desc: 'Weaves webs that catch shiny things.' },
    { id: 'pet_imp',       name: 'Imp',         nameRu: 'Имп',        type: 'companion', rarity: 'uncommon', texKey: 'pet_imp',       stats: { spellPercent: 4, hpPercent: 3 }, desc: 'A mischievous magical familiar.' },

    // Rare
    { id: 'pet_golem',     name: 'Golem',       nameRu: 'Голем',      type: 'tank',      rarity: 'rare',     texKey: 'pet_golem',     stats: { hpPercent: 8, damageReduction: 3 }, desc: 'A stone guardian that absorbs hits.' },
    { id: 'pet_wraith',    name: 'Wraith',      nameRu: 'Призрак',    type: 'attacker',  rarity: 'rare',     texKey: 'pet_wraith',    stats: { damagePercent: 7, critPercent: 4 }, desc: 'A spectral assassin.' },
    { id: 'pet_drake',     name: 'Baby Drake',  nameRu: 'Детёныш',    type: 'companion', rarity: 'rare',     texKey: 'pet_drake',     stats: { damagePercent: 5, hpPercent: 5, spellPercent: 3 }, desc: 'A tiny dragon with big potential.' },

    // Legendary
    { id: 'pet_phoenix',   name: 'Phoenix',     nameRu: 'Феникс',     type: 'companion', rarity: 'legendary', texKey: 'pet_phoenix',   stats: { damagePercent: 8, regenPercent: 5, spellPercent: 5 }, desc: 'Reborn from ash, radiates power.' },
    { id: 'pet_dragon',    name: 'Dragon',      nameRu: 'Дракон',     type: 'attacker',  rarity: 'legendary', texKey: 'pet_dragon',    stats: { damagePercent: 12, critPercent: 6, hpPercent: 6 }, desc: 'The apex predator of the skies.' },
    { id: 'pet_celestial', name: 'Celestial',   nameRu: 'Небесный',   type: 'tank',      rarity: 'legendary', texKey: 'pet_celestial', stats: { hpPercent: 12, damageReduction: 8, regenPercent: 4 }, desc: 'A divine being of pure light.' }
];

// Scale stats by pet level (1-5)
export function getPetStats(petId, level) {
    const pet = PET_DB.find(p => p.id === petId);
    if (!pet) return {};
    const scale = 1 + (level - 1) * 0.3;
    const scaled = {};
    Object.entries(pet.stats).forEach(([k, v]) => {
        scaled[k] = Math.floor(v * scale * 10) / 10;
    });
    return scaled;
}

// EXP required per level
export function getPetLevelUpReq(level) {
    return Math.floor(50 * Math.pow(level, 1.6));
}

// ===== CASES (loot boxes) =====

export const CASE_DB = [
    {
        id: 'case_wood', name: 'Wooden Case', nameRu: 'Деревянный Кейс',
        texKey: 'case_wood', price: 30, rarity: 'common',
        drops: [
            { rarity: 'common', chance: 0.65 },
            { rarity: 'uncommon', chance: 0.28 },
            { rarity: 'rare', chance: 0.06 },
            { rarity: 'legendary', chance: 0.01 }
        ],
        petPool: ['pet_slime', 'pet_rat', 'pet_bat', 'pet_wolf', 'pet_spider', 'pet_imp']
    },
    {
        id: 'case_iron', name: 'Iron Case', nameRu: 'Железный Кейс',
        texKey: 'case_iron', price: 80, rarity: 'uncommon',
        drops: [
            { rarity: 'common', chance: 0.15 },
            { rarity: 'uncommon', chance: 0.50 },
            { rarity: 'rare', chance: 0.28 },
            { rarity: 'legendary', chance: 0.07 }
        ],
        petPool: ['pet_wolf', 'pet_spider', 'pet_imp', 'pet_golem', 'pet_wraith', 'pet_drake', 'pet_slime', 'pet_rat', 'pet_bat']
    },
    {
        id: 'case_gold', name: 'Golden Case', nameRu: 'Золотой Кейс',
        texKey: 'case_gold', price: 200, rarity: 'rare',
        drops: [
            { rarity: 'uncommon', chance: 0.15 },
            { rarity: 'rare', chance: 0.50 },
            { rarity: 'legendary', chance: 0.35 }
        ],
        petPool: ['pet_golem', 'pet_wraith', 'pet_drake', 'pet_phoenix', 'pet_dragon', 'pet_celestial']
    }
];

// Roll a random pet from a case
export function rollCaseDrop(caseId) {
    const c = CASE_DB.find(c => c.id === caseId);
    if (!c) return null;
    const roll = Math.random();
    let cumulative = 0;
    let targetRarity = 'common';
    for (const d of c.drops) {
        cumulative += d.chance;
        if (roll <= cumulative) { targetRarity = d.rarity; break; }
    }
    const pool = PET_DB.filter(p => p.rarity === targetRarity && c.petPool.includes(p.id));
    if (pool.length === 0) {
        const fallback = PET_DB.filter(p => c.petPool.includes(p.id));
        return fallback[Math.floor(Math.random() * fallback.length)] || PET_DB[0];
    }
    return pool[Math.floor(Math.random() * pool.length)] || PET_DB[0];
}

// ===== CRYSTAL DROPS (bosses only) =====

export const CRYSTAL_DROPS = {
    forest:   { bossMin: 4,  bossMax: 8 },
    mine:     { bossMin: 6,  bossMax: 12 },
    cave:     { bossMin: 10, bossMax: 18 },
    village:  { bossMin: 10, bossMax: 16 },
    cemetery: { bossMin: 15, bossMax: 25 },
    hell:     { bossMin: 20, bossMax: 35 },
    snowy:    { bossMin: 20, bossMax: 35 },
    castle:   { bossMin: 25, bossMax: 50 }
};

export const CRYSTAL_RUN_CAPS = {
    Normal: 200,
    Hard: 50,
    Expert: 75,
    Nightmare: 100,
    Hell: 150,
    Abyss: 200
};

export const CRYSTAL_DIFF_MULT = {
    Normal: 1.0,
    Hard: 0.8,
    Expert: 0.7,
    Nightmare: 0.6,
    Hell: 0.5,
    Abyss: 0.4
};

export function rollBossCrystals(zone, difficulty) {
    const d = CRYSTAL_DROPS[zone] || CRYSTAL_DROPS.forest;
    let amount = Math.floor(Math.random() * (d.bossMax - d.bossMin + 1)) + d.bossMin;
    const mult = CRYSTAL_DIFF_MULT[difficulty] || 1.0;
    amount = Math.floor(amount * mult);
    return Math.max(1, amount);
}

export function canGetCrystals(crystalsThisRun, difficulty) {
    const cap = CRYSTAL_RUN_CAPS[difficulty] || 200;
    return crystalsThisRun < cap;
}

export function getCrystalsRemaining(crystalsThisRun, difficulty) {
    const cap = CRYSTAL_RUN_CAPS[difficulty] || 200;
    return Math.max(0, cap - crystalsThisRun);
}
