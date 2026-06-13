import Phaser from 'phaser';
import {
    DIFF_MULT, ENEMY_TYPES, RARITY_COLORS,
    EQUIP_DROP_CHANCE, ACCOUNT_EQUIP_DROP_CHANCE, BOSS_DROP_CHANCE,
    MINE_ENEMY_TYPES, MINE_RETURN_POS, FOREST_RETURN_POS,
    MINE_CHEST_DROP_CHANCE, SECRET_KEY_ITEM,
    VILLAGE_BOSS_TYPE, VILLAGE_CHEST_OPEN_KEY,
    CAVE_CHEST_OPEN_KEY, CAVE_WIDTH, CAVE_HEIGHT
} from '../config/index.js';
import { rollEquip, rollMaterial, rollAccountEquip, rollCaveRelic } from '../utils.js';
import { playBossDeath, playEnemyDeath, playLoot, playBreak } from '../sound.js';
import { recordKill } from '../bestiary.js';
import { recordSoulCollect } from '../soulBook.js';
import { onKill, onCollect } from '../quests.js';
import { getClassData } from '../classes.js';

export class CombatSystem {
    constructor(scene) {
        this.scene = scene;
    }

    makeEnemy(t, x, y) {
        const s = this.scene;
        const walkTexKey = t.key + '_walk';
        const walkAnimKey = t.key === 'skeleton_archer' ? 'skeleton_archer_walk_anim' :
                           t.key === 'skeleton_shaman' ? 'skeleton_shaman_walk_anim' :
                           t.key === 'skeleton_warrior' ? 'skeleton_walk' :
                           t.key + '_walk';
        const e = s.add.sprite(x, y, walkTexKey).setDepth(5);
        s.physics.add.existing(e, false);
        e.body.setSize(t.bw, t.bh);
        e.body.setCollideWorldBounds(true);
        e.walkAnimKey = walkAnimKey;

        e.stats = {
            key: t.key, name: t.name,
            hp: Math.floor(t.hp * s.diffMulti.hp),
            maxHp: Math.floor(t.hp * s.diffMulti.hp),
            damage: Math.floor(t.dmg * s.diffMulti.dmg),
            exp: Math.floor(t.exp * s.diffMulti.exp),
            bw: t.bw, bh: t.bh,
            wTimer: 0, wDir: 0
        };

        const hw = t.bw + 4;
        e.hpBg = s.add.rectangle(x, y - t.bh / 2 - 8, hw, 3, 0x333333).setOrigin(0.5).setDepth(11);
        e.hpFill = s.add.rectangle(x, y - t.bh / 2 - 8, hw, 3, 0xe74c3c).setOrigin(0.5).setDepth(11);
        s.enemies.add(e);
        return e;
    }

    takeDamage(amount) {
        if (this.scene.invincible) return;
        amount = Math.floor(amount) || 0;
        if (amount <= 0) return;
        if (this.scene.shieldActive && this.scene.shieldHP > 0) {
            if (this.scene.lifeLinkActive) {
                amount = Math.floor(amount * 0.7);
            }
            const absorbed = Math.min(this.scene.shieldHP, amount);
            this.scene.shieldHP -= absorbed;
            amount -= absorbed;
            if (absorbed > 0) this.scene.floatingText(this.scene.player.x, this.scene.player.y - 20, absorbed + ' blocked', '#3498db');
            if (this.scene.shieldHP <= 0) {
                this.scene.shieldActive = false;
                this.scene.lifeLinkActive = false;
                if (this.scene.shieldVfx) { this.scene.shieldVfx.destroy(); this.scene.shieldVfx = null; }
            }
            if (amount <= 0) return;
        }
        this.scene.playerHP -= amount;
        this.scene.invincible = true;
        this.scene.player.setTint(0xff4444).setAlpha(0.5);
        if (this.scene.particles) this.scene.particles.spawnDamageToPlayer(this.scene.player.x, this.scene.player.y);
        this.scene.cameras.main.shake(100, 0.002);
        if (this.scene.ui) this.scene.ui.showDamageFlash();
        this.scene.time.delayedCall(500, () => {
            this.scene.player.clearTint();
            this.scene.player.setAlpha(1);
            this.scene.invincible = false;
        });
        if (this.scene.playerHP <= 0) {
            this.scene.playerHP = 0;
            this.respawnPlayer();
        }
        this.scene.updateUI();
    }

