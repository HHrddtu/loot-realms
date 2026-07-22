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
