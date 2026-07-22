// Obstacles — только в зонах, где они создают осмысленный выбор для боя.
// В обычных зонах не ставятся (мешают кайту, а не помогают).

export const ZONE_OBSTACLES = {
    meadow: [],
    forest: [],
    arena: [
        // Treant boss arena — укрытие от AoE-атак
        { x: 200, y: 200, type: 'ruins', w: 60, h: 44 },
        { x: 600, y: 200, type: 'ruins', w: 60, h: 44 }
    ],
    mine: [],
    cave: [],
    village: [
        // Purple Demon boss arena — укрытие от метеоров
        { x: 300, y: 180, type: 'ruins', w: 60, h: 44 },
        { x: 500, y: 180, type: 'ruins', w: 60, h: 44 }
    ],
    hell: [],
    snowy: [],
    castle: [],
    depths: [],
    cursed: [],
    shadow: [],
    tower: [],
    throne: [
        // финальный босс — колонны для уклонения от Soul Storm
        { x: 200, y: 200, type: 'ruins', w: 60, h: 44 },
        { x: 600, y: 200, type: 'ruins', w: 60, h: 44 },
        { x: 400, y: 450, type: 'ruins', w: 60, h: 44 }
    ]
};
