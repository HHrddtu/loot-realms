// Forest enemies
export const ENEMY_TYPES = [
    { key: 'goblin', name: 'Goblin', nameRu: 'Гоблин', nameDe: 'Goblin', hp: 40, dmg: 5, exp: 10, bw: 18, bh: 20 },
    { key: 'slime',  name: 'Slime',  nameRu: 'Слайм',  nameDe: 'Schleim', hp: 30, dmg: 3, exp: 8,  bw: 16, bh: 14 },
    { key: 'rat',    name: 'Rat',    nameRu: 'Крыса',   nameDe: 'Ratte',   hp: 20, dmg: 2, exp: 5,  bw: 16, bh: 12 }
];
export const ENEMY_COUNT = 3;
export const EQUIP_DROP_CHANCE = 0.05;
export const BOSS_DROP_CHANCE = 0.93;
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
    { key: 'skeleton_warrior', name: 'Skeleton Warrior', nameRu: 'Скелет-Воин', nameDe: 'Skelettkrieger', hp: 80, dmg: 12, exp: 30, bw: 18, bh: 24 },
    { key: 'skeleton_archer',  name: 'Skeleton Archer',  nameRu: 'Скелет-Лучник', nameDe: 'Skelettbogenschütze', hp: 50, dmg: 8,  exp: 25, bw: 18, bh: 24 },
    { key: 'skeleton_shaman',  name: 'Skeleton Shaman',  nameRu: 'Скелет-Шаман', nameDe: 'Skelett-Schamane', hp: 60, dmg: 10, exp: 35, bw: 18, bh: 26 }
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
    { key: 'cave_spider', name: 'Cave Spider', nameRu: 'Пещерный Паук', nameDe: 'Höhlenspinne', hp: 120, dmg: 14, exp: 40, bw: 16, bh: 14, role: 'dps' },
    { key: 'cave_bat',    name: 'Cave Bat',    nameRu: 'Пещерная Летучая', nameDe: 'Höhlenfledermaus', hp: 80, dmg: 10, exp: 35, bw: 14, bh: 12, role: 'dps' },
    { key: 'stone_golem', name: 'Stone Golem',  nameRu: 'Каменный Голем',  nameDe: 'Steingolem',     hp: 200, dmg: 18, exp: 55, bw: 22, bh: 26, role: 'tank' },
    { key: 'earth_worm',  name: 'Earth Worm',   nameRu: 'Земляной Червь',  nameDe: 'Erdwurm',        hp: 180, dmg: 15, exp: 50, bw: 24, bh: 18, role: 'tank' }
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
    tank:     { key: 'village_brute',  name: 'Infected Brute',  nameRu: 'Заражённый Брута',   nameDe: 'Infizierter Brutalo', texKey: 'village_brute',  hp: 280, dmg: 22, exp: 70,  bw: 20, bh: 22, role: 'tank' },
    assassin: { key: 'village_stalker', name: 'Infected Stalker', nameRu: 'Заражённый Сталкер', nameDe: 'Infizierter Schleicher', texKey: 'village_stalker', hp: 120, dmg: 30, exp: 60,  bw: 14, bh: 14, role: 'assassin' },
    archer:   { key: 'village_spitter', name: 'Infected Spitter', nameRu: 'Заражённый Плевок',  nameDe: 'Infizierter Spucker', texKey: 'village_spitter', hp: 150, dmg: 20, exp: 55,  bw: 16, bh: 16, role: 'archer' },
    healer:   { key: 'village_curser', name: 'Infected Curser',  nameRu: 'Заражённый Проклятый', nameDe: 'Infizierter Flucher', texKey: 'village_curser', hp: 130, dmg: 14, exp: 65,  bw: 14, bh: 18, role: 'healer' }
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
    tank:     { key: 'hell_guard',   name: 'Hell Guard',   nameRu: 'Адская Стража',   nameDe: 'Höllengarde',   hp: 350, dmg: 25, exp: 80,  bw: 22, bh: 24, role: 'tank' },
    assassin: { key: 'hell_stalker', name: 'Hell Stalker', nameRu: 'Адский Сталкер',  nameDe: 'Höllenschleicher', hp: 150, dmg: 35, exp: 70,  bw: 14, bh: 14, role: 'assassin' },
    archer:   { key: 'hell_archer',  name: 'Hell Archer',  nameRu: 'Адский Лучник',   nameDe: 'Höllenbogenschütze', hp: 180, dmg: 22, exp: 65,  bw: 16, bh: 16, role: 'archer' },
    mage:     { key: 'hell_mage',    name: 'Hell Mage',    nameRu: 'Адский Маг',      nameDe: 'Höllenmagier',  hp: 140, dmg: 40, exp: 75,  bw: 14, bh: 18, role: 'mage' },
    healer:   { key: 'hell_priest',  name: 'Hell Priest',  nameRu: 'Адский Жрец',     nameDe: 'Höllenpriester', hp: 160, dmg: 15, exp: 70,  bw: 14, bh: 18, role: 'healer' }
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
        lore: 'The Ice Spirit was once a winter deity, worshipped for snowfall and frost. When the village burned its shrine, the spirit retaliated — freezing everything it had once blessed. Its rage was absolute. Its regret, eternal.' }
};
