export const DIFFICULTIES = ['Normal', 'Hard', 'Expert', 'Nightmare', 'Hell', 'Abyss'];

export const DIFF_NAMES = {
    Normal:   { ru: 'Обычный', de: 'Normal' },
    Hard:     { ru: 'Сложный', de: 'Schwer' },
    Expert:   { ru: 'Эксперт', de: 'Experte' },
    Nightmare:{ ru: 'Кошмар', de: 'Alptraum' },
    Hell:     { ru: 'Ад', de: 'Hölle' },
    Abyss:    { ru: 'Бездна', de: 'Abgrund' }
};

export const DIFF_MULT = {
    Normal:   { hp: 1,   dmg: 1,   exp: 1 },
    Hard:     { hp: 1.5, dmg: 1.3, exp: 1.5 },
    Expert:   { hp: 2.5, dmg: 2,   exp: 2.5 },
    Nightmare:{ hp: 4,   dmg: 3,   exp: 4 },
    Hell:     { hp: 7,   dmg: 5,   exp: 7 },
    Abyss:    { hp: 12,  dmg: 8,   exp: 12 }
};

export const ENEMY_TYPES = [
    { key: 'goblin', name: 'Goblin', nameRu: 'Гоблин', nameDe: 'Goblin', hp: 40, dmg: 5, exp: 10, bw: 18, bh: 20 },
    { key: 'slime',  name: 'Slime',  nameRu: 'Слайм',  nameDe: 'Schleim', hp: 30, dmg: 3, exp: 8,  bw: 16, bh: 14 },
    { key: 'rat',    name: 'Rat',    nameRu: 'Крыса',   nameDe: 'Ratte',   hp: 20, dmg: 2, exp: 5,  bw: 16, bh: 12 }
];

export const RARITY_COLORS = {
    common:    0xaaaaaa,
    uncommon:  0x2ecc71,
    rare:      0x3498db,
    epic:      0x9b59b6,
    legendary: 0xf39c12
};

export const RARITY_NAMES = {
    common:    { en: 'Common',    ru: 'Обычный',   de: 'Gewöhnlich' },
    uncommon:  { en: 'Uncommon',  ru: 'Необычный',  de: 'Ungewöhnlich' },
    rare:      { en: 'Rare',      ru: 'Редкий',     de: 'Selten' },
    epic:      { en: 'Epic',      ru: 'Эпический',  de: 'Episch' },
    legendary: { en: 'Legendary', ru: 'Легендарный', de: 'Legendär' }
};

export const MATERIAL_DB = [
    { id: 'wood',      name: 'Wood',      nameRu: 'Древесина',  nameDe: 'Holz',      rarity: 'common',   texKey: 'item_stick',  chance: 0.30, stats: { hp: 5 } },
    { id: 'stone',     name: 'Stone',     nameRu: 'Камень',     nameDe: 'Stein',     rarity: 'common',   texKey: 'item_stone',  chance: 0.28, stats: { dmg: 2 } },
    { id: 'leaf',      name: 'Leaf',      nameRu: 'Лист',       nameDe: 'Blatt',     rarity: 'common',   texKey: 'item_leaf',   chance: 0.22, stats: { speed: 10 } },
    { id: 'mushroom',  name: 'Mushroom',  nameRu: 'Гриб',       nameDe: 'Pilz',      rarity: 'uncommon', texKey: 'item_mush',   chance: 0.12, stats: { hp: 12, regen: 1 } },
    { id: 'herb',      name: 'Herb',      nameRu: 'Трава',      nameDe: 'Kraut',     rarity: 'uncommon', texKey: 'item_herb',   chance: 0.06, stats: { hp: 8, dmg: 3 } },
    { id: 'gem_shard', name: 'Gem Shard', nameRu: 'Осколок',    nameDe: 'Edelstein', rarity: 'rare',     texKey: 'item_ruby',   chance: 0.02, stats: { dmg: 5, hp: 10 } },
    { id: 'cave_silk',   name: 'Cave Silk',   nameRu: 'Пещерный Шёлк',   nameDe: 'Höhlenseide',      rarity: 'common',   texKey: 'item_leaf',   chance: 0.00, stats: { hp: 8 } },
    { id: 'cave_moss',   name: 'Cave Moss',   nameRu: 'Пещерный Мох',    nameDe: 'Höhlenmoos',       rarity: 'common',   texKey: 'item_mush',   chance: 0.00, stats: { regen: 2 } },
    { id: 'bat_wing',    name: 'Bat Wing',    nameRu: 'Крыло Летучей',   nameDe: 'Fledermausflügel', rarity: 'uncommon', texKey: 'item_leaf',   chance: 0.00, stats: { speed: 8 } },
    { id: 'dark_crystal', name: 'Dark Crystal', nameRu: 'Тёмный Кристалл', nameDe: 'Dunkler Kristall', rarity: 'rare',     texKey: 'item_ruby',   chance: 0.00, stats: { dmg: 8, hp: 15 } }
];

export const EQUIP_DB = [
    { id: 'rusty_sword',    name: 'Rusty Sword',     nameRu: 'Ржавый Меч',      nameDe: 'Rostiges Schwert',   rarity: 'common',    slot: 'weapon',    texKey: 'item_stick',  chance: 0.30, stats: { dmg: 3 } },
    { id: 'iron_sword',     name: 'Iron Sword',      nameRu: 'Железный Меч',    nameDe: 'Eisenschwert',       rarity: 'uncommon',  slot: 'weapon',    texKey: 'item_iron',   chance: 0.18, stats: { dmg: 6 } },
    { id: 'leather_armor',  name: 'Leather Armor',   nameRu: 'Кожаная Броня',   nameDe: 'Lederpanzer',        rarity: 'common',    slot: 'armor',     texKey: 'item_leather',chance: 0.25, stats: { hp: 8 } },
    { id: 'iron_armor',     name: 'Iron Armor',      nameRu: 'Железная Броня',  nameDe: 'Eisenpanzer',        rarity: 'uncommon',  slot: 'armor',     texKey: 'item_stone',  chance: 0.15, stats: { hp: 15 } },
    { id: 'wood_ring',      name: 'Wood Ring',       nameRu: 'Деревянное Кольцо', nameDe: 'Holzring',         rarity: 'common',    slot: 'accessory', texKey: 'item_leaf',   chance: 0.22, stats: { hp: 5, speed: 2 } },
    { id: 'ruby_ring',      name: 'Ruby Ring',       nameRu: 'Рубиновое Кольцо', nameDe: 'Rubinring',        rarity: 'rare',      slot: 'accessory', texKey: 'item_ruby',   chance: 0.08, stats: { hp: 10, dmg: 5 } },
    { id: 'flame_blade',    name: 'Flame Blade',     nameRu: 'Пламенный Клинок', nameDe: 'Flammenklinge',     rarity: 'epic',      slot: 'weapon',    texKey: 'item_flame',  chance: 0.04, stats: { dmg: 12, crit: 3 } },
    { id: 'dragon_scale',   name: 'Dragon Scale',    nameRu: 'Чешуя Дракона',   nameDe: 'Drachenschuppe',     rarity: 'epic',      slot: 'armor',     texKey: 'item_dscale', chance: 0.03, stats: { hp: 25, dmg: 5 } },
    { id: 'sapphire_ring',  name: 'Sapphire Ring',   nameRu: 'Сапфировое Кольцо', nameDe: 'Saphirring',      rarity: 'rare',      slot: 'accessory', texKey: 'item_sapph',  chance: 0.06, stats: { hp: 8, dmg: 8, speed: 5 } },
    { id: 'crown',          name: 'Ancient Crown',   nameRu: 'Древняя Корона',  nameDe: 'Alte Krone',         rarity: 'legendary', slot: 'accessory', texKey: 'item_crown',  chance: 0.01, stats: { hp: 15, dmg: 10, speed: 10 } }
];

export const ACCOUNT_EQUIP_DB = [
    { id: 'sage_hat',     name: 'Wise Cap',         nameRu: 'Мудрая Шапка',      nameDe: 'Weise Mütze',         rarity: 'rare',      slot: 'hat',      texKey: 'acc_hat',      chance: 0.30, stats: { hpPercent: 3, regenPercent: 1 } },
    { id: 'sage_mantle',  name: 'Arcane Mantle',    nameRu: 'Тайная Мантия',     nameDe: 'Geheimnisumantel',    rarity: 'rare',      slot: 'mantle',   texKey: 'acc_mantle',   chance: 0.25, stats: { spellPercent: 4, corruptionMax: 5 } },
    { id: 'sage_legs',    name: 'Traveler Leggings',nameRu: 'Штаны Путника',     nameDe: 'Wanderhose',          rarity: 'rare',      slot: 'legs',     texKey: 'acc_legs',     chance: 0.25, stats: { speedPercent: 3, dodgePercent: 2 } },
    { id: 'sage_book',    name: 'Grimoire of Shadows', nameRu: 'Гримуар Теней',  nameDe: 'Grimuar der Schatten', rarity: 'epic',   slot: 'weapon',   texKey: 'acc_book',     chance: 0.12, stats: { damagePercent: 5, critPercent: 2 }, effect: 'slow_dark_stun' },
    { id: 'sage_amulet',  name: 'Amulet of Foresight', rarity: 'epic',          nameRu: 'Амулет Предвидения', nameDe: 'Amulett der Vorschau', slot: 'accessory', texKey: 'acc_amulet', chance: 0.08, stats: { expPercent: 2, lootPercent: 2, hpPercent: 3 } },
    { id: 'sage_hat_e',   name: 'Mystic Crown',     nameRu: 'Мистическая Корона', nameDe: 'Mystische Krone',   rarity: 'epic',      slot: 'hat',      texKey: 'acc_hat',      chance: 0.08, stats: { hpPercent: 5, regenPercent: 2 } },
    { id: 'sage_mantle_e',name: 'Void Shroud',      nameRu: 'Покров Пустоты',   nameDe: 'Leere Schleier',      rarity: 'epic',      slot: 'mantle',   texKey: 'acc_mantle',   chance: 0.07, stats: { spellPercent: 7, corruptionMax: 10 } },
    { id: 'sage_legs_e',  name: 'Phase Walkers',    nameRu: 'Фазовые Шаги',     nameDe: 'Phasenläufer',        rarity: 'epic',      slot: 'legs',     texKey: 'acc_legs',     chance: 0.07, stats: { speedPercent: 5, dodgePercent: 3 } },
    { id: 'sage_book_l',  name: 'Tome of Eternal Wisdom', nameRu: 'Том Вечной Мудрости', nameDe: 'Buch der Ewigen Weisheit', rarity: 'legendary', slot: 'weapon', texKey: 'acc_book', chance: 0.03, stats: { damagePercent: 8, critPercent: 4 }, effect: 'slow_dark_stun' },
    { id: 'sage_amulet_l',name: 'Necklace of the Sage', nameRu: 'Ожерелье Мудреца', nameDe: 'Halskette des Weisen', rarity: 'legendary', slot: 'accessory', texKey: 'acc_amulet', chance: 0.02, stats: { expPercent: 4, lootPercent: 4, hpPercent: 5 } }
];

export const GAME_WIDTH = 800;
export const GAME_HEIGHT = 600;
export const FOREST_HEIGHT = 900;
export const STUMP_COUNT = 5;
export const ENEMY_COUNT = 3;
export const EQUIP_DROP_CHANCE = 0.05;
export const BOSS_DROP_CHANCE = 0.93;
export const ACCOUNT_EQUIP_DROP_CHANCE = 0.001;
export const MATERIAL_SLOTS = 6;
export const EQUIP_BAG_SLOTS = 12;
export const ACCOUNT_EQUIP_SLOTS = 5;
export const ACCOUNT_EQUIP_BAG_SLOTS = 10;

export const PORTAL_POS = { x: 400, y: 40 };
export const PORTAL_ENTER_DIST = 60;

export const BOSS_TYPE = {
    key: 'treant', name: 'Ancient Treant', nameRu: 'Древний Трент', nameDe: 'Uralter Treant',
    texKey: 'treant_boss',
    bw: 48, bh: 60,
    speeds: { Normal: 60, Hard: 65, Expert: 70, Nightmare: 80, Hell: 90, Abyss: 100 },
    hp:  { Normal: 500,  Hard: 750,  Expert: 1250, Nightmare: 2000, Hell: 3500, Abyss: 6000 },
    dmg: { Normal: 15,   Hard: 20,   Expert: 30,   Nightmare: 45,   Hell: 75,   Abyss: 120 },
    exp: { Normal: 200,  Hard: 300,  Expert: 500,  Nightmare: 800,  Hell: 1400, Abyss: 2400 },
    aoeInterval: 5000,
    aoeDmgMul: 1.5,
    aoeRadius: 90
};

export const ARENA_EXIT_POS = { x: 400, y: 560 };
export const FOREST_RETURN_POS = { x: 400, y: 120 };

export const CORRUPTION = {
    max: 100,
    decayRate: 0.08,
    rotDmg: 2,
    rotThreshold: 100
};

export const MINE_ENEMY_TYPES = [
    { key: 'skeleton_warrior', name: 'Skeleton Warrior', nameRu: 'Скелет-Воин', nameDe: 'Skelettkrieger', hp: 80, dmg: 12, exp: 30, bw: 18, bh: 24 },
    { key: 'skeleton_archer',  name: 'Skeleton Archer',  nameRu: 'Скелет-Лучник', nameDe: 'Skelettbogenschütze', hp: 50, dmg: 8,  exp: 25, bw: 18, bh: 24 },
    { key: 'skeleton_shaman',  name: 'Skeleton Shaman',  nameRu: 'Скелет-Шаман', nameDe: 'Skelett-Schamane', hp: 60, dmg: 10, exp: 35, bw: 18, bh: 26 }
];

