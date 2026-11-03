export const FOREST_APEX = {
    id: 'forest_snarechief',
    zone: 'forest',
    name: 'Goblin Snarechief',
    key: 'goblin',
    x: 400,
    y: 150,
    scale: 1.8,
    hpMult: 12,
    dmgMult: 2,
    expMult: 8,
    snareInterval: 2100,
    summonInterval: 7000,
    summonCount: 2,
    summonMax: 4,
    rewardGold: 120
};

export const FOREST_ENCOUNTERS = [
    {
        id: 'forest_goblin_snare',
        zone: 'forest',
        name: 'Goblin Snare',
        tagline: 'A trapper pins you in place while goblins close in.',
        trigger: { type: 'onProximity', x: 190, y: 430, radius: 220 },
        enemies: [
            { key: 'goblin', count: 2, x: 190, y: 430, spread: 48 },
            {
                key: 'goblin',
                name: 'Goblin Trapper',
                role: 'trapper',
                x: 145,
                y: 390,
                scale: 1.05,
                speed: 70,
                tint: 0x8ed36a,
                telegraphed: false
            }
        ]
    },
    {
        id: 'forest_slime_nest',
        zone: 'forest',
        name: 'Slime Nest',
        tagline: 'Kill the mother and the nest splits apart.',
        trigger: { type: 'onProximity', x: 600, y: 620, radius: 220 },
        enemies: [
            { key: 'slime', x: 600, y: 620, spread: 45 },
            {
                key: 'slime',
                name: 'Slime Mother',
                x: 555,
                y: 650,
                scale: 1.5,
                hpMult: 2.4,
                dmgMult: 1.25,
                expMult: 1.8,
                splitOnDeath: true,
                tint: 0x7dff8a
            }
        ]
    },
    {
        id: 'forest_rat_warren',
        zone: 'forest',
        name: 'Rat Warren',
        tagline: 'A swarm that grows bolder together, led by an alpha.',
        trigger: { type: 'onProximity', x: 640, y: 330, radius: 220 },
        enemies: [
            {
                key: 'rat',
                count: 4,
                x: 640,
                y: 330,
                spread: 75,
                role: 'swarm',
                telegraphed: false,
                speed: 70
            },
            {
                key: 'rat',
                name: 'Rat Alpha',
                x: 680,
                y: 300,
                scale: 1.35,
                hpMult: 3,
                dmgMult: 1.5,
                expMult: 2.5,
                role: 'swarm',
                telegraphed: false,
                speed: 78,
                isElite: true,
                tint: 0xffaa00
            }
        ]
    }
];
