import { QUEST_DB, NPC_DB } from './config/index.js';
import { loadAccount, saveAccount, loadGame, saveGame } from './save.js';

let activeQuests = [];
let completedQuests = [];
let questProgress = {};
let _gameScene = null;

export function setGameScene(s) { _gameScene = s; }

export function initQuests() {
    const acc = loadAccount() || {};
    completedQuests = acc.completedQuests || [];
    const save = loadGame() || {};
    activeQuests = save.activeQuests || [];
    questProgress = save.questProgress || {};
}

export function saveQuests() {
    const acc = loadAccount() || {};
    acc.completedQuests = completedQuests;
    saveAccount(acc);
    const save = loadGame() || {};
    save.activeQuests = activeQuests;
    save.questProgress = questProgress;
    saveGame(save);
}

const ZONE_MAIN_QUESTS = {
    meadow: ['meadow_intro'],
    forest: ['kill_goblins'],
    arena: ['treant_boss'],
    mine: ['quest_mine'],
    cave: ['giant_bat_boss'],
    village: ['clear_village_camps', 'defeat_village_boss'],
    cemetery: ['clear_village_camps', 'defeat_village_boss'],
    depths: ['depths_catacombs', 'depths_throne'],
    cursed: ['cursed_swamp', 'cursed_heart'],
    shadow: ['shadow_stalkers', 'shadow_throne'],
    tower: ['tower_knights', 'tower_king'],
    throne: ['throne_final']
};

const ZONE_BOSS_QUEST_TARGETS = {
    arena: 'ancient_treant',
    mine: 'skeleton_lord',
    cave: 'giant_bat',
    village: 'purple_demon',
    cemetery: 'purple_demon',
    depths: 'lich_king',
    cursed: 'ancient_evil',
    shadow: 'shadow_king',
    tower: 'fallen_king',
    throne: 'eternity_lord'
};

// Linear progression used to distinguish "moving forward" from backtracking.
const ZONE_ORDER = [
    'meadow', 'forest', 'arena', 'mine', 'cave',
    'village', 'cemetery', 'hell', 'snowy', 'castle',
    'depths', 'cursed', 'desert', 'swamp', 'shadow', 'tower', 'throne'
];

// Optional side content is never locked behind the main quest gate.
const SIDE_ZONES = new Set(['hell', 'snowy', 'castle', 'desert', 'swamp']);

function getZoneMainQuestKeys(zoneKey) {
    const value = ZONE_MAIN_QUESTS[zoneKey];
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
}

function zoneOrderIndex(zoneKey) {
    const idx = ZONE_ORDER.indexOf(zoneKey);
    return idx === -1 ? Number.MAX_SAFE_INTEGER : idx;
}

function isZoneBossDefeated(zoneKey) {
    const s = _gameScene;
    if (!s || !s.zones) return false;
    const bossZoneKey = zoneKey === 'cemetery' ? 'village' : zoneKey;
    const zone = s.zones[bossZoneKey];
    return !!(zone && zone.bossDefeated);
}

export function autoAcceptZoneQuest(zoneKey) {
    let accepted = null;
    getZoneMainQuestKeys(zoneKey).forEach(qKey => {
        if (activeQuests.includes(qKey) || completedQuests.includes(qKey)) return;
        if (!acceptQuest(qKey)) return;
        if (!accepted) accepted = QUEST_DB[qKey] || null;
    });
    return accepted;
}

/**
 * Quest gate for zone transitions.
 * Blocks only forward transitions that are part of the main progression.
 * Backtracking, side zones and unavailable quests are never blocked so that
 * old saves cannot become soft-locked.
 */
export function checkZoneTransitionGate(fromZone, toZone) {
    if (!fromZone || !toZone || fromZone === toZone) return { blocked: false };
    if (SIDE_ZONES.has(toZone)) return { blocked: false };
    if (zoneOrderIndex(toZone) <= zoneOrderIndex(fromZone)) return { blocked: false };

    const bossTarget = ZONE_BOSS_QUEST_TARGETS[fromZone];
    if (!bossTarget) return { blocked: false };

    const qKey = getZoneMainQuestKeys(fromZone)
        .find(key => QUEST_DB[key] && QUEST_DB[key].target === bossTarget);
    if (!qKey) return { blocked: false };
    if (completedQuests.includes(qKey)) return { blocked: false };

    if (!activeQuests.includes(qKey) && !acceptQuest(qKey)) {
        return { blocked: false, unavailable: true, questKey: qKey };
    }
    if (isQuestComplete(qKey)) return { blocked: false };

    // Safety net for saves where the boss is already dead: grant the objective
    // instead of trapping the player behind an uncompletable quest.
    if (isZoneBossDefeated(fromZone)) {
        questProgress[qKey] = QUEST_DB[qKey].count;
        saveQuests();
        return { blocked: false, credited: true, questKey: qKey };
    }

    return {
        blocked: true,
        questKey: qKey,
        quest: QUEST_DB[qKey],
        npc: getQuestNpc(qKey),
        progress: getQuestProgress(qKey)
    };
}