export const MINE_ENEMY_COUNT = 4;

export const MINE_BOSS_TYPE = {
    key: 'skeleton_lord', name: 'Skeleton Lord', nameRu: 'Повелитель Скелетов', nameDe: 'Skelett-Lord',
    texKey: 'skeleton_lord',
    bw: 44, bh: 56,
    speeds: { Normal: 65, Hard: 70, Expert: 75, Nightmare: 85, Hell: 95, Abyss: 110 },
    hp:  { Normal: 700,  Hard: 1050,  Expert: 1750, Nightmare: 2800, Hell: 4900, Abyss: 8400 },
    dmg: { Normal: 18,   Hard: 24,    Expert: 36,   Nightmare: 54,   Hell: 90,   Abyss: 144 },
    exp: { Normal: 350,  Hard: 525,   Expert: 875,  Nightmare: 1400, Hell: 2450, Abyss: 4200 },
    aoeInterval: 6000,
    aoeDmgMul: 1.6,
    aoeRadius: 100
};

export const MINE_ROCK_COUNT = 8;
export const MINE_CRYSTAL_COUNT = 6;

export const MINE_EXIT_POS = { x: 400, y: 40 };
export const MINE_RETURN_POS = { x: 400, y: 520 };
export const MINE_BOSS_PORTAL_POS = { x: 400, y: 200 };
export const MINE_CHEST_COUNT = 4;
export const MINE_CHEST_DROP_CHANCE = 0.35;
export const MINE_EQUIP_DROP_CHANCE = 0.12;

export const CAVE_ENEMY_TYPES = [
    { key: 'cave_spider', name: 'Cave Spider', nameRu: 'Пещерный Паук', nameDe: 'Höhlenspinne', hp: 120, dmg: 14, exp: 40, bw: 16, bh: 14, role: 'dps' },
    { key: 'cave_bat',    name: 'Cave Bat',    nameRu: 'Пещерная Летучая', nameDe: 'Höhlenfledermaus', hp: 80, dmg: 10, exp: 35, bw: 14, bh: 12, role: 'dps' },
    { key: 'stone_golem', name: 'Stone Golem',  nameRu: 'Каменный Голем',  nameDe: 'Steingolem',     hp: 200, dmg: 18, exp: 55, bw: 22, bh: 26, role: 'tank' },
    { key: 'earth_worm',  name: 'Earth Worm',   nameRu: 'Земляной Червь',  nameDe: 'Erdwurm',        hp: 180, dmg: 15, exp: 50, bw: 24, bh: 18, role: 'tank' }
];

export const CAVE_ENEMY_COUNT = 20;
export const CAVE_CHEST_COUNT = 10;

export const CAVE_BOSS_TYPE = {
    key: 'giant_bat', name: 'Giant Bat', nameRu: 'Гигантская Летучая', nameDe: 'Riesen-Fledermaus',
    texKey: 'giant_bat',
    bw: 48, bh: 36,
    speeds: { Normal: 70, Hard: 75, Expert: 80, Nightmare: 90, Hell: 100, Abyss: 115 },
    hp:  { Normal: 800,  Hard: 1200,  Expert: 2000, Nightmare: 3200, Hell: 5600, Abyss: 9600 },
    dmg: { Normal: 20,   Hard: 26,    Expert: 40,   Nightmare: 60,   Hell: 100,  Abyss: 160 },
    exp: { Normal: 400,  Hard: 600,   Expert: 1000, Nightmare: 1600, Hell: 2800, Abyss: 4800 },
    dashInterval: 6000,
    dashSpeed: 300,
    dashDmgMul: 1.5,
    screechRadius: 120,
    screechDmgMul: 1.2,
    screechCooldown: 10000,
    summonHpThreshold: 0.5,
    summonCount: 3
};

export const CAVE_SMALL_BAT = {
    key: 'cave_bat', name: 'Small Bat', nameRu: 'Летучая Мышь', nameDe: 'Kleine Fledermaus',
    texKey: 'small_bat',
    bw: 18, bh: 14,
    hp: 60, dmg: 8, exp: 15
};

export const CAVE_BOSS_EXP = { Normal: 400, Hard: 600, Expert: 1000, Nightmare: 1600, Hell: 2800, Abyss: 4800 };

export const CAVE_MATERIALS = [
    { id: 'cave_silk',     name: 'Cave Silk',     nameRu: 'Пещерный Шёлк',      nameDe: 'Höhlenseide',      rarity: 'common',   texKey: 'item_leaf',   chance: 0.30, stats: { hp: 8 } },
    { id: 'cave_moss',     name: 'Cave Moss',     nameRu: 'Пещерный Мох',       nameDe: 'Höhlenmoos',       rarity: 'common',   texKey: 'item_mush',  chance: 0.25, stats: { regen: 2 } },
    { id: 'bat_wing',      name: 'Bat Wing',      nameRu: 'Крыло Летучей',      nameDe: 'Fledermausflügel', rarity: 'uncommon', texKey: 'item_leaf',   chance: 0.15, stats: { speed: 8 } },
    { id: 'dark_crystal',  name: 'Dark Crystal',  nameRu: 'Тёмный Кристалл',    nameDe: 'Dunkler Kristall', rarity: 'rare',     texKey: 'item_ruby',   chance: 0.05, stats: { dmg: 8, hp: 15 } }
];

export const CAVE_CHEST_DROP_CHANCE = 0.40;
export const CAVE_EQUIP_DROP_CHANCE = 0.15;
export const CAVE_CHEST_OPEN_KEY = 'cave_chest_open';
export const CAVE_CHEST_CLOSED_KEY = 'cave_chest';
export const CAVE_CHEST_W = 20;
export const CAVE_CHEST_H = 18;

export const CAVE_WIDTH = 500;
export const CAVE_HEIGHT = 1200;

export const ACCOUNT_EQUIP_DB_CAVE = [
    { id: 'relic_cave_sage',     name: 'Relic of Depths',       nameRu: 'Реликвия Глубин',      nameDe: 'Reliktiefe',          rarity: 'legendary', slot: 'relic', texKey: 'acc_book',   chance: 0.33, stats: {}, effect: 'fireball_chain', classes: ['sage'] },
    { id: 'relic_cave_alchemist', name: 'Relic of Fermentation', nameRu: 'Реликвия Брожения',   nameDe: 'Reliktgärung',        rarity: 'legendary', slot: 'relic', texKey: 'acc_book',   chance: 0.33, stats: {}, effect: 'craft_bonus',   classes: ['alchemist'] },
    { id: 'relic_cave_angel',    name: 'Relic of Grace',        nameRu: 'Реликвия Благодати',   nameDe: 'Reliktder Gnade',     rarity: 'legendary', slot: 'relic', texKey: 'acc_book',   chance: 0.34, stats: {}, effect: 'purify_heal',  classes: ['angel'] }
];

export const CAVE_RELIC_CLASSES = ['sage', 'alchemist', 'angel'];

export const SPELLS = {
    fireball: {
        key: 'fireball',
        name: 'Fireball',
        nameRu: 'Огненный Шар',
        nameDe: 'Feuerball',
        slot: 'Q',
        corruptionCost: 15,
        cooldown: 2.0,
        damage: 40,
        speed: 350,
        range: 400,
        color: 0xe74c3c,
        description: 'Hurls a fireball dealing spell damage'
    },
    shield: {
        key: 'shield',
        name: 'Arcane Shield',
        nameRu: 'Щит',
        nameDe: 'Arkaner Schild',
        slot: 'W',
        corruptionCost: 20,
        cooldown: 8.0,
        absorption: 50,
        duration: 5.0,
        color: 0x3498db,
        description: 'Absorbs damage for 5 seconds'
    },
    heal: {
        key: 'heal',
        name: 'Heal',
        nameRu: 'Исцеление',
        nameDe: 'Heilung',
        slot: 'E',
        corruptionCost: 25,
        cooldown: 10.0,
        healPercent: 0.30,
        color: 0x2ecc71,
        description: 'Restores 30% of max HP'
    },
    acid_flask: {
        key: 'acid_flask',
        name: 'Acid Flask',
        nameRu: 'Кислотная Бутылка',
        nameDe: 'Säureflasche',
        slot: 'Q',
        corruptionCost: 12,
        cooldown: 2.5,
        damage: 30,
        speed: 300,
        range: 350,
        dot: 5,
        dotDuration: 3.0,
        color: 0x27ae60,
        description: 'Hurls an acid flask dealing damage + DoT'
    },
    iron_skin: {
        key: 'iron_skin',
        name: 'Iron Skin',
        nameRu: 'Железная Кожа',
        nameDe: 'Eisenhaut',
        slot: 'W',
        corruptionCost: 18,
        cooldown: 7.0,
        absorption: 40,
        damageReduction: 0.30,
        duration: 5.0,
        color: 0x95a5a6,
        description: 'Reduces incoming damage by 30% for 5 seconds'
    },
    healing_potion: {
        key: 'healing_potion',
        name: 'Healing Potion',
        nameRu: 'Зелье Исцеления',
        nameDe: 'Heiltrank',
        slot: 'E',
        corruptionCost: 20,
        cooldown: 8.0,
        healPercent: 0.35,
        color: 0xe67e22,
        description: 'Restores 35% of max HP'
    },
    soul_strike: {
        key: 'soul_strike',
        name: 'Soul Strike',
        nameRu: 'Удар Души',
        nameDe: 'Seelenschlag',
        slot: 'Q',
        corruptionCost: 10,
        cooldown: 1.8,
        damage: 35,
        speed: 400,
        range: 450,
        color: 0xecf0f1,
        description: 'Launches a bolt of pure soul energy'
    },
    life_link: {
        key: 'life_link',
        name: 'Life Link',
        nameRu: 'Связь Жизни',
        nameDe: 'Lebensbindung',
        slot: 'W',
        corruptionCost: 22,
        cooldown: 9.0,
        absorption: 60,
        healPerSec: 0.05,
        duration: 5.0,
        color: 0xf1c40f,
        description: 'Absorbs damage and heals 5% maxHP per second'
    },
    purify: {
        key: 'purify',
        name: 'Purify',
        nameRu: 'Очищение',
        nameDe: 'Reinigung',
        slot: 'E',
        corruptionCost: 0,
        cooldown: 12.0,
        corruptionReduce: 40,
        healPercent: 0.15,
        color: 0xf1c40f,
        description: 'Removes 40 corruption and heals 15% maxHP'
    }
};

export const BESTIARY_LEVELS = [
    { level: 0, killsRequired: 0,   dmgBonus: 0,   expBonus: 0,   info: 'description' },
    { level: 1, killsRequired: 1,   dmgBonus: 0,   expBonus: 0,   info: 'stats' },
    { level: 2, killsRequired: 10,  dmgBonus: 0.05, expBonus: 0.05, info: 'weaknesses' },
    { level: 3, killsRequired: 30,  dmgBonus: 0.10, expBonus: 0.10, info: 'abilities' },
    { level: 4, killsRequired: 60,  dmgBonus: 0.15, expBonus: 0.15, info: 'full' },
    { level: 5, killsRequired: 100, dmgBonus: 0.20, expBonus: 0.20, info: 'lore' }
];

export const BESTIARY_DIFF_MULT = {
    Normal: 1.0,
    Hard: 1.5,
    Expert: 2.0,
    Nightmare: 3.0,
    Hell: 5.0,
    Abyss: 8.0
};

