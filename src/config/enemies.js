// Forest enemies
export const ENEMY_TYPES = [
    { key: 'goblin', name: 'Goblin', nameRu: 'Гоблин', nameDe: 'Goblin', hp: 80, dmg: 10, exp: 15, bw: 18, bh: 20 },
    { key: 'slime',  name: 'Slime',  nameRu: 'Слайм',  nameDe: 'Schleim', hp: 60, dmg: 7, exp: 12, bw: 16, bh: 14 },
    { key: 'rat',    name: 'Rat',    nameRu: 'Крыса',   nameDe: 'Ratte',   hp: 40, dmg: 5, exp: 8,  bw: 16, bh: 12 }
];
export const ENEMY_COUNT = 3;
export const EQUIP_DROP_CHANCE = 0.05;
export const BOSS_DROP_CHANCE = 0.50;
export const ACCOUNT_EQUIP_DROP_CHANCE = 0.001;

// Forest boss
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

// Mine enemies
export const MINE_ENEMY_TYPES = [
    { key: 'skeleton_warrior', name: 'Skeleton Warrior', nameRu: 'Скелет-Воин', nameDe: 'Skelettkrieger', hp: 160, dmg: 18, exp: 40, bw: 18, bh: 24 },
    { key: 'skeleton_archer',  name: 'Skeleton Archer',  nameRu: 'Скелет-Лучник', nameDe: 'Skelettbogenschütze', hp: 100, dmg: 14, exp: 35, bw: 18, bh: 24 },
    { key: 'skeleton_shaman',  name: 'Skeleton Shaman',  nameRu: 'Скелет-Шаман', nameDe: 'Skelett-Schamane', hp: 120, dmg: 16, exp: 45, bw: 18, bh: 26 }
];
export const MINE_ENEMY_COUNT = 4;
export const MINE_EQUIP_DROP_CHANCE = 0.12;

// Mine boss
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

// Cave enemies
export const CAVE_ENEMY_TYPES = [
    { key: 'cave_spider', name: 'Cave Spider', nameRu: 'Пещерный Паук', nameDe: 'Höhlenspinne', hp: 240, dmg: 24, exp: 55, bw: 16, bh: 14, role: 'dps' },
    { key: 'cave_bat',    name: 'Cave Bat',    nameRu: 'Пещерная Летучая', nameDe: 'Höhlenfledermaus', hp: 160, dmg: 18, exp: 45, bw: 14, bh: 12, role: 'dps' },
    { key: 'stone_golem', name: 'Stone Golem',  nameRu: 'Каменный Голем',  nameDe: 'Steingolem',     hp: 400, dmg: 30, exp: 70, bw: 22, bh: 26, role: 'tank' },
    { key: 'earth_worm',  name: 'Earth Worm',   nameRu: 'Земляной Червь',  nameDe: 'Erdwurm',        hp: 350, dmg: 26, exp: 65, bw: 24, bh: 18, role: 'tank' }
];
export const CAVE_ENEMY_COUNT = 20;
export const CAVE_EQUIP_DROP_CHANCE = 0.15;
export const CAVE_SMALL_BAT = {
    key: 'cave_bat', name: 'Small Bat', nameRu: 'Летучая Мышь', nameDe: 'Kleine Fledermaus',
    texKey: 'small_bat',
    bw: 18, bh: 14,
    hp: 60, dmg: 8, exp: 15
};
export const CAVE_BOSS_EXP = { Normal: 400, Hard: 600, Expert: 1000, Nightmare: 1600, Hell: 2800, Abyss: 4800 };

// Cave boss
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

// Village enemies
export const VILLAGE_CAMP_COUNT = 8;
export const VILLAGE_MOBS_PER_CAMP = 4;
export const VILLAGE_ENEMY_TYPES = {
    tank:     { key: 'village_brute',  name: 'Infected Brute',  nameRu: 'Заражённый Брута',   nameDe: 'Infizierter Brutalo', texKey: 'village_brute',  hp: 500, dmg: 35, exp: 90,  bw: 20, bh: 22, role: 'tank' },
    assassin: { key: 'village_stalker', name: 'Infected Stalker', nameRu: 'Заражённый Сталкер', nameDe: 'Infizierter Schleicher', texKey: 'village_stalker', hp: 220, dmg: 45, exp: 80,  bw: 14, bh: 14, role: 'assassin' },
    archer:   { key: 'village_spitter', name: 'Infected Spitter', nameRu: 'Заражённый Плевок',  nameDe: 'Infizierter Spucker', texKey: 'village_spitter', hp: 280, dmg: 30, exp: 75,  bw: 16, bh: 16, role: 'archer' },
    healer:   { key: 'village_curser', name: 'Infected Curser',  nameRu: 'Заражённый Проклятый', nameDe: 'Infizierter Flucher', texKey: 'village_curser', hp: 240, dmg: 22, exp: 85,  bw: 14, bh: 18, role: 'healer' }
};

// Village boss
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

// Hell enemies
export const HELL_CAMP_COUNT = 10;
export const HELL_MOBS_PER_CAMP = 5;
export const HELL_ENEMY_TYPES = {
    tank:     { key: 'hell_guard',   name: 'Hell Guard',   nameRu: 'Адская Стража',   nameDe: 'Höllengarde',   hp: 650, dmg: 40, exp: 100, bw: 22, bh: 24, role: 'tank' },
    assassin: { key: 'hell_stalker', name: 'Hell Stalker', nameRu: 'Адский Сталкер',  nameDe: 'Höllenschleicher', hp: 280, dmg: 55, exp: 85,  bw: 14, bh: 14, role: 'assassin' },
    archer:   { key: 'hell_archer',  name: 'Hell Archer',  nameRu: 'Адский Лучник',   nameDe: 'Höllenbogenschütze', hp: 350, dmg: 35, exp: 80,  bw: 16, bh: 16, role: 'archer' },
    mage:     { key: 'hell_mage',    name: 'Hell Mage',    nameRu: 'Адский Маг',      nameDe: 'Höllenmagier',  hp: 260, dmg: 60, exp: 90,  bw: 14, bh: 18, role: 'mage' },
    healer:   { key: 'hell_priest',  name: 'Hell Priest',  nameRu: 'Адский Жрец',     nameDe: 'Höllenpriester', hp: 300, dmg: 25, exp: 85,  bw: 14, bh: 18, role: 'healer' }
};

// Hell boss
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

// Snowy Village enemies
export const SNOWY_VILLAGE_ENEMY_TYPES = {
    tank:     { key: 'ice_golem',    name: 'Ice Golem',     nameRu: 'Ледяной Голем',    nameDe: 'Eisgolem',     hp: 400, dmg: 28, exp: 90,  bw: 22, bh: 24, role: 'tank' },
    assassin: { key: 'frost_wraith', name: 'Frost Wraith',  nameRu: 'Морозный Призрак', nameDe: 'Frostgespenst', hp: 170, dmg: 38, exp: 80,  bw: 14, bh: 16, role: 'assassin' },
    archer:   { key: 'snow_wolf',    name: 'Snow Wolf',     nameRu: 'Снежный Волк',     nameDe: 'Schneewolf',   hp: 200, dmg: 24, exp: 75,  bw: 18, bh: 16, role: 'archer' },
    healer:   { key: 'ice_elemental', name: 'Ice Elemental', nameRu: 'Ледяной Элементаль', nameDe: 'Icelemental', hp: 160, dmg: 18, exp: 85,  bw: 14, bh: 18, role: 'healer' },
    mage:     { key: 'frost_mage',   name: 'Frost Mage',    nameRu: 'Морозный Маг',     nameDe: 'Frostmagier',  hp: 150, dmg: 45, exp: 90,  bw: 14, bh: 18, role: 'mage' }
};