export function getAvailableQuests(npcKey) {
    const npc = NPC_DB[npcKey];
    if (!npc || !npc.quests) return [];
    return npc.quests.filter(qKey => {
        const quest = QUEST_DB[qKey];
        if (!quest) return false;
        if (completedQuests.includes(qKey)) return false;
        if (activeQuests.includes(qKey)) return false;
        if (quest.prerequisite && !completedQuests.includes(quest.prerequisite)) return false;
        return true;
    });
}

export function getActiveQuests() {
    return activeQuests.map(qKey => {
        const quest = QUEST_DB[qKey];
        if (!quest) return null;
        return {
            key: qKey,
            ...quest,
            progress: questProgress[qKey] || 0
        };
    }).filter(Boolean);
}

export function acceptQuest(qKey) {
    if (activeQuests.includes(qKey)) return false;
    if (completedQuests.includes(qKey)) return false;
    const quest = QUEST_DB[qKey];
    if (!quest) return false;
    if (quest.prerequisite && !completedQuests.includes(quest.prerequisite)) return false;
    activeQuests.push(qKey);
    questProgress[qKey] = 0;
    saveQuests();
    return true;
}

export function onKill(enemyKey) {
    activeQuests.forEach(qKey => {
        const quest = QUEST_DB[qKey];
        if (!quest) return;
        if (quest.type === 'kill' && quest.target === enemyKey) {
            questProgress[qKey] = (questProgress[qKey] || 0) + 1;
        }
    });
}

export function onCollect(itemKey) {
    activeQuests.forEach(qKey => {
        const quest = QUEST_DB[qKey];
        if (!quest) return;
        if (quest.type === 'collect' && quest.target === itemKey) {
            questProgress[qKey] = (questProgress[qKey] || 0) + 1;
        }
    });
}

export function onExplore(zoneKey) {
    activeQuests.forEach(qKey => {
        const quest = QUEST_DB[qKey];
        if (!quest) return;
        if (quest.type === 'explore' && quest.target === zoneKey) {
            questProgress[qKey] = (questProgress[qKey] || 0) + 1;
        }
    });
}

export function onTalk(npcKey) {
    activeQuests.forEach(qKey => {
        const quest = QUEST_DB[qKey];
        if (!quest) return;
        if (quest.type === 'talk' && quest.target === npcKey) {
            questProgress[qKey] = (questProgress[qKey] || 0) + 1;
        }
    });
}

export function onEscortTick(npcKey, delta) {
    activeQuests.forEach(qKey => {
        const quest = QUEST_DB[qKey];
        if (!quest) return;
        if (quest.type === 'escort' && quest.target === npcKey) {
            questProgress[qKey] = (questProgress[qKey] || 0) + delta;
        }
    });
}

export function isQuestComplete(qKey) {
    const quest = QUEST_DB[qKey];
    if (!quest) return false;
    return (questProgress[qKey] || 0) >= quest.count;
}

export function completeQuest(qKey) {
    if (!activeQuests.includes(qKey)) return null;
    if (!isQuestComplete(qKey)) return null;
    const quest = QUEST_DB[qKey];
    if (!quest) return null;
    const s = _gameScene;

    const rewardType = quest.rewardType || 'item';
    const rewardVal = quest.rewardValue || null;

    switch (rewardType) {
        case 'pet_unlock':
            if (rewardVal && s.addPet) s.addPet(rewardVal);
            break;
        case 'slot_unlock':
            if (s.increaseSlots) s.increaseSlots(rewardVal || 1);
            break;
        case 'vendor_access':
            if (s.unlockVendor) s.unlockVendor(rewardVal || 'blacksmith');
            break;
        case 'item':
            if (quest.rewardItems) {
                quest.rewardItems.forEach(itemId => {
                    const fromDb = [...(s.constructor?.EQUIP_DB || []), ...(s.constructor?.MATERIAL_DB || [])].find(i => i.id === itemId);
                    if (fromDb && s.addEquip) s.addEquip({ ...fromDb, type: 'equip' });
                });
            }
            break;
    }

    activeQuests = activeQuests.filter(k => k !== qKey);
    completedQuests.push(qKey);
    delete questProgress[qKey];
    saveQuests();
    return quest.rewards;
}

export function getQuestProgress(qKey) {
    const quest = QUEST_DB[qKey];
    if (!quest) return { current: 0, total: 0 };
    return {
        current: questProgress[qKey] || 0,
        total: quest.count
    };
}

export function hasActiveQuest(qKey) {
    return activeQuests.includes(qKey);
}

export function isQuestCompleted(qKey) {
    return completedQuests.includes(qKey);
}

export function getCompletedQuestCount() {
    return completedQuests.length;
}

export function getQuestNpc(qKey) {
    for (const [npcKey, npc] of Object.entries(NPC_DB)) {
        if (npc.quests && npc.quests.includes(qKey)) return { key: npcKey, ...npc };
    }
    return null;
}

export function getCompletedQuests() {
    return [...completedQuests];
}

export function getNpcQuestStatus(npcKey) {
    const npc = NPC_DB[npcKey];
    if (!npc) return 'none';
    const available = getAvailableQuests(npcKey);
    if (available.length > 0) return 'quest_available';
    const active = (npc.quests || []).filter(qKey => activeQuests.includes(qKey));
    const completable = active.filter(qKey => isQuestComplete(qKey));
    if (completable.length > 0) return 'quest_complete';
    if (active.length > 0) return 'quest_in_progress';
    return 'no_quests';
}