export const BESTIARY_ENEMIES = {
    goblin: {
        name: 'Goblin', texKey: 'goblin', biome: 'forest',
        weaknesses: ['fire'], resistances: [], abilities: ['Quick feet', 'Pack tactics'],
        description: 'Small, cunning creatures that lurk in the darkest corners of the forest. They survive not through strength, but through sheer numbers and cowardly tactics.',
        lore: 'Goblins were once forest sprites, corrupted by the rot seeping from the ancient roots. Now they serve as foot soldiers for whatever darkness stirs beneath the earth.'
    },
    slime: {
        name: 'Slime', texKey: 'slime', biome: 'forest',
        weaknesses: ['physical'], resistances: ['poison'], abilities: ['Split on death', 'Acid trail'],
        description: 'Gelatinous blobs of living ooze that absorb anything in their path. Their bodies are mostly water, making them resilient to chemical attacks but vulnerable to brute force.',
        lore: 'Some scholars believe slimes are the discarded remnants of failed alchemical experiments. Others say they are the forest itself, slowly digesting those who trespass.'
    },
    rat: {
        name: 'Rat', texKey: 'rat', biome: 'forest',
        weaknesses: ['fire'], resistances: [], abilities: ['Swarm', 'Disease'],
        description: ' Oversized rodents with glowing eyes and razor-sharp teeth. They attack in packs, overwhelming prey through relentless biting and sheer ferocity.',
        lore: 'The rats of the old forest have grown unnaturally large, feeding on the corrupted roots that pulse beneath the soil. Their bites carry a sickness that no potion can fully cure.'
    },
    skeleton_warrior: {
        name: 'Skeleton Warrior', texKey: 'skeleton', biome: 'mine',
        weaknesses: ['blunt'], resistances: ['piercing'], abilities: ['Shield block', 'Undead resilience'],
        description: 'Animated bones of fallen soldiers, still guarding the tunnels they once protected. Their shields can deflect piercing attacks, but blunt force shatters their brittle frames.',
        lore: 'These warriors swore an oath to protect the mine entrances. Even in death, they refuse to abandon their posts. The darkness gave them purpose — and eternity.'
    },
    skeleton_archer: {
        name: 'Skeleton Archer', texKey: 'skeleton_archer', biome: 'mine',
        weaknesses: ['melee'], resistances: [], abilities: ['Ranged attacks', 'Volley'],
        description: 'Skeletal marksmen that rain arrows from the shadows. Their bones are lighter than warriors, making them fast but fragile when closed upon.',
        lore: 'The archers were the first line of defense in the old mines. They could pick off intruders before they even reached the tunnels. Now they fire blindly, haunted by muscle memory.'
    },
    skeleton_shaman: {
        name: 'Skeleton Shaman', texKey: 'skeleton_shaman', biome: 'mine',
        weaknesses: ['physical'], resistances: ['magic'], abilities: ['Dark magic', 'Curse', 'Soul drain'],
        description: 'Undead spellcasters wreathed in violet flame. They hurl bolts of dark energy and weave curses that weaken the living. Physical attacks are their bane.',
        lore: 'The shamans were once wise elders who delved too deep into forbidden knowledge. Their spirits were consumed, leaving only hollow vessels of dark magic.'
    },
    ancient_treant: {
        name: 'Ancient Treant', texKey: 'treant_boss', biome: 'arena',
        weaknesses: ['fire'], resistances: ['nature'], abilities: ['AoE slam', 'Root grasp', 'Nature\'s wrath'],
        description: 'A colossal tree given form and fury. Its roots tear through the earth, and its trunk can crush a man flat. Only fire can weaken its wooden hide.',
        lore: 'This treant has stood for a thousand years, watching the forest grow and wither. The corruption awakened something primal — a rage that even time cannot soothe.'
    },
    skeleton_lord: {
        name: 'Skeleton Lord', texKey: 'skeleton_lord', biome: 'mine_boss',
        weaknesses: ['holy'], resistances: ['dark'], abilities: ['AoE dark wave', 'Summon minions', 'Death grip'],
        description: 'The undead sovereign of the mines, clad in rusted armor and wielding a cursed blade. He commands legions of bones and drains the light from all who oppose him.',
        lore: 'Once a king who sought immortality through dark rituals. He achieved his goal — but at the cost of his soul. Now he rules a kingdom of dust and silence.'
    },
    cave_spider: {
        name: 'Cave Spider', texKey: 'cave_spider', biome: 'cave',
        weaknesses: ['fire'], resistances: ['poison'], abilities: ['Web shot', 'Venomous bite', 'Ambush'],
        description: 'Massive arachnids that lurk in the cave\'s dark crevices. Their webs are nearly invisible in the gloom, and their venom paralyzes prey within seconds.',
        lore: 'The spiders grew to unnatural sizes feeding on the cave\'s corrupted minerals. Their silk is stronger than rope and can dissolve metal over time.'
    },
    cave_bat: {
        name: 'Cave Bat', texKey: 'cave_bat', biome: 'cave',
        weaknesses: ['light'], resistances: ['sonic'], abilities: ['Screech', 'Swift flight', 'Echolocation'],
        description: 'Blind predators that navigate by sound alone. Their screeches can disorient intruders, and their claws tear through flesh with ease.',
        lore: 'These bats evolved in total darkness, their eyes replaced by specialized organs that detect heat and vibration. The corruption gave them a hunger that never sleeps.'
    },
    stone_golem: {
        name: 'Stone Golem', texKey: 'stone_golem', biome: 'cave',
        weaknesses: ['magic'], resistances: ['physical'], abilities: ['Stone skin', 'Ground slam', 'Unstoppable'],
        description: 'Hulking constructs of living stone, animated by ancient cave magic. Physical attacks barely scratch their surface, but magic can crack their cores.',
        lore: 'The golems were built by the cave\'s original inhabitants to guard the deepest passages. They still patrol, mindlessly following commands from masters long dead.'
    },
    earth_worm: {
        name: 'Earth Worm', texKey: 'earth_worm', biome: 'cave',
        weaknesses: ['fire'], resistances: ['blunt'], abilities: ['Burrow', 'Acid spit', 'Earthquake'],
        description: 'Colossal worms that bore through solid rock. Their acid can dissolve stone, and their movements shake the cave walls.',
        lore: 'These creatures burrowed up from the deepest caverns, following veins of corrupted ore. They leave tunnels that collapse behind them, trapping the unwary.'
    },
    giant_bat: {
        name: 'Giant Bat', texKey: 'giant_bat', biome: 'cave_boss',
        weaknesses: ['holy'], resistances: ['dark', 'sonic'], abilities: ['Summon swarm', 'Screech of terror', 'Dash attack', 'Echolocation'],
        description: 'An enormous bat-like horror that commands the cave\'s lesser creatures. Its wings can shatter stone, and its screech induces paralyzing fear.',
        lore: 'This creature was the first to be corrupted by the cave\'s dark heart. It grew to monstrous proportions, feeding on the fear of those who dare enter its domain.'
    },
    village_brute: {
        name: 'Infected Brute', texKey: 'village_brute', biome: 'village',
        weaknesses: ['fire'], resistances: ['physical'], abilities: ['Charge', 'Tough hide', 'Crushing blow'],
        description: 'A hulking monstrosity swollen by corruption. Its thick hide shrugs off blades, and its charges can shatter bone.',
        lore: 'The brute was once a blacksmith, twisted by the cemetery\'s influence. Its arms grew massive, its mind shrank to nothing. It remembers only the hammer — and the urge to swing it.'
    },
    village_stalker: {
        name: 'Infected Stalker', texKey: 'village_stalker', biome: 'village',
        weaknesses: ['light'], resistances: ['dark'], abilities: ['Ambush', 'Shadow step', 'Backstab'],
        description: 'A swift predator that melts into shadows. It waits, watches, and strikes when prey lets its guard down.',
        lore: 'Stalkers were scouts in life — quick, silent, observant. The corruption sharpened their instincts and dulled their mercy. They now hunt what they once protected.'
    },
    village_spitter: {
        name: 'Infected Spitter', texKey: 'village_spitter', biome: 'village',
        weaknesses: ['physical'], resistances: ['poison'], abilities: ['Acid spit', 'Swarm tactics', 'Corrosive bile'],
        description: 'A ranged attacker that hurls globules of corrosive fluid. Its projectiles dissolve armor and flesh alike.',
        lore: 'The spitter\'s internal organs have been completely replaced by acid glands. It feeds on corruption directly, converting it into a weapon. A living siege engine in a small package.'
    },
    village_curser: {
        name: 'Infected Curser', texKey: 'village_curser', biome: 'village',
        weaknesses: ['fire'], resistances: ['magic'], abilities: ['Dark curse', 'Soul drain', 'Weakening hex'],
        description: 'A twisted spellcaster that drains vitality from the living. Its curses weaken both body and spirit.',
        lore: 'The curser was once a healer who tried to purge the corruption with forbidden rites. The corruption won. Now it drains life instead of restoring it, a bitter inversion of its former purpose.'
    },
    zombie: {
        name: 'Risen Dead', texKey: 'zombie', biome: 'village',
        weaknesses: ['fire'], resistances: ['blunt'], abilities: ['Grab', 'Undead resilience', 'Relentless'],
        description: 'Reanimated corpses pulled from the earth by dark magic. They stumble forward with mindless hunger, seeking flesh to tear.',
        lore: 'The dead do not rest in the village cemetery. Something beneath the ground pulls them back, stripping away memory and leaving only hunger. Each zombie was someone\'s neighbor, friend, or family.'
    },
    purple_demon: {
        name: 'Purple Demon', texKey: 'purple_demon', biome: 'village_boss',
        weaknesses: ['holy'], resistances: ['dark', 'fire'], abilities: ['Meteor rain', 'Summon corpses', 'Split at 10% HP', 'Dark nova'],
        description: 'A powerful demon of purple flame that commands the cemetery\'s dead. It splits into clones when threatened, multiplying its fury.',
        lore: 'The Purple Demon is a lieutenant of the infernal hierarchy, banished to guard the boundary between the living and the damned. It feeds on fear and grows stronger with each soul it claims.'
    },
    hell_guard: {
        name: 'Hell Guard', nameRu: 'Адская Стража', nameDe: 'Höllengarde', texKey: 'hell_guard', biome: 'hell',
        weaknesses: ['holy'], resistances: ['fire', 'physical'], abilities: ['Shield wall', 'Taunt', 'Cleave'],
        description: 'A hulking infernal sentinel clad in molten armor. It blocks paths and absorbs punishment that would fell lesser creatures.',
        lore: 'Hell Guards were once celestial wardens, corrupted during the first breach. Their shields, now fused to their bodies, reflect the light they once served.'
    },
    hell_stalker: {
        name: 'Hell Stalker', nameRu: 'Адский Сталкер', nameDe: 'Höllenschleicher', texKey: 'hell_stalker', biome: 'hell',
        weaknesses: ['light'], resistances: ['dark'], abilities: ['Shadow step', 'Backstab', 'Vanish'],
        description: 'A swift predator that phases through shadows. It strikes from behind and melts away before retaliation.',
        lore: 'Hell Stalkers are the remnants of assassins who bargained with infernal lords for power. They got it — along with an eternity of servitude.'
    },
    hell_archer: {
        name: 'Hell Archer', nameRu: 'Адский Лучник', nameDe: 'Höllenbogenschütze', texKey: 'hell_archer', biome: 'hell',
        weaknesses: ['melee'], resistances: [], abilities: ['Fire arrows', 'Volley', 'Piercing shot'],
        description: 'A ranged infernal marksman that rains flaming arrows from a distance. Its bolts pierce through armor and bone.',
        lore: 'Hell Archers were soldiers who abandoned their posts during the great war. The infernal lords gave them a new purpose — and arrows that never miss.'
    },
    hell_mage: {
        name: 'Hell Mage', nameRu: 'Адский Маг', nameDe: 'Höllenmagier', texKey: 'hell_mage', biome: 'hell',
        weaknesses: ['physical'], resistances: ['magic'], abilities: ['Fireball', 'Hellfire rain', 'Mana drain'],
        description: 'A twisted spellcaster that hurls bolts of hellfire. Its magic drains the life force of the living.',
        lore: 'Hell Mages sought forbidden knowledge in the mortal realm. They found it — and the infernal lords claimed their souls as payment.'
    },
    hell_priest: {
        name: 'Hell Priest', nameRu: 'Адский Жрец', nameDe: 'Höllenpriester', texKey: 'hell_priest', biome: 'hell',
        weaknesses: ['fire'], resistances: ['holy'], abilities: ['Dark heal', 'Curse', 'Soul siphon'],
        description: 'A corrupted healer that sustains hellish creatures with dark energy. It curses the living and siphons their vitality.',
        lore: 'Hell Priests were once devout healers who lost faith. The infernal lords offered them purpose — and a congregation of demons to tend.'
    },
    hell_imp: {
        name: 'Hell Imp', nameRu: 'Адский Имп', nameDe: 'Höllendämon', texKey: 'hell_imp', biome: 'hell',
        weaknesses: ['physical'], resistances: ['fire'], abilities: ['Quick strike', 'Swarm tactics', 'Flee'],
        description: 'A small, swift demon that attacks in packs. It flees when threatened but returns when danger passes.',
        lore: 'Hell Imps are the lowest rung of the infernal hierarchy. They exist to harass, distract, and occasionally kill — in that order.'
    },
    red_demon: {
        name: 'Red Demon', nameRu: 'Красный Демон', nameDe: 'Roter Dämon', texKey: 'red_demon', biome: 'hell_boss',
        weaknesses: ['holy'], resistances: ['fire', 'dark'], abilities: ['Fire wave', 'Meteor shower', 'Summon imps', 'Infernal rage'],
        description: 'A towering infernal lord wreathed in crimson flame. It commands the fires of hell itself and summons legions of imps.',
        lore: 'The Red Demon is a fallen archangel, consumed by rage and fire. It was cast into the deepest circle of hell, where it now reigns over ash and ember.'
    },
    ice_golem: {
        name: 'Ice Golem', nameRu: 'Ледяной Голем', nameDe: 'Eisgolem', texKey: 'ice_golem', biome: 'snowy_village',
        weaknesses: ['fire'], resistances: ['ice', 'physical'], abilities: ['Frozen slam', 'Ice armor', 'Chilling aura'],
        description: 'A massive construct of enchanted ice. It crushes intruders with frozen fists and radiates a paralyzing cold.',
        lore: 'Ice Golems are formed when the Ice Spirit\'s rage crystallizes. They guard the frozen village with mindless devotion, crushing anything that moves.'
    },
    frost_wraith: {
        name: 'Frost Wraith', nameRu: 'Морозный Призрак', nameDe: 'Frostgespenst', texKey: 'frost_wraith', biome: 'snowy_village',
        weaknesses: ['fire', 'holy'], resistances: ['ice', 'dark'], abilities: ['Frost touch', 'Phase shift', 'Ice cloak'],
        description: 'A spectral entity of biting cold. It phases through solid matter and freezes living flesh on contact.',
        lore: 'Frost Wraiths are the spirits of those who froze to death in the Ice Spirit\'s blizzard. They haunt the snowy village, seeking warmth they can never find.'
    },
    snow_wolf: {
        name: 'Snow Wolf', nameRu: 'Снежный Волк', nameDe: 'Schneewolf', texKey: 'snow_wolf', biome: 'snowy_village',
        weaknesses: ['fire'], resistances: ['ice'], abilities: ['Pack howl', 'Frost bite', 'Blizzard run'],
        description: 'A predator adapted to eternal winter. It hunts in coordinated packs and its bite injects freezing venom.',
        lore: 'Snow Wolves were once forest wolves caught in the Ice Spirit\'s freeze. They adapted — their fur turned white, their eyes turned blue, and their hearts turned cold.'
    },
    ice_elemental: {
        name: 'Ice Elemental', nameRu: 'Ледяной Элементаль', nameDe: 'Icelemental', texKey: 'ice_elemental', biome: 'snowy_village',
        weaknesses: ['fire'], resistances: ['ice'], abilities: ['Frost heal', 'Ice shield', 'Frozen bond'],
        description: 'A living embodiment of winter. It heals its allies with frozen energy and shields them with barriers of ice.',
        lore: 'Ice Elementals are born from the purest cold. They sustain the frozen village\'s unnatural winter, channeling the Ice Spirit\'s will into healing frost.'
    },
    frost_mage: {
        name: 'Frost Mage', nameRu: 'Морозный Маг', nameDe: 'Frostmagier', texKey: 'frost_mage', biome: 'snowy_village',
        weaknesses: ['physical'], resistances: ['ice', 'magic'], abilities: ['Ice bolt', 'Frost nova', 'Blizzard channel'],
        description: 'A sorcerer who traded warmth for power. It hurls bolts of ice and creates localized blizzards.',
        lore: 'Frost Mages were village scholars who tried to study the Ice Spirit. The cold seeped into their minds, replacing curiosity with merciless calculation.'
    },
    ice_spirit: {
        name: 'Ice Spirit', nameRu: 'Ледяной Дух', nameDe: 'Eisgeist', texKey: 'ice_spirit', biome: 'snowy_village_boss',
        weaknesses: ['fire', 'holy'], resistances: ['ice'], abilities: ['Frost wave', 'Blizzard', 'Summon ice shards', 'Absolute zero'],
        description: 'An ancient entity of primordial cold. It froze the village in a moment of rage and now guards its frozen domain with lethal frost.',
        lore: 'The Ice Spirit was once a winter deity, worshipped for snowfall and frost. When the village burned its shrine, the spirit retaliated — freezing everything it had once blessed.'
    }
};

