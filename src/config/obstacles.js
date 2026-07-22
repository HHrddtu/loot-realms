// Obstacles: positions + sizes. Textures are 48×48 base.
// x,y are world coords within zone bounds.

export const ZONE_OBSTACLES = {
    meadow: [],

    forest: [
        { x: 150, y: 200, type: 'rock', w: 44, h: 44 },
        { x: 600, y: 280, type: 'rock', w: 44, h: 44 },
        { x: 400, y: 450, type: 'bush', w: 28, h: 28 },
        { x: 200, y: 650, type: 'fence', w: 76, h: 20 },
        { x: 550, y: 800, type: 'bush', w: 28, h: 28 }
    ],

    arena: [
        { x: 150, y: 150, type: 'ruins', w: 60, h: 44 },
        { x: 650, y: 150, type: 'ruins', w: 60, h: 44 },
        { x: 400, y: 400, type: 'rock', w: 44, h: 44 }
    ],

    mine: [
        { x: 200, y: 200, type: 'rock', w: 44, h: 44 },
        { x: 600, y: 350, type: 'ruins', w: 60, h: 44 },
        { x: 300, y: 550, type: 'fence', w: 76, h: 20 },
        { x: 500, y: 700, type: 'spike', w: 20, h: 20 },
        { x: 150, y: 850, type: 'rock', w: 44, h: 44 }
    ],

    cave: [
        { x: 150, y: 250, type: 'rock', w: 44, h: 44 },
        { x: 600, y: 400, type: 'rock', w: 44, h: 44 },
        { x: 400, y: 600, type: 'bush', w: 28, h: 28 },
        { x: 200, y: 850, type: 'spike', w: 20, h: 20 },
        { x: 550, y: 1050, type: 'bush', w: 28, h: 28 }
    ],

    village: [
        { x: 150, y: 250, type: 'rock', w: 44, h: 44 },
        { x: 650, y: 400, type: 'ruins', w: 60, h: 44 },
        { x: 400, y: 700, type: 'fence', w: 76, h: 20 },
        { x: 200, y: 1000, type: 'rock', w: 44, h: 44 },
        { x: 550, y: 1300, type: 'ruins', w: 60, h: 44 },
        { x: 300, y: 1600, type: 'fence', w: 76, h: 20 },
        { x: 400, y: 1900, type: 'rock', w: 44, h: 44 },
        { x: 200, y: 2200, type: 'spike', w: 20, h: 20 },
        // Purple Demon boss arena (y~200)
        { x: 300, y: 180, type: 'ruins', w: 60, h: 44 },
        { x: 500, y: 180, type: 'ruins', w: 60, h: 44 }
    ],

    hell: [
        { x: 200, y: 300, type: 'rock', w: 44, h: 44 },
        { x: 650, y: 500, type: 'ruins', w: 60, h: 44 },
        { x: 400, y: 800, type: 'fence', w: 76, h: 20 },
        { x: 150, y: 1200, type: 'spike', w: 20, h: 20 },
        { x: 700, y: 1500, type: 'rock', w: 44, h: 44 },
        { x: 300, y: 1800, type: 'ruins', w: 60, h: 44 },
        { x: 500, y: 2100, type: 'fence', w: 76, h: 20 },
        { x: 400, y: 2400, type: 'spike', w: 20, h: 20 }
    ],

    snowy: [
        { x: 150, y: 250, type: 'rock', w: 44, h: 44 },
        { x: 600, y: 450, type: 'ruins', w: 60, h: 44 },
        { x: 400, y: 700, type: 'bush', w: 28, h: 28 },
        { x: 200, y: 1000, type: 'fence', w: 76, h: 20 },
        { x: 500, y: 1300, type: 'spike', w: 20, h: 20 },
        { x: 300, y: 1600, type: 'rock', w: 44, h: 44 }
    ],

    castle: [
        { x: 150, y: 100, type: 'rock', w: 44, h: 44 },
        { x: 600, y: 100, type: 'spike', w: 20, h: 20 },
        { x: 200, y: 700, type: 'fence', w: 76, h: 20 },
        { x: 500, y: 700, type: 'rock', w: 44, h: 44 },
        { x: 150, y: 1300, type: 'spike', w: 20, h: 20 },
        { x: 400, y: 1900, type: 'fence', w: 76, h: 20 },
        { x: 600, y: 2500, type: 'rock', w: 44, h: 44 },
        { x: 200, y: 3100, type: 'spike', w: 20, h: 20 },
        { x: 400, y: 3700, type: 'fence', w: 76, h: 20 },
        { x: 150, y: 4300, type: 'rock', w: 44, h: 44 },
        { x: 600, y: 4300, type: 'fence', w: 76, h: 20 }
    ],

    depths: [
        { x: 200, y: 300, type: 'rock', w: 44, h: 44 },
        { x: 600, y: 500, type: 'ruins', w: 60, h: 44 },
        { x: 150, y: 800, type: 'fence', w: 76, h: 20 },
        { x: 500, y: 1100, type: 'spike', w: 20, h: 20 },
        { x: 300, y: 1400, type: 'rock', w: 44, h: 44 },
        { x: 400, y: 1700, type: 'ruins', w: 60, h: 44 },
        { x: 200, y: 1900, type: 'spike', w: 20, h: 20 }
    ],

    cursed: [
        { x: 200, y: 300, type: 'rock', w: 44, h: 44 },
        { x: 650, y: 500, type: 'ruins', w: 60, h: 44 },
        { x: 400, y: 900, type: 'bush', w: 28, h: 28 },
        { x: 150, y: 1300, type: 'fence', w: 76, h: 20 },
        { x: 600, y: 1700, type: 'spike', w: 20, h: 20 },
        { x: 300, y: 2100, type: 'rock', w: 44, h: 44 },
        { x: 500, y: 2500, type: 'bush', w: 28, h: 28 },
        { x: 200, y: 2900, type: 'ruins', w: 60, h: 44 },
        { x: 400, y: 3300, type: 'fence', w: 76, h: 20 }
    ],

    shadow: [
        { x: 150, y: 300, type: 'rock', w: 44, h: 44 },
        { x: 600, y: 600, type: 'ruins', w: 60, h: 44 },
        { x: 400, y: 1000, type: 'fence', w: 76, h: 20 },
        { x: 200, y: 1400, type: 'spike', w: 20, h: 20 },
        { x: 500, y: 1800, type: 'rock', w: 44, h: 44 },
        { x: 150, y: 2200, type: 'ruins', w: 60, h: 44 },
        { x: 600, y: 2600, type: 'fence', w: 76, h: 20 },
        { x: 400, y: 3000, type: 'spike', w: 20, h: 20 },
        { x: 300, y: 3400, type: 'rock', w: 44, h: 44 }
    ],

    tower: [
        { x: 150, y: 100, type: 'rock', w: 44, h: 44 },
        { x: 600, y: 700, type: 'ruins', w: 60, h: 44 },
        { x: 400, y: 1300, type: 'fence', w: 76, h: 20 },
        { x: 200, y: 1900, type: 'spike', w: 20, h: 20 },
        { x: 500, y: 2500, type: 'rock', w: 44, h: 44 },
        { x: 300, y: 3100, type: 'fence', w: 76, h: 20 }
    ],

    throne: [
        { x: 200, y: 200, type: 'ruins', w: 60, h: 44 },
        { x: 600, y: 200, type: 'ruins', w: 60, h: 44 },
        { x: 400, y: 450, type: 'rock', w: 44, h: 44 }
    ]
};
