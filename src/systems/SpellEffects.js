import Phaser from 'phaser';

export class SpellEffects {
    constructor(scene) {
        this.scene = scene;
    }

    _castShield(spell) {
        this.scene.shieldActive = true;
        this.scene.shieldHP = spell.absorption + Math.floor(this.scene.playerMaxHP * 0.1);
        this.scene.shieldTimer = spell.duration;
        this.scene.shieldVfx = this.scene.add.sprite(this.scene.player.x, this.scene.player.y, 'shield_vfx')
            .setDepth(15).setAlpha(0.8);
        this.scene.tweens.add({
            targets: this.scene.shieldVfx, alpha: 0.4, duration: 500, yoyo: true, repeat: -1
        });
        // Shield glow ring
        this.scene.shieldGlow = this.scene.add.circle(this.scene.player.x, this.scene.player.y, 30, 0x3498db, 0.2).setDepth(14);
        this.scene.tweens.add({
            targets: this.scene.shieldGlow, scaleX: 1.3, scaleY: 1.3, alpha: 0.1, duration: 800, yoyo: true, repeat: -1
        });
        if (this.scene.particles) this.scene.particles.spawnShieldEffect(this.scene.player.x, this.scene.player.y);
        this.scene.floatingText(this.scene.player.x, this.scene.player.y - 30, 'SHIELD!', '#3498db');
    }

    _castHeal(spell) {
        const healAmt = Math.floor(this.scene.playerMaxHP * spell.healPercent);
        this.scene.playerHP = Math.min(this.scene.playerMaxHP, this.scene.playerHP + healAmt);
        
        // Heal VFX - expanding light burst
        const healVfx = this.scene.add.sprite(this.scene.player.x, this.scene.player.y, 'heal_vfx').setDepth(15);
        this.scene.tweens.add({
            targets: healVfx, scaleX: 2.5, scaleY: 2.5, alpha: 0, duration: 700,
            onComplete: () => healVfx.destroy()
        });
        
        // Healing ring
        const ring = this.scene.add.circle(this.scene.player.x, this.scene.player.y, 5, 0x2ecc71, 0.8).setDepth(14);
        this.scene.tweens.add({
            targets: ring, scaleX: 3, scaleY: 3, alpha: 0, duration: 500,
            onComplete: () => ring.destroy()
        });
        
        // Green particles rising
        if (this.scene.particles) this.scene.particles.spawnHealEffect(this.scene.player.x, this.scene.player.y);
        this.scene.floatingText(this.scene.player.x, this.scene.player.y - 30, '+' + healAmt + ' HP', '#2ecc71');
        this.scene.updateUI();
    }

    _castLifeLink(spell) {
        this.scene.shieldActive = true;
        this.scene.shieldHP = spell.absorption;
        this.scene.shieldTimer = spell.duration;
        this.scene.lifeLinkActive = true;
        this.scene.lifeLinkTimer = spell.duration;
        this.scene.lifeLinkHealPerSec = spell.healPerSec;
        this.scene.shieldVfx = this.scene.add.sprite(this.scene.player.x, this.scene.player.y, 'shield_vfx')
            .setDepth(15).setAlpha(0.8).setTint(0xf1c40f);
        this.scene.tweens.add({
            targets: this.scene.shieldVfx, alpha: 0.4, duration: 500, yoyo: true, repeat: -1
        });
        this.scene.floatingText(this.scene.player.x, this.scene.player.y - 30, 'LIFE LINK!', '#f1c40f');
    }