    respawnPlayer() {
        if (this.scene.zone === 'arena') {
            this.scene.player.x = 400;
            this.scene.player.y = 500;
        } else if (this.scene.zone === 'mine') {
            this.scene.player.x = MINE_RETURN_POS.x;
            this.scene.player.y = MINE_RETURN_POS.y;
        } else if (this.scene.zone === 'mine_boss') {
            this.scene.player.x = 400;
            this.scene.player.y = 500;
        } else {
            this.scene.player.x = FOREST_RETURN_POS.x;
            this.scene.player.y = FOREST_RETURN_POS.y;
        }
        this.scene.recalcStats();
        this.scene.playerHP = this.scene.playerMaxHP;
        this.scene.cameras.main.shake(200, 0.01);
        this.scene.updateUI();
    }

    attack() {
        if (this.scene.attackCooldown || this.scene.menuOpen || this.scene.transitioning) return;
        if (this.scene.zone === 'arena' && this.scene.bossDefeated) return;
        this.scene.attackCooldown = true;
        this.scene.playerAttacking = true;

        const cls = this.scene.classData || getClassData(this.scene.classKey);
        this.scene.player.play(cls.attackAnim || 'sage_attack');
        this.scene.player.once('animationcomplete', () => {
            this.scene.playerAttacking = false;
        });

        const range = 55;
        let ax = this.scene.player.x, ay = this.scene.player.y;
        if (this.scene.facing === 'right') ax += range;
        else if (this.scene.facing === 'left') ax -= range;
        else if (this.scene.facing === 'up') ay -= range;
        else if (this.scene.facing === 'down') ay += range;

        this._showSlash(ax, ay);
        this._dealAttackDamage(ax, ay);

        this.scene.time.delayedCall(280, () => {
            this.scene.attackCooldown = false;
        });
    }

    _showSlash(ax, ay) {
        const s = this.scene.add.sprite(ax, ay, 'slash').setAlpha(0.9);
        this.scene.tweens.add({
            targets: s, alpha: 0, scaleX: 1.4, scaleY: 1.4, angle: 90,
            duration: 180, onComplete: () => s.destroy()
        });
        this.scene.player.setTint(0xaaddff);
        this.scene.time.delayedCall(100, () => {
            if (this.scene.player.active) this.scene.player.clearTint();
        });
    }

