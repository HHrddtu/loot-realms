import { PRESTIGE_CONFIG } from '../config/prestige.js';

export class PrestigeSystem {
    constructor(scene) {
        this.scene = scene;
    }

    getLevel() {
        return this.scene.prestigeLevel || 0;
    }

    getModifiers() {
        const level = this.getLevel();
        return PRESTIGE_CONFIG.modifiers.filter(m => m.level <= level);
    }

    getEnemyHpMultiplier() {
        const level = this.getLevel();
        return Math.pow(PRESTIGE_CONFIG.enemyHpMultiplier, level);
    }

    getEnemyDmgMultiplier() {
        const level = this.getLevel();
        return Math.pow(PRESTIGE_CONFIG.enemyDmgMultiplier, level);
    }

    getLootBonus() {
        const level = this.getLevel();
        return 1 + level * PRESTIGE_CONFIG.lootBonusPerLevel;
    }

    getExpBonus() {
        const level = this.getLevel();
        return 1 + level * PRESTIGE_CONFIG.expBonusPerLevel;
    }

    applyModifiers() {
        const s = this.scene;
        const mods = this.getModifiers();
        mods.forEach(mod => {
            const e = mod.effect;
            if (e.hpMult) s.playerMaxHP = Math.floor(s.playerMaxHP * e.hpMult);
            if (e.dmgMult) s.playerDamage = Math.floor(s.playerDamage * e.dmgMult);
            if (e.speedBonus) s.playerSpeed = Math.floor(s.playerSpeed * (1 + e.speedBonus));
            if (e.allStatsBonus) {
                s.playerMaxHP = Math.floor(s.playerMaxHP * (1 + e.allStatsBonus));
                s.playerDamage = Math.floor(s.playerDamage * (1 + e.allStatsBonus));
                s.playerSpeed = Math.floor(s.playerSpeed * (1 + e.allStatsBonus));
            }
        });
    }

    activatePrestige() {
        const s = this.scene;
        const currentLevel = this.getLevel();
        if (currentLevel >= PRESTIGE_CONFIG.maxLevel) return false;

        s.prestigeLevel = currentLevel + 1;

        const hpMult = this.getEnemyHpMultiplier();
        const dmgMult = this.getEnemyDmgMultiplier();
        s.diffMulti = {
            hp: (s.diffMulti.hp || 1) * hpMult,
            dmg: (s.diffMulti.dmg || 1) * dmgMult,
            exp: s.diffMulti.exp || 1
        };

        s.recalcStats();
        this.applyModifiers();
        s.playerHP = s.playerMaxHP;

        s.doSave();
        return true;
    }

    getNextModifier() {
        const level = this.getLevel();
        return PRESTIGE_CONFIG.modifiers.find(m => m.level === level + 1) || null;
    }

    canPrestige() {
        return this.scene.prestigeUnlocked === true && this.getLevel() < PRESTIGE_CONFIG.maxLevel;
    }

    getZoneModifiers(zoneKey) {
        const level = this.getLevel();
        const mods = [];
        if (level >= 2) {
            if (zoneKey === 'mine') mods.push({ type: 'darkness', mult: 1.5, desc: 'Deeper darkness' });
            if (zoneKey === 'forest') mods.push({ type: 'poison_puddles', count: 3, desc: 'Poison puddles' });
        }
        if (level >= 3) {
            if (zoneKey === 'hell') mods.push({ type: 'lava_damage', mult: 1.5, desc: 'Deadlier lava' });
            if (zoneKey === 'cave') mods.push({ type: 'swarm_bonus', mult: 1.3, desc: 'Stronger swarms' });
        }
        if (level >= 5) {
            if (zoneKey === 'village') mods.push({ type: 'wave_bonus', count: 3, desc: 'Extra waves' });
            if (zoneKey === 'castle') mods.push({ type: 'patrol_speed', mult: 1.4, desc: 'Faster patrols' });
        }
        if (level >= 7) {
            if (zoneKey === 'shadow') mods.push({ type: 'more_invisible', count: 2, desc: 'More invisible enemies' });
            if (zoneKey === 'tower') mods.push({ type: 'boss_shield', duration: 5000, desc: 'Boss has shield phase' });
        }
        return mods;
    }

    applyZoneModifiers(zoneKey) {
        const s = this.scene;
        const mods = this.getZoneModifiers(zoneKey);
        mods.forEach(mod => {
            if (mod.type === 'darkness' && s.mineDarkness) {
                s.mineDarkness.setAlpha(Math.min(0.95, s.mineDarkness.alpha * mod.mult));
            }
            if (mod.type === 'lava_damage') {
                s._prestigeLavaMult = mod.mult;
            }
            if (mod.type === 'wave_bonus') {
                s._prestigeWaveBonus = mod.count;
            }
        });
    }
}
