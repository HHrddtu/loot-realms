import Phaser from 'phaser';
import { playHit, playBossAoE } from '../sound.js';

export class EnemyAI {
    static WANDER_SPEED = 50;
    static CHASE_RANGE = 200;
    static WANDER_TICK = 60;
    static LEASH_DIST = 280;

    static _detectRange(e, scene) {
        const noise = scene._materialSensors?.moveNoise || 0;
        const roleRanges = { archer: 250, mage: 250, assassin: 180, tank: 150, healer: 180,
            poison: 180, necro: 200, fire: 180, swarm: 200 };
        const base = roleRanges[e.stats?.role] || this.CHASE_RANGE;
        return base * (1 + noise);
    }

    static _initSpawn(e) {
        if (e._spawnX === undefined) { e._spawnX = e.x; e._spawnY = e.y; }
    }

    static _leashCheck(e, player, scene) {
        this._initSpawn(e);
        const dx = e.x - e._spawnX, dy = e.y - e._spawnY;
        const fromSpawn = Math.sqrt(dx * dx + dy * dy);
        if (fromSpawn > this.LEASH_DIST) {
            const angle = Math.atan2(e._spawnY - e.y, e._spawnX - e.x);
            e.body.setVelocity(Math.cos(angle) * 80, Math.sin(angle) * 80);
            e.setFlipX(Math.cos(angle) < 0);
            if (fromSpawn < this.LEASH_DIST + 20 && e.stats.hp < e.stats.maxHp) {
                e.stats.hp = Math.min(e.stats.maxHp, e.stats.hp + 2);
            }
            if (!e._leashAlert) {
                scene.floatingText(e.x, e.y - 30, 'LEASH!', '#ff4444');
                e._leashAlert = true;
            }
            return true;
        }
        e._leashAlert = false;
        return false;
    }

    static _alertDelay(e, dist, detectRange, scene) {
        if (dist >= detectRange) { e._alertTimer = null; e._alertShown = false; return false; }
        if (e._alertTimer === null) {
            e._alertTimer = 400 + Math.random() * 800;
            e._alertShown = false;
        }
        if (e._alertTimer > 0) {
            e._alertTimer -= 16;
            if (e._alertTimer < 400 && !e._alertShown) {
                e._alertShown = true;
                if (scene) {
                    const m = scene.add.text(e.x, e.y - 35, '!', { fontSize: '16px', fill: '#ff4444', fontFamily: 'Arial', fontStyle: 'bold', stroke: '#000', strokeThickness: 2 }).setOrigin(0.5).setDepth(12);
                    scene.tweens.add({ targets: m, y: m.y - 15, alpha: 0, duration: 600, onComplete: () => m.destroy() });
                }
            }
            if (e._alertTimer <= 0) { e._alertTimer = 0; return true; }
            return false;
        }
        return true;
    }

