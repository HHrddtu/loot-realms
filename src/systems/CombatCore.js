import Phaser from 'phaser';
import { MINE_RETURN_POS, FOREST_RETURN_POS, CAVE_WIDTH } from '../config/index.js';
import { getClassData } from '../classes.js';
import { recordKill } from '../bestiary.js';

export class CombatCore {
    constructor(scene) {
        this.scene = scene;
    }

    makeEnemy(t, x, y) {
        const s = this.scene;
        const walkAnimKey = t.key === 'skeleton_archer' ? 'skeleton_archer_walk_anim' :
                           t.key === 'skeleton_shaman' ? 'skeleton_shaman_walk_anim' :
                           t.key === 'skeleton_warrior' ? 'skeleton_walk' : t.key + '_walk';
        const e = s.add.sprite(x, y, t.key + '_walk').setDepth(5);
        s.physics.add.existing(e, false);
        e.body.setSize(t.bw, t.bh);
        e.body.setCollideWorldBounds(true);
        e.walkAnimKey = walkAnimKey;
        e.stats = { key: t.key, name: t.name, hp: Math.floor(t.hp * s.diffMulti.hp), maxHp: Math.floor(t.hp * s.diffMulti.hp), damage: Math.floor(t.dmg * s.diffMulti.dmg), exp: Math.floor(t.exp * s.diffMulti.exp), bw: t.bw, bh: t.bh, wTimer: 0, wDir: 0 };
        const hw = t.bw + 4;
        e.hpBg = s.add.rectangle(x, y - t.bh / 2 - 8, hw, 3, 0x333333).setOrigin(0.5).setDepth(11);
        e.hpFill = s.add.rectangle(x, y - t.bh / 2 - 8, hw, 3, 0xe74c3c).setOrigin(0.5).setDepth(11);
        s.enemies.add(e);
        if (s.multiplayer && s.mpSync) s.mpSync.assignMobId(e, t.key);
        return e;
    }

    takeDamage(amount) {
        const s = this.scene;
        if (s.invincible) return;
        amount = Math.floor(amount) || 0;
        if (amount <= 0) return;
        if (s.computedDamageReduction > 0) {
            amount = Math.floor(amount * (1 - Math.min(s.computedDamageReduction, 90) / 100));
            if (amount <= 0) amount = 1;
        }
        if (s.shieldActive && s.shieldHP > 0) {
            if (s.lifeLinkActive) amount = Math.floor(amount * 0.7);
            const absorbed = Math.min(s.shieldHP, amount);
            s.shieldHP -= absorbed; amount -= absorbed;
            if (absorbed > 0) s.floatingText(s.player.x, s.player.y - 20, absorbed + ' blocked', '#3498db');
            if (s.shieldHP <= 0) { s.shieldActive = false; s.lifeLinkActive = false; if (s.shieldVfx) { s.shieldVfx.destroy(); s.shieldVfx = null; } }
            if (amount <= 0) return;
        }
        s.playerHP -= amount;
        s.invincible = true;
        s.player.setTint(0xff4444).setAlpha(0.5);
        if (s.particles) s.particles.spawnDamageToPlayer(s.player.x, s.player.y);
        s.cameras.main.shake(100, 0.002);
        if (s.ui) s.ui.showDamageFlash();
        s.time.delayedCall(500, () => { s.player.clearTint(); s.player.setAlpha(1); s.invincible = false; });
        if (s.playerHP <= 0) { s.playerHP = 0; this.respawnPlayer(); }
        s.updateUI();
    }

    respawnPlayer() {
        const s = this.scene;
        if (s.zone === 'arena') { s.player.x = 400; s.player.y = 500; }
        else if (s.zone === 'mine') { s.player.x = MINE_RETURN_POS.x; s.player.y = MINE_RETURN_POS.y; }
        else if (s.zone === 'mine_boss') { s.player.x = 400; s.player.y = 500; }
        else if (s.zone === 'cave') { s.player.x = (s.caveOffsetX || 0) + CAVE_WIDTH / 2; s.player.y = 50; }
        else { s.player.x = FOREST_RETURN_POS.x; s.player.y = FOREST_RETURN_POS.y; }
        s.recalcStats(); s.playerHP = s.playerMaxHP;
        s.cameras.main.shake(200, 0.01); s.updateUI();
    }

