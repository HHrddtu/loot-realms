import Phaser from 'phaser';
import {
    GAME_WIDTH, GAME_HEIGHT,
    HELL_WIDTH, HELL_HEIGHT, HELL_CAMP_COUNT, HELL_MOBS_PER_CAMP,
    HELL_LAVA_DAMAGE, HELL_LAVA_INTERVAL, HELL_HEAT_DAMAGE,
    HELL_ENEMY_TYPES, HELL_CAMP_POSITIONS, HELL_LAVA_POSITIONS,
    HELL_BOSS_TYPE, HELL_BOSS_MINION, HEAT_CRYSTAL,
    BOSS_DROP_CHANCE, RARITY_COLORS, VILLAGE_WIDTH, CEMETERY_HEIGHT, DIFF_COLORS
} from '../config/index.js';
import { rollEquip, rollAccountEquip } from '../utils.js';
import { rollBossCrystals } from '../config/pets.js';
import { playBossDeath, playLoot, playPortal } from '../sound.js';

export class HellZone {
    constructor(scene) {
        this.scene = scene;
    }

    setup() {
        const s = this.scene;
        s._destroyOrphanedCaveStairs();
        const ox = (GAME_WIDTH - HELL_WIDTH) / 2;
        s.cameras.main.setBackgroundColor('#1a0000');
        s.physics.world.setBounds(ox, 0, HELL_WIDTH, HELL_HEIGHT);
        s.cameras.main.setBounds(ox, 0, HELL_WIDTH, HELL_HEIGHT);
        s.hellOffsetX = ox;

        s.hellBg = s.add.tileSprite(ox, 0, HELL_WIDTH, HELL_HEIGHT, 'hell_ground')
            .setOrigin(0, 0).setDepth(0);

        s.player.x = ox + HELL_WIDTH / 2;
        s.player.y = 50;
        s.player.body.setCollideWorldBounds(true);
        s.cameras.main.startFollow(s.player, true, 0.08, 0.08);
        s.cameras.main.setDeadzone(50, 40);

        s.enemies = s.physics.add.group();
        s.hellImps = s.physics.add.group();
        s.hellLavaCircles = [];
        s.hellBoss = null;
        s.hellBossDefeated = false;
        s.hellBossSpawned = false;
        s.hellHeatTimer = 0;
        s.hellLavaCooldown = false;
        s.hellReturnPortal = null;

        this.spawnHellCamps();
        this.spawnHellLavaCircles();

        s.physics.add.overlap(s.player, s.enemies, (p, e) => {
            if (e.active && e.stats && !s.menuOpen && !s.transitioning) {
                s.combat.takeDamage(e.stats.damage);
            }
        }, null, s);

        s.physics.add.overlap(s.player, s.hellImps, (p, e) => {
            if (e.active && e.stats && !s.menuOpen && !s.transitioning) {
                s.combat.takeDamage(e.stats.damage);
            }
        }, null, s);

        s.zone = 'hell';
        s.hintText.setText('SPACE=attack | I=inventory | TAB=stats | T=talents | C=craft | Q=quests | P=pause');
        if (s.particles) {
            s.particles.startHellEmbers(HELL_WIDTH, HELL_HEIGHT);
        }
    }

