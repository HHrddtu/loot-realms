// Obstacles spread across each zone's full height.
// x positions are relative to zone bounds (0 = left edge of zone).
// spawnObstacles() translates by zone offset (ox) automatically.

export const ZONE_OBSTACLES = {
    meadow: [],

    forest: [
        { x: 150, y: 200, type: 'rock', w: 30, h: 30 },
        { x: 600, y: 280, type: 'rock', w: 30, h: 30 },
        { x: 400, y: 450, type: 'bush', w: 22, h: 22 },
        { x: 200, y: 650, type: 'fence', w: 60, h: 14 },
        { x: 550, y: 800, type: 'bush', w: 22, h: 22 }
    ],

    arena: [
        { x: 150, y: 150, type: 'ruins', w: 44, h: 30 },
        { x: 650, y: 150, type: 'ruins', w: 44, h: 30 },
        { x: 400, y: 400, type: 'rock', w: 30, h: 30 }
    ],

    mine: [
        { x: 200, y: 200, type: 'rock', w: 30, h: 30 },
        { x: 600, y: 350, type: 'ruins', w: 44, h: 30 },
        { x: 300, y: 550, type: 'fence', w: 60, h: 14 },
        { x: 500, y: 700, type: 'spike', w: 14, h: 14 },
        { x: 150, y: 850, type: 'rock', w: 30, h: 30 }
    ],

    cave: [
        { x: 150, y: 250, type: 'rock', w: 30, h: 30 },
        { x: 600, y: 400, type: 'rock', w: 30, h: 30 },
        { x: 400, y: 600, type: 'bush', w: 22, h: 22 },
        { x: 200, y: 850, type: 'spike', w: 14, h: 14 },
        { x: 550, y: 1050, type: 'bush', w: 22, h: 22 }
    ],

    village: [
        { x: 150, y: 250, type: 'rock', w: 30, h: 30 },
        { x: 650, y: 400, type: 'ruins', w: 44, h: 30 },
        { x: 400, y: 700, type: 'fence', w: 60, h: 14 },
        { x: 200, y: 1000, type: 'rock', w: 30, h: 30 },
        { x: 550, y: 1300, type: 'ruins', w: 44, h: 30 },
        { x: 300, y: 1600, type: 'fence', w: 60, h: 14 },
        { x: 400, y: 1900, type: 'rock', w: 30, h: 30 },
        { x: 200, y: 2200, type: 'spike', w: 14, h: 14 }
    ],

    hell: [
        { x: 200, y: 300, type: 'rock', w: 30, h: 30 },
        { x: 650, y: 500, type: 'ruins', w: 44, h: 30 },
        { x: 400, y: 800, type: 'fence', w: 60, h: 14 },
        { x: 150, y: 1200, type: 'spike', w: 14, h: 14 },
        { x: 700, y: 1500, type: 'rock', w: 30, h: 30 },
        { x: 300, y: 1800, type: 'ruins', w: 44, h: 30 },
        { x: 500, y: 2100, type: 'fence', w: 60, h: 14 },
        { x: 400, y: 2400, type: 'spike', w: 14, h: 14 }
    ],

    snowy: [
        { x: 150, y: 250, type: 'rock', w: 30, h: 30 },
        { x: 600, y: 450, type: 'ruins', w: 44, h: 30 },
        { x: 400, y: 700, type: 'bush', w: 22, h: 22 },
        { x: 200, y: 1000, type: 'fence', w: 60, h: 14 },
        { x: 500, y: 1300, type: 'spike', w: 14, h: 14 },
        { x: 300, y: 1600, type: 'rock', w: 30, h: 30 }
    ],

    castle: [
        { x: 150, y: 100, type: 'rock', w: 30, h: 30 },    // room 1
        { x: 600, y: 100, type: 'spike', w: 14, h: 14 },
        { x: 200, y: 700, type: 'fence', w: 60, h: 14 },   // room 2
        { x: 500, y: 700, type: 'rock', w: 30, h: 30 },
        { x: 150, y: 1300, type: 'spike', w: 14, h: 14 },  // room 3
        { x: 400, y: 1900, type: 'fence', w: 60, h: 14 },  // room 4
        { x: 600, y: 2500, type: 'rock', w: 30, h: 30 },   // room 5
        { x: 200, y: 3100, type: 'spike', w: 14, h: 14 },  // room 6
        { x: 400, y: 3700, type: 'fence', w: 60, h: 14 },  // room 7
        { x: 150, y: 4300, type: 'rock', w: 30, h: 30 },   // room 8
        { x: 600, y: 4300, type: 'fence', w: 60, h: 14 }
    ],

    depths: [
        { x: 200, y: 300, type: 'rock', w: 30, h: 30 },
        { x: 600, y: 500, type: 'ruins', w: 44, h: 30 },
        { x: 150, y: 800, type: 'fence', w: 60, h: 14 },
        { x: 500, y: 1100, type: 'spike', w: 14, h: 14 },
        { x: 300, y: 1400, type: 'rock', w: 30, h: 30 },
        { x: 400, y: 1700, type: 'ruins', w: 44, h: 30 },
        { x: 200, y: 1900, type: 'spike', w: 14, h: 14 }
    ],

    cursed: [
        { x: 200, y: 300, type: 'rock', w: 30, h: 30 },
        { x: 650, y: 500, type: 'ruins', w: 44, h: 30 },
        { x: 400, y: 900, type: 'bush', w: 22, h: 22 },
        { x: 150, y: 1300, type: 'fence', w: 60, h: 14 },
        { x: 600, y: 1700, type: 'spike', w: 14, h: 14 },
        { x: 300, y: 2100, type: 'rock', w: 30, h: 30 },
        { x: 500, y: 2500, type: 'bush', w: 22, h: 22 },
        { x: 200, y: 2900, type: 'ruins', w: 44, h: 30 },
        { x: 400, y: 3300, type: 'fence', w: 60, h: 14 }
    ],

    shadow: [
        { x: 150, y: 300, type: 'rock', w: 30, h: 30 },
        { x: 600, y: 600, type: 'ruins', w: 44, h: 30 },
        { x: 400, y: 1000, type: 'fence', w: 60, h: 14 },
        { x: 200, y: 1400, type: 'spike', w: 14, h: 14 },
        { x: 500, y: 1800, type: 'rock', w: 30, h: 30 },
        { x: 150, y: 2200, type: 'ruins', w: 44, h: 30 },
        { x: 600, y: 2600, type: 'fence', w: 60, h: 14 },
        { x: 400, y: 3000, type: 'spike', w: 14, h: 14 },
        { x: 300, y: 3400, type: 'rock', w: 30, h: 30 }
    ],

    tower: [
        { x: 150, y: 100, type: 'rock', w: 30, h: 30 },    // floor 1
        { x: 600, y: 700, type: 'ruins', w: 44, h: 30 },   // floor 2
        { x: 400, y: 1300, type: 'fence', w: 60, h: 14 },  // floor 3
        { x: 200, y: 1900, type: 'spike', w: 14, h: 14 },  // floor 4
        { x: 500, y: 2500, type: 'rock', w: 30, h: 30 },   // floor 5
        { x: 300, y: 3100, type: 'fence', w: 60, h: 14 }   // floor 6
    ],

    throne: [
        { x: 200, y: 200, type: 'ruins', w: 44, h: 30 },
        { x: 600, y: 200, type: 'ruins', w: 44, h: 30 },
        { x: 400, y: 450, type: 'rock', w: 30, h: 30 }
    ]
};