    _castPurify(spell) {
        const reduce = spell.corruptionReduce || 0;
        this.scene.corruption = Math.max(0, this.scene.corruption - reduce);
        const purifyHealMult = (this.scene.relicEffects && this.scene.relicEffects.purify_heal) ? 1.05 : 1;
        const healAmt = Math.floor(this.scene.playerMaxHP * spell.healPercent * purifyHealMult);
        this.scene.playerHP = Math.min(this.scene.playerMaxHP, this.scene.playerHP + healAmt);
        const purifyVfx = this.scene.add.sprite(this.scene.player.x, this.scene.player.y, 'heal_vfx').setDepth(15).setTint(0xf1c40f);
        this.scene.tweens.add({
            targets: purifyVfx, scaleX: 3, scaleY: 3, alpha: 0, duration: 800,
            onComplete: () => purifyVfx.destroy()
        });
        this.scene.floatingText(this.scene.player.x, this.scene.player.y - 30, 'PURIFY! -' + reduce + ' COR', '#f1c40f');
        this.scene.updateUI();
    }

    _castHolyShield(spell) {
        const pointer = this.scene.input.activePointer;
        const worldPoint = this.scene.cameras.main.getWorldPoint(pointer.x, pointer.y);
        let targetX = this.scene.player.x, targetY = this.scene.player.y, foundTarget = false;
        const allTargets = [
            ...(this.scene.enemies && this.scene.enemies.scene ? this.scene.enemies.getChildren() : []),
            ...(this.scene.villageZombies && this.scene.villageZombies.scene ? this.scene.villageZombies.getChildren() : []),
            ...(this.scene.depthsMinions && this.scene.depthsMinions.scene ? this.scene.depthsMinions.getChildren() : []),
            ...(this.scene.cursedMinions && this.scene.cursedMinions.scene ? this.scene.cursedMinions.getChildren() : []),
            ...(this.scene.shadowMinions && this.scene.shadowMinions.scene ? this.scene.shadowMinions.getChildren() : []),
            ...(this.scene.towerMinions && this.scene.towerMinions.scene ? this.scene.towerMinions.getChildren() : [])
        ];
        let nearestDist = 60;
        allTargets.forEach(e => {
            if (!e.active || !e.stats) return;
            const d = Phaser.Math.Distance.Between(worldPoint.x, worldPoint.y, e.x, e.y);
            if (d < nearestDist) { nearestDist = d; targetX = e.x; targetY = e.y; foundTarget = true; }
        });
        if (!foundTarget) {
            const pd = Phaser.Math.Distance.Between(worldPoint.x, worldPoint.y, this.scene.player.x, this.scene.player.y);
            if (pd < 60) { targetX = this.scene.player.x; targetY = this.scene.player.y; }
        }
        this.scene.shieldActive = true;
        this.scene.shieldHP = spell.absorption + Math.floor(this.scene.playerMaxHP * 0.1);
        this.scene.shieldTimer = spell.duration;
        this.scene.shieldTargetX = targetX;
        this.scene.shieldTargetY = targetY;
        this.scene.shieldVfx = this.scene.add.sprite(targetX, targetY, 'shield_vfx')
            .setDepth(15).setAlpha(0.8).setTint(0xf1c40f);
        this.scene.tweens.add({
            targets: this.scene.shieldVfx, alpha: 0.4, duration: 500, yoyo: true, repeat: -1
        });
        if (this.scene.particles) this.scene.particles.spawnShieldEffect(targetX, targetY);
        this.scene.floatingText(targetX, targetY - 30, 'HOLY SHIELD!', '#f1c40f');
    }

    _castHolyNova(spell) {
        const radius = spell.radius || 120;
        const healMult = (this.scene.computedHealPower || 0) / 100;
        const healAmt = Math.floor(this.scene.playerMaxHP * spell.healPercent * (1 + healMult));
        this.scene.playerHP = Math.min(this.scene.playerMaxHP, this.scene.playerHP + healAmt);
        const reduce = spell.corruptionReduce || 0;
        this.scene.corruption = Math.max(0, this.scene.corruption - reduce);
        const nova = this.scene.add.circle(this.scene.player.x, this.scene.player.y, 10, 0xf1c40f, 0.6).setDepth(15);
        this.scene.tweens.add({
            targets: nova, scaleX: radius / 10, scaleY: radius / 10, alpha: 0, duration: 400,
            onComplete: () => nova.destroy()
        });
        if (this.scene.particles) this.scene.particles.spawnHealEffect(this.scene.player.x, this.scene.player.y);
        this.scene.floatingText(this.scene.player.x, this.scene.player.y - 30, '+' + healAmt + ' HP', '#f1c40f');
        this.scene.floatingText(this.scene.player.x, this.scene.player.y - 50, 'HOLY NOVA!', '#f1c40f');
        this.scene.updateUI();
    }

