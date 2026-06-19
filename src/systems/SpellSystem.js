import Phaser from 'phaser';
import { SPELLS, CORRUPTION, VILLAGE_BOSS_TYPE } from '../config/index.js';
import { recordKill } from '../bestiary.js';

export class SpellSystem {
    constructor(scene) {
        this.scene = scene;
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

    _castSpell(slot) {
        const spell = SPELLS[slot];
        if (!spell) return;
        if (this.scene.spellCooldowns[slot] > 0) return;
        if (slot !== 'purify' && this.scene.corruption + spell.corruptionCost > this.scene.corruptionMax) return;

        this.scene.corruption += spell.corruptionCost;
        this.scene.spellCooldowns[slot] = spell.cooldown;

        if (slot === 'fireball') this._castProjectile(spell);
        else if (slot === 'soul_strike') this._castSoulStrike(spell);
        else if (slot === 'acid_flask') this._castAcidFlask(spell);
        else if (slot === 'shield' || slot === 'iron_skin') this._castShield(spell);
        else if (slot === 'holy_shield') this._castHolyShield(spell);
        else if (slot === 'life_link') this._castLifeLink(spell);
        else if (slot === 'heal' || slot === 'healing_potion') this._castHeal(spell);
        else if (slot === 'holy_nova') this._castHolyNova(spell);
        else if (slot === 'toxic_puddle') this._castToxicPuddle(spell);
        else if (slot === 'burrow') this._castBurrow(spell);
        else if (slot === 'purify') this._castPurify(spell);
        else if (slot === 'meteor') this._castMeteor(spell);
        else if (slot === 'chemical_cloud') this._castChemicalCloud(spell);
        else if (slot === 'divine_blessing') this._castDivineBlessing(spell);
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
            q: saved.q || d.q,
            w: saved.w || d.w,
            e: saved.e || d.e,
            r: saved.r || d.r
        };
    }

    _castProjectile(spell) {
        let vx = 0, vy = 0;
        let ox = 0, oy = 0;
        if (this.scene.facing === 'left') { vx = -spell.speed; ox = -20; }
        else if (this.scene.facing === 'right') { vx = spell.speed; ox = 20; }
        else if (this.scene.facing === 'up') { vy = -spell.speed; oy = -20; }
        else if (this.scene.facing === 'down') { vy = spell.speed; oy = 20; }
        else { vx = spell.speed; ox = 20; }

        const px = this.scene.player.x + ox;
        const py = this.scene.player.y + oy;
        const texKey = spell.key === 'acid_flask' ? 'acid_flask' : spell.key === 'soul_strike' ? 'soul_strike' : 'fireball';
        const fb = this.scene.add.sprite(px, py, texKey).setDepth(15);
        this.scene.physics.add.existing(fb);
        fb.body.setVelocity(vx, vy);
        const spellSpeedMult = 1 + (this.scene.computedSpellSpeed || 0) / 100;
        fb.body.velocity.x *= spellSpeedMult;
        fb.body.velocity.y *= spellSpeedMult;
        const spellDmgMult = 1 + (this.scene.computedSpellDamage || 0) / 100;
        fb.damage = Math.floor((spell.damage + this.scene.playerDamage * 0.5) * spellDmgMult);
        fb.lifespan = spell.range / spell.speed;
        fb.spellKey = spell.key;
        fb.dot = (spell.dot || 0) + (this.scene.computedDotPower || 0);
        fb.dotDuration = (spell.dotDuration || 0) + (this.scene.computedDotDuration || 0);
        this.scene.fireballs.push(fb);

        const glow = this.scene.add.circle(px, py, 12, spell.color, 0.3).setDepth(14);
        fb.glow = glow;

        this.scene.tweens.add({
            targets: fb, scaleX: 1.3, scaleY: 1.3, duration: 100,
            yoyo: true, repeat: -1
        });
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
        if (this.scene.particles) this.scene.particles.spawnShieldEffect(this.scene.player.x, this.scene.player.y);

        this.scene.floatingText(this.scene.player.x, this.scene.player.y - 30, 'SHIELD!', '#3498db');
    }

    _castHeal(spell) {
        const healAmt = Math.floor(this.scene.playerMaxHP * spell.healPercent);
        this.scene.playerHP = Math.min(this.scene.playerMaxHP, this.scene.playerHP + healAmt);

        const healVfx = this.scene.add.sprite(this.scene.player.x, this.scene.player.y, 'heal_vfx').setDepth(15);
        this.scene.tweens.add({
            targets: healVfx, scaleX: 2, scaleY: 2, alpha: 0, duration: 600,
            onComplete: () => healVfx.destroy()
        });
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

        const purifyVfx = this.scene.add.sprite(this.scene.player.x, this.scene.player.y, 'heal_vfx').setDepth(15)
            .setTint(0xf1c40f);
        this.scene.tweens.add({
            targets: purifyVfx, scaleX: 3, scaleY: 3, alpha: 0, duration: 800,
            onComplete: () => purifyVfx.destroy()
        });

        this.scene.floatingText(this.scene.player.x, this.scene.player.y - 30, 'PURIFY! -' + reduce + ' COR', '#f1c40f');
        this.scene.updateUI();
    }