export const MATERIAL_BOOK_LEVELS = [
    { level: 0, countRequired: 0,   hpBonus: 0, dmgBonus: 0, speedBonus: 0, info: 'description' },
    { level: 1, countRequired: 5,   hpBonus: 3, dmgBonus: 1, speedBonus: 0,  info: 'stats' },
    { level: 2, countRequired: 15,  hpBonus: 6, dmgBonus: 2, speedBonus: 5,  info: 'properties' },
    { level: 3, countRequired: 30,  hpBonus: 10, dmgBonus: 4, speedBonus: 10, info: 'recipe' },
    { level: 4, countRequired: 60,  hpBonus: 15, dmgBonus: 6, speedBonus: 15, info: 'mastery' },
    { level: 5, countRequired: 100, hpBonus: 22, dmgBonus: 9, speedBonus: 20, info: 'lore' }
];

export const MATERIAL_BOOK_ENTRIES = {
    wood:      { name: 'Wood',      rarity: 'common',   texKey: 'item_stick',  biome: 'forest',
        description: 'Sturdy timber harvested from the ancient trees of the forest. Light yet resilient, it forms the backbone of most tools and weapons.',
        properties: 'Burns slowly and evenly. Absorbs moisture from the air, becoming stronger over time.',
        recipe: 'Combine with oil for treated wood. Mix with iron ore for reinforced handles.',
        lore: 'The forests of the old world produced wood so dense it could deflect arrows. Loggers who knew the ancient techniques could shape it without metal tools.' },
    stone:     { name: 'Stone',     rarity: 'common',   texKey: 'item_stone',  biome: 'forest',
        description: 'River-smoothed stone, hard enough to crack bone. A reliable material for crushing and forging.',
        properties: 'Dense and heavy. Conducts cold well — stones from the deep mines are always cool to the touch.',
        recipe: 'Grind into powder for abrasive compounds. Heat to extreme temperatures for volcanic glass.',
        lore: 'Dwarven smiths believed certain stones held the memory of the earth. They would listen to the rock before forging, choosing only those that sang.' },
    leaf:      { name: 'Leaf',      rarity: 'common',   texKey: 'item_leaf',   biome: 'forest',
        description: 'A broad, emerald leaf from the canopy trees. Lightweight and flexible, with a faint herbal scent.',
        properties: 'Contains natural antiseptic compounds. Wilt quickly when separated from the branch.',
        recipe: 'Dry and grind into poultice powder. Steep in hot water for a restorative tea.',
        lore: 'Elven healers could read the health of a forest by the leaves alone. A curled leaf meant sickness; a vibrant one meant the roots ran deep and strong.' },
    mushroom:  { name: 'Mushroom',  rarity: 'uncommon', texKey: 'item_mush',   biome: 'forest',
        description: 'A plump, purple-capped mushroom that grows in dark, damp hollows. Its flesh is surprisingly nutritious.',
        properties: 'Bioluminescent when fresh. Releases spores that can irritate the lungs if handled carelessly.',
        recipe: 'Slice thin and dehydrate for preserved rations. Ferment into a potent healing draught.',
        lore: 'Alchemists prize the deep-forest mushrooms for their transformative properties. A single rare specimen can be the difference between a healing salve and a deadly poison.' },
    herb:      { name: 'Herb',      rarity: 'uncommon', texKey: 'item_herb',   biome: 'forest',
        description: 'Aromatic herbs with silver-veined leaves. Used in medicine and alchemy for centuries.',
        properties: 'Releases a sharp, invigorating aroma when crushed. The oils in the leaves promote rapid cell regeneration.',
        recipe: 'Infuse in alcohol for a tincture. Combine with mushroom extract for enhanced potency.',
        lore: 'The Silvervein herb grows only where ancient magic once flowed. Alchemists say it remembers the spells of old, whispering secrets to those who listen.' },
    gem_shard: { name: 'Gem Shard', rarity: 'rare',     texKey: 'item_ruby',   biome: 'mine',
        description: 'A crystalline fragment that pulses with inner light. Extremely dense with magical energy.',
        properties: 'Emits a faint hum when held near corruption. Can absorb and store small amounts of ambient magic.',
        recipe: 'Dissolve in acid for a magic-reactive solution. Grind into dust for enchanting inks.',
        lore: 'Gem shards are fragments of the World Crystal, shattered during the First Corruption. Each one still carries a fragment of the original purity — and a warning.' },
    cave_silk:  { name: 'Cave Silk',  rarity: 'common',   texKey: 'item_leaf',   biome: 'cave',
        description: 'Gossamer threads harvested from cave spider webs. Surprisingly strong and flexible.',
        properties: 'Absorbs light, making it nearly invisible in darkness. Conducts sound when stretched.',
        recipe: 'Weave into armor lining for stealth bonuses. Dissolve in solvent for adhesive compounds.',
        lore: 'Cave silk was once used by shadow assassins. Its natural light-absorbing properties made it perfect for moving unseen through lit corridors.' },
    cave_moss:  { name: 'Cave Moss',  rarity: 'common',   texKey: 'item_mush',   biome: 'cave',
        description: 'Luminescent moss that grows on cave walls. Emits a faint green glow.',
        properties: 'Generates light in darkness. Releases spores that promote natural healing.',
        recipe: 'Grind into poultice for rapid wound healing. Dry and burn for medicinal smoke.',
        lore: 'Cave moss grows where corruption seeps through the walls. It transforms the corruption into light — a natural counterbalance to the darkness.' },
    bat_wing:   { name: 'Bat Wing',   rarity: 'uncommon', texKey: 'item_leaf',   biome: 'cave',
        description: 'Translucent wing membrane from cave bats. Thin but remarkably durable.',
        properties: 'Amplifies sound when held. Can be shaped into hearing devices.',
        recipe: 'Combine with silk for enhanced stealth gear. Grind into powder for echolocation potions.',
        lore: 'Bat wings are woven with natural sonar threads. They capture and redirect sound waves, making them invaluable for navigation in darkness.' },
    dark_crystal: { name: 'Dark Crystal', rarity: 'rare', texKey: 'item_ruby', biome: 'cave',
        description: 'A shard of concentrated cave corruption. It pulses with dark energy.',
        properties: 'Amplifies magical power but increases corruption. Can store and release dark energy.',
        recipe: 'Dissolve in holy water for purification. Grind into dust for enchanting inks.',
        lore: 'Dark crystals are the cave\'s tears — condensed corruption that has solidified over centuries. They are both beautiful and deadly.' },
    hell_ash:       { name: 'Hell Ash',       rarity: 'common',   texKey: 'item_stone',  biome: 'hell',
        description: 'Fine, powdery ash from the floors of hell. It burns to the touch and never fully cools.',
        properties: 'Absorbs heat and moisture. Can be used to create heat-resistant compounds.',
        recipe: 'Mix with oil for a fireproof coating. Combine with metal ore for heat-treated alloys.',
        lore: 'Hell ash is the residue of burned souls. Alchemists prize it for its heat-resistant properties, but handling it requires extreme caution.' },
    infernal_ore:   { name: 'Infernal Ore',   rarity: 'uncommon', texKey: 'item_ruby',   biome: 'hell',
        description: 'A glowing ore that pulses with infernal energy. It radiates heat and cannot be touched with bare hands.',
        properties: 'Conducts heat and magical energy. Strengthens when exposed to fire.',
        recipe: 'Smelt in extreme heat for infernal ingots. Grind into powder for explosive compounds.',
        lore: 'Infernal ore forms in the deepest circles of hell, where reality bends under the weight of eternal fire. It remembers the souls that fueled its creation.' },
    demon_scale:    { name: 'Demon Scale',    rarity: 'rare',     texKey: 'item_ruby',   biome: 'hell',
        description: 'A hardened scale from a demon\'s hide. It shimmers with an inner fire and is nearly indestructible.',
        properties: 'Resists physical and magical damage. Absorbs fire damage to strengthen the wielder.',
        recipe: 'Forge with infernal ore for demonsteel. Grind into powder for protection elixirs.',
        lore: 'Demon scales are shed duringmolting — a rare moment of vulnerability. Collecting them requires either great skill or great recklessness.' },
    hellfire_crystal: { name: 'Hellfire Crystal', rarity: 'rare', texKey: 'item_ruby',  biome: 'hell',
        description: 'A crystal forged in the heart of hellfire. It burns with an eternal flame that never extinguishes.',
        properties: 'Radiates intense heat. Enhances fire-based attacks and spells.',
        recipe: 'Combine with weapon for fire enchantment. Dissolve in potion for fire resistance.',
        lore: 'Hellfire crystals are the tears of the first demon, shed when it was cast into the deepest circle. They burn with a rage that time cannot diminish.' }
};

export const SOUL_BOOK_LEVELS = [
    { level: 0, countRequired: 0,   hpBonus: 0, dmgBonus: 0, corDecay: 0, info: 'description' },
    { level: 1, countRequired: 5,   hpBonus: 2, dmgBonus: 0, corDecay: 0.005, info: 'stats' },
    { level: 2, countRequired: 15,  hpBonus: 5, dmgBonus: 2, corDecay: 0.010, info: 'weakness' },
    { level: 3, countRequired: 30,  hpBonus: 8, dmgBonus: 4, corDecay: 0.020, info: 'essence' },
    { level: 4, countRequired: 60,  hpBonus: 12, dmgBonus: 6, corDecay: 0.030, info: 'purification' },
    { level: 5, countRequired: 100, hpBonus: 18, dmgBonus: 10, corDecay: 0.050, info: 'lore' }
];