    _castDivineBlessing(spell) {
        const healAmt = Math.floor(this.scene.playerMaxHP * spell.healPercent);
        this.scene.playerHP = Math.min(this.scene.playerMaxHP, this.scene.playerHP + healAmt);
        this.scene.floatingText(this.scene.player.x, this.scene.player.y - 30, '+' + healAmt + ' HP', '#f1c40f');
        this.scene.floatingText(this.scene.player.x, this.scene.player.y - 50, 'DIVINE BLESSING!', '#f1c40f');
        
        // Holy light VFX
        const vfx = this.scene.add.sprite(this.scene.player.x, this.scene.player.y, 'heal_vfx').setDepth(15).setTint(0xf1c40f);
        this.scene.tweens.add({
            targets: vfx, scaleX: 3, scaleY: 3, alpha: 0, duration: 800,
            onComplete: () => vfx.destroy()
        });
        
        // Expanding holy rings
        for (let i = 0; i < 3; i++) {
            const ring = this.scene.add.circle(this.scene.player.x, this.scene.player.y, 10 + (i * 15), 0xf1c40f, 0.6).setDepth(14);
            this.scene.tweens.add({
                targets: ring, scaleX: 2 + i * 0.5, scaleY: 2 + i * 0.5, alpha: 0, duration: 600, delay: i * 150,
                onComplete: () => ring.destroy()
            });
        }
        
        if (this.scene.particles) this.scene.particles.spawnHealEffect(this.scene.player.x, this.scene.player.y);
        this.scene._divineBlessingDmgBuff = spell.damageBuff;
        this.scene._divineBlessingDefBuff = spell.defenseBuff;
        this.scene._divineBlessingTimer = spell.buffDuration;
        this.scene.updateUI();
    }

    _castBurrow(spell) {
        if (this.scene._burrowing) return;
        this.scene._burrowing = true;
        this.scene.player.setAlpha(0.2);
        this.scene.invincible = true;
        const duration = spell.duration * 1000;
        const healAmt = Math.floor(this.scene.playerMaxHP * spell.healPercent);
        this.scene.floatingText(this.scene.player.x, this.scene.player.y - 30, 'BURROW!', '#8B4513');
        this.scene.time.delayedCall(duration, () => {
            this.scene._burrowing = false;
            this.scene.player.setAlpha(1);
            this.scene.invincible = false;
            this.scene.playerHP = Math.min(this.scene.playerMaxHP, this.scene.playerHP + healAmt);
            this.scene.floatingText(this.scene.player.x, this.scene.player.y - 30, '+' + healAmt + ' HP', '#2ecc71');
            if (this.scene.particles) this.scene.particles.spawnHealEffect(this.scene.player.x, this.scene.player.y);
            this.scene.updateUI();
        });
    }

    _castChemicalCloud(spell) {
        const pointer = this.scene.input.activePointer;
        const worldPoint = this.scene.cameras.main.getWorldPoint(pointer.x, pointer.y);
        const dist = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, worldPoint.x, worldPoint.y);
        const maxRange = spell.range || 200;
        const targetX = dist > maxRange
            ? this.scene.player.x + (worldPoint.x - this.scene.player.x) / dist * maxRange : worldPoint.x;
        const targetY = dist > maxRange
            ? this.scene.player.y + (worldPoint.y - this.scene.player.y) / dist * maxRange : worldPoint.y;