// Snowy boss
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

// Castle enemies (Bandits)
export const BANDIT_TYPES = {
    melee:   { key: 'bandit_melee',   name: 'Bandit Thug',     nameRu: 'Бандит Головорез',    nameDe: 'Banditen-Schläger',    hp: 300, dmg: 20, exp: 75,  bw: 18, bh: 22, role: 'melee' },
    ranger:  { key: 'bandit_ranger',  name: 'Bandit Archer',   nameRu: 'Бандит Лучник',       nameDe: 'Banditen-Bogenschütze', hp: 180, dmg: 25, exp: 70,  bw: 16, bh: 20, role: 'ranger' },
    elite:   { key: 'bandit_elite',   name: 'Bandit Enforcer', nameRu: 'Бандит Каратель',      nameDe: 'Banditen-Vollstrecker', hp: 400, dmg: 30, exp: 100, bw: 22, bh: 26, role: 'elite' }
};
export const CASTLE_CHEST_COUNT = 6;
export const CASTLE_CHEST_DROP_CHANCE = 0.40;

// Castle boss
export const BANDIT_LEADER_BOSS = {
    key: 'bandit_leader', name: 'Bandit Leader', nameRu: 'Лидер Бандитов', nameDe: 'Banditenanführer',
    texKey: 'bandit_leader',
    bw: 50, bh: 60,
    speeds: { Normal: 55, Hard: 62, Expert: 70, Nightmare: 80, Hell: 95, Abyss: 110 },
    hp:  { Normal: 4000, Hard: 6000, Expert: 10000, Nightmare: 16000, Hell: 28000, Abyss: 48000 },
    dmg: { Normal: 40,   Hard: 55,   Expert: 85,    Nightmare: 135,  Hell: 225,  Abyss: 360 },
    exp: { Normal: 1200, Hard: 1800, Expert: 3000,  Nightmare: 4800, Hell: 8400, Abyss: 14400 },
    windupTime: 1500,
    strikeTime: 300,
    strikeDmgMul: 2.5,
    whirlwindInterval: 8000,
    whirlwindRadius: 100,
    whirlwindDmgMul: 1.8,
    summonInterval: 12000,
    summonCount: 3
};

// Depths enemies
export const DEPTHS_CAMP_COUNT = 10;
export const DEPTHS_MOBS_PER_CAMP = 5;
export const DEPTHS_ENEMY_TYPES = {
    tank:     { key: 'crypt_soldier',  name: 'Crypt Soldier',  nameRu: 'Криптовый Солдат',  nameDe: 'Kryptsoldat',     texKey: 'shadow_stalker',  hp: 700, dmg: 42, exp: 110, bw: 22, bh: 24, role: 'tank' },
    assassin: { key: 'shadow_assassin', name: 'Shadow Assassin', nameRu: 'Теневой Убийца',   nameDe: 'Schattenmeuchler', texKey: 'dark_reflection', hp: 340, dmg: 58, exp: 105, bw: 14, bh: 14, role: 'assassin' },
    archer:   { key: 'bone_archer',    name: 'Bone Archer',    nameRu: 'Костяной Лучник',   nameDe: 'Knochenbogenschütze', texKey: 'dark_counselor', hp: 370, dmg: 38, exp: 95,  bw: 16, bh: 16, role: 'archer' },
    mage:     { key: 'necro_mage',     name: 'Necro Mage',     nameRu: 'Некромаг',          nameDe: 'Nekromagier',     texKey: 'shadow_advisor',     hp: 280, dmg: 65, exp: 110, bw: 14, bh: 18, role: 'mage' },
    healer:   { key: 'dark_priest',    name: 'Dark Priest',    nameRu: 'Тёмный Жрец',       nameDe: 'Dunkelpriester',  texKey: 'shadow_mimic',    hp: 320, dmg: 30, exp: 98,  bw: 14, bh: 18, role: 'healer' }
};

// Depths boss
export const DEPTHS_BOSS_TYPE = {
    key: 'lich_king', name: 'Lich King', nameRu: 'Король Лич', nameDe: 'Lichkönig',
    texKey: 'lich_king',
    bw: 44, bh: 52,
    speeds: { Normal: 60, Hard: 68, Expert: 78, Nightmare: 95, Hell: 115, Abyss: 135 },
    hp:  { Normal: 6000, Hard: 9000, Expert: 15000, Nightmare: 24000, Hell: 42000, Abyss: 72000 },
    dmg: { Normal: 50,   Hard: 68,   Expert: 105,   Nightmare: 165,  Hell: 275,  Abyss: 440 },
    exp: { Normal: 1800, Hard: 2700, Expert: 4500,  Nightmare: 7200, Hell: 12600, Abyss: 21600 },
    deathWaveInterval: 4500, deathWaveRadius: 100, deathWaveDmgMul: 1.7,
    soulStormInterval: 7000, soulStormRadius: 120, soulStormDmgMul: 1.3,
    summonInterval: 9000, summonCount: 4,
    phaseThresholds: [0.66, 0.33]
};
export const DEPTHS_BOSS_MINION = {
    key: 'skeleton_minion', name: 'Skeleton Minion', nameRu: 'Скелет Миньон', nameDe: 'Skelett-Minion',
    texKey: 'skeleton',
    bw: 14, bh: 18, hp: 100, dmg: 20, exp: 30
};

// Cursed Lands enemies
export const CURSED_CAMP_COUNT = 15;
export const CURSED_MOBS_PER_CAMP = 5;
export const CURSED_ENEMY_TYPES = {
    tank:     { key: 'swamp_thug',       name: 'Swamp Thug',       nameRu: 'Болотный Головорез',  nameDe: 'Sumpf-Schläger',      texKey: 'swamp_sludge',       hp: 750, dmg: 45, exp: 115, bw: 22, bh: 24, role: 'tank' },
    assassin: { key: 'venom_spider',     name: 'Venom Spider',     nameRu: 'Ядовитый Паук',       nameDe: 'Giftspinne',          texKey: 'venom_spider',     hp: 320, dmg: 60, exp: 100, bw: 16, bh: 14, role: 'assassin' },
    archer:   { key: 'thorn_walker',     name: 'Thorn Walker',     nameRu: 'Терновый Странник',   nameDe: 'Dornenwanderer',      texKey: 'cursed_treant',     hp: 380, dmg: 40, exp: 92,  bw: 18, bh: 20, role: 'archer' },
    mage:     { key: 'necro_mage',       name: 'Necro Mage',       nameRu: 'Некромаг',            nameDe: 'Nekromagier',        texKey: 'corrupted_druid',     hp: 280, dmg: 65, exp: 105, bw: 14, bh: 18, role: 'mage' },
    healer:   { key: 'dark_priest',      name: 'Dark Priest',      nameRu: 'Тёмный Жрец',         nameDe: 'Dunkelpriester',     texKey: 'bog_witch',     hp: 320, dmg: 30, exp: 98,  bw: 14, bh: 18, role: 'healer' }
};

