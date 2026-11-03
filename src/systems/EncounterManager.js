import { ENEMY_TYPES } from '../config/enemies.js';
import { getZoneEncounters } from '../config/encounters/index.js';
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
    ENCOUNTER_DEFAULT_SPREAD
} from '../config/encounters/settings.js';

export class EncounterManager {
    constructor(scene) {
        this.scene = scene;
        this.zone = null;
        this.snares = [];
    }

    loadZone(zone) {
        this.clear();
        this.zone = zone;
        this.scene._encounterSpeedMult = 1;
        const packs = getZoneEncounters(zone);
        packs.forEach(pack => {
            if (!pack.trigger || pack.trigger.type === 'onZoneEnter') {
                this._spawnPack(pack);
            }
        });
    }

    clear() {
        this.snares.forEach(snare => this._destroySnare(snare));
        this.snares = [];
        this.zone = null;
        if (this.scene) this.scene._encounterSpeedMult = 1;
    }

    update(time) {
        const s = this.scene;
        if (!s) return;
        if (this.snares.length === 0) {
            s._encounterSpeedMult = 1;
            return;
        }

        const now = Number.isFinite(time) ? time : (s.time ? s.time.now : 0);
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
            if (enemy) this._applyVariant(enemy, pack, entry);
        }
    }

    _applyVariant(enemy, pack, entry) {
        const st = enemy.stats;
        st.encounterId = pack.id;
        st.packId = pack.id;
        st.packName = pack.name;
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
