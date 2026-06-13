import Phaser from 'phaser';
import { SPELLS, CORRUPTION, VILLAGE_BOSS_TYPE } from '../config.js';

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

        if (slot === 'fireball' || slot === 'acid_flask' || slot === 'soul_strike') this._castProjectile(spell);
        else if (slot === 'shield' || slot === 'iron_skin') this._castShield(spell);
        else if (slot === 'life_link') this._castLifeLink(spell);
        else if (slot === 'heal' || slot === 'healing_potion') this._castHeal(spell);
        else if (slot === 'purify') this._castPurify(spell);
    }

    _getClassSpells() {
        if (this.scene.classKey === 'alchemist') return { q: 'acid_flask', w: 'iron_skin', e: 'healing_potion' };
        if (this.scene.classKey === 'angel') return { q: 'soul_strike', w: 'life_link', e: 'purify' };
        return { q: 'fireball', w: 'shield', e: 'heal' };
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

    _updateSpells(delta) {
        const dt = delta / 1000;

        ['fireball', 'shield', 'heal'].forEach(k => {
            if (this.scene.spellCooldowns[k] > 0) {
                this.scene.spellCooldowns[k] = Math.max(0, this.scene.spellCooldowns[k] - dt);
            }
        });

        for (let i = this.scene.fireballs.length - 1; i >= 0; i--) {
            const fb = this.scene.fireballs[i];
            if (fb.glow) {
                fb.glow.x = fb.x;
                fb.glow.y = fb.y;
            }
            fb.lifespan -= dt;
            if (fb.lifespan <= 0) {
                if (fb.glow) fb.glow.destroy();
                fb.destroy();
                this.scene.fireballs.splice(i, 1);
                continue;
            }

            let hit = false;
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
    }
}