    attack() {
        const s = this.scene;
        if (s.attackCooldown || s.menuOpen || s.transitioning) return;
        if (s.zone === 'arena' && s.zones.arena.bossDefeated) return;
        s.attackCooldown = true; s.playerAttacking = true;
        const cls = s.classData || getClassData(s.classKey);
        s.player.play(cls.attackAnim || 'sage_attack');
        s.player.once('animationcomplete', () => { s.playerAttacking = false; });
        const dmgMult = cls.meleeDmgMult || 1.0;
        const attackDamage = Math.floor(s.playerDamage * dmgMult);
        if (cls.meleeRanged) {
            this._rangedAttack(cls, attackDamage);
        } else {
            const range = cls.meleeRange || 55;
            let ax = s.player.x, ay = s.player.y;
            if (s.facing === 'right') ax += range; else if (s.facing === 'left') ax -= range;
            else if (s.facing === 'up') ay -= range; else if (s.facing === 'down') ay += range;
            this._showSlash(ax, ay, cls.meleeColor || 0xaaddff);
            this._dealAttackDamage(ax, ay, attackDamage, cls);
        }
        s.time.delayedCall(cls.meleeCooldown || 280, () => { s.attackCooldown = false; });
    }

    _rangedAttack(cls, attackDamage) {
        const s = this.scene;
        let vx = 0, vy = 0, ox = 0, oy = 0;
        const speed = 350;
        if (s.facing === 'left') { vx = -speed; ox = -20; } else if (s.facing === 'right') { vx = speed; ox = 20; }
        else if (s.facing === 'up') { vy = -speed; oy = -20; } else if (s.facing === 'down') { vy = speed; oy = 20; }
        else { vx = speed; ox = 20; }
        const px = s.player.x + ox, py = s.player.y + oy;
        const fb = s.add.sprite(px, py, 'soul_strike').setDepth(15).setTint(cls.meleeColor || 0xf1c40f);
        s.physics.add.existing(fb);
        fb.body.setVelocity(vx, vy);
        fb.damage = attackDamage; fb.lifespan = (cls.meleeRange || 120) / speed;
        fb.isMeleeProjectile = true; fb.healPercent = cls.meleeHealPercent || 0;
        s.fireballs.push(fb);
        const glow = s.add.circle(px, py, 10, cls.meleeColor || 0xf1c40f, 0.4).setDepth(14);
        fb.glow = glow;
        s.tweens.add({ targets: fb, scaleX: 1.2, scaleY: 1.2, duration: 80, yoyo: true, repeat: -1 });
    }

    _showSlash(ax, ay, color) {
        const s = this.scene.add.sprite(ax, ay, 'slash').setAlpha(0.9);
        if (color && color !== 0xaaddff) s.setTint(color);
        this.scene.tweens.add({ targets: s, alpha: 0, scaleX: 1.4, scaleY: 1.4, angle: 90, duration: 180, onComplete: () => s.destroy() });
        this.scene.player.setTint(color || 0xaaddff);
        this.scene.time.delayedCall(100, () => { if (this.scene.player.active) this.scene.player.clearTint(); });
    }

    _facingOffset(dist) {
        if (this.scene.facing === 'right') return { x: dist, y: 0 };
        if (this.scene.facing === 'left') return { x: -dist, y: 0 };
        if (this.scene.facing === 'up') return { x: 0, y: -dist };
        if (this.scene.facing === 'down') return { x: 0, y: dist };
        return { x: dist, y: 0 };
    }

