import { EMPTY_ACCOUNT_EQUIPMENT } from '../config/index.js';
import { saveGame, loadGame, saveAccount, loadAccount, GAME_SAVE_VERSION } from '../save.js';
import { getClassStats } from '../classes.js';
import { getTalentEffects } from '../talents.js';
import { getAccountTalentEffects } from '../accountTalents.js';
import { saveBestiary } from '../bestiary.js';
import { saveMaterialBook } from '../materialBook.js';
import { saveSoulBook } from '../soulBook.js';
import { saveQuests } from '../quests.js';

export class SaveLoadSystem {
    constructor(scene) {
        this.scene = scene;
    }

    collectSaveData() {
        const s = this.scene;
        return {
            version: GAME_SAVE_VERSION,
            classKey: s.classKey,
            difficulty: s.difficulty,
            playerHP: s.playerHP,
            playerMaxHP: s.playerMaxHP,
            playerExp: s.playerExp,
            playerLevel: s.playerLevel,
            playerX: s.player.x,
            playerY: s.player.y,
            zone: s.zone,
            equipment: s.equipment,
            materials: s.materials,
            consumable: s.consumable || null,
            equipBag: s.equipBag,
            gold: s.gold || 0,
            crystals: s.crystals || 0,
            kills: s.kills,
            stumpsBroken: s.stumpsBroken,
            corruption: s.corruption,
            mineUnlocked: s.zones.mine.isUnlocked,
            mineBossDefeated: s.zones.mine.bossDefeated,
            hasSecretKey: s.zones.mine.hasSecretKey,
            caveBossDefeated: s.zones.cave.bossDefeated,
            bossDefeated: s.zones.arena.bossDefeated,
            unlockedTalents: s.unlockedTalents,
            talentPoints: s.talentPoints,
            villageFrozen: s.zones.village.isFrozen,
            villageRestored: s.zones.village.isRestored,
            villageAllCleared: s.zones.village.allCleared || false,
            villageBossDefeated: s.zones.village.bossDefeated || false,
            hellBossDefeated: s.zones.hell.bossDefeated || false,
            villageThriving: s.zones.village.isThriving || false,
            castleQuestDone: s.zones.castle.questDone || false,
            castleRoom: s.zones.castle.currentRoom || 0,
            castleBossDefeated: s.zones.castle.bossDefeated || false,
            castleKeyObtained: s.zones.castle.keyObtained || false,
            castleRescued: s.zones.castle.rescued || false,
            innUsed: s.innUsed || false
        };
    }

    collectAccountData() {
        const s = this.scene;
        const acc = loadAccount() || {};
        const eqPerClass = acc.accountEquipment || {};
        eqPerClass[s.classKey] = s.accountEquipment;
        const bagPerClass = acc.accountEquipBag || {};
        bagPerClass[s.classKey] = s.accountEquipBag;
        const lockedPerClass = acc.lockedBranchesPerClass || {};
        lockedPerClass[s.classKey] = s.lockedBranches || [];
        return {
            ...acc,
            accountLevel: s.accountLevel,
            accountExp: s.accountExp,
            accountTalentPoints: s.accountTalentPoints,
            unlockedAccountTalents: s.unlockedAccountTalents,
            gold: s.gold || 0,
            crystals: s.crystals || 0,
            upgradeLevels: s.upgradeLevels || {},
            accountEquipment: eqPerClass,
            accountEquipBag: bagPerClass,
            lockedBranchesPerClass: lockedPerClass
        };
    }

    getHighestClassLevel() {
        const s = this.scene;
        const acc = loadAccount() || {};
        const map = acc.highestClassLevel || {};
        map[s.classKey] = Math.max(map[s.classKey] || 0, s.playerLevel || 1);
        return map;
    }

    doSave() {
        const s = this.scene;
        saveGame(this.collectSaveData());
        const accData = this.collectAccountData();
        accData.highestClassLevel = this.getHighestClassLevel();
        saveAccount(accData);
        saveBestiary();
        saveMaterialBook();
        saveSoulBook();
        saveQuests();
    }