    _dealAttackDamage(ax, ay) {
        if (this.scene.enemies && this.scene.enemies.getLength) {
            this.scene.enemies.getChildren().forEach(e => {
                if (!e.active || !e.stats) return;
                if (Phaser.Math.Distance.Between(ax, ay, e.x, e.y) < 35) {
                    this.hitEnemy(e, this.scene.playerDamage);
                }
            });
        }
        if (this.scene.stumps && this.scene.stumps.getLength) {
            this.scene.stumps.getChildren().forEach(st => {
                if (!st.active || !st.stats) return;
                if (Phaser.Math.Distance.Between(ax, ay, st.x, st.y) < 35) {
                    this.hitStump(st, this.scene.playerDamage);
                }
            });
        }
        if (this.scene.mineChests && this.scene.mineChests.getLength) {
            this.scene.mineChests.getChildren().forEach(ch => {
                if (!ch.active || !ch.stats || ch.broken) return;
                if (Phaser.Math.Distance.Between(ax, ay, ch.x, ch.y) < 35) {
                    this.hitChest(ch, this.scene.playerDamage);
                }
            });
        }
        if (this.scene.caveChests && this.scene.caveChests.getLength) {
            this.scene.caveChests.getChildren().forEach(ch => {
                if (!ch.active || !ch.stats || ch.broken) return;
                if (Phaser.Math.Distance.Between(ax, ay, ch.x, ch.y) < 35) {
                    this.hitChest(ch, this.scene.playerDamage);
                }
            });
        }
        if (this.scene.villageChests && this.scene.villageChests.getLength) {
            this.scene.villageChests.getChildren().forEach(ch => {
                if (!ch.active || !ch.stats || ch.broken) return;
                if (Phaser.Math.Distance.Between(ax, ay, ch.x, ch.y) < 35) {
                    ch.stats.hp -= this.scene.playerDamage;
                    if (ch.hpFill) ch.hpFill.width = ch.hpBg.width * (ch.stats.hp / ch.stats.maxHp);
                    if (ch.stats.hp <= 0) this.breakVillageChest(ch);
                }
            });
        }
        if (this.scene.villageZombies && this.scene.villageZombies.getLength) {
            this.scene.villageZombies.getChildren().forEach(e => {
                if (!e.active || !e.stats) return;
                if (Phaser.Math.Distance.Between(ax, ay, e.x, e.y) < 35) {
                    this.hitEnemy(e, this.scene.playerDamage);
                }
            });
        }
        if (this.scene.hellImps && this.scene.hellImps.getLength) {
            this.scene.hellImps.getChildren().forEach(e => {
                if (!e.active || !e.stats) return;
                if (Phaser.Math.Distance.Between(ax, ay, e.x, e.y) < 35) {
                    this.hitEnemy(e, this.scene.playerDamage);
                }
            });
        }
        if (this.scene.caveSmallBats && this.scene.caveSmallBats.getLength) {
            this.scene.caveSmallBats.getChildren().forEach(e => {
                if (!e.active || !e.stats) return;
                if (Phaser.Math.Distance.Between(ax, ay, e.x, e.y) < 35) {
                    this.hitEnemy(e, this.scene.playerDamage);
                }
            });
        }
        if (this.scene.snowyIceSpirit && this.scene.snowyIceSpirit.active && this.scene.snowyIceSpirit.stats) {
            if (Phaser.Math.Distance.Between(ax, ay, this.scene.snowyIceSpirit.x, this.scene.snowyIceSpirit.y) < 45) {
                this.hitEnemy(this.scene.snowyIceSpirit, this.scene.playerDamage);
            }
        }
        if (this.scene.snowyIceShards) {
            this.scene.snowyIceShards.getChildren().forEach(s => {
                if (!s.active || !s.stats) return;
                if (Phaser.Math.Distance.Between(ax, ay, s.x, s.y) < 35) {
                    s.stats.hp -= this.scene.playerDamage;
                    this.scene.floatingText(s.x, s.y - 15, '-' + this.scene.playerDamage, '#3498db');
                    if (s.stats.hp <= 0) {
                        if (s.hpBg) s.hpBg.destroy();
                        if (s.hpFill) s.hpFill.destroy();
                        s.destroy();
                    }
                }
            });
        }
    }

