export const GOLD_DROPS = {
    forest: { mobMin: 4, mobMax: 8,   chestMin: 10, chestMax: 20,  bossMin: 0,   bossMax: 0 },
    mine:   { mobMin: 6, mobMax: 14,  chestMin: 12, chestMax: 25,  bossMin: 40,  bossMax: 80 },
    cave:   { mobMin: 10, mobMax: 20, chestMin: 20, chestMax: 40,  bossMin: 60,  bossMax: 100 },
    village:{ mobMin: 12, mobMax: 25, chestMin: 15, chestMax: 35,  bossMin: 50,  bossMax: 100 },
    cemetery:{ mobMin: 14, mobMax: 28, chestMin: 20, chestMax: 40, bossMin: 60,  bossMax: 120 },
    hell:   { mobMin: 16, mobMax: 30, chestMin: 30, chestMax: 60,  bossMin: 80,  bossMax: 140 },
    snowy:  { mobMin: 20, mobMax: 40, chestMin: 30, chestMax: 60,  bossMin: 80,  bossMax: 140 },
    castle: { mobMin: 20, mobMax: 40, chestMin: 30, chestMax: 60,  bossMin: 80,  bossMax: 160 }
};

export function rollGold(zone) {
    const d = GOLD_DROPS[zone] || GOLD_DROPS.forest;
    return Math.floor(Math.random() * (d.mobMax - d.mobMin + 1)) + d.mobMin;
}

export function rollChestGold(zone) {
    const d = GOLD_DROPS[zone] || GOLD_DROPS.forest;
    return Math.floor(Math.random() * (d.chestMax - d.chestMin + 1)) + d.chestMin;
}

export function rollBossGold(zone) {
    const d = GOLD_DROPS[zone] || GOLD_DROPS.forest;
    return Math.floor(Math.random() * (d.bossMax - d.bossMin + 1)) + d.bossMin;
}

export const CONSUMABLES = [
    { id: 'potion_heal_small',  name: 'Small Healing Potion',  nameRu: 'Малое Зелье Здоровья', nameDe: 'Kleiner Heiltrank',  rarity: 'common',   texKey: 'potion_heal_small',  effect: 'heal', value: 0.30,  price: 16,  category: 'healing', description: 'Restores 30% HP', effectDesc: 'Heals 30% of max HP instantly' },
    { id: 'potion_heal_medium', name: 'Medium Healing Potion', nameRu: 'Среднее Зелье Здоровья', nameDe: 'Mittlerer Heiltrank', rarity: 'uncommon', texKey: 'potion_heal_medium', effect: 'heal', value: 0.60, price: 36, category: 'healing', description: 'Restores 60% HP', effectDesc: 'Heals 60% of max HP instantly' },
    { id: 'potion_heal_large',  name: 'Large Healing Potion',  nameRu: 'Большое Зелье Здоровья', nameDe: 'Großer Heiltrank',  rarity: 'rare',     texKey: 'potion_heal_large',  effect: 'heal', value: 1.00,  price: 70, category: 'healing', description: 'Restores 100% HP', effectDesc: 'Fully restores HP' },
    { id: 'potion_heal_mega',   name: 'Mega Healing Potion',   nameRu: 'Огромное Зелье Здоровья', nameDe: 'Mega Heiltrank', rarity: 'epic',     texKey: 'potion_heal_mega',   effect: 'heal', value: 1.50, price: 150, category: 'healing', description: 'Restores 150% HP', effectDesc: 'Overheals: restores 150% of max HP' },
    { id: 'potion_damage',      name: 'Berserker Potion',      nameRu: 'Зелье Берсерка',        nameDe: 'Berserkertrank',    rarity: 'uncommon', texKey: 'potion_berserker',  effect: 'damage_boost', value: 0.25, price: 24, duration: 60000, category: 'combat', description: '+25% DMG for 60s', effectDesc: 'Grants +25% attack damage for 60s' },
    { id: 'potion_speed',       name: 'Swift Potion',          nameRu: 'Зелье Скорости',        nameDe: 'Geschwindigkeitstrank', rarity: 'uncommon', texKey: 'potion_swift',     effect: 'speed_boost', value: 0.30, price: 24, duration: 60000, category: 'combat', description: '+30% SPD for 60s', effectDesc: 'Grants +30% movement speed for 60s' },
    { id: 'potion_defense',     name: 'Iron Potion',           nameRu: 'Железное Зелье',        nameDe: 'Eisentrank',        rarity: 'uncommon', texKey: 'potion_iron',       effect: 'defense_boost', value: 0.25, price: 24, duration: 60000, category: 'combat', description: '+25% DEF for 60s', effectDesc: 'Grants +25% armor for 60s' },
    { id: 'potion_crit',        name: 'Precision Elixir',      nameRu: 'Эликсир Точности',     nameDe: 'Präzisionstrank',   rarity: 'rare',     texKey: 'potion_precision',  effect: 'crit_boost', value: 15, price: 45, duration: 60000, category: 'combat', description: '+15% Crit for 60s', effectDesc: 'Grants +15% critical strike chance for 60s' },
    { id: 'potion_lifesteal',   name: 'Vampiric Elixir',       nameRu: 'Эликсир Вампиризма',  nameDe: 'Vampirtrank',       rarity: 'rare',     texKey: 'potion_vampiric',   effect: 'lifesteal', value: 0.20, price: 65, duration: 45000, category: 'combat', description: '20% lifesteal 45s', effectDesc: 'Attacks heal for 20% of damage dealt for 45s' }
];

