import Phaser from 'phaser';
import { ZONE_OBSTACLES, RANGED_INTERVAL_DEFAULT, MOB_ROLE_DEFAULTS, HEALER_HEAL_AMOUNT_DEFAULT, HEALER_HEAL_RANGE_DEFAULT, HEALER_ALLY_RANGE_DEFAULT } from '../config/index.js';

export class BaseZone {
    constructor(scene) {
        this.scene = scene;
    }

    _obstacleTex(type, zone) {
        if (type === 'rock') {
            const map = { cave: 'crystal', depths: 'crystal', shadow: 'crystal', hell: 'bone', cursed: 'bone', snowy: 'ice' };
            return 'obstacle_' + (map[zone] || 'rock');
        }
        return 'obstacle_' + type;
    }

    spawnObstacles() {
        const s = this.scene;
        const data = ZONE_OBSTACLES[s.zone];
        if (!data || data.length === 0) return;
        if (s.obstacles) { s.obstacles.clear(true, true); s.obstacles = null; }
        s.obstacles = s.physics.add.staticGroup();
        data.forEach(o => {
            const tex = this._obstacleTex(o.type, s.zone);
            const spr = s.add.sprite(o.x, o.y, tex).setDepth(3).setOrigin(0.5, 1);
            s.physics.add.existing(spr, true);
            spr.body.setSize(o.w, o.h);
            spr.body.setOffset(-o.w/2 + spr.width/2, -o.h + spr.height);
            if (o.type === 'bush') { spr.hp = 1; spr._isBush = true; }
            if (o.type === 'fence') { spr.hp = 2; spr._isFence = true; }
            s.obstacles.add(spr);
        });
        s.physics.add.collider(s.player, s.obstacles);
        s.physics.add.collider(s.enemies, s.obstacles);
    }

    /**
     * Set up common enemy overlap (player takes damage on contact).
     * Call in zone setup after creating enemies group.
     */
    setupEnemyOverlap() {
        const s = this.scene;
        s.physics.add.overlap(s.player, s.enemies, (p, e) => {
            if (e.active && e.stats && !s.menuOpen && !s.transitioning) {
                s.combat.takeDamage(e.stats.damage);
            }
        }, null, s);
    }

    clear() {
        const s = this.scene;
        s.tweens.killAll();
        s.physics.world.colliders.destroy();
        if (s.ui && s.ui.hud) s.ui.hud.clearFloatingTexts();
        if (s.loreItems) s.loreItems.cleanup();
        if (s.tutorialMgr) s.tutorialMgr._clearGuided();
        if (s._spellTimers) { s._spellTimers.forEach(t => { if (t && t.remove) t.remove(); }); s._spellTimers = []; }
        this._destroyFireballs();
        this._destroyEnemyProjectiles();
        this._destroyShield();
        this._destroyEnemies();
        this._destroyStumps();
        this._destroyDefeatedUI();
        this._destroyZoneSpecific();
        this._destroyNPCs();
        this._destroyVillageObjects();
    }

    _destroyGroup(group) {
        if (!group || !group.scene) return;
        if (group.getLength && group.getLength() > 0) {
            group.getChildren().forEach(e => {
                if (e.hpBg) { e.hpBg.destroy(); e.hpBg = null; }
                if (e.hpFill) { e.hpFill.destroy(); e.hpFill = null; }
                if (e.shieldIcon) { e.shieldIcon.destroy(); e.shieldIcon = null; }
                if (e.roleIcon) { e.roleIcon.destroy(); e.roleIcon = null; }
            });
            group.clear(true, true);
        }
        group.destroy();
    }

    _destroyChestGroup(group) {
        if (!group || !group.scene) return;
        if (group.getLength && group.getLength() > 0) {
            group.getChildren().forEach(ch => {
                if (ch.hpBg) { ch.hpBg.destroy(); ch.hpBg = null; }
                if (ch.hpFill) { ch.hpFill.destroy(); ch.hpFill = null; }
                if (ch.hintText) { ch.hintText.destroy(); ch.hintText = null; }
            });
            group.clear(true, true);
        }
        group.destroy();
    }