    hitEnemy(enemy, damage) {
        let finalDamage = damage;
        const te = this.scene.talentEffects || {};
        const ae = this.scene.accountEffects || {};
        if (te.damagePercentVs && enemy.stats && enemy.stats.key) {
            const bonus = te.damagePercentVs[enemy.stats.key] || 0;
            if (bonus > 0) {
                finalDamage = Math.floor(damage * (1 + bonus / 100));
            }
        }
        if (enemy.stats && enemy.stats.key && this.scene.bestiaryBonuses && this.scene.bestiaryBonuses[enemy.stats.key]) {
            const bb = this.scene.bestiaryBonuses[enemy.stats.key];
            if (bb.dmgBonus > 0) {
                finalDamage = Math.floor(finalDamage * (1 + bb.dmgBonus / 100));
            }
        }
        if (this.scene.computedBossDamage && enemy.stats && (enemy === this.scene.boss || enemy === this.scene.mineBoss || enemy === this.scene.caveBoss || enemy === this.scene.villageBoss || enemy === this.scene.hellBoss || enemy === this.scene.snowyIceSpirit)) {
            finalDamage = Math.floor(finalDamage * (1 + this.scene.computedBossDamage / 100));
        }
        if (this.scene.playerHP <= this.scene.playerMaxHP * 0.3 && (te.damagePercentLowHp || ae.damagePercentLowHp)) {
            finalDamage = Math.floor(finalDamage * (1 + ((te.damagePercentLowHp || 0) + (ae.damagePercentLowHp || 0)) / 100));
        }
        if (this.scene.playerHP === this.scene.playerMaxHP && (te.damagePercentFullHp || ae.damagePercentFullHp)) {
            finalDamage = Math.floor(finalDamage * (1 + ((te.damagePercentFullHp || 0) + (ae.damagePercentFullHp || 0)) / 100));
        }
        if (this.scene.computedCritChance && Math.random() * 100 < this.scene.computedCritChance) {
            finalDamage = Math.floor(finalDamage * this.scene.computedCritDamage);
            this.scene.floatingText(enemy.x, enemy.y - 30, 'CRIT!', '#f1c40f');
        }

        enemy.stats.hp -= finalDamage;
        enemy.setTint(0xffffff);
        if (this.scene.particles) this.scene.particles.spawnHitSpark(enemy.x, enemy.y);
        this.scene.tweens.add({
            targets: enemy, scaleX: 1.2, scaleY: 1.2, duration: 60, yoyo: true,
            onComplete: () => {
                if (enemy.active) {
                    enemy.clearTint();
                    enemy.setScale(1);
                }
            }
        });
        this.scene.floatingText(enemy.x, enemy.y - 20, '-' + finalDamage, '#e74c3c');

        if (this.scene.computedLifeSteal > 0) {
            const healAmount = Math.floor(finalDamage * this.scene.computedLifeSteal / 100);
            if (healAmount > 0) {
                this.scene.playerHP = Math.min(this.scene.playerMaxHP, this.scene.playerHP + healAmount);
                this.scene.floatingText(this.scene.player.x, this.scene.player.y - 40, '+' + healAmount, '#2ecc71');
            }
        }

        if (enemy.stats.hp <= 0) {
            if (enemy === this.scene.boss) {
                this.killBoss();
            } else if (enemy === this.scene.mineBoss) {
                this.killMineBoss();
            } else if (enemy === this.scene.caveBoss) {
                this.killCaveBoss();
            } else if (enemy === this.scene.villageBoss) {
                const bs = this.scene.villageBoss.stats;
                if (!bs.splitDone && bs.hp / bs.maxHp <= VILLAGE_BOSS_TYPE.splitThreshold) {
                    bs.splitDone = true;
                    this.scene._villageBossSplit(this.scene.villageBoss);
                } else if (bs.hp <= 0 && !bs.splitDone) {
                    bs.splitDone = true;
                    this.scene._villageBossSplit(this.scene.villageBoss);
                }
            } else if (enemy === this.scene.hellBoss) {
                this.scene._victoryHellBoss();
            } else if (enemy === this.scene.snowyIceSpirit) {
                this.scene._snowyIceSpiritDied();
            } else if (enemy.stats && enemy.stats.isBossClone) {
                this.scene._killBossClone(enemy);
            } else {
                this.killEnemy(enemy);
            }
        } else {
            enemy.hpFill.width = enemy.hpBg.width * (enemy.stats.hp / enemy.stats.maxHp);
        }
    }

    hitStump(stump, damage) {
        stump.stats.hp -= damage;
        stump.setTint(0xffffff);
        this.scene.tweens.add({
            targets: stump, scaleX: 1.15, scaleY: 1.15, duration: 60, yoyo: true,
            onComplete: () => {
                if (stump.active) {
                    stump.clearTint();
                    stump.setScale(1);
                }
            }
        });
        this.scene.floatingText(stump.x, stump.y - 20, '-' + damage, '#f39c12');
        if (stump.stats.hp <= 0) {
            this.breakStump(stump);
        } else {
            stump.hpFill.width = stump.hpBg.width * (stump.stats.hp / stump.stats.maxHp);
        }
    }

