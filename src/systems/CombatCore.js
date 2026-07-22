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
        const texKey = t.key + '_walk';
        if (!s.textures.exists(texKey)) return null;
        if (!s.anims.exists(walkAnimKey)) return null;
        const e = s.add.sprite(x, y, texKey).setDepth(5);
        s.physics.add.existing(e, false);
        e.body.setSize(t.bw, t.bh);
        e.body.setCollideWorldBounds(true);
        e.walkAnimKey = walkAnimKey;
        if (t.scale) e.setScale(t.scale);
        e.stats = { key: t.key, name: t.name, hp: Math.floor(t.hp * s.diffMulti.hp), maxHp: Math.floor(t.hp * s.diffMulti.hp), damage: Math.floor(t.dmg * s.diffMulti.dmg), exp: Math.floor(t.exp * s.diffMulti.exp), bw: t.bw, bh: t.bh, wTimer: 0, wDir: 0, role: t.role || 'dps', hasShield: t.hasShield || false };
        const hw = t.bw + 4;
        e.hpBg = s.add.rectangle(x, y - t.bh / 2 - 8, hw, 3, 0x333333).setOrigin(0.5).setDepth(11);
        e.hpFill = s.add.rectangle(x, y - t.bh / 2 - 8, hw, 3, 0xe74c3c).setOrigin(0.5).setDepth(11);
        if (t.hasShield) {
            e.shieldIcon = s.add.text(x, y - t.bh / 2 - 16, '\u{1F6E1}', { fontSize: '10px' }).setOrigin(0.5).setDepth(12);
        }
        if (t.invisible) {
            e.stats.invisible = true;
            if (!s.visionUnlocked) {
                e.setAlpha(0.15);
                e.setTint(0xffffff);
                e.hpBg.setAlpha(0);
                e.hpFill.setAlpha(0);
                if (e.shieldIcon) e.shieldIcon.setAlpha(0);
            }
        }
        const roleIcons = { healer: '\u{2764}', mage: '\u{2728}', assassin: '\u{1F5E1}', fire: '\u{1F525}', poison: '\u{2620}', necro: '\u{1F480}', swarm: '\u{1F41D}' };
        if (roleIcons[t.role] && !t.hasShield) {
            e.roleIcon = s.add.text(x, y - t.bh / 2 - 16, roleIcons[t.role], { fontSize: '10px' }).setOrigin(0.5).setDepth(12);
        }
        s.enemies.add(e);
        if (s.multiplayer && s.mpSync) s.mpSync.assignMobId(e);
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
        if (s.playerHP <= 0) {
            s.playerHP = 0;
            if (s.multiplayer && s.mpManager) {
                this._enterDownedState();
            } else {
                this.respawnPlayer();
            }
        }
        s.updateUI();
    }

    _enterDownedState() {
        const s = this.scene;
        s.isDowned = true;
        s.downedTimer = 10000;
        s.player.setTint(0x666666);
        s.player.setAlpha(0.6);
        s.player.body.setVelocity(0);
        s.floatingText(s.player.x, s.player.y - 40, 'DOWNED! Ally: SPACE to revive', '#e74c3c');
        if (s.multiplayer && s.mpManager) s.mpManager.broadcastDowned(true);
    }

    revivePlayer() {
        const s = this.scene;
        s.isDowned = false;
        s.downedTimer = 0;
        s.player.clearTint();
        s.player.setAlpha(1);
        s.playerHP = Math.floor(s.playerMaxHP * 0.3);
        s.invincible = true;
        s.time.delayedCall(1000, () => { s.invincible = false; });
        s.floatingText(s.player.x, s.player.y - 40, 'REVIVED!', '#2ecc71');
        s.updateUI();
        if (s.multiplayer && s.mpManager) s.mpManager.broadcastDowned(false);
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
        const pos = this._playAttackVisuals();
        if (!pos) return;
        this._dealAttackDamage(pos.ax, pos.ay, pos.attackDamage, pos.cls, {});
        s.time.delayedCall(pos.cooldown, () => { s.attackCooldown = false; });
    }

    _getAttackType() {
        const s = this.scene;
        const weapon = s.equipment?.weapon;
        if (weapon?.attackType) return weapon.attackType;
        const cls = s.classData || getClassData(s.classKey);
        return cls.defaultAttack || 'thrust';
    }

    _playAttackVisuals() {
        const s = this.scene;
        if (s.attackCooldown || s.menuOpen || s.transitioning) return null;
        if (s.zone === 'arena' && s.zones.arena.bossDefeated) return null;
        s.attackCooldown = true; s.playerAttacking = true;
        const cls = s.classData || getClassData(s.classKey);
        s.player.play(cls.attackAnim || 'sage_attack');
        s.player.once('animationcomplete', () => {
            s.playerAttacking = false;
            const walkKey = cls.walkTexKey || 'player_sage_walk';
            s.player.setTexture(walkKey);
        });
        const dmgMult = cls.meleeDmgMult || 1.0;
        const attackDamage = Math.floor(s.playerDamage * dmgMult);
        const weapon = s.equipment?.weapon;
        const atkType = this._getAttackType();
        const range = weapon?.attackRange || cls.meleeRange || 55;
        const color = weapon?.color || cls.meleeColor || 0xaaddff;
        const cooldown = cls.meleeCooldown || 280;
        let ax = s.player.x, ay = s.player.y;
        if (s.facing === 'right') ax += range; else if (s.facing === 'left') ax -= range;
        else if (s.facing === 'up') ay -= range; else if (s.facing === 'down') ay += range;
        switch (atkType) {
            case 'thrust': this._attackThrust(ax, ay, range, attackDamage, color, cls); break;
            case 'cleave': this._attackCleave(ax, ay, range, attackDamage, color, cls); break;
            case 'shot': this._rangedAttack(cls, attackDamage); break;
            case 'burst': this._attackBurst(ax, ay, attackDamage, cls); break;
            case 'bash': this._attackBash(ax, ay, attackDamage, color, cls); break;
            case 'spin': this._attackSpin(ax, ay, attackDamage, color, cls); break;
            default: this._attackThrust(ax, ay, range, attackDamage, color, cls); break;
        }
        return { ax, ay, attackDamage, cls, cooldown };
    }

    applyAttackAt(ax, ay, attackDamage, cls, opts = {}) {
        if (!cls.meleeRanged) {
            this._showSlash(ax, ay, cls.meleeColor || 0xaaddff);
        }
        this._dealAttackDamage(ax, ay, attackDamage, cls, opts);
    }

    _attackerPeerId(opts) {
        return (opts && opts.attackerPeerId) || null;
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

    _attackThrust(ax, ay, range, dmg, color, cls) {
        const s = this.scene;
        const proj = s.add.sprite(s.player.x, s.player.y, 'attack_arrow').setDepth(15).setTint(color || 0xe74c3c);
        const angle = s.facing === 'left' ? 180 : s.facing === 'up' ? -90 : s.facing === 'down' ? 90 : 0;
        proj.setAngle(angle);
        const speed = 500;
        s.tweens.add({
            targets: proj, x: ax, y: ay, alpha: 0, duration: range / speed * 1000,
            onComplete: () => proj.destroy()
        });
        this._hitAt(ax, ay, 18, dmg, cls);
        s.player.setTint(color || 0xe74c3c);
        s.time.delayedCall(80, () => { if (s.player.active) s.player.clearTint(); });
    }

    _attackCleave(ax, ay, range, dmg, color, cls) {
        const s = this.scene;
        for (let i = -1; i <= 1; i++) {
            const sl = s.add.sprite(ax + i * 8, ay + i * 4, 'slash').setAlpha(0.8).setTint(color || 0xaaddff);
            s.tweens.add({ targets: sl, alpha: 0, scaleX: 1.6, scaleY: 1.6, duration: 200, delay: Math.abs(i) * 30, onComplete: () => sl.destroy() });
        }
        const enemies = [];
        this._collectInRange(s.enemies, ax, ay, range, (e) => {
            if (this._inArc(s.player, e, 120)) enemies.push(e);
        });
        enemies.forEach(e => this.hitEnemy(e, dmg, {}));
        if (cls && cls.key === 'alchemist') enemies.forEach(e => this._applyArmorShred(e));
        s.player.setTint(color || 0xaaddff);
        s.time.delayedCall(120, () => { if (s.player.active) s.player.clearTint(); });
    }

    _attackBurst(ax, ay, dmg, cls) {
        const s = this.scene;
        const dirs = [];
        if (s.facing === 'right') { dirs.push(0, -15, 15); }
        else if (s.facing === 'left') { dirs.push(180, 165, 195); }
        else if (s.facing === 'up') { dirs.push(-90, -105, -75); }
        else { dirs.push(90, 75, 105); }
        dirs.forEach(angle => {
            const rad = angle * Math.PI / 180;
            const px = s.player.x + Math.cos(rad) * 30;
            const py = s.player.y + Math.sin(rad) * 30;
            const fb = s.add.sprite(px, py, 'attack_spell').setDepth(15).setTint(cls?.meleeColor || 0x27ae60);
            s.physics.add.existing(fb);
            fb.body.setVelocity(Math.cos(rad) * 300, Math.sin(rad) * 300);
            fb.damage = Math.floor(dmg * 0.6);
            fb.lifespan = 0.5;
            fb.isMeleeProjectile = true;
            s.fireballs.push(fb);
        });
    }

    _attackBash(ax, ay, dmg, color, cls) {
        const s = this.scene;
        const bash = s.add.sprite(ax, ay, 'attack_bash').setAlpha(0.9).setTint(color || 0x3498db);
        s.tweens.add({ targets: bash, alpha: 0, scaleX: 1.5, scaleY: 1.5, duration: 250, onComplete: () => bash.destroy() });
        this._hitAt(ax, ay, 35, dmg, cls);
        s.cameras.main.shake(120, 0.008);
        s.player.setTint(color || 0x3498db);
        s.time.delayedCall(150, () => { if (s.player.active) s.player.clearTint(); });
    }

    _attackSpin(ax, ay, dmg, color, cls) {
        const s = this.scene;
        for (let i = 0; i < 4; i++) {
            const sl = s.add.sprite(ax, ay, 'slash').setAlpha(0.6).setTint(color || 0xaaddff);
            sl.setAngle(i * 90);
            s.tweens.add({ targets: sl, alpha: 0, scaleX: 1.8, scaleY: 1.8, duration: 350, delay: i * 60, onComplete: () => sl.destroy() });
        }
        this._hitAllAround(s.player.x, s.player.y, 55, dmg, cls);
        s.cameras.main.shake(80, 0.005);
        s.player.setTint(color || 0xaaddff);
        s.time.delayedCall(200, () => { if (s.player.active) s.player.clearTint(); });
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

    _hitAt(ax, ay, radius, dmg, cls) {
        this._dealAttackDamage(ax, ay, dmg, cls, {});
    }

    _collectInRange(group, ax, ay, range, fn) {
        if (!group || !group.scene) return;
        let children;
        try { children = group.getChildren(); } catch (e) { return; }
        children.forEach(child => {
            if (!child.active || !child.stats || child.broken) return;
            if (Phaser.Math.Distance.Between(ax, ay, child.x, child.y) <= range) fn(child);
        });
    }

    _inArc(player, enemy, arcDeg) {
        const dx = enemy.x - player.x, dy = enemy.y - player.y;
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        let facingAngle = 0;
        if (this.scene.facing === 'right') facingAngle = 0;
        else if (this.scene.facing === 'left') facingAngle = 180;
        else if (this.scene.facing === 'up') facingAngle = -90;
        else if (this.scene.facing === 'down') facingAngle = 90;
        let diff = angle - facingAngle;
        while (diff < -180) diff += 360;
        while (diff > 180) diff -= 360;
        return Math.abs(diff) <= arcDeg / 2;
    }

    _hitAllAround(cx, cy, radius, dmg, cls) {
        const enemies = [];
        this._collectInRange(this.scene.enemies, cx, cy, radius, (e) => enemies.push(e));
        enemies.forEach(e => this.hitEnemy(e, dmg, {}));
        if (cls && cls.key === 'alchemist') enemies.forEach(e => this._applyArmorShred(e));
    }

    _dealAttackDamage(ax, ay, attackDamage, cls, opts = {}) {
        const dmg = attackDamage || this.scene.playerDamage;
        const hitRadius = 45;
        const isAlchemist = cls && cls.key === 'alchemist';
        const ap = this._attackerPeerId(opts);
        const chestOpts = ap ? { attackerPeerId: ap } : {};
        this._forEachGroupInRange(this.scene.enemies, ax, ay, hitRadius, (e) => { this.hitEnemy(e, dmg, opts); if (isAlchemist) this._applyArmorShred(e); });
        this._forEachGroupInRange(this.scene.stumps, ax, ay, hitRadius, (st) => { this.hitStump(st, dmg, chestOpts); });
        this._forEachGroupInRange(this.scene.forestChests, ax, ay, hitRadius, (ch) => { this.hitChest(ch, dmg, chestOpts); });
        this._forEachGroupInRange(this.scene.caveExtraChests, ax, ay, hitRadius, (ch) => { this.hitChest(ch, dmg, chestOpts); });
        this._forEachGroupInRange(this.scene.mineChests, ax, ay, hitRadius, (ch) => { this.hitChest(ch, dmg, chestOpts); });
        this._forEachGroupInRange(this.scene.caveChests, ax, ay, hitRadius, (ch) => { this.hitChest(ch, dmg, chestOpts); });
        this._forEachGroupInRange(this.scene.depthsChests, ax, ay, hitRadius, (ch) => { this.hitChest(ch, dmg, chestOpts); });
        this._forEachGroupInRange(this.scene.cursedChests, ax, ay, hitRadius, (ch) => { this.hitChest(ch, dmg, chestOpts); });
        this._forEachGroupInRange(this.scene.shadowChests, ax, ay, hitRadius, (ch) => { this.hitChest(ch, dmg, chestOpts); });
        this._forEachGroupInRange(this.scene.towerChests, ax, ay, hitRadius, (ch) => { this.hitChest(ch, dmg, chestOpts); });
        this._forEachGroupInRange(this.scene.villageZombies, ax, ay, hitRadius, (e) => { this.hitEnemy(e, dmg, opts); if (isAlchemist) this._applyArmorShred(e); });
        this._forEachGroupInRange(this.scene.hellImps, ax, ay, hitRadius, (e) => { this.hitEnemy(e, dmg, opts); if (isAlchemist) this._applyArmorShred(e); });
        this._forEachGroupInRange(this.scene.caveSmallBats, ax, ay, hitRadius, (e) => { this.hitEnemy(e, dmg, opts); if (isAlchemist) this._applyArmorShred(e); });
        // Boss minion groups
        this._forEachGroupInRange(this.scene.depthsMinions, ax, ay, hitRadius, (e) => { this.hitEnemy(e, dmg); if (isAlchemist) this._applyArmorShred(e); });
        this._forEachGroupInRange(this.scene.cursedMinions, ax, ay, hitRadius, (e) => { this.hitEnemy(e, dmg); if (isAlchemist) this._applyArmorShred(e); });
        this._forEachGroupInRange(this.scene.shadowMinions, ax, ay, hitRadius, (e) => { this.hitEnemy(e, dmg); if (isAlchemist) this._applyArmorShred(e); });
        this._forEachGroupInRange(this.scene.towerMinions, ax, ay, hitRadius, (e) => { this.hitEnemy(e, dmg); if (isAlchemist) this._applyArmorShred(e); });
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

    hitEnemy(enemy, damage, opts = {}) {
        if (!enemy || !enemy.stats) return;
        const s = this.scene;
        if (opts.attackerPeerId) enemy._lastAttackerPeerId = opts.attackerPeerId;
        let finalDamage = damage;

        // Class synergy damage buff
        if (s._synergyDmgBuff > 0) {
            finalDamage = Math.floor(finalDamage * (1 + s._synergyDmgBuff));
        }

        // Combo: if another player hit this enemy recently, ×1.5 damage
        if (!opts.bypassModifiers && s.multiplayer) {
            const now = Date.now();
            if (enemy._lastHitByOther && now - enemy._lastHitByOther < 500 && enemy._lastHitter !== (opts.attackerPeerId || 'local')) {
                finalDamage = Math.floor(finalDamage * 1.5);
                s.floatingText(enemy.x, enemy.y - 40, 'COMBO!', '#f1c40f');
            }
            enemy._lastHitByOther = now;
            enemy._lastHitter = opts.attackerPeerId || 'local';
        }

        // Shield check: reduce damage by 80% if hit from front
        if (enemy.stats.hasShield && !opts.bypassModifiers) {
            const facingX = enemy.flipX ? -1 : 1;
            const dx = s.player.x - enemy.x;
            const dy = s.player.y - enemy.y;
            const len = Math.sqrt(dx * dx + dy * dy) || 1;
            const dot = (dx / len) * facingX;
            if (dot > 0.5) {
                finalDamage = Math.floor(finalDamage * 0.2);
                s.floatingText(enemy.x, enemy.y - 30, 'BLOCKED!', '#3498db');
            }
        }

        // Invisible reveal: attack reveals invisible enemy
        if (enemy.stats.invisible && enemy.alpha < 0.5) {
            enemy.setAlpha(1);
            enemy.clearTint();
            if (enemy.hpBg) enemy.hpBg.setAlpha(1);
            if (enemy.hpFill) enemy.hpFill.setAlpha(1);
            if (enemy.shieldIcon) enemy.shieldIcon.setAlpha(1);
            s.floatingText(enemy.x, enemy.y - 30, 'REVEALED!', '#ffffff');
        }

        if (!opts.bypassModifiers) {
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
            if (s._luckyHitCounter === undefined) s._luckyHitCounter = 0;
            const luckyChance = 5 + s._luckyHitCounter * 2;
            const luckyThreshold = s._lastLuckyHitThreshold !== undefined ? s._lastLuckyHitThreshold : luckyChance;
            const procRoll = Math.random() * 100;
            if (procRoll < luckyChance) {
                s._luckyHitCounter = 0;
                const luckyMult = 1.5 + s._luckyHitCounter * 0.1;
                finalDamage = Math.floor(finalDamage * luckyMult);
                s.floatingText(enemy.x, enemy.y - 40, 'LUCKY!', '#ff6600');
            } else {
                s._luckyHitCounter = (s._luckyHitCounter || 0) + 1;
            }
            if (enemy.armorShredStacks && enemy.armorShredStacks > 0) finalDamage = Math.floor(finalDamage * (1 + enemy.armorShredStacks * 0.05));
        }

        enemy.stats.hp -= finalDamage;
        enemy.setTint(0xffffff);
        if (s.particles) s.particles.spawnHitSpark(enemy.x, enemy.y);
        s.tweens.add({ targets: enemy, scaleX: 1.2, scaleY: 1.2, duration: 60, yoyo: true, onComplete: () => { if (enemy.active) { enemy.clearTint(); enemy.setScale(1); } } });
        s.floatingText(enemy.x, enemy.y - 20, '-' + finalDamage, '#e74c3c');

        const totalLifeSteal = s.computedLifeSteal + ((s._consumableBonusLifesteal || 0) * 100);
        if (totalLifeSteal > 0 && !opts.bypassLifeSteal) {
            const healAmount = Math.floor(finalDamage * totalLifeSteal / 100);
            if (healAmount > 0) { s.playerHP = Math.min(s.playerMaxHP, s.playerHP + healAmount); s.floatingText(s.player.x, s.player.y - 40, '+' + healAmount, '#2ecc71'); }
        }

        if (enemy.stats.hp <= 0) {
            const healOnKill = s._materialSensors?.healOnKill || 0;
            if (healOnKill > 0) {
                const healAmt = Math.floor(s.playerMaxHP * healOnKill);
                s.playerHP = Math.min(s.playerMaxHP, s.playerHP + healAmt);
                s.floatingText(s.player.x, s.player.y - 40, '+' + healAmt + ' HP', '#2ecc71');
            }
            if (s.loot && s.loot.handleEnemyDeath) s.loot.handleEnemyDeath(enemy);
        }
        else { enemy.hpFill.width = enemy.hpBg.width * (enemy.stats.hp / enemy.stats.maxHp); }
    }

    hitStump(stump, damage, opts = {}) {
        if (!stump || !stump.stats) return;
        const s = this.scene;
        stump.stats.hp -= damage; stump.setTint(0xffffff);
        s.tweens.add({ targets: stump, scaleX: 1.15, scaleY: 1.15, duration: 60, yoyo: true, onComplete: () => { if (stump.active) { stump.clearTint(); stump.setScale(1); } } });
        s.floatingText(stump.x, stump.y - 20, '-' + damage, '#f39c12');
        if (stump.stats.hp <= 0) {
            const result = s.loot.breakStump(stump);
            if (s._distributeLoot) s._distributeLoot(result, opts.attackerPeerId || null);
        }
        else { stump.hpFill.width = stump.hpBg.width * (stump.stats.hp / stump.stats.maxHp); }
    }

    hitChest(ch, damage, opts = {}) {
        if (!ch || !ch.stats) return;
        const s = this.scene;
        if (ch.broken) return; ch.stats.hp -= damage; ch.setTint(0xffffff);
        s.tweens.add({ targets: ch, scaleX: 1.15, scaleY: 1.15, duration: 60, yoyo: true, onComplete: () => { if (ch.active) { ch.clearTint(); ch.setScale(1); } } });
        s.floatingText(ch.x, ch.y - 20, '-' + damage, '#f39c12');
        if (ch.stats.hp <= 0) {
            const result = s.loot.breakChest(ch);
            if (s._distributeLoot) s._distributeLoot(result, opts.attackerPeerId || null);
        }
        else { ch.hpFill.width = ch.hpBg.width * (ch.stats.hp / ch.stats.maxHp); }
    }

    _isBoss(enemy) {
        const s = this.scene;
        return enemy === s.boss || enemy === s.mineBoss || enemy === s.caveBoss ||
               enemy === s.villageBoss || enemy === s.hellBoss || enemy === s.depthsBoss || enemy === s.cursedBoss || enemy === s.shadowBoss || enemy === s.towerBoss || enemy === s.throneBoss ||
               enemy === s.snowyIceSpirit || enemy === s.castleBoss;
    }
}