export const SOUL_BOOK_ENTRIES = {
    goblin:            { name: 'Goblin',            texKey: 'goblin',         biome: 'forest',
        description: 'A twisted soul, warped by greed and malice. Even in death, it clings to its petty treasures.',
        weakness: 'Susceptible to fire — their corrupted souls burn easily.',
        essence: 'Raw chaos energy. Unstable but powerful when channeled correctly.',
        purification: 'Burning a goblin soul releases trapped malice. The process is... unpleasant.',
        lore: 'Goblins were not always evil. The corruption twisted their playful nature into something cruel. Purifying their souls sometimes restores a fragment of who they once were.' },
    slime:             { name: 'Slime',             texKey: 'slime',          biome: 'forest',
        description: 'A mindless wad of living gel. Its soul is diffuse, spread across its entire body like oil on water.',
        weakness: 'Physical disruption scatters the soul temporarily. It reforms, but weaker.',
        essence: 'Amorphous and resilient. Slime essence can be used to create self-repairing compounds.',
        purification: 'Slime souls dissolve rather than burn. The resulting liquid has remarkable healing properties.',
        lore: 'Some alchemists believe slimes are the simplest form of life — and therefore the closest to the primordial soup from which all souls emerged.' },
    rat:               { name: 'Rat',               texKey: 'rat',            biome: 'forest',
        description: 'A swarm-soul, shared among dozens of bodies. Kill one and the rest grow stronger.',
        weakness: 'Fire disrupts the swarm connection. Isolated rats are nearly soulless.',
        essence: 'Collective consciousness energy. Tapping into it grants heightened senses.',
        purification: 'Rat souls scatter when burned. Each fragment carries a spark of the pack instinct.',
        lore: 'Rat swarms share a single distributed soul. This makes them nearly immortal — as long as one rat lives, the swarm persists.' },
    skeleton_warrior:  { name: 'Skeleton Warrior',  texKey: 'skeleton',       biome: 'mine',
        description: 'A oathbound soul, trapped in bone by duty. It cannot rest until its promise is fulfilled.',
        weakness: 'Blunt force shatters the vessel. The soul escapes, confused and wandering.',
        essence: 'Loyalty distilled. A warrior soul provides unwavering focus and determination.',
        purification: 'Breaking the oath releases the soul. It thanks you with a whisper before fading.',
        lore: 'These warriors swore to protect the mines for eternity. The corruption gave them eternity, but forgot to give them peace.' },
    skeleton_archer:   { name: 'Skeleton Archer',   texKey: 'skeleton_archer',  biome: 'mine',
        description: 'A swift, searching soul that still seeks its target. It fires at anything that moves.',
        weakness: 'Melee attacks bypass their guard. Their soul is exposed when they draw close.',
        essence: 'Precision energy. Archer souls enhance accuracy and reaction time.',
        purification: 'The arrow spirit dissolves into light when purified. It finally stops hunting.',
        lore: 'Archers in life, archers in death. Their purpose was so singular that even corruption could not reshape it.' },
    skeleton_shaman:   { name: 'Skeleton Shaman',   texKey: 'skeleton_shaman',  biome: 'mine',
        description: 'A scholar soul consumed by ambition. It still whispers forbidden knowledge to the living.',
        weakness: 'Physical attacks disrupt their concentration. They are fragile without their magic.',
        essence: 'Arcane resonance. Shaman essence amplifies spell power but destabilizes the mind.',
        purification: 'Purifying a shaman soul releases centuries of accumulated knowledge. Overwhelming for the unprepared.',
        lore: 'The shamans sought to understand corruption itself. They succeeded — and became it. Their knowledge remains, buried in their hollow skulls.' },
    ancient_treant:    { name: 'Ancient Treant',     texKey: 'treant_boss',    biome: 'arena',
        description: 'A primal soul, ancient beyond measure. It is not evil — it simply IS, like a storm or an earthquake.',
        weakness: 'Fire weakens the vessel but the soul endures. Only time can truly destroy a treant.',
        essence: 'Nature\'s raw power. Treant essence connects the user to the living earth itself.',
        purification: 'A treant cannot be purified — it was never corrupted. It must be... understood.',
        lore: 'The treant was here before the forest, before the corruption, before the world had a name. It remembers everything. And it forgives nothing.' },
    skeleton_lord:     { name: 'Skeleton Lord',      texKey: 'skeleton_lord',  biome: 'mine_boss',
        description: 'A king\'s soul, twisted by ambition and preserved by dark magic. It commands and corrupts all it touches.',
        weakness: 'Holy power disrupts his control. Without his minions, he is merely a bitter old king.',
        essence: 'Dominion energy. The Lord\'s soul radiates authority — those nearby feel compelled to obey.',
        purification: 'Purifying the Skeleton Lord releases the souls of all he enslaved. A cascade of light fills the mines.',
        lore: 'He wanted to rule forever. He got his wish. Now he rules nothing but dust and silence, surrounded by subjects who hate him.' },
    cave_spider:       { name: 'Cave Spider',        texKey: 'cave_spider',   biome: 'cave',
        description: 'A cunning predator soul, sharp and patient. It weaves death in darkness.',
        weakness: 'Fire burns away the web-soul. Without it, the spider is blind and confused.',
        essence: 'Web energy. Spider souls enhance trap-setting and ambush capabilities.',
        purification: 'Purifying a spider soul releases a cascade of sticky web. It hardens into silk.',
        lore: 'The cave spiders were once normal arachnids. The cave\'s magic made them into something far more dangerous — and far more aware.' },
    cave_bat:          { name: 'Cave Bat',           texKey: 'cave_bat',      biome: 'cave',
        description: 'A scattered soul, spread across echolocation pulses. It perceives everything but understands nothing.',
        weakness: 'Sonic attacks disrupt their echolocation. The soul fragments and reforms.',
        essence: 'Echo energy. Bat souls enhance spatial awareness and movement speed.',
        purification: 'Purifying a bat soul releases a shockwave of sound. It fades into silence.',
        lore: 'The cave bats evolved beyond their natural limits. Their souls became instruments of perception, tuned to the cave\'s frequency.' },
    stone_golem:       { name: 'Stone Golem',        texKey: 'stone_golem',   biome: 'cave',
        description: 'A bound soul, trapped in stone by ancient magic. It follows orders without question.',
        weakness: 'Magic disrupts the binding. The soul struggles to escape its stone prison.',
        essence: 'Stability energy. Golem souls enhance physical defense and endurance.',
        purification: 'Purifying a golem soul releases the ancient binding spell. The stone crumbles.',
        lore: 'The golems were created by cave mages who needed tireless guardians. The magic worked too well — the golems still guard, long after their creators vanished.' },
    earth_worm:        { name: 'Earth Worm',         texKey: 'earth_worm',    biome: 'cave',
        description: 'A primal soul, driven by hunger and instinct. It burrows through reality itself.',
        weakness: 'Fire and extreme heat drive the soul into hibernation. The worm becomes dormant.',
        essence: 'Tunnel energy. Worm souls enhance burrowing and earth manipulation.',
        purification: 'Purifying an earth worm soul releases a tremor. The ground settles, strengthened.',
        lore: 'The earth worms predate the cave itself. They burrowed up from the world\'s core, carrying the memory of deep heat and pressure.' },
    giant_bat:         { name: 'Giant Bat',          texKey: 'giant_bat',     biome: 'cave_boss',
        description: 'A commanding soul, amplified by corruption. It controls lesser creatures through fear.',
        weakness: 'Holy power disrupts its command. Without it, the swarm turns on itself.',
        essence: 'Command energy. The Giant Bat\'s soul radiates authority over cave creatures.',
        purification: 'Purifying the Giant Bat releases all the fear it has collected. A wave of terror, then peace.',
        lore: 'This creature was once a normal bat that stumbled upon the cave\'s dark heart. The corruption gave it intelligence — and a hunger for dominance.' },
    village_brute:     { name: 'Infected Brute',      texKey: 'village_brute',   biome: 'village',
        description: 'A massive soul, crushed under its own weight. It knows only strength and obedience.',
        weakness: 'Fire burns away the corruption that binds it. The soul struggles free, confused and afraid.',
        essence: 'Raw physical power. Brute souls enhance strength and endurance but cloud the mind.',
        purification: 'Purifying a brute soul releases decades of suppressed rage. Then silence — a simple soul, finally at rest.',
        lore: 'The brute was a craftsman who built things with his hands. Now he only breaks them. His soul remembers the weight of a hammer, but not what it was meant to build.' },
    village_stalker:   { name: 'Infected Stalker',    texKey: 'village_stalker', biome: 'village',
        description: 'A sharp, restless soul that craves the hunt. It sees everything and trusts nothing.',
        weakness: 'Light exposes the stalker\'s soul. In illumination, it cannot hide — and panics.',
        essence: 'Perception energy. Stalker souls enhance awareness and reaction speed.',
        purification: 'Purifying a stalker soul releases a burst of tactical knowledge. Centuries of observation, compressed into a moment.',
        lore: 'Stalkers were scouts and rangers who knew every shadow in the village. The corruption turned their vigilance into paranoia, their protectiveness into predation.' },
    village_spitter:   { name: 'Infected Spitter',    texKey: 'village_spitter', biome: 'village',
        description: 'A corrosive soul, eaten alive by its own acid. It projects its pain outward.',
        weakness: 'Physical disruption scatters the acid soul. It dissolves into harmless vapor.',
        essence: 'Corrosion energy. Spitter souls enhance chemical attacks and area denial.',
        purification: 'Purifying a spitter soul neutralizes the acid. The resulting liquid is paradoxically pure — the corruption\'s opposite.',
        lore: 'The spitter was a farmer who tended the village gardens. When the corruption came, it consumed him from the inside out, replacing organs with acid glands. He still remembers the smell of fresh soil.' },
    village_curser:    { name: 'Infected Curser',     texKey: 'village_curser',  biome: 'village',
        description: 'A hollow soul, drained of purpose. It feeds on others to fill the void.',
        weakness: 'Fire purges the curse energy. Without it, the soul is empty — neither good nor evil.',
        essence: 'Drain energy. Curser souls enhance life-stealing and debuffing capabilities.',
        purification: 'Purifying a curser soul releases a wave of healing energy — the inverse of its curse. It remembers what it was meant to do.',
        lore: 'The curser was the village healer, the last to fall. She tried to fight the corruption with her own arts, but it twisted her gifts into weapons. Her soul still yearns to heal.' },
    zombie:            { name: 'Risen Dead',          texKey: 'zombie',          biome: 'village',
        description: 'A fragmented soul, barely coherent. It moves on instinct alone, driven by hunger.',
        weakness: 'Fire releases the binding spell. The soul drifts upward, mindless and peaceful.',
        essence: 'Persistence energy. Zombie souls enhance resilience but strip away intelligence.',
        purification: 'Purifying a zombie soul releases a sigh of relief. The dead finally rest, their borrowed animation ending.',
        lore: 'The risen dead were the first victims of the cemetery\'s corruption. Their souls were torn from the afterlife and forced back into rotting bodies. They feel only hunger — and a distant, fading memory of life.' },
    purple_demon:      { name: 'Purple Demon',        texKey: 'purple_demon',   biome: 'village_boss',
        description: 'A command soul, wrapped in purple flame. It commands legions and fears nothing.',
        weakness: 'Holy power disrupts its infernal authority. Without it, the demon is merely a bitter tyrant.',
        essence: 'Dominion energy. The Purple Demon\'s soul radiates command — lesser creatures obey involuntarily.',
        purification: 'Purifying the Purple Demon releases a cascade of consumed souls. Hundreds of voices cry out, then fall silent. The demon itself? It laughs as it burns.',
        lore: 'The Purple Demon was cast down from the infernal courts for failing to hold a lesser realm. It was given the village cemetery as its domain — a punishment, not a prize. It has been trying to prove itself ever since.' },
    hell_guard:        { name: 'Hell Guard', nameRu: 'Адская Стража', nameDe: 'Höllengarde', texKey: 'hell_guard', biome: 'hell',
        description: 'A bound soul, fused to molten armor by infernal decree. It knows only duty and defiance.',
        weakness: 'Holy power shatters the binding. The soul escapes, confused and grateful.',
        essence: 'Warden energy. Hell Guard souls enhance physical defense and damage absorption.',
        purification: 'Purifying a hell guard soul releases the binding spell. The armor crumbles, revealing a faint, fading light.',
        lore: 'Hell Guards were celestial wardens before the first breach. They failed their charges, and the infernal lords made examples of them — eternal servitude in molten steel.' },
    hell_stalker:      { name: 'Hell Stalker', nameRu: 'Адский Сталкер', nameDe: 'Höllenschleicher', texKey: 'hell_stalker', biome: 'hell',
        description: 'A restless soul that craves the kill. It moves between shadows like a knife through silk.',
        weakness: 'Light exposes the stalker. In illumination, it cannot hide — and panics.',
        essence: 'Shadow energy. Stalker souls enhance evasion and critical strike capability.',
        purification: 'Purifying a stalker soul releases a burst of tactical knowledge. Centuries of assassination, compressed into a moment.',
        lore: 'Hell Stalkers were assassins who sold their souls for power. The infernal lords collected — and kept them working for eternity.' },
    hell_archer:       { name: 'Hell Archer', nameRu: 'Адский Лучник', nameDe: 'Höllenbogenschütze', texKey: 'hell_archer', biome: 'hell',
        description: 'A focused soul, honed by endless combat. It fires with lethal precision from the back lines.',
        weakness: 'Melee attacks disrupt their aim. Their soul falters when the distance closes.',
        essence: 'Precision energy. Archer souls enhance ranged damage and accuracy.',
        purification: 'Purifying a hell archer soul releases a volley of spectral arrows. They arc upward and dissolve into light.',
        lore: 'Hell Archers abandoned their posts during the great war. The infernal lords gave them a new war — one that never ends.' },
    hell_mage:         { name: 'Hell Mage', nameRu: 'Адский Маг', nameDe: 'Höllenmagier', texKey: 'hell_mage', biome: 'hell',
        description: 'A consumed soul, hollowed out and filled with hellfire. It burns from the inside out.',
        weakness: 'Physical attacks disrupt their casting. They are fragile without their magic.',
        essence: 'Arcane fire energy. Hell Mage souls amplify spell power but destabilize the mind.',
        purification: 'Purifying a hell mage soul releases a wave of forbidden knowledge. Most of it is useless. Some of it is terrifying.',
        lore: 'Hell Mages sought knowledge beyond mortal limits. The infernal lords obliged — and claimed their souls as tuition.' },
    hell_priest:       { name: 'Hell Priest', nameRu: 'Адский Жрец', nameDe: 'Höllenpriester', texKey: 'hell_priest', biome: 'hell',
        description: 'A hollowed soul, inverted from healer to harvester. It sustains demons and drains the living.',
        weakness: 'Fire purges the corruption. Without it, the soul is empty — neither good nor evil.',
        essence: 'Drain energy. Hell Priest souls enhance life-stealing and debuffing capabilities.',
        purification: 'Purifying a hell priest soul releases a wave of healing energy — the inverse of its curse. It remembers what it was meant to do.',
        lore: 'Hell Priests were healers who lost faith. The infernal lords offered them a new congregation — and a purpose twisted beyond recognition.' },
    hell_imp:          { name: 'Hell Imp', nameRu: 'Адский Имп', nameDe: 'Höllendämon', texKey: 'hell_imp', biome: 'hell',
        description: 'A fragmented soul, barely coherent. It swarms and flees, swarms and flees, endlessly.',
        weakness: 'Physical disruption scatters the swarm. Isolated imps are nearly soulless.',
        essence: 'Swarm energy. Imp souls enhance speed and cooperative tactics.',
        purification: 'Purifying a hell imp soul releases a squeak of surprise. Then silence. The imp was not expecting mercy.',
        lore: 'Hell Imps are the scraps of the infernal hierarchy. They exist to fill numbers, absorb hits, and occasionally land a lucky strike.' },
    red_demon:         { name: 'Red Demon', nameRu: 'Красный Демон', nameDe: 'Roter Dämon', texKey: 'red_demon', biome: 'hell_boss',
        description: 'A fallen archangel\'s soul, consumed by rage and fire. It commands hellfire and summons legions.',
        weakness: 'Holy power disrupts its infernal authority. Without it, the demon is merely a bitter, burning shadow.',
        essence: 'Infernal command energy. The Red Demon\'s soul radiates destructive authority — fire obeys its will.',
        purification: 'Purifying the Red Demon releases a cascade of consumed souls. Thousands of voices cry out, then fall silent. The demon itself laughs as it burns — then stops.',
        lore: 'The Red Demon was once an archangel of fury, cast down for questioning the divine plan. It found hellfire more honest than heaven\'s light. Now it burns eternally, and makes others burn with it.' },
    ice_golem:         { name: 'Ice Golem', nameRu: 'Ледяной Голем', nameDe: 'Eisgolem', texKey: 'ice_golem', biome: 'snowy_village',
        description: 'A construct of living ice, animated by the Ice Spirit\'s rage. It crushes with frozen fists.',
        weakness: 'Fire melts the enchantment. Without it, the golem is just ice — heavy, but mindless.',
        essence: 'Frozen rage energy. Ice Golem souls enhance physical resilience and cold damage.',
        purification: 'Purifying an ice golem soul releases a rush of warm air. The ice cracks, drips, and finally — silence. The golem was never truly alive.',
        lore: 'Ice Golems are formed when the Ice Spirit\'s rage crystallizes into form. They guard the frozen village with devotion that borders on worship.' },
    frost_wraith:       { name: 'Frost Wraith', nameRu: 'Морозный Призрак', nameDe: 'Frostgespenst', texKey: 'frost_wraith', biome: 'snowy_village',
        description: 'A spirit trapped between life and ice. It phases through matter and freezes on contact.',
        weakness: 'Holy fire releases the spirit. Without it, the wraith drifts aimlessly, seeking warmth.',
        essence: 'Spectral cold energy. Frost Wraith souls enhance evasion and cold resistance.',
        purification: 'Purifying a frost wraith soul releases a whisper of gratitude. The cold fades. The spirit was waiting for someone to let it go.',
        lore: 'Frost Wraiths are the souls of villagers who froze to death in the Ice Spirit\'s blizzard. They haunt their former homes, unable to rest.' },
    snow_wolf:          { name: 'Snow Wolf', nameRu: 'Снежный Волк', nameDe: 'Schneewolf', texKey: 'snow_wolf', biome: 'snowy_village',
        description: 'A predator of eternal winter. It hunts in packs and its bite injects freezing venom.',
        weakness: 'Fire breaks the pack\'s coordination. Isolated wolves are confused and vulnerable.',
        essence: 'Pack instinct energy. Snow Wolf souls enhance speed and cooperative damage.',
        purification: 'Purifying a snow wolf soul releases a howl of acknowledgment. The wolf was never evil — just cold and hungry.',
        lore: 'Snow Wolves were forest wolves caught in the Ice Spirit\'s freeze. Their fur turned white, their hearts turned cold, and they forgot the warmth of the sun.' },
    ice_elemental:      { name: 'Ice Elemental', nameRu: 'Ледяной Элементаль', nameDe: 'Icelemental', texKey: 'ice_elemental', biome: 'snowy_village',
        description: 'A living embodiment of winter. It heals allies with frozen energy and shields them with ice.',
        weakness: 'Fire evaporates its form. Without heat resistance, the elemental is vulnerable.',
        essence: 'Winter sustenance energy. Ice Elemental souls enhance healing and cold resistance.',
        purification: 'Purifying an ice elemental soul releases a sigh of relief. The cold recedes. The elemental was keeping winter alive against its will.',
        lore: 'Ice Elementals are born from the purest cold. They sustain the frozen village\'s unnatural winter, channeling the Ice Spirit\'s will into healing frost.' },
    frost_mage:         { name: 'Frost Mage', nameRu: 'Морозный Маг', nameDe: 'Frostmagier', texKey: 'frost_mage', biome: 'snowy_village',
        description: 'A sorcerer who traded warmth for power. It hurls ice bolts and creates blizzards.',
        weakness: 'Physical disruption breaks its concentration. Without focus, the mage is defenseless.',
        essence: 'Arcane frost energy. Frost Mage souls enhance spell power and cold damage.',
        purification: 'Purifying a frost mage soul releases a cascade of frozen memories. The mage\'s last thought was: "I should have brought a warmer coat."',
        lore: 'Frost Mages were village scholars who tried to study the Ice Spirit. The cold seeped into their minds, replacing curiosity with merciless calculation.' },
    ice_spirit:         { name: 'Ice Spirit', nameRu: 'Ледяной Дух', nameDe: 'Eisgeist', texKey: 'ice_spirit', biome: 'snowy_village_boss',
        description: 'An ancient deity of primordial cold. It froze the village in a moment of rage.',
        weakness: 'Holy fire and concentrated warmth disrupt its form. The Warmth Core is its antithesis.',
        essence: 'Primordial winter energy. The Ice Spirit\'s soul embodies absolute cold — the absence of all warmth.',
        purification: 'Purifying the Ice Spirit releases a wave of warmth that spreads across the frozen village. The ice cracks. The snow melts. For the first time in centuries, the village remembers spring.',
        lore: 'The Ice Spirit was once a winter deity, worshipped for snowfall and frost. When the village burned its shrine, the spirit retaliated — freezing everything it had once blessed. Its rage was absolute. Its regret, eternal.' }
};