    hitChest(ch, damage) {
        if (ch.broken) return;
        ch.stats.hp -= damage;
        ch.setTint(0xffffff);
        this.scene.tweens.add({
            targets: ch, scaleX: 1.15, scaleY: 1.15, duration: 60, yoyo: true,
            onComplete: () => {
                if (ch.active) {
                    ch.clearTint();
                    ch.setScale(1);
                }
            }
        });
        this.scene.floatingText(ch.x, ch.y - 20, '-' + damage, '#f39c12');
        if (ch.stats.hp <= 0) {
            this.breakChest(ch);
        } else {
            ch.hpFill.width = ch.hpBg.width * (ch.stats.hp / ch.stats.maxHp);
        }
    }

    breakChest(ch) {
        if (ch.broken) return;
        ch.broken = true;
        ch.body.enable = false;
        ch.setTexture(ch.isCaveChest ? CAVE_CHEST_OPEN_KEY : 'mine_chest_broken');
        ch.hpBg.destroy();
        ch.hpFill.destroy();
        playBreak();
        onCollect('mine_chest');
        this.scene._updateQuestIcons();

        const hasLoot = ch.loot.length > 0;
        if (hasLoot) {
            ch.loot.forEach((item, i) => {
                if (this.scene.addEquip(item)) {
                    const rc = '#' + RARITY_COLORS[item.rarity].toString(16).padStart(6, '0');
                    this.scene.floatingText(ch.x + (i * 20 - 10), ch.y - 35, '+' + item.name, rc);
                } else {
                    this.scene.floatingText(ch.x, ch.y - 35, 'Bag full!', '#e74c3c');
                }
            });
        } else {
            const matCount = 1 + Math.floor(Math.random() * 2);
            for (let i = 0; i < matCount; i++) {
                const item = rollMaterial(this.scene.zone);
                if (this.scene.addMaterial(item)) {
                    const rc = '#' + RARITY_COLORS[item.rarity].toString(16).padStart(6, '0');
                    this.scene.floatingText(ch.x + (i * 18 - 9), ch.y - 35, '+' + item.name, rc);
                }
            }
        }

        this.scene.time.delayedCall(12000, () => {
            if (ch.active && !ch.isCaveChest) {
                ch.setTexture('mine_chest');
                ch.broken = false;
                ch.body.enable = true;
                ch.stats.hp = ch.stats.maxHp;
                ch.hpBg = this.scene.add.rectangle(ch.x, ch.y - 18, 28, 3, 0x333333).setOrigin(0.5).setDepth(11);
                ch.hpFill = this.scene.add.rectangle(ch.x, ch.y - 18, 28, 3, 0xf39c12).setOrigin(0.5).setDepth(11);
                ch.loot = [];
                const cnt = 1 + Math.floor(Math.random() * 2);
                for (let i = 0; i < cnt; i++) {
                    if (Math.random() < MINE_CHEST_DROP_CHANCE) {
                        ch.loot.push(rollEquip());
                    }
                }
            }
        });
    }

    breakStump(stump) {
        this.scene.stumpsBroken++;
        playBreak();
        const count = 1 + Math.floor(Math.random() * 2);
        for (let i = 0; i < count; i++) {
            const item = rollMaterial(this.scene.zone);
            if (this.scene.addMaterial(item)) {
                const rc = '#' + RARITY_COLORS[item.rarity].toString(16).padStart(6, '0');
                this.scene.floatingText(stump.x + (i * 20 - 10), stump.y - 15, '+' + item.name, rc);
            } else {
                this.scene.floatingText(stump.x, stump.y - 15, 'Bag full!', '#e74c3c');
            }
        }
        stump.hpBg.destroy();
        stump.hpFill.destroy();
        stump.setTexture('stump_broken');
        this.scene.time.delayedCall(8000, () => {
            if (stump.active) stump.setTexture('stump');
            stump.stats.hp = stump.stats.maxHp;
        });
        this.scene.updateUI();
    }

