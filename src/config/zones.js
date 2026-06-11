export const GAME_WIDTH = 800;
export const GAME_HEIGHT = 600;

// Forest
export const FOREST_HEIGHT = 900;
export const STUMP_COUNT = 5;
export const PORTAL_POS = { x: 400, y: 40 };
export const PORTAL_ENTER_DIST = 60;
export const ARENA_EXIT_POS = { x: 400, y: 560 };
export const FOREST_RETURN_POS = { x: 400, y: 120 };
export const CORRUPTION = { max: 100, decayRate: 0.08, rotDmg: 2, rotThreshold: 100 };
export const MATERIAL_SLOTS = 6;
export const EQUIP_BAG_SLOTS = 12;
export const ACCOUNT_EQUIP_SLOTS = 5;
export const ACCOUNT_EQUIP_BAG_SLOTS = 10;

// Mine
export const MINE_ROCK_COUNT = 8;
export const MINE_CRYSTAL_COUNT = 6;
export const MINE_EXIT_POS = { x: 400, y: 40 };
export const MINE_RETURN_POS = { x: 400, y: 520 };
export const MINE_BOSS_PORTAL_POS = { x: 400, y: 200 };
export const MINE_CHEST_COUNT = 4;
export const MINE_CHEST_DROP_CHANCE = 0.35;

// Cave
export const CAVE_WIDTH = 500;
export const CAVE_HEIGHT = 1200;
export const CAVE_CHEST_COUNT = 10;
export const CAVE_CHEST_DROP_CHANCE = 0.40;
export const CAVE_CHEST_OPEN_KEY = 'cave_chest_open';
export const CAVE_CHEST_CLOSED_KEY = 'cave_chest';
export const CAVE_CHEST_W = 20;
export const CAVE_CHEST_H = 18;

// Meadow
export const MEADOW_POS = { x: 400, y: 300 };
export const MEADOW_GATE_POS = { x: 400, y: 200 };
export const MEADOW_WIDTH = 800;
export const MEADOW_HEIGHT = 600;

// Village
export const VILLAGE_WIDTH = 700;
export const VILLAGE_HEIGHT = 2000;
export const CEMETERY_HEIGHT = 500;
export const VILLAGE_TOTAL_HEIGHT = VILLAGE_HEIGHT + CEMETERY_HEIGHT;
export const VILLAGE_CAMP_POSITIONS = [
    { x: 350, y: 200 },
    { x: 200, y: 450 },
    { x: 500, y: 700 },
    { x: 350, y: 950 },
    { x: 180, y: 1200 },
    { x: 520, y: 1450 },
    { x: 350, y: 1700 },
    { x: 350, y: 1900 }
];
export const VILLAGE_HOUSE_POSITIONS = [
    { x: 100, y: 300, w: 60, h: 50 },
    { x: 580, y: 550, w: 60, h: 50 },
    { x: 80, y: 850, w: 60, h: 50 },
    { x: 600, y: 1100, w: 60, h: 50 },
    { x: 120, y: 1550, w: 60, h: 50 },
    { x: 550, y: 1800, w: 60, h: 50 }
];
export const VILLAGE_CHILD_HOUSE = { x: 300, y: 1920, w: 60, h: 50 };
export const VILLAGE_CORPSE_POSITIONS = [
    { x: 150, y: 180 }, { x: 450, y: 350 }, { x: 300, y: 600 },
    { x: 550, y: 850 }, { x: 130, y: 1050 }, { x: 400, y: 1300 },
    { x: 250, y: 1600 }, { x: 500, y: 1750 }, { x: 180, y: 1850 },
    { x: 480, y: 1950 }
];
export const VILLAGE_GARDEN_POSITIONS = [
    { x: 450, y: 150 }, { x: 120, y: 500 }, { x: 580, y: 780 },
    { x: 200, y: 1150 }, { x: 500, y: 1500 }
];
export const VILLAGE_CHEST_COUNT_MIN = 10;
export const VILLAGE_CHEST_COUNT_MAX = 14;
export const VILLAGE_CHEST_DROP_CHANCE = 0.45;
export const VILLAGE_CHEST_EQUIP_DROP_CHANCE = 0.18;
export const VILLAGE_CHEST_OPEN_KEY = 'village_barrel_open';
export const VILLAGE_CHEST_CLOSED_KEY = 'village_barrel';
export const VILLAGE_CHEST_W = 18;
export const VILLAGE_CHEST_H = 22;

// Hell
export const HELL_WIDTH = 900;
export const HELL_HEIGHT = 2500;
export const HELL_LAVA_DAMAGE = 10;
export const HELL_LAVA_INTERVAL = 1000;
export const HELL_HEAT_DAMAGE = 5;
export const HELL_CAMP_POSITIONS = [
    { x: 450, y: 200 },  { x: 200, y: 400 },  { x: 700, y: 400 },
    { x: 350, y: 650 },  { x: 600, y: 650 },  { x: 200, y: 900 },
    { x: 700, y: 900 },  { x: 450, y: 1150 }, { x: 300, y: 1400 },
    { x: 600, y: 1400 }
];
export const HELL_LAVA_POSITIONS = [
    { x: 120, y: 300, r: 40 }, { x: 780, y: 500, r: 35 },
    { x: 450, y: 800, r: 45 }, { x: 200, y: 1100, r: 38 },
    { x: 700, y: 1300, r: 42 }, { x: 450, y: 1600, r: 40 }
];
export const HELL_CHEST_COUNT = 8;
export const HELL_CHEST_DROP_CHANCE = 0.45;

// Snowy Village
export const SNOWY_VILLAGE_CAMP_POSITIONS = [
    { x: 350, y: 200 },  { x: 200, y: 450 },  { x: 500, y: 700 },
    { x: 350, y: 950 },  { x: 180, y: 1200 }, { x: 520, y: 1450 },
    { x: 350, y: 1700 }, { x: 350, y: 1900 }
];
export const SNOWY_VILLAGE_CHEST_COUNT = 10;
export const SNOWY_VILLAGE_CHEST_DROP_CHANCE = 0.45;