/* ===== NPC DATABASE ===== */

export const NPC_DB = {
    elder: {
        name: 'Village Elder',
        nameRu: 'Старейшина',
        nameDe: 'Dorfältester',
        texKey: 'npc_elder',
        biome: 'forest',
        x: 680, y: 800,
        greeting: 'Brave adventurer, our village needs your help!',
        greetingRu: 'Храбрый странник, нашей деревне нужна твоя помощь!',
        greetingDe: 'Mutiger Abenteuerer, unser Dorf braucht deine Hilfe!',
        quests: ['kill_goblins', 'kill_rats', 'treant_boss']
    },
    miner: {
        name: 'Old Miner',
        nameRu: 'Старый Шахтёр',
        nameDe: 'Alter Bergmann',
        texKey: 'npc_miner',
        biome: 'mine',
        x: 680, y: 800,
        greeting: 'The mines hold treasure... and danger.',
        greetingRu: 'Шахты хранят сокровища... и опасность.',
        greetingDe: 'Die Minen bergen Schätze... und Gefahren.',
        quests: ['kill_skeletons', 'mine_chests', 'skeleton_lord_boss']
    }
};

/* ===== QUEST DATABASE ===== */

export const QUEST_DB = {
    kill_goblins: {
        name: 'Goblin Trouble',
        nameRu: 'Проблемы с Гоблинами',
        nameDe: 'Goblin-Ärger',
        type: 'kill',
        target: 'goblin',
        count: 10,
        biome: 'forest',
        description: 'The goblins have been raiding our supplies. Put an end to their mischief.',
        descriptionRu: 'Гоблины грабят наши запасы. Положите конец их шалостям.',
        descriptionDe: 'Die Goblinen plündern unsere Vorräte. Mach ihren Machenschaften ein Ende.',
        rewards: { exp: 80, accountExp: 30 },
        rewardItems: ['iron_sword', 'leather_armor'],
        prerequisite: null
    },
    kill_rats: {
        name: 'Rat Pack',
        nameRu: 'Крысиная Стая',
        nameDe: 'Rattenhorde',
        type: 'kill',
        target: 'rat',
        count: 15,
        biome: 'forest',
        description: 'A swarm of rats has infested the forest. They must be stopped.',
        descriptionRu: 'Стая крыс захлестнула лес. Их нужно остановить.',
        descriptionDe: 'Eine Rattenschwärme hat den Wald befallen. Sie müssen aufgehalten werden.',
        rewards: { exp: 100, accountExp: 40 },
        rewardItems: ['ruby_ring'],
        prerequisite: null
    },
    treant_boss: {
        name: 'The Ancient One',
        nameRu: 'Древнее Существо',
        nameDe: 'Das Uralte',
        type: 'kill',
        target: 'ancient_treant',
        count: 1,
        biome: 'arena',
        description: 'The Ancient Treant guards the path forward. Only by defeating it can you reach the mines.',
        descriptionRu: 'Древний Трент охраняет путь вперёд. Только победив его вы доберётесь до шахт.',
        descriptionDe: 'Der Uralte Treant bewacht den Weg nach vorn. Nur durch seinen Besieg gelangst du zu den Minen.',
        rewards: { exp: 300, accountExp: 100, talentPoints: 1 },
        rewardItems: ['flame_blade'],
        prerequisite: null
    },
    kill_skeletons: {
        name: 'Bone Patrol',
        nameRu: 'Костяной Патруль',
        nameDe: 'Knochenpatrouille',
        type: 'kill',
        target: 'skeleton_warrior',
        count: 10,
        biome: 'mine',
        description: 'The skeleton warriors guard the deepest mines. Break through their ranks.',
        descriptionRu: 'Скелеты-воины охраняют глубочайшие шахты. Прорвитесь сквозь их ряды.',
        descriptionDe: 'Die Skelettkrieger bewachen die tiefsten Minen. Brich durch ihre Reihen.',
        rewards: { exp: 120, accountExp: 50 },
        rewardItems: ['iron_armor'],
        prerequisite: 'treant_boss'
    },
    mine_chests: {
        name: 'Treasure Hunter',
        nameRu: 'Охотник за Сокровищами',
        nameDe: 'Schatzjäger',
        type: 'collect',
        target: 'mine_chest',
        count: 5,
        biome: 'mine',
        description: 'The old miners left hidden chests throughout the mines. Find 5 of them.',
        descriptionRu: 'Старые шахтёры спрятали сундуки по всей шахте. Найдите 5 из них.',
        descriptionDe: 'Die alten Bergleute haben versteckte Truhen in den Minen hinterlassen. Finde 5 davon.',
        rewards: { exp: 150, accountExp: 60 },
        rewardItems: ['dragon_scale'],
        prerequisite: 'treant_boss'
    },
    skeleton_lord_boss: {
        name: 'The Bone King',
        nameRu: 'Костяной Король',
        nameDe: 'Der Knochenkönig',
        type: 'kill',
        target: 'skeleton_lord',
        count: 1,
        biome: 'mine_boss',
        description: 'The Skeleton Lord rules the dead. End his eternal reign.',
        descriptionRu: 'Повелитель Скелетов правит мёртвыми. Положите конец его вечному правлению.',
        descriptionDe: 'Der Skelett-Lord herrscht über die Toten. Beende seine ewige Herrschaft.',
        rewards: { exp: 500, accountExp: 200, talentPoints: 2 },
        rewardItems: ['crown'],
        prerequisite: 'treant_boss'
    }
};

export const QUEST_REWARD_CHANCE = 0.5;

/* ===== CRAFTING RECIPES ===== */

export const CRAFT_CATEGORIES = {
    weapon:    { en: 'Weapons',     ru: 'Оружие',        de: 'Waffen' },
    armor:     { en: 'Armor',       ru: 'Броня',         de: 'Rüstung' },
    accessory: { en: 'Accessories', ru: 'Аксессуары',    de: 'Accessoires' },
    potion:    { en: 'Potions',     ru: 'Зелья',         de: 'Tränke' }
};

