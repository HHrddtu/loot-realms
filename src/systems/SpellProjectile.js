import { VILLAGE_BOSS_TYPE } from '../config/index.js';
import { recordKill } from '../bestiary.js';

export class SpellProjectile {
    constructor(scene) {
        this.scene = scene;
        this._pool = [];
    }

    _getPooledProjectile(texKey) {
        for (const fb of this._pool) {
            if (!fb.active) {
                fb.setTexture(texKey).setActive(true).setVisible(true).setAlpha(1).setScale(1).clearTint().setDepth(15);
                this.scene.physics.world.enable(fb);
                fb.body.setSize(fb.width, fb.height);
                return fb;
            }
        }
        const fb = this.scene.add.sprite(0, 0, texKey).setDepth(15);
        this.scene.physics.add.existing(fb);
        this._pool.push(fb);
        return fb;
    }

    _returnToPool(fb) {
        fb.setActive(false).setVisible(false);
        if (fb.body) { fb.body.setVelocity(0); fb.body.enable = false; }
        this.scene.physics.world.disable(fb);
    }

    _getFacingVelocity(speed, offset) {
        if (this.scene.facing === 'left') return { vx: -speed, vy: 0, ox: -offset, oy: 0 };
        if (this.scene.facing === 'right') return { vx: speed, vy: 0, ox: offset, oy: 0 };
        if (this.scene.facing === 'up') return { vx: 0, vy: -speed, ox: 0, oy: -offset };
        if (this.scene.facing === 'down') return { vx: 0, vy: speed, ox: 0, oy: offset };
        return { vx: speed, vy: 0, ox: offset, oy: 0 };
    }

    _castProjectile(spell) {
        const { vx, vy, ox, oy } = this._getFacingVelocity(spell.speed, 20);
        const px = this.scene.player.x + ox;
        const py = this.scene.player.y + oy;
        const texKey = spell.key === 'acid_flask' ? 'acid_flask' : spell.key === 'soul_strike' ? 'soul_strike' : 'fireball';
        const fb = this._getPooledProjectile(texKey);
        fb.setPosition(px, py);
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

        // Trail effect
        fb._trail = [];
        fb._trailTimer = 0;
    }

    _castSoulStrike(spell) {
        const baseSpeed = spell.speed || 350;
        const { vx, vy, ox, oy } = this._getFacingVelocity(baseSpeed, 20);
        const px = this.scene.player.x + ox;
        const py = this.scene.player.y + oy;
        const fb = this._getPooledProjectile('soul_strike');
        fb.setPosition(px, py);
        fb.body.setVelocity(vx, vy);
        fb.damage = 0;
        fb.lifespan = spell.range / baseSpeed;
        fb.spellKey = 'soul_strike';
        fb.healOnHit = spell.healOnHit || 0.5;
        fb.healZoneRadius = spell.healZoneRadius || 80;
        fb.healZoneDuration = spell.healZoneDuration || 3.0;
        fb.healZoneHealPerSec = spell.healZoneHealPerSec || 0.04;
        fb.dot = 0; fb.dotDuration = 0;
        this.scene.fireballs.push(fb);

        const glow = this.scene.add.circle(px, py, 12, 0xf1c40f, 0.4).setDepth(14);
        fb.glow = glow;
        this.scene.tweens.add({
            targets: fb, scaleX: 1.2, scaleY: 1.2, duration: 100,
            yoyo: true, repeat: -1
        });
    }

    _castMeteor(spell) {
        const pointer = this.scene.input.activePointer;
        const worldPoint = this.scene.cameras.main.getWorldPoint(pointer.x, pointer.y);
        const dist = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, worldPoint.x, worldPoint.y);
        const maxRange = spell.range || 300;
        const targetX = dist > maxRange
            ? this.scene.player.x + (worldPoint.x - this.scene.player.x) / dist * maxRange : worldPoint.x;
        const targetY = dist > maxRange
            ? this.scene.player.y + (worldPoint.y - this.scene.player.y) / dist * maxRange : worldPoint.y;

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