    _destroyBoss(boss, nameTextRef) {
        if (!boss) return;
        if (boss.hpBg) { boss.hpBg.destroy(); boss.hpBg = null; }
        if (boss.hpFill) { boss.hpFill.destroy(); boss.hpFill = null; }
        if (boss.aoeRing) { boss.aoeRing.destroy(); boss.aoeRing = null; }
        if (boss.aoeRing2) { boss.aoeRing2.destroy(); boss.aoeRing2 = null; }
        if (boss.telegraph) { boss.telegraph.destroy(); boss.telegraph = null; }
        if (boss.auraRing) { boss.auraRing.destroy(); boss.auraRing = null; }
        boss.destroy();
        if (nameTextRef) { nameTextRef.destroy(); }
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

    _updateMobs(delta, zoneName, bossSpawnFn) {
        const s = this.scene;
        if (s.zone !== zoneName || s.menuOpen || s.transitioning) return;
        if (!s.enemies) return;

        if (s.enemies.getLength() === 0 && !this.bossSpawned && !this.bossDefeated) {
            bossSpawnFn.call(this);
        }

        s.enemies.getChildren().forEach(e => {
            if (!e.active || !e.stats) return;
            const aggro = s.getAggroTarget();
            const dx = aggro.x - e.x;
            const dy = aggro.y - e.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 250) {
                const roleDefaults = MOB_ROLE_DEFAULTS[e.stats.role] || MOB_ROLE_DEFAULTS.default;
                const speed = (e.stats.speed || 50) * roleDefaults.speedMult;
                const engageDist = roleDefaults.engageDist;
                if (dist > engageDist) {
                    e.body.setVelocity((dx / dist) * speed * roleDefaults.moveMult, (dy / dist) * speed * roleDefaults.moveMult);
                    e.setFlipX(dx < 0);
                } else {
                    e.body.setVelocity(0);
                }

                if (e.stats.role === 'archer' && dist < 220 && dist > 40) {
                    e.stats.rangedTimer = (e.stats.rangedTimer || 0) + delta;
                    if (e.stats.rangedTimer >= (e.stats.rangedInterval || RANGED_INTERVAL_DEFAULT)) {
                        e.stats.rangedTimer = 0;
                        this._fireEnemyProjectile(e, dx, dy, 'arrow');
                    }
                } else if (e.stats.role === 'mage' && dist < 220 && dist > 40) {
                    e.stats.rangedTimer = (e.stats.rangedTimer || 0) + delta;
                    if (e.stats.rangedTimer >= (e.stats.rangedInterval || RANGED_INTERVAL_DEFAULT)) {
                        e.stats.rangedTimer = 0;
                        this._fireEnemyProjectile(e, dx, dy, 'magic');
                    }
                } else if (e.stats.role === 'healer' && dist < HEALER_HEAL_RANGE_DEFAULT) {
                    e.stats.rangedTimer = (e.stats.rangedTimer || 0) + delta;
                    if (e.stats.rangedTimer >= (e.stats.rangedInterval || RANGED_INTERVAL_DEFAULT)) {
                        e.stats.rangedTimer = 0;
                        s.enemies.getChildren().forEach(ally => {
                            if (ally !== e && ally.active && ally.stats && ally.stats.hp < ally.stats.maxHp) {
                                const ad = Phaser.Math.Distance.Between(e.x, e.y, ally.x, ally.y);
                                if (ad < HEALER_ALLY_RANGE_DEFAULT) {
                                    const healAmt = HEALER_HEAL_AMOUNT_DEFAULT;
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

    _updateMinionGroup(group, zoneName) {
        const s = this.scene;
        if (s.zone !== zoneName || s.menuOpen || s.transitioning) return;
        if (!group) return;
        group.getChildren().forEach(e => {
            if (!e.active || !e.stats) return;
            const aggro = s.getAggroTarget();
            const dx = aggro.x - e.x;
            const dy = aggro.y - e.y;
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

    _setupMinionOverlap(group) {
        const s = this.scene;
        s.physics.add.overlap(s.player, group, (p, e) => {
            if (e.active && e.stats && !s.menuOpen && !s.transitioning) {
                s.combat.takeDamage(e.stats.damage);
            }
        }, null, s);
    }

    _setupTrapOverlap(trapGroup) {
        const s = this.scene;
        s.physics.add.overlap(s.player, trapGroup, (p, trap) => {
            if (!trap.active || trap.onCooldown || s.menuOpen || s.transitioning) return;
            trap.onCooldown = true;
            const dmg = 10 + Math.floor(Math.random() * 11);
            s.combat.takeDamage(dmg);
            s.floatingText(trap.x, trap.y - 20, '-' + dmg, '#e74c3c');
            const angle = Math.atan2(p.y - trap.y, p.x - trap.x);
            const kb = 150;
            p.body.setVelocity(Math.cos(angle) * kb, Math.sin(angle) * kb);
            trap.setAlpha(0.2);
            s.time.delayedCall(3000, () => {
                if (trap.active) { trap.onCooldown = false; trap.setAlpha(0.7); }
            });
        }, null, s);
    }

    _setupGroundLootOverlap(lootGroup) {
        const s = this.scene;
        s.physics.add.overlap(s.player, lootGroup, (p, loot) => {
            if (!loot.active) return;
            if (s.multiplayer && s.mpSync && loot.mpId) {
                s.mpSync.broadcastLootCollected(loot.mpId);
            }
            const gold = loot.goldValue || 10;
            s.gold += gold;
            s.floatingText(loot.x, loot.y - 20, '+' + gold + ' gold', '#f1c40f');
            loot.destroy();
        }, null, s);
    }

    _destroyVillageObjects() {
        const s = this.scene;
        // Clean up ALL village-specific objects that might persist across zones
        const villageRefs = [
            'villageChildNPC', 'villageChildHint',
            'castleChildNPC', 'castleChildHint',
            'villageMerchantNPC', 'villageMerchantHint',
            'villageInn', 'villageInnHint',
            'campfire', 'campfireHint',
            'hellPortal', 'hellPortalGlow', 'hellPortalHint',
            'depthsPortal', 'depthsPortalGlow', 'depthsPortalHint',
            'cursedPortalVillage', 'cursedPortalVillageHint',
            'villageBg', 'villageCemeteryGate',
            'villageBoss', 'villageBossNameText',
            'villageBossAlive', 'childSpawned',
            'snowyIceSpirit', 'snowyIceSpiritNameText', 'snowyIceSpiritAbilities', 'snowyIceShards'
        ];
        villageRefs.forEach(ref => {
            if (s[ref]) {
                if (s[ref].destroy) s[ref].destroy();
                s[ref] = null;
            }
        });
        // Clean up village groups
        if (s.villageChests) { s.villageChests.clear(true, true); s.villageChests.destroy(); s.villageChests = null; }
        if (s.villageCorpses) { s.villageCorpses.clear(true, true); s.villageCorpses.destroy(); s.villageCorpses = null; }
        if (s.villageZombies) { s.villageZombies.clear(true, true); s.villageZombies.destroy(); s.villageZombies = null; }
        if (s.villageDecor) { s.villageDecor.forEach(d => { if (d && d.destroy) d.destroy(); }); s.villageDecor = null; }
        if (s.shopGroup) { s.shopGroup.forEach(e => { if (e && e.destroy) e.destroy(); }); s.shopGroup = []; }
        if (s.obstacles) { s.obstacles.clear(true, true); s.obstacles = null; }
    }

    _destroyFireballs() {
        const s = this.scene;
        if (s.fireballs) {
            s.fireballs.forEach(fb => { if (fb.glow) { fb.glow.destroy(); fb.glow = null; } fb.destroy(); });
            s.fireballs = [];
        }
    }

    _destroyEnemyProjectiles() {
        const s = this.scene;
        if (s.enemyProjectiles) {
            s.enemyProjectiles.forEach(p => { if (p && p.destroy) p.destroy(); });
            s.enemyProjectiles = [];
        }
    }

    _destroyShield() {
        const s = this.scene;
        if (s.shieldActive) {
            s.shieldActive = false;
            s.shieldHP = 0;
            if (s.shieldVfx) { s.shieldVfx.destroy(); s.shieldVfx = null; }
        }
        if (s.shieldGlow) { s.shieldGlow.destroy(); s.shieldGlow = null; }
    }

    _destroyEnemies() {
        const s = this.scene;
        if (s.enemies && s.enemies.scene && s.enemies.getLength && s.enemies.getLength() > 0) {
            s.enemies.getChildren().forEach(e => {
                if (e.hpBg) { e.hpBg.destroy(); e.hpBg = null; }
                if (e.hpFill) { e.hpFill.destroy(); e.hpFill = null; }
                if (e.nameText) { e.nameText.destroy(); e.nameText = null; }
                if (e.shieldIcon) { e.shieldIcon.destroy(); e.shieldIcon = null; }
                if (e.roleIcon) { e.roleIcon.destroy(); e.roleIcon = null; }
            });
            s.enemies.clear(true, true);
        }
        if (s.enemies) { s.enemies.destroy(); s.enemies = null; }
    }

    _destroyNPCs() {
        const s = this.scene;
        s.npcSprites.forEach(n => {
            if (n.nameTag) { n.nameTag.destroy(); n.nameTag = null; }
            if (n.questIcon) { n.questIcon.destroy(); n.questIcon = null; }
            n.destroy();
        });
        s.npcSprites = [];
        s.questIcons = [];
        s.nearbyNpc = null;
    }

    _destroyDefeatedUI() {
        const s = this.scene;
        if (s.defeatedText) { s.defeatedText.destroy(); s.defeatedText = null; }
        if (s.defeatedLoot) {
            s.defeatedLoot.forEach(t => { if (t && t.destroy) t.destroy(); });
            s.defeatedLoot = null;
        }
    }

    _destroyStumps() {
        const s = this.scene;
        if (s.stumps && s.stumps.scene && s.stumps.getLength && s.stumps.getLength() > 0) {
            s.stumps.getChildren().forEach(st => {
                if (st.hpBg) { st.hpBg.destroy(); st.hpBg = null; }
                if (st.hpFill) { st.hpFill.destroy(); st.hpFill = null; }
            });
            s.stumps.clear(true, true);
        }
        if (s.stumps) { s.stumps.destroy(); s.stumps = null; }
    }

    _destroyZoneSpecific() {
    }
}
