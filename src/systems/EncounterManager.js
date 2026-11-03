import { ENEMY_TYPES } from '../config/enemies.js';
import { getZoneApex, getZoneEncounters } from '../config/encounters/index.js';
import { rollZoneEquip } from '../utils.js';
import {
    ENCOUNTER_SNARE_SPEED_MULT,
    ENCOUNTER_SNARE_RADIUS,
    ENCOUNTER_SNARE_ARM_MS,
    ENCOUNTER_SNARE_LIFETIME_MS,
    ENCOUNTER_SNARE_MAX,
    ENCOUNTER_SPLIT_COUNT,
    ENCOUNTER_SPLIT_RADIUS,
    ENCOUNTER_SPLIT_SPEED,
    ENCOUNTER_SPLIT_HP_MULT,
    ENCOUNTER_SPLIT_DMG_MULT,
    ENCOUNTER_SPLIT_EXP_MULT,
    ENCOUNTER_SPLIT_SCALE_MULT,
    ENCOUNTER_DEFAULT_SPREAD,
    ENCOUNTER_APEX_AURA_RADIUS,
    ENCOUNTER_APEX_SUMMON_RADIUS,
    ENCOUNTER_APEX_ENRAGE_HP,
    ENCOUNTER_APEX_ENRAGE_DMG_MULT,
    ENCOUNTER_APEX_ENRAGE_SPEED_MULT
} from '../config/encounters/settings.js';

export class EncounterManager {
    constructor(scene) {
        this.scene = scene;
        this.zone = null;
        this.snares = [];
        this.packEnemies = [];
        this.pendingPacks = [];
        this.apexConfig = null;
        this.apex = null;
        this.apexAura = null;
        this.apexSpawned = false;
        this.apexDefeated = false;
        this.huntComplete = false;
    }

    loadZone(zone) {
        this.clear();
        this.zone = zone;
        this.scene._encounterSpeedMult = 1;
        this.apexConfig = getZoneApex(zone);
        this.huntComplete = !this.apexConfig;
        const packs = getZoneEncounters(zone);
        packs.forEach(pack => {
            if (!pack.trigger || pack.trigger.type === 'onZoneEnter') {
                this._spawnPack(pack);
            } else if (pack.trigger.type === 'onProximity') {
                this.pendingPacks.push(pack);
            } else {
                this._spawnPack(pack);
            }
        });
    }

    clear() {
        this.snares.forEach(snare => this._destroySnare(snare));
        this.snares = [];
        this._destroyApexAura();
        this.packEnemies = [];
        this.pendingPacks = [];
        this.apexConfig = null;
        this.apex = null;
        this.apexSpawned = false;
        this.apexDefeated = false;
        this.huntComplete = false;
        this.zone = null;
        if (this.scene) this.scene._encounterSpeedMult = 1;
    }

    update(time, delta) {
        const s = this.scene;
        if (!s) return;
        const now = Number.isFinite(time) ? time : (s.time ? s.time.now : 0);
        this._updatePacks();
        this._updateSnares(now);
        this._updateApex(Number.isFinite(delta) ? delta : 0);
    }

    getHuntStatus() {
        if (!this.apexConfig) return { complete: true, text: 'Hunt clear', short: 'Hunt clear' };
        if (this.huntComplete) return { complete: true, text: 'Hunt complete', short: 'Hunt complete' };
        if (!this.apexSpawned) {
            const activePacks = new Set(
                this.packEnemies
                    .filter(e => e && e.active && e.stats && e.stats.hp > 0)
                    .map(e => e.stats.packId)
            );
            const packsLeft = this.pendingPacks.length + activePacks.size;
            return { complete: false, packsLeft, text: 'Hunt: ' + packsLeft + ' packs', short: 'Hunt: ' + packsLeft + ' packs' };
        }
        return { complete: false, apex: true, text: 'Apex: ' + this.apexConfig.name, short: 'Apex: ' + this.apexConfig.name };
    }

    _updatePacks() {
        if (this.pendingPacks.length === 0) return;
        const player = this.scene.player;
        if (!player) return;

        const remaining = [];
        for (const pack of this.pendingPacks) {
            const trigger = pack.trigger;
            const dx = player.x - (trigger.x ?? 0);
            const dy = player.y - (trigger.y ?? 0);
            const radius = trigger.radius ?? 200;
            if (dx * dx + dy * dy <= radius * radius) {
                this._spawnPack(pack);
            } else {
                remaining.push(pack);
            }
        }
        this.pendingPacks = remaining;
    }

