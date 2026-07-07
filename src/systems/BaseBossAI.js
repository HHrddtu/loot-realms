import Phaser from 'phaser';
import { BossAI } from './BossAI.js';

/**
 * Base boss AI with common state machine and phase transitions.
 * Subclasses override: _pickAttack(), _executeAttack(), _getPhaseText()
 */
export class BaseBossAI {
    constructor(scene, zone, config) {
        this.scene = scene;
        this.zone = zone;
        this.config = config; // { bossRef, nameTextRef, color, animKey }
    }

    /** Get the boss sprite from scene */
    get boss() {
        return this.scene[this.config.bossRef];
    }

    /** Get name text from scene */
    get nameText() {
        return this.scene[this.config.nameTextRef];
    }

    /**
     * Common update loop. Call from zone.update().
     * @param {number} delta - frame delta
     */
    update(delta) {
        const s = this.scene;
        const b = this.boss;
        if (!b || !b.active) return;
        const st = b.stats;

        // Update HP bar
        BossAI.updateHpBar(b, {
            x: b.x, y: b.y - 50,
            nameText: this.nameText, nameYOffset: -10
        });

        // Paused
        if (s.menuOpen || s.transitioning) {
            b.body.setVelocity(0);
            return;
        }

        // Transitioning/invulnerable
        if (st.transitioning || st.invulnerable) {
            b.body.setVelocity(0);
            return;
        }

        // Phase check
        const hpPct = st.hp / st.maxHp;
        if (hpPct <= 0.3 && st.phase !== 3) {
            st.phase = 3;
            this._phaseTransition(b);
            return;
        }
        if (hpPct <= 0.6 && st.phase !== 2) {
            st.phase = 2;
            this._phaseTransition(b);
            return;
        }

        // State machine
        this._updateStateMachine(b, delta);
    }

    _updateStateMachine(boss, delta) {
        const s = this.scene;
        const st = boss.stats;

        if (st.aiState === 'telegraph') {
            boss.body.setVelocity(0);
            st.telegraphTimer -= delta;
            if (st.telegraphTimer <= 0) this._executeAttack(boss);
            return;
        }

        if (st.aiState === 'attacking') {
            boss.body.setVelocity(0);
            st.attackDuration -= delta;
            if (st.attackDuration <= 0) {
                st.aiState = 'cooldown';
                st.cooldownTimer = 800;
                if (boss.telegraph) { boss.telegraph.destroy(); boss.telegraph = null; }
            }
            return;
        }

        if (st.aiState === 'cooldown') {
            boss.body.setVelocity(0);
            st.cooldownTimer -= delta;
            if (st.cooldownTimer <= 0) st.aiState = 'chase';
            return;
        }

        // Chase
        this._chase(boss);
        this._tickTimers(boss, delta);
        this._tryAttack(boss);
    }

    _chase(boss) {
        const s = this.scene;
        const st = boss.stats;
        const dx = s.player.x - boss.x;
        const dy = s.player.y - boss.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const speed = st.phase === 3 ? st.baseSpeed * 1.2 : st.baseSpeed;

        if (dist > 30) {
            boss.body.setVelocity((dx / dist) * speed, (dy / dist) * speed);
            if (this.config.animKey && s.anims.exists(this.config.animKey) && !boss.anims.isPlaying) {
                boss.play(this.config.animKey);
            }
            boss.setFlipX(dx < 0);
        } else {
            boss.body.setVelocity(0);
        }
    }

    _tickTimers(boss, delta) {
        const st = boss.stats;
        st.attackTimer -= delta;
        // Subclasses add more timers
    }

    _tryAttack(boss) {
        const st = boss.stats;
        if (st.attackTimer <= 0) {
            const attack = this._pickAttack(boss);
            if (attack) {
                this._telegraph(boss, attack);
            } else {
                st.attackTimer = 800;
            }
        }
    }

    _telegraph(boss, attackType) {
        const st = boss.stats;
        st.aiState = 'telegraph';
        st.currentAttack = attackType;
        st.telegraphTimer = 500;
        boss.body.setVelocity(0);
        if (boss.telegraph) { boss.telegraph.destroy(); boss.telegraph = null; }
        st.attackTimer = 3000;
    }

    _phaseTransition(boss) {
        const phaseText = this._getPhaseText(boss.stats.phase);
        BossAI.phaseTransition(this.scene, boss, phaseText, this.config.color);
    }

    /** Override in subclass */
    _pickAttack(boss) { return null; }

    /** Override in subclass */
    _executeAttack(boss) {}

    /** Override in subclass */
    _getPhaseText(phase) {
        return phase === 3 ? 'ENRAGED!' : 'PHASE 2!';
    }
}