    static _separation(e, scene) {
        if (!scene.enemies) return;
        let pushX = 0, pushY = 0;
        scene.enemies.getChildren().forEach(other => {
            if (other === e || !other.active || !other.body) return;
            const dx = e.x - other.x, dy = e.y - other.y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < 30 && d > 0) {
                const force = (30 - d) / 30 * 40;
                pushX += (dx / d) * force;
                pushY += (dy / d) * force;
            }
        });
        if (pushX !== 0 || pushY !== 0) {
            e.body.setVelocity(e.body.velocity.x + pushX, e.body.velocity.y + pushY);
        }
    }

    static updateWanderChase(e, player, scene) {
        if (!e.active || !e.stats) return;
        this._updateHpBar(e);

        if (scene.menuOpen || scene.transitioning) { e.body.setVelocity(0); return; }
        if (e.stats.tutorial && e.stats.hp >= e.stats.maxHp) { e.body.setVelocity(0); return; }
        if (e.stats.patrol && e.stats.patrol.length > 0 && e.stats.hp >= e.stats.maxHp) { this._patrol(e, scene); return; }

        const role = e.stats.role || 'dps';
        const dist = Phaser.Math.Distance.Between(player.x, player.y, e.x, e.y);

        // Leash: if too far from spawn, return
        if (this._leashCheck(e, player, scene)) return;

        // Separation: push apart from nearby enemies
        this._separation(e, scene);

        // Alert delay: staggered aggro
        const detectRange = this._detectRange(e, scene);
        if (dist < detectRange && !e._alerted) {
            if (e._alertTimer === undefined) { e._alertTimer = null; e._alertShown = false; }
            const ready = this._alertDelay(e, dist, detectRange, scene);
            if (!ready) { e.body.setVelocity(0); return; }
            e._alerted = true;
            e._alertTimer = undefined;
        }
        if (dist >= detectRange) e._alerted = false;

        switch (role) {
            case 'archer': this._rangedBehavior(e, player, dist, scene); break;
            case 'healer': this._healerBehavior(e, player, dist, scene); break;
            case 'tank': this._tankBehavior(e, player, dist, scene); break;
            case 'assassin': this._assassinBehavior(e, player, dist, scene); break;
            case 'mage': this._mageBehavior(e, player, dist, scene); break;
            case 'poison': this._poisonBehavior(e, player, dist, scene); break;
            case 'necro': this._necroBehavior(e, player, dist, scene); break;
            case 'fire': this._fireBehavior(e, player, dist, scene); break;
            case 'swarm': this._swarmBehavior(e, player, dist, scene); break;
            default: this._defaultBehavior(e, player, dist, scene); break;
        }
    }

    static _defaultBehavior(e, player, dist, scene) {
        if (dist < this._detectRange(e, scene)) this._chase(e, player, dist);
        else this._wander(e);
    }

    static _patrol(e, scene) {
        const patrol = e.stats.patrol;
        if (!patrol || patrol.length === 0) return;
        if (!e._patrolIdx) e._patrolIdx = 0;
        const target = patrol[e._patrolIdx];
        const dx = target.x - e.x, dy = target.y - e.y, d = Math.sqrt(dx * dx + dy * dy);
        if (d < 15) e._patrolIdx = (e._patrolIdx + 1) % patrol.length;
        else { e.body.setVelocity((dx / d) * 35, (dy / d) * 35); e.setFlipX(dx < 0); }
        const pDist = Phaser.Math.Distance.Between(scene.player.x, scene.player.y, e.x, e.y);
        if (pDist < 100) { e.stats.patrol = null; e.stats.hp = e.stats.maxHp; }
    }

    static _rangedBehavior(e, player, dist, scene) {
        const preferredDist = 120;
        const dx = player.x - e.x, dy = player.y - e.y, len = dist || 1;
        e.stats.attackTimer = (e.stats.attackTimer || 0) + scene.game.loop.delta;
        if (dist < preferredDist - 20) { e.body.setVelocity((-dx / len) * 60, (-dy / len) * 60); e.setFlipX(dx < 0); }
        else if (dist > preferredDist + 40) { e.body.setVelocity((dx / len) * 50, (dy / len) * 50); e.setFlipX(dx < 0); }
        else { e.body.setVelocity(0); if (e.stats.attackTimer >= 2000) { e.stats.attackTimer = 0; this._rangedAttack(e, player, scene); } }
    }

    static _rangedAttack(e, player, scene) {
        const dmg = e.stats.damage || 10;
        const dist = Phaser.Math.Distance.Between(e.x, e.y, player.x, player.y);
        if (dist > 250) return;
        const color = e.stats.role === 'mage' ? 0x9b59b6 : 0xe67e22;
        const colorHex = '#' + color.toString(16).padStart(6, '0');
        playHit();
        const windup = scene.add.circle(e.x, e.y, 6, color, 0.6).setDepth(10);
        scene.tweens.add({ targets: windup, scale: 1.5, alpha: 0, duration: 300, onComplete: () => windup.destroy() });
        scene.time.delayedCall(250, () => {
            const proj = scene.add.circle(e.x, e.y, 4, color, 0.9).setDepth(11);
            const trail = scene.add.circle(e.x, e.y, 2, color, 0.4).setDepth(10);
            scene.tweens.add({ targets: [proj, trail], x: player.x, y: player.y, duration: 250, ease: 'Linear',
                onComplete: () => {
                    if (proj.active) proj.destroy(); if (trail.active) trail.destroy();
                    const hit = scene.add.circle(player.x, player.y, 10, color, 0.5).setDepth(11);
                    scene.tweens.add({ targets: hit, alpha: 0, scale: 2, duration: 300, onComplete: () => hit.destroy() });
                    const d2 = Phaser.Math.Distance.Between(e.x, e.y, player.x, player.y);
                    if (d2 < 250) { scene.combat.takeDamage(dmg); scene.floatingText(player.x, player.y - 30, '-' + dmg, colorHex); player.setTint(color); scene.time.delayedCall(100, () => { if (player.active) player.clearTint(); }); }
                }
            });
        });
    }

    static _healerBehavior(e, player, dist, scene) {
        const hpPct = e.stats.hp / e.stats.maxHp;
        e.stats.healTimer = (e.stats.healTimer || 0) + scene.game.loop.delta;
        if (hpPct < 0.4) { const dx = player.x - e.x, dy = player.y - e.y; e.body.setVelocity((-dx / dist) * 70, (-dy / dist) * 70); e.setFlipX(dx < 0); }
        else if (e.stats.healTimer >= 3000) { e.stats.healTimer = 0; this._healNearbyAllies(e, scene); }
        if (dist < this._detectRange(e, scene) * 0.6) this._chase(e, player, dist); else this._wander(e);
    }

    static _healNearbyAllies(e, scene) {
        if (!scene.enemies) return;
        let healedAny = false;
        scene.enemies.getChildren().forEach(ally => {
            if (!ally.active || ally === e || !ally.stats) return;
            const d = Phaser.Math.Distance.Between(e.x, e.y, ally.x, ally.y);
            if (d < 120 && ally.stats.hp < ally.stats.maxHp) {
                const heal = Math.floor(ally.stats.maxHp * 0.2);
                ally.stats.hp = Math.min(ally.stats.maxHp, ally.stats.hp + heal);
                scene.floatingText(ally.x, ally.y - 25, '+' + heal, '#2ecc71'); healedAny = true;
                const fx1 = scene.add.circle(ally.x, ally.y, 20, 0x2ecc71, 0.4).setDepth(10);
                const fx2 = scene.add.circle(ally.x, ally.y - 10, 8, 0x2ecc71, 0.6).setDepth(10);
                scene.tweens.add({ targets: fx1, alpha: 0, scale: 2, duration: 800, onComplete: () => fx1.destroy() });
                scene.tweens.add({ targets: fx2, alpha: 0, y: ally.y - 40, duration: 600, onComplete: () => fx2.destroy() });
                for (let i = 0; i < 3; i++) {
                    const spark = scene.add.circle(ally.x + Phaser.Math.Between(-15, 15), ally.y + Phaser.Math.Between(-15, 5), 2, 0x2ecc71, 0.8).setDepth(11);
                    scene.tweens.add({ targets: spark, y: spark.y - 20, alpha: 0, duration: 400 + i * 100, onComplete: () => spark.destroy() });
                }
            }
        });
        if (healedAny) { scene.floatingText(e.x, e.y - 30, 'HEAL!', '#2ecc71'); playHit(); const aura = scene.add.circle(e.x, e.y, 30, 0x2ecc71, 0.2).setDepth(9); scene.tweens.add({ targets: aura, alpha: 0, scale: 1.8, duration: 600, onComplete: () => aura.destroy() }); }
    }

    static _tankBehavior(e, player, dist, scene) {
        e.stats.tauntTimer = (e.stats.tauntTimer || 0) + scene.game.loop.delta;
        if (dist < 100 && e.stats.tauntTimer >= 5000) {
            e.stats.tauntTimer = 0;
            const ring = scene.add.circle(e.x, e.y, 5, 0xe74c3c, 0.6).setDepth(10);
            scene.tweens.add({ targets: ring, scale: 4, alpha: 0, duration: 600, onComplete: () => ring.destroy() });
            playBossAoE(); e.setTint(0xff4444); scene.floatingText(e.x, e.y - 35, 'TAUNT!', '#e74c3c');
            const speed = (e.stats.speed || 40) * 1.6;
            const dx = player.x - e.x, dy = player.y - e.y;
            e.body.setVelocity((dx / dist) * speed, (dy / dist) * speed);
            scene.time.delayedCall(400, () => { if (e.active) e.clearTint(); });
        } else { this._chase(e, player, dist); }
    }

    static _assassinBehavior(e, player, dist, scene) {
        e.stats.dashTimer = (e.stats.dashTimer || 0) + scene.game.loop.delta;
        if (dist > 80 && dist < 200 && e.stats.dashTimer >= 3500) {
            e.stats.dashTimer = 0;
            const afterimage1 = scene.add.sprite(e.x, e.y, e.texture.key || 'shadow_stalker').setAlpha(0.4).setTint(0x8844ff).setDepth(8);
            const afterimage2 = scene.add.sprite(e.x, e.y, e.texture.key || 'shadow_stalker').setAlpha(0.2).setTint(0x8844ff).setDepth(8);
            const angle = Math.atan2(player.y - e.y, player.x - e.x);
            const tx = player.x - Math.cos(angle) * 25, ty = player.y - Math.sin(angle) * 25;
            e.setAlpha(0.3).setTint(0x8844ff);
            scene.tweens.add({ targets: e, x: tx, y: ty, duration: 180, ease: 'Power3', onComplete: () => {
                if (!e.active) return; e.setAlpha(1).clearTint();
                const impact = scene.add.circle(e.x, e.y, 15, 0x8844ff, 0.5).setDepth(11);
                scene.tweens.add({ targets: impact, alpha: 0, scale: 2, duration: 300, onComplete: () => impact.destroy() });
                for (let i = 0; i < 4; i++) {
                    const spark = scene.add.circle(e.x + Phaser.Math.Between(-10, 10), e.y + Phaser.Math.Between(-10, 10), 2, 0xbb77ff, 0.8).setDepth(11);
                    scene.tweens.add({ targets: spark, y: spark.y - 15, alpha: 0, duration: 300 + i * 50, onComplete: () => spark.destroy() });
                }
                const d = Phaser.Math.Distance.Between(e.x, e.y, player.x, player.y);
                if (d < 45) { const dmg = Math.floor(e.stats.damage * 1.6); scene.combat.takeDamage(dmg); playHit(); scene.floatingText(player.x, player.y - 30, '-' + dmg + ' BACKSTAB!', '#8844ff'); player.setTint(0x8844ff); scene.time.delayedCall(150, () => { if (player.active) player.clearTint(); }); }
            }});
            scene.tweens.add({ targets: afterimage1, alpha: 0, duration: 400, onComplete: () => { if (afterimage1.active) afterimage1.destroy(); } });
            scene.tweens.add({ targets: afterimage2, alpha: 0, duration: 500, delay: 100, onComplete: () => { if (afterimage2.active) afterimage2.destroy(); } });
        } else if (dist < 50) { const dx = player.x - e.x, dy = player.y - e.y; e.body.setVelocity((dx / dist) * 60, (dy / dist) * 60); e.setFlipX(dx < 0); }
        else { this._wander(e); }
    }

    static _mageBehavior(e, player, dist, scene) {
        e.stats.castTimer = (e.stats.castTimer || 0) + scene.game.loop.delta;
        const preferredDist = 100;
        const dx = player.x - e.x, dy = player.y - e.y;
        if (dist < preferredDist - 30) { e.body.setVelocity((-dx / dist) * 55, (-dy / dist) * 55); e.setFlipX(dx < 0); }
        else if (dist > preferredDist + 50) { e.body.setVelocity((dx / dist) * 45, (dy / dist) * 45); e.setFlipX(dx < 0); }
        else { e.body.setVelocity(0); if (e.stats.castTimer >= 3000) { e.stats.castTimer = 0; this._mageAttack(e, player, scene); } }
    }

    static _mageAttack(e, player, scene) {
        const dmg = Math.floor(e.stats.damage * 0.9), radius = 55;
        playBossAoE();
        const warning = scene.add.circle(player.x, player.y, radius, 0xff4444, 0.15).setDepth(9);
        scene.tweens.add({ targets: warning, alpha: 0.4, duration: 500, onComplete: () => { scene.tweens.add({ targets: warning, alpha: 0, duration: 200, onComplete: () => warning.destroy() }); } });
        scene.time.delayedCall(600, () => {
            const burst = scene.add.circle(player.x, player.y, 5, 0x9b59b6, 0.9).setDepth(11);
            scene.tweens.add({ targets: burst, scale: radius / 5, alpha: 0, duration: 400, onComplete: () => burst.destroy() });
            for (let i = 0; i < 6; i++) {
                const angle = (i / 6) * Math.PI * 2;
                const spark = scene.add.circle(player.x + Math.cos(angle) * 20, player.y + Math.sin(angle) * 20, 3, 0xbb77dd, 0.9).setDepth(11);
                scene.tweens.add({ targets: spark, x: player.x + Math.cos(angle) * radius, y: player.y + Math.sin(angle) * radius, alpha: 0, duration: 300, delay: i * 30, onComplete: () => spark.destroy() });
            }
            const d = Phaser.Math.Distance.Between(e.x, e.y, player.x, player.y);
            if (d < 200) { scene.combat.takeDamage(dmg); scene.floatingText(player.x, player.y - 30, '-' + dmg + ' ARCANE', '#9b59b6'); player.setTint(0x9b59b6); scene.time.delayedCall(150, () => { if (player.active) player.clearTint(); }); }
        });
    }

    static _updateHpBar(e) {
        e.hpBg.x = e.x; e.hpBg.y = e.y - e.stats.bh / 2 - 8;
        e.hpFill.x = e.x; e.hpFill.y = e.hpBg.y;
        if (e.hpFill) e.hpFill.width = e.hpBg.width * (e.stats.hp / e.stats.maxHp);
        if (e.shieldIcon) { e.shieldIcon.x = e.x; e.shieldIcon.y = e.y - e.stats.bh / 2 - 16; }
        if (e.roleIcon) { e.roleIcon.x = e.x; e.roleIcon.y = e.y - e.stats.bh / 2 - 16; }
        if (!e._roleTintApplied && !e.stats.invisible) {
            const tints = { healer: 0x44ff44, mage: 0xaa66ff, assassin: 0xff44ff, fire: 0xff6622, poison: 0x44ff88, necro: 0xaa44ff, swarm: 0xffaa44, tank: 0x88aaff };
            if (tints[e.stats.role]) { e.setTint(tints[e.stats.role]); e._roleTintApplied = true; }
        }
        if (!e._auraTimer) e._auraTimer = 0; e._auraTimer++;
        if (e._auraTimer % 40 === 0 && e.active) {
            const auras = { healer: 0x2ecc71, mage: 0x9b59b6, fire: 0xe74c3c, poison: 0x27ae60, necro: 0x8e44ad };
            if (auras[e.stats.role] && e.scene) { const aura = e.scene.add.circle(e.x, e.y + e.stats.bh / 2, 4, auras[e.stats.role], 0.3).setDepth(5); e.scene.tweens.add({ targets: aura, alpha: 0, y: aura.y - 10, duration: 800, onComplete: () => aura.destroy() }); }
        }
    }

    static _chase(e, player, dist) {
        const dx = player.x - e.x, dy = player.y - e.y;
        const spd = e.stats.speed || 50;
        const engageDist = e.stats.engageDist || 30;
        if (dist > engageDist) { const chaseSpd = dist < 80 ? spd * 1.4 : spd; e.body.setVelocity((dx / dist) * chaseSpd, (dy / dist) * chaseSpd); e.setFlipX(dx < 0); }
        else e.body.setVelocity(0);
        if (e.walkAnimKey && (!e.anims.isPlaying || e.anims.currentAnim.key !== e.walkAnimKey)) e.play(e.walkAnimKey);
    }

    static _wander(e) {
        e.stats.wTimer = (e.stats.wTimer || 0) + 1;
        if (e.stats.wTimer > this.WANDER_TICK) { e.stats.wTimer = 0; e.stats.wDir = Math.floor(Math.random() * 5); }
        const sp = this.WANDER_SPEED;
        if (e.stats.wDir === 1) e.body.setVelocityX(-sp);
        else if (e.stats.wDir === 2) e.body.setVelocityX(sp);
        else if (e.stats.wDir === 3) e.body.setVelocityY(-sp);
        else if (e.stats.wDir === 4) e.body.setVelocityY(sp);
        else e.body.setVelocity(0);
        if (e.stats.wDir !== 0 && e.walkAnimKey) { if (!e.anims.isPlaying || e.anims.currentAnim.key !== e.walkAnimKey) e.play(e.walkAnimKey); e.setFlipX(e.body.velocity.x < 0); }
        else if (e.stats.wDir === 0) { e.stop(); e.setFrame(0); }
    }

    static _poisonBehavior(e, player, dist, scene) {
        e.stats.attackTimer = (e.stats.attackTimer || 0) + scene.game.loop.delta;
        if (dist < 60) {
            if (e.stats.attackTimer >= 1500) {
                e.stats.attackTimer = 0; const dmg = Math.floor(e.stats.damage * 0.7);
                scene.combat.takeDamage(dmg); playHit(); scene.floatingText(player.x, player.y - 30, '-' + dmg + ' POISON', '#27ae60');
                if (!scene._poisonDot) { scene._poisonDot = true; scene._poisonTimer = 3000; player.setTint(0x27ae60); }
                else scene._poisonTimer = 3000;
                const cloud = scene.add.circle(e.x, e.y, 25, 0x27ae60, 0.4).setDepth(10);
                scene.tweens.add({ targets: cloud, alpha: 0, scale: 1.5, duration: 500, onComplete: () => cloud.destroy() });
            }
        } else if (dist < this._detectRange(e, scene)) this._chase(e, player, dist); else this._wander(e);
    }

    static _necroBehavior(e, player, dist, scene) {
        e.stats.summonTimer = (e.stats.summonTimer || 0) + scene.game.loop.delta;
        e.stats.attackTimer = (e.stats.attackTimer || 0) + scene.game.loop.delta;
        if (dist < 150 && e.stats.summonTimer >= 8000) { e.stats.summonTimer = 0; this._raiseDead(e, scene); }
        if (dist < 150 && e.stats.attackTimer >= 2500) { e.stats.attackTimer = 0; this._rangedAttack(e, player, scene); }
        else if (dist >= 150 && dist < this._detectRange(e, scene)) this._chase(e, player, dist); else this._wander(e);
    }

    static _raiseDead(e, scene) {
        if (!scene.enemies) return;
        if (scene.enemies.getLength() >= 15) return;
        scene.floatingText(e.x, e.y - 35, 'RAISE DEAD!', '#8e44ad'); playBossAoE();
        for (let i = 0; i < 2; i++) {
            const angle = (i / 2) * Math.PI * 2 + Math.random();
            const sx = e.x + Math.cos(angle) * 60, sy = e.y + Math.sin(angle) * 60;
            const zombie = scene.add.sprite(sx, sy, 'zombie_walk').setDepth(5).setAlpha(0);
            scene.physics.add.existing(zombie, false);
            zombie.body.setSize(14, 16); zombie.body.setCollideWorldBounds(true);
            if (scene.anims.exists('zombie_walk_anim')) zombie.play('zombie_walk_anim');
            const hp = Math.floor(60 * (scene.diffMulti.hp || 1));
            zombie.stats = { key: 'raised_dead', name: 'Raised Dead', hp, maxHp: hp, damage: Math.floor(10 * (scene.diffMulti.dmg || 1)), exp: 5, bw: 14, bh: 16, wTimer: 0, wDir: 0, role: 'dps', isRaised: true };
            zombie.hpBg = scene.add.rectangle(sx, sy - 20, 18, 3, 0x333333).setOrigin(0.5).setDepth(11);
            zombie.hpFill = scene.add.rectangle(sx, sy - 20, 18, 3, 0x8e44ad).setOrigin(0.5).setDepth(11);
            scene.tweens.add({ targets: zombie, alpha: 1, duration: 500 }); scene.enemies.add(zombie);
        }
    }

    static _fireBehavior(e, player, dist, scene) {
        e.stats.attackTimer = (e.stats.attackTimer || 0) + scene.game.loop.delta;
        if (dist < 80) {
            if (e.stats.attackTimer >= 2000) {
                e.stats.attackTimer = 0; const dmg = Math.floor(e.stats.damage * 0.9);
                scene.combat.takeDamage(dmg); playHit(); scene.floatingText(player.x, player.y - 30, '-' + dmg + ' FIRE', '#e74c3c');
                player.setTint(0xe74c3c); scene.time.delayedCall(200, () => { if (player.active) player.clearTint(); });
                const fire = scene.add.circle(player.x, player.y, 20, 0xe74c3c, 0.5).setDepth(10);
                scene.tweens.add({ targets: fire, alpha: 0, scale: 2, duration: 400, onComplete: () => fire.destroy() });
            }
        } else if (dist < this._detectRange(e, scene)) this._chase(e, player, dist); else this._wander(e);
    }

    static _swarmBehavior(e, player, dist, scene) {
        e.stats.swarmTimer = (e.stats.swarmTimer || 0) + scene.game.loop.delta;
        const nearbyAllies = [];
        if (scene.enemies) scene.enemies.getChildren().forEach(ally => {
            if (ally.active && ally !== e && ally.stats && ally.stats.key === e.stats.key) {
                const d = Phaser.Math.Distance.Between(e.x, e.y, ally.x, ally.y);
                if (d < 100) nearbyAllies.push(ally);
            }
        });
        const speedMult = 1 + nearbyAllies.length * 0.15;
        if (dist < 50) {
            if (e.stats.swarmTimer >= 1000) { e.stats.swarmTimer = 0; const dmg = Math.floor(e.stats.damage * (0.8 + nearbyAllies.length * 0.1)); scene.combat.takeDamage(dmg); playHit(); scene.floatingText(player.x, player.y - 30, '-' + dmg + ' SWARM', '#e67e22'); }
        } else if (dist < this._detectRange(e, scene)) { const dx = player.x - e.x, dy = player.y - e.y; e.body.setVelocity((dx / dist) * 55 * speedMult, (dy / dist) * 55 * speedMult); e.setFlipX(dx < 0); }
        else this._wander(e);
    }
}