    clear() {
        const s = this.scene;
        s.physics.world.colliders.destroy();
        if (s.fireballs) {
            s.fireballs.forEach(fb => { if (fb.glow) fb.glow.destroy(); fb.destroy(); });
            s.fireballs = [];
        }
        if (s.enemyProjectiles) {
            s.enemyProjectiles.forEach(p => { if (p && p.destroy) p.destroy(); });
            s.enemyProjectiles = [];
        }
        if (s.shieldActive) {
            s.shieldActive = false;
            s.shieldHP = 0;
            if (s.shieldVfx) { s.shieldVfx.destroy(); s.shieldVfx = null; }
        }
        if (s.enemies && s.enemies.getLength && s.enemies.getLength() > 0) {
            s.enemies.getChildren().forEach(e => {
                if (e.hpBg) e.hpBg.destroy();
                if (e.hpFill) e.hpFill.destroy();
                if (e.nameText) e.nameText.destroy();
            });
            s.enemies.clear(true, true);
        }
        if (s.enemies) { s.enemies.destroy(); s.enemies = null; }
        if (s.hellImps && s.hellImps.getLength && s.hellImps.getLength() > 0) {
            s.hellImps.getChildren().forEach(e => {
                if (e.hpBg) e.hpBg.destroy();
                if (e.hpFill) e.hpFill.destroy();
            });
            s.hellImps.clear(true, true);
        }
        if (s.hellImps) { s.hellImps.destroy(); s.hellImps = null; }
        if (s.hellLavaCircles) {
            s.hellLavaCircles.forEach(lc => {
                if (lc.gfx) lc.gfx.destroy();
                if (lc.vfx) lc.vfx.destroy();
            });
            s.hellLavaCircles = null;
        }
        if (s.hellBoss) {
            if (s.hellBoss.hpBg) s.hellBoss.hpBg.destroy();
            if (s.hellBoss.hpFill) s.hellBoss.hpFill.destroy();
            if (s.hellBossNameText) s.hellBossNameText.destroy();
            s.hellBoss.destroy();
            s.hellBoss = null;
        }
        if (s.hellBossFireWaveVfx) {
            s.hellBossFireWaveVfx.forEach(v => { if (v && v.destroy) v.destroy(); });
            s.hellBossFireWaveVfx = null;
        }
        if (s.hellBg) { s.hellBg.destroy(); s.hellBg = null; }
        if (s.hellReturnPortal) { if (s.hellReturnPortal.destroy) s.hellReturnPortal.destroy(); s.hellReturnPortal = null; }
        if (s.hellReturnPortalHint) { s.hellReturnPortalHint.destroy(); s.hellReturnPortalHint = null; }
        if (s.defeatedText) { s.defeatedText.destroy(); s.defeatedText = null; }
        if (s.defeatedLoot) {
            s.defeatedLoot.forEach(t => { if (t && t.destroy) t.destroy(); });
            s.defeatedLoot = null;
        }
    }

    update(time, delta) {
        this.updateHellLava(time, delta);
        this.updateHellMobs(delta);
        this.updateHellBoss();
        this.updateHellImps();
        this.checkReturnPortal();
    }

    spawnHellCamps() {
        const s = this.scene;
        const ox = s.hellOffsetX;
        const roleOrder = ['tank', 'assassin', 'archer', 'mage', 'healer'];
        for (let i = 0; i < HELL_CAMP_COUNT; i++) {
            const cp = HELL_CAMP_POSITIONS[i];
            for (let j = 0; j < HELL_MOBS_PER_CAMP; j++) {
                const role = roleOrder[j];
                const t = HELL_ENEMY_TYPES[role];
                const angle = (j / HELL_MOBS_PER_CAMP) * Math.PI * 2;
                const ex = ox + cp.x + Math.cos(angle) * 35;
                const ey = cp.y + Math.sin(angle) * 30;
                this.makeHellEnemy(t, ex, ey, i);
            }
        }
    }