    _castAcidFlask(spell) {
        const pointer = this.scene.input.activePointer;
        const worldPoint = this.scene.cameras.main.getWorldPoint(pointer.x, pointer.y);
        const dist = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, worldPoint.x, worldPoint.y);
        const maxRange = spell.range || 250;
        const targetX = dist > maxRange
            ? this.scene.player.x + (worldPoint.x - this.scene.player.x) / dist * maxRange : worldPoint.x;
        const targetY = dist > maxRange
            ? this.scene.player.y + (worldPoint.y - this.scene.player.y) / dist * maxRange : worldPoint.y;

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
                this.scene.cameras.main.shake(150, 0.005);

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

    _updateProjectiles(dt) {
        for (let i = this.scene.fireballs.length - 1; i >= 0; i--) {
            const fb = this.scene.fireballs[i];
            if (fb.glow) { fb.glow.x = fb.x; fb.glow.y = fb.y; }
            
            // Trail effect
            if (fb._trail !== undefined) {
                fb._trailTimer = (fb._trailTimer || 0) + dt;
                if (fb._trailTimer > 30) {
                    fb._trailTimer = 0;
                    const trail = this.scene.add.circle(fb.x, fb.y, 4, fb.glow ? 0xffffff : 0xaaaaaa, 0.6).setDepth(14);
                    this.scene.tweens.add({
                        targets: trail, alpha: 0, scaleX: 0.3, scaleY: 0.3, duration: 200,
                        onComplete: () => trail.destroy()
                    });
                }
            }
            
            let hit = false;
            fb.lifespan -= dt;
            if (fb.lifespan <= 0) {
                if (fb.spellKey === 'soul_strike') {
                    this.scene.effects._spawnHealZone(fb.x, fb.y, fb.healZoneRadius, fb.healZoneDuration, fb.healZoneHealPerSec);
                }
                if (fb.glow) fb.glow.destroy();
                this._returnToPool(fb);
                this.scene.fireballs.splice(i, 1);
                continue;
            }

            if (fb.spellKey === 'soul_strike') {
                hit = this._checkSoulStrikeHit(fb) || hit;
            } else {
                hit = this._checkProjectileHit(fb) || hit;
            }

            const wb = this.scene.physics.world.bounds;
            if (hit || fb.x < wb.x - 20 || fb.x > wb.x + wb.width + 20 || fb.y < wb.y - 20 || fb.y > wb.y + wb.height + 20) {
                if (fb.glow) fb.glow.destroy();
                this._returnToPool(fb);
                this.scene.fireballs.splice(i, 1);
            }
        }
    }

    _checkSoulStrikeHit(fb) {
        let hit = false;
        const healAmt = Math.floor(this.scene.playerMaxHP * (fb.healOnHit || 0.5));
        const groups = [this.scene.enemies];
        groups.forEach(group => {
            if (!group) return;
            group.getChildren().forEach(e => {
                if (!e.active || !e.stats) return;
                if (Phaser.Math.Distance.Between(fb.x, fb.y, e.x, e.y) < 20) {
                    if (healAmt > 0) {
                        this.scene.playerHP = Math.min(this.scene.playerMaxHP, this.scene.playerHP + healAmt);
                        this.scene.floatingText(this.scene.player.x, this.scene.player.y - 40, '+' + healAmt + ' HP', '#f1c40f');
                    }
                    hit = true;
                }
            });
        });
        return hit;
    }

