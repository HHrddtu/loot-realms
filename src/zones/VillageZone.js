import Phaser from 'phaser';
import {
    VILLAGE_WIDTH, VILLAGE_HEIGHT, CEMETERY_HEIGHT, VILLAGE_TOTAL_HEIGHT,
    VILLAGE_CAMP_COUNT, VILLAGE_MOBS_PER_CAMP, VILLAGE_ENEMY_TYPES, VILLAGE_CAMP_POSITIONS,
    VILLAGE_HOUSE_POSITIONS, VILLAGE_CHILD_HOUSE, VILLAGE_CORPSE_POSITIONS, VILLAGE_GARDEN_POSITIONS,
    VILLAGE_CHEST_COUNT_MIN, VILLAGE_CHEST_COUNT_MAX, VILLAGE_CHEST_DROP_CHANCE, VILLAGE_CHEST_EQUIP_DROP_CHANCE,
    VILLAGE_CHEST_OPEN_KEY, VILLAGE_CHEST_CLOSED_KEY, VILLAGE_CHEST_W, VILLAGE_CHEST_H,
    VILLAGE_BOSS_TYPE, VILLAGE_CORPSE_MINION, MAGMA_ARMOR,
    SNOWY_VILLAGE_ENEMY_TYPES, SNOWY_VILLAGE_CAMP_POSITIONS, SNOWY_VILLAGE_BOSS_TYPE,
    SNOWY_BOSS_MINION, WARMTH_CORE, SNOWY_VILLAGE_CHEST_COUNT, SNOWY_VILLAGE_CHEST_DROP_CHANCE,
    BOSS_DROP_CHANCE, GAME_WIDTH, GAME_HEIGHT, RARITY_COLORS, DIFF_COLORS,
    RANGED_INTERVAL_DEFAULT
} from '../config/index.js';
import { rollBossCrystals } from '../config/pets.js';
import { playPortal, startZoneMusic } from '../sound.js';
import { BaseZone } from '../systems/BaseZone.js';
import { VillageSpawner } from './VillageSpawner.js';
import { VillageBoss } from './VillageBoss.js';
import { VillageShop } from './village/VillageShop.js';
import { VillageProjectiles } from './VillageProjectiles.js';

export class VillageZone extends BaseZone {
    constructor(scene) {
        super(scene);
        this.shop = new VillageShop(scene);
        this.spawner = new VillageSpawner(scene, this);
        this.boss = new VillageBoss(scene, this);
        this.projectiles = new VillageProjectiles(scene);
        this.isFrozen = false;
        this.isRestored = false;
        this.isThriving = false;
        this.bossDefeated = false;
        this.snowyBossDefeated = false;
        this.allCleared = false;
        this.snowyAllCleared = false;
        this.bossClones = null;
        this.bossSpawned = false;
    }

