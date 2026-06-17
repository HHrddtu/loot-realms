export const CLASS_DB = {
    sage: {
        key: 'sage',
        name: 'Sage',
        nameRu: 'Мудрец',
        nameDe: 'Weiser',
        description: 'Ancient scholar who weakens foes by studying their nature. Masters magic, staff combat, and forbidden knowledge.',
        bookType: 'bestiary',
        texKey: 'player_sage',
        walkTexKey: 'player_sage_walk',
        attackTexKey: 'player_sage_attack',
        walkAnim: 'sage_walk_right',
        attackAnim: 'sage_attack',
        meleeRange: 55,
        meleeCooldown: 280,
        meleeDmgMult: 1.0,
        meleeColor: 0xe74c3c,
        rSpell: 'meteor',
        stats: {
            hp: 100,
            damage: 20,
            speed: 180,
            corruptionMax: 100,
            corruptionDecay: 0.08,
            corruptionDmg: 2
        },
        growth: {
            hpPerLevel: 10,
            dmgPerLevel: 5,
            speedPerLevel: 0
        }
    },
    alchemist: {
        key: 'alchemist',
        name: 'Alchemist',
        nameRu: 'Алхимик',
        nameDe: 'Alchemist',
        description: 'Researcher of matter and substances. Understands the world through materials, their properties and interactions.',
        bookType: 'materialBook',
        texKey: 'player_alchemist',
        walkTexKey: 'player_alchemist_walk',
        attackTexKey: 'player_alchemist_attack',
        walkAnim: 'alchemist_walk_right',
        attackAnim: 'alchemist_attack',
        meleeRange: 40,
        meleeCooldown: 320,
        meleeDmgMult: 1.2,
        meleeColor: 0x27ae60,
        rSpell: 'chemical_cloud',
        stats: {
            hp: 110,
            damage: 18,
            speed: 170,
            corruptionMax: 80,
            corruptionDecay: 0.08,
            corruptionDmg: 2
        },
        growth: {
            hpPerLevel: 12,
            dmgPerLevel: 4,
            speedPerLevel: 0
        }
    },
    angel: {
        key: 'angel',
        name: 'Angel',
        nameRu: 'Ангел',
        nameDe: 'Engel',
        description: 'Student of life and souls. Understands the nature of living beings and their inner connection to the world.',
        bookType: 'soulBook',
        texKey: 'player_angel',
        walkTexKey: 'player_angel_walk',
        attackTexKey: 'player_angel_attack',
        walkAnim: 'angel_walk_right',
        attackAnim: 'angel_attack',
        meleeRange: 120,
        meleeCooldown: 350,
        meleeDmgMult: 0.7,
        meleeColor: 0xf1c40f,
        meleeRanged: true,
        meleeHealPercent: 0.25,
        rSpell: 'divine_blessing',
        stats: {
            hp: 90,
            damage: 15,
            speed: 190,
            corruptionMax: 120,
            corruptionDecay: 0.10,
            corruptionDmg: 1
        },
        growth: {
            hpPerLevel: 8,
            dmgPerLevel: 3,
            speedPerLevel: 1
        }
    }
};

export function getClassData(classKey) {
    return CLASS_DB[classKey] || CLASS_DB.sage;
}

export function getClassStats(classKey, level) {
    const cls = getClassData(classKey);
    return {
        maxHp: cls.stats.hp + (level - 1) * cls.growth.hpPerLevel,
        damage: cls.stats.damage + (level - 1) * cls.growth.dmgPerLevel,
        speed: cls.stats.speed + (level - 1) * cls.growth.speedPerLevel,
        corruptionMax: cls.stats.corruptionMax,
        corruptionDecay: cls.stats.corruptionDecay,
        corruptionDmg: cls.stats.corruptionDmg
    };
}
