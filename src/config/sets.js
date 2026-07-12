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
            { pieces: 2, name: 'Forest Touch', nameRu: 'Касание Леса', effects: { hpPercent: 10, regenPercent: 3 } },
            { pieces: 3, name: 'Forest Guardian', nameRu: 'Хранитель Леса', effects: { hpPercent: 18, damagePercent: 8, regenPercent: 5, regenOnLow: true } }
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
            { pieces: 2, name: 'Iron Will', nameRu: 'Железная Воля', effects: { damageReduction: 10, hpPercent: 12 } },
            { pieces: 3, name: 'Iron Fortress', nameRu: 'Железная Крепость', effects: { damageReduction: 20, hpPercent: 22, damagePercent: 12, drOnHit: true } }
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
            { pieces: 2, name: 'Flame Power', nameRu: 'Сила Пламени', effects: { damagePercent: 18, critPercent: 8 } },
            { pieces: 3, name: 'Inferno', nameRu: 'Инферно', effects: { damagePercent: 28, critPercent: 12, spellPercent: 12, burnOnCrit: true } }
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
            { pieces: 2, name: 'Dragon Blood', nameRu: 'Кровь Дракона', effects: { hpPercent: 18, damagePercent: 12 } },
            { pieces: 3, name: 'Dragon Heart', nameRu: 'Сердце Дракона', effects: { hpPercent: 28, damagePercent: 22, critPercent: 10 } },
            { pieces: 4, name: 'Dragon Soul', nameRu: 'Душа Дракона', effects: { hpPercent: 38, damagePercent: 32, critPercent: 18, spellPercent: 15, dragonBreath: true } }
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
            { pieces: 3, name: 'Scholar', nameRu: 'Учёный', effects: { spellPercent: 12, critPercent: 6 } },
            { pieces: 5, name: 'Grand Sage', nameRu: 'Великий Мудрец', effects: { spellPercent: 28, critPercent: 15, corruptionMax: 25, spellEcho: true } }
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
            { pieces: 3, name: 'Transmuter', nameRu: 'Трансмутатор', effects: { spellPercent: 10, hpPercent: 12 } },
            { pieces: 5, name: 'Philosopher', nameRu: 'Философ', effects: { spellPercent: 22, damagePercent: 18, hpPercent: 22, transmuteOnKill: true } }
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
            { pieces: 3, name: 'Holy Light', nameRu: 'Свет Святости', effects: { regenPercent: 8, dodgePercent: 8 } },
            { pieces: 5, name: 'Divine Avatar', nameRu: 'Божественный Аватар', effects: { hpPercent: 22, regenPercent: 12, corruptionMax: 30, spellPercent: 18, divineShield: true } }
        ]
    },

    // Bone Set - Depths
    bone_set: {
        id: 'bone_set',
        name: 'Bone Collector',
        nameRu: 'Собиратель Костей',
        nameDe: 'Knochensammler',
        pieces: ['craft_bone_sword', 'craft_spider_silk_armor', 'craft_bat_wing_cloak'],
        bonuses: [
            { pieces: 2, name: 'Bone Shield', nameRu: 'Костяной Щит', effects: { hpPercent: 10, damageReduction: 5 } },
            { pieces: 3, name: 'Undead Resilience', nameRu: 'Нежить Стойкость', effects: { hpPercent: 18, regenPercent: 3, damageReduction: 8, boneShield: true } }
        ]
    },

    // Cursed Set - Cursed Lands
    cursed_set: {
        id: 'cursed_set',
        name: 'Cursed Battlegear',
        nameRu: 'Проклятая Боевая Амуниция',
        nameDe: 'Verfluchte Kampfausrüstung',
        pieces: ['craft_venom_blade', 'craft_grave_armor', 'craft_holy_amulet'],
        bonuses: [
            { pieces: 2, name: 'Cursed Strike', nameRu: 'Проклятый Удар', effects: { damagePercent: 12, lifeStealPercent: 3 } },
            { pieces: 3, name: 'Vampiric Fury', nameRu: 'Вампирическая Ярость', effects: { damagePercent: 22, lifeStealPercent: 8, hpPercent: 10, curseOnKill: true } }
        ]
    },

    // Shadow Set - Shadow District
    shadow_set: {
        id: 'shadow_set',
        name: 'Shadow Dancer',
        nameRu: 'Танцор Теней',
        nameDe: 'Schattentänzer',
        pieces: ['craft_shadow_blade', 'craft_void_armor', 'craft_mirror_ring'],
        bonuses: [
            { pieces: 2, name: 'Shadow Step', nameRu: 'Шаг Тени', effects: { critPercent: 8, dodgePercent: 5 } },
            { pieces: 3, name: 'Mirror Image', nameRu: 'Зеркальное Отражение', effects: { critPercent: 15, dodgePercent: 12, speedPercent: 8, shadowClone: true } }
        ]
    },

    // Tower Set - Tower of the Fallen King
    tower_set: {
        id: 'tower_set',
        name: 'Royal Guard',
        nameRu: 'Королевская Стража',
        nameDe: 'Königsgarde',
        pieces: ['craft_royal_blade', 'craft_tower_armor', 'craft_king_ring'],
        bonuses: [
            { pieces: 2, name: 'Royal Authority', nameRu: 'Королевский Авторитет', effects: { hpPercent: 8, damagePercent: 8, spellPercent: 8 } },
            { pieces: 3, name: 'Tower Fortress', nameRu: 'Башенная Крепость', effects: { hpPercent: 15, damagePercent: 15, spellPercent: 15, shieldPercent: 12, royalGuard: true } }
        ]
    },

    // Eternal Set - Throne of Eternity
    eternal_set: {
        id: 'eternal_set',
        name: 'Eternal Sovereign',
        nameRu: 'Вечный Повелитель',
        nameDe: 'Ewiger Herrscher',
        pieces: ['crown_of_eternity', 'sword_of_eternity', 'amulet_of_eternity'],
        bonuses: [
            { pieces: 2, name: 'Eternal Power', nameRu: 'Вечная Сила', effects: { hpPercent: 5, damagePercent: 5, spellPercent: 5 } },
            { pieces: 3, name: 'Transcendence', nameRu: 'Трансцендентность', effects: { hpPercent: 15, damagePercent: 15, spellPercent: 15, regenFlat: 2 } }
        ]
    },

    // === NEW SETS ===

    // Wanderer Set - Meadow (beginner)
    wanderer: {
        id: 'wanderer',
        name: 'Wanderer',
        nameRu: 'Странник',
        nameDe: 'Wanderer',
        pieces: ['rusty_sword', 'leather_armor', 'wood_ring'],
        bonuses: [
            { pieces: 2, name: 'Pathfinder', nameRu: 'Прокладчик Пути', effects: { expPercent: 5, speedPercent: 3 } },
            { pieces: 3, name: 'Explorer', nameRu: 'Исследователь', effects: { expPercent: 10, lootPercent: 5, speedPercent: 5 } }
        ]
    },

    // Shadow Walker Set - Forest
    shadow_walker: {
        id: 'shadow_walker',
        name: 'Shadow Walker',
        nameRu: 'Тень Странника',
        nameDe: 'Schattenwanderer',
        pieces: ['iron_sword', 'leather_armor', 'ruby_ring'],
        bonuses: [
            { pieces: 2, name: 'Stealth', nameRu: 'Скрытность', effects: { critPercent: 5, dodgePercent: 3 } },
            { pieces: 3, name: 'Shadow Strike', nameRu: 'Удар Тени', effects: { critPercent: 12, dodgePercent: 8, damagePercent: 8 } }
        ]
    },

    // Iron Warden Set - Mine
    iron_warden: {
        id: 'iron_warden',
        name: 'Iron Warden',
        nameRu: 'Железный Страж',
        nameDe: 'Eisenwächter',
        pieces: ['iron_sword', 'iron_armor', 'ruby_ring'],
        bonuses: [
            { pieces: 2, name: 'Iron Skin', nameRu: 'Железная Кожа', effects: { damageReduction: 8, hpPercent: 10 } },
            { pieces: 3, name: 'Fortress', nameRu: 'Крепость', effects: { damageReduction: 18, hpPercent: 20, shieldPercent: 5 } }
        ]
    },

    // Flame Slayer Set - Hell
    flame_slayer: {
        id: 'flame_slayer',
        name: 'Flame Slayer',
        nameRu: 'Пламенный Убийца',
        nameDe: 'Flammentöter',
        pieces: ['flame_blade', 'dragon_scale', 'sapphire_ring'],
        bonuses: [
            { pieces: 2, name: 'Fire Mastery', nameRu: 'Владение Огнём', effects: { damagePercent: 12, critPercent: 5 } },
            { pieces: 3, name: 'Inferno', nameRu: 'Инферно', effects: { damagePercent: 22, critPercent: 10, spellPercent: 8 } }
        ]
    },

    // Dragon Knight Set - Castle
    dragon_knight: {
        id: 'dragon_knight',
        name: 'Dragon Knight',
        nameRu: 'Драконий Рыцарь',
        nameDe: 'Drachenritter',
        pieces: ['flame_blade', 'dragon_scale', 'ruby_ring', 'crown'],
        bonuses: [
            { pieces: 2, name: 'Dragon Blood', nameRu: 'Кровь Дракона', effects: { hpPercent: 12, damagePercent: 8 } },
            { pieces: 3, name: 'Dragon Heart', nameRu: 'Сердце Дракона', effects: { hpPercent: 22, damagePercent: 16, critPercent: 6 } },
            { pieces: 4, name: 'Dragon Soul', nameRu: 'Душа Дракона', effects: { hpPercent: 30, damagePercent: 25, critPercent: 12, spellPercent: 10 } }
        ]
    },

    // Lich Slayer Set - Depths
    lich_slayer: {
        id: 'lich_slayer',
        name: 'Lich Slayer',
        nameRu: 'Убийца Личей',
        nameDe: 'Lich-Töter',
        pieces: ['bone_cleaver', 'crypt_plate', 'bone_ring'],
        bonuses: [
            { pieces: 2, name: 'Bone Shield', nameRu: 'Костяной Щит', effects: { hpPercent: 8, damageReduction: 5 } },
            { pieces: 3, name: 'Undead Bane', nameRu: 'Гибель Нежити', effects: { hpPercent: 15, damagePercent: 12, critPercent: 5 } }
        ]
    },

    // Cursed Breaker Set - Cursed Lands
    cursed_breaker: {
        id: 'cursed_breaker',
        name: 'Cursed Breaker',
        nameRu: 'Разрушитель Проклятий',
        nameDe: 'Fluchbrecher',
        pieces: ['venom_dagger', 'swamp_armor', 'cursed_ring'],
        bonuses: [
            { pieces: 2, name: 'Purify', nameRu: 'Очищение', effects: { regenPercent: 3, hpPercent: 5 } },
            { pieces: 3, name: 'Anti-Magic', nameRu: 'Антимагия', effects: { regenPercent: 8, hpPercent: 12, spellPercent: 8 } }
        ]
    },

    // Shadow Dancer Set - Shadow District
    shadow_dancer: {
        id: 'shadow_dancer',
        name: 'Shadow Dancer',
        nameRu: 'Танцор Теней',
        nameDe: 'Schattentänzer',
        pieces: ['shadow_blade', 'void_armor', 'mirror_ring'],
        bonuses: [
            { pieces: 2, name: 'Evasion', nameRu: 'Уклонение', effects: { dodgePercent: 8, speedPercent: 5 } },
            { pieces: 3, name: 'Phantom', nameRu: 'Фантом', effects: { dodgePercent: 15, speedPercent: 10, critPercent: 8 } }
        ]
    },

    // Royal Guard Set - Tower
    royal_guard: {
        id: 'royal_guard',
        name: 'Royal Guard',
        nameRu: 'Королевская Стража',
        nameDe: 'Königsgarde',
        pieces: ['royal_blade', 'tower_armor', 'king_ring'],
        bonuses: [
            { pieces: 2, name: 'Authority', nameRu: 'Авторитет', effects: { hpPercent: 5, damagePercent: 5, spellPercent: 5 } },
            { pieces: 3, name: 'Fortress', nameRu: 'Крепость', effects: { hpPercent: 12, damagePercent: 12, spellPercent: 12, shieldPercent: 8 } }
        ]
    },

    // Vampire Set - Hybrid
    vampire: {
        id: 'vampire',
        name: 'Vampire',
        nameRu: ' Вампир',
        nameDe: 'Vampir',
        pieces: ['flame_blade', 'dragon_scale', 'ruby_ring'],
        bonuses: [
            { pieces: 2, name: 'Life Steal', nameRu: 'Кража Жизни', effects: { lifeStealPercent: 5, damagePercent: 8 } },
            { pieces: 3, name: 'Blood Drain', nameRu: 'Высасывание Крови', effects: { lifeStealPercent: 12, damagePercent: 15, hpPercent: 10 } }
        ]
    },

    // Berserker Set - Hybrid
    berserker: {
        id: 'berserker',
        name: 'Berserker',
        nameRu: 'Берсерк',
        nameDe: 'Berserker',
        pieces: ['rusty_sword', 'iron_armor', 'wood_ring'],
        bonuses: [
            { pieces: 2, name: 'Rage', nameRu: 'Ярость', effects: { damagePercent: 15, damageReduction: -5 } },
            { pieces: 3, name: 'Frenzy', nameRu: 'Безумие', effects: { damagePercent: 30, critPercent: 10, damageReduction: -10 } }
        ]
    },

    // Mage Set - Hybrid
    mage_set: {
        id: 'mage_set',
        name: 'Archmage',
        nameRu: 'Архимаг',
        nameDe: 'Erzmagier',
        pieces: ['iron_sword', 'leather_armor', 'ruby_ring'],
        bonuses: [
            { pieces: 2, name: 'Arcane Focus', nameRu: 'Магический Фокус', effects: { spellPercent: 10, critPercent: 5 } },
            { pieces: 3, name: 'Spell Mastery', nameRu: 'Владение Заклинаниями', effects: { spellPercent: 22, critPercent: 12, corruptionMax: 15 } }
        ]
    },

    // Tank Set - Hybrid
    tank_set: {
        id: 'tank_set',
        name: 'Guardian',
        nameRu: 'Страж',
        nameDe: 'Wächter',
        pieces: ['iron_sword', 'iron_armor', 'wood_ring'],
        bonuses: [
            { pieces: 2, name: 'Fortitude', nameRu: 'Стойкость', effects: { hpPercent: 15, damageReduction: 8 } },
            { pieces: 3, name: 'Unbreakable', nameRu: 'Несокрушимый', effects: { hpPercent: 30, damageReduction: 18, shieldPercent: 10 } }
        ]
    },

    // Assassin Set - Hybrid
    assassin_set: {
        id: 'assassin_set',
        name: 'Assassin',
        nameRu: 'Ассассин',
        nameDe: 'Assassine',
        pieces: ['rusty_sword', 'leather_armor', 'ruby_ring'],
        bonuses: [
            { pieces: 2, name: 'Lethal', nameRu: 'Смертоносность', effects: { critPercent: 10, speedPercent: 5 } },
            { pieces: 3, name: 'Death Mark', nameRu: 'Метка Смерти', effects: { critPercent: 20, speedPercent: 10, damagePercent: 15 } }
        ]
    },

    // Healer Set - Hybrid
    healer_set: {
        id: 'healer_set',
        name: 'Divine Healer',
        nameRu: 'Божественный Целитель',
        nameDe: 'Göttlicher Heiler',
        pieces: ['iron_sword', 'leather_armor', 'ruby_ring'],
        bonuses: [
            { pieces: 2, name: 'Holy Light', nameRu: 'Свет Святости', effects: { regenPercent: 5, hpPercent: 8 } },
            { pieces: 3, name: 'Divine Grace', nameRu: 'Божественная Благодать', effects: { regenPercent: 12, hpPercent: 18, spellPercent: 10 } }
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