    killBoss() {
        this.killGenericBoss({
            bossRef: 'boss',
            aliveKey: 'bossAlive',
            defeatedKey: 'bossDefeated',
            nameTextKey: 'bossNameText',
            recordKey: 'ancient_treant',
            defeatedText: 'BOSS DEFEATED!',
            defeatedColor: '#f1c40f',
            secondDropChance: 0.5,
            textX: 400,
            textY: 200,
            onPostKill: () => {
                this.scene.mineUnlocked = true;
                this.scene.exitPortal.setTexture('mine_ladder');
                this.scene.exitPortal.setScale(1);
                this.scene.exitHint.setText('SPACE to enter the Mine');
            }
        });
    }

    killEnemy(enemy) {
        const exp = enemy.stats.exp;
        const expBonus = 1 + (this.scene.accountEffects ? (this.scene.accountEffects.expPercent || 0) / 100 : 0);
        this.scene.playerExp += exp;
        this.scene.accountExp += Math.floor(exp * expBonus);
        this.scene.kills++;
        playEnemyDeath();
        if (this.scene.particles) this.scene.particles.spawnEnemyDeath(enemy.x, enemy.y);

        if (enemy.stats.key) {
            recordKill(enemy.stats.key);
            recordSoulCollect(enemy.stats.key);
            onKill(enemy.stats.key);
            this.scene._updateQuestIcons();
        }

        for (let i = 0; i < 3; i++) {
            const c = this.scene.add.sprite(
                enemy.x + Phaser.Math.Between(-12, 12),
                enemy.y + Phaser.Math.Between(-8, 8),
                'coin'
            );
            this.scene.tweens.add({
                targets: c, y: c.y - 25, alpha: 0,
                duration: 500 + i * 100, delay: i * 80,
                onComplete: () => c.destroy()
            });
        }

        this.scene.floatingText(enemy.x, enemy.y - 30, '+' + exp + ' EXP', '#f1c40f');

        if (Math.random() < EQUIP_DROP_CHANCE) {
            const item = rollEquip();
            if (this.scene.addEquip(item)) {
                const rc = '#' + RARITY_COLORS[item.rarity].toString(16).padStart(6, '0');
                this.scene.floatingText(enemy.x, enemy.y - 45, '+' + item.name, rc);
                if (this.scene.particles) this.scene.particles.spawnLootPickup(enemy.x, enemy.y, item.rarity);
                playLoot();
            }
        }

        if (Math.random() < ACCOUNT_EQUIP_DROP_CHANCE) {
            const accItem = rollAccountEquip();
            if (this.scene.addAccountEquip(accItem)) {
                const rc = '#' + RARITY_COLORS[accItem.rarity].toString(16).padStart(6, '0');
                this.scene.floatingText(enemy.x, enemy.y - 60, '+' + accItem.name + ' [ACCOUNT]', rc);
                if (this.scene.particles) this.scene.particles.spawnLootPickup(enemy.x, enemy.y, accItem.rarity);
                playLoot();
            }
        }

        this.scene.checkLevelUp();
        this.scene._checkAccountLevelUp();
        this.scene.updateUI();

        enemy.hpBg.destroy();
        enemy.hpFill.destroy();
        enemy.destroy();

        this.scene.time.delayedCall(3000, () => {
            if (this.scene.zone === 'forest') {
                const t = ENEMY_TYPES[Math.floor(Math.random() * ENEMY_TYPES.length)];
                this.scene._makeEnemy(t, 80 + Math.random() * 640, 350 + Math.random() * 400);
            } else if (this.scene.zone === 'mine') {
                const t = MINE_ENEMY_TYPES[Math.floor(Math.random() * MINE_ENEMY_TYPES.length)];
                this.scene._makeMineEnemy(t, 80 + Math.random() * 640, 200 + Math.random() * 500);
            }
        });
    }