    _checkProjectileHit(fb) {
        let hit = false;
        let spellTotalDmg = 0;

        if (this.scene.enemies) {
            this.scene.enemies.getChildren().forEach(e => {
                if (!e.active) return;
                if (e === this.scene.boss || e === this.scene.mineBoss || e === this.scene.caveBoss || e === this.scene.villageBoss || e === this.scene.hellBoss) return;
                if (Phaser.Math.Distance.Between(fb.x, fb.y, e.x, e.y) < 20) {
                    const totalDmg = fb.damage + (fb.dot || 0) * (fb.dotDuration || 0);
                    e.stats.hp -= totalDmg;
                    spellTotalDmg += totalDmg;
                    this.scene.floatingText(e.x, e.y - 20, '-' + totalDmg, '#e74c3c');
                    hit = true;
                    if (e.stats.hp <= 0) {
                        if (e.stats.isBossClone) this.scene.zones.village.boss.killBossClone(e);
                        else this.scene.killEnemy(e);
                    }
                    if (this.scene.relicEffects && this.scene.relicEffects.fireball_chain && !fb.chained) {
                        this._tryChain(fb, e, totalDmg);
                    }
                }
            });
        }
        hit = this._checkBossHit(fb, 'boss', this.scene.killBoss.bind(this.scene), spellTotalDmg) || hit;
        hit = this._checkBossHit(fb, 'mineBoss', this.scene.killMineBoss.bind(this.scene), spellTotalDmg) || hit;
        hit = this._checkBossHit(fb, 'caveBoss', this.scene.killCaveBoss.bind(this.scene), spellTotalDmg) || hit;
        hit = this._checkVillageBossHit(fb, spellTotalDmg) || hit;
        hit = this._checkBossHit(fb, 'hellBoss', () => this.scene.zones.hell.victoryHellBoss(), spellTotalDmg) || hit;
        hit = this._checkBossHit(fb, 'snowyIceSpirit', () => this.scene.zones.village.boss.iceSpiritDied(), spellTotalDmg) || hit;

        hit = this._checkGroupHit(fb, this.scene.mineChests, 'hitChest') || hit;
        hit = this._checkGroupHit(fb, this.scene.caveChests, 'hitChest') || hit;
        hit = this._checkGroupHit(fb, this.scene.forestChests, 'hitChest') || hit;
        hit = this._checkGroupHit(fb, this.scene.caveExtraChests, 'hitChest') || hit;
        hit = this._checkVillageChestHit(fb) || hit;
        hit = this._checkExtraGroupHit(fb, this.scene.caveSmallBats, 15) || hit;
        hit = this._checkExtraGroupHit(fb, this.scene.villageZombies, 15) || hit;
        hit = this._checkExtraGroupHit(fb, this.scene.snowyIceShards, 15) || hit;
        hit = this._checkStumpHit(fb) || hit;

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
        return hit;
    }

    _checkBossHit(fb, bossKey, onKillCb, spellTotalDmg) {
        const boss = this.scene[bossKey];
        if (!boss || !boss.active) return false;
        if (Phaser.Math.Distance.Between(fb.x, fb.y, boss.x, boss.y) < 30) {
            let totalDmg = fb.damage + (fb.dot || 0) * (fb.dotDuration || 0);
            if (this.scene.computedBossDamage) totalDmg = Math.floor(totalDmg * (1 + this.scene.computedBossDamage / 100));
            boss.stats.hp -= totalDmg;
            this.scene.floatingText(boss.x, boss.y - 20, '-' + totalDmg, '#e74c3c');
            if (boss.hpFill) boss.hpFill.width = boss.hpBg.width * (boss.stats.hp / boss.stats.maxHp);
            if (boss.stats.hp <= 0) onKillCb();
            return true;
        }
        return false;
    }

    _checkVillageBossHit(fb, spellTotalDmg) {
        const boss = this.scene.villageBoss;
        if (!boss || !boss.active) return false;
        if (Phaser.Math.Distance.Between(fb.x, fb.y, boss.x, boss.y) < 40) {
            let totalDmg = fb.damage + (fb.dot || 0) * (fb.dotDuration || 0);
            if (this.scene.computedBossDamage) totalDmg = Math.floor(totalDmg * (1 + this.scene.computedBossDamage / 100));
            boss.stats.hp -= totalDmg;
            this.scene.floatingText(boss.x, boss.y - 20, '-' + totalDmg, '#e74c3c');
            if (boss.hpFill) boss.hpFill.width = boss.hpBg.width * (boss.stats.hp / boss.stats.maxHp);
            const bs = boss.stats;
            if (!bs.splitDone && (bs.hp / bs.maxHp <= VILLAGE_BOSS_TYPE.splitThreshold || bs.hp <= 0)) {
                this.scene.zones.village.boss.splitBoss(boss);
            }
            return true;
        }
        return false;
    }

