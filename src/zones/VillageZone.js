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
    BOSS_DROP_CHANCE, GAME_WIDTH, GAME_HEIGHT, RARITY_COLORS, DIFF_COLORS
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
        this.scene.snowyIceSpirit = null;
        this.scene.snowyIceSpiritNameText = null;
        this.scene.snowyIceSpiritAbilities = null;
        this.scene.snowyIceShards = null;
        this.scene.campfire = null;
        this.scene.campfireHint = null;
        this.scene.castleChildNPC = null;
        this.scene.castleChildHint = null;

        if (frozen) {
            this.spawner.spawnSnowyVillageCamps();
            this.spawner.spawnSnowyVillageChests();
            this.spawner.spawnSnowyCampfire();
            this._snowyCheckTimer = this.scene.time.addEvent({
                delay: 1000, loop: true,
                callback: () => this.scene.zones.snowy._checkSnowyVillageProgress()
            });
        } else if (!this.scene.zones.village.isRestored) {
            this.spawner.spawnVillageCamps();
            this.spawner.spawnVillageDecor(false);
            this.spawner.spawnVillageChests();
        } else {
            this.spawner.spawnVillageDecor(false);
            this.spawner.showVillageClearedDecor();
            // Respawn child NPC if village is cleared but not yet restored
            if (this.scene.zones.village.allCleared && !this.scene.zones.village.isRestored) {
                if (!this.scene.villageChildNPC) {
                    this.spawner.spawnChildNPC();
                }
            }
                if (!this.scene.zones.village.isThriving && !this.scene.zones.castle.questDone) {
                this.scene.time.delayedCall(1500, () => {
                    this.spawner.spawnCastleChild();
                });
            }
            this.shop.spawnShop();
            this.shop.spawnInn();
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
        }
        if (!frozen && this.scene.particles) {
            this.scene.particles.startFirefly(VILLAGE_WIDTH, VILLAGE_HEIGHT);
        }
    }

    _destroyZoneSpecific() {
        const s = this.scene;
        if (s.particles) { s.particles.stopEnvironment(); }
        if (s.villageChests && s.villageChests.getLength && s.villageChests.getLength() > 0) {
            s.villageChests.getChildren().forEach(ch => {
                if (ch.hintText) ch.hintText.destroy();
                if (ch.hpBg) ch.hpBg.destroy();
                if (ch.hpFill) ch.hpFill.destroy();
            });
            s.villageChests.clear(true, true);
        }
        if (s.villageChests) { s.villageChests.destroy(); s.villageChests = null; }
        if (s.villageCorpses) { s.villageCorpses.clear(true, true); s.villageCorpses.destroy(); s.villageCorpses = null; }
        if (s.villageZombies && s.villageZombies.getLength && s.villageZombies.getLength() > 0) {
            s.villageZombies.getChildren().forEach(e => {
                if (e.hpBg) e.hpBg.destroy();
                if (e.hpFill) e.hpFill.destroy();
            });
            s.villageZombies.clear(true, true);
        }
        if (s.villageZombies) { s.villageZombies.destroy(); s.villageZombies = null; }
        if (s.villageDecor) {
            s.villageDecor.forEach(d => { if (d && d.destroy) d.destroy(); });
            s.villageDecor = null;
        }
        if (s.villageBg) { s.villageBg.destroy(); s.villageBg = null; }
        if (s.villageChildNPC) { if (s.villageChildNPC.destroy) s.villageChildNPC.destroy(); s.villageChildNPC = null; }
        if (s.villageChildHint) { s.villageChildHint.destroy(); s.villageChildHint = null; }
        if (s.villageBoss) {
            if (s.villageBoss.hpBg) s.villageBoss.hpBg.destroy();
            if (s.villageBoss.hpFill) s.villageBoss.hpFill.destroy();
            if (s.villageBossNameText) s.villageBossNameText.destroy();
            s.villageBoss.destroy();
            s.villageBoss = null;
        }
        this.bossClones = null;
        if (s.villageCemeteryGate) { s.villageCemeteryGate.destroy(); s.villageCemeteryGate = null; }
        if (s.hellPortal) { if (s.hellPortal.destroy) s.hellPortal.destroy(); s.hellPortal = null; }
        if (s.hellPortalHint) { if (s.hellPortalHint.destroy) s.hellPortalHint.destroy(); s.hellPortalHint = null; }
        if (s.campfire) { if (s.campfire.destroy) s.campfire.destroy(); s.campfire = null; }
        if (s.campfireHint) { if (s.campfireHint.destroy) s.campfireHint.destroy(); s.campfireHint = null; }
        if (s.castleChildNPC) { if (s.castleChildNPC.destroy) s.castleChildNPC.destroy(); s.castleChildNPC = null; }
        if (s.castleChildHint) { if (s.castleChildHint.destroy) s.castleChildHint.destroy(); s.castleChildHint = null; }
        if (s.villageMerchantNPC) { if (s.villageMerchantNPC.destroy) s.villageMerchantNPC.destroy(); s.villageMerchantNPC = null; }
        if (s.villageMerchantHint) { if (s.villageMerchantHint.destroy) s.villageMerchantHint.destroy(); s.villageMerchantHint = null; }
        if (s.villageInn) { if (s.villageInn.destroy) s.villageInn.destroy(); s.villageInn = null; }
        if (s.villageInnHint) { if (s.villageInnHint.destroy) s.villageInnHint.destroy(); s.villageInnHint = null; }
        if (s.shopGroup) { s.shopGroup.forEach(e => { if (e && e.destroy) e.destroy(); }); s.shopGroup = []; }
        if (s.snowyIceSpirit) {
            if (s.snowyIceSpirit.hpBg) s.snowyIceSpirit.hpBg.destroy();
            if (s.snowyIceSpirit.hpFill) s.snowyIceSpirit.hpFill.destroy();
            if (s.snowyIceSpiritNameText) s.snowyIceSpiritNameText.destroy();
            s.snowyIceSpirit.destroy();
            s.snowyIceSpirit = null;
        }
        if (s.snowyIceShards) {
            s.snowyIceShards.getChildren().forEach(s => {
                if (s.hpBg) s.hpBg.destroy();
                if (s.hpFill) s.hpFill.destroy();
            });
            s.snowyIceShards.clear(true, true);
            s.snowyIceShards.destroy();
            s.snowyIceShards = null;
        }
        s.zones.village.snowyAllCleared = false;
        s.zones.village.snowyBossDefeated = false;
        this.isFrozen = false;
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
        } else if (s.nearbyNpc) {
            s.npc.interactWithNpc();
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
                this.scene.floatingText(this.scene.villageOffsetX + VILLAGE_WIDTH / 2, 200, 'The village is restored!', '#ff6600');
            if (!this.scene.zones.village.isThriving && !this.scene.zones.castle.questDone) {
                    this.scene.time.delayedCall(2000, () => {
                        this.spawner.spawnCastleChild();
                    });
                }
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
        if (this.scene.castleChildNPC) { this.scene.castleChildNPC.destroy(); this.scene.castleChildNPC = null; }
        if (this.scene.castleChildHint) { this.scene.castleChildHint.destroy(); this.scene.castleChildHint = null; }

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

        this.scene.time.delayedCall(4500, () => {
            this._startCastleSkip();
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
            const dotTimer = this.scene.time.addEvent({
                delay: 800, repeat: dots.length - 1,
                callback: () => {
                    dotIdx++;
                    if (dotIdx < dots.length) cartText.setText(dots[dotIdx]);
                }
            });

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
                    if (e.stats.rangedTimer >= (e.stats.rangedInterval || 1800)) {
                        e.stats.rangedTimer = 0;
                        this._fireEnemyProjectile(e, dx, dy, 'arrow');
                    }
                } else if (e.stats.role === 'healer' && dist < 150) {
                    e.stats.rangedTimer = (e.stats.rangedTimer || 0) + delta;
                    if (e.stats.rangedTimer >= (e.stats.rangedInterval || 2500)) {
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
}