    makeHellEnemy(t, x, y, campIndex) {
        const s = this.scene;
        const walkTex = t.key + '_walk';
        const animKey = t.key + '_walk_anim';
        const e = s.add.sprite(x, y, walkTex).setDepth(5);
        s.physics.add.existing(e, false);
        e.body.setSize(t.bw, t.bh);
        e.body.setCollideWorldBounds(true);
        if (s.anims.exists(animKey)) e.play(animKey);

        const rangedInterval = t.role === 'archer' ? 1500 : t.role === 'mage' ? 2000 : t.role === 'healer' ? 2200 : 2000;
        e.stats = {
            key: t.key, name: t.name,
            hp: Math.floor(t.hp * s.diffMulti.hp),
            maxHp: Math.floor(t.hp * s.diffMulti.hp),
            damage: Math.floor(t.dmg * s.diffMulti.dmg),
            exp: Math.floor(t.exp * s.diffMulti.exp),
            bw: t.bw, bh: t.bh, role: t.role,
            campIndex: campIndex,
            rangedTimer: 0, rangedInterval
        };

        const hpW = t.bw + 10;
        e.hpBg = s.add.rectangle(x, y - t.bh / 2 - 8, hpW, 4, 0x000000).setOrigin(0.5).setDepth(6);
        e.hpFill = s.add.rectangle(x, y - t.bh / 2 - 8, hpW, 4, 0xff0000).setOrigin(0.5).setDepth(6);

        s.enemies.add(e);
        return e;
    }

    spawnHellLavaCircles() {
        const s = this.scene;
        const ox = s.hellOffsetX;
        HELL_LAVA_POSITIONS.forEach(lp => {
            const gfx = s.add.sprite(ox + lp.x, lp.y, 'hell_lava_circle').setDepth(1).setAlpha(0.4);
            const vfx = s.add.sprite(ox + lp.x, lp.y, 'hell_lava_circle').setDepth(1).setAlpha(0).setScale(1);
            s.hellLavaCircles.push({ x: ox + lp.x, y: lp.y, r: lp.r, gfx, vfx, timer: 0 });
        });
    }

    updateHellLava(time, delta) {
        const s = this.scene;
        if (!s.hellLavaCircles || s.zone !== 'hell' || s.menuOpen || s.transitioning) return;
        s.hellLavaCircles.forEach(lc => {
            lc.timer += delta;
            if (lc.timer >= 4000) {
                lc.timer = 0;
                lc.vfx.setAlpha(0.6).setScale(1);
                s.tweens.add({
                    targets: lc.vfx, scaleX: 1.5, scaleY: 1.5, alpha: 0, duration: 1000,
                    ease: 'Quad.easeOut'
                });
            }
            const dist = Phaser.Math.Distance.Between(s.player.x, s.player.y, lc.x, lc.y);
            if (dist < lc.r && !s.hellLavaCooldown) {
                s.combat.takeDamage(HELL_LAVA_DAMAGE);
                s.hellLavaCooldown = true;
                s.time.delayedCall(HELL_LAVA_INTERVAL, () => { s.hellLavaCooldown = false; });
            }
        });
    }