    killMineBoss() {
        this.killGenericBoss({
            bossRef: 'mineBoss',
            aliveKey: 'mineBossAlive',
            defeatedKey: 'mineBossDefeated',
            nameTextKey: 'mineBossNameText',
            recordKey: 'skeleton_lord',
            defeatedText: 'SKELETON LORD DEFEATED!',
            defeatedColor: '#bf77f6',
            secondDropChance: 0.6,
            textX: 400,
            textY: 200,
            extraLoot: () => {
                if (!this.scene.hasSecretKey && DIFF_MULT[this.scene.difficulty] && DIFF_MULT[this.scene.difficulty].hp > 1) {
                    this.scene.hasSecretKey = true;
                    const keyItem = { ...SECRET_KEY_ITEM };
                    playLoot();
                    this.scene.floatingText(400, 280, SECRET_KEY_ITEM.name + ' obtained!', '#f1c40f');
                    return [keyItem];
                }
                return [];
            }
        });
    }

    killCaveBoss() {
        const textX = this.scene.caveOffsetX + CAVE_WIDTH / 2;
        this.killGenericBoss({
            bossRef: 'caveBoss',
            aliveKey: 'caveBossAlive',
            defeatedKey: 'caveBossDefeated',
            nameTextKey: 'caveBossNameText',
            recordKey: 'giant_bat',
            defeatedText: 'GIANT BAT DEFEATED!',
            defeatedColor: '#bf77f6',
            secondDropChance: 0.6,
            textX,
            textY: 200,
            extraLoot: () => {
                const items = [];
                const relic = rollCaveRelic(this.scene.classKey);
                if (relic && this.scene.addAccountEquip(relic)) {
                    items.push({ ...relic, name: relic.name + ' [RELIC]' });
                    playLoot();
                    this.scene.floatingText(textX, 280, 'Relic obtained!', '#9b59b6');
                }
                return items;
            },
            onPostKill: () => {
                this.scene.caveStairs = this.scene.add.sprite(textX, CAVE_HEIGHT - 80, 'cave_stairs').setDepth(1);
                this.scene.caveStairsHint = this.scene.add.text(textX, CAVE_HEIGHT - 55, '', {
                    fontSize: '11px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
                    stroke: '#000', strokeThickness: 2
                }).setOrigin(0.5).setDepth(12);
            }
        });
    }

