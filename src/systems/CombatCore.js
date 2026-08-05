import Phaser from 'phaser';
import { getClassData } from '../classes.js';
import { recordKill, getWeaknessMultiplier, getPlayerAttackType } from '../bestiary.js';
import { GAME_WIDTH, GAME_HEIGHT } from '../config/index.js';

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

        // Passive dodge check
        if (s.computedDodgePercent > 0 && Math.random() * 100 < s.computedDodgePercent) {
            s.floatingText(s.player.x, s.player.y - 20, 'DODGE!', '#3498db');
            return;
        }

        if (s.computedDamageReduction > 0) {
            amount = Math.floor(amount * (1 - Math.min(s.computedDamageReduction, 90) / 100));
            if (amount <= 0) amount = 1;
        }
        if (s.shieldActive && s.shieldHP > 0) {
            if (s.lifeLinkActive) amount = Math.floor(amount * 0.7);
            const absorbed = Math.min(s.shieldHP, amount);
            s.shieldHP -= absorbed; amount -= absorbed;
            if (absorbed > 0) s.floatingText(s.player.x, s.player.y - 20, absorbed + ' blocked', '#3498db');

            // Shield reflect: deal damage back to attacker
            if (absorbed > 0 && s.shieldReflect > 0) {
                const reflectDmg = Math.floor(absorbed * s.shieldReflect / 100);
                if (reflectDmg > 0) {
                    // Find nearest enemy and reflect damage
                    const enemies = s.enemies && s.enemies.scene ? s.enemies.getChildren() : [];
                    let nearest = null, nearDist = Infinity;
                    enemies.forEach(e => {
                        if (!e.active || !e.stats) return;
                        const d = Phaser.Math.Distance.Between(s.player.x, s.player.y, e.x, e.y);
                        if (d < nearDist) { nearDist = d; nearest = e; }
                    });
                    if (nearest && nearDist < 200) {
                        nearest.stats.hp -= reflectDmg;
                        s.floatingText(nearest.x, nearest.y - 20, '-' + reflectDmg + ' REFLECT', '#9b59b6');
                        if (nearest.stats.hp <= 0 && s.loot) s.loot.handleEnemyDeath(nearest);
                        else if (nearest.hpFill) nearest.hpFill.width = nearest.hpBg.width * (nearest.stats.hp / nearest.stats.maxHp);
                    }
                }
            }

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

        // Damage reflection: deal % of damage taken back to nearest enemy
        if (s.computedDamageReflection > 0) {
            const reflectDmg = Math.floor(amount * s.computedDamageReflection / 100);
            if (reflectDmg > 0) {
                const enemies = s.enemies && s.enemies.scene ? s.enemies.getChildren() : [];
                let nearest = null, nearDist = Infinity;
                enemies.forEach(e => {
                    if (!e.active || !e.stats) return;
                    const d = Phaser.Math.Distance.Between(s.player.x, s.player.y, e.x, e.y);
                    if (d < nearDist) { nearDist = d; nearest = e; }
                });
                if (nearest && nearDist < 200) {
                    nearest.stats.hp -= reflectDmg;
                    s.floatingText(nearest.x, nearest.y - 20, '-' + reflectDmg + ' REFLECT', '#e74c3c');
                    if (nearest.stats.hp <= 0 && s.loot) s.loot.handleEnemyDeath(nearest);
                    else if (nearest.hpFill) nearest.hpFill.width = nearest.hpBg.width * (nearest.stats.hp / nearest.stats.maxHp);
                }
            }
        }

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
        s.deaths = (s.deaths || 0) + 1;

        const goldLost = Math.floor(s.gold * 0.2);
        const expLost = Math.floor(s.playerExp * 0.2);
        s.gold = Math.max(0, s.gold - goldLost);
        s.playerExp = Math.max(0, s.playerExp - expLost);

        this._showDeathScreen(goldLost, expLost);
    }

    _showDeathScreen(goldLost, expLost) {
        const s = this.scene;
        if (s.menuOpen) return;
        s.menuOpen = true;
        if (s.enemies) s.enemies.getChildren().forEach(e => { if (e.body) e.body.setVelocity(0); });
        s.physics.pause();
        if (s.tutorialMgr) s.tutorialMgr._clearGuided();

        const depth = 400;
        const elements = [];
        const mk = (el) => { el.setScrollFactor(0).setDepth(depth); elements.push(el); return el; };

        mk(s.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, 800, 600, 0x000000, 0));

        const overlay = mk(s.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, 800, 600, 0x880000, 0));
        s.tweens.add({ targets: overlay, alpha: 0.6, duration: 1000 });

        const title = mk(s.add.text(400, 200, 'YOU DIED', {
            fontSize: '48px', fill: '#e74c3c', fontFamily: 'Georgia', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 4
        }).setOrigin(0.5).setAlpha(0));
        s.tweens.add({ targets: title, alpha: 1, duration: 1500, delay: 300, ease: 'Sine.easeIn' });

        const deathCount = mk(s.add.text(400, 260, 'Death #' + s.deaths, {
            fontSize: '14px', fill: '#999', fontFamily: 'Arial',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setAlpha(0));
        s.tweens.add({ targets: deathCount, alpha: 1, duration: 1000, delay: 800 });

        let penaltyText = '';
        if (goldLost > 0) penaltyText += '-' + goldLost + ' Gold';
        if (goldLost > 0 && expLost > 0) penaltyText += '  ';
        if (expLost > 0) penaltyText += '-' + expLost + ' EXP';
        if (!penaltyText) penaltyText = 'No gold or EXP to lose';

        const penalty = mk(s.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2, penaltyText, {
            fontSize: '16px', fill: '#f39c12', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setAlpha(0));
        s.tweens.add({ targets: penalty, alpha: 1, duration: 1000, delay: 1200 });

        let canContinue = false;
        s.time.delayedCall(1500, () => { canContinue = true; });

        const continueBtn = mk(s.add.rectangle(400, 400, 200, 40, 0x27ae60)
            .setStrokeStyle(2, 0x2ecc71).setInteractive({ useHandCursor: true }).setAlpha(0));
        const continueLbl = mk(s.add.text(400, 400, 'Continue', {
            fontSize: '18px', fill: '#fff', fontFamily: 'Georgia', fontStyle: 'bold'
        }).setOrigin(0.5).setAlpha(0));
        s.tweens.add({ targets: [continueBtn, continueLbl], alpha: 1, duration: 800, delay: 1800 });

        const doRespawn = () => {
            if (!canContinue) return;
            canContinue = false;
            elements.forEach(el => el.destroy());
            s.menuOpen = false;
            s.physics.resume();

            if (s.zone === 'arena') { s.player.x = 400; s.player.y = 500; }
            else if (s.zone === 'meadow') { s.player.x = 400; s.player.y = 500; }
            else if (s.zone === 'mine' || s.zone === 'mine_boss') { s.player.x = 400; s.player.y = 520; }
            else if (s.zone === 'cave') { s.player.x = (s.caveOffsetX || 0) + 400; s.player.y = 50; }
            else if (s.zone === 'village') { s.player.x = (s.villageOffsetX || 0) + 400; s.player.y = 200; }
            else if (s.zone === 'hell') { s.player.x = (s.hellOffsetX || 0) + 450; s.player.y = 200; }
            else if (s.zone === 'depths') { s.player.x = (s.depthsOffsetX || 0) + 400; s.player.y = 200; }
            else if (s.zone === 'cursed') { s.player.x = (s.cursedOffsetX || 0) + 450; s.player.y = 200; }
            else if (s.zone === 'shadow') { s.player.x = (s.shadowOffsetX || 0) + 400; s.player.y = 150; }
            else if (s.zone === 'tower') { s.player.x = (s.towerOffsetX || 0) + 400; s.player.y = 150; }
            else if (s.zone === 'throne') { s.player.x = (s.throneOffsetX || 0) + 400; s.player.y = 500; }
            else if (s.zone === 'snowy') { s.player.x = (s.villageOffsetX || 0) + 400; s.player.y = 200; }
            else if (s.zone === 'castle') { s.player.x = 400; s.player.y = 500; }
            else { s.player.x = 400; s.player.y = 120; }
            s.recalcStats();
            s.playerHP = s.playerMaxHP;
            s.invincible = true;
            s.player.setAlpha(0.4);
            s.floatingText(s.player.x, s.player.y - 50, 'Protected for 3s', '#2ecc71');
            s.time.delayedCall(3000, () => {
                if (s.player && s.player.active) { s.player.clearTint(); s.player.setAlpha(1); }
                s.invincible = false;
            });
            s.cameras.main.shake(200, 0.01);
            s.updateUI();
        };

        continueBtn.on('pointerover', () => continueBtn.setFillStyle(0x2ecc71));
        continueBtn.on('pointerout', () => continueBtn.setFillStyle(0x27ae60));
        continueBtn.on('pointerdown', doRespawn);
        s.input.keyboard.once('keydown-SPACE', doRespawn);
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
        const glow = s.add.circle(px, py, 14, cls.meleeColor || 0xf1c40f, 0.5).setDepth(14);
        fb.glow = glow;
        s.tweens.add({ targets: fb, scaleX: 1.3, scaleY: 1.3, duration: 80, yoyo: true, repeat: -1 });
        for (let i = 0; i < 3; i++) {
            const trail = s.add.circle(
                px - vx * 0.02 * i, py - vy * 0.02 * i,
                6 - i * 1.5, cls.meleeColor || 0xf1c40f, 0.6 - i * 0.15
            ).setDepth(14);
            s.tweens.add({ targets: trail, alpha: 0, scaleX: 0.3, scaleY: 0.3, duration: 250 + i * 80, onComplete: () => trail.destroy() });
        }
    }

    _attackThrust(ax, ay, range, dmg, color, cls) {
        const s = this.scene;
        const thrustAngle = s.facing === 'left' ? 180 : s.facing === 'up' ? -90 : s.facing === 'down' ? 90 : 0;
        const proj = s.add.sprite(s.player.x, s.player.y, 'attack_arrow').setDepth(15).setTint(color || 0xe74c3c).setAngle(thrustAngle);
        const speed = 500;
        s.tweens.add({
            targets: proj, x: ax, y: ay, alpha: 0, duration: range / speed * 1000,
            onComplete: () => proj.destroy()
        });
        const trailGlow = s.add.circle(s.player.x, s.player.y, 8, color || 0xe74c3c, 0.35).setDepth(14);
        s.tweens.add({
            targets: trailGlow, x: ax, y: ay, alpha: 0, scaleX: 0.2, scaleY: 0.2,
            duration: range / speed * 1000,
            onComplete: () => trailGlow.destroy()
        });
        this._hitAt(ax, ay, 18, dmg, cls);
        s.player.setTint(color || 0xe74c3c);
        s.time.delayedCall(80, () => { if (s.player.active) s.player.clearTint(); });
        s.cameras.main.shake(60, 0.003);
    }

    _attackCleave(ax, ay, range, dmg, color, cls) {
        const s = this.scene;
        const areaDmgBonus = s.computedAreaDamage ? 1 + s.computedAreaDamage / 100 : 1;
        const finalDmg = Math.floor(dmg * areaDmgBonus);
        const perpX = s.facing === 'up' || s.facing === 'down' ? 1 : 0;
        const perpY = s.facing === 'left' || s.facing === 'right' ? 1 : 0;
        const angle = s.facing === 'left' ? 180 : s.facing === 'up' ? -90 : s.facing === 'down' ? 90 : 0;
        for (let i = -1; i <= 1; i++) {
            const sx = ax + i * 10 * perpX;
            const sy = ay + i * 10 * perpY;
            const sl = s.add.sprite(sx, sy, 'slash').setAlpha(0.9).setTint(color || 0xaaddff).setAngle(angle);
            s.tweens.add({ targets: sl, alpha: 0, scaleX: 1.8, scaleY: 1.8, duration: 220, delay: Math.abs(i) * 30, onComplete: () => sl.destroy() });
        }
        const arcGlow = s.add.circle(ax, ay, range * 0.5, color || 0xaaddff, 0.12).setDepth(13);
        s.tweens.add({ targets: arcGlow, alpha: 0, scaleX: 1.5, scaleY: 1.5, duration: 250, onComplete: () => arcGlow.destroy() });
        const enemies = [];
        this._collectInRange(s.enemies, ax, ay, range, (e) => {
            if (this._inArc(s.player, e, 120)) enemies.push(e);
        });
        enemies.forEach(e => this.hitEnemy(e, finalDmg, {}));
        if (cls && cls.key === 'alchemist') enemies.forEach(e => this._applyArmorShred(e));
        s.player.setTint(color || 0xaaddff);
        s.time.delayedCall(120, () => { if (s.player.active) s.player.clearTint(); });
    }

    _attackBurst(ax, ay, dmg, cls) {
        const s = this.scene;
        const areaDmgBonus = s.computedAreaDamage ? 1 + s.computedAreaDamage / 100 : 1;
        const finalDmg = Math.floor(dmg * areaDmgBonus);
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
            fb.damage = Math.floor(finalDmg * 0.6);
            fb.lifespan = 0.5;
            fb.isMeleeProjectile = true;
            s.fireballs.push(fb);
            const acidTrail = s.add.circle(px, py, 5, cls?.meleeColor || 0x27ae60, 0.4).setDepth(14);
            s.tweens.add({
                targets: acidTrail, x: px + Math.cos(rad) * 40, y: py + Math.sin(rad) * 40,
                alpha: 0, scaleX: 2, scaleY: 2, duration: 350,
                onComplete: () => acidTrail.destroy()
            });
        });
        const splashRadius = s.add.circle(s.player.x, s.player.y, 30, cls?.meleeColor || 0x27ae60, 0.15).setDepth(13);
        s.tweens.add({ targets: splashRadius, alpha: 0, scaleX: 1.8, scaleY: 1.8, duration: 300, onComplete: () => splashRadius.destroy() });
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
        const areaDmgBonus = s.computedAreaDamage ? 1 + s.computedAreaDamage / 100 : 1;
        const finalDmg = Math.floor(dmg * areaDmgBonus);
        for (let i = 0; i < 4; i++) {
            const sl = s.add.sprite(ax, ay, 'slash').setAlpha(0.6).setTint(color || 0xaaddff);
            sl.setAngle(i * 90);
            s.tweens.add({ targets: sl, alpha: 0, scaleX: 1.8, scaleY: 1.8, duration: 350, delay: i * 60, onComplete: () => sl.destroy() });
        }
        this._hitAllAround(s.player.x, s.player.y, 55, finalDmg, cls);
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
            if (s.stats.hp <= 0) { recordKill('ice_shard'); if (s.hpBg) { s.hpBg.destroy(); s.hpBg = null; } if (s.hpFill) { s.hpFill.destroy(); s.hpFill = null; } s.destroy(); }
        });
        if (this.scene.snowyIceSpirit && this.scene.snowyIceSpirit.active && this.scene.snowyIceSpirit.stats &&
            Phaser.Math.Distance.Between(ax, ay, this.scene.snowyIceSpirit.x, this.scene.snowyIceSpirit.y) < hitRadius) {
            this.hitEnemy(this.scene.snowyIceSpirit, dmg);
            if (isAlchemist) this._applyArmorShred(this.scene.snowyIceSpirit);
        }

        // Obstacles: hit bushes and fences
        this._hitObstacles(ax, ay, hitRadius, dmg);
    }

    _hitObstacles(ax, ay, radius, dmg) {
        const s = this.scene;
        if (!s.obstacles) return;
        s.obstacles.getChildren().forEach(obs => {
            if (!obs.active) return;
            const d = Phaser.Math.Distance.Between(ax, ay, obs.x, obs.y);
            if (d > radius) return;
            if (obs._isBush) {
                obs.hp--;
                s.floatingText(obs.x, obs.y - 20, '!', '#27ae60');
                if (obs.hp <= 0) {
                    const ox = obs.x, oy = obs.y;
                    obs.destroy();
                    s.floatingText(ox, oy, 'Bush broken', '#27ae60');
                }
            } else if (obs._isFence) {
                obs.hp--;
                obs.setTint(0xffffff);
                s.floatingText(obs.x, obs.y - 20, '!', '#8b4513');
                if (obs.hp <= 0) {
                    const ox = obs.x, oy = obs.y;
                    obs.destroy();
                    s.floatingText(ox, oy, 'Fence broken', '#8b4513');
                }
            }
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
            if (enemy.stats && enemy.stats.key) {
                const atkType = getPlayerAttackType(s);
                const weakMult = getWeaknessMultiplier(atkType, enemy.stats.key);
                if (weakMult !== 1.0) finalDamage = Math.floor(finalDamage * weakMult);
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
            const luckyChance = 3 + s._luckyHitCounter;
            if (Math.random() * 100 < luckyChance) {
                const luckyMult = 1.5 + Math.min(s._luckyHitCounter, 10) * 0.05;
                finalDamage = Math.floor(finalDamage * luckyMult);
                s.floatingText(enemy.x, enemy.y - 40, 'LUCKY!', '#ff6600');
                s._luckyHitCounter = 0;
            } else {
                s._luckyHitCounter = Math.min((s._luckyHitCounter || 0) + 1, 50);
            }
            if (enemy.armorShredStacks && enemy.armorShredStacks > 0) finalDamage = Math.floor(finalDamage * (1 + enemy.armorShredStacks * 0.05));
            // Player armor reduction: increases all damage dealt to enemies
            if (s.computedArmorReduction > 0) finalDamage = Math.floor(finalDamage * (1 + s.computedArmorReduction / 100));
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
