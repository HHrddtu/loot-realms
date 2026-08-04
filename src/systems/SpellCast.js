import { CORRUPTION } from '../config/index.js';
import { SPELLS } from '../config/index.js';

export class SpellCast {
    constructor(scene) {
        this.scene = scene;

        // Spell state (moved from GameScene)
        this.cooldowns = { fireball: 0, shield: 0, heal: 0 };
        this.shieldActive = false;
        this.shieldHP = 0;
        this.shieldTimer = 0;
        this.shieldVfx = null;
        this.lifeLinkActive = false;
        this.lifeLinkTimer = 0;
        this.lifeLinkHealPerSec = 0;
        this.divineBlessingTimer = 0;
        this.divineBlessingDmgBuff = 0;
        this.divineBlessingDefBuff = 0;
    }

    /** Sync state to scene for backward compatibility */
    syncToScene() {
        const s = this.scene;
        s.spellCooldowns = this.cooldowns;
        s.shieldActive = this.shieldActive;
        s.shieldHP = this.shieldHP;
        s.shieldTimer = this.shieldTimer;
        s.shieldVfx = this.shieldVfx;
        s.lifeLinkActive = this.lifeLinkActive;
        s.lifeLinkTimer = this.lifeLinkTimer;
        s.lifeLinkHealPerSec = this.lifeLinkHealPerSec;
        s._divineBlessingTimer = this.divineBlessingTimer;
        s._divineBlessingDmgBuff = this.divineBlessingDmgBuff;
        s._divineBlessingDefBuff = this.divineBlessingDefBuff;
    }

    _updateCorruption(delta) {
        const s = this.scene;
        const dt = Math.min(delta / 1000, 0.1);
        if (s.corruption > 0) {
            const decay = s.classStats ? s.classStats.corruptionDecay : CORRUPTION.decayRate;
            s.corruption = Math.max(0, s.corruption - decay * dt * 60);
        }
        if (s.corruption >= s.corruptionMax) {
            this._rotTick = (this._rotTick || 0) - delta;
            if (this._rotTick <= 0) {
                this._rotTick = 1000;
                const rotDmg = s.classStats ? s.classStats.corruptionDmg : CORRUPTION.rotDmg;
                if (s.player && s.player.active) {
                    s.takeDamage(rotDmg);
                    s.player.setTint(0x9b59b6);
                    s.time.delayedCall(200, () => { if (s.player && s.player.active) s.player.clearTint(); });
                    s.floatingText(s.player.x, s.player.y - 30, 'ROT -' + rotDmg, '#9b59b6');
                }
            }
        } else {
            this._rotTick = 0;
        }
    }

    /** Get all spells available to a class at a given level */
    getAvailableSpells(classKey, level) {
        const available = [];
        Object.values(SPELLS).forEach(spell => {
            if (spell.unlockLevel && spell.unlockLevel <= level) {
                available.push(spell);
            }
        });
        return available;
    }

    /** Get default spells for a class */
    _getDefaultSpells(cls) {
        const defaults = {
            alchemist: { q: 'acid_flask', w: 'toxic_puddle', e: 'burrow', r: 'chemical_cloud' },
            angel: { q: 'soul_strike', w: 'holy_shield', e: 'holy_nova', r: 'divine_blessing' },
            sage: { q: 'fireball', w: 'shield', e: 'heal', r: 'meteor' }
        };
        return defaults[cls] || defaults.sage;
    }

    _getClassSpells() {
        const cls = this.scene.classKey || 'sage';
        const d = this._getDefaultSpells(cls);
        const saved = this.scene.spellAssignments || {};
        return {
            q: saved.q || d.q, w: saved.w || d.w,
            e: saved.e || d.e, r: saved.r || d.r
        };
    }

    _updateTimers(dt) {
        const cdrMult = this.scene.computedCooldownReduction ? 1 + this.scene.computedCooldownReduction / 100 : 1;
        const effectiveDt = dt * cdrMult;
        const allSpellKeys = Object.keys(SPELLS);
        allSpellKeys.forEach(k => {
            if (this.scene.spellCooldowns[k] > 0) {
                this.scene.spellCooldowns[k] = Math.max(0, this.scene.spellCooldowns[k] - effectiveDt);
            }
        });

        const allEnemies = [
            ...(this.scene.enemies && this.scene.enemies.scene ? this.scene.enemies.getChildren() : []),
            ...(this.scene.villageZombies && this.scene.villageZombies.scene ? this.scene.villageZombies.getChildren() : []),
            ...(this.scene.hellImps && this.scene.hellImps.scene ? this.scene.hellImps.getChildren() : []),
            ...(this.scene.caveSmallBats && this.scene.caveSmallBats.scene ? this.scene.caveSmallBats.getChildren() : [])
        ];
        allEnemies.forEach(e => {
            if (e.active && e.armorShredTimer && e.armorShredTimer > 0) {
                e.armorShredTimer -= dt;
                if (e.armorShredTimer <= 0) { e.armorShredStacks = 0; e.armorShredTimer = 0; }
            }
        });

        if (this.scene.shieldActive) {
            this.scene.shieldTimer -= dt;
            if (this.scene.shieldVfx) {
                this.scene.shieldVfx.x = this.scene.player.x;
                this.scene.shieldVfx.y = this.scene.player.y;
            }
            if (this.scene.shieldTimer <= 0 || this.scene.shieldHP <= 0) {
                this.scene.shieldActive = false;
                this.scene.shieldHP = 0;
                this.scene.lifeLinkActive = false;
                if (this.scene.shieldVfx) { this.scene.shieldVfx.destroy(); this.scene.shieldVfx = null; }
                if (this.scene.shieldGlow) { this.scene.shieldGlow.destroy(); this.scene.shieldGlow = null; }
            }
        }

        if (this.scene.lifeLinkActive && this.scene.lifeLinkTimer > 0) {
            this.scene.lifeLinkTimer -= dt;
            if (this.scene.lifeLinkTimer <= 0) {
                this.scene.lifeLinkActive = false;
            } else {
                const healAmt = Math.floor(this.scene.playerMaxHP * this.scene.lifeLinkHealPerSec * dt);
                if (healAmt > 0) {
                    this.scene.playerHP = Math.min(this.scene.playerMaxHP, this.scene.playerHP + healAmt);
                }
            }
        }

        if (this.scene._divineBlessingTimer && this.scene._divineBlessingTimer > 0) {
            this.scene._divineBlessingTimer -= dt;
            if (this.scene._divineBlessingTimer <= 0) {
                this.scene._divineBlessingDmgBuff = 0;
                this.scene._divineBlessingDefBuff = 0;
                this.scene._divineBlessingTimer = 0;
            }
        }
    }
}