    updateHellMobs(delta) {
        const s = this.scene;
        if (s.zone !== 'hell' || s.menuOpen || s.transitioning) return;
        if (!s.enemies) return;

        if (s.enemies.getLength() === 0 && !s.hellBossSpawned && !s.hellBossDefeated) {
            this.spawnHellBoss();
        }

        s.hellHeatTimer += s.game.loop.delta;
        if (s.hellHeatTimer >= 1000) {
            s.hellHeatTimer = 0;
            if (!s.equipment.armor || s.equipment.armor.id !== 'magma_armor') {
                s.combat.takeDamage(HELL_HEAT_DAMAGE);
                s.cameras.main.flash(200, 255, 0, 0, true);
            }
        }

        s.enemies.getChildren().forEach(e => {
            if (!e.active || !e.stats) return;

            const aggro = s.getAggroTarget();
            const dx = aggro.x - e.x;
            const dy = aggro.y - e.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 250) {
                let speed = 50;
                let engageDist = 30;

                switch (e.stats.role) {
                    case 'tank':     speed = 40; engageDist = 25; break;
                    case 'assassin': speed = 90; engageDist = 20; break;
                    case 'archer':   speed = 45; engageDist = 150; break;
                    case 'mage':     speed = 40; engageDist = 180; break;
                    case 'healer':   speed = 45; engageDist = 120; break;
                }

                if (dist > engageDist) {
                    if (e.stats.role === 'tank' || e.stats.role === 'assassin') {
                        e.body.setVelocity((dx / dist) * speed, (dy / dist) * speed);
                    } else if (e.stats.role === 'archer' || e.stats.role === 'mage' || e.stats.role === 'healer') {
                        e.body.setVelocity((dx / dist) * speed * 0.3, (dy / dist) * speed * 0.3);
                    } else {
                        e.body.setVelocity((dx / dist) * speed, (dy / dist) * speed);
                    }
                    e.setFlipX(dx < 0);
                } else {
                    e.body.setVelocity(0);
                }

                if (e.stats.role === 'archer' && dist < 220 && dist > 40) {
                    e.stats.rangedTimer = (e.stats.rangedTimer || 0) + delta;
                    if (e.stats.rangedTimer >= (e.stats.rangedInterval || 1500)) {
                        e.stats.rangedTimer = 0;
                        this._fireEnemyProjectile(e, dx, dy, 'arrow');
                    }
                } else if (e.stats.role === 'mage' && dist < 220 && dist > 40) {
                    e.stats.rangedTimer = (e.stats.rangedTimer || 0) + delta;
                    if (e.stats.rangedTimer >= (e.stats.rangedInterval || 2000)) {
                        e.stats.rangedTimer = 0;
                        this._fireEnemyProjectile(e, dx, dy, 'magic');
                    }
                } else if (e.stats.role === 'healer' && dist < 180) {
                    e.stats.rangedTimer = (e.stats.rangedTimer || 0) + delta;
                    if (e.stats.rangedTimer >= (e.stats.rangedInterval || 2200)) {
                        e.stats.rangedTimer = 0;
                        s.enemies.getChildren().forEach(ally => {
                            if (ally !== e && ally.active && ally.stats && ally.stats.hp < ally.stats.maxHp) {
                                const ad = Phaser.Math.Distance.Between(e.x, e.y, ally.x, ally.y);
                                if (ad < 120) {
                                    const healAmt = 8;
                                    ally.stats.hp = Math.min(ally.stats.maxHp, ally.stats.hp + healAmt);
                                    if (ally.hpFill) ally.hpFill.width = ally.hpBg.width * (ally.stats.hp / ally.stats.maxHp);
                                    this._fireEnemyProjectile(e, ally.x - e.x, ally.y - e.y, 'heal');
                                }
                            }
                        });
                    }
                }
            } else {
                e.body.setVelocity(0);
            }

            if (e.hpBg) { e.hpBg.x = e.x; e.hpBg.y = e.y - e.stats.bh / 2 - 8; }
            if (e.hpFill) { e.hpFill.x = e.x; e.hpFill.y = e.y - e.stats.bh / 2 - 8; }
        });