// Cursed Lands boss
export const CURSED_BOSS_TYPE = {
    key: 'ancient_evil', name: 'Ancient Evil', nameRu: 'Древнее Зло', nameDe: 'Uraltes Übel',
    texKey: 'ancient_evil',
    bw: 48, bh: 56,
    speeds: { Normal: 55, Hard: 63, Expert: 73, Nightmare: 90, Hell: 110, Abyss: 130 },
    hp:  { Normal: 7000, Hard: 10500, Expert: 17500, Nightmare: 28000, Hell: 49000, Abyss: 84000 },
    dmg: { Normal: 55,   Hard: 75,   Expert: 115,   Nightmare: 180,  Hell: 300,  Abyss: 480 },
    exp: { Normal: 2200, Hard: 3300, Expert: 5500,  Nightmare: 8800, Hell: 15400, Abyss: 26400 },
    poisonAuraInterval: 3000, poisonAuraRadius: 100, poisonAuraDmgMul: 0.8,
    deathWaveInterval: 5000, deathWaveRadius: 110, deathWaveDmgMul: 1.6,
    summonInterval: 8000, summonCount: 4,
    phaseThresholds: [0.66, 0.33]
};
export const CURSED_BOSS_MINION = {
    key: 'death_zombie', name: 'Death Zombie', nameRu: 'Мёртвый Зомби', nameDe: 'Totes Zombie',
    texKey: 'zombie',
    bw: 14, bh: 18, hp: 120, dmg: 22, exp: 35
};

// Shadow Dimension enemies
export const SHADOW_CAMP_COUNT = 12;
export const SHADOW_MOBS_PER_CAMP = 5;
export const SHADOW_ENEMY_TYPES = {
    tank:     { key: 'abyss_watcher',    name: 'Abyss Watcher',    nameRu: 'Страж Бездны',      nameDe: 'Abgrundwächter',     texKey: 'void_knight',    hp: 800, dmg: 48, exp: 120, bw: 22, bh: 24, role: 'tank' },
    assassin: { key: 'shadow_stalker',    name: 'Shadow Stalker',   nameRu: 'Тень-Следопыт',     nameDe: 'Schattenpirscher',   texKey: 'shadow_hound',    hp: 340, dmg: 58, exp: 105, bw: 14, bh: 14, role: 'assassin' },
    archer:   { key: 'rift_walker',       name: 'Rift Walker',      nameRu: 'Скиталец Разлома',  nameDe: 'Risswanderer',       texKey: 'rift_crawler',     hp: 400, dmg: 42, exp: 95,  bw: 16, bh: 18, role: 'archer' },
    mage:     { key: 'shadow_mage',       name: 'Shadow Mage',      nameRu: 'Теневой Маг',       nameDe: 'Schattenmagier',     texKey: 'phantom_knight',     hp: 280, dmg: 65, exp: 110, bw: 14, bh: 18, role: 'mage' },
    healer:   { key: 'reality_breaker',   name: 'Reality Breaker',  nameRu: 'Разрушитель Реальности', nameDe: 'Realitätsbrecher', texKey: 'shadow_mimic', hp: 350, dmg: 32, exp: 100, bw: 14, bh: 18, role: 'healer' }
};

// Shadow Dimension boss
export const SHADOW_BOSS_TYPE = {
    key: 'shadow_king', name: 'Shadow King', nameRu: 'Король Теней', nameDe: 'Schattenkönig',
    texKey: 'shadow_king',
    bw: 48, bh: 56,
    speeds: { Normal: 60, Hard: 68, Expert: 78, Nightmare: 95, Hell: 115, Abyss: 135 },
    hp:  { Normal: 8000, Hard: 12000, Expert: 20000, Nightmare: 32000, Hell: 56000, Abyss: 96000 },
    dmg: { Normal: 60,   Hard: 82,   Expert: 125,   Nightmare: 200,  Hell: 330,  Abyss: 530 },
    exp: { Normal: 2800, Hard: 4200, Expert: 7000,  Nightmare: 11200, Hell: 19600, Abyss: 33600 },
    teleportInterval: 4000, teleportDmgMul: 1.5,
    darkBoltInterval: 3000, darkBoltCount: 5, darkBoltDmgMul: 1.2,
    cloneInterval: 10000, cloneCount: 3,
    auraInterval: 2000, auraRadius: 120, auraDmgMul: 0.5,
    phaseThresholds: [0.66, 0.33]
};
export const SHADOW_BOSS_MINION = {
    key: 'shadow_spawn', name: 'Shadow Spawn', nameRu: 'Порождение Тени', nameDe: 'Schattenspinner',
    texKey: 'shade',
    bw: 14, bh: 16, hp: 100, dmg: 18, exp: 25
};

// Tower of the Fallen King enemies
export const TOWER_CAMP_COUNT = 14;
export const TOWER_MOBS_PER_CAMP = 3;
export const TOWER_ENEMY_TYPES = {
    tank:     { key: 'tower_knight',    name: 'Tower Knight',    nameRu: 'Башенный Рыцарь',    nameDe: 'Turmritter',       texKey: 'tower_knight',    hp: 500, dmg: 25, exp: 130, bw: 22, bh: 28, role: 'tank' },
    assassin: { key: 'tower_assassin',  name: 'Tower Assassin',  nameRu: 'Башенный Ассассин',  nameDe: 'Turmmeuchler',     texKey: 'tower_assassin',  hp: 280, dmg: 40, exp: 115, bw: 16, bh: 24, role: 'assassin' },
    archer:   { key: 'tower_archer',    name: 'Tower Archer',    nameRu: 'Башенный Лучник',    nameDe: 'Turmbogenschütze', texKey: 'tower_archer',    hp: 250, dmg: 32, exp: 105, bw: 18, bh: 26, role: 'archer' },
    mage:     { key: 'tower_mage',      name: 'Tower Mage',      nameRu: 'Башенный Маг',       nameDe: 'Turmmagier',       texKey: 'tower_mage',      hp: 220, dmg: 45, exp: 110, bw: 16, bh: 26, role: 'mage' },
    healer:   { key: 'tower_healer',    name: 'Tower Healer',    nameRu: 'Башенный Жрец',      nameDe: 'Turmheiler',       texKey: 'tower_healer',    hp: 200, dmg: 18, exp: 100, bw: 16, bh: 26, role: 'healer' }
};

// Tower of the Fallen King boss
export const TOWER_BOSS_TYPE = {
    key: 'fallen_king', name: 'Fallen King', nameRu: 'Павший Король', nameDe: 'Gefallener König',
    texKey: 'fallen_king',
    bw: 48, bh: 56,
    speeds: { Normal: 55, Hard: 63, Expert: 73, Nightmare: 90, Hell: 110, Abyss: 130 },
    hp:  { Normal: 10000, Hard: 15000, Expert: 25000, Nightmare: 40000, Hell: 70000, Abyss: 120000 },
    dmg: { Normal: 65,   Hard: 88,   Expert: 135,   Nightmare: 215,  Hell: 360,  Abyss: 580 },
    exp: { Normal: 3500, Hard: 5250, Expert: 8750,  Nightmare: 14000, Hell: 24500, Abyss: 42000 },
    shieldInterval: 12000, shieldDuration: 3000,
    bloodlustThreshold: 0.50, bloodlustDmgMul: 1.5,
    berserkThreshold: 0.25, berserkSpeedMul: 1.5, berserkDmgMul: 2.0,
    summonInterval: 8000, summonCount: 2,
    phaseThresholds: [0.66, 0.33]
};
export const TOWER_BOSS_MINION = {
    key: 'tower_guardian', name: 'Tower Guardian', nameRu: 'Башенный Страж', nameDe: 'Turmwächter',
    texKey: 'tower_guardian',
    bw: 20, bh: 28, hp: 100, dmg: 12, exp: 30
};

