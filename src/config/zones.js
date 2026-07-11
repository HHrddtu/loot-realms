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
export const MATERIAL_SLOTS = 10;
export const EQUIP_BAG_SLOTS = 16;
export const ACCOUNT_EQUIP_SLOTS = 5;
export const ACCOUNT_EQUIP_BAG_SLOTS = 16;
export const EMPTY_ACCOUNT_EQUIPMENT = { hat: null, mantle: null, legs: null, weapon: null, accessory: null, ring: null, charm: null, relic: null };

// Mine
export const MINE_ROCK_COUNT = 8;
export const MINE_CRYSTAL_COUNT = 6;
export const MINE_EXIT_POS = { x: 400, y: 40 };
export const MINE_RETURN_POS = { x: 400, y: 520 };
export const MINE_BOSS_PORTAL_POS = { x: 400, y: 200 };
export const MINE_CHEST_COUNT = 4;
export const MINE_CHEST_DROP_CHANCE = 0.35;

// Cave
export const CAVE_WIDTH = 800;
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
export const VILLAGE_WIDTH = 800;
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
export const VILLAGE_CHILD_HOUSE = { x: 580, y: 550, w: 60, h: 50 };
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

// Castle (Bandit stronghold)
export const CASTLE_WIDTH = 800;
export const CASTLE_ROOM_HEIGHT = 600;
export const CASTLE_TOTAL_HEIGHT = CASTLE_ROOM_HEIGHT * 8;
export const CASTLE_ROOMS = 7;
export const CASTLE_ATTIC_INDEX = 8;
export const CASTLE_CHEST_POSITIONS = [
    { room: 2, x: 150, y: 200 },
    { room: 3, x: 620, y: 380 },
    { room: 4, x: 150, y: 280 },
    { room: 5, x: 620, y: 200 },
    { room: 6, x: 400, y: 480 }
];
export const CASTLE_VILLAGER_POSITIONS = [
    { x: 220, y: 170 }, { x: 580, y: 170 },
    { x: 220, y: 330 }, { x: 580, y: 330 },
    { x: 400, y: 250 }, { x: 280, y: 460 }, { x: 520, y: 460 }
];
export const CASTLE_SPAWN_POS = { x: 400, y: 500 };

// Depths (Underworld Catacombs)
export const DEPTHS_WIDTH = 800;
export const DEPTHS_HEIGHT = 2000;
export const DEPTHS_FLOOR_HEIGHT = 400;
export const DEPTHS_CAMP_POSITIONS = [
    { x: 400, y: 200 },  { x: 200, y: 350 },
    { x: 600, y: 550 },  { x: 300, y: 700 },
    { x: 500, y: 900 },  { x: 200, y: 1050 },
    { x: 600, y: 1250 }, { x: 400, y: 1400 },
    { x: 250, y: 1600 }, { x: 550, y: 1750 }
];
export const DEPTHS_CHEST_POSITIONS = [
    { x: 120, y: 180 }, { x: 680, y: 380 },
    { x: 150, y: 620 }, { x: 650, y: 820 },
    { x: 100, y: 1020 }, { x: 700, y: 1220 },
    { x: 200, y: 1520 }, { x: 600, y: 1720 }
];
export const DEPTHS_PORTAL_POSITIONS = [
    { x: 400, y: 390 },  // Floor 1→2
    { x: 400, y: 790 },  // Floor 2→3
    { x: 400, y: 1190 }, // Floor 3→4
    { x: 400, y: 1590 }  // Floor 4→5
];
export const DEPTHS_BOSS_POSITION = { x: 400, y: 1900 };
export const DEPTHS_CHEST_COUNT = 8;
export const DEPTHS_CHEST_DROP_CHANCE = 0.50;

// Snowy Village
export const SNOWY_VILLAGE_CAMP_POSITIONS = [
    { x: 350, y: 200 },  { x: 200, y: 450 },  { x: 500, y: 700 },
    { x: 350, y: 950 },  { x: 180, y: 1200 }, { x: 520, y: 1450 },
    { x: 350, y: 1700 }, { x: 350, y: 1900 }
];
export const SNOWY_VILLAGE_CHEST_COUNT = 10;
export const SNOWY_VILLAGE_CHEST_DROP_CHANCE = 0.45;