export const CRAFTING_RECIPES = [
    // === Level 0 (базовый — доступен сразу) ===
    {
        id: 'craft_wooden_staff',
        name: 'Wooden Staff',
        nameRu: 'Деревянный Посох',
        nameDe: 'Holzstab',
        category: 'weapon',
        rarity: 'common',
        slot: 'weapon',
        levelRequired: 0,
        materials: { wood: 3, leaf: 1 },
        stats: { dmg: 4 },
        texKey: 'item_stick',
        description: 'A simple staff carved from forest wood.',
        descriptionRu: 'Простой посох, вырезанный из лесного дерева.',
        descriptionDe: 'Ein einfacher Stab aus Waldholz geschnitzt.'
    },
    {
        id: 'craft_leather_cap',
        name: 'Leather Cap',
        nameRu: 'Кожаная Шапка',
        nameDe: 'Lederkappe',
        category: 'armor',
        rarity: 'common',
        slot: 'armor',
        levelRequired: 0,
        materials: { wood: 2, stone: 1 },
        stats: { hp: 10 },
        texKey: 'item_leather',
        description: 'Light headgear reinforced with stone.',
        descriptionRu: 'Лёгкий головной убор, укреплённый камнем.',
        descriptionDe: 'Leichter Kopfschutz, mit Stein verstärkt.'
    },
    {
        id: 'craft_herb_pendant',
        name: 'Herb Pendant',
        nameRu: 'Травяной Кулон',
        nameDe: 'Krautanhänger',
        category: 'accessory',
        rarity: 'common',
        slot: 'accessory',
        levelRequired: 0,
        materials: { leaf: 2, mushroom: 1 },
        stats: { hp: 5, regen: 1 },
        texKey: 'item_herb',
        description: 'A pendant imbued with herbal essence. Promotes natural healing.',
        descriptionRu: 'Кулон, пропитанный травяной эссенцией. Способствует естественному исцелению.',
        descriptionDe: 'Ein mit Krautessenz getränkter Anhänger. Fördert natürliche Heilung.'
    },

    // === Level 1 ===
    {
        id: 'craft_stone_blade',
        name: 'Stone Blade',
        nameRu: 'Каменный Клинок',
        nameDe: 'Steinklinge',
        category: 'weapon',
        rarity: 'uncommon',
        slot: 'weapon',
        levelRequired: 1,
        materials: { stone: 4, wood: 2 },
        stats: { dmg: 7, crit: 1 },
        texKey: 'item_stone',
        description: 'A blade sharpened from river stone. Brittle but sharp.',
        descriptionRu: 'Клинок, заточенный из речного камня. Хрупкий, но острый.',
        descriptionDe: 'Eine aus Flussstein geschliffene Klinge. Spröde, aber scharf.'
    },
    {
        id: 'craft_mushroom_cap',
        name: 'Mushroom Helm',
        nameRu: 'Грибной Шлем',
        nameDe: 'Pilzhelm',
        category: 'armor',
        rarity: 'uncommon',
        slot: 'armor',
        levelRequired: 1,
        materials: { mushroom: 3, wood: 2 },
        stats: { hp: 18, regen: 1 },
        texKey: 'item_mush',
        description: 'A helmet grown from enchanted mushroom cap. Surprisingly durable.',
        descriptionRu: 'Шлем, выращенный из зачарованной шляпки гриба. Удивительно прочный.',
        descriptionDe: 'Ein Helm aus verzaubertem Pilz gewachsen. Überraschend haltbar.'
    },
    {
        id: 'craft_healing_salve',
        name: 'Healing Salve',
        nameRu: 'Целебная Мазь',
        nameDe: 'Heilsalbe',
        category: 'potion',
        rarity: 'uncommon',
        slot: 'accessory',
        levelRequired: 1,
        materials: { mushroom: 2, herb: 1 },
        stats: { hp: 12, regen: 2 },
        texKey: 'item_mush',
        description: 'A thick salve that accelerates natural recovery.',
        descriptionRu: 'Густая мазь, ускоряющая естественное восстановление.',
        descriptionDe: 'Eine dicke Salbe, die die natürliche Erholung beschleunigt.'
    },

    // === Level 2 ===
    {
        id: 'craft_arcane_wand',
        name: 'Arcane Wand',
        nameRu: 'Тайный Жезл',
        nameDe: 'Arkaner Zauberstab',
        category: 'weapon',
        rarity: 'rare',
        slot: 'weapon',
        levelRequired: 2,
        materials: { wood: 5, herb: 3, gem_shard: 2 },
        stats: { dmg: 12, crit: 3 },
        texKey: 'item_ruby',
        description: 'A wand channeling raw arcane energy through gem shards.',
        descriptionRu: 'Жезл, направляющий чистую магическую энергию через осколки самоцветов.',
        descriptionDe: 'Ein Zauberstab, der rohe Arkane Energie durch Edelsteinbrocken lenkt.'
    },
    {
        id: 'craft_gemstone_ring',
        name: 'Gemstone Ring',
        nameRu: 'Самоцветное Кольцо',
        nameDe: 'Edelsteinring',
        category: 'accessory',
        rarity: 'rare',
        slot: 'accessory',
        levelRequired: 2,
        materials: { gem_shard: 3, herb: 2 },
        stats: { hp: 15, dmg: 8 },
        texKey: 'item_sapph',
        description: 'A ring set with a luminous gem shard. Amplifies inner power.',
        descriptionRu: 'Кольцо с светящимся осколком самоцвета. Усиливает внутреннюю силу.',
        descriptionDe: 'Ein Ring mit einem leuchtenden Edelsteinbrocken. Verstärkt die innere Kraft.'
    },
    {
        id: 'craft_iron_potion',
        name: 'Iron Elixir',
        nameRu: 'Железный Эликсир',
        nameDe: 'Eisenelixier',
        category: 'potion',
        rarity: 'rare',
        slot: 'accessory',
        levelRequired: 2,
        materials: { stone: 5, herb: 3, mushroom: 2 },
        stats: { hp: 25, dmg: 5 },
        texKey: 'item_stone',
        description: 'An elixir that hardens the body like iron.',
        descriptionRu: 'Эликсир, отвердевающий тело как железо.',
        descriptionDe: 'Ein Elixier, das den Körper härter wie Eisen macht.'
    },

    // === Level 3 ===
    {
        id: 'craft_flame_staff',
        name: 'Flame-Touched Staff',
        nameRu: 'Огненный Посох',
        nameDe: 'Flammenberührter Stab',
        category: 'weapon',
        rarity: 'epic',
        slot: 'weapon',
        levelRequired: 3,
        materials: { wood: 8, herb: 4, gem_shard: 3 },
        stats: { dmg: 18, crit: 5, spellPercent: 3 },
        texKey: 'item_flame',
        description: 'A staff infused with elemental fire. Burns on contact.',
        descriptionRu: 'Посох, пропитанный стихийным огнём. Горит при контакте.',
        descriptionDe: 'Ein mit elementarem Feuer durchdrungener Stab. Brennt bei Kontakt.'
    },
    {
        id: 'craft_shadow_cloak',
        name: 'Shadow Cloak',
        nameRu: 'Плащ Теней',
        nameDe: 'Schattenumhang',
        category: 'armor',
        rarity: 'epic',
        slot: 'armor',
        levelRequired: 3,
        materials: { herb: 5, mushroom: 4, gem_shard: 2 },
        stats: { hp: 30, dodgePercent: 3 },
        texKey: 'acc_mantle',
        description: 'A cloak woven from shadow-thread. Makes the wearer harder to hit.',
        descriptionRu: 'Плащ, сотканный из теневой нити. Делает носящего труднее для попадания.',
        descriptionDe: 'Ein aus Schattengewebe gewebter Umhang. Macht den Träger schwerer zu treffen.'
    },
    {
        id: 'craft_soul_pendant',
        name: 'Soul Pendant',
        nameRu: 'Душевный Кулон',
        nameDe: 'Seelenanhänger',
        category: 'accessory',
        rarity: 'epic',
        slot: 'accessory',
        levelRequired: 3,
        materials: { gem_shard: 4, herb: 3 },
        stats: { hp: 20, dmg: 10, regenPercent: 2 },
        texKey: 'acc_amulet',
        description: 'A pendant resonating with soul energy. Enhances life force.',
        descriptionRu: 'Кулон, резонирующий с энергией души. Усиливает жизненную силу.',
        descriptionDe: 'Ein Anhänger, der mit Seelenenergie resoniert. Verstärkt die Lebenskraft.'
    },

    // === Level 4 ===
    {
        id: 'craft_eternity_staff',
        name: 'Staff of Eternity',
        nameRu: 'Посох Вечности',
        nameDe: 'Stab der Ewigkeit',
        category: 'weapon',
        rarity: 'legendary',
        slot: 'weapon',
        levelRequired: 4,
        materials: { wood: 10, herb: 8, gem_shard: 5 },
        stats: { dmg: 25, crit: 8, spellPercent: 5 },
        texKey: 'acc_book',
        description: 'A legendary staff that has endured for ages. Its power is immense.',
        descriptionRu: 'Легендарный посох, простоявший веками. Его сила огромна.',
        descriptionDe: 'Ein legendärer Stab, der Jahrhaltende überdauert hat. Seine Kraft ist gewaltig.'
    },
    {
        id: 'craft_dragon_plate',
        name: 'Dragon Plate',
        nameRu: 'Драконий Доспех',
        nameDe: 'Drachenplatte',
        category: 'armor',
        rarity: 'legendary',
        slot: 'armor',
        levelRequired: 4,
        materials: { stone: 10, gem_shard: 5, herb: 3 },
        stats: { hp: 60, dmg: 10, damageReduction: 3 },
        texKey: 'item_dscale',
        description: 'Armor forged from the hardest materials. Nearly indestructible.',
        descriptionRu: 'Доспех, выкованный из самых прочных материалов. Почти неуничтожимый.',
        descriptionDe: 'Aus den härtesten Materialien geschmiedete Rüstung. Fast unzerstörbar.'
    },
    {
        id: 'craft_life_ring',
        name: 'Ring of Vitality',
        nameRu: 'Кольцо Жизненной Силы',
        nameDe: 'Ring der Vitalität',
        category: 'accessory',
        rarity: 'legendary',
        slot: 'accessory',
        levelRequired: 4,
        materials: { gem_shard: 6, mushroom: 5, herb: 4 },
        stats: { hp: 40, regenPercent: 5, dmg: 8 },
        texKey: 'item_crown',
        description: 'A ring pulsing with pure life energy. The wearer barely needs rest.',
        descriptionRu: 'Кольцо, пульсирующее чистой жизненной энергией. Носящий почти не нуждается в отдыхе.',
        descriptionDe: 'Ein Ring, der rein pulsiert mit Lebensenergie. Der Träger braucht kaum noch Ruhe.'
    },

    // === Level 5 (секретные рецепты) ===
    {
        id: 'craft_void_scepter',
        name: 'Void Scepter',
        nameRu: 'Скипетр Пустоты',
        nameDe: 'Szepter der Leere',
        category: 'weapon',
        rarity: 'legendary',
        slot: 'weapon',
        levelRequired: 5,
        materials: { wood: 15, gem_shard: 10, herb: 8 },
        stats: { dmg: 35, crit: 10, spellPercent: 8 },
        texKey: 'acc_book',
        description: 'A scepter forged in the space between worlds. Reality bends to its will.',
        descriptionRu: 'Скипетр, выкованный в пространстве между мирами. Реальность подчиняется его воле.',
        descriptionDe: 'Ein Szepter, geschmieden im Raum zwischen Welten. Realität beugt sich seinem Willen.'
    },
    {
        id: 'craft_purestone_amulet',
        name: 'Purestone Amulet',
        nameRu: 'Амулет Чистого Камня',
        nameDe: 'Reinsteinedelstein-Amulett',
        category: 'accessory',
        rarity: 'legendary',
        slot: 'accessory',
        levelRequired: 5,
        materials: { gem_shard: 12, mushroom: 6, herb: 6 },
        stats: { hp: 50, dmg: 15, regenPercent: 5, critPercent: 3 },
        texKey: 'acc_amulet',
        description: 'An amulet containing a perfectly formed gem shard. Radiates purity.',
        descriptionRu: 'Амулет, содержащий идеально сформированный осколок самоцвета. Излучает чистоту.',
        descriptionDe: 'Ein Amulett mit einem perfekt geformten Edelsteinbrocken. Strahlt Reinheit aus.'
    }
];

/* ===== SECRET KEY (drops from Skeleton Lord on Hard+) ===== */

export const SECRET_KEY_ITEM = {
    id: 'secret_key',
    name: 'Ancient Key',
    nameRu: 'Древний Ключ',
    nameDe: 'Alter Schlüssel',
    texKey: 'item_key',
    rarity: 'legendary',
    type: 'material',
    description: 'A mysterious key that hums with dark energy. The old cart driver might know what it opens.',
    descriptionRu: 'Загадочный ключ, гудящий тёмной энергией. Старый извозчик或許知道 что он открывает.',
    descriptionDe: 'Ein geheimnisvoller Schlüssel, der von dunkler Energie summt. Der alte Kutscher weiß vielleicht, was er öffnet.',
    dropDifficulty: 'Hard'
};

/* ===== CART DRIVER NPC ===== */

export const CART_DRIVER_NPC = {
    cart_driver: {
        name: 'Mysterious Cart Driver',
        nameRu: 'Загадочный Извозчик',
        nameDe: 'Geheimnisvoller Kutscher',
        texKey: 'npc_cart_driver',
        biome: 'forest',
        x: 250, y: 80,
        greeting: 'That key... I know where it leads. Hop in.',
        greetingRu: 'Этот ключ... я знаю куда он ведёт. Запрыгивай.',
        greetingDe: 'Dieser Schlüssel... ich weiß wohin er führt. Steig ein.',
        requiresItem: 'secret_key',
        isCartDriver: true
    }
};

/* ===== MEADOW CONFIG ===== */

export const MEADOW_POS = { x: 400, y: 300 };
export const MEADOW_GATE_POS = { x: 400, y: 200 };
export const MEADOW_WIDTH = 800;
export const MEADOW_HEIGHT = 600;