    killGenericBoss(cfg) {
        const b = this.scene[cfg.bossRef];
        const exp = b.stats.exp;
        const expBonus = 1 + (this.scene.accountEffects ? (this.scene.accountEffects.expPercent || 0) / 100 : 0);
        this.scene.playerExp += exp;
        this.scene.accountExp += Math.floor(exp * expBonus);
        this.scene.kills++;
        this.scene[cfg.aliveKey] = false;
        this.scene[cfg.defeatedKey] = true;
        playBossDeath();
        recordKill(cfg.recordKey);
        recordSoulCollect(cfg.recordKey);
        onKill(cfg.recordKey);
        this.scene._updateQuestIcons();
        if (this.scene.particles) this.scene.particles.spawnBossDeath(b.x, b.y);

        b.body.setVelocity(0);
        b.setTint(0xff0000);
        this.scene.tweens.add({
            targets: b, alpha: 0, scaleX: 1.5, scaleY: 1.5, duration: 800,
            onComplete: () => {
                if (b.hpBg) b.hpBg.destroy();
                if (b.hpFill) b.hpFill.destroy();
                b.destroy();
                this.scene[cfg.bossRef] = null;
            }
        });

        if (b.aoeRing) { b.aoeRing.destroy(); b.aoeRing = null; }
        if (b.aoeRing2) { b.aoeRing2.destroy(); b.aoeRing2 = null; }
        if (this.scene[cfg.nameTextKey]) this.scene[cfg.nameTextKey].destroy();

        this.scene.floatingText(cfg.textX, cfg.textY, '+' + exp + ' EXP', '#f1c40f');

        this.scene.defeatedText = this.scene.add.text(cfg.textX, cfg.textY + 50, cfg.defeatedText, {
            fontSize: '28px', fill: cfg.defeatedColor, fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 4
        }).setOrigin(0.5).setScrollFactor(0);
        this.scene.tweens.add({
            targets: this.scene.defeatedText, alpha: 0, duration: 5000,
            onComplete: () => { if (this.scene.defeatedText) this.scene.defeatedText.destroy(); this.scene.defeatedText = null; }
        });

        this.scene.defeatedLoot = [];
        const lootItems = [];
        if (Math.random() < BOSS_DROP_CHANCE) {
            const item = rollEquip();
            if (this.scene.addEquip(item)) {
                lootItems.push(item);
                playLoot();
            }
        }
        if (Math.random() < cfg.secondDropChance) {
            const item2 = rollEquip();
            if (this.scene.addEquip(item2)) {
                lootItems.push(item2);
                playLoot();
            }
        }
        if (Math.random() < BOSS_DROP_CHANCE) {
            const accItem = rollAccountEquip();
            if (this.scene.addAccountEquip(accItem)) {
                lootItems.push({ ...accItem, name: accItem.name + ' [ACCOUNT]' });
                playLoot();
            }
        }

        if (cfg.extraLoot) {
            const extra = cfg.extraLoot();
            extra.forEach(item => lootItems.push(item));
        }

        if (cfg.onPostKill) cfg.onPostKill();

        lootItems.forEach((item, i) => {
            const rc = '#' + RARITY_COLORS[item.rarity].toString(16).padStart(6, '0');
            const lt = this.scene.add.text(cfg.textX, cfg.textY + 100 + i * 24, '+' + item.name, {
                fontSize: '16px', fill: rc, fontFamily: 'Arial', fontStyle: 'bold',
                stroke: '#000', strokeThickness: 2
            }).setOrigin(0.5).setScrollFactor(0);
            this.scene.defeatedLoot.push(lt);
            this.scene.tweens.add({
                targets: lt, alpha: 0, duration: 5000,
                onComplete: () => { if (lt.active) lt.destroy(); }
            });
        });

        if (lootItems.length === 0) {
            const noLoot = this.scene.add.text(cfg.textX, cfg.textY + 100, 'No drops...', {
                fontSize: '14px', fill: '#95a5a6', fontFamily: 'Arial',
                stroke: '#000', strokeThickness: 2
            }).setOrigin(0.5).setScrollFactor(0);
            this.scene.defeatedLoot.push(noLoot);
            this.scene.tweens.add({
                targets: noLoot, alpha: 0, duration: 5000,
                onComplete: () => { if (noLoot.active) noLoot.destroy(); }
            });
        }

        this.scene.checkLevelUp();
        this.scene._checkAccountLevelUp();
        this.scene.updateUI();
    }

    breakVillageChest(ch) {
        if (!ch || ch.broken) return;
        ch.broken = true;
        ch.setTexture(VILLAGE_CHEST_OPEN_KEY);
        ch.hpBg.destroy();
        ch.hpFill.destroy();
        playBreak();

        ch.loot.forEach((item, i) => {
            const rc = '#' + RARITY_COLORS[item.rarity].toString(16).padStart(6, '0');
            const lt = this.scene.add.text(ch.x, ch.y - 20 - i * 16, '+' + item.name, {
                fontSize: '11px', fill: rc, fontFamily: 'Arial', fontStyle: 'bold',
                stroke: '#000', strokeThickness: 2
            }).setOrigin(0.5).setDepth(13);
            this.scene.tweens.add({
                targets: lt, y: lt.y - 20, alpha: 0, duration: 2000,
                onComplete: () => lt.destroy()
            });
            if (item.type === 'equip') this.scene.addEquip(item);
            else if (item.type === 'accountEquip') this.scene.addAccountEquip(item);
            playLoot();
        });

        this.scene.time.delayedCall(2500, () => { if (ch.active) ch.destroy(); });
    }
}
