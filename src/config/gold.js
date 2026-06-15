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
    { id: 'potion_heal_small',  name: 'Small Healing Potion',  nameRu: 'Малое Зелье Здоровья', nameDe: 'Kleiner Heiltrank',  rarity: 'common',   texKey: 'consumable_potion', effect: 'heal', value: 0.30,  price: 16,  description: 'Restores 30% HP' },
    { id: 'potion_heal_medium', name: 'Medium Healing Potion', nameRu: 'Среднее Зелье Здоровья', nameDe: 'Mittlerer Heiltrank', rarity: 'uncommon', texKey: 'consumable_potion', effect: 'heal', value: 0.60, price: 36, description: 'Restores 60% HP' },
    { id: 'potion_heal_large',  name: 'Large Healing Potion',  nameRu: 'Большое Зелье Здоровья', nameDe: 'Großer Heiltrank',  rarity: 'rare',     texKey: 'consumable_potion', effect: 'heal', value: 1.00,  price: 70, description: 'Restores 100% HP' },
    { id: 'potion_damage',      name: 'Berserker Potion',      nameRu: 'Зелье Берсерка',        nameDe: 'Berserkertrank',    rarity: 'uncommon', texKey: 'consumable_potion', effect: 'damage_boost', value: 0.25, price: 24, duration: 60000, description: '+25% DMG for 60s' },
    { id: 'potion_speed',       name: 'Swift Potion',          nameRu: 'Зелье Скорости',        nameDe: 'Geschwindigkeitstrank', rarity: 'uncommon', texKey: 'consumable_potion', effect: 'speed_boost', value: 0.30, price: 24, duration: 60000, description: '+30% SPD for 60s' },
    { id: 'potion_defense',     name: 'Iron Potion',           nameRu: 'Железное Зелье',        nameDe: 'Eisentrank',        rarity: 'uncommon', texKey: 'consumable_potion', effect: 'defense_boost', value: 0.25, price: 24, duration: 60000, description: '+25% DEF for 60s' }
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
