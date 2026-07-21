import { isHost, getMyId } from '../network.js';

export class CombatFacade {
    constructor(scene) {
        this.scene = scene;
    }

    hitEnemy(enemy, damage, opts) {
        if (this.scene.combat) this.scene.combat.hitEnemy(enemy, damage, opts);
    }

    killEnemy(enemy) {
        if (this.scene.combat) this.scene.combat.killEnemy(enemy);
    }

    killBoss() {
        if (this.scene.combat) this.scene.combat.killBoss();
    }

    killMineBoss() {
        if (this.scene.combat) this.scene.combat.killMineBoss();
    }

    killCaveBoss() {
        if (this.scene.combat) this.scene.combat.killCaveBoss();
    }

    hitChest(ch, damage, opts) {
        if (this.scene.combat) this.scene.combat.hitChest(ch, damage, opts);
    }

    hitStump(stump, damage) {
        if (this.scene.combat) this.scene.combat.hitStump(stump, damage);
    }

    respawnPlayer() {
        if (this.scene.combat) this.scene.combat.respawnPlayer();
    }

    breakChest(ch, opts) {
        if (this.scene.combat) {
            const r = this.scene.combat.breakChest(ch);
            if (this.scene._distributeLoot) this.scene._distributeLoot(r, opts && opts.attackerPeerId);
        }
    }

    breakStump(stump, opts) {
        if (this.scene.combat) {
            const r = this.scene.combat.breakStump(stump);
            if (this.scene._distributeLoot) this.scene._distributeLoot(r, opts && opts.attackerPeerId);
        }
    }

    breakVillageChest(ch, opts) {
        if (this.scene.combat) {
            const r = this.scene.combat.breakVillageChest(ch);
            if (this.scene._distributeLoot) this.scene._distributeLoot(r, opts && opts.attackerPeerId);
        }
    }

    attack() {
        const s = this.scene;
        if (s.multiplayer && !isHost()) {
            this._guestAttack();
            return;
        }
        if (s.combat) s.combat.attack();
    }

    takeDamage(amount) {
        const s = this.scene;
        if (s.combat) s.combat.takeDamage(amount);
        if (s.multiplayer && isHost() && s.mpSync && s.player) {
            s.mpSync.notifyPlayerDamage(getMyId(), amount || 0, s.player.x, s.player.y);
        }
    }

    _guestAttack() {
        const s = this.scene;
        if (!s.combat || !s.combat._playAttackVisuals) return;
        const pos = s.combat._playAttackVisuals();
        if (!pos) return;
        if (s.mpManager) {
            s.mpManager.sendGuestAttackAction({
                ax: pos.ax, ay: pos.ay,
                facing: s.facing,
                attackDamage: pos.attackDamage,
                weaponSlot: 'weapon',
                isRanged: !!pos.cls.meleeRanged
            });
        }
        s.time.delayedCall(pos.cooldown, () => { s.attackCooldown = false; });
    }
}
