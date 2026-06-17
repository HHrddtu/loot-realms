import { EMPTY_ACCOUNT_EQUIPMENT } from './config/index.js';
import { saveAccountToFirestore, loadAccountFromFirestore, getCurrentUser, isAnonymous } from './auth.js';

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

let _accountCache = null;

const DEFAULT_ACCOUNT = {
    version: 3,
    accountLevel: 1,
    accountExp: 0,
    accountTalentPoints: 0,
    unlockedAccountTalents: [],
    totalKills: 0,
    totalStumps: 0,
    highestClassLevel: {},
    playTime: 0,
    gold: 0,
    crystals: 0,
    ownedPets: [],
    equippedPet: null,
    petLevels: {},
    upgradeLevels: {},
    activeBoosts: {},
    accountEquipment: { sage: { ...EMPTY_ACCOUNT_EQUIPMENT }, alchemist: { ...EMPTY_ACCOUNT_EQUIPMENT }, angel: { ...EMPTY_ACCOUNT_EQUIPMENT } },
    accountEquipBag: { sage: [], alchemist: [], angel: [] }
};

function migrateAccount(data) {
    if (!data) return data;
    if (data.version >= 3) return data;
    if (data.version < 2) {
        const flat = data.accountEquipment;
        if (flat && !flat.sage) {
            data.accountEquipment = { sage: { ...flat }, alchemist: { ...EMPTY_ACCOUNT_EQUIPMENT }, angel: { ...EMPTY_ACCOUNT_EQUIPMENT } };
            const oldBag = Array.isArray(data.accountEquipBag) ? data.accountEquipBag : [];
            data.accountEquipBag = { sage: oldBag, alchemist: [], angel: [] };
        }
    }
    if (data.crystals === undefined) data.crystals = 0;
    if (!data.ownedPets) data.ownedPets = [];
    if (data.equippedPet === undefined) data.equippedPet = null;
    if (!data.petLevels) data.petLevels = {};
    if (!data.upgradeLevels) data.upgradeLevels = {};
    if (!data.activeBoosts) data.activeBoosts = {};
    data.version = 3;
    return data;
}

export function saveAccount(data) {
    try {
        const existing = loadAccount() || {};
        const merged = { ...DEFAULT_ACCOUNT, ...existing, ...data };
        localStorage.setItem(ACCOUNT_KEY, JSON.stringify(merged));
        _accountCache = null;

        if (getCurrentUser() && !isAnonymous()) {
            saveAccountToFirestore(merged).catch(() => {});
        }
        return true;
    } catch (e) {
        return false;
    }
}

export function loadAccount() {
    if (_accountCache) return _accountCache;
    try {
        const json = localStorage.getItem(ACCOUNT_KEY);
        if (!json) return null;
        const data = migrateAccount({ ...DEFAULT_ACCOUNT, ...JSON.parse(json) });
        if (data) localStorage.setItem(ACCOUNT_KEY, JSON.stringify(data));
        _accountCache = data;
        return data;
    } catch (e) {
        return null;
    }
}

export async function syncAccountFromCloud() {
    const user = getCurrentUser();
    if (!user || isAnonymous()) return loadAccount();

    try {
        const cloudData = await loadAccountFromFirestore();
        if (cloudData) {
            const migrated = migrateAccount({ ...DEFAULT_ACCOUNT, ...cloudData });
            localStorage.setItem(ACCOUNT_KEY, JSON.stringify(migrated));
            _accountCache = migrated;
            return migrated;
        }
        const local = loadAccount();
        if (local) {
            saveAccountToFirestore(local).catch(() => {});
        }
        return local;
    } catch (e) {
        return loadAccount();
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