    _castMeteor(spell) {
        const pointer = this.scene.input.activePointer;
        const worldPoint = this.scene.cameras.main.getWorldPoint(pointer.x, pointer.y);
        const dist = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, worldPoint.x, worldPoint.y);
        const maxRange = spell.range || 300;
        const targetX = dist > maxRange
            ? this.scene.player.x + (worldPoint.x - this.scene.player.x) / dist * maxRange
            : worldPoint.x;
        const targetY = dist > maxRange
            ? this.scene.player.y + (worldPoint.y - this.scene.player.y) / dist * maxRange
            : worldPoint.y;

        const indicator = this.scene.add.circle(targetX, targetY, spell.radius || 100, 0xe74c3c, 0.15).setDepth(10);
        this.scene.tweens.add({
            targets: indicator, alpha: 0.3, duration: 400, yoyo: true, repeat: 3,
            onComplete: () => indicator.destroy()
        });

        const meteorTex = this.scene.add.circle(targetX, targetY - 200, 20, 0xe74c3c, 1).setDepth(16);
        this.scene.tweens.add({
            targets: meteorTex, y: targetY, scaleX: 2, scaleY: 2, duration: 800, ease: 'Power2',
            onComplete: () => {
                meteorTex.destroy();
                const impact = this.scene.add.circle(targetX, targetY, spell.radius || 100, 0xe74c3c, 0.4).setDepth(15);
                this.scene.tweens.add({
                    targets: impact, alpha: 0, scaleX: 1.5, scaleY: 1.5, duration: 400,
                    onComplete: () => impact.destroy()
                });
                if (this.scene.particles) this.scene.particles.spawnHitSpark(targetX, targetY);
                this.scene.cameras.main.shake(200, 0.008);

                const spellDmgMult = 1 + (this.scene.computedSpellDamage || 0) / 100;
                const baseDmg = Math.floor((spell.damage + this.scene.playerDamage * 0.5) * spellDmgMult);
                const dot = (spell.dot || 0) + (this.scene.computedDotPower || 0);
                const dotDur = (spell.dotDuration || 0) + (this.scene.computedDotDuration || 0);
                const radius = spell.radius || 100;

                this.scene.enemies.getChildren().forEach(e => {
                    if (!e.active || !e.stats) return;
                    if (Phaser.Math.Distance.Between(targetX, targetY, e.x, e.y) < radius) {
                        const totalDmg = baseDmg + dot * dotDur;
                        e.stats.hp -= totalDmg;
                        this.scene.floatingText(e.x, e.y - 20, '-' + totalDmg, '#e74c3c');
                        if (e.stats.hp <= 0) this.scene.killEnemy(e);
                    }
                });
                ['boss', 'mineBoss', 'caveBoss', 'villageBoss', 'hellBoss', 'snowyIceSpirit', 'castleBoss'].forEach(bossKey => {
                    const boss = this.scene[bossKey];
                    if (boss && boss.active && boss.stats && Phaser.Math.Distance.Between(targetX, targetY, boss.x, boss.y) < radius) {
                        let totalDmg = baseDmg + dot * dotDur;
                        if (this.scene.computedBossDamage) totalDmg = Math.floor(totalDmg * (1 + this.scene.computedBossDamage / 100));
                        boss.stats.hp -= totalDmg;
                        this.scene.floatingText(boss.x, boss.y - 20, '-' + totalDmg, '#e74c3c');
                        if (boss.hpFill) boss.hpFill.width = boss.hpBg.width * (boss.stats.hp / boss.stats.maxHp);
                        if (boss.stats.hp <= 0) {
                            if (bossKey === 'boss') this.scene.killBoss();
                            else if (bossKey === 'mineBoss') this.scene.killMineBoss();
                            else if (bossKey === 'caveBoss') this.scene.killCaveBoss();
                        }
                    }
                });
            }
        });
    }

    _castChemicalCloud(spell) {
        const pointer = this.scene.input.activePointer;
        const worldPoint = this.scene.cameras.main.getWorldPoint(pointer.x, pointer.y);
        const dist = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, worldPoint.x, worldPoint.y);
        const maxRange = spell.range || 200;
        const targetX = dist > maxRange
            ? this.scene.player.x + (worldPoint.x - this.scene.player.x) / dist * maxRange
            : worldPoint.x;
        const targetY = dist > maxRange
            ? this.scene.player.y + (worldPoint.y - this.scene.player.y) / dist * maxRange
            : worldPoint.y;

        const cloud = this.scene.add.circle(targetX, targetY, spell.radius || 90, 0x27ae60, 0.3).setDepth(10);
        const cloudBorder = this.scene.add.circle(targetX, targetY, spell.radius || 90).setDepth(10)
            .setStrokeStyle(2, 0x27ae60).setFillStyle(0x27ae60, 0.05);

        this.scene.tweens.add({
            targets: [cloud, cloudBorder], alpha: { from: 0.3, to: 0.15 },
            duration: 800, yoyo: true, repeat: -1
        });

        const durationMs = spell.duration * 1000;
        let elapsed = 0;
        const tickInterval = 500;
        const radius = spell.radius || 90;

        const cleanup = () => {
            this.scene.tweens.killTweensOf(cloud);
            this.scene.tweens.killTweensOf(cloudBorder);
            if (cloud.active) cloud.destroy();
            if (cloudBorder.active) cloudBorder.destroy();
        };

        const tickTimer = this.scene.time.addEvent({
            delay: tickInterval,
            callback: () => {
                elapsed += tickInterval;
                if (elapsed >= durationMs) {
                    tickTimer.remove();
                    cleanup();
                    return;
                }
                const tickDmg = Math.floor(spell.damagePerSec * (tickInterval / 1000));
                this.scene.enemies.getChildren().forEach(e => {
                    if (!e.active || !e.stats) return;
                    if (Phaser.Math.Distance.Between(targetX, targetY, e.x, e.y) < radius) {
                        e.stats.hp -= tickDmg;
                        this.scene.floatingText(e.x, e.y - 15, '-' + tickDmg, '#27ae60');
                        if (e.stats.hp <= 0) this.scene.killEnemy(e);
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

    _castDivineBlessing(spell) {
        const healAmt = Math.floor(this.scene.playerMaxHP * spell.healPercent);
        this.scene.playerHP = Math.min(this.scene.playerMaxHP, this.scene.playerHP + healAmt);

        this.scene.floatingText(this.scene.player.x, this.scene.player.y - 30, '+' + healAmt + ' HP', '#f1c40f');
        this.scene.floatingText(this.scene.player.x, this.scene.player.y - 50, 'DIVINE BLESSING!', '#f1c40f');

        const vfx = this.scene.add.sprite(this.scene.player.x, this.scene.player.y, 'heal_vfx').setDepth(15)
            .setTint(0xf1c40f);
        this.scene.tweens.add({
            targets: vfx, scaleX: 3, scaleY: 3, alpha: 0, duration: 800,
            onComplete: () => vfx.destroy()
        });
        if (this.scene.particles) this.scene.particles.spawnHealEffect(this.scene.player.x, this.scene.player.y);

        this.scene._divineBlessingDmgBuff = spell.damageBuff;
        this.scene._divineBlessingDefBuff = spell.defenseBuff;
        this.scene._divineBlessingTimer = spell.buffDuration;

        this.scene.updateUI();
    }

    _castSoulStrike(spell) {
        let vx = 0, vy = 0;
        let ox = 0, oy = 0;
        const baseSpeed = spell.speed || 350;
        if (this.scene.facing === 'left') { vx = -baseSpeed; ox = -20; }
        else if (this.scene.facing === 'right') { vx = baseSpeed; ox = 20; }
        else if (this.scene.facing === 'up') { vy = -baseSpeed; oy = -20; }
        else if (this.scene.facing === 'down') { vy = baseSpeed; oy = 20; }
        else { vx = baseSpeed; ox = 20; }

        const px = this.scene.player.x + ox;
        const py = this.scene.player.y + oy;
        const fb = this.scene.add.sprite(px, py, 'soul_strike').setDepth(15);
        this.scene.physics.add.existing(fb);
        fb.body.setVelocity(vx, vy);
        fb.damage = 0;
        fb.lifespan = spell.range / baseSpeed;
        fb.spellKey = 'soul_strike';
        fb.healOnHit = spell.healOnHit || 0.5;
        fb.healZoneRadius = spell.healZoneRadius || 80;
        fb.healZoneDuration = spell.healZoneDuration || 3.0;
        fb.healZoneHealPerSec = spell.healZoneHealPerSec || 0.04;
        fb.dot = 0;
        fb.dotDuration = 0;
        this.scene.fireballs.push(fb);

        const glow = this.scene.add.circle(px, py, 12, 0xf1c40f, 0.4).setDepth(14);
        fb.glow = glow;

        this.scene.tweens.add({
            targets: fb, scaleX: 1.2, scaleY: 1.2, duration: 100,
            yoyo: true, repeat: -1
        });
    }

    _castAcidFlask(spell) {
        const pointer = this.scene.input.activePointer;
        const worldPoint = this.scene.cameras.main.getWorldPoint(pointer.x, pointer.y);
        const dist = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, worldPoint.x, worldPoint.y);
        const maxRange = spell.range || 250;
        const targetX = dist > maxRange
            ? this.scene.player.x + (worldPoint.x - this.scene.player.x) / dist * maxRange
            : worldPoint.x;
        const targetY = dist > maxRange
            ? this.scene.player.y + (worldPoint.y - this.scene.player.y) / dist * maxRange
            : worldPoint.y;

        const jar = this.scene.add.sprite(this.scene.player.x, this.scene.player.y - 10, 'acid_flask').setDepth(16).setScale(0.8);
        this.scene.tweens.add({
            targets: jar, x: targetX, y: targetY, duration: 250, ease: 'Power1',
            onComplete: () => {
                jar.destroy();
                for (let a = 0; a < 6; a++) {
                    const angle = (Math.PI * 2 / 6) * a;
                    const splat = this.scene.add.circle(
                        targetX + Math.cos(angle) * 15, targetY + Math.sin(angle) * 15,
                        4 + Math.random() * 4, 0x27ae60, 0.8
                    ).setDepth(15);
                    this.scene.tweens.add({
                        targets: splat, alpha: 0, scaleX: 2, scaleY: 2, duration: 300,
                        onComplete: () => splat.destroy()
                    });
                }
                const impact = this.scene.add.circle(targetX, targetY, spell.radius || 50, 0x27ae60, 0.5).setDepth(15);
                this.scene.tweens.add({
                    targets: impact, alpha: 0, scaleX: 1.5, scaleY: 1.5, duration: 250,
                    onComplete: () => impact.destroy()
                });
                if (this.scene.particles) this.scene.particles.spawnHitSpark(targetX, targetY);

                const spellDmgMult = 1 + (this.scene.computedSpellDamage || 0) / 100;
                const baseDmg = Math.floor((spell.damage + this.scene.playerDamage * 0.3) * spellDmgMult);
                const dot = (spell.dot || 0) + (this.scene.computedDotPower || 0);
                const dotDur = (spell.dotDuration || 0) + (this.scene.computedDotDuration || 0);
                const radius = spell.radius || 50;

                this.scene.enemies.getChildren().forEach(e => {
                    if (!e.active || !e.stats) return;
                    if (Phaser.Math.Distance.Between(targetX, targetY, e.x, e.y) < radius) {
                        const totalDmg = baseDmg + dot * dotDur;
                        e.stats.hp -= totalDmg;
                        this.scene.floatingText(e.x, e.y - 20, '-' + totalDmg, '#27ae60');
                        if (e.stats.hp <= 0) this.scene.killEnemy(e);
                    }
                });
                ['boss', 'mineBoss', 'caveBoss', 'villageBoss', 'hellBoss', 'snowyIceSpirit', 'castleBoss'].forEach(bossKey => {
                    const boss = this.scene[bossKey];
                    if (boss && boss.active && boss.stats && Phaser.Math.Distance.Between(targetX, targetY, boss.x, boss.y) < radius) {
                        let totalDmg = baseDmg + dot * dotDur;
                        if (this.scene.computedBossDamage) totalDmg = Math.floor(totalDmg * (1 + this.scene.computedBossDamage / 100));
                        boss.stats.hp -= totalDmg;
                        this.scene.floatingText(boss.x, boss.y - 20, '-' + totalDmg, '#27ae60');
                        if (boss.hpFill) boss.hpFill.width = boss.hpBg.width * (boss.stats.hp / boss.stats.maxHp);
                        if (boss.stats.hp <= 0) {
                            if (bossKey === 'boss') this.scene.killBoss();
                            else if (bossKey === 'mineBoss') this.scene.killMineBoss();
                            else if (bossKey === 'caveBoss') this.scene.killCaveBoss();
                        }
                    }
                });
            }
        });
    }

    _castHolyShield(spell) {
        const pointer = this.scene.input.activePointer;
        const worldPoint = this.scene.cameras.main.getWorldPoint(pointer.x, pointer.y);

        let targetX = this.scene.player.x;
        let targetY = this.scene.player.y;
        let foundTarget = false;

        const allTargets = [
            ...(this.scene.enemies ? this.scene.enemies.getChildren() : []),
            ...(this.scene.villageZombies ? this.scene.villageZombies.getChildren() : [])
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

    _castToxicPuddle(spell) {
        const pointer = this.scene.input.activePointer;
        const worldPoint = this.scene.cameras.main.getWorldPoint(pointer.x, pointer.y);
        const dist = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, worldPoint.x, worldPoint.y);
        const maxRange = spell.range || 200;
        const targetX = dist > maxRange
            ? this.scene.player.x + (worldPoint.x - this.scene.player.x) / dist * maxRange
            : worldPoint.x;
        const targetY = dist > maxRange
            ? this.scene.player.y + (worldPoint.y - this.scene.player.y) / dist * maxRange
            : worldPoint.y;

        const puddle = this.scene.add.circle(targetX, targetY, spell.radius || 70, 0x1a5e1a, 0.35).setDepth(10);
        const puddleBorder = this.scene.add.circle(targetX, targetY, spell.radius || 70).setDepth(10)
            .setStrokeStyle(3, 0x0d3d0d).setFillStyle(0x1a5e1a, 0.08);

        this.scene.tweens.add({
            targets: [puddle, puddleBorder], alpha: { from: 0.35, to: 0.15 },
            duration: 1000, yoyo: true, repeat: -1
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
        const tickTimer = this.scene.time.addEvent({
            delay: tickInterval,
            callback: () => {
                elapsed += tickInterval;
                if (elapsed >= spell.duration * 1000) {
                    tickTimer.remove();
                    this.scene.tweens.killTweensOf(puddle);
                    this.scene.tweens.killTweensOf(puddleBorder);
                    bubbles.forEach(b => { this.scene.tweens.killTweensOf(b); if (b.active) b.destroy(); });
                    if (puddle.active) puddle.destroy();
                    if (puddleBorder.active) puddleBorder.destroy();
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
                                e.body.velocity.x *= slowFactor;
                                e.body.velocity.y *= slowFactor;
                            }
                        }
                        if (e.stats.hp <= 0) this.scene.killEnemy(e);
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

    _updateSpells(delta) {
        const dt = delta / 1000;

        ['fireball', 'shield', 'heal', 'purify', 'meteor', 'chemical_cloud', 'divine_blessing', 'acid_flask', 'iron_skin', 'healing_potion', 'life_link', 'soul_strike', 'toxic_puddle', 'burrow', 'holy_shield', 'holy_nova'].forEach(k => {
            if (this.scene.spellCooldowns[k] > 0) {
                this.scene.spellCooldowns[k] = Math.max(0, this.scene.spellCooldowns[k] - dt);
            }
        });

        // Armor shred timer decay
        const allEnemies = [
            ...(this.scene.enemies ? this.scene.enemies.getChildren() : []),
            ...(this.scene.villageZombies ? this.scene.villageZombies.getChildren() : []),
            ...(this.scene.hellImps ? this.scene.hellImps.getChildren() : []),
            ...(this.scene.caveSmallBats ? this.scene.caveSmallBats.getChildren() : [])
        ];
        allEnemies.forEach(e => {
            if (e.active && e.armorShredTimer && e.armorShredTimer > 0) {
                e.armorShredTimer -= dt;
                if (e.armorShredTimer <= 0) {
                    e.armorShredStacks = 0;
                    e.armorShredTimer = 0;
                }
            }
        });

        for (let i = this.scene.fireballs.length - 1; i >= 0; i--) {
            const fb = this.scene.fireballs[i];
            if (fb.glow) {
                fb.glow.x = fb.x;
                fb.glow.y = fb.y;
            }
            let hit = false;
            fb.lifespan -= dt;
            if (fb.lifespan <= 0) {
                if (fb.spellKey === 'soul_strike') {
                    this._spawnHealZone(fb.x, fb.y, fb.healZoneRadius, fb.healZoneDuration, fb.healZoneHealPerSec);
                }
                if (fb.glow) fb.glow.destroy();
                fb.destroy();
                this.scene.fireballs.splice(i, 1);
                continue;
            }

            if (fb.spellKey === 'soul_strike') {
                if (this.scene.enemies) {
                    this.scene.enemies.getChildren().forEach(e => {
                        if (!e.active || !e.stats) return;
                        if (Phaser.Math.Distance.Between(fb.x, fb.y, e.x, e.y) < 20) {
                            const healAmt = Math.floor(this.scene.playerMaxHP * (fb.healOnHit || 0.5));
                            if (healAmt > 0) {
                                this.scene.playerHP = Math.min(this.scene.playerMaxHP, this.scene.playerHP + healAmt);
                                this.scene.floatingText(this.scene.player.x, this.scene.player.y - 40, '+' + healAmt + ' HP', '#f1c40f');
                            }
                            hit = true;
                        }
                    });
                }
                if (this.scene.boss && this.scene.boss.active && Phaser.Math.Distance.Between(fb.x, fb.y, this.scene.boss.x, this.scene.boss.y) < 30) {
                    const healAmt = Math.floor(this.scene.playerMaxHP * (fb.healOnHit || 0.5));
                    if (healAmt > 0) {
                        this.scene.playerHP = Math.min(this.scene.playerMaxHP, this.scene.playerHP + healAmt);
                        this.scene.floatingText(this.scene.player.x, this.scene.player.y - 40, '+' + healAmt + ' HP', '#f1c40f');
                    }
                    hit = true;
                }
                if (this.scene.mineBoss && this.scene.mineBoss.active && Phaser.Math.Distance.Between(fb.x, fb.y, this.scene.mineBoss.x, this.scene.mineBoss.y) < 30) {
                    const healAmt = Math.floor(this.scene.playerMaxHP * (fb.healOnHit || 0.5));
                    if (healAmt > 0) {
                        this.scene.playerHP = Math.min(this.scene.playerMaxHP, this.scene.playerHP + healAmt);
                        this.scene.floatingText(this.scene.player.x, this.scene.player.y - 40, '+' + healAmt + ' HP', '#f1c40f');
                    }
                    hit = true;
                }
                if (this.scene.caveBoss && this.scene.caveBoss.active && Phaser.Math.Distance.Between(fb.x, fb.y, this.scene.caveBoss.x, this.scene.caveBoss.y) < 30) {
                    const healAmt = Math.floor(this.scene.playerMaxHP * (fb.healOnHit || 0.5));
                    if (healAmt > 0) {
                        this.scene.playerHP = Math.min(this.scene.playerMaxHP, this.scene.playerHP + healAmt);
                        this.scene.floatingText(this.scene.player.x, this.scene.player.y - 40, '+' + healAmt + ' HP', '#f1c40f');
                    }
                    hit = true;
                }
                if (this.scene.villageBoss && this.scene.villageBoss.active && Phaser.Math.Distance.Between(fb.x, fb.y, this.scene.villageBoss.x, this.scene.villageBoss.y) < 30) {
                    const healAmt = Math.floor(this.scene.playerMaxHP * (fb.healOnHit || 0.5));
                    if (healAmt > 0) {
                        this.scene.playerHP = Math.min(this.scene.playerMaxHP, this.scene.playerHP + healAmt);
                        this.scene.floatingText(this.scene.player.x, this.scene.player.y - 40, '+' + healAmt + ' HP', '#f1c40f');
                    }
                    hit = true;
                }
                if (this.scene.hellBoss && this.scene.hellBoss.active && Phaser.Math.Distance.Between(fb.x, fb.y, this.scene.hellBoss.x, this.scene.hellBoss.y) < 30) {
                    const healAmt = Math.floor(this.scene.playerMaxHP * (fb.healOnHit || 0.5));
                    if (healAmt > 0) {
                        this.scene.playerHP = Math.min(this.scene.playerMaxHP, this.scene.playerHP + healAmt);
                        this.scene.floatingText(this.scene.player.x, this.scene.player.y - 40, '+' + healAmt + ' HP', '#f1c40f');
                    }
                    hit = true;
                }
                if (this.scene.snowyIceSpirit && this.scene.snowyIceSpirit.active && Phaser.Math.Distance.Between(fb.x, fb.y, this.scene.snowyIceSpirit.x, this.scene.snowyIceSpirit.y) < 30) {
                    const healAmt = Math.floor(this.scene.playerMaxHP * (fb.healOnHit || 0.5));
                    if (healAmt > 0) {
                        this.scene.playerHP = Math.min(this.scene.playerMaxHP, this.scene.playerHP + healAmt);
                        this.scene.floatingText(this.scene.player.x, this.scene.player.y - 40, '+' + healAmt + ' HP', '#f1c40f');
                    }
                    hit = true;
                }
            } else {
            let spellTotalDmg = 0;
            if (this.scene.enemies) {
                this.scene.enemies.getChildren().forEach(e => {
                    if (e.active && Phaser.Math.Distance.Between(fb.x, fb.y, e.x, e.y) < 20) {
                        if (e === this.scene.boss || e === this.scene.mineBoss || e === this.scene.caveBoss || e === this.scene.villageBoss || e === this.scene.hellBoss) return;
                        const totalDmg = fb.damage + (fb.dot || 0) * (fb.dotDuration || 0);
                        e.stats.hp -= totalDmg;
                        spellTotalDmg += totalDmg;
                        this.scene.floatingText(e.x, e.y - 20, '-' + totalDmg, '#e74c3c');
                        hit = true;
                        if (e.stats.hp <= 0) {
                            if (e.stats.isBossClone) this.scene._killBossClone(e);
                            else this.scene.killEnemy(e);
                        }
                        if (this.scene.relicEffects && this.scene.relicEffects.fireball_chain && !fb.chained) {
                            let nearest = null, nearDist = 150;
                            this.scene.enemies.getChildren().forEach(e2 => {
                                if (e2.active && e2 !== e && e2.stats) {
                                    const d = Phaser.Math.Distance.Between(e.x, e.y, e2.x, e2.y);
                                    if (d < nearDist) { nearDist = d; nearest = e2; }
                                }
                            });
                            if (nearest) {
                                const chainDmg = Math.floor(totalDmg * 0.6);
                                nearest.stats.hp -= chainDmg;
                                this.scene.floatingText(nearest.x, nearest.y - 20, '-' + chainDmg, '#9b59b6');
                                if (nearest.stats.hp <= 0) {
                                    if (nearest === this.scene.hellBoss) this.scene._victoryHellBoss();
                                    else if (nearest.stats.isBossClone) this.scene._killBossClone(nearest);
                                    else this.scene.killEnemy(nearest);
                                }
                                fb.chained = true;
                            }
                        }
                    }
                });
            }
            if (this.scene.boss && this.scene.boss.active && Phaser.Math.Distance.Between(fb.x, fb.y, this.scene.boss.x, this.scene.boss.y) < 30) {
                let totalDmg = fb.damage + (fb.dot || 0) * (fb.dotDuration || 0);
                if (this.scene.computedBossDamage) totalDmg = Math.floor(totalDmg * (1 + this.scene.computedBossDamage / 100));
                this.scene.boss.stats.hp -= totalDmg;
                spellTotalDmg += totalDmg;
                this.scene.floatingText(this.scene.boss.x, this.scene.boss.y - 20, '-' + totalDmg, '#e74c3c');
                if (this.scene.boss.hpFill) this.scene.boss.hpFill.width = this.scene.boss.hpBg.width * (this.scene.boss.stats.hp / this.scene.boss.stats.maxHp);
                hit = true;
                if (this.scene.boss.stats.hp <= 0) this.scene.killBoss();
            }
            if (this.scene.mineBoss && this.scene.mineBoss.active && Phaser.Math.Distance.Between(fb.x, fb.y, this.scene.mineBoss.x, this.scene.mineBoss.y) < 30) {
                let totalDmg = fb.damage + (fb.dot || 0) * (fb.dotDuration || 0);
                if (this.scene.computedBossDamage) totalDmg = Math.floor(totalDmg * (1 + this.scene.computedBossDamage / 100));
                this.scene.mineBoss.stats.hp -= totalDmg;
                spellTotalDmg += totalDmg;
                this.scene.floatingText(this.scene.mineBoss.x, this.scene.mineBoss.y - 20, '-' + totalDmg, '#e74c3c');
                if (this.scene.mineBoss.hpFill) this.scene.mineBoss.hpFill.width = this.scene.mineBoss.hpBg.width * (this.scene.mineBoss.stats.hp / this.scene.mineBoss.stats.maxHp);
                hit = true;
                if (this.scene.mineBoss.stats.hp <= 0) this.scene.killMineBoss();
            }
            if (hit && this.scene.computedLifeSteal > 0 && spellTotalDmg > 0) {
                const healAmount = Math.floor(spellTotalDmg * this.scene.computedLifeSteal / 100);
                if (healAmount > 0) {
                    this.scene.playerHP = Math.min(this.scene.playerMaxHP, this.scene.playerHP + healAmount);
                    this.scene.floatingText(this.scene.player.x, this.scene.player.y - 40, '+' + healAmount, '#2ecc71');
                }
            }
            if (hit && fb.isMeleeProjectile && fb.healPercent > 0 && spellTotalDmg > 0) {
                const healAmount = Math.floor(spellTotalDmg * fb.healPercent);
                if (healAmount > 0) {
                    this.scene.playerHP = Math.min(this.scene.playerMaxHP, this.scene.playerHP + healAmount);
                    this.scene.floatingText(this.scene.player.x, this.scene.player.y - 40, '+' + healAmount + ' HP', '#f1c40f');
                }
            }
            if (this.scene.mineChests) {
                this.scene.mineChests.getChildren().forEach(ch => {
                    if (ch.active && !ch.broken && Phaser.Math.Distance.Between(fb.x, fb.y, ch.x, ch.y) < 20) {
                        this.scene.hitChest(ch, fb.damage);
                        hit = true;
                    }
                });
            }
            if (this.scene.caveChests) {
                this.scene.caveChests.getChildren().forEach(ch => {
                    if (ch.active && !ch.broken && Phaser.Math.Distance.Between(fb.x, fb.y, ch.x, ch.y) < 20) {
                        this.scene.hitChest(ch, fb.damage);
                        hit = true;
                    }
                });
            }
            if (this.scene.forestChests) {
                this.scene.forestChests.getChildren().forEach(ch => {
                    if (ch.active && !ch.broken && Phaser.Math.Distance.Between(fb.x, fb.y, ch.x, ch.y) < 20) {
                        this.scene.hitChest(ch, fb.damage);
                        hit = true;
                    }
                });
            }
            if (this.scene.caveExtraChests) {
                this.scene.caveExtraChests.getChildren().forEach(ch => {
                    if (ch.active && !ch.broken && Phaser.Math.Distance.Between(fb.x, fb.y, ch.x, ch.y) < 20) {
                        this.scene.hitChest(ch, fb.damage);
                        hit = true;
                    }
                });
            }
            if (this.scene.caveBoss && this.scene.caveBoss.active && Phaser.Math.Distance.Between(fb.x, fb.y, this.scene.caveBoss.x, this.scene.caveBoss.y) < 40) {
                let totalDmg = fb.damage + (fb.dot || 0) * (fb.dotDuration || 0);
                if (this.scene.computedBossDamage) totalDmg = Math.floor(totalDmg * (1 + this.scene.computedBossDamage / 100));
                this.scene.caveBoss.stats.hp -= totalDmg;
                spellTotalDmg += totalDmg;
                this.scene.floatingText(this.scene.caveBoss.x, this.scene.caveBoss.y - 20, '-' + totalDmg, '#e74c3c');
                if (this.scene.caveBoss.hpFill) this.scene.caveBoss.hpFill.width = this.scene.caveBoss.hpBg.width * (this.scene.caveBoss.stats.hp / this.scene.caveBoss.stats.maxHp);
                hit = true;
                if (this.scene.caveBoss.stats.hp <= 0) this.scene.killCaveBoss();
            }
            if (this.scene.caveSmallBats) {
                this.scene.caveSmallBats.getChildren().forEach(e => {
                    if (e.active && Phaser.Math.Distance.Between(fb.x, fb.y, e.x, e.y) < 15) {
                        e.stats.hp -= fb.damage;
                        spellTotalDmg += fb.damage;
                        this.scene.floatingText(e.x, e.y - 20, '-' + fb.damage, '#e74c3c');
                        hit = true;
                        if (e.stats.hp <= 0) this.scene.killEnemy(e);
                    }
                });
            }
            if (this.scene.villageChests) {
                this.scene.villageChests.getChildren().forEach(ch => {
                    if (ch.active && !ch.broken && Phaser.Math.Distance.Between(fb.x, fb.y, ch.x, ch.y) < 20) {
                        ch.stats.hp -= fb.damage;
                        if (ch.hpFill) ch.hpFill.width = ch.hpBg.width * (ch.stats.hp / ch.stats.maxHp);
                        hit = true;
                        if (ch.stats.hp <= 0) this.scene.breakVillageChest(ch);
                    }
                });
            }
            if (this.scene.villageZombies) {
                this.scene.villageZombies.getChildren().forEach(e => {
                    if (e.active && Phaser.Math.Distance.Between(fb.x, fb.y, e.x, e.y) < 15) {
                        e.stats.hp -= fb.damage;
                        spellTotalDmg += fb.damage;
                        this.scene.floatingText(e.x, e.y - 20, '-' + fb.damage, '#5a6a4a');
                        hit = true;
                        if (e.stats.hp <= 0) this.scene.killEnemy(e);
                    }
                });
            }
            if (this.scene.villageBoss && this.scene.villageBoss.active && Phaser.Math.Distance.Between(fb.x, fb.y, this.scene.villageBoss.x, this.scene.villageBoss.y) < 40) {
                let totalDmg = fb.damage + (fb.dot || 0) * (fb.dotDuration || 0);
                if (this.scene.computedBossDamage) totalDmg = Math.floor(totalDmg * (1 + this.scene.computedBossDamage / 100));
                this.scene.villageBoss.stats.hp -= totalDmg;
                spellTotalDmg += totalDmg;
                this.scene.floatingText(this.scene.villageBoss.x, this.scene.villageBoss.y - 20, '-' + totalDmg, '#e74c3c');
                if (this.scene.villageBoss.hpFill) this.scene.villageBoss.hpFill.width = this.scene.villageBoss.hpBg.width * (this.scene.villageBoss.stats.hp / this.scene.villageBoss.stats.maxHp);
                hit = true;
                if (this.scene.villageBoss && this.scene.villageBoss.active) {
                    const bs = this.scene.villageBoss.stats;
                    if (!bs.splitDone && bs.hp / bs.maxHp <= VILLAGE_BOSS_TYPE.splitThreshold) {
                        bs.splitDone = true;
                        this.scene._villageBossSplit(this.scene.villageBoss);
                    } else if (bs.hp <= 0 && !bs.splitDone) {
                        bs.splitDone = true;
                        this.scene._villageBossSplit(this.scene.villageBoss);
                    }
                }
            }
            if (this.scene.hellBoss && this.scene.hellBoss.active && Phaser.Math.Distance.Between(fb.x, fb.y, this.scene.hellBoss.x, this.scene.hellBoss.y) < 40) {
                let totalDmg = fb.damage + (fb.dot || 0) * (fb.dotDuration || 0);
                if (this.scene.computedBossDamage) totalDmg = Math.floor(totalDmg * (1 + this.scene.computedBossDamage / 100));
                this.scene.hellBoss.stats.hp -= totalDmg;
                spellTotalDmg += totalDmg;
                this.scene.floatingText(this.scene.hellBoss.x, this.scene.hellBoss.y - 20, '-' + totalDmg, '#e74c3c');
                if (this.scene.hellBoss.hpFill) this.scene.hellBoss.hpFill.width = this.scene.hellBoss.hpBg.width * (this.scene.hellBoss.stats.hp / this.scene.hellBoss.stats.maxHp);
                hit = true;
                if (this.scene.hellBoss.stats.hp <= 0) this.scene._victoryHellBoss();
            }
            if (this.scene.snowyIceSpirit && this.scene.snowyIceSpirit.active && Phaser.Math.Distance.Between(fb.x, fb.y, this.scene.snowyIceSpirit.x, this.scene.snowyIceSpirit.y) < 40) {
                let totalDmg = fb.damage + (fb.dot || 0) * (fb.dotDuration || 0);
                if (this.scene.computedBossDamage) totalDmg = Math.floor(totalDmg * (1 + this.scene.computedBossDamage / 100));
                this.scene.snowyIceSpirit.stats.hp -= totalDmg;
                spellTotalDmg += totalDmg;
                this.scene.floatingText(this.scene.snowyIceSpirit.x, this.scene.snowyIceSpirit.y - 20, '-' + totalDmg, '#3498db');
                if (this.scene.snowyIceSpirit.hpFill) this.scene.snowyIceSpirit.hpFill.width = this.scene.snowyIceSpirit.hpBg.width * (this.scene.snowyIceSpirit.stats.hp / this.scene.snowyIceSpirit.stats.maxHp);
                hit = true;
                if (this.scene.snowyIceSpirit.stats.hp <= 0) this.scene._snowyIceSpiritDied();
            }
            if (this.scene.snowyIceShards) {
                this.scene.snowyIceShards.getChildren().forEach(s => {
                    if (s.active && s.stats && Phaser.Math.Distance.Between(fb.x, fb.y, s.x, s.y) < 15) {
                        s.stats.hp -= fb.damage;
                        spellTotalDmg += fb.damage;
                        this.scene.floatingText(s.x, s.y - 15, '-' + fb.damage, '#3498db');
                        hit = true;
                        if (s.stats.hp <= 0) {
                            recordKill('ice_shard');
                            if (s.hpBg) s.hpBg.destroy();
                            if (s.hpFill) s.hpFill.destroy();
                            s.destroy();
                        }
                    }
                });
            }
            if (this.scene.stumps) {
                this.scene.stumps.getChildren().forEach(s => {
                    if (s.active && Phaser.Math.Distance.Between(fb.x, fb.y, s.x, s.y) < 18) {
                        s.stats.hp -= fb.damage;
                        this.scene.floatingText(s.x, s.y - 15, '-' + fb.damage, '#f39c12');
                        if (s.hpFill) s.hpFill.width = s.hpBg.width * (s.stats.hp / s.stats.maxHp);
                        hit = true;
                        if (s.stats.hp <= 0) this.scene.breakStump(s);
                    }
                });
            }
            }

            const wb = this.scene.physics.world.bounds;
            if (hit || fb.x < wb.x - 20 || fb.x > wb.x + wb.width + 20 || fb.y < wb.y - 20 || fb.y > wb.y + wb.height + 20) {
                if (fb.glow) fb.glow.destroy();
                fb.destroy();
                this.scene.fireballs.splice(i, 1);
            }
        }

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