    _dealAttackDamage(ax, ay, attackDamage, cls) {
        const dmg = attackDamage || this.scene.playerDamage;
        const hitRadius = 45;
        const isAlchemist = cls && cls.key === 'alchemist';
        this._forEachGroupInRange(this.scene.enemies, ax, ay, hitRadius, (e) => { this.hitEnemy(e, dmg); if (isAlchemist) this._applyArmorShred(e); });
        this._forEachGroupInRange(this.scene.stumps, ax, ay, hitRadius, (st) => { this.hitStump(st, dmg); });
        this._forEachGroupInRange(this.scene.forestChests, ax, ay, hitRadius, (ch) => { this.hitChest(ch, dmg); });
        this._forEachGroupInRange(this.scene.caveExtraChests, ax, ay, hitRadius, (ch) => { this.hitChest(ch, dmg); });
        this._forEachGroupInRange(this.scene.mineChests, ax, ay, hitRadius, (ch) => { this.hitChest(ch, dmg); });
        this._forEachGroupInRange(this.scene.caveChests, ax, ay, hitRadius, (ch) => { this.hitChest(ch, dmg); });
        this._forEachGroupInRange(this.scene.villageZombies, ax, ay, hitRadius, (e) => { this.hitEnemy(e, dmg); if (isAlchemist) this._applyArmorShred(e); });
        this._forEachGroupInRange(this.scene.hellImps, ax, ay, hitRadius, (e) => { this.hitEnemy(e, dmg); if (isAlchemist) this._applyArmorShred(e); });
        this._forEachGroupInRange(this.scene.caveSmallBats, ax, ay, hitRadius, (e) => { this.hitEnemy(e, dmg); if (isAlchemist) this._applyArmorShred(e); });
        this._forEachGroupInRange(this.scene.snowyIceShards, ax, ay, hitRadius, (s) => {
            if (!s.active || !s.stats) return;
            s.stats.hp -= dmg; this.scene.floatingText(s.x, s.y - 15, '-' + dmg, '#3498db');
            if (s.stats.hp <= 0) { recordKill('ice_shard'); if (s.hpBg) s.hpBg.destroy(); if (s.hpFill) s.hpFill.destroy(); s.destroy(); }
        });
        if (this.scene.snowyIceSpirit && this.scene.snowyIceSpirit.active && this.scene.snowyIceSpirit.stats &&
            Phaser.Math.Distance.Between(ax, ay, this.scene.snowyIceSpirit.x, this.scene.snowyIceSpirit.y) < hitRadius) {
            this.hitEnemy(this.scene.snowyIceSpirit, dmg);
            if (isAlchemist) this._applyArmorShred(this.scene.snowyIceSpirit);
        }
    }

    _forEachGroup(group, fn) {
        if (!group || !group.scene) return;
        let children;
        try { children = group.getChildren(); } catch (e) { return; }
        children.forEach(child => {
            if (!child.active || !child.stats || child.broken) return;
            fn(child);
        });
    }

    _forEachGroupInRange(group, ax, ay, range, fn) {
        if (!group || !group.scene) return;
        let children;
        try { children = group.getChildren(); } catch (e) { return; }
        children.forEach(child => {
            if (!child.active || !child.stats || child.broken) return;
            if (Phaser.Math.Distance.Between(ax, ay, child.x, child.y) <= range) fn(child);
        });
    }

    _applyArmorShred(enemy) {
        if (!enemy || !enemy.stats) return;
        if (!enemy.armorShredStacks) enemy.armorShredStacks = 0;
        if (!enemy.armorShredTimer) enemy.armorShredTimer = 0;
        if (enemy.armorShredStacks < 3) {
            enemy.armorShredStacks = Math.min(3, enemy.armorShredStacks + 1);
            enemy.armorShredTimer = 3;
            this.scene.floatingText(enemy.x, enemy.y - 30, '-' + (enemy.armorShredStacks * 5) + '% ARMOR', '#27ae60');
        } else { enemy.armorShredTimer = 3; }
    }