    _updateSnares(now) {
        const s = this.scene;
        if (this.snares.length === 0) {
            s._encounterSpeedMult = 1;
            return;
        }

        this.snares = this.snares.filter(snare => {
            if (now >= snare.expiresAt) {
                this._destroySnare(snare);
                return false;
            }
            return true;
        });

        let slowed = false;
        const player = s.player;
        if (player) {
            for (const snare of this.snares) {
                if (now < snare.armedAt) continue;
                const dx = player.x - snare.x;
                const dy = player.y - snare.y;
                if (Math.sqrt(dx * dx + dy * dy) <= snare.radius) {
                    slowed = true;
                    if (!snare.triggered) {
                        snare.triggered = true;
                        if (s.floatingText) s.floatingText(player.x, player.y - 30, 'SNARED!', '#9acd32');
                    }
                }
            }
        }
        s._encounterSpeedMult = slowed ? ENCOUNTER_SNARE_SPEED_MULT : 1;
    }

    _updateApex(delta) {
        if (!this.apexConfig) return;
        if (!this.apexSpawned) {
            if (this.pendingPacks.length === 0 && this.packEnemies.length > 0 && this._packMobsRemaining() === 0) {
                this._spawnApex();
            }
            return;
        }
        if (this.apexDefeated) return;

        const apex = this.apex;
        if (!apex || !apex.active || (apex.stats && apex.stats.hp <= 0)) {
            this._onApexDefeated();
            return;
        }

        if (this.apexAura) {
            this.apexAura.x = apex.x;
            this.apexAura.y = apex.y;
        }

        const st = apex.stats;
        if (!st.enraged && st.hp / st.maxHp <= ENCOUNTER_APEX_ENRAGE_HP) {
            st.enraged = true;
            st.damage = Math.floor(st.damage * ENCOUNTER_APEX_ENRAGE_DMG_MULT);
            st.speed = Math.floor((st.speed || 50) * ENCOUNTER_APEX_ENRAGE_SPEED_MULT);
            if (apex.setTint) apex.setTint(0xff4444);
            if (this.scene.floatingText) this.scene.floatingText(apex.x, apex.y - 50, 'ENRAGED!', '#ff4444');
        }

        st.summonTimer = (st.summonTimer || 0) + delta;
        if (st.summonTimer >= this.apexConfig.summonInterval && (st.summonCount || 0) < this.apexConfig.summonMax) {
            st.summonTimer = 0;
            this._summonApexMinions(apex);
        }
    }

    _spawnApex() {
        const s = this.scene;
        const cfg = this.apexConfig;
        if (!s || !cfg || !s.combat) return;
        const base = this._baseType(cfg.key);
        if (!base) return;

        const x = cfg.x ?? 400;
        const y = cfg.y ?? 150;
        const apex = s.combat.makeEnemy(base, x, y);
        if (!apex) return;

        const st = apex.stats;
        st.name = cfg.name;
        st.role = 'trapper';
        st.telegraphed = false;
        st.isElite = true;
        st.isApex = true;
        st.isPackMob = false;
        st.encounterId = cfg.id;
        st.packId = cfg.id;
        st.snareInterval = cfg.snareInterval;
        st.summonTimer = 0;
        st.summonCount = 0;
        st.maxHp = Math.max(1, Math.floor(st.maxHp * cfg.hpMult));
        st.hp = st.maxHp;
        st.damage = Math.max(1, Math.floor(st.damage * cfg.dmgMult));
        st.exp = Math.max(1, Math.floor(st.exp * cfg.expMult));
        apex.setScale(cfg.scale);
        if (apex.setTint) apex.setTint(0xff8844);

        this.apex = apex;
        this.apexSpawned = true;
        if (s.add && s.add.circle) {
            this.apexAura = s.add.circle(x, y, ENCOUNTER_APEX_AURA_RADIUS, 0xff8844, 0.14).setDepth(1);
            if (s.tweens) {
                s.tweens.add({
                    targets: this.apexAura,
                    scaleX: 1.2,
                    scaleY: 1.2,
                    alpha: 0.3,
                    duration: 600,
                    yoyo: true,
                    repeat: -1
                });
            }
        }
        if (s.floatingText) s.floatingText(x, y - 60, 'APEX: ' + cfg.name, '#ff8844');
    }

