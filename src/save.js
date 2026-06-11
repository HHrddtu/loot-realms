const SAVE_KEY = 'webgame_save';
const ACCOUNT_KEY = 'webgame_account';

/* ===== GAME SAVE (per-class, per-session) ===== */

export function saveGame(data) {
    try {
        const json = JSON.stringify(data);
        localStorage.setItem(SAVE_KEY, json);
        return true;
    } catch (e) {
        return false;
    }
}

export function loadGame() {
    try {
        const json = localStorage.getItem(SAVE_KEY);
        if (!json) return null;
        return JSON.parse(json);
    } catch (e) {
        return null;
    }
}

export function deleteSave() {
    localStorage.removeItem(SAVE_KEY);
}

export function hasSave() {
    return localStorage.getItem(SAVE_KEY) !== null;
}

/* ===== ACCOUNT (persistent across all saves) ===== */

const DEFAULT_ACCOUNT = {
    version: 2,
    accountLevel: 1,
    accountExp: 0,
    accountTalentPoints: 0,
    unlockedAccountTalents: [],
    totalKills: 0,
    totalStumps: 0,
    highestClassLevel: {},
    playTime: 0,
    accountEquipment: { sage: { hat: null, mantle: null, legs: null, weapon: null, accessory: null }, alchemist: { hat: null, mantle: null, legs: null, weapon: null, accessory: null }, angel: { hat: null, mantle: null, legs: null, weapon: null, accessory: null } },
    accountEquipBag: { sage: [], alchemist: [], angel: [] }
};

function migrateAccount(data) {
    if (!data) return data;
    if (data.version >= 2) return data;
    const flat = data.accountEquipment;
    if (flat && !flat.sage) {
        data.accountEquipment = { sage: { ...flat }, alchemist: { hat: null, mantle: null, legs: null, weapon: null, accessory: null }, angel: { hat: null, mantle: null, legs: null, weapon: null, accessory: null } };
        const oldBag = Array.isArray(data.accountEquipBag) ? data.accountEquipBag : [];
        data.accountEquipBag = { sage: oldBag, alchemist: [], angel: [] };
    }
    data.version = 2;
    return data;
}

export function saveAccount(data) {
    try {
        const existing = loadAccount() || {};
        const merged = { ...DEFAULT_ACCOUNT, ...existing, ...data };
        localStorage.setItem(ACCOUNT_KEY, JSON.stringify(merged));
        return true;
    } catch (e) {
        return false;
    }
}

export function loadAccount() {
    try {
        const json = localStorage.getItem(ACCOUNT_KEY);
        if (!json) return null;
        const data = migrateAccount({ ...DEFAULT_ACCOUNT, ...JSON.parse(json) });
        if (data) localStorage.setItem(ACCOUNT_KEY, JSON.stringify(data));
        return data;
    } catch (e) {
        return null;
    }
}

export function hasAccount() {
    return localStorage.getItem(ACCOUNT_KEY) !== null;
}

export function initAccount() {
    if (!hasAccount()) {
        saveAccount(DEFAULT_ACCOUNT);
    }
    return loadAccount();
}

export function getAccountLevelUpReq(level) {
    return Math.floor(200 * Math.pow(level, 1.8));
}