    hitEnemy(enemy, damage) {
        const s = this.scene;
        let finalDamage = damage;
        if (s._consumableBonusDmg > 0) finalDamage = Math.floor(finalDamage * (1 + s._consumableBonusDmg));
        const te = s.talentEffects || {}; const ae = s.accountEffects || {};
        if (te.damagePercentVs && enemy.stats && enemy.stats.key && te.damagePercentVs[enemy.stats.key] > 0)
            finalDamage = Math.floor(damage * (1 + te.damagePercentVs[enemy.stats.key] / 100));
        if (enemy.stats && enemy.stats.key && s.bestiaryBonuses && s.bestiaryBonuses[enemy.stats.key]) {
            const bb = s.bestiaryBonuses[enemy.stats.key];
            if (bb.dmgBonus > 0) finalDamage = Math.floor(finalDamage * (1 + bb.dmgBonus / 100));
        }
        if (s.computedBossDamage && enemy.stats && this._isBoss(enemy))
            finalDamage = Math.floor(finalDamage * (1 + s.computedBossDamage / 100));
        if (s.playerHP <= s.playerMaxHP * 0.3) { const b = (te.damagePercentLowHp||0)+(ae.damagePercentLowHp||0); if (b>0) finalDamage = Math.floor(finalDamage*(1+b/100)); }
        if (s.playerHP === s.playerMaxHP) { const b = (te.damagePercentFullHp||0)+(ae.damagePercentFullHp||0); if (b>0) finalDamage = Math.floor(finalDamage*(1+b/100)); }
        if (s.computedCritChance && Math.random() * 100 < s.computedCritChance + (s._consumableBonusCrit || 0)) {
            finalDamage = Math.floor(finalDamage * s.computedCritDamage);
            s.floatingText(enemy.x, enemy.y - 30, 'CRIT!', '#f1c40f');
        }
        if (enemy.armorShredStacks && enemy.armorShredStacks > 0) finalDamage = Math.floor(finalDamage * (1 + enemy.armorShredStacks * 0.05));

        enemy.stats.hp -= finalDamage;
        enemy.setTint(0xffffff);
        if (s.particles) s.particles.spawnHitSpark(enemy.x, enemy.y);
        s.tweens.add({ targets: enemy, scaleX: 1.2, scaleY: 1.2, duration: 60, yoyo: true, onComplete: () => { if (enemy.active) { enemy.clearTint(); enemy.setScale(1); } } });
        s.floatingText(enemy.x, enemy.y - 20, '-' + finalDamage, '#e74c3c');

        // Send damage to host in multiplayer
        if (s.multiplayer && s.mpSync && enemy.mpId) {
            s.mpSync.broadcastMobDamage(enemy.mpId, finalDamage);
        }

        const totalLifeSteal = s.computedLifeSteal + ((s._consumableBonusLifesteal || 0) * 100);
        if (totalLifeSteal > 0) {
            const healAmount = Math.floor(finalDamage * totalLifeSteal / 100);
            if (healAmount > 0) { s.playerHP = Math.min(s.playerMaxHP, s.playerHP + healAmount); s.floatingText(s.player.x, s.player.y - 40, '+' + healAmount, '#2ecc71'); }
        }

        if (enemy.stats.hp <= 0) { s.loot.handleEnemyDeath(enemy); }
        else { enemy.hpFill.width = enemy.hpBg.width * (enemy.stats.hp / enemy.stats.maxHp); }
    }

    hitStump(stump, damage) {
        const s = this.scene;
        stump.stats.hp -= damage; stump.setTint(0xffffff);
        s.tweens.add({ targets: stump, scaleX: 1.15, scaleY: 1.15, duration: 60, yoyo: true, onComplete: () => { if (stump.active) { stump.clearTint(); stump.setScale(1); } } });
        s.floatingText(stump.x, stump.y - 20, '-' + damage, '#f39c12');
        if (stump.stats.hp <= 0) { s.loot.breakStump(stump); }
        else { stump.hpFill.width = stump.hpBg.width * (stump.stats.hp / stump.stats.maxHp); }
    }

    hitChest(ch, damage) {
        const s = this.scene;
        if (ch.broken) return; ch.stats.hp -= damage; ch.setTint(0xffffff);
        s.tweens.add({ targets: ch, scaleX: 1.15, scaleY: 1.15, duration: 60, yoyo: true, onComplete: () => { if (ch.active) { ch.clearTint(); ch.setScale(1); } } });
        s.floatingText(ch.x, ch.y - 20, '-' + damage, '#f39c12');
        if (ch.stats.hp <= 0) { s.loot.breakChest(ch); }
        else { ch.hpFill.width = ch.hpBg.width * (ch.stats.hp / ch.stats.maxHp); }
    }

    _isBoss(enemy) {
        return enemy === this.scene.boss || enemy === this.scene.mineBoss || enemy === this.scene.caveBoss ||
               enemy === this.scene.villageBoss || enemy === this.scene.hellBoss ||
               enemy === this.scene.snowyIceSpirit || enemy === this.scene.castleBoss;
    }
}