        this._updateEnemyProjectiles();
    }

    _fireEnemyProjectile(e, dx, dy, type) {
        const s = this.scene;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const speed = type === 'arrow' ? 200 : type === 'magic' ? 160 : 120;
        const texKey = type === 'arrow' ? 'enemy_arrow' : type === 'heal' ? 'enemy_heal' : 'enemy_magic';

        const proj = s.add.sprite(e.x, e.y, texKey).setDepth(15);
        s.physics.add.existing(proj);
        proj.body.setVelocity((dx / dist) * speed, (dy / dist) * speed);
        proj.damage = e.stats.damage;
        proj.lifespan = 2000;
        proj.isHeal = (type === 'heal');
        s.enemyProjectiles.push(proj);
    }

    _updateEnemyProjectiles() {
        const s = this.scene;
        for (let i = s.enemyProjectiles.length - 1; i >= 0; i--) {
            const p = s.enemyProjectiles[i];
            if (!p.active) { s.enemyProjectiles.splice(i, 1); continue; }

            p.lifespan -= s.game.loop.delta;
            if (p.lifespan <= 0) { p.destroy(); s.enemyProjectiles.splice(i, 1); continue; }

            if (!p.isHeal) {
                const dist = Phaser.Math.Distance.Between(p.x, p.y, s.player.x, s.player.y);
                if (dist < 16) {
                    s.combat.takeDamage(p.damage);
                    p.destroy();
                    s.enemyProjectiles.splice(i, 1);
                }
            }
        }
    }

    spawnHellBoss() {
        const s = this.scene;
        if (s.hellBossSpawned) return;
        s.hellBossSpawned = true;
        const bt = HELL_BOSS_TYPE;
        const ox = s.hellOffsetX;
        const hp = Math.floor(bt.hp[s.difficulty] || bt.hp.Normal);
        const dmg = Math.floor(bt.dmg[s.difficulty] || bt.dmg.Normal);
        const exp = Math.floor(bt.exp[s.difficulty] || bt.exp.Normal);
        const spd = bt.speeds[s.difficulty] || bt.speeds.Normal;

        const bx = ox + HELL_WIDTH / 2;
        const by = HELL_HEIGHT / 2;
        const b = s.add.sprite(bx, by, 'red_demon_walk').setDepth(5);
        s.physics.add.existing(b, false);
        b.body.setSize(bt.bw, bt.bh);
        b.body.setCollideWorldBounds(true);
        if (s.anims.exists('red_demon_walk_anim')) b.play('red_demon_walk_anim');

        b.stats = {
            key: bt.key, name: bt.name,
            hp, maxHp: hp, damage: dmg, exp,
            speed: spd, bw: bt.bw, bh: bt.bh,
            aoeTimer: 0, aoeInterval: bt.fireWaveInterval,
            meteorTimer: 0, meteorInterval: bt.meteorInterval,
            summonTimer: 0, summonInterval: bt.summonInterval
        };

        const hpW = 80;
        b.hpBg = s.add.rectangle(400, 110, hpW, 6, 0x000000).setDepth(12).setScrollFactor(0);
        b.hpFill = s.add.rectangle(400 - hpW / 2, 110, hpW, 6, 0xff2200).setOrigin(0, 0.5).setDepth(12).setScrollFactor(0);
        b.hpBg.setVisible(false);
        b.hpFill.setVisible(false);
        s.hellBossNameText = s.add.text(400, 95, bt.name, {
            fontSize: '14px', fill: DIFF_COLORS[s.difficulty] || '#ff4400', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 3
        }).setOrigin(0.5).setDepth(12).setScrollFactor(0).setVisible(false);

        s.hellBoss = b;
        s.hellBossFireWaveVfx = [];
        s.enemies.add(b);

        s.floatingText(bx, by - 60, 'RED DEMON APPEARS!', '#ff2200');
    }

    updateHellBoss() {
        const s = this.scene;
        if (!s.hellBoss || !s.hellBoss.active) return;
        const b = s.hellBoss;
        const st = b.stats;

        if (s.menuOpen || s.transitioning) {
            b.body.setVelocity(0);
            return;
        }

        if (st.hp > 0) {
            b.hpBg.setVisible(true);
            b.hpFill.setVisible(true);
            s.hellBossNameText.setVisible(true);
            b.hpBg.x = 400;
            b.hpBg.y = 110;
            b.hpFill.x = 400 - 40;
            b.hpFill.y = 110;
            b.hpFill.width = 80 * (st.hp / st.maxHp);
        }

        const dx = s.player.x - b.x;
        const dy = s.player.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 30) {
            const nx = dx / dist;
            const ny = dy / dist;
            b.body.setVelocity(nx * st.speed, ny * st.speed);
            if (s.anims.exists('red_demon_walk_anim') && !b.anims.isPlaying) b.play('red_demon_walk_anim');
            b.setFlipX(dx < 0);
        } else {
            b.body.setVelocity(0);
        }

        const delta = s.game.loop.delta;

        st.aoeTimer += delta;
        if (st.aoeTimer >= st.aoeInterval) {
            st.aoeTimer = 0;
            this.fireWave(b);
        }

        st.meteorTimer += delta;
        if (st.meteorTimer >= st.meteorInterval) {
            st.meteorTimer = 0;
            this.meteor(b);
        }

        st.summonTimer += delta;
        if (st.summonTimer >= st.summonInterval) {
            st.summonTimer = 0;
            this.summon(b);
        }
    }

    fireWave(boss) {
        const s = this.scene;
        if (!boss || !boss.active) return;
        const dx = s.player.x - boss.x;
        const dy = s.player.y - boss.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 200) return;

        const dmg = Math.floor(boss.stats.damage * HELL_BOSS_TYPE.fireWaveDmgMul);
        const radius = HELL_BOSS_TYPE.fireWaveRadius;

        const vfx = s.add.sprite(boss.x, boss.y, 'fire_wave_vfx').setDepth(8).setScale(2).setAlpha(0.7);
        s.hellBossFireWaveVfx.push(vfx);
        s.tweens.add({
            targets: vfx, x: s.player.x, y: s.player.y, alpha: 0, duration: 500,
            onComplete: () => { if (vfx.active) vfx.destroy(); }
        });

        s.time.delayedCall(500, () => {
            const pd = Phaser.Math.Distance.Between(boss.x, boss.y, s.player.x, s.player.y);
            if (pd < radius) {
                s.combat.takeDamage(dmg);
                s.floatingText(s.player.x, s.player.y - 20, '-' + dmg + ' FIRE WAVE', '#ff4400');
            }
        });
    }

    meteor(boss) {
        const s = this.scene;
        if (!boss || !boss.active) return;
        const ox = s.hellOffsetX;
        for (let i = 0; i < 3; i++) {
            const mx = s.player.x + Phaser.Math.Between(-80, 80);
            const my = s.player.y + Phaser.Math.Between(-80, 80);
            const clampedX = Phaser.Math.Clamp(mx, ox + 20, ox + HELL_WIDTH - 20);
            const clampedY = Phaser.Math.Clamp(my, 20, HELL_HEIGHT - 20);

            const meteor = s.add.sprite(clampedX, clampedY - 200, 'meteor_vfx').setDepth(8).setAlpha(0.8);
            s.tweens.add({
                targets: meteor, y: clampedY, alpha: 1, duration: 800, delay: i * 200,
                ease: 'Quad.easeIn',
                onComplete: () => {
                    if (meteor.active) meteor.destroy();
                    const pd = Phaser.Math.Distance.Between(clampedX, clampedY, s.player.x, s.player.y);
                    if (pd < HELL_BOSS_TYPE.meteorRadius) {
                        const dmg = Math.floor(boss.stats.damage * HELL_BOSS_TYPE.meteorDmgMul);
                        s.combat.takeDamage(dmg);
                        s.floatingText(s.player.x, s.player.y - 20, '-' + dmg + ' METEOR', '#ff6600');
                    }
                }
            });
        }
    }

    summon(boss) {
        const s = this.scene;
        if (!boss || !boss.active) return;
        const bt = HELL_BOSS_MINION;
        const ox = s.hellOffsetX;
        for (let i = 0; i < HELL_BOSS_TYPE.summonCount; i++) {
            const angle = (i / HELL_BOSS_TYPE.summonCount) * Math.PI * 2;
            const ix = boss.x + Math.cos(angle) * 60;
            const iy = boss.y + Math.sin(angle) * 60;
            const clampedX = Phaser.Math.Clamp(ix, ox + 10, ox + HELL_WIDTH - 10);
            const clampedY = Phaser.Math.Clamp(iy, 10, HELL_HEIGHT - 10);

            const imp = s.add.sprite(clampedX, clampedY, 'hell_imp_walk').setDepth(5);
            s.physics.add.existing(imp, false);
            imp.body.setSize(bt.bw, bt.bh);
            imp.body.setCollideWorldBounds(true);
            if (s.anims.exists('hell_imp_walk_anim')) imp.play('hell_imp_walk_anim');

            const hp = Math.floor(bt.hp * s.diffMulti.hp);
            imp.stats = {
                key: bt.key, name: bt.name,
                hp, maxHp: hp,
                damage: Math.floor(bt.dmg * s.diffMulti.dmg),
                exp: Math.floor(bt.exp * s.diffMulti.exp),
                bw: bt.bw, bh: bt.bh, speed: 80
            };

            const hpW = bt.bw + 6;
            imp.hpBg = s.add.rectangle(clampedX, clampedY - bt.bh / 2 - 6, hpW, 3, 0x000000).setDepth(6);
            imp.hpFill = s.add.rectangle(clampedX - hpW / 2, clampedY - bt.bh / 2 - 6, hpW, 3, 0xff0000).setOrigin(0, 0.5).setDepth(6);

            s.hellImps.add(imp);
        }
        s.floatingText(boss.x, boss.y - 50, 'SUMMONED ' + HELL_BOSS_TYPE.summonCount + ' IMPS!', '#ff4400');
    }

    victoryHellBoss() {
        const s = this.scene;
        if (s.hellBossDefeated) return;
        s.hellBossDefeated = true;
        playBossDeath();
        const ox = s.hellOffsetX;

        if (s.hellBoss) {
            if (s.particles) s.particles.spawnBossDeath(s.hellBoss.x, s.hellBoss.y);
            if (s.hellBoss.hpBg) s.hellBoss.hpBg.destroy();
            if (s.hellBoss.hpFill) s.hellBoss.hpFill.destroy();
            if (s.hellBossNameText) s.hellBossNameText.destroy();
            s.hellBoss.destroy();
            s.hellBoss = null;
        }

        s.defeatedText = s.add.text(ox + HELL_WIDTH / 2, 250, 'RED DEMON DEFEATED!', {
            fontSize: '26px', fill: '#ff2200', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 4
        }).setOrigin(0.5).setScrollFactor(0);
        s.tweens.add({
            targets: s.defeatedText, alpha: 0, duration: 5000,
            onComplete: () => { if (s.defeatedText) s.defeatedText.destroy(); s.defeatedText = null; }
        });

        s.defeatedLoot = [];
        const lootItems = [];

        const crystal = { ...HEAT_CRYSTAL, type: 'equip' };
        if (s.addEquip(crystal)) {
            lootItems.push(crystal);
            playLoot();
        }

        if (Math.random() < 0.6) {
            const item = rollEquip();
            if (s.addEquip(item)) {
                lootItems.push(item);
                playLoot();
            }
        }

        if (Math.random() < BOSS_DROP_CHANCE) {
            const accItem = rollAccountEquip();
            if (s.addAccountEquip(accItem)) {
                lootItems.push({ ...accItem, name: accItem.name + ' [ACCOUNT]' });
                playLoot();
            }
        }

        lootItems.forEach((item, i) => {
            const rc = '#' + RARITY_COLORS[item.rarity].toString(16).padStart(6, '0');
            const lt = s.add.text(ox + HELL_WIDTH / 2, 280 + i * 22, '+' + item.name, {
                fontSize: '14px', fill: rc, fontFamily: 'Arial', fontStyle: 'bold',
                stroke: '#000', strokeThickness: 2
            }).setOrigin(0.5).setScrollFactor(0);
            s.defeatedLoot.push(lt);
            s.tweens.add({
                targets: lt, alpha: 0, duration: 5000,
                onComplete: () => { if (lt.active) lt.destroy(); }
            });
        });

        s.hellReturnPortal = s.add.rectangle(ox + HELL_WIDTH / 2, HELL_HEIGHT / 2 + 60, 60, 12, 0xff2200, 0.5).setDepth(2);
        s.hellReturnPortalHint = s.add.text(ox + HELL_WIDTH / 2, HELL_HEIGHT / 2 + 45, '', {
            fontSize: '11px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(12);

        s.time.delayedCall(3000, () => {
            if (s.zone === 'hell') {
                s.floatingText(ox + HELL_WIDTH / 2, HELL_HEIGHT / 2,
                    'Portal to Village appeared!', '#2ecc71');
            }
        });

        s.checkLevelUp();
        s._checkAccountLevelUp();
        s.ui.updateUI();

        const hc = rollBossCrystals('hell', s.difficulty);
        if (hc > 0) {
            const granted = s.awardCrystals(hc, ox + HELL_WIDTH / 2, 310);
            if (granted > 0) {
                s.floatingText(ox + HELL_WIDTH / 2, 310, '+' + granted + ' \u{1F48E}', '#3498db');
            }
        }
    }

    enterHell() {
        const s = this.scene;
        if (s.transitioning || s.menuOpen) return;
        if (s.zone !== 'cemetery' || !s.villageBossDefeated) return;
        const ox = s.villageOffsetX;
        const dist = Phaser.Math.Distance.Between(
            s.player.x, s.player.y, ox + VILLAGE_WIDTH / 2, CEMETERY_HEIGHT - 40
        );
        if (dist >= 60) return;

        s.transitioning = true;
        playPortal();
        s.cameras.main.fadeOut(800, 255, 0, 0);
        s.time.delayedCall(800, () => {
            s.currentZone.clear();
            this.setup();
            s.currentZone = this;
            s.cameras.main.fadeIn(500, 0, 0, 0);
            s.transitioning = false;
        });
    }

    exitHell() {
        const s = this.scene;
        if (s.transitioning || s.menuOpen) return;
        if (s.zone !== 'hell' || !s.hellBossDefeated) return;
        const ox = s.hellOffsetX;
        const dist = Phaser.Math.Distance.Between(
            s.player.x, s.player.y, ox + HELL_WIDTH / 2, HELL_HEIGHT / 2 + 60
        );
        if (dist >= 60) return;

        s.transitioning = true;
        playPortal();
        s.cameras.main.fadeOut(800, 0, 0, 0);
        s.time.delayedCall(800, () => {
            this.clear();
            s._setupZone('village', !s.villageRestored);
            s.cameras.main.fadeIn(500, 0, 0, 0);
            s.transitioning = false;
        });
    }

    updateHellImps() {
        const s = this.scene;
        if (s.zone !== 'hell' || s.menuOpen || s.transitioning) return;
        if (!s.hellImps) return;
        s.hellImps.getChildren().forEach(e => {
            if (!e.active || !e.stats) return;
            const aggroImp = s.getAggroTarget();
            const dx = aggroImp.x - e.x;
            const dy = aggroImp.y - e.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 250) {
                const spd = e.stats.speed || 80;
                if (dist > 20) {
                    e.body.setVelocity((dx / dist) * spd, (dy / dist) * spd);
                    e.setFlipX(dx < 0);
                } else {
                    e.body.setVelocity(0);
                }
            } else {
                e.body.setVelocity(0);
            }
            if (e.hpBg) { e.hpBg.x = e.x; e.hpBg.y = e.y - e.stats.bh / 2 - 6; }
            if (e.hpFill) { e.hpFill.x = e.x; e.hpFill.y = e.y - e.stats.bh / 2 - 6; }
        });
    }

    checkReturnPortal() {
        const s = this.scene;
        if (s.zone !== 'hell' || s.transitioning || s.menuOpen) return;
        if (s.hellBossDefeated && s.hellReturnPortal) {
            const pd = Phaser.Math.Distance.Between(
                s.player.x, s.player.y, s.hellReturnPortal.x, s.hellReturnPortal.y
            );
            if (pd < 80) {
                s.hellReturnPortalHint.setText('SPACE = return to Village');
            } else if (s.hellReturnPortalHint) {
                s.hellReturnPortalHint.setText('');
            }
        }
    }
}