export const SHOP_BOOSTS = [
    { id: 'boost_xp',    name: 'XP Scroll',      nameRu: 'Свиток Опыта',    nameDe: 'XP-Schriftrolle',   rarity: 'rare',     texKey: 'item_scroll_xp',    price: 120, boostType: 'xp_percent',    value: 50,  description: '+50% XP this run',    effectDesc: '+50% experience for this run' },
    { id: 'boost_gold',  name: 'Gold Charm',      nameRu: 'Золотой Оберег',  nameDe: 'Goldzauber',        rarity: 'rare',     texKey: 'item_scroll_gold',  price: 150, boostType: 'gold_percent',  value: 50,  description: '+50% Gold this run',   effectDesc: '+50% gold drops for this run' },
    { id: 'boost_loot',  name: 'Loot Amulet',     nameRu: 'Амулет Добычи',   nameDe: 'Beuteamulett',      rarity: 'rare',     texKey: 'item_scroll_loot',  price: 180, boostType: 'loot_percent',  value: 25,  description: '+25% Loot this run',   effectDesc: '+25% item drop chance for this run' },
    { id: 'boost_dmg',   name: 'Battle Standard', nameRu: 'Боевое Знамя',    nameDe: 'Kampfstandarte',    rarity: 'epic',     texKey: 'item_scroll_dmg',   price: 250, boostType: 'damage_percent', value: 15,  description: '+15% DMG this run',    effectDesc: '+15% attack damage for this run' },
    { id: 'boost_def',   name: 'Fortitude Rune',  nameRu: 'Руна Стойкости',  nameDe: 'Standhaftigkeitsrune', rarity: 'epic', texKey: 'item_scroll_def', price: 200, boostType: 'defense_percent', value: 20, description: '+20% DEF this run', effectDesc: '+20% armor for this run' },
    { id: 'boost_regen', name: 'Regen Totem',     nameRu: 'Тотем Регенерации', nameDe: 'Regenerationstotem', rarity: 'rare', texKey: 'item_scroll_regen', price: 100, boostType: 'regen_flat', value: 3, description: '+3 HP/s this run', effectDesc: '+3 HP per second for this run' }
];

