/**
 * Equipment Sets
 * When player equips all pieces of a set, they get bonus effects.
 */

export const EQUIPMENT_SETS = {
    // Forest Set - Beginner set, easy to get
    forest: {
        id: 'forest',
        name: 'Forest Wanderer',
        nameRu: 'Странник Леса',
        nameDe: 'Waldwanderer',
        pieces: ['rusty_sword', 'leather_armor', 'wood_ring'],
        bonuses: [
            { pieces: 2, name: 'Forest Touch', nameRu: 'Касание Леса', effects: { hpPercent: 5, regenFlat: 1 } },
            { pieces: 3, name: 'Forest Guardian', nameRu: 'Хранитель Леса', effects: { hpPercent: 10, damagePercent: 5, regenFlat: 2 } }
        ]
    },

    // Iron Set - Mid-game
    iron: {
        id: 'iron',
        name: 'Iron Warden',
        nameRu: 'Железный Страж',
        nameDe: 'Eisenwächter',
        pieces: ['iron_sword', 'iron_armor', 'ruby_ring'],
        bonuses: [
            { pieces: 2, name: 'Iron Will', nameRu: 'Железная Воля', effects: { damageReduction: 5, hpPercent: 8 } },
            { pieces: 3, name: 'Iron Fortress', nameRu: 'Железная Крепость', effects: { damageReduction: 15, hpPercent: 15, damagePercent: 10 } }
        ]
    },

    // Flame Set - Rare
    flame: {
        id: 'flame',
        name: 'Flame Slayer',
        nameRu: 'Пламенный Убийца',
        nameDe: 'Flammentöter',
        pieces: ['flame_blade', 'dragon_scale', 'sapphire_ring'],
        bonuses: [
            { pieces: 2, name: 'Flame Power', nameRu: 'Сила Пламени', effects: { damagePercent: 15, critPercent: 5 } },
            { pieces: 3, name: 'Inferno', nameRu: 'Инферно', effects: { damagePercent: 25, critPercent: 10, spellPercent: 10 } }
        ]
    },

    // Dragon Set - Epic
    dragon: {
        id: 'dragon',
        name: 'Dragon Knight',
        nameRu: 'Драконий Рыцарь',
        nameDe: 'Drachenritter',
        pieces: ['flame_blade', 'dragon_scale', 'ruby_ring', 'crown'],
        bonuses: [
            { pieces: 2, name: 'Dragon Blood', nameRu: 'Кровь Дракона', effects: { hpPercent: 15, damagePercent: 10 } },
            { pieces: 3, name: 'Dragon Heart', nameRu: 'Сердце Дракона', effects: { hpPercent: 25, damagePercent: 20, critPercent: 8 } },
            { pieces: 4, name: 'Dragon Soul', nameRu: 'Душа Дракона', effects: { hpPercent: 35, damagePercent: 30, critPercent: 15, spellPercent: 15 } }
        ]
    },

    // Sage Set - Account equipment
    sage_set: {
        id: 'sage_set',
        name: 'Sage Mastery',
        nameRu: 'Мудрость Мудреца',
        nameDe: 'Weisheit des Weisen',
        pieces: ['sage_hat', 'sage_mantle', 'sage_legs', 'sage_book', 'sage_amulet'],
        bonuses: [
            { pieces: 3, name: 'Scholar', nameRu: 'Учёный', effects: { spellPercent: 10, critPercent: 5 } },
            { pieces: 5, name: 'Grand Sage', nameRu: 'Великий Мудрец', effects: { spellPercent: 25, critPercent: 12, corruptionMax: 20 } }
        ]
    },

    // Alchemist Set - Account equipment
    alch_set: {
        id: 'alch_set',
        name: 'Alchemist Mastery',
        nameRu: 'Мудрость Алхимика',
        nameDe: 'Weisheit des Alchemisten',
        pieces: ['alch_hat', 'alch_mantle', 'alch_legs', 'alch_wand', 'alch_amulet'],
        bonuses: [
            { pieces: 3, name: 'Transmuter', nameRu: 'Трансмутатор', effects: { spellPercent: 8, hpPercent: 10 } },
            { pieces: 5, name: 'Philosopher', nameRu: 'Философ', effects: { spellPercent: 20, damagePercent: 15, hpPercent: 20 } }
        ]
    },

    // Angel Set - Account equipment
    angel_set: {
        id: 'angel_set',
        name: 'Angel Mastery',
        nameRu: 'Мудрость Ангела',
        nameDe: 'Weisheit des Engels',
        pieces: ['angel_hat', 'angel_mantle', 'angel_legs', 'angel_staff', 'angel_amulet'],
        bonuses: [
            { pieces: 3, name: 'Holy Light', nameRu: 'Свет Святости', effects: { regenPercent: 5, dodgePercent: 5 } },
            { pieces: 5, name: 'Divine Avatar', nameRu: 'Божественный Аватар', effects: { hpPercent: 20, regenPercent: 10, corruptionMax: 25, spellPercent: 15 } }
        ]
    }
};

/**
 * Get active set bonuses for equipped items.
 * @param {Object} equipment - current equipment { weapon, armor, accessory }
 * @param {Object} accountEquipment - account equipment { hat, mantle, legs, weapon, accessory, ring, charm, relic }
 * @returns {Object} aggregated set bonuses
 */
export function getSetBonuses(equipment, accountEquipment) {
    const bonuses = {};
    const equippedIds = new Set();

    // Collect all equipped item IDs
    if (equipment) {
        Object.values(equipment).forEach(item => {
            if (item && item.id) equippedIds.add(item.id);
        });
    }
    if (accountEquipment) {
        Object.values(accountEquipment).forEach(item => {
            if (item && item.id) equippedIds.add(item.id);
        });
    }

    // Check each set
    Object.values(EQUIPMENT_SETS).forEach(set => {
        let equippedCount = 0;
        set.pieces.forEach(pieceId => {
            if (equippedIds.has(pieceId)) equippedCount++;
        });

        // Apply bonuses for each tier
        set.bonuses.forEach(bonus => {
            if (equippedCount >= bonus.pieces) {
                for (const [key, value] of Object.entries(bonus.effects)) {
                    if (!bonuses[key]) bonuses[key] = 0;
                    bonuses[key] += value;
                }
            }
        });
    });

    return bonuses;
}

/**
 * Get set info for display.
 * @param {Object} equipment
 * @param {Object} accountEquipment
 * @returns {Array} list of active sets with progress
 */
export function getSetInfo(equipment, accountEquipment) {
    const equippedIds = new Set();
    if (equipment) {
        Object.values(equipment).forEach(item => {
            if (item && item.id) equippedIds.add(item.id);
        });
    }
    if (accountEquipment) {
        Object.values(accountEquipment).forEach(item => {
            if (item && item.id) equippedIds.add(item.id);
        });
    }

    const activeSets = [];
    Object.values(EQUIPMENT_SETS).forEach(set => {
        let equippedCount = 0;
        set.pieces.forEach(pieceId => {
            if (equippedIds.has(pieceId)) equippedCount++;
        });

        if (equippedCount > 0) {
            const activeBonuses = [];
            set.bonuses.forEach(bonus => {
                if (equippedCount >= bonus.pieces) {
                    activeBonuses.push({ name: bonus.name, effects: bonus.effects, active: true });
                } else {
                    activeBonuses.push({ name: bonus.name, effects: bonus.effects, active: false, needed: bonus.pieces });
                }
            });
            activeSets.push({
                name: set.name,
                equipped: equippedCount,
                total: set.pieces.length,
                bonuses: activeBonuses
            });
        }
    });

    return activeSets;
}
