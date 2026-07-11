import { SYSTEM_QUESTS } from '../config/systemQuests.js';

const STORAGE_KEY = 'loot_realms_system_quests';

export class QuestTracker {
    constructor() {
        this.completed = this._load();
    }

    _load() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        } catch (e) {
            return [];
        }
    }

    _save() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.completed));
        } catch (e) {}
    }

    checkQuests(saveData) {
        let newCompletion = false;
        SYSTEM_QUESTS.forEach(quest => {
            if (this.completed.includes(quest.id)) return;
            if (saveData[quest.target]) {
                this.completed.push(quest.id);
                newCompletion = true;
            }
        });
        if (newCompletion) this._save();
        return newCompletion;
    }

    getProgress(saveData) {
        return SYSTEM_QUESTS.map(quest => ({
            ...quest,
            completed: this.completed.includes(quest.id) || !!saveData[quest.target]
        }));
    }

    isCompleted(questId) {
        return this.completed.includes(questId);
    }

    reset() {
        this.completed = [];
        this._save();
    }
}

let instance = null;

export function getQuestTracker() {
    if (!instance) instance = new QuestTracker();
    return instance;
}
