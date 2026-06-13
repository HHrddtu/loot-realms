import { MATERIAL_BOOK_LEVELS, MATERIAL_BOOK_ENTRIES, MATERIAL_DB, BESTIARY_DIFF_MULT } from './config/index.js';
import { loadAccount, saveAccount } from './save.js';

let materialData = {};

export function initMaterialBook() {
    const acc = loadAccount() || {};
    materialData = acc.materialBook || {};
    MATERIAL_DB.forEach(m => {
        if (!materialData[m.id]) {
            materialData[m.id] = { collected: 0 };
        }
    });
}

export function recordMaterialCollect(materialId) {
    if (!materialData[materialId]) {
        materialData[materialId] = { collected: 0 };
    }
    materialData[materialId].collected++;
}

export function getMaterialStudyLevel(materialId) {
    const entry = materialData[materialId];
    if (!entry) return 0;
    const count = entry.collected;
    let lvl = 0;
    for (let i = MATERIAL_BOOK_LEVELS.length - 1; i >= 0; i--) {
        if (count >= MATERIAL_BOOK_LEVELS[i].countRequired) {
            lvl = MATERIAL_BOOK_LEVELS[i].level;
            break;
        }
    }
    return lvl;
}

export function getMaterialBonuses(difficulty) {
    const bonuses = { hp: 0, dmg: 0, speed: 0 };
    const diffMult = BESTIARY_DIFF_MULT[difficulty] || 1.0;
    MATERIAL_DB.forEach(m => {
        const lvl = getMaterialStudyLevel(m.id);
        const cfg = MATERIAL_BOOK_LEVELS.find(l => l.level === lvl);
        if (cfg) {
            bonuses.hp += Math.floor(cfg.hpBonus * diffMult);
            bonuses.dmg += Math.floor(cfg.dmgBonus * diffMult);
            bonuses.speed += Math.floor(cfg.speedBonus * diffMult);
        }
    });
    return bonuses;
}

export function getMaterialEntry(materialId) {
    const entry = materialData[materialId] || { collected: 0 };
    const meta = MATERIAL_BOOK_ENTRIES[materialId] || {};
    const level = getMaterialStudyLevel(materialId);
    const infoLevel = (MATERIAL_BOOK_LEVELS.find(l => l.level === level) || {}).info || 'description';

    return {
        key: materialId,
        name: meta.name || materialId,
        texKey: meta.texKey || materialId,
        rarity: meta.rarity || 'common',
        collected: entry.collected,
        level: level,
        infoLevel: infoLevel,
        description: meta.description || '',
        properties: infoLevel === 'properties' || infoLevel === 'recipe' || infoLevel === 'mastery' || infoLevel === 'lore' ? (meta.properties || '') : '',
        recipe: infoLevel === 'recipe' || infoLevel === 'mastery' || infoLevel === 'lore' ? (meta.recipe || '') : '',
        mastery: infoLevel === 'mastery' || infoLevel === 'lore' ? 'Mastery: Double yield when crafting with this material.' : '',
        lore: infoLevel === 'lore' ? (meta.lore || '') : ''
    };
}

export function getAllMaterialEntries() {
    return MATERIAL_DB.map(m => getMaterialEntry(m.id));
}

export function getNextMaterialLevelInfo(materialId) {
    const lvl = getMaterialStudyLevel(materialId);
    if (lvl >= 5) return null;
    const nextCfg = MATERIAL_BOOK_LEVELS[lvl + 1];
    const entry = materialData[materialId] || { collected: 0 };
    return {
        currentCount: entry.collected,
        requiredCount: nextCfg.countRequired,
        nextLevel: nextCfg.level
    };
}

export function getMaterialBookData() {
    return materialData;
}

export function setMaterialBookData(data) {
    materialData = data || {};
}

export function saveMaterialBook() {
    const acc = loadAccount() || {};
    acc.materialBook = materialData;
    saveAccount(acc);
}