/* ===== VILLAGE CONFIG ===== */

export const VILLAGE_WIDTH = 700;
export const VILLAGE_HEIGHT = 2000;
export const CEMETERY_HEIGHT = 500;
export const VILLAGE_TOTAL_HEIGHT = VILLAGE_HEIGHT + CEMETERY_HEIGHT;

export const VILLAGE_CAMP_COUNT = 8;
export const VILLAGE_MOBS_PER_CAMP = 4;

export const VILLAGE_ENEMY_TYPES = {
    tank:     { key: 'village_brute',  name: 'Infected Brute',  nameRu: 'Заражённый Брута',   nameDe: 'Infizierter Brutalo', texKey: 'village_brute',  hp: 280, dmg: 22, exp: 70,  bw: 20, bh: 22, role: 'tank' },
    assassin: { key: 'village_stalker', name: 'Infected Stalker', nameRu: 'Заражённый Сталкер', nameDe: 'Infizierter Schleicher', texKey: 'village_stalker', hp: 120, dmg: 30, exp: 60,  bw: 14, bh: 14, role: 'assassin' },
    archer:   { key: 'village_spitter', name: 'Infected Spitter', nameRu: 'Заражённый Плевок',  nameDe: 'Infizierter Spucker', texKey: 'village_spitter', hp: 150, dmg: 20, exp: 55,  bw: 16, bh: 16, role: 'archer' },
    healer:   { key: 'village_curser', name: 'Infected Curser',  nameRu: 'Заражённый Проклятый', nameDe: 'Infizierter Flucher', texKey: 'village_curser', hp: 130, dmg: 14, exp: 65,  bw: 14, bh: 18, role: 'healer' }
};

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

export const VILLAGE_BOSS_TYPE = {
    key: 'purple_demon', name: 'Purple Demon', nameRu: 'Фиолетовый Демон', nameDe: 'Lila Dämon',
    texKey: 'purple_demon',
    bw: 40, bh: 44,
    speeds: { Normal: 60, Hard: 68, Expert: 78, Nightmare: 90, Hell: 110, Abyss: 130 },
    hp:  { Normal: 3000, Hard: 4500, Expert: 7500, Nightmare: 12000, Hell: 21000, Abyss: 36000 },
    dmg: { Normal: 35,   Hard: 48,   Expert: 75,   Nightmare: 120,  Hell: 200,  Abyss: 320 },
    exp: { Normal: 800,  Hard: 1200, Expert: 2000, Nightmare: 3200, Hell: 5600, Abyss: 9600 },
    meteorInterval: 5000,
    meteorRadius: 80,
    meteorDmgMul: 1.5,
    corpseInterval: 8000,
    corpseCount: 3,
    splitThreshold: 0.10
};

export const VILLAGE_CORPSE_MINION = {
    key: 'zombie', name: 'Risen Dead', nameRu: 'Восставший Мертвец', nameDe: 'Erweiter Toter',
    texKey: 'zombie_walk',
    bw: 14, bh: 16,
    hp: 60, dmg: 12, exp: 20
};

export const VILLAGE_MATERIALS = [
    { id: 'village_wood',     name: 'Corrupted Wood',  nameRu: 'Заражённое Древо',   nameDe: 'Verdorbenes Holz',   rarity: 'common',   texKey: 'item_stick', chance: 0.30, stats: { hp: 10 } },
    { id: 'village_bone',     name: 'Village Bone',    nameRu: 'Кость Жителя',       nameDe: 'Dorfknochen',        rarity: 'common',   texKey: 'item_stone', chance: 0.25, stats: { dmg: 4 } },
    { id: 'village_essence',  name: 'Hell Essence',    nameRu: 'Адская Эссенция',    nameDe: 'Höllen-Essenz',      rarity: 'uncommon', texKey: 'item_ruby',  chance: 0.12, stats: { dmg: 6, hp: 10 } },
    { id: 'village_soul',     name: 'Cursed Soul',     nameRu: 'Проклятая Душа',     nameDe: 'Verfluchte Seele',   rarity: 'rare',     texKey: 'item_ruby',  chance: 0.04, stats: { hp: 20, dmg: 10 } }
];

export const VILLAGE_CHEST_DROP_ITEMS = [
    { id: 'village_ring',  name: 'Village Signet',  nameRu: 'Печать Деревни',  nameDe: 'Dorfsignet',  rarity: 'uncommon', slot: 'accessory', texKey: 'acc_ring',  chance: 0.40, stats: { hpPercent: 3, damagePercent: 2 } },
    { id: 'village_amulet', name: 'Damned Amulet', nameRu: 'Проклятый Амулет', nameDe: 'Verfluchtes Amulett', rarity: 'rare', slot: 'accessory', texKey: 'acc_book', chance: 0.35, stats: { spellPercent: 5, critPercent: 3 } },
    { id: 'village_cloak',  name: 'Torn Cloak',    nameRu: 'Рваный Плащ',      nameDe: 'Zerrissener Umhang', rarity: 'uncommon', slot: 'armor', texKey: 'acc_book', chance: 0.25, stats: { hpPercent: 5, speedPercent: 2 } }
];

export const ACCOUNT_EQUIP_DB_VILLAGE = [
    { id: 'relic_village_sage',      name: 'Tome of Flames',     nameRu: 'Том Пламени',       nameDe: 'Flammenschaft',    rarity: 'legendary', slot: 'accessory', texKey: 'acc_book', chance: 0.50, stats: { spellPercent: 8, critPercent: 5 } },
    { id: 'relic_village_alchemist', name: 'Alchemist Belt',     nameRu: 'Пояс Алхимика',     nameDe: 'Alchemistengürtel', rarity: 'legendary', slot: 'accessory', texKey: 'acc_ring', chance: 0.50, stats: { hpPercent: 10, damagePercent: 6 } }
];

export const MAGMA_ARMOR = {
    id: 'magma_armor', name: 'Magma Armor', nameRu: 'Магма Броня', nameDe: 'Magma-Rüstung',
    rarity: 'legendary', slot: 'armor', texKey: 'acc_book',
    stats: { hp: 80, dmg: 25, speed: 15 },
    description: 'Legendary armor forged in hellfire'
};

/* ===== HELL ZONE ===== */
export const HELL_WIDTH = 900;
export const HELL_HEIGHT = 2500;
export const HELL_CAMP_COUNT = 10;
export const HELL_MOBS_PER_CAMP = 5;
export const HELL_LAVA_DAMAGE = 10;
export const HELL_LAVA_INTERVAL = 1000;
export const HELL_HEAT_DAMAGE = 5;

export const HELL_ENEMY_TYPES = {
    tank:     { key: 'hell_guard',   name: 'Hell Guard',   nameRu: 'Адская Стража',   nameDe: 'Höllengarde',   hp: 350, dmg: 25, exp: 80,  bw: 22, bh: 24, role: 'tank' },
    assassin: { key: 'hell_stalker', name: 'Hell Stalker', nameRu: 'Адский Сталкер',  nameDe: 'Höllenschleicher', hp: 150, dmg: 35, exp: 70,  bw: 14, bh: 14, role: 'assassin' },
    archer:   { key: 'hell_archer',  name: 'Hell Archer',  nameRu: 'Адский Лучник',   nameDe: 'Höllenbogenschütze', hp: 180, dmg: 22, exp: 65,  bw: 16, bh: 16, role: 'archer' },
    mage:     { key: 'hell_mage',    name: 'Hell Mage',    nameRu: 'Адский Маг',      nameDe: 'Höllenmagier',  hp: 140, dmg: 40, exp: 75,  bw: 14, bh: 18, role: 'mage' },
    healer:   { key: 'hell_priest',  name: 'Hell Priest',  nameRu: 'Адский Жрец',     nameDe: 'Höllenpriester', hp: 160, dmg: 15, exp: 70,  bw: 14, bh: 18, role: 'healer' }
};

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

export const HELL_BOSS_TYPE = {
    key: 'red_demon', name: 'Red Demon', nameRu: 'Красный Демон', nameDe: 'Roter Dämon',
    texKey: 'red_demon',
    bw: 44, bh: 48,
    speeds: { Normal: 65, Hard: 75, Expert: 85, Nightmare: 100, Hell: 120, Abyss: 140 },
    hp:  { Normal: 5000, Hard: 7500, Expert: 12500, Nightmare: 20000, Hell: 35000, Abyss: 60000 },
    dmg: { Normal: 45,   Hard: 62,   Expert: 95,    Nightmare: 150,  Hell: 250,  Abyss: 400 },
    exp: { Normal: 1500, Hard: 2250, Expert: 3750,  Nightmare: 6000, Hell: 10500, Abyss: 18000 },
    fireWaveInterval: 4000, fireWaveRadius: 100, fireWaveDmgMul: 1.8,
    meteorInterval: 6000, meteorRadius: 90, meteorDmgMul: 2.0,
    summonInterval: 10000, summonCount: 4
};

export const HELL_BOSS_MINION = {
    key: 'hell_imp', name: 'Hell Imp', nameRu: 'Адский Имп', nameDe: 'Höllendämon',
    texKey: 'hell_imp',
    bw: 12, bh: 14, hp: 80, dmg: 18, exp: 25
};

export const HEAT_CRYSTAL = {
    id: 'heat_crystal', name: 'Heat Crystal', nameRu: 'Жила Тепла', nameDe: 'Wärmekristall',
    rarity: 'legendary', slot: 'accessory', texKey: 'item_ruby',
    stats: { hp: 50, dmg: 20, speed: 10 },
    description: 'A crystal forged in the heart of hell. Radiates intense heat.'
};

export const HELL_CHEST_COUNT = 8;
export const HELL_CHEST_DROP_CHANCE = 0.45;

/* ===== SNOWY VILLAGE ===== */

export const SNOWY_VILLAGE_ENEMY_TYPES = {
    tank:     { key: 'ice_golem',    name: 'Ice Golem',     nameRu: 'Ледяной Голем',    nameDe: 'Eisgolem',     hp: 400, dmg: 28, exp: 90,  bw: 22, bh: 24, role: 'tank' },
    assassin: { key: 'frost_wraith', name: 'Frost Wraith',  nameRu: 'Морозный Призрак', nameDe: 'Frostgespenst', hp: 170, dmg: 38, exp: 80,  bw: 14, bh: 16, role: 'assassin' },
    archer:   { key: 'snow_wolf',    name: 'Snow Wolf',     nameRu: 'Снежный Волк',     nameDe: 'Schneewolf',   hp: 200, dmg: 24, exp: 75,  bw: 18, bh: 16, role: 'archer' },
    healer:   { key: 'ice_elemental', name: 'Ice Elemental', nameRu: 'Ледяной Элементаль', nameDe: 'Icelemental', hp: 160, dmg: 18, exp: 85,  bw: 14, bh: 18, role: 'healer' },
    mage:     { key: 'frost_mage',   name: 'Frost Mage',    nameRu: 'Морозный Маг',     nameDe: 'Frostmagier',  hp: 150, dmg: 45, exp: 90,  bw: 14, bh: 18, role: 'mage' }
};

export const SNOWY_VILLAGE_CAMP_POSITIONS = [
    { x: 350, y: 200 },  { x: 200, y: 450 },  { x: 500, y: 700 },
    { x: 350, y: 950 },  { x: 180, y: 1200 }, { x: 520, y: 1450 },
    { x: 350, y: 1700 }, { x: 350, y: 1900 }
];

export const SNOWY_VILLAGE_BOSS_TYPE = {
    key: 'ice_spirit', name: 'Ice Spirit', nameRu: 'Ледяной Дух', nameDe: 'Eisgeist',
    texKey: 'ice_spirit',
    bw: 40, bh: 44,
    speeds: { Normal: 55, Hard: 63, Expert: 73, Nightmare: 85, Hell: 105, Abyss: 125 },
    hp:  { Normal: 4000, Hard: 6000, Expert: 10000, Nightmare: 16000, Hell: 28000, Abyss: 48000 },
    dmg: { Normal: 40,   Hard: 55,   Expert: 85,    Nightmare: 135,  Hell: 225,  Abyss: 360 },
    exp: { Normal: 1200, Hard: 1800, Expert: 3000,  Nightmare: 4800, Hell: 8400, Abyss: 14400 },
    frostWaveInterval: 5000, frostWaveRadius: 90, frostWaveDmgMul: 1.6,
    blizzardInterval: 8000, blizzardRadius: 120, blizzardDmgMul: 1.2,
    summonInterval: 12000, summonCount: 3
};

export const SNOWY_BOSS_MINION = {
    key: 'ice_shard', name: 'Ice Shard', nameRu: 'Ледяной Осколок', nameDe: 'Eisscherbe',
    texKey: 'ice_shard',
    bw: 10, bh: 12, hp: 80, dmg: 15, exp: 20
};

export const WARMTH_CORE = {
    id: 'warmth_core', name: 'Warmth Core', nameRu: 'Жизнь Тепла', nameDe: 'Kern der Wärme',
    rarity: 'legendary', slot: 'accessory', texKey: 'warmth_core',
    stats: { hp: 60, dmg: 25, speed: 12, regenPercent: 3 },
    description: 'A warm soul extracted from the Ice Spirit. Place it in the campfire to restore the village.'
};

export const SNOWY_VILLAGE_CHEST_COUNT = 10;
export const SNOWY_VILLAGE_CHEST_DROP_CHANCE = 0.45;
