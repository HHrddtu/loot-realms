export const ZONE_OBSTACLES = {
    meadow: [],
    forest: [
        { x: 200, y: 300, type: 'rock', w: 30, h: 30 },
        { x: 550, y: 450, type: 'rock', w: 30, h: 30 },
        { x: 400, y: 180, type: 'bush', w: 22, h: 22 },
        { x: 150, y: 550, type: 'fence', w: 60, h: 14 }
    ],
    arena: [
        { x: 200, y: 200, type: 'ruins', w: 44, h: 30 },
        { x: 600, y: 200, type: 'ruins', w: 44, h: 30 }
    ],
    mine: [
        { x: 300, y: 300, type: 'rock', w: 30, h: 30 },
        { x: 500, y: 150, type: 'ruins', w: 44, h: 30 },
        { x: 200, y: 500, type: 'fence', w: 60, h: 14 },
        { x: 450, y: 400, type: 'spike', w: 14, h: 14 }
    ],
    cave: [
        { x: 250, y: 250, type: 'rock', w: 30, h: 30 },
        { x: 550, y: 350, type: 'rock', w: 30, h: 30 },
        { x: 400, y: 150, type: 'bush', w: 22, h: 22 },
        { x: 300, y: 500, type: 'spike', w: 14, h: 14 }
    ],
    village: [
        { x: 180, y: 400, type: 'rock', w: 30, h: 30 },
        { x: 620, y: 300, type: 'ruins', w: 44, h: 30 },
        { x: 400, y: 550, type: 'fence', w: 60, h: 14 }
    ],
    hell: [
        { x: 250, y: 300, type: 'rock', w: 30, h: 30 },
        { x: 550, y: 250, type: 'ruins', w: 44, h: 30 },
        { x: 150, y: 500, type: 'fence', w: 60, h: 14 },
        { x: 450, y: 400, type: 'spike', w: 14, h: 14 }
    ],
    snowy: [
        { x: 200, y: 350, type: 'rock', w: 30, h: 30 },
        { x: 600, y: 200, type: 'ruins', w: 44, h: 30 },
        { x: 350, y: 150, type: 'bush', w: 22, h: 22 },
        { x: 500, y: 500, type: 'fence', w: 60, h: 14 },
        { x: 300, y: 450, type: 'spike', w: 14, h: 14 }
    ],
    castle: [
        { x: 150, y: 350, type: 'rock', w: 30, h: 30 },
        { x: 400, y: 500, type: 'fence', w: 60, h: 14 },
        { x: 550, y: 200, type: 'spike', w: 14, h: 14 }
    ],
    depths: [
        { x: 200, y: 250, type: 'rock', w: 30, h: 30 },
        { x: 600, y: 300, type: 'ruins', w: 44, h: 30 },
        { x: 350, y: 500, type: 'fence', w: 60, h: 14 },
        { x: 500, y: 150, type: 'spike', w: 14, h: 14 }
    ],
    cursed: [
        { x: 250, y: 350, type: 'rock', w: 30, h: 30 },
        { x: 550, y: 200, type: 'ruins', w: 44, h: 30 },
        { x: 150, y: 200, type: 'bush', w: 22, h: 22 },
        { x: 450, y: 450, type: 'spike', w: 14, h: 14 }
    ],
    shadow: [
        { x: 200, y: 300, type: 'rock', w: 30, h: 30 },
        { x: 600, y: 350, type: 'ruins', w: 44, h: 30 },
        { x: 400, y: 150, type: 'fence', w: 60, h: 14 },
        { x: 300, y: 500, type: 'spike', w: 14, h: 14 }
    ],
    tower: [
        { x: 300, y: 300, type: 'rock', w: 30, h: 30 },
        { x: 500, y: 400, type: 'ruins', w: 44, h: 30 },
        { x: 200, y: 500, type: 'fence', w: 60, h: 14 },
        { x: 550, y: 200, type: 'spike', w: 14, h: 14 }
    ],
    throne: [
        { x: 250, y: 250, type: 'ruins', w: 44, h: 30 },
        { x: 550, y: 250, type: 'ruins', w: 44, h: 30 }
    ]
};
