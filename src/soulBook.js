import { SOUL_BOOK_LEVELS, SOUL_BOOK_ENTRIES, BESTIARY_ENEMIES, BESTIARY_DIFF_MULT } from './config/index.js';
import { loadAccount, saveAccount } from './save.js';

let soulData = {};

export function initSoulBook() {
    const acc = loadAccount() || {};
    soulData = acc.soulBook || {};
    Object.keys(BESTIARY_ENEMIES).forEach(key => {
        if (!soulData[key]) {
            soulData[key] = { collected: 0 };
        }
    });
}

export function recordSoulCollect(enemyKey) {
    if (!soulData[enemyKey]) {
        soulData[enemyKey] = { collected: 0 };
    }
    soulData[enemyKey].collected++;
}

export function getSoulStudyLevel(enemyKey) {
    const entry = soulData[enemyKey];
    if (!entry) return 0;
    const count = entry.collected;
    let lvl = 0;
    for (let i = SOUL_BOOK_LEVELS.length - 1; i >= 0; i--) {
        if (count >= SOUL_BOOK_LEVELS[i].countRequired) {
            lvl = SOUL_BOOK_LEVELS[i].level;
            break;
        }
    }
    return lvl;
}

export function getSoulBonuses(difficulty) {
    const bonuses = { hp: 0, dmg: 0, corDecay: 0 };
    const diffMult = BESTIARY_DIFF_MULT[difficulty] || 1.0;
    Object.keys(BESTIARY_ENEMIES).forEach(key => {
        const lvl = getSoulStudyLevel(key);
        const cfg = SOUL_BOOK_LEVELS.find(l => l.level === lvl);
        if (cfg) {
            bonuses.hp += Math.floor(cfg.hpBonus * diffMult);
            bonuses.dmg += Math.floor(cfg.dmgBonus * diffMult);
            bonuses.corDecay += cfg.corDecay * diffMult;
        }
    });
    return bonuses;
}

export function getSoulEntry(enemyKey) {
    const entry = soulData[enemyKey] || { collected: 0 };
    const meta = SOUL_BOOK_ENTRIES[enemyKey] || {};
    const level = getSoulStudyLevel(enemyKey);
    const infoLevel = (SOUL_BOOK_LEVELS.find(l => l.level === level) || {}).info || 'description';

    return {
        key: enemyKey,
        name: meta.name || enemyKey,
        texKey: meta.texKey || enemyKey,
        biome: meta.biome || 'unknown',
        collected: entry.collected,
        level: level,
        infoLevel: infoLevel,
        description: meta.description || '',
        weakness: infoLevel === 'weakness' || infoLevel === 'essence' || infoLevel === 'purification' || infoLevel === 'lore' ? (meta.weakness || '') : '',
        essence: infoLevel === 'essence' || infoLevel === 'purification' || infoLevel === 'lore' ? (meta.essence || '') : '',
        purification: infoLevel === 'purification' || infoLevel === 'lore' ? (meta.purification || '') : '',
        lore: infoLevel === 'lore' ? (meta.lore || '') : ''
    };
}

export function getAllSoulEntries() {
    return Object.keys(BESTIARY_ENEMIES).map(key => getSoulEntry(key));
}

export function getNextSoulLevelInfo(enemyKey) {
    const lvl = getSoulStudyLevel(enemyKey);
    if (lvl >= 5) return null;
    const nextCfg = SOUL_BOOK_LEVELS[lvl + 1];
    const entry = soulData[enemyKey] || { collected: 0 };
    return {
        currentCount: entry.collected,
        requiredCount: nextCfg.countRequired,
        nextLevel: nextCfg.level
    };
}

export function getSoulBookData() {
    return soulData;
}

export function setSoulBookData(data) {
    soulData = data || {};
}

export function saveSoulBook() {
    const acc = loadAccount() || {};
    acc.soulBook = soulData;
    saveAccount(acc);
}