// Throne of Eternity boss
export const THRONE_BOSS_TYPE = {
    key: 'eternity_lord', name: 'Eternity Lord', nameRu: 'Повелитель Вечности', nameDe: 'Herr der Ewigkeit',
    texKey: 'eternity_lord',
    bw: 50, bh: 64,
    speeds: { Normal: 50, Hard: 58, Expert: 68, Nightmare: 85, Hell: 105, Abyss: 125 },
    hp:  { Normal: 12000, Hard: 18000, Expert: 30000, Nightmare: 48000, Hell: 84000, Abyss: 144000 },
    dmg: { Normal: 70,   Hard: 95,   Expert: 145,   Nightmare: 230,  Hell: 385,  Abyss: 620 },
    exp: { Normal: 5000, Hard: 7500, Expert: 12500, Nightmare: 20000, Hell: 35000, Abyss: 60000 },
    healThreshold: 0.50, healAmount: 0.50,
    auraInterval: 2000, auraRadius: 120, auraDmgMul: 0.6,
    summonPhase2: { tank: 3, mage: 3 },
    summonPhase4: { assassin: 3 },
    phaseThresholds: [0.75, 0.50, 0.25]
};
export const THRONE_BOSS_MINION_TANK = {
    key: 'eternity_spawn_1', name: 'Eternity Guardian', nameRu: 'Страж Вечности', nameDe: 'Ewigkeitswächter',
    texKey: 'eternity_spawn_1',
    bw: 20, bh: 28, hp: 120, dmg: 15, exp: 40
};
export const THRONE_BOSS_MINION_MAGE = {
    key: 'eternity_spawn_2', name: 'Eternity Caster', nameRu: 'Заклинатель Вечности', nameDe: 'Ewigkeitszauberer',
    texKey: 'eternity_spawn_2',
    bw: 16, bh: 24, hp: 80, dmg: 20, exp: 35
};
export const THRONE_BOSS_MINION_ASSASSIN = {
    key: 'eternity_spawn_3', name: 'Eternity Shadow', nameRu: 'Тень Вечности', nameDe: 'Ewigkeitsschatten',
    texKey: 'eternity_spawn_3',
    bw: 14, bh: 22, hp: 90, dmg: 25, exp: 38
};

