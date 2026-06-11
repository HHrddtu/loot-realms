import { BESTIARY_LEVELS, BESTIARY_ENEMIES, BESTIARY_DIFF_MULT } from './config.js';
import { loadAccount, saveAccount } from './save.js';

let bestiaryData = {};

export function initBestiary() {
    const acc = loadAccount() || {};
    bestiaryData = acc.bestiary || {};
    Object.keys(BESTIARY_ENEMIES).forEach(key => {
        if (!bestiaryData[key]) {
            bestiaryData[key] = {
                encounters: 0,
                kills: 0,
                firstSeen: null,
                lastSeen: null
            };
        }
    });
}

export function recordEncounter(enemyKey) {
    if (!bestiaryData[enemyKey]) {
        bestiaryData[enemyKey] = {
            encounters: 0,
            kills: 0,
            firstSeen: null,
            lastSeen: null
        };
    }
    const entry = bestiaryData[enemyKey];
    entry.encounters++;
    const now = Date.now();
    if (!entry.firstSeen) entry.firstSeen = now;
    entry.lastSeen = now;
}

export function recordKill(enemyKey) {
    if (!bestiaryData[enemyKey]) {
        bestiaryData[enemyKey] = {
            encounters: 0,
            kills: 0,
            firstSeen: null,
            lastSeen: null
        };
    }
    const entry = bestiaryData[enemyKey];
    entry.kills++;
    if (!entry.encounters) entry.encounters = 1;
    const now = Date.now();
    if (!entry.firstSeen) entry.firstSeen = now;
    entry.lastSeen = now;
}

export function getStudyLevel(enemyKey) {
    const entry = bestiaryData[enemyKey];
    if (!entry) return 0;
    const kills = entry.kills;
    let lvl = 0;
    for (let i = BESTIARY_LEVELS.length - 1; i >= 0; i--) {
        if (kills >= BESTIARY_LEVELS[i].killsRequired) {
            lvl = BESTIARY_LEVELS[i].level;
            break;
        }
    }
    return lvl;
}

export function getStudyBonus(enemyKey, difficulty) {
    const lvl = getStudyLevel(enemyKey);
    const cfg = BESTIARY_LEVELS.find(l => l.level === lvl);
    if (!cfg) return { dmgBonus: 0, expBonus: 0 };
    const diffMult = BESTIARY_DIFF_MULT[difficulty] || 1.0;
    return { dmgBonus: cfg.dmgBonus * diffMult, expBonus: cfg.expBonus * diffMult };
}

export function getInfoLevel(enemyKey) {
    const lvl = getStudyLevel(enemyKey);
    const cfg = BESTIARY_LEVELS.find(l => l.level === lvl);
    if (!cfg) return 'name';
    return cfg.info;
}

export function getBestiaryEntry(enemyKey) {
    const entry = bestiaryData[enemyKey] || { encounters: 0, kills: 0, firstSeen: null, lastSeen: null };
    const meta = BESTIARY_ENEMIES[enemyKey] || {};
    const level = getStudyLevel(enemyKey);
    const bonus = getStudyBonus(enemyKey);
    const infoLevel = getInfoLevel(enemyKey);

    return {
        key: enemyKey,
        name: meta.name || enemyKey,
        texKey: meta.texKey || enemyKey,
        biome: meta.biome || 'unknown',
        encounters: entry.encounters,
        kills: entry.kills,
        level: level,
        firstSeen: entry.firstSeen,
        lastSeen: entry.lastSeen,
        dmgBonus: bonus.dmgBonus,
        expBonus: bonus.expBonus,
        infoLevel: infoLevel,
        weaknesses: infoLevel === 'weaknesses' || infoLevel === 'abilities' || infoLevel === 'full' || infoLevel === 'lore' ? (meta.weaknesses || []) : [],
        resistances: infoLevel === 'weaknesses' || infoLevel === 'abilities' || infoLevel === 'full' || infoLevel === 'lore' ? (meta.resistances || []) : [],
        abilities: infoLevel === 'abilities' || infoLevel === 'full' || infoLevel === 'lore' ? (meta.abilities || []) : [],
        description: meta.description || '',
        lore: infoLevel === 'lore' || infoLevel === 'full' ? (meta.lore || '') : (meta.description ? '' : '')
    };
}

export function getAllEntries() {
    return Object.keys(BESTIARY_ENEMIES).map(key => getBestiaryEntry(key));
}

export function getTotalProgress() {
    const keys = Object.keys(BESTIARY_ENEMIES);
    const totalLevels = keys.length * 5;
    const currentLevels = keys.reduce((sum, key) => sum + getStudyLevel(key), 0);
    return { current: currentLevels, total: totalLevels };
}

export function getBestiaryData() {
    return bestiaryData;
}

export function getNextLevelInfo(enemyKey) {
    const lvl = getStudyLevel(enemyKey);
    if (lvl >= 5) return null;
    const nextCfg = BESTIARY_LEVELS[lvl + 1];
    const entry = bestiaryData[enemyKey] || { kills: 0 };
    return {
        currentKills: entry.kills,
        requiredKills: nextCfg.killsRequired,
        nextLevel: nextCfg.level
    };
}

export function getAllBestiaryBonuses(difficulty) {
    const bonuses = {};
    Object.keys(BESTIARY_ENEMIES).forEach(key => {
        bonuses[key] = getStudyBonus(key, difficulty);
    });
    return bonuses;
}

export function setBestiaryData(data) {
    bestiaryData = data || {};
}

export function saveBestiary() {
    const acc = loadAccount() || {};
    acc.bestiary = bestiaryData;
    saveAccount(acc);
}
