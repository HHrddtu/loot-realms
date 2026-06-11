import { MATERIAL_DB, EQUIP_DB, ACCOUNT_EQUIP_DB, CAVE_MATERIALS, ACCOUNT_EQUIP_DB_CAVE, VILLAGE_MATERIALS, ACCOUNT_EQUIP_DB_VILLAGE, VILLAGE_CHEST_DROP_ITEMS } from './config.js';

export function lighten(color, amt) {
    let r = (color >> 16) & 0xff;
    let g = (color >> 8) & 0xff;
    let b = color & 0xff;
    r = Math.min(255, Math.floor(r + (255 - r) * amt));
    g = Math.min(255, Math.floor(g + (255 - g) * amt));
    b = Math.min(255, Math.floor(b + (255 - b) * amt));
    return (r << 16) | (g << 8) | b;
}

function weightedRoll(db) {
    const roll = Math.random();
    let cum = 0;
    const sorted = [...db].sort((a, b) => a.chance - b.chance);
    for (const item of sorted) {
        cum += item.chance;
        if (roll < cum) return { ...item };
    }
    return { ...db[0] };
}

export function rollMaterial(zone) {
    if (zone === 'village') return { ...weightedRoll(VILLAGE_MATERIALS), type: 'material' };
    const db = zone === 'cave' ? CAVE_MATERIALS : MATERIAL_DB;
    return { ...weightedRoll(db), type: 'material' };
}

export function rollEquip() {
    return { ...weightedRoll(EQUIP_DB), type: 'equip' };
}

export function rollAccountEquip() {
    return { ...weightedRoll(ACCOUNT_EQUIP_DB), type: 'accountEquip' };
}

export function rollCaveRelic(classKey) {
    const classRelics = ACCOUNT_EQUIP_DB_CAVE.filter(r => r.classes && r.classes.includes(classKey));
    if (classRelics.length === 0) return null;
    const idx = Math.floor(Math.random() * classRelics.length);
    return { ...classRelics[idx], type: 'accountEquip' };
}

export function rollVillageEquip() {
    return { ...weightedRoll(VILLAGE_CHEST_DROP_ITEMS), type: 'equip' };
}

export function rollVillageAccountEquip() {
    const idx = Math.floor(Math.random() * ACCOUNT_EQUIP_DB_VILLAGE.length);
    return { ...ACCOUNT_EQUIP_DB_VILLAGE[idx], type: 'accountEquip' };
}