        // Cloud formation effect
        const cloudRadius = spell.radius || 90;
        
        // Outer toxic ring
        const outerRing = this.scene.add.circle(targetX, targetY, cloudRadius, 0x27ae60, 0).setDepth(10);
        this.scene.tweens.add({
            targets: outerRing, alpha: 0.4, scaleX: 1.2, scaleY: 1.2, duration: 400,
            onComplete: () => {
                this.scene.tweens.add({
                    targets: outerRing, alpha: { from: 0.3, to: 0.15 }, duration: 600, yoyo: true, repeat: -1
                });
            }
        });

        // Inner cloud core
        const cloud = this.scene.add.circle(targetX, targetY, cloudRadius * 0.6, 0x27ae60, 0.4).setDepth(11);
        this.scene.tweens.add({
            targets: cloud, alpha: { from: 0.4, to: 0.2 }, scaleX: { from: 1, to: 1.1 }, scaleY: { from: 1, to: 1.1 },
            duration: 1000, yoyo: true, repeat: -1
        });

        // Toxic bubbles
        const bubbles = [];
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const bx = targetX + Math.cos(angle) * cloudRadius * 0.5;
            const by = targetY + Math.sin(angle) * cloudRadius * 0.5;
            const bubble = this.scene.add.circle(bx, by, 4, 0x3ddc3d, 0.7).setDepth(12);
            bubbles.push(bubble);
            this.scene.tweens.add({
                targets: bubble, y: by - 15, alpha: 0, scaleX: 1.5, scaleY: 1.5,
                duration: 1200 + Math.random() * 800, repeat: -1, delay: Math.random() * 1000
            });
        }

        // Toxic puddle border
        const cloudBorder = this.scene.add.circle(targetX, targetY, cloudRadius).setDepth(10)
            .setStrokeStyle(3, 0x1a5e1a).setFillStyle(0x27ae60, 0.05);
        this.scene.tweens.add({
            targets: cloudBorder, alpha: { from: 0.5, to: 0.2 },
            duration: 800, yoyo: true, repeat: -1
        });

        this.scene.floatingText(targetX, targetY - 30, 'TOXIC CLOUD!', '#27ae60');

        const durationMs = spell.duration * 1000;
        let elapsed = 0;
        const tickInterval = 500;
        const radius = spell.radius || 90;
        const cleanup = () => {
            this.scene.tweens.killTweensOf(cloud); this.scene.tweens.killTweensOf(cloudBorder);
            this.scene.tweens.killTweensOf(outerRing);
            bubbles.forEach(b => { this.scene.tweens.killTweensOf(b); if (b.active) b.destroy(); });
            if (cloud.active) cloud.destroy(); if (cloudBorder.active) cloudBorder.destroy();
            if (outerRing.active) outerRing.destroy();
        };
        this.scene.time.addEvent({
            delay: tickInterval,
            callback: () => {
                elapsed += tickInterval;
                if (elapsed >= durationMs) { cleanup(); return; }
                const tickDmg = Math.floor(spell.damagePerSec * (tickInterval / 1000));
                this.scene.enemies.getChildren().forEach(e => {
                    if (!e.active || !e.stats) return;
                    if (Phaser.Math.Distance.Between(targetX, targetY, e.x, e.y) < radius) {
                        e.stats.hp -= tickDmg;
                        this.scene.floatingText(e.x, e.y - 15, '-' + tickDmg, '#27ae60');
                        if (e.stats.hp <= 0) {
                            if (e.stats.isBossClone) this.scene.zones.village.boss.killBossClone(e);
                            else this.scene.killEnemy(e);
                        }
                    }
                });
                ['boss', 'mineBoss', 'caveBoss', 'villageBoss', 'hellBoss', 'snowyIceSpirit', 'castleBoss'].forEach(bossKey => {
                    const boss = this.scene[bossKey];
                    if (boss && boss.active && boss.stats && Phaser.Math.Distance.Between(targetX, targetY, boss.x, boss.y) < radius) {
                        let dmg = tickDmg;
                        if (this.scene.computedBossDamage) dmg = Math.floor(dmg * (1 + this.scene.computedBossDamage / 100));
                        boss.stats.hp -= dmg;
                        this.scene.floatingText(boss.x, boss.y - 15, '-' + dmg, '#27ae60');
                        if (boss.hpFill) boss.hpFill.width = boss.hpBg.width * (boss.stats.hp / boss.stats.maxHp);
                        if (boss.stats.hp <= 0) {
                            if (bossKey === 'boss') this.scene.killBoss();
                            else if (bossKey === 'mineBoss') this.scene.killMineBoss();
                            else if (bossKey === 'caveBoss') this.scene.killCaveBoss();
                        }
                    }
                });
            },
            repeat: Math.floor(durationMs / tickInterval)
        });
        this.scene.floatingText(targetX, targetY - 30, 'TOXIC CLOUD!', '#27ae60');
    }

    _castToxicPuddle(spell) {
        const pointer = this.scene.input.activePointer;
        const worldPoint = this.scene.cameras.main.getWorldPoint(pointer.x, pointer.y);
        const dist = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, worldPoint.x, worldPoint.y);
        const maxRange = spell.range || 200;
        const targetX = dist > maxRange
            ? this.scene.player.x + (worldPoint.x - this.scene.player.x) / dist * maxRange : worldPoint.x;
        const targetY = dist > maxRange
            ? this.scene.player.y + (worldPoint.y - this.scene.player.y) / dist * maxRange : worldPoint.y;

        const puddle = this.scene.add.circle(targetX, targetY, spell.radius || 70, 0x1a5e1a, 0.35).setDepth(10);
        const puddleBorder = this.scene.add.circle(targetX, targetY, spell.radius || 70).setDepth(10)
            .setStrokeStyle(3, 0x0d3d0d).setFillStyle(0x1a5e1a, 0.08);
        this.scene.tweens.add({
            targets: [puddle, puddleBorder], alpha: { from: 0.35, to: 0.15 }, duration: 1000, yoyo: true, repeat: -1
        });
        const bubbles = [];
        for (let b = 0; b < 5; b++) {
            const bx = targetX + (Math.random() - 0.5) * (spell.radius || 70) * 1.4;
            const by = targetY + (Math.random() - 0.5) * (spell.radius || 70) * 1.4;
            const bubble = this.scene.add.circle(bx, by, 3 + Math.random() * 3, 0x3ddc3d, 0.6).setDepth(11);
            bubbles.push(bubble);
            this.scene.tweens.add({
                targets: bubble, y: by - 8 - Math.random() * 8, alpha: 0, scaleX: 1.5, scaleY: 1.5,
                duration: 800 + Math.random() * 600, repeat: -1, delay: Math.random() * 1000
            });
        }
        this.scene.floatingText(targetX, targetY - 30, 'TOXIC PUDDLE!', '#0d3d0d');

        let elapsed = 0;
        const tickInterval = 500;
        const radius = spell.radius || 70;
        this.scene.time.addEvent({
            delay: tickInterval,
            callback: () => {
                elapsed += tickInterval;
                if (elapsed >= spell.duration * 1000) {
                    this.scene.tweens.killTweensOf(puddle); this.scene.tweens.killTweensOf(puddleBorder);
                    bubbles.forEach(b => { this.scene.tweens.killTweensOf(b); if (b.active) b.destroy(); });
                    if (puddle.active) puddle.destroy(); if (puddleBorder.active) puddleBorder.destroy();
                    return;
                }
                const tickDmg = Math.floor(spell.damagePerSec * (tickInterval / 1000));
                this.scene.enemies.getChildren().forEach(e => {
                    if (!e.active || !e.stats) return;
                    if (Phaser.Math.Distance.Between(targetX, targetY, e.x, e.y) < radius) {
                        e.stats.hp -= tickDmg;
                        this.scene.floatingText(e.x, e.y - 15, '-' + tickDmg, '#1a5e1a');
                        if (e.body && e.body.velocity) {
                            const currentSpeed = Math.sqrt(e.body.velocity.x ** 2 + e.body.velocity.y ** 2);
                            if (currentSpeed > 0) {
                                const slowFactor = 1 - (spell.slowPercent || 40) / 100;
                                e.body.velocity.x *= slowFactor; e.body.velocity.y *= slowFactor;
                            }
                        }
                        if (e.stats.hp <= 0) {
                            if (e.stats.isBossClone) this.scene.zones.village.boss.killBossClone(e);
                            else this.scene.killEnemy(e);
                        }
                    }
                });
                ['boss', 'mineBoss', 'caveBoss', 'villageBoss', 'hellBoss', 'snowyIceSpirit', 'castleBoss'].forEach(bossKey => {
                    const boss = this.scene[bossKey];
                    if (boss && boss.active && boss.stats && Phaser.Math.Distance.Between(targetX, targetY, boss.x, boss.y) < radius) {
                        let dmg = tickDmg;
                        if (this.scene.computedBossDamage) dmg = Math.floor(dmg * (1 + this.scene.computedBossDamage / 100));
                        boss.stats.hp -= dmg;
                        this.scene.floatingText(boss.x, boss.y - 15, '-' + dmg, '#1a5e1a');
                        if (boss.hpFill) boss.hpFill.width = boss.hpBg.width * (boss.stats.hp / boss.stats.maxHp);
                        if (boss.stats.hp <= 0) {
                            if (bossKey === 'boss') this.scene.killBoss();
                            else if (bossKey === 'mineBoss') this.scene.killMineBoss();
                            else if (bossKey === 'caveBoss') this.scene.killCaveBoss();
                        }
                    }
                });
            },
            repeat: Math.floor(spell.duration / (tickInterval / 1000))
        });
    }

    _spawnHealZone(x, y, radius, duration, healPerSec) {
        const zone = this.scene.add.circle(x, y, radius, 0xf1c40f, 0.15).setDepth(9);
        const zoneBorder = this.scene.add.circle(x, y, radius).setDepth(9)
            .setStrokeStyle(2, 0xf1c40f).setFillStyle(0xf1c40f, 0.03);
        this.scene.tweens.add({
            targets: [zone, zoneBorder], alpha: { from: 0.15, to: 0.08 },
            duration: 700, yoyo: true, repeat: -1
        });
        this.scene.floatingText(x, y - 20, 'HEAL ZONE!', '#f1c40f');
        const healInterval = 500;
        let elapsed = 0;
        const timer = this.scene.time.addEvent({
            delay: healInterval,
            callback: () => {
                elapsed += healInterval;
                if (elapsed >= duration * 1000) {
                    timer.remove();
                    this.scene.tweens.killTweensOf(zone);
                    this.scene.tweens.killTweensOf(zoneBorder);
                    if (zone.active) zone.destroy();
                    if (zoneBorder.active) zoneBorder.destroy();
                    return;
                }
                const healAmt = Math.floor(this.scene.playerMaxHP * healPerSec * (healInterval / 1000));
                const playerDist = Phaser.Math.Distance.Between(x, y, this.scene.player.x, this.scene.player.y);
                if (playerDist < radius && healAmt > 0) {
                    this.scene.playerHP = Math.min(this.scene.playerMaxHP, this.scene.playerHP + healAmt);
                    this.scene.floatingText(this.scene.player.x, this.scene.player.y - 40, '+' + healAmt + ' HP', '#f1c40f');
                }
            },
            repeat: Math.floor(duration * 1000 / healInterval)
        });
    }
}