    setup(frozen = false) {
        this.scene._destroyOrphanedCaveStairs();
        const ox = (GAME_WIDTH - VILLAGE_WIDTH) / 2;
        this.isFrozen = frozen;
        if (frozen) {
            this.scene.cameras.main.setBackgroundColor('#1a2438');
        } else if (!this.scene.zones.village.isRestored) {
            this.scene.cameras.main.setBackgroundColor('#1a1208');
        } else {
            this.scene.cameras.main.setBackgroundColor('#1a1408');
        }
        this.scene.physics.world.setBounds(ox, 0, VILLAGE_WIDTH, VILLAGE_TOTAL_HEIGHT);
        this.scene.cameras.main.setBounds(ox, 0, VILLAGE_WIDTH, VILLAGE_TOTAL_HEIGHT);
        this.scene.villageOffsetX = ox;

        this.scene.villageBg = this.scene.add.tileSprite(ox, 0, VILLAGE_WIDTH, VILLAGE_TOTAL_HEIGHT, frozen ? 'snow_ground' : 'village_ground')
            .setOrigin(0, 0).setDepth(0);

        this.scene.player.x = ox + VILLAGE_WIDTH / 2;
        this.scene.player.y = 50;
        this.scene.player.body.setCollideWorldBounds(true);
        this.scene.cameras.main.startFollow(this.scene.player, true, 0.08, 0.08);
        this.scene.cameras.main.setDeadzone(50, 40);

        this.scene.enemies = this.scene.physics.add.group();
        this.scene.villageChests = this.scene.physics.add.group();
        this.scene.villageCorpses = this.scene.physics.add.group();
        this.scene.villageZombies = this.scene.physics.add.group();
        this.scene.villageCampsCleared = 0;
        this.scene.childSpawned = false;
        this.scene.villageBossAlive = false;
        // Don't reset childSpokenTo - persists across zone transitions
        this.scene.snowyIceSpirit = null;
        this.scene.snowyIceSpiritNameText = null;
        this.scene.snowyIceSpiritAbilities = null;
        this.scene.snowyIceShards = null;
        if (this.scene.campfire) { if (this.scene.campfire.destroy) this.scene.campfire.destroy(); this.scene.campfire = null; }
        if (this.scene.campfireHint) { if (this.scene.campfireHint.destroy) this.scene.campfireHint.destroy(); this.scene.campfireHint = null; }
        this.scene.castleChildNPC = null;
        this.scene.castleChildHint = null;
        if (this.scene.hellPortal) { if (this.scene.hellPortal.destroy) this.scene.hellPortal.destroy(); this.scene.hellPortal = null; }
        if (this.scene.hellPortalGlow) { if (this.scene.hellPortalGlow.destroy) this.scene.hellPortalGlow.destroy(); this.scene.hellPortalGlow = null; }
        if (this.scene.hellPortalHint) { if (this.scene.hellPortalHint.destroy) this.scene.hellPortalHint.destroy(); this.scene.hellPortalHint = null; }
        if (this.scene.depthsPortal) { if (this.scene.depthsPortal.destroy) this.scene.depthsPortal.destroy(); this.scene.depthsPortal = null; }
        if (this.scene.depthsPortalGlow) { if (this.scene.depthsPortalGlow.destroy) this.scene.depthsPortalGlow.destroy(); this.scene.depthsPortalGlow = null; }
        if (this.scene.depthsPortalHint) { if (this.scene.depthsPortalHint.destroy) this.scene.depthsPortalHint.destroy(); this.scene.depthsPortalHint = null; }
        if (this.scene.desertPortalVillage) { if (this.scene.desertPortalVillage.destroy) this.scene.desertPortalVillage.destroy(); this.scene.desertPortalVillage = null; }
        if (this.scene.desertPortalVillageHint) { if (this.scene.desertPortalVillageHint.destroy) this.scene.desertPortalVillageHint.destroy(); this.scene.desertPortalVillageHint = null; }

        if (frozen) {
            this.spawner.spawnVillageDecor(true);
            this.spawner.spawnSnowyVillageCamps();
            if (this.scene.loreItems) {
                this.scene.loreItems.spawnLoreItems('snowy', [
                    { x: ox + 200, y: 400 },
                    { x: ox + 600, y: 1200 }
                ]);
            }
            this.spawner.spawnSnowyVillageChests();
            this.spawner.spawnSnowyCampfire();
            this._snowyCheckTimer = this.scene.time.addEvent({
                delay: 1000, loop: true,
                callback: () => this.scene.zones.snowy._checkSnowyVillageProgress()
            });
        } else if (!this.scene.zones.village.isRestored) {
            this.spawner.spawnVillageCamps();
            this.spawner.spawnDeadVillageDecor();
            if (this.scene.loreItems) {
                this.scene.loreItems.spawnLoreItems('village', [
                    { x: ox + 400, y: 600 },
                    { x: ox + 600, y: 1400 }
                ]);
            }
            this.spawner.spawnVillageChests();
        } else if (!this.scene.zones.village.isThriving) {
            // Restored but not thriving — simple village with shop/inn
            this.spawner.spawnRestoredVillageDecor();
            this.spawner.spawnRestoredCampfire();
            if (!this.scene.villageCemeteryGate) {
                const gx = ox + VILLAGE_WIDTH / 2, gy = 2000;
                this.scene.villageCemeteryGate = this.scene.add.rectangle(gx, gy, 40, 20, 0x666666).setDepth(5);
                this.scene.physics.add.existing(this.scene.villageCemeteryGate, true);
            }
            if (!this.scene.zones.village.isThriving && !this.scene.zones.castle.questDone && !this.scene.zones.village.childSpokenTo) {
                if (!this.scene.castleChildNPC) {
                    this.scene.time.delayedCall(1500, () => {
                        if (this.scene.zone !== 'village') return;
                        this.spawner.spawnCastleChild();
                    });
                }
            }
            this.shop.spawnShop();
            this.shop.spawnInn();
        } else {
            // Thriving village — full life
            this.spawner.spawnThrivingVillageDecor();
            this.spawner.spawnRestoredCampfire();
            // Cemetery gate only if castle quest not done
            if (!this.scene.villageCemeteryGate && !this.scene.zones.castle.questDone) {
                const gx = ox + VILLAGE_WIDTH / 2, gy = 2000;
                this.scene.villageCemeteryGate = this.scene.add.rectangle(gx, gy, 40, 20, 0x666666).setDepth(5);
                this.scene.physics.add.existing(this.scene.villageCemeteryGate, true);
            }
            this.shop.spawnShop();
            this.shop.spawnInn();
            // Depths portal appears when village is thriving
            if (!this.scene.depthsPortal && this.scene.zones.village.isThriving) {
                const dpx = ox + VILLAGE_WIDTH / 2;
                const dpy = 1850;
                this.scene.depthsPortal = this.scene.add.sprite(dpx, dpy, 'portal').setDepth(6).setScale(1.2);
                this.scene.depthsPortalGlow = this.scene.add.image(dpx, dpy, 'portal_glow').setDepth(1).setScale(2).setTint(0x8800ff).setAlpha(0.6);
                this.scene.tweens.add({ targets: this.scene.depthsPortalGlow, scaleX: 2.3, scaleY: 2.3, alpha: 0.3, duration: 1500, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
                this.scene.depthsPortalHint = this.scene.add.text(dpx, dpy - 40, '', {
                    fontSize: '11px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
                    stroke: '#000', strokeThickness: 2
                }).setOrigin(0.5).setDepth(12);
            }
            // Cursed Lands portal (after depths boss defeated)
            if (!this.scene.cursedPortalVillage && this.scene.zones.depths.bossDefeated && !this.scene.zones.cursed.bossDefeated) {
                const cpx = ox + VILLAGE_WIDTH / 2;
                const cpy = 1700;
                this.scene.cursedPortalVillage = this.scene.add.sprite(cpx, cpy, 'portal').setDepth(6).setScale(1.2).setTint(0x00aa00);
                this.scene.tweens.add({ targets: this.scene.cursedPortalVillage, y: cpy - 5, duration: 1200, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
                this.scene.cursedPortalVillageHint = this.scene.add.text(cpx, cpy - 40, '', {
                    fontSize: '11px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
                    stroke: '#000', strokeThickness: 2
                }).setOrigin(0.5).setDepth(12);
            }
            // Desert portal (optional zone, after depths boss defeated)
            if (!this.scene.desertPortalVillage && this.scene.zones.depths.bossDefeated) {
                const ddx = ox + VILLAGE_WIDTH / 2;
                const ddy = 1600;
                this.scene.desertPortalVillage = this.scene.add.sprite(ddx, ddy, 'portal').setDepth(6).setScale(1.2).setTint(0xc8a44a);
                this.scene.tweens.add({ targets: this.scene.desertPortalVillage, y: ddy - 5, duration: 1200, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
                this.scene.desertPortalVillageHint = this.scene.add.text(ddx, ddy - 40, '', {
                    fontSize: '11px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
                    stroke: '#000', strokeThickness: 2
                }).setOrigin(0.5).setDepth(12);
            }
        }

        this.scene.physics.add.overlap(this.scene.player, this.scene.enemies, (p, e) => {
            if (e.active && e.stats && !this.scene.menuOpen && !this.scene.transitioning) {
                this.scene.combat.takeDamage(e.stats.damage);
            }
        }, null, this.scene);

        this.scene.physics.add.overlap(this.scene.player, this.scene.villageZombies, (p, e) => {
            if (e.active && e.stats && !this.scene.menuOpen && !this.scene.transitioning) {
                this.scene.combat.takeDamage(e.stats.damage);
            }
        }, null, this.scene);

        this.scene.zone = 'village';
        if (!frozen) this.scene._spawnNPCs();
        this.scene.hintText.setText('SPACE=interact/attack | I=inventory | T=talents | C=craft | Q=quests | F=potion | P=pause');
        if (frozen) {
            startZoneMusic('snowy');
        } else {
            startZoneMusic('village');
        }
        if (frozen && this.scene.particles) {
            this.scene.particles.startSnowfall(VILLAGE_WIDTH, VILLAGE_TOTAL_HEIGHT);
            this.scene.particles.startWinterMist(VILLAGE_WIDTH, VILLAGE_TOTAL_HEIGHT);
        } else if (!this.scene.zones.village.isRestored && this.scene.particles) {
            // Dead village — dark mist
            this.scene.particles.startDarkMist(VILLAGE_WIDTH, VILLAGE_TOTAL_HEIGHT);
        } else if (!this.scene.zones.village.isThriving && this.scene.particles) {
            // Restored but simple — warm fireflies
            this.scene.particles.startFirefly(VILLAGE_WIDTH, VILLAGE_HEIGHT);
        } else if (this.scene.particles) {
            // Thriving — sun, butterflies, fireflies
            this.scene.particles.startSunRays(VILLAGE_WIDTH, VILLAGE_TOTAL_HEIGHT);
            this.scene.particles.startButterflies(VILLAGE_WIDTH, VILLAGE_TOTAL_HEIGHT);
            this.scene.particles.startFirefly(VILLAGE_WIDTH, VILLAGE_HEIGHT);
        }
    }

    clear() {
        // Call BaseZone.clear() to destroy enemies, stumps, fireballs, etc.
        // BaseZone.clear() will also call _destroyZoneSpecific()
        super.clear();
    }

    _destroyZoneSpecific() {
        const s = this.scene;
        const kill = (obj) => { if (obj) { if (obj.destroy) obj.destroy(); return null; } return null; };
        const clearGroup = (g) => { if (g) { if (g.getLength && g.getLength() > 0) g.clear(true, true); g.destroy(); } return null; };

        if (this._snowyCheckTimer) { this._snowyCheckTimer.destroy(); this._snowyCheckTimer = null; }
        if (s.particles) s.particles.stopEnvironment();

        if (s.villageChests && s.villageChests.getLength && s.villageChests.getLength() > 0) {
            s.villageChests.getChildren().forEach(ch => {
                if (ch.hintText) { ch.hintText.destroy(); ch.hintText = null; }
                if (ch.hpBg) { ch.hpBg.destroy(); ch.hpBg = null; }
                if (ch.hpFill) { ch.hpFill.destroy(); ch.hpFill = null; }
            });
        }
        s.villageChests = clearGroup(s.villageChests);
        s.villageCorpses = clearGroup(s.villageCorpses);

        if (s.villageZombies && s.villageZombies.getLength && s.villageZombies.getLength() > 0) {
            s.villageZombies.getChildren().forEach(e => {
                if (e.hpBg) { e.hpBg.destroy(); e.hpBg = null; }
                if (e.hpFill) { e.hpFill.destroy(); e.hpFill = null; }
                if (e.shieldIcon) { e.shieldIcon.destroy(); e.shieldIcon = null; }
                if (e.roleIcon) { e.roleIcon.destroy(); e.roleIcon = null; }
            });
        }
        s.villageZombies = clearGroup(s.villageZombies);

        if (s.villageDecor) {
            [...s.villageDecor].forEach(d => {
                if (d && !d.destroyed) {
                    if (d.hpBg) { d.hpBg.destroy(); d.hpBg = null; }
                    if (d.hpFill) { d.hpFill.destroy(); d.hpFill = null; }
                    if (d.nameText) { d.nameText.destroy(); d.nameText = null; }
                    d.destroy();
                }
            });
            s.villageDecor = null;
        }
        if (s.children) {
            const toRemove = [];
            s.children.list.forEach(child => {
                if (child?.texture?.key && (child.texture.key.includes('village') || child.texture.key.includes('house')))
                    toRemove.push(child);
            });
            toRemove.forEach(child => child.destroy());
        }

        s.villageBg = kill(s.villageBg);
        s.villageChildNPC = kill(s.villageChildNPC);
        s.villageChildHint = kill(s.villageChildHint);
        if (s.villageBoss) {
            if (s.villageBoss.hpBg) { s.villageBoss.hpBg.destroy(); s.villageBoss.hpBg = null; }
            if (s.villageBoss.hpFill) { s.villageBoss.hpFill.destroy(); s.villageBoss.hpFill = null; }
            if (s.villageBossNameText) { s.villageBossNameText.destroy(); s.villageBossNameText = null; }
            s.villageBoss.destroy(); s.villageBoss = null;
        }
        this.bossClones = null;
        s.villageCemeteryGate = kill(s.villageCemeteryGate);
        s.hellPortal = kill(s.hellPortal);
        s.hellPortalGlow = kill(s.hellPortalGlow);
        s.hellPortalHint = kill(s.hellPortalHint);
        s.campfire = kill(s.campfire);
        s.campfireHint = kill(s.campfireHint);
        s.castleChildNPC = kill(s.castleChildNPC);
        s.castleChildHint = kill(s.castleChildHint);
        s.villageMerchantNPC = kill(s.villageMerchantNPC);
        s.villageMerchantHint = kill(s.villageMerchantHint);
        s.villageInn = kill(s.villageInn);
        s.villageInnHint = kill(s.villageInnHint);
        if (s.shopGroup) { s.shopGroup.forEach(e => { if (e?.destroy) e.destroy(); }); s.shopGroup = []; }

        if (s.snowyIceSpirit) {
            if (s.snowyIceSpirit.hpBg) { s.snowyIceSpirit.hpBg.destroy(); s.snowyIceSpirit.hpBg = null; }
            if (s.snowyIceSpirit.hpFill) { s.snowyIceSpirit.hpFill.destroy(); s.snowyIceSpirit.hpFill = null; }
            if (s.snowyIceSpiritNameText) { s.snowyIceSpiritNameText.destroy(); s.snowyIceSpiritNameText = null; }
            s.snowyIceSpirit.destroy(); s.snowyIceSpirit = null;
        }
        if (s.snowyIceShards) {
            s.snowyIceShards.getChildren().forEach(sh => {
                if (sh.hpBg) { sh.hpBg.destroy(); sh.hpBg = null; }
                if (sh.hpFill) { sh.hpFill.destroy(); sh.hpFill = null; }
            });
            s.snowyIceShards.clear(true, true);
            s.snowyIceShards.destroy(); s.snowyIceShards = null;
        }
        s.zones.village.snowyAllCleared = false;
        s.zones.village.snowyBossDefeated = false;
        this.isFrozen = false;

        s.cursedPortalVillage = kill(s.cursedPortalVillage);
        s.cursedPortalVillageHint = kill(s.cursedPortalVillageHint);
        s.depthsPortal = kill(s.depthsPortal);
        s.depthsPortalGlow = kill(s.depthsPortalGlow);
        s.depthsPortalHint = kill(s.depthsPortalHint);
        s.desertPortalVillage = kill(s.desertPortalVillage);
        s.desertPortalVillageHint = kill(s.desertPortalVillageHint);
        this._destroyDefeatedUI();
    }

    handleSpace() {
        const s = this.scene;
        if (s.nearbyShop) {
            this.shop.openShop();
            return;
        }
        if (s.nearbyInn) {
            this.shop.useInn();
            return;
        }
        if (s.nearbyNpc && !s.menuOpen) {
            s.npc.interactWithNpc();
            return;
        }
        if (s.zones.village.isFrozen && s.campfire && Phaser.Math.Distance.Between(
            s.player.x, s.player.y, s.campfire.x, s.campfire.y
        ) < 60) {
            this._activateCampfire();
        } else if (s.zones.village.isFrozen && s.snowyIceSpirit && Phaser.Math.Distance.Between(
            s.player.x, s.player.y, s.snowyIceSpirit.x, s.snowyIceSpirit.y
        ) < 80) {
            s.attack();
        } else if (!s.zones.village.isFrozen && s.zones.village.allCleared && s.villageChildNPC && Phaser.Math.Distance.Between(
            s.player.x, s.player.y, s.villageChildNPC.x, s.villageChildNPC.y
        ) < 50) {
            this._talkToChild();
        } else if (!s.zones.village.isFrozen && s.zones.village.allCleared && s.villageCemeteryGate && Phaser.Math.Distance.Between(
            s.player.x, s.player.y, s.villageCemeteryGate.x, s.villageCemeteryGate.y
        ) < 50) {
            this._enterCemetery();
        } else if (!s.zones.village.isFrozen && s.zones.village.isRestored && !s.zones.village.isThriving && !s.zones.castle.questDone && s.castleChildNPC && Phaser.Math.Distance.Between(
            s.player.x, s.player.y, s.castleChildNPC.x, s.castleChildNPC.y
        ) < 50) {
            this._talkToCastleChild();
        } else if (!s.zones.village.isFrozen && s.zones.village.bossDefeated && s.hellPortal && Phaser.Math.Distance.Between(
            s.player.x, s.player.y, s.hellPortal.x, s.hellPortal.y
        ) < 60) {
            this.scene.zones.hell.enterHell();
        } else if (!s.zones.village.isFrozen && s.zones.village.isThriving && s.depthsPortal && Phaser.Math.Distance.Between(
            s.player.x, s.player.y, s.depthsPortal.x, s.depthsPortal.y
        ) < 60) {
            this.scene.zones.depths.enterDepths();
        } else if (!s.zones.village.isFrozen && s.cursedPortalVillage && Phaser.Math.Distance.Between(
            s.player.x, s.player.y, s.cursedPortalVillage.x, s.cursedPortalVillage.y
        ) < 60) {
            this.enterCursed();
        } else if (!s.zones.village.isFrozen && s.desertPortalVillage && Phaser.Math.Distance.Between(
            s.player.x, s.player.y, s.desertPortalVillage.x, s.desertPortalVillage.y
        ) < 60) {
            this.scene.zones.desert.enterDesert();
        } else if (s.loreItems && s.loreItems.tryInteract()) {
            return;
        } else {
            s.attack();
        }
    }

    update(time, delta) {
        this.boss.updateBossClones();
        this._updateVillageMobs();
        this._updateSnowyVillageMobs();
        this.boss.updateBoss(delta);
        this.boss.updateSnowyBoss(delta);
        this._checkVillageProgress();
        this._updateCastleChildHint();
        this._updateCampfireHints();
        this._updateShopInnHints();
        if (this.scene.loreItems) this.scene.loreItems.update();
    }

    _updateCastleChildHint() {
        if (!this.scene.castleChildNPC || !this.scene.castleChildHint) return;
        const dist = Phaser.Math.Distance.Between(
            this.scene.player.x, this.scene.player.y,
            this.scene.castleChildNPC.x, this.scene.castleChildNPC.y
        );
        if (dist < 50) {
            this.scene.castleChildHint.setText('SPACE to talk');
        } else {
            this.scene.castleChildHint.setText('');
        }
    }

    _activateCampfire() {
        if (!this.scene.zones.village.isFrozen || !this.scene.campfire) return;
        const dist = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.scene.campfire.x, this.scene.campfire.y);
        if (dist >= 60) return;

        let hasWarmthCore = false;
        const bag = this.scene.equipBag || [];
        for (let i = 0; i < bag.length; i++) {
            if (bag[i] && (bag[i].id === 'warmth_core' || bag[i].key === 'warmth_core')) {
                bag.splice(i, 1);
                hasWarmthCore = true;
                break;
            }
        }
        if (!hasWarmthCore) {
            if (this.scene.campfireHint) this.scene.campfireHint.setText('Need Warmth Core!');
            return;
        }

        this.scene.transitioning = true;
        if (this.scene.campfireHint) this.scene.campfireHint.setText('');
        this.scene.cameras.main.fadeOut(1500, 255, 200, 100);

        this.scene.time.delayedCall(1500, () => {
            this.scene.zones.village.isRestored = true;
            this.clear();
            this.setup(false);
            this.scene.cameras.main.fadeIn(1000, 255, 200, 100);
            this.scene.transitioning = false;

            this.scene.time.delayedCall(500, () => {
                if (this.scene.zone !== 'village') return;
                this.scene.floatingText(this.scene.villageOffsetX + VILLAGE_WIDTH / 2, 200, 'The village is restored!', '#ff6600');
            });
        });
    }

    _talkToCastleChild() {
        if (!this.scene.castleChildNPC || !this.scene.castleChildHint) return;
        const dist = Phaser.Math.Distance.Between(
            this.scene.player.x, this.scene.player.y, this.scene.castleChildNPC.x, this.scene.castleChildNPC.y
        );
        if (dist >= 50) return;

        this.scene.castleChildHint.setText('');
        this.scene.zones.village.childSpokenTo = true; // Mark that child has spoken

        const msgText = this.scene.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 80,
            'They took everyone! Bandits from the east castle!\nPlease, you have to save them!', {
            fontSize: '16px', fill: '#f1c40f', fontFamily: 'Georgia', fontStyle: 'italic',
            stroke: '#000', strokeThickness: 3, wordWrap: { width: 450 }, align: 'center'
        }).setOrigin(0.5).setDepth(20).setScrollFactor(0);

        const box = this.scene.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 70, 480, 60, 0x000000, 0.7)
            .setDepth(19).setScrollFactor(0);

        this.scene.time.delayedCall(4000, () => {
            if (msgText) msgText.destroy();
            if (box) box.destroy();
        });

        // Child runs away to the left after dialog
        this.scene.time.delayedCall(4500, () => {
            if (this.scene.castleChildNPC && this.scene.castleChildNPC.active) {
                this.scene.floatingText(this.scene.castleChildNPC.x, this.scene.castleChildNPC.y - 20, '*runs away*', '#f1c40f');
                this.scene.tweens.add({
                    targets: this.scene.castleChildNPC,
                    x: this.scene.castleChildNPC.x - 300,
                    duration: 2000,
                    ease: 'Power1',
                    onComplete: () => {
                        if (this.scene.castleChildNPC && this.scene.castleChildNPC.active) {
                            this.scene.castleChildNPC.destroy();
                            this.scene.castleChildNPC = null;
                        }
                        if (this.scene.castleChildHint && this.scene.castleChildHint.active) {
                            this.scene.castleChildHint.destroy();
                            this.scene.castleChildHint = null;
                        }
                    }
                });
            }
            this.scene.time.delayedCall(2500, () => {
                this._startCastleSkip();
            });
        });
    }

    _startCastleSkip() {
        if (this.scene.transitioning) return;
        this.scene.transitioning = true;
        this.scene.menuOpen = true;
        this.scene.physics.pause();

        this.scene.cameras.main.fadeOut(800, 0, 0, 0);
        this.scene.time.delayedCall(800, () => {
            this.clear();

            this.scene.cameras.main.setBackgroundColor('#1a0e05');
            const cartImg = this.scene.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'cart_ride').setDepth(0);

            const cartText = this.scene.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 20, 'Riding to the castle...', {
                fontSize: '20px', fill: '#f5cba7', fontFamily: 'Georgia', fontStyle: 'italic'
            }).setOrigin(0.5).setDepth(10).setScrollFactor(0);

            const dots = ['...', '....', '.....', 'The castle looms ahead...'];
            let dotIdx = 0;
            if (!this.scene._spellTimers) this.scene._spellTimers = [];
            const dotTimer = this.scene.time.addEvent({
                delay: 800, repeat: dots.length - 1,
                callback: () => {
                    dotIdx++;
                    if (dotIdx < dots.length) cartText.setText(dots[dotIdx]);
                }
            });
            this.scene._spellTimers.push(dotTimer);

            this.scene.cameras.main.fadeIn(500, 0, 0, 0);

            this.scene.time.delayedCall(3500, () => {
                this.scene.cameras.main.fadeOut(800, 0, 0, 0);
                this.scene.time.delayedCall(800, () => {
                    cartImg.destroy();
                    cartText.destroy();
                    this.scene._setupZone('castle', 0);
                    this.scene.cameras.main.fadeIn(500, 0, 0, 0);
                    this.scene.transitioning = false;
                    this.scene.menuOpen = false;
                    this.scene.physics.resume();
                });
            });
        });
    }

    _updateVillageMobs() {
        if (this.scene.zone !== 'village' || this.scene.menuOpen || this.scene.transitioning) return;
        if (!this.scene.enemies) return;

        const delta = this.scene.game.loop.delta;

        const aggro = this.scene.getAggroTarget();

        this.scene.enemies.getChildren().forEach(e => {
            if (!e.active || !e.stats) return;

            const dx = aggro.x - e.x;
            const dy = aggro.y - e.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 220) {
                let speed = 50;
                let engageDist = 30;
                if (e.stats.role === 'assassin') { speed = 80; engageDist = 20; }
                else if (e.stats.role === 'tank') { speed = 35; engageDist = 25; }
                else if (e.stats.role === 'archer') { speed = 45; engageDist = 140; }
                else if (e.stats.role === 'healer') { speed = 45; engageDist = 100; }

                if (dist > engageDist) {
                    const moveMul = (e.stats.role === 'archer' || e.stats.role === 'healer') ? 0.3 : 1;
                    e.body.setVelocity((dx / dist) * speed * moveMul, (dy / dist) * speed * moveMul);
                    e.setFlipX(dx < 0);
                } else {
                    e.body.setVelocity(0);
                }

                if (e.stats.role === 'archer' && dist < 200 && dist > 40) {
                    e.stats.rangedTimer += delta;
                    if (e.stats.rangedTimer >= e.stats.rangedInterval) {
                        e.stats.rangedTimer = 0;
                        this._fireEnemyProjectile(e, dx, dy, 'arrow');
                    }
                } else if (e.stats.role === 'healer' && dist < 150) {
                    e.stats.rangedTimer += delta;
                    if (e.stats.rangedTimer >= e.stats.rangedInterval) {
                        e.stats.rangedTimer = 0;
                        this.scene.enemies.getChildren().forEach(ally => {
                            if (ally !== e && ally.active && ally.stats && ally.stats.hp < ally.stats.maxHp) {
                                const ad = Phaser.Math.Distance.Between(e.x, e.y, ally.x, ally.y);
                                if (ad < 100) {
                                    const healAmt = 5;
                                    ally.stats.hp = Math.min(ally.stats.maxHp, ally.stats.hp + healAmt);
                                    if (ally.hpFill) ally.hpFill.width = (ally.hpBg.width) * (ally.stats.hp / ally.stats.maxHp);
                                    this._fireEnemyProjectile(e, ally.x - e.x, ally.y - e.y, 'heal');
                                }
                            }
                        });
                    }
                }
            } else {
                e.body.setVelocity(0);
            }

            e.hpBg.x = e.x;
            e.hpBg.y = e.y - e.stats.bh / 2 - 8;
            e.hpFill.x = e.x;
            e.hpFill.y = e.y - e.stats.bh / 2 - 8;
            if (e.shieldIcon) { e.shieldIcon.x = e.x; e.shieldIcon.y = e.y - e.stats.bh / 2 - 16; }
            if (e.roleIcon) { e.roleIcon.x = e.x; e.roleIcon.y = e.y - e.stats.bh / 2 - 16; }
        });

        this._updateEnemyProjectiles();

        if (this.scene.villageZombies && this.scene.villageZombies.getLength() > 0) {
            this.scene.villageZombies.getChildren().forEach(e => {
                if (!e.active || !e.stats) return;
                const dx = aggro.x - e.x;
                const dy = aggro.y - e.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 200) {
                    if (dist > 20) {
                        e.body.setVelocity((dx / dist) * 60, (dy / dist) * 60);
                        e.setFlipX(dx < 0);
                    } else {
                        e.body.setVelocity(0);
                    }
                } else {
                    e.body.setVelocity(0);
                }
                e.hpBg.x = e.x;
                e.hpBg.y = e.y - e.stats.bh / 2 - 6;
                e.hpFill.x = e.x;
                e.hpFill.y = e.y - e.stats.bh / 2 - 6;
                if (e.shieldIcon) { e.shieldIcon.x = e.x; e.shieldIcon.y = e.y - e.stats.bh / 2 - 14; }
                if (e.roleIcon) { e.roleIcon.x = e.x; e.roleIcon.y = e.y - e.stats.bh / 2 - 14; }
            });
        }
    }

    _fireEnemyProjectile(e, dx, dy, type) {
        this.projectiles.fireProjectile(e, dx, dy, type);
    }

    _updateEnemyProjectiles() {
        this.projectiles.update();
    }

    _checkVillageProgress() {
        if (this.scene.zone !== 'village' || this.scene.zones.village.isFrozen || this.scene.zones.village.allCleared) return;
        const enemiesAlive = this.scene.enemies && this.scene.enemies.scene && this.scene.enemies.getLength && this.scene.enemies.getLength() > 0;
        const zombiesAlive = this.scene.villageZombies && this.scene.villageZombies.scene && this.scene.villageZombies.getLength && this.scene.villageZombies.getLength() > 0;
        if (!enemiesAlive && !zombiesAlive) {
            this.scene.zones.village.allCleared = true;
            this.spawner.spawnChildNPC();
            this.spawner.showVillageClearedDecor();
        }
    }

    _talkToChild() {
        if (!this.scene.villageChildNPC || !this.scene.villageChildHint) return;
        const dist = Phaser.Math.Distance.Between(
            this.scene.player.x, this.scene.player.y, this.scene.villageChildNPC.x, this.scene.villageChildNPC.y
        );
        if (dist >= 50) return;

        this.scene.villageChildHint.setText('');

        const msgText = this.scene.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 60, 'It all came from the cemetery...', {
            fontSize: '18px', fill: '#e74c3c', fontFamily: 'Georgia', fontStyle: 'italic',
            stroke: '#000', strokeThickness: 3, wordWrap: { width: 500 }, align: 'center'
        }).setOrigin(0.5).setDepth(20).setScrollFactor(0);

        const box = this.scene.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 50, 520, 60, 0x000000, 0.7)
            .setDepth(19).setScrollFactor(0);

        this.scene.time.delayedCall(3500, () => {
            if (msgText) msgText.destroy();
            if (box) box.destroy();
        });
    }

    _enterCemetery() {
        if (this.scene.transitioning || this.scene.menuOpen) return;
        if (this.scene.zone !== 'village' || !this.scene.zones.village.allCleared) return;
        const ox = this.scene.villageOffsetX;
        const dist = Phaser.Math.Distance.Between(
            this.scene.player.x, this.scene.player.y, ox + VILLAGE_WIDTH / 2, 2000
        );
        if (dist >= 50) return;

        this.scene.transitioning = true;
        playPortal();
        this.scene.cameras.main.fadeOut(800, 0, 0, 0);
        this.scene.time.delayedCall(800, () => {
            this.clear();
            this.setupCemetery();
            this.scene.cameras.main.fadeIn(500, 0, 0, 0);
            this.scene.transitioning = false;
        });
    }

    setupCemetery() {
        const ox = (GAME_WIDTH - VILLAGE_WIDTH) / 2;
        this.scene.cameras.main.setBackgroundColor('#1a1a1a');
        this.scene.physics.world.setBounds(ox, 0, VILLAGE_WIDTH, CEMETERY_HEIGHT);
        this.scene.cameras.main.setBounds(ox, 0, VILLAGE_WIDTH, CEMETERY_HEIGHT);
        this.scene.villageOffsetX = ox;

        this.scene.villageBg = this.scene.add.tileSprite(ox, 0, VILLAGE_WIDTH, CEMETERY_HEIGHT, 'village_ground')
            .setOrigin(0, 0).setDepth(0);

        this.scene.player.x = ox + VILLAGE_WIDTH / 2;
        this.scene.player.y = 30;
        this.scene.player.body.setCollideWorldBounds(true);
        this.scene.cameras.main.startFollow(this.scene.player, true, 0.08, 0.08);
        this.scene.cameras.main.setDeadzone(50, 40);

        this.scene.enemies = this.scene.physics.add.group();
        this.scene.villageChests = this.scene.physics.add.group();
        this.scene.villageCorpses = this.scene.physics.add.group();
        this.scene.villageZombies = this.scene.physics.add.group();
        this.bossClones = null;
        this.scene.villageBossAlive = false;
 
        this.scene.villageDecor = [];
        for (let y = 10; y < CEMETERY_HEIGHT; y += 40) {
            const f1 = this.scene.add.image(ox + 30, y, 'village_fence').setDepth(1).setAlpha(0.6);
            const f2 = this.scene.add.image(ox + VILLAGE_WIDTH - 30, y, 'village_fence').setDepth(1).setAlpha(0.6);
            this.scene.villageDecor.push(f1, f2);
        }

        for (let i = 0; i < 8; i++) {
            const gx = ox + 80 + Math.random() * (VILLAGE_WIDTH - 160);
            const gy = 60 + Math.random() * (CEMETERY_HEIGHT - 120);
            const gravestone = this.scene.add.rectangle(gx, gy, 8, 14, 0x666666).setDepth(2);
            this.scene.villageDecor.push(gravestone);
        }

        this.scene.physics.add.overlap(this.scene.player, this.scene.enemies, (p, e) => {
            if (e.active && e.stats && !this.scene.menuOpen && !this.scene.transitioning) {
                this.scene.combat.takeDamage(e.stats.damage);
            }
        }, null, this.scene);

        this.scene.physics.add.overlap(this.scene.player, this.scene.villageZombies, (p, e) => {
            if (e.active && e.stats && !this.scene.menuOpen && !this.scene.transitioning) {
                this.scene.combat.takeDamage(e.stats.damage);
            }
        }, null, this.scene);

        this.scene.zone = 'cemetery';
        startZoneMusic('cemetery');
        this.scene.hintText.setText('SPACE=attack | I=inventory | TAB=stats | T=talents | C=craft | Q=quests | P=pause');

        if (this.scene.particles) {
            this.scene.particles.startCaveDrip(VILLAGE_WIDTH, CEMETERY_HEIGHT);
        }

        this.scene.time.delayedCall(1200, () => {
            if (this.scene.zone === 'cemetery' && !this.bossSpawned && !this.bossDefeated) {
                this.bossSpawned = true;
                this.boss.spawnVillageBoss();
            }
        });
    }

    _updateSnowyVillageMobs() {
        const s = this.scene;
        if (s.zone !== 'village' || !s.zones.village.isFrozen || s.menuOpen || s.transitioning) return;
        if (!s.enemies) return;

        const delta = s.game.loop.delta;
        let activeEnemies = 0;

        s.enemies.getChildren().forEach(e => {
            if (!e.active || !e.stats) return;
            activeEnemies++;
            const aggro = this.scene.getAggroTarget();
            const dx = aggro.x - e.x;
            const dy = aggro.y - e.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 220) {
                let speed = 55;
                let engageDist = 30;
                if (e.stats.role === 'assassin') { speed = 85; engageDist = 20; }
                else if (e.stats.role === 'tank') { speed = 38; engageDist = 25; }
                else if (e.stats.role === 'archer') { speed = 48; engageDist = 140; }
                else if (e.stats.role === 'healer') { speed = 50; engageDist = 100; }

                if (dist > engageDist) {
                    const moveMul = (e.stats.role === 'archer' || e.stats.role === 'healer') ? 0.3 : 1;
                    e.body.setVelocity((dx / dist) * speed * moveMul, (dy / dist) * speed * moveMul);
                    e.setFlipX(dx < 0);
                } else {
                    e.body.setVelocity(0);
                }

                if (e.stats.role === 'archer' && dist < 200 && dist > 40) {
                    e.stats.rangedTimer = (e.stats.rangedTimer || 0) + delta;
                    if (e.stats.rangedTimer >= (e.stats.rangedInterval || RANGED_INTERVAL_DEFAULT)) {
                        e.stats.rangedTimer = 0;
                        this._fireEnemyProjectile(e, dx, dy, 'arrow');
                    }
                } else if (e.stats.role === 'healer' && dist < 150) {
                    e.stats.rangedTimer = (e.stats.rangedTimer || 0) + delta;
                    if (e.stats.rangedTimer >= (e.stats.rangedInterval || RANGED_INTERVAL_DEFAULT)) {
                        e.stats.rangedTimer = 0;
                        this.scene.enemies.getChildren().forEach(ally => {
                            if (ally !== e && ally.active && ally.stats && ally.stats.hp < ally.stats.maxHp) {
                                const ad = Phaser.Math.Distance.Between(e.x, e.y, ally.x, ally.y);
                                if (ad < 100) {
                                    const healAmt = 5;
                                    ally.stats.hp = Math.min(ally.stats.maxHp, ally.stats.hp + healAmt);
                                    if (ally.hpFill) ally.hpFill.width = (ally.hpBg.width) * (ally.stats.hp / ally.stats.maxHp);
                                    this._fireEnemyProjectile(e, ally.x - e.x, ally.y - e.y, 'heal');
                                }
                            }
                        });
                    }
                }
            } else {
                e.body.setVelocity(0);
            }
            e.hpBg.x = e.x;
            e.hpBg.y = e.y - e.stats.bh / 2 - 8;
            e.hpFill.x = e.x;
            e.hpFill.y = e.y - e.stats.bh / 2 - 8;
            if (e.shieldIcon) { e.shieldIcon.x = e.x; e.shieldIcon.y = e.y - e.stats.bh / 2 - 16; }
            if (e.roleIcon) { e.roleIcon.x = e.x; e.roleIcon.y = e.y - e.stats.bh / 2 - 16; }
        });

        this._updateEnemyProjectiles();

        if (activeEnemies === 0 && !s.zones.village.snowyAllCleared) {
            s.zones.village.snowyAllCleared = true;
            s.floatingText(s.villageOffsetX + VILLAGE_WIDTH / 2, 180, 'All winter spirits vanquished!', '#3498db');
            s.time.delayedCall(2000, () => {
                this.scene.zones.snowy._spawnSnowyVillageBoss();
                s.floatingText(s.villageOffsetX + VILLAGE_WIDTH / 2, 200, 'ICE SPIRIT has appeared!', '#ff4444');
            });
        }
    }

    _updateCampfireHints() {
        const s = this.scene;
        if (s.zone === 'village' && s.zones.village.isFrozen && s.campfire && !s.zones.village.bossDefeated) {
            const cd = Phaser.Math.Distance.Between(s.player.x, s.player.y, s.campfire.x, s.campfire.y);
            if (cd < 80) {
                if (s.campfireHint) s.campfireHint.setText('SPACE = activate');
            } else if (s.campfireHint) {
                s.campfireHint.setText('');
            }
        }
        if (s.zone === 'village' && s.zones.village.bossDefeated && s.campfire) {
            const cd = Phaser.Math.Distance.Between(s.player.x, s.player.y, s.campfire.x, s.campfire.y);
            if (cd < 80) {
                if (s.campfireHint) s.campfireHint.setText('SPACE = restore village');
            } else if (s.campfireHint) {
                s.campfireHint.setText('');
            }
        }
        if (s.zone === 'cemetery') {
            if (s.zones.village.bossDefeated && s.hellPortal) {
                const pd = Phaser.Math.Distance.Between(s.player.x, s.player.y, s.hellPortal.x, s.hellPortal.y);
                if (pd < 80) {
                    if (s.hellPortalHint) s.hellPortalHint.setText('SPACE = enter Hell');
                } else if (s.hellPortalHint) {
                    s.hellPortalHint.setText('');
                }
            }
        }
        if (s.zone === 'village' && s.zones.village.isThriving && s.depthsPortal) {
            if (s.depthsPortalHint) s.depthsPortalHint.setPosition(s.depthsPortal.x, s.depthsPortal.y - 40);
            const dpd = Phaser.Math.Distance.Between(s.player.x, s.player.y, s.depthsPortal.x, s.depthsPortal.y);
            if (dpd < 80) {
                if (s.depthsPortalHint) s.depthsPortalHint.setText('SPACE = enter Depths');
            } else if (s.depthsPortalHint) {
                s.depthsPortalHint.setText('');
            }
        }
        if (s.zone === 'village' && s.cursedPortalVillage) {
            if (s.cursedPortalVillageHint) s.cursedPortalVillageHint.setPosition(s.cursedPortalVillage.x, s.cursedPortalVillage.y - 40);
            const cpd = Phaser.Math.Distance.Between(s.player.x, s.player.y, s.cursedPortalVillage.x, s.cursedPortalVillage.y);
            if (cpd < 80) {
                if (s.cursedPortalVillageHint) s.cursedPortalVillageHint.setText('SPACE = enter Cursed Lands');
            } else if (s.cursedPortalVillageHint) {
                s.cursedPortalVillageHint.setText('');
            }
        }
        if (s.zone === 'village' && s.desertPortalVillage) {
            if (s.desertPortalVillageHint) s.desertPortalVillageHint.setPosition(s.desertPortalVillage.x, s.desertPortalVillage.y - 40);
            const dpd = Phaser.Math.Distance.Between(s.player.x, s.player.y, s.desertPortalVillage.x, s.desertPortalVillage.y);
            if (dpd < 80) {
                if (s.desertPortalVillageHint) s.desertPortalVillageHint.setText('SPACE = enter Desert');
            } else if (s.desertPortalVillageHint) {
                s.desertPortalVillageHint.setText('');
            }
        }
    }

    _updateShopInnHints() {
        const s = this.scene;
        if (s.zone === 'village' && !s.zones.village.isFrozen && s.zones.village.isRestored) {
            s.nearbyShop = null;
            s.nearbyInn = null;
            if (s.villageMerchantNPC && s.villageMerchantHint) {
                const md = Phaser.Math.Distance.Between(s.player.x, s.player.y, s.villageMerchantNPC.x, s.villageMerchantNPC.y);
                if (md < 50) {
                    s.nearbyShop = s.villageMerchantNPC;
                    s.villageMerchantHint.setText('SPACE = shop');
                } else {
                    s.villageMerchantHint.setText('');
                }
            }
            if (s.villageInn && s.villageInnHint) {
                const id = Phaser.Math.Distance.Between(s.player.x, s.player.y, s.villageInn.x, s.villageInn.y);
                if (id < 40) {
                    s.nearbyInn = s.villageInn;
                    s.villageInnHint.setText(s.innUsed ? 'Already rested' : 'SPACE = rest');
                } else {
                    s.villageInnHint.setText('');
                }
            }
        }
    }

    _showPrestigeInfo() {
        const s = this.scene;
        if (s.menuOpen) return;
        if (!s.prestigeSys || !s.prestigeSys.canPrestige()) return;
        s.menuOpen = true;
        s.physics.pause();

        const lang = localStorage.getItem('game_lang') || 'en';
        const ox = (GAME_WIDTH - 500) / 2;
        const cx = ox + 250;

        const txts = {
            title: { en: 'PRESTIGE', ru: 'PRESTIGE', de: 'PRESTIGE' },
            subtitle: { en: 'New Game+', ru: 'Новая Игра+', de: 'Neues Spiel+' },
            desc1: { en: 'Restart the game from the beginning with powerful bonuses.', ru: 'Начни игру заново с мощными бонусами.', de: 'Starte das Spiel mit mächtigen Boni neu.' },
            desc2: { en: 'Enemies become 1.5x HP and 1.3x damage per level.', ru: 'Враги получают +50% HP и +30% урона за уровень.', de: 'Gegner bekommen +50% HP und +30% Schaden pro Stufe.' },
            warn: { en: 'This action is IRREVERSIBLE. Your save will reset.', ru: 'Это действие НЕОБРАТИМО. Твой сейв сбросится.', de: 'Diese Handlung ist UNWIDERRUFLICH. Dein Save wird zurückgesetzt.' },
            mods: { en: 'Your Prestige modifiers:', ru: 'Твои Prestige модификаторы:', de: 'Deine Prestige-Modifikatoren:' },
            confirm: { en: '[Y] ACTIVATE PRESTIGE', ru: '[Y] АКТИВИРОВАТЬ PRESTIGE', de: '[Y] PRESTIGE AKTIVIEREN' },
            cancel: { en: '[N] Cancel', ru: '[N] Отмена', de: '[N] Abbrechen' }
        };
        const ts = (key) => txts[key]?.[lang] || txts[key]?.en || '';

        const elements = [];
        const depth = 100;

        const overlay = s.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0.7).setDepth(depth).setScrollFactor(0);
        elements.push(overlay);

        const panel = s.add.rectangle(cx, 320, 460, 400, 0x000000, 0.9).setDepth(depth + 1).setScrollFactor(0);
        elements.push(panel);
        const border = s.add.rectangle(cx, 320, 462, 402).setDepth(depth).setStrokeStyle(2, 0xf1c40f).setScrollFactor(0).setFillStyle();
        elements.push(border);

        const title = s.add.text(cx, 150, ts('title'), {
            fontSize: '28px', fill: '#ffd700', fontFamily: 'Georgia', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 4
        }).setOrigin(0.5).setDepth(depth + 2).setScrollFactor(0);
        elements.push(title);

        const subtitle = s.add.text(cx, 185, ts('subtitle'), {
            fontSize: '16px', fill: '#f1c40f', fontFamily: 'Georgia', fontStyle: 'italic'
        }).setOrigin(0.5).setDepth(depth + 2).setScrollFactor(0);
        elements.push(subtitle);

        const descStyle = { fontSize: '13px', fill: '#ccc', fontFamily: 'Arial', wordWrap: { width: 400 }, align: 'center', lineSpacing: 4 };
        const desc1 = s.add.text(cx, 225, ts('desc1'), descStyle).setOrigin(0.5).setDepth(depth + 2).setScrollFactor(0);
        elements.push(desc1);
        const desc2 = s.add.text(cx, 260, ts('desc2'), descStyle).setOrigin(0.5).setDepth(depth + 2).setScrollFactor(0);
        elements.push(desc2);

        const modsLabel = s.add.text(cx, 295, ts('mods'), {
            fontSize: '13px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5).setDepth(depth + 2).setScrollFactor(0);
        elements.push(modsLabel);

        const modifiers = s.prestigeSys.getModifiers();
        const nextMod = s.prestigeSys.getNextModifier();
        const allMods = nextMod ? [...modifiers, nextMod] : modifiers;
        allMods.forEach((mod, i) => {
            const modName = lang === 'ru' ? (mod.nameRu || mod.name) : lang === 'de' ? (mod.nameDe || mod.name) : mod.name;
            const modDesc = lang === 'ru' ? (mod.descriptionRu || mod.description) : lang === 'de' ? (mod.descriptionDe || mod.description) : mod.description;
            const isNext = nextMod && mod.level === nextMod.level;
            const color = isNext ? '#ffd700' : '#888';
            const prefix = isNext ? '> ' : '  ';
            const modText = s.add.text(cx, 320 + i * 22, prefix + modName + ' — ' + modDesc, {
                fontSize: '12px', fill: color, fontFamily: 'Arial'
            }).setOrigin(0.5).setDepth(depth + 2).setScrollFactor(0);
            elements.push(modText);
        });

        const warn = s.add.text(cx, 410, ts('warn'), {
            fontSize: '12px', fill: '#e74c3c', fontFamily: 'Arial', fontStyle: 'bold',
            wordWrap: { width: 400 }, align: 'center'
        }).setOrigin(0.5).setDepth(depth + 2).setScrollFactor(0);
        elements.push(warn);

        const btnBase = { fontSize: '14px', fill: '#ccc', fontFamily: 'Arial', padding: { x: 16, y: 10 }, backgroundColor: '#2a2a2a' };

        const confirmBtn = s.add.text(cx, 450, ts('confirm'), btnBase)
            .setOrigin(0.5).setDepth(depth + 2).setInteractive({ useHandCursor: true }).setScrollFactor(0);
        elements.push(confirmBtn);

        const cancelBtn = s.add.text(cx, 485, ts('cancel'), btnBase)
            .setOrigin(0.5).setDepth(depth + 2).setInteractive({ useHandCursor: true }).setScrollFactor(0);
        elements.push(cancelBtn);

        const cleanup = () => {
            s.input.keyboard.off('keydown', onKey);
            elements.forEach(el => { if (el && el.destroy) el.destroy(); });
            s.menuOpen = false;
            s.physics.resume();
        };

        confirmBtn.on('pointerover', () => confirmBtn.setStyle({ fill: '#ffd700' }));
        confirmBtn.on('pointerout', () => confirmBtn.setStyle({ fill: '#ccc' }));
        confirmBtn.on('pointerdown', () => {
            cleanup();
            if (s.prestigeSys.activatePrestige()) {
                s.floatingText(s.player.x, s.player.y - 60, 'PRESTIGE ACTIVATED!', '#ffd700');
                s.floatingText(s.player.x, s.player.y - 40, 'Enemies are now stronger!', '#e74c3c');
            }
        });

        cancelBtn.on('pointerover', () => cancelBtn.setStyle({ fill: '#e74c3c' }));
        cancelBtn.on('pointerout', () => cancelBtn.setStyle({ fill: '#ccc' }));
        cancelBtn.on('pointerdown', () => { cleanup(); });

        function onKey(event) {
            if (s.zone !== 'village') { cleanup(); return; }
            if (event.key === 'y' || event.key === 'Y') {
                confirmBtn.emit('pointerdown');
            } else if (event.key === 'n' || event.key === 'N' || event.key === 'Escape') {
                cancelBtn.emit('pointerdown');
            }
        }
        s.input.keyboard.on('keydown', onKey);
    }

    enterCursed() {
        const s = this.scene;
        if (s.transitioning || s.menuOpen) return;
        s.transitioning = true;
        s.cameras.main.fadeOut(800, 10, 26, 10);
        s.time.delayedCall(800, () => {
            s._setupZone('cursed');
            s.cameras.main.fadeIn(500, 10, 26, 10);
            s.transitioning = false;
        });
    }
}