// Cursed Lands
export const CURSED_WIDTH = 900;
export const CURSED_HEIGHT = 3500;
export const CURSED_ZONE_HEIGHT = 700;
export const CURSED_CAMP_POSITIONS = [
    { x: 450, y: 200 },  { x: 200, y: 350 },  { x: 700, y: 350 },
    { x: 350, y: 550 },  { x: 550, y: 550 },  { x: 200, y: 750 },
    { x: 700, y: 750 },  { x: 450, y: 950 },  { x: 300, y: 1150 },
    { x: 600, y: 1150 }, { x: 450, y: 1350 }, { x: 200, y: 1550 },
    { x: 700, y: 1550 }, { x: 350, y: 1750 }, { x: 550, y: 1750 }
];
export const CURSED_CHEST_POSITIONS = [
    { x: 120, y: 180 },  { x: 780, y: 380 },
    { x: 150, y: 620 },  { x: 750, y: 820 },
    { x: 100, y: 1020 }, { x: 800, y: 1220 },
    { x: 200, y: 1420 }, { x: 700, y: 1620 },
    { x: 300, y: 1820 }, { x: 600, y: 1820 }
];
export const CURSED_PORTAL_POSITIONS = [
    { x: 450, y: 690 },  // Zone 1→2
    { x: 450, y: 1390 }, // Zone 2→3
    { x: 450, y: 2090 }, // Zone 3→4
    { x: 450, y: 2790 }  // Zone 4→5
];
export const CURSED_BOSS_POSITION = { x: 450, y: 3350 };
export const CURSED_CHEST_COUNT = 10;
export const CURSED_CHEST_DROP_CHANCE = 0.50;

// Shadow Dimension
export const SHADOW_WIDTH = 800;
export const SHADOW_HEIGHT = 3500;
export const SHADOW_FLOOR_HEIGHT = 700;
export const SHADOW_CAMP_POSITIONS = [
    { x: 400, y: 150 },  { x: 200, y: 300 },  { x: 600, y: 300 },
    { x: 350, y: 500 },  { x: 550, y: 500 },  { x: 200, y: 750 },
    { x: 600, y: 750 },  { x: 400, y: 950 },  { x: 250, y: 1150 },
    { x: 550, y: 1150 }, { x: 400, y: 1350 }, { x: 200, y: 1550 }
];
export const SHADOW_CHEST_POSITIONS = [
    { x: 120, y: 180 },  { x: 680, y: 380 },
    { x: 150, y: 620 },  { x: 650, y: 820 },
    { x: 100, y: 1020 }, { x: 700, y: 1220 },
    { x: 200, y: 1420 }, { x: 600, y: 1620 }
];
export const SHADOW_PORTAL_POSITIONS = [
    { x: 400, y: 690 },  // Floor 1→2
    { x: 400, y: 1390 }, // Floor 2→3
    { x: 400, y: 2090 }, // Floor 3→4
    { x: 400, y: 2790 }  // Floor 4→5
];
export const SHADOW_BOSS_POSITION = { x: 400, y: 3350 };
export const SHADOW_CHEST_COUNT = 8;
export const SHADOW_CHEST_DROP_CHANCE = 0.50;

// Tower of the Fallen King
export const TOWER_WIDTH = 800;
export const TOWER_HEIGHT = 3600;
export const TOWER_ROOM_HEIGHT = 600;
export const TOWER_ROOMS = 6;
export const TOWER_CAMP_POSITIONS = [
    // Room 0
    { x: 400, y: 150 },  { x: 250, y: 300 },
    // Room 1
    { x: 550, y: 750 },  { x: 350, y: 900 },
    // Room 2
    { x: 200, y: 1350 }, { x: 600, y: 1500 },
    // Room 3
    { x: 400, y: 1950 }, { x: 250, y: 2100 },
    // Room 4
    { x: 550, y: 2550 }, { x: 350, y: 2700 },
    // Room 5 (boss room - no camp, boss only)
    { x: 400, y: 3150 }, { x: 400, y: 3300 }
];
export const TOWER_CHEST_POSITIONS = [
    { x: 150, y: 250 },  // Room 0
    { x: 650, y: 850 },  // Room 1
    { x: 150, y: 1450 }, // Room 2
    { x: 650, y: 2050 }, // Room 3
    { x: 150, y: 2650 }, // Room 4
    { x: 400, y: 3050 }  // Room 5 (boss room)
];
export const TOWER_STAIR_POSITIONS = [
    { x: 400, y: 580 },  // Room 0→1
    { x: 400, y: 1180 }, // Room 1→2
    { x: 400, y: 1780 }, // Room 2→3
    { x: 400, y: 2380 }, // Room 3→4
    { x: 400, y: 2980 }  // Room 4→5 (boss)
];
export const TOWER_BOSS_POSITION = { x: 400, y: 300 };
export const TOWER_CHEST_COUNT = 6;
export const TOWER_CHEST_DROP_CHANCE = 0.55;

// Throne of Eternity
export const THRONE_WIDTH = 800;
export const THRONE_HEIGHT = 600;
export const THRONE_BOSS_POSITION = { x: 400, y: 300 };
