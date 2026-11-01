// Desert: periodic sandstorm. Telegraph -> active window -> cooldown.
export const DESERT_SANDSTORM = {
    interval: 16000,
    telegraph: 2500,
    duration: 6500,
    color: 0xc8a44a,
    alpha: 0.26,
    telegraphAlpha: 0.08,
    speedMult: 0.6,
    enemySpeedMult: 0.75,
    particleTint: [0xd8b46a, 0xc8a44a, 0xe8cf97]
};

// Swamp: toxic puddles slow and poison the player. Safe islands override puddles.
export const SWAMP_HAZARD = {
    slowMult: 0.55,
    poisonDamage: 4,
    tickInterval: 1200,
    puddleRadius: 52,
    puddleColor: 0x2f6b35,
    puddleAlpha: 0.38,
    safeColor: 0x8a7a4a,
    safeAlpha: 0.5,
    puddles: [
        { x: 450, y: 400 },
        { x: 200, y: 700 },
        { x: 650, y: 950 },
        { x: 300, y: 1200 },
        { x: 620, y: 1500 },
        { x: 450, y: 1800 }
    ],
    islands: [
        { x: 450, y: 300, radius: 68 },
        { x: 200, y: 1100, radius: 60 },
        { x: 700, y: 1500, radius: 60 }
    ]
};