    _summonApexMinions(apex) {
        const s = this.scene;
        const cfg = this.apexConfig;
        if (!s || !cfg || !s.combat || !apex) return;
        const base = this._baseType('goblin');
        if (!base) return;

        const st = apex.stats;
        const count = Math.min(cfg.summonCount, cfg.summonMax - (st.summonCount || 0));
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / Math.max(1, count);
            const child = s.combat.makeEnemy(
                base,
                apex.x + Math.cos(angle) * ENCOUNTER_APEX_SUMMON_RADIUS,
                apex.y + Math.sin(angle) * ENCOUNTER_APEX_SUMMON_RADIUS
            );
            if (!child) continue;
            child.stats.name = 'Snarechief Goblin';
            child.stats.isPackMob = false;
            child.stats.isSummon = true;
            child.stats.telegraphed = true;
            child.stats.encounterId = cfg.id;
            child.stats.packId = cfg.id;
        }
        st.summonCount = (st.summonCount || 0) + count;
        if (s.floatingText) s.floatingText(apex.x, apex.y - 45, 'REINFORCEMENTS!', '#ff8844');
    }

    _onApexDefeated() {
        if (this.apexDefeated) return;
        const cfg = this.apexConfig;
        const s = this.scene;
        this.apexDefeated = true;
        this.huntComplete = true;
        this.apex = null;
        this._destroyApexAura();
        if (!s || !cfg) return;

        const px = s.player ? s.player.x : cfg.x;
        const py = s.player ? s.player.y : cfg.y;
        if (s.floatingText) s.floatingText(px, py - 60, 'HUNT COMPLETE: ' + cfg.name, '#ff8844');
        if (cfg.rewardGold) s.gold = (s.gold || 0) + cfg.rewardGold;
        const item = rollZoneEquip('forest');
        if (item && s.addEquip && s.addEquip(item) && s.floatingText) {
            s.floatingText(px, py - 78, '+' + item.name, '#3498db');
        }
        if (s.recalcStats) s.recalcStats();
        if (s.ui && s.ui.updateUI) s.ui.updateUI();
    }

    _packMobsRemaining() {
        return this.packEnemies.filter(e => e && e.active && e.stats && e.stats.hp > 0).length;
    }

    _destroyApexAura() {
        if (this.apexAura) {
            this.apexAura.destroy();
            this.apexAura = null;
        }
    }

    spawnSnare(x, y) {
        const s = this.scene;
        if (!s || !s.player || s.transitioning || s.menuOpen) return null;
        if (!s.add || !s.add.circle) return null;
        if (this.snares.length >= ENCOUNTER_SNARE_MAX) {
            const oldest = this.snares.shift();
            this._destroySnare(oldest);
        }

        const now = s.time ? s.time.now : 0;
        const visual = s.add.circle(x, y, ENCOUNTER_SNARE_RADIUS, 0x9acd32, 0.16).setDepth(2);
        let ring = null;
        if (visual.setStrokeStyle) {
            ring = s.add.circle(x, y, ENCOUNTER_SNARE_RADIUS, 0, 0).setStrokeStyle(2, 0x9acd32, 0.85).setDepth(2);
        }
        if (s.tweens && (ring || visual)) {
            s.tweens.add({
                targets: ring || visual,
                scaleX: 1.15,
                scaleY: 1.15,
                alpha: 0.5,
                duration: 300,
                yoyo: true,
                repeat: -1
            });
        }

        const snare = {
            x,
            y,
            radius: ENCOUNTER_SNARE_RADIUS,
            armedAt: now + ENCOUNTER_SNARE_ARM_MS,
            expiresAt: now + ENCOUNTER_SNARE_LIFETIME_MS,
            visuals: [visual, ring].filter(Boolean),
            triggered: false
        };
        this.snares.push(snare);
        if (s.floatingText) s.floatingText(x, y - 30, 'SNARE!', '#9acd32');
        return snare;
    }

    handleSplit(enemy) {
        const s = this.scene;
        if (!s || !s.combat || !enemy || !enemy.stats || enemy.stats.isSpawn) return [];
        const base = this._baseType(enemy.stats.key);
        if (!base) return [];

        const children = [];
        for (let i = 0; i < ENCOUNTER_SPLIT_COUNT; i++) {
            const angle = (Math.PI * 2 * i) / ENCOUNTER_SPLIT_COUNT;
            const x = enemy.x + Math.cos(angle) * ENCOUNTER_SPLIT_RADIUS;
            const y = enemy.y + Math.sin(angle) * ENCOUNTER_SPLIT_RADIUS;
            const child = s.combat.makeEnemy(base, x, y);
            if (!child) continue;

            const st = child.stats;
            st.name = 'Slime Spawn';
            st.isSpawn = true;
            st.splitOnDeath = false;
            st.isElite = false;
            st.role = 'dps';
            st.telegraphed = true;
            st.speed = ENCOUNTER_SPLIT_SPEED;
            st.maxHp = Math.max(1, Math.floor(enemy.stats.maxHp * ENCOUNTER_SPLIT_HP_MULT));
            st.hp = st.maxHp;
            st.damage = Math.max(1, Math.floor(enemy.stats.damage * ENCOUNTER_SPLIT_DMG_MULT));
            st.exp = Math.max(1, Math.floor(enemy.stats.exp * ENCOUNTER_SPLIT_EXP_MULT));
            st.encounterId = enemy.stats.encounterId;
            st.packId = enemy.stats.packId;
            child.setScale((enemy.scaleX || 1) * ENCOUNTER_SPLIT_SCALE_MULT);
            if (child.setTint) child.setTint(0x7dff8a);
            children.push(child);
        }

        if (children.length && s.floatingText) {
            s.floatingText(enemy.x, enemy.y - 30, 'SPLIT!', '#7dff8a');
        }
        return children;
    }

    _spawnPack(pack) {
        if (!pack || !Array.isArray(pack.enemies)) return;
        pack.enemies.forEach(entry => this._spawnEntry(pack, entry));
        if (this.scene.floatingText && pack.name) {
            const x = pack.trigger && pack.trigger.x !== undefined ? pack.trigger.x : 400;
            const y = pack.trigger && pack.trigger.y !== undefined ? pack.trigger.y : 150;
            this.scene.floatingText(x, y - 60, pack.name.toUpperCase(), '#ffd166');
        }
    }

    _spawnEntry(pack, entry) {
        const s = this.scene;
        if (!s || !s.combat) return;
        const base = this._baseType(entry.key);
        if (!base) return;
        const count = entry.count || 1;
        const spread = entry.spread ?? ENCOUNTER_DEFAULT_SPREAD;
        const originX = entry.x ?? 0;
        const originY = entry.y ?? 0;

        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count;
            const radius = count === 1 ? 0 : spread;
            const x = originX + Math.cos(angle) * radius;
            const y = originY + Math.sin(angle) * radius;
            const enemy = s.combat.makeEnemy(base, x, y);
            if (enemy) {
                this._applyVariant(enemy, pack, entry);
                this.packEnemies.push(enemy);
            }
        }
    }

    _applyVariant(enemy, pack, entry) {
        const st = enemy.stats;
        st.encounterId = pack.id;
        st.packId = pack.id;
        st.packName = pack.name;
        st.isPackMob = true;
        if (entry.name) st.name = entry.name;
        if (entry.role) st.role = entry.role;
        if (entry.telegraphed !== undefined) st.telegraphed = entry.telegraphed;
        if (entry.speed) st.speed = entry.speed;
        if (entry.hpMult) {
            st.maxHp = Math.max(1, Math.floor(st.maxHp * entry.hpMult));
            st.hp = st.maxHp;
        }
        if (entry.dmgMult) st.damage = Math.max(1, Math.floor(st.damage * entry.dmgMult));
        if (entry.expMult) st.exp = Math.max(1, Math.floor(st.exp * entry.expMult));
        if (entry.scale) enemy.setScale(entry.scale);
        if (entry.tint && enemy.setTint) enemy.setTint(entry.tint);
        if (entry.isElite) st.isElite = true;
        if (entry.splitOnDeath) st.splitOnDeath = true;
        if (entry.role === 'trapper') st.snareTimer = 0;
    }

    _baseType(key) {
        return ENEMY_TYPES.find(t => t.key === key) || null;
    }

    _destroySnare(snare) {
        if (!snare || !snare.visuals) return;
        snare.visuals.forEach(visual => {
            if (visual && visual.destroy) visual.destroy();
        });
    }
}
