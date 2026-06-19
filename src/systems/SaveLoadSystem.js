import { EMPTY_ACCOUNT_EQUIPMENT } from '../config/index.js';
import { saveGame, loadGame, saveAccount, loadAccount } from '../save.js';
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
            mineUnlocked: s.mineUnlocked,
            mineBossDefeated: s.mineBossDefeated,
            hasSecretKey: s.hasSecretKey,
            caveBossDefeated: s.caveBossDefeated,
            bossDefeated: s.bossDefeated,
            unlockedTalents: s.unlockedTalents,
            talentPoints: s.talentPoints,
            villageFrozen: s.villageFrozen,
            villageRestored: s.villageRestored,
            villageAllCleared: s.villageAllCleared || false,
            villageBossDefeated: s.villageBossDefeated || false,
            hellBossDefeated: s.hellBossDefeated || false,
            villageThriving: s.villageThriving || false,
            castleQuestDone: s.castleQuestDone || false,
            castleRoom: s.castleRoom || 0,
            castleBossDefeated: s.castleBossDefeated || false,
            castleKeyObtained: s.castleKeyObtained || false,
            castleRescued: s.castleRescued || false,
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
        s.mineUnlocked = data.mineUnlocked || false;
        s.mineBossDefeated = data.mineBossDefeated || false;
        s.hasSecretKey = data.hasSecretKey || false;
        s.caveBossDefeated = data.caveBossDefeated || false;
        s.bossDefeated = data.bossDefeated || false;
        s.villageFrozen = data.villageFrozen || false;
        s.villageRestored = data.villageRestored || false;
        s.villageAllCleared = data.villageAllCleared || false;
        s.villageBossDefeated = data.villageBossDefeated || false;
        s.hellBossDefeated = data.hellBossDefeated || false;
        s.villageThriving = data.villageThriving || false;
        s.castleQuestDone = data.castleQuestDone || false;
        s.castleRoom = data.castleRoom || 0;
        s.castleBossDefeated = data.castleBossDefeated || false;
        s.castleKeyObtained = data.castleKeyObtained || false;
        s.castleRescued = data.castleRescued || false;
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
