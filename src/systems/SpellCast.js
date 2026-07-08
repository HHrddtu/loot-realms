import { CORRUPTION } from '../config/index.js';

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

    _updateCorruption() {
        if (this.scene.corruption > 0) {
            const decay = this.scene.classStats ? this.scene.classStats.corruptionDecay : CORRUPTION.decayRate;
            this.scene.corruption = Math.max(0, this.scene.corruption - decay);
        }
        if (this.scene.corruption >= this.scene.corruptionMax) {
            const rotDmg = this.scene.classStats ? this.scene.classStats.corruptionDmg : CORRUPTION.rotDmg;
            this.scene.takeDamage(rotDmg);
            this.scene.player.setTint(0x9b59b6);
        }
    }

    _getClassSpells() {
        const defaults = {
            alchemist: { q: 'acid_flask', w: 'toxic_puddle', e: 'burrow', r: 'chemical_cloud' },
            angel: { q: 'soul_strike', w: 'holy_shield', e: 'holy_nova', r: 'divine_blessing' },
            sage: { q: 'fireball', w: 'shield', e: 'heal', r: 'meteor' }
        };
        const cls = this.scene.classKey || 'sage';
        const d = defaults[cls] || defaults.sage;
        const saved = this.scene.spellAssignments || {};
        return {
            q: saved.q || d.q, w: saved.w || d.w,
            e: saved.e || d.e, r: saved.r || d.r
        };
    }

    _updateTimers(dt) {
        ['fireball', 'shield', 'heal', 'purify', 'meteor', 'chemical_cloud', 'divine_blessing',
         'acid_flask', 'iron_skin', 'healing_potion', 'life_link', 'soul_strike',
         'toxic_puddle', 'burrow', 'holy_shield', 'holy_nova'].forEach(k => {
            if (this.scene.spellCooldowns[k] > 0) {
                this.scene.spellCooldowns[k] = Math.max(0, this.scene.spellCooldowns[k] - dt);
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