    doLoad() {
        const s = this.scene;
        const data = loadGame();
        if (!data) return false;
        s.difficulty = data.difficulty || 'Normal';
        s.classKey = data.classKey || 'sage';
        s.playerHP = data.playerHP || s.classStats.maxHp;
        s.playerMaxHP = data.playerMaxHP || s.classStats.maxHp;
        s.playerExp = data.playerExp || 0;
        s.playerLevel = data.playerLevel || 1;
        if (data.playerX !== undefined) s.player.x = data.playerX;
        if (data.playerY !== undefined) s.player.y = data.playerY;
        s.equipment = data.equipment || { weapon: null, armor: null, accessory: null };
        s.materials = data.materials || [];
        s.consumable = data.consumable || null;
        s.equipBag = data.equipBag || [];
        s.gold = data.gold || 0;
        s.crystals = data.crystals || 0;
        s.innUsed = data.innUsed || false;
        s.kills = data.kills || 0;
        s.stumpsBroken = data.stumpsBroken || 0;
        s.corruption = data.corruption || 0;
        s.zones.mine.isUnlocked = data.mineUnlocked || false;
        s.zones.mine.bossDefeated = data.mineBossDefeated || false;
        s.zones.mine.hasSecretKey = data.hasSecretKey || false;
        s.zones.cave.bossDefeated = data.caveBossDefeated || false;
        s.zones.arena.bossDefeated = data.bossDefeated || false;
        s.zones.village.isFrozen = data.villageFrozen || false;
        s.zones.village.isRestored = data.villageRestored || false;
        s.zones.village.allCleared = data.villageAllCleared || false;
        s.zones.village.bossDefeated = data.villageBossDefeated || false;
        s.zones.hell.bossDefeated = data.hellBossDefeated || false;
        s.zones.village.isThriving = data.villageThriving || false;
        s.zones.castle.questDone = data.castleQuestDone || false;
        s.zones.castle.currentRoom = data.castleRoom || 0;
        s.zones.castle.bossDefeated = data.castleBossDefeated || false;
        s.zones.castle.keyObtained = data.castleKeyObtained || false;
        s.zones.castle.rescued = data.castleRescued || false;
        s._savedZone = data.zone || 'forest';
        this.loadAccountTalents();
        const acc = loadAccount() || {};
        s.accountLevel = acc.accountLevel || 1;
        s.accountExp = acc.accountExp || 0;
        s.accountTalentPoints = acc.accountTalentPoints || 0;
        s.unlockedAccountTalents = acc.unlockedAccountTalents || [];
        const accEquipPerClass2 = acc.accountEquipment || {};
        const accBagPerClass2 = acc.accountEquipBag || {};
        s.accountEquipment = accEquipPerClass2[s.classKey] || { ...EMPTY_ACCOUNT_EQUIPMENT };
        s.accountEquipBag = accBagPerClass2[s.classKey] || [];
        s.lockedBranches = (acc.lockedBranchesPerClass || {})[s.classKey] || [];
        s.accountEffects = getAccountTalentEffects(s.unlockedAccountTalents);
        s.gold = acc.gold || 0;
        s.crystals = acc.crystals || 0;
        s.classStats = getClassStats(s.classKey, s.playerLevel);
        s.talentEffects = getTalentEffects(s.unlockedTalents);
        s.corruptionMax = s.classStats.corruptionMax + (s.talentEffects.corruptionMax || 0);
        s.recalcStats();
        if (s.petSys.petSprite) {
            s.petSys.petSprite.x = s.player.x + 20;
            s.petSys.petSprite.y = s.player.y + 10;
        }
        return true;
    }

    loadAccountTalents() {
        const s = this.scene;
        const data = loadGame();
        if (data) {
            s.unlockedTalents = data.unlockedTalents || [];
            s.talentPoints = data.talentPoints || 0;
        } else {
            s.unlockedTalents = [];
            s.talentPoints = 0;
        }
        s.talentEffects = getTalentEffects(s.unlockedTalents);
    }
}