    _checkGroupHit(fb, group, method) {
        if (!group) return false;
        let hit = false;
        group.getChildren().forEach(ch => {
            if (ch.active && !ch.broken && Phaser.Math.Distance.Between(fb.x, fb.y, ch.x, ch.y) < 20) {
                this.scene[method](ch, fb.damage);
                hit = true;
            }
        });
        return hit;
    }

    _checkVillageChestHit(fb) {
        if (!this.scene.villageChests || !this.scene.villageChests.scene) return false;
        let hit = false;
        this.scene.villageChests.getChildren().forEach(ch => {
            if (ch.active && !ch.broken && Phaser.Math.Distance.Between(fb.x, fb.y, ch.x, ch.y) < 20) {
                ch.stats.hp -= fb.damage;
                if (ch.hpFill) ch.hpFill.width = ch.hpBg.width * (ch.stats.hp / ch.stats.maxHp);
                hit = true;
                if (ch.stats.hp <= 0) this.scene.breakVillageChest(ch);
            }
        });
        return hit;
    }

    _checkExtraGroupHit(fb, group, threshold) {
        if (!group) return false;
        let hit = false;
        group.getChildren().forEach(e => {
            if (!e.active) return;
            if (Phaser.Math.Distance.Between(fb.x, fb.y, e.x, e.y) < threshold) {
                if (e.stats) e.stats.hp -= fb.damage;
                this.scene.floatingText(e.x, e.y - 20, '-' + fb.damage, '#e74c3c');
                hit = true;
                if (e.stats && e.stats.hp <= 0) {
                    if (e.stats.key === 'ice_shard') {
                        recordKill('ice_shard');
                        if (e.hpBg) e.hpBg.destroy();
                        if (e.hpFill) e.hpFill.destroy();
                        e.destroy();
                    } else {
                        this.scene.killEnemy(e);
                    }
                }
            }
        });
        return hit;
    }

    _checkStumpHit(fb) {
        if (!this.scene.stumps) return false;
        let hit = false;
        this.scene.stumps.getChildren().forEach(s => {
            if (s.active && Phaser.Math.Distance.Between(fb.x, fb.y, s.x, s.y) < 18) {
                s.stats.hp -= fb.damage;
                this.scene.floatingText(s.x, s.y - 15, '-' + fb.damage, '#f39c12');
                if (s.hpFill) s.hpFill.width = s.hpBg.width * (s.stats.hp / s.stats.maxHp);
                hit = true;
                if (s.stats.hp <= 0) this.scene.breakStump(s);
            }
        });
        return hit;
    }

    _tryChain(fb, hitEnemy, totalDmg) {
        let nearest = null, nearDist = 150;
        this.scene.enemies.getChildren().forEach(e2 => {
            if (e2.active && e2 !== hitEnemy && e2.stats) {
                const d = Phaser.Math.Distance.Between(hitEnemy.x, hitEnemy.y, e2.x, e2.y);
                if (d < nearDist) { nearDist = d; nearest = e2; }
            }
        });
        if (nearest) {
            const chainDmg = Math.floor(totalDmg * 0.6);
            nearest.stats.hp -= chainDmg;
            this.scene.floatingText(nearest.x, nearest.y - 20, '-' + chainDmg, '#9b59b6');
            if (nearest.stats.hp <= 0) {
                if (nearest === this.scene.hellBoss) this.scene.zones.hell.victoryHellBoss();
                else if (nearest.stats.isBossClone) this.scene.zones.village.boss.killBossClone(nearest);
                else this.scene.killEnemy(nearest);
            }
            fb.chained = true;
        }
    }
}