export const SHOP_UPGRADES = [
    { id: 'upg_hp',      name: 'Max HP Upgrade',   nameRu: 'Улучшение Здоровья', nameDe: 'HP-Upgrade',   texKey: 'item_upgrade_hp',   stat: 'maxHpPercent',   basePrice: 200,  priceScale: 1.8, maxLevel: 10, description: '+5% Max HP (permanent)', effectDesc: 'Permanently increases max HP by 5%' },
    { id: 'upg_dmg',     name: 'Damage Upgrade',   nameRu: 'Улучшение Урона',    nameDe: 'Schaden-Upgrade', texKey: 'item_upgrade_dmg',  stat: 'damagePercent',  basePrice: 250,  priceScale: 1.8, maxLevel: 10, description: '+5% Damage (permanent)', effectDesc: 'Permanently increases damage by 5%' },
    { id: 'upg_spd',     name: 'Speed Upgrade',    nameRu: 'Улучшение Скорости', nameDe: 'Speed-Upgrade', texKey: 'item_upgrade_spd',  stat: 'speedPercent',   basePrice: 180,  priceScale: 1.8, maxLevel: 10, description: '+5% Speed (permanent)', effectDesc: 'Permanently increases speed by 5%' },
    { id: 'upg_crit',    name: 'Crit Upgrade',     nameRu: 'Улучшение Крита',    nameDe: 'Crit-Upgrade',  texKey: 'item_upgrade_crit', stat: 'critPercent',    basePrice: 300,  priceScale: 2.0, maxLevel: 8,  description: '+3% Crit (permanent)', effectDesc: 'Permanently increases critical chance by 3%' },
    { id: 'upg_regen',   name: 'Regen Upgrade',    nameRu: 'Улучшение Регена',   nameDe: 'Regen-Upgrade', texKey: 'item_upgrade_regen', stat: 'regenPercent',  basePrice: 220,  priceScale: 1.8, maxLevel: 8,  description: '+2% Regen (permanent)', effectDesc: 'Permanently increases HP regen by 2%' }
];

export const SHOP_GOLD_CASES = [
    { id: 'gold_case_wood',  caseId: 'case_wood',  name: 'Wooden Case',  nameRu: 'Деревянный Кейс',  nameDe: 'Holzkiste',  texKey: 'case_wood',  goldPrice: 80,  description: 'Common pets' },
    { id: 'gold_case_iron',  caseId: 'case_iron',  name: 'Iron Case',    nameRu: 'Железный Кейс',    nameDe: 'Eisenkiste', texKey: 'case_iron',  goldPrice: 250, description: 'Uncommon+ pets' },
    { id: 'gold_case_gold',  caseId: 'case_gold',  name: 'Golden Case',  nameRu: 'Золотой Кейс',     nameDe: 'Goldkiste',  texKey: 'case_gold',  goldPrice: 650, description: 'Rare+ pets' }
];

export const SHOP_MATERIALS = [
    { zone: 'forest', items: ['wood', 'stone', 'leaf', 'herb'], priceMin: 8, priceMax: 14 },
    { zone: 'cave',   items: ['cave_silk', 'cave_moss', 'bat_wing'], priceMin: 18, priceMax: 28 },
    { zone: 'hell',   items: ['hell_ash', 'infernal_ore', 'demon_scale'], priceMin: 30, priceMax: 50 }
];

export const SHOP_EQUIP_RARITY_CHANCE = {
    uncommon: 0.70,
    rare: 0.25,
    epic: 0.05
};

export const SHOP_EQUIP_PRICES = {
    uncommon: 60,
    rare: 120,
    epic: 240
};

export const SELL_PRICE_RATIO = 0.50;

export const ZONE_LOOT_TABLES = {
    mine:     { common: 0.55, uncommon: 0.35, rare: 0.10, epic: 0,    legendary: 0 },
    cave:     { common: 0.30, uncommon: 0.40, rare: 0.25, epic: 0.05, legendary: 0 },
    village:  { common: 0.10, uncommon: 0.35, rare: 0.40, epic: 0.14, legendary: 0.01 },
    snowy:    { common: 0.05, uncommon: 0.25, rare: 0.45, epic: 0.20, legendary: 0.05 },
    castle:   { common: 0,    uncommon: 0.15, rare: 0.40, epic: 0.35, legendary: 0.10 },
    forest:   { common: 0.70, uncommon: 0.25, rare: 0.05, epic: 0,    legendary: 0 }
};