// Bestiary
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
    },
    ice_shard: {
        name: 'Ice Shard', nameRu: 'Ледяной Осколок', nameDe: 'Eisscherbe', texKey: 'ice_shard', biome: 'snowy_village',
        weaknesses: ['fire'], resistances: ['ice'], abilities: ['Pierce', 'Shatter'],
        description: 'A crystallized fragment of the Ice Spirit\'s fury. It flies through the air with razor-sharp edges, freezing anything it touches.',
        lore: 'Ice Shards are born from the Ice Spirit\'s rage — fragments of pure cold given form and purpose. They exist only to destroy, shattering on impact and leaving behind a trail of frost.'
    },
    bandit_melee: {
        name: 'Bandit Thug', nameRu: 'Бандит Головорез', nameDe: 'Banditen-Schläger', texKey: 'bandit_melee', biome: 'castle',
        weaknesses: ['fire', 'magic'], resistances: [], abilities: ['Charge', 'Cleave', 'Intimidate'],
        description: 'A brute-force bandit that charges headfirst into combat. Simple-minded but dangerously strong.',
        lore: 'Bandit thugs are the foot soldiers of every raiding party. They live for the fight and die for the cause — usually by swinging first and thinking never.'
    },
    bandit_ranger: {
        name: 'Bandit Archer', nameRu: 'Бандит Лучник', nameDe: 'Banditen-Bogenschütze', texKey: 'bandit_ranger', biome: 'castle',
        weaknesses: ['melee', 'fire'], resistances: [], abilities: ['Aimed shot', 'Volley', 'Quick draw'],
        description: 'A ranged bandit that picks off intruders from a distance. Fast and deadly with a bow.',
        lore: 'Bandit archers were once village hunters who turned to crime. Their aim is still true — just pointed at different targets.'
    },
    bandit_elite: {
        name: 'Bandit Enforcer', nameRu: 'Бандит Каратель', nameDe: 'Banditen-Vollstrecker', texKey: 'bandit_elite', biome: 'castle',
        weaknesses: ['fire'], resistances: ['physical'], abilities: ['Shield bash', 'Whirlwind', 'Heavy armor'],
        description: 'An elite bandit with heavy armor and a shield. Tough to crack and hits like a truck.',
        lore: 'Enforcers are the bandit leader\'s personal guard. They were soldiers once — deserters who found a new army in the castle\'s dark halls.'
    },
    bandit_leader: {
        name: 'Bandit Leader', nameRu: 'Лидер Бандитов', nameDe: 'Banditenanführer', texKey: 'bandit_leader', biome: 'castle_boss',
        weaknesses: ['holy'], resistances: ['physical'], abilities: ['Machete windup', 'Fast strike', 'Whirlwind', 'Summon guards'],
        description: 'A towering bandit warlord wielding a massive machete. His slow windup hides a devastatingly fast strike.',
        lore: 'The Bandit Leader was once a general who lost his kingdom. He rebuilt it in the castle — a kingdom of fear, iron, and blood.'
    },
    crypt_soldier: {
        name: 'Crypt Soldier', nameRu: 'Криптовый Солдат', nameDe: 'Kryptsoldat', texKey: 'crypt_soldier', biome: 'depths',
        weaknesses: ['holy'], resistances: ['physical'], abilities: ['Shield bash', 'Undead resilience', 'Death grip'],
        description: 'An ancient guardian bound to eternal service in the catacombs. Its corroded armor still deflects blows meant for the living.',
        lore: 'These soldiers were once the king\'s elite guard, sworn to protect the royal tombs. The Lich King reanimated them — their oath now serves a darker master.'
    },
    shadow_assassin: {
        name: 'Shadow Assassin', nameRu: 'Теневой Убийца', nameDe: 'Schattenmeuchler', texKey: 'shadow_assassin', biome: 'depths',
        weaknesses: ['light'], resistances: ['dark'], abilities: ['Shadow step', 'Backstab', 'Vanish'],
        description: 'A phantom that melts into the darkness between tombstones. It strikes from behind and vanishes before retaliation.',
        lore: 'Shadow Assassins were court spies who bargained with the Lich King for eternal life. They got it — along with an eternity of servitude in the dark.'
    },
    bone_archer: {
        name: 'Bone Archer', nameRu: 'Костяной Лучник', nameDe: 'Knochenbogenschütze', texKey: 'bone_archer', biome: 'depths',
        weaknesses: ['melee'], resistances: [], abilities: ['Spectral arrows', 'Volley', 'Piercing shot'],
        description: 'A skeletal marksman that rains arrows of cursed bone from the shadows. Its bolts pierce armor and soul alike.',
        lore: 'The archers were the first line of defense in the old catacombs. They still fire blindly, haunted by muscle memory and an oath they cannot forget.'
    },
    necro_mage: {
        name: 'Necro Mage', nameRu: 'Некромаг', nameDe: 'Nekromagier', texKey: 'necro_mage', biome: 'depths',
        weaknesses: ['physical'], resistances: ['magic'], abilities: ['Necrotic bolt', 'Raise dead', 'Soul drain'],
        description: 'A twisted spellcaster that hurls bolts of necrotic energy. It raises fallen allies and drains the life force of the living.',
        lore: 'Necro Mages were scholars who sought to understand death itself. They succeeded — and became it. Their knowledge remains, buried in hollow skulls.'
    },
    dark_priest: {
        name: 'Dark Priest', nameRu: 'Тёмный Жрец', nameDe: 'Dunkelpriester', texKey: 'dark_priest', biome: 'depths',
        weaknesses: ['fire'], resistances: ['holy'], abilities: ['Dark heal', 'Curse', 'Soul siphon'],
        description: 'A corrupted healer that sustains undead with dark energy. It curses the living and siphons their vitality.',
        lore: 'Dark Priests were once devout healers who lost faith in the light. The Lich King offered them purpose — and a congregation of the dead to tend.'
    },
    lich_king: {
        name: 'Lich King', nameRu: 'Король Лич', nameDe: 'Lichkönig', texKey: 'lich_king', biome: 'depths_boss',
        weaknesses: ['holy'], resistances: ['dark', 'magic'], abilities: ['Death wave', 'Soul storm', 'Summon skeletons', 'Phylactery shield'],
        description: 'The undead sovereign of the depths, clad in cursed armor and wielding a staff of pure darkness. He commands legions of bones and drains the light from all who oppose him.',
        lore: 'The Lich King was once a mortal king who sought immortality through dark rituals. He achieved his goal — but at the cost of his soul. Now he rules a kingdom of dust and silence, surrounded by subjects who hate him.'
    },
    swamp_thug: {
        name: 'Swamp Thug', nameRu: 'Болотный Головорез', nameDe: 'Sumpf-Schläger', texKey: 'swamp_thug', biome: 'cursed',
        weaknesses: ['fire'], resistances: ['poison'], abilities: ['Charge', 'Mud shield', 'Crushing blow'],
        description: 'A hulking brute corrupted by the swamp\'s dark magic. Its thick hide shrugs off blades, and its charges shatter bone.',
        lore: 'Swamp Thugs were once lumberjacks who ventured too deep into the cursed marsh. The corruption twisted their bodies and minds, leaving only rage and hunger.'
    },
    venom_spider: {
        name: 'Venom Spider', nameRu: 'Ядовитый Паук', nameDe: 'Giftspinne', texKey: 'venom_spider', biome: 'cursed',
        weaknesses: ['fire'], resistances: ['poison'], abilities: ['Venom bite', 'Web trap', 'Acid spray'],
        description: 'A massive arachnid that lurks in the swamp\'s dark corners. Its venom paralyzes prey within seconds.',
        lore: 'Venom Spiders grew to unnatural sizes feeding on the swamp\'s corrupted minerals. Their silk is stronger than rope and dissolves metal over time.'
    },
    thorn_walker: {
        name: 'Thorn Walker', nameRu: 'Терновый Странник', nameDe: 'Dornenwanderer', texKey: 'thorn_walker', biome: 'cursed',
        weaknesses: ['fire'], resistances: ['physical'], abilities: ['Thorn volley', 'Root grasp', 'Poison cloud'],
        description: 'A twisted plant creature that fires thorns of corrupted wood. Its roots grasp and hold intruders in place.',
        lore: 'Thorn Walkers were once ancient trees, corrupted by the swamp\'s dark heart. They now serve as living turrets, defending the cursed lands.'
    },
    death_mage: {
        name: 'Death Mage', nameRu: 'Маг Смерти', nameDe: 'Todesmagier', texKey: 'death_mage', biome: 'cursed',
        weaknesses: ['physical'], resistances: ['magic'], abilities: ['Death bolt', 'Raise dead', 'Soul drain'],
        description: 'A twisted spellcaster that hurls bolts of necrotic energy. It raises fallen allies and drains the life force of the living.',
        lore: 'Death Mages were scholars who sought to understand death itself. They succeeded — and became it. Their knowledge remains, buried in hollow skulls.'
    },
    corrupted_priest: {
        name: 'Corrupted Priest', nameRu: 'Проклятый Жрец', nameDe: 'Verfluchter Priester', texKey: 'corrupted_priest', biome: 'cursed',
        weaknesses: ['fire'], resistances: ['holy'], abilities: ['Dark heal', 'Curse', 'Soul siphon'],
        description: 'A corrupted healer that sustains the undead with dark energy. It curses the living and siphons their vitality.',
        lore: 'Corrupted Priests were once devout healers who lost faith in the light. The ancient evil offered them purpose — and a congregation of the dead to tend.'
    },
    ancient_evil: {
        name: 'Ancient Evil', nameRu: 'Древнее Зло', nameDe: 'Uraltes Übel', texKey: 'ancient_evil', biome: 'cursed_boss',
        weaknesses: ['holy'], resistances: ['dark', 'poison'], abilities: ['Poison aura', 'Death wave', 'Summon zombies', 'Dark transformation'],
        description: 'An ancient entity of pure corruption that has haunted the cursed lands for millennia. It commands the dead and poisons the living.',
        lore: 'The Ancient Evil predates all recorded history. It was sealed away by the first heroes, but the seal has weakened. Now it reclaims what was always its own.'
    },
    shadow_stalker: {
        name: 'Shadow Stalker', nameRu: 'Тень-Следопыт', nameDe: 'Schattenpirscher', texKey: 'shadow_stalker', biome: 'shadow',
        weaknesses: ['light'], resistances: ['dark'], abilities: ['Shadow step', 'Backstab', 'Phase shift'],
        description: 'A living shadow that hunts between dimensions. It strikes from the void and vanishes before retaliation.',
        lore: 'Shadow Stalkers were once explorers who ventured too deep into the shadow realm. The darkness consumed them, leaving only hunger and purpose.'
    },
    rift_walker: {
        name: 'Rift Walker', nameRu: 'Скиталец Разлома', nameDe: 'Risswanderer', texKey: 'rift_walker', biome: 'shadow',
        weaknesses: ['holy'], resistances: ['void'], abilities: ['Rift shot', 'Dimensional dodge', 'Portal trap'],
        description: 'A being that walks between realities. It fires bolts of void energy and creates traps between dimensions.',
        lore: 'Rift Walkers are beings native to the space between worlds. They feed on the energy of dimensional tears.'
    },
    shadow_mage: {
        name: 'Shadow Mage', nameRu: 'Теневой Маг', nameDe: 'Schattenmagier', texKey: 'shadow_mage', biome: 'shadow',
        weaknesses: ['physical'], resistances: ['magic', 'dark'], abilities: ['Shadow bolt', 'Mirror image', 'Void drain'],
        description: 'A spellcaster who commands the power of shadows. It creates mirror images and drains life force.',
        lore: 'Shadow Mages were once archmages who sought forbidden knowledge in the shadow realm. The darkness twisted their minds and powers.'
    },
    reality_breaker: {
        name: 'Reality Breaker', nameRu: 'Разрушитель Реальности', nameDe: 'Realitätsbrecher', texKey: 'reality_breaker', biome: 'shadow',
        weaknesses: ['fire'], resistances: ['void', 'dark'], abilities: ['Reality warp', 'Heal shadows', 'Dimensional tear'],
        description: 'A twisted entity that distorts reality around it. It heals allies and creates tears in the fabric of space.',
        lore: 'Reality Breakers are the shadow realm\'s immune system — they destroy anything that doesn\'t belong, including the living.'
    },
    shadow_king: {
        name: 'Shadow King', nameRu: 'Король Теней', nameDe: 'Schattenkönig', texKey: 'shadow_king', biome: 'shadow_boss',
        weaknesses: ['holy'], resistances: ['dark', 'void'], abilities: ['Teleport', 'Dark bolt', 'Clone', 'Shadow aura'],
        description: 'The sovereign of the shadow dimension. It commands all shadows and can teleport through dimensions at will.',
        lore: 'The Shadow King was once a mortal ruler who discovered the shadow realm. He conquered it — but the realm conquered him in return.'
    },
    tower_knight: {
        name: 'Tower Knight', nameRu: 'Башенный Рыцарь', nameDe: 'Turmritter', texKey: 'tower_knight', biome: 'tower',
        weaknesses: ['magic'], resistances: ['physical'], abilities: ['Shield bash', 'Charge', 'Heavy armor'],
        description: 'An armored warrior bound to eternal service in the tower. Its rusted armor still deflects blows.',
        lore: 'Tower Knights were the king\'s elite guard, sworn to protect the tower. The curse bound them to their posts forever.'
    },
    tower_mage: {
        name: 'Tower Mage', nameRu: 'Башенный Маг', nameDe: 'Turmmagier', texKey: 'tower_mage', biome: 'tower',
        weaknesses: ['physical'], resistances: ['magic'], abilities: ['Arcane bolt', 'Barrier', 'Mana drain'],
        description: 'A corrupted spellcaster that hurls bolts of arcane energy. It creates barriers and drains mana.',
        lore: 'Tower Mages were court wizards who sought forbidden knowledge. The tower\'s curse twisted their minds and powers.'
    },
    tower_archer: {
        name: 'Tower Archer', nameRu: 'Башенный Лучник', nameDe: 'Turmbogenschütze', texKey: 'tower_archer', biome: 'tower',
        weaknesses: ['melee'], resistances: [], abilities: ['Aimed shot', 'Volley', 'Piercing arrow'],
        description: 'A skeletal marksman that rains arrows from the tower walls. Its bolts pierce armor and soul alike.',
        lore: 'Tower Archers were royal guards who swore to protect the tower. Even in death, they refuse to abandon their posts.'
    },
    tower_healer: {
        name: 'Tower Healer', nameRu: 'Башенный Жрец', nameDe: 'Turmheiler', texKey: 'tower_healer', biome: 'tower',
        weaknesses: ['fire'], resistances: ['holy'], abilities: ['Holy heal', 'Purify', 'Divine shield'],
        description: 'A corrupted healer that sustains the tower\'s defenders. It heals allies and shields them from harm.',
        lore: 'Tower Healers were once devout priests who lost faith. The tower offered them purpose — and a congregation of the dead.'
    },
    tower_assassin: {
        name: 'Tower Assassin', nameRu: 'Башенный Ассассин', nameDe: 'Turmmeuchler', texKey: 'tower_assassin', biome: 'tower',
        weaknesses: ['light'], resistances: ['dark'], abilities: ['Backstab', 'Shadow step', 'Poison blade'],
        description: 'A swift predator that strikes from the shadows. Its blade is coated in deadly poison.',
        lore: 'Tower Assassins were court spies who bargained with the tower for eternal life. They got it — along with eternal servitude.'
    },
    fallen_king: {
        name: 'Fallen King', nameRu: 'Павший Король', nameDe: 'Gefallener König', texKey: 'fallen_king', biome: 'tower_boss',
        weaknesses: ['holy'], resistances: ['dark', 'physical'], abilities: ['Royal command', 'Shield', 'Berserk', 'Summon guardians'],
        description: 'The undead sovereign of the tower, clad in cursed armor. He commands his eternal guard and seeks to reclaim his kingdom.',
        lore: 'The Fallen King ruled wisely for 200 years. Then the curse came. Now he rules a kingdom of dust and silence, waiting for someone worthy to free him.'
    }
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
        lore: 'The Ice Spirit was once a winter deity, worshipped for snowfall and frost. When the village burned its shrine, the spirit retaliated — freezing everything it had once blessed. Its rage was absolute. Its regret, eternal.' },
    bandit_melee:       { name: 'Bandit Thug', nameRu: 'Бандит Головорез', nameDe: 'Banditen-Schläger', texKey: 'bandit_melee', biome: 'castle',
        description: 'A brute-force thug, simple-minded but devastatingly strong. Lives for the fight.',
        weakness: 'Fire burns through their crude armor. Magic bypasses their guard entirely.',
        essence: 'Brute force energy. Thug souls enhance raw physical power but dull the mind.',
        purification: 'Purifying a thug soul releases a burst of suppressed fear. Beneath the rage, they were all cowards.',
        lore: 'Bandit thugs are the lowest rung of the castle\'s hierarchy. They were deserters, outcasts, and criminals who found purpose in the Bandit Leader\'s iron fist.' },
    bandit_ranger:      { name: 'Bandit Archer', nameRu: 'Бандит Лучник', nameDe: 'Banditen-Bogenschütze', texKey: 'bandit_ranger', biome: 'castle',
        description: 'A sharp-eyed marksman who picks off intruders from the shadows.',
        weakness: 'Melee attacks disrupt their aim. Fire burns their bowstrings.',
        essence: 'Precision energy. Archer souls enhance accuracy and reaction time.',
        purification: 'Purifying a bandit archer soul releases a volley of spectral arrows. They arc upward and dissolve into light.',
        lore: 'Bandit archers were once village hunters who turned to crime. Their aim remained true — just pointed at different targets.' },
    bandit_elite:       { name: 'Bandit Enforcer', nameRu: 'Бандит Каратель', nameDe: 'Banditen-Vollstrecker', texKey: 'bandit_elite', biome: 'castle',
        description: 'An armored enforcer with a shield. Tough to crack and hits like a falling wall.',
        weakness: 'Fire melts their heavy armor. Flanking bypasses their shield.',
        essence: 'Guardian energy. Enforcer souls enhance physical defense and damage absorption.',
        purification: 'Purifying an enforcer soul releases the ghost of military discipline. They were soldiers once — before they chose a darker path.',
        lore: 'Enforcers are the Bandit Leader\'s personal guard. Deserters who found a new army in the castle\'s dark halls. They follow orders without question.' },
    bandit_leader:      { name: 'Bandit Leader', nameRu: 'Лидер Бандитов', nameDe: 'Banditenanführer', texKey: 'bandit_leader', biome: 'castle_boss',
        description: 'A towering warlord wielding a massive machete. His slow windup hides a devastatingly fast strike.',
        weakness: 'Holy power disrupts his command. His overconfidence is his greatest flaw.',
        essence: 'Command energy. The Leader\'s soul radiates authority — lesser bandits obey involuntarily.',
        purification: 'Purifying the Bandit Leader releases a cascade of stolen lives. Dozens of voices cry out, then fall silent. The leader himself smiles as he burns — he finally respects his opponent.',
        lore: 'The Bandit Leader was once a general who lost his kingdom in a losing war. He rebuilt it in the castle — a kingdom of fear, iron, and blood. He rules not through loyalty, but through terror.' },
    crypt_soldier:      { name: 'Crypt Soldier', nameRu: 'Криптовый Солдат', nameDe: 'Kryptsoldat', texKey: 'crypt_soldier', biome: 'depths',
        description: 'A bound soul, fused to corroded armor by ancient oath. It knows only duty and defiance.',
        weakness: 'Holy power shatters the binding. The soul escapes, confused and grateful.',
        essence: 'Warden energy. Crypt Soldier souls enhance physical defense and damage absorption.',
        purification: 'Purifying a crypt soldier soul releases the binding oath. The armor crumbles, revealing a faint, fading light.',
        lore: 'These soldiers swore to protect the royal tombs for eternity. The Lich King gave them eternity, but forgot to give them peace.' },
    shadow_assassin:    { name: 'Shadow Assassin', nameRu: 'Теневой Убийца', nameDe: 'Schattenmeuchler', texKey: 'shadow_assassin', biome: 'depths',
        description: 'A restless soul that craves the kill. It moves between shadows like a knife through silk.',
        weakness: 'Light exposes the assassin. In illumination, it cannot hide — and panics.',
        essence: 'Shadow energy. Assassin souls enhance evasion and critical strike capability.',
        purification: 'Purifying a shadow assassin soul releases a burst of tactical knowledge. Centuries of assassination, compressed into a moment.',
        lore: 'Shadow Assassins were court spies who sold their souls for eternal life. The Lich King collected — and kept them working for eternity.' },
    bone_archer:        { name: 'Bone Archer', nameRu: 'Костяной Лучник', nameDe: 'Knochenbogenschütze', texKey: 'bone_archer', biome: 'depths',
        description: 'A focused soul, honed by endless combat. It fires with lethal precision from the back lines.',
        weakness: 'Melee attacks disrupt their aim. Their soul falters when the distance closes.',
        essence: 'Precision energy. Archer souls enhance ranged damage and accuracy.',
        purification: 'Purifying a bone archer soul releases a volley of spectral arrows. They arc upward and dissolve into light.',
        lore: 'Bone Archers were the first line of defense in the catacombs. They still fire blindly, haunted by muscle memory.' },
    necro_mage:         { name: 'Necro Mage', nameRu: 'Некромаг', nameDe: 'Nekromagier', texKey: 'necro_mage', biome: 'depths',
        description: 'A consumed soul, hollowed out and filled with necrotic energy. It burns from the inside out.',
        weakness: 'Physical attacks disrupt their casting. They are fragile without their magic.',
        essence: 'Arcane death energy. Necro Mage souls amplify spell power but destabilize the mind.',
        purification: 'Purifying a necro mage soul releases a wave of forbidden knowledge. Most of it is useless. Some of it is terrifying.',
        lore: 'Necro Mages sought to understand death itself. They succeeded — and became it. Their knowledge remains, buried in hollow skulls.' },
    dark_priest:        { name: 'Dark Priest', nameRu: 'Тёмный Жрец', nameDe: 'Dunkelpriester', texKey: 'dark_priest', biome: 'depths',
        description: 'A hollowed soul, inverted from healer to harvester. It sustains undead and drains the living.',
        weakness: 'Fire purges the corruption. Without it, the soul is empty — neither good nor evil.',
        essence: 'Drain energy. Dark Priest souls enhance life-stealing and debuffing capabilities.',
        purification: 'Purifying a dark priest soul releases a wave of healing energy — the inverse of its curse. It remembers what it was meant to do.',
        lore: 'Dark Priests were healers who lost faith. The Lich King offered them a new congregation — and a purpose twisted beyond recognition.' },
    lich_king:          { name: 'Lich King', nameRu: 'Король Лич', nameDe: 'Lichkönig', texKey: 'lich_king', biome: 'depths_boss',
        description: 'A king\'s soul, twisted by ambition and preserved by dark magic. It commands and corrupts all it touches.',
        weakness: 'Holy power disrupts his control. Without his phylactery, he is merely a bitter old king.',
        essence: 'Dominion energy. The Lich King\'s soul radiates authority — those nearby feel compelled to obey.',
        purification: 'Purifying the Lich King releases the souls of all he enslaved. A cascade of light fills the catacombs.',
        lore: 'He wanted to rule forever. He got his wish. Now he rules nothing but dust and silence, surrounded by subjects who hate him.' },
    swamp_thug:        { name: 'Swamp Thug', nameRu: 'Болотный Головорез', nameDe: 'Sumpf-Schläger', texKey: 'swamp_thug', biome: 'cursed',
        description: 'A massive soul, crushed under its own corruption. It knows only strength and obedience.',
        weakness: 'Fire burns away the corruption that binds it. The soul struggles free, confused and afraid.',
        essence: 'Raw physical power. Thug souls enhance strength and endurance but cloud the mind.',
        purification: 'Purifying a swamp thug soul releases decades of suppressed rage. Then silence — a simple soul, finally at rest.',
        lore: 'Swamp Thugs were lumberjacks who ventured too deep. The corruption twisted their bodies and minds, leaving only rage and hunger.' },
    venom_spider:      { name: 'Venom Spider', nameRu: 'Ядовитый Паук', nameDe: 'Giftspinne', texKey: 'venom_spider', biome: 'cursed',
        description: 'A cunning predator soul, sharp and patient. It weaves death in darkness.',
        weakness: 'Fire burns away the web-soul. Without it, the spider is blind and confused.',
        essence: 'Web energy. Spider souls enhance trap-setting and ambush capabilities.',
        purification: 'Purifying a venom spider soul releases a cascade of sticky web. It hardens into silk.',
        lore: 'The venom spiders grew to unnatural sizes feeding on the swamp\'s corrupted minerals. Their silk is stronger than rope.' },
    thorn_walker:      { name: 'Thorn Walker', nameRu: 'Терновый Странник', nameDe: 'Dornenwanderer', texKey: 'thorn_walker', biome: 'cursed',
        description: 'A rooted soul, bound to the earth by ancient corruption. It fires thorns and grasps with roots.',
        weakness: 'Fire severs the connection to the earth. Without roots, the walker crumbles.',
        essence: 'Nature energy twisted. Thorn Walker souls enhance ranged attacks and area denial.',
        purification: 'Purifying a thorn walker soul releases a burst of natural growth. The corruption recedes, and for a moment, flowers bloom.',
        lore: 'Thorn Walkers were ancient trees, corrupted by the swamp\'s dark heart. They now serve as living turrets.' },
    death_mage:        { name: 'Death Mage', nameRu: 'Маг Смерти', nameDe: 'Todesmagier', texKey: 'death_mage', biome: 'cursed',
        description: 'A consumed soul, hollowed out and filled with death energy. It burns from the inside out.',
        weakness: 'Physical attacks disrupt their casting. They are fragile without their magic.',
        essence: 'Arcane death energy. Death Mage souls amplify spell power but destabilize the mind.',
        purification: 'Purifying a death mage soul releases a wave of forbidden knowledge. Most of it is useless. Some of it is terrifying.',
        lore: 'Death Mages sought to understand death itself. They succeeded — and became it.' },
    corrupted_priest:   { name: 'Corrupted Priest', nameRu: 'Проклятый Жрец', nameDe: 'Verfluchter Priester', texKey: 'corrupted_priest', biome: 'cursed',
        description: 'A hollowed soul, inverted from healer to harvester. It sustains undead and drains the living.',
        weakness: 'Fire purges the corruption. Without it, the soul is empty — neither good nor evil.',
        essence: 'Drain energy. Corrupted Priest souls enhance life-stealing and debuffing capabilities.',
        purification: 'Purifying a corrupted priest soul releases a wave of healing energy — the inverse of its curse. It remembers what it was meant to do.',
        lore: 'Corrupted Priests were healers who lost faith. The ancient evil offered them purpose — and a congregation of the dead to tend.' },
    ancient_evil:       { name: 'Ancient Evil', nameRu: 'Древнее Зло', nameDe: 'Uraltes Übel', texKey: 'ancient_evil', biome: 'cursed_boss',
        description: 'An ancient soul of pure corruption, older than memory. It commands the dead and poisons the living.',
        weakness: 'Holy power disrupts its control. Without its heart, it is merely a shadow of its former self.',
        essence: 'Primordial corruption energy. The Ancient Evil\'s soul radiates decay — everything near it withers.',
        purification: 'Purifying the Ancient Evil releases a wave of cleansed energy across the cursed lands. The corruption recedes. The swamp breathes again.',
        lore: 'The Ancient Evil predates all recorded history. It was sealed away by the first heroes, but the seal has weakened. Now it reclaims what was always its own.' },
    shadow_stalker:    { name: 'Shadow Stalker', nameRu: 'Тень-Следопыт', nameDe: 'Schattenpirscher', texKey: 'shadow_stalker', biome: 'shadow',
        description: 'A living shadow soul, bound to the void between dimensions. It hunts relentlessly.',
        weakness: 'Light exposes the stalker. In illumination, it cannot exist — and dissipates.',
        essence: 'Shadow energy. Stalker souls enhance evasion and critical strike capability.',
        purification: 'Purifying a shadow stalker soul releases a burst of dimensional knowledge. The shadow dissipates into light.',
        lore: 'Shadow Stalkers were explorers who ventured too deep. The shadow realm consumed them, leaving only hunger.' },
    rift_walker:       { name: 'Rift Walker', nameRu: 'Скиталец Разлома', nameDe: 'Risswanderer', texKey: 'rift_walker', biome: 'shadow',
        description: 'A dimensional soul, existing between realities. It walks the spaces others cannot see.',
        weakness: 'Holy power seals the rift. Without it, the walker is trapped between worlds.',
        essence: 'Dimensional energy. Rift Walker souls enhance spatial awareness and teleportation.',
        purification: 'Purifying a rift walker soul seals the dimensional tear. The walker finally finds peace.',
        lore: 'Rift Walkers are native to the space between worlds. They feed on dimensional tears.' },
    shadow_mage:       { name: 'Shadow Mage', nameRu: 'Теневой Маг', nameDe: 'Schattenmagier', texKey: 'shadow_mage', biome: 'shadow',
        description: 'A consumed soul, hollowed out and filled with shadow magic. It commands darkness itself.',
        weakness: 'Physical attacks disrupt their casting. They are fragile without their magic.',
        essence: 'Arcane shadow energy. Shadow Mage souls amplify spell power but destabilize the mind.',
        purification: 'Purifying a shadow mage soul releases a wave of forbidden knowledge. Most of it is terrifying.',
        lore: 'Shadow Mages were archmages who sought forbidden knowledge. The shadow realm claimed their souls.' },
    reality_breaker:   { name: 'Reality Breaker', nameRu: 'Разрушитель Реальности', nameDe: 'Realitätsbrecher', texKey: 'reality_breaker', biome: 'shadow',
        description: 'A twisted soul that distorts reality. It exists in a state between being and unbeing.',
        weakness: 'Fire purges the distortion. Without it, the breaker is merely a confused fragment.',
        essence: 'Warp energy. Reality Breaker souls enhance area control and debuffing.',
        purification: 'Purifying a reality breaker soul restores a fragment of normalcy. The distortion recedes.',
        lore: 'Reality Breakers are the shadow realm\'s immune system — they destroy anything that doesn\'t belong.' },
    shadow_king:       { name: 'Shadow King', nameRu: 'Король Теней', nameDe: 'Schattenkönig', texKey: 'shadow_king', biome: 'shadow_boss',
        description: 'A sovereign soul, commanding all shadows. It teleports through dimensions at will.',
        weakness: 'Holy power disrupts its command. Without the shadow crown, it is merely a bitter king.',
        essence: 'Dominion energy. The Shadow King\'s soul radiates authority — shadows obey involuntarily.',
        purification: 'Purifying the Shadow King releases all the souls he consumed. A cascade of light fills the shadow dimension.',
        lore: 'The Shadow King was once a mortal ruler who discovered the shadow realm. He conquered it — but it conquered him.' },
    tower_knight:      { name: 'Tower Knight', nameRu: 'Башенный Рыцарь', nameDe: 'Turmritter', texKey: 'tower_knight', biome: 'tower',
        description: 'A bound soul, fused to rusted armor by the king\'s curse. It knows only duty and defiance.',
        weakness: 'Magic shatters the binding. The soul escapes, confused and grateful.',
        essence: 'Warden energy. Tower Knight souls enhance physical defense and damage absorption.',
        purification: 'Purifying a tower knight soul releases the binding oath. The armor crumbles, revealing a faint, fading light.',
        lore: 'Tower Knights were the king\'s elite guard, sworn to protect the tower. The curse gave them eternity, but forgot to give them peace.' },
    tower_mage:        { name: 'Tower Mage', nameRu: 'Башенный Маг', nameDe: 'Turmmagier', texKey: 'tower_mage', biome: 'tower',
        description: 'A consumed soul, hollowed out and filled with arcane energy. It burns from the inside out.',
        weakness: 'Physical attacks disrupt their casting. They are fragile without their magic.',
        essence: 'Arcane energy. Tower Mage souls amplify spell power but destabilize the mind.',
        purification: 'Purifying a tower mage soul releases a wave of forbidden knowledge. Most of it is useless. Some of it is terrifying.',
        lore: 'Tower Mages sought forbidden knowledge in the tower. They found it — and the curse claimed their souls.' },
    tower_archer:      { name: 'Tower Archer', nameRu: 'Башенный Лучник', nameDe: 'Turmbogenschütze', texKey: 'tower_archer', biome: 'tower',
        description: 'A focused soul, honed by endless combat. It fires with lethal precision from the walls.',
        weakness: 'Melee attacks disrupt their aim. Their soul falters when the distance closes.',
        essence: 'Precision energy. Tower Archer souls enhance ranged damage and accuracy.',
        purification: 'Purifying a tower archer soul releases a volley of spectral arrows. They arc upward and dissolve into light.',
        lore: 'Tower Archers were royal guards who swore to protect the tower. Even in death, they refuse to abandon their posts.' },
    tower_healer:      { name: 'Tower Healer', nameRu: 'Башенный Жрец', nameDe: 'Turmheiler', texKey: 'tower_healer', biome: 'tower',
        description: 'A hollowed soul, inverted from healer to harvester. It sustains the tower\'s defenders.',
        weakness: 'Fire purges the corruption. Without it, the soul is empty — neither good nor evil.',
        essence: 'Drain energy. Tower Healer souls enhance life-stealing and debuffing capabilities.',
        purification: 'Purifying a tower healer soul releases a wave of healing energy — the inverse of its curse. It remembers what it was meant to do.',
        lore: 'Tower Healers were once devout priests who lost faith. The tower offered them purpose — and a congregation of the dead.' },
    tower_assassin:    { name: 'Tower Assassin', nameRu: 'Башенный Ассассин', nameDe: 'Turmmeuchler', texKey: 'tower_assassin', biome: 'tower',
        description: 'A restless soul that craves the kill. It moves between shadows like a knife through silk.',
        weakness: 'Light exposes the assassin. In illumination, it cannot hide — and panics.',
        essence: 'Shadow energy. Assassin souls enhance evasion and critical strike capability.',
        purification: 'Purifying a tower assassin soul releases a burst of tactical knowledge. Centuries of assassination, compressed into a moment.',
        lore: 'Tower Assassins were court spies who bargained with the tower for eternal life. They got it — and eternal servitude.' },
    fallen_king:       { name: 'Fallen King', nameRu: 'Павший Король', nameDe: 'Gefallener König', texKey: 'fallen_king', biome: 'tower_boss',
        description: 'A king\'s soul, twisted by curse and preserved by dark magic. He commands his eternal guard.',
        weakness: 'Holy power disrupts his control. Without his crown, he is merely a bitter old king.',
        essence: 'Dominion energy. The Fallen King\'s soul radiates authority — those nearby feel compelled to obey.',
        purification: 'Purifying the Fallen King releases the souls of all he enslaved. A cascade of light fills the tower.',
        lore: 'The Fallen King ruled wisely for 200 years. Then the curse came. Now he rules a kingdom of dust, waiting for someone worthy to free him.' }
};
