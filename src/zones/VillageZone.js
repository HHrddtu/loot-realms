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
    BOSS_DROP_CHANCE, GAME_WIDTH, GAME_HEIGHT, RARITY_COLORS
} from '../config/index.js';
import { CONSUMABLES } from '../config/gold.js';
import { rollBossCrystals } from '../config/pets.js';
import { rollVillageEquip, rollEquip, rollVillageAccountEquip, rollAccountEquip } from '../utils.js';
import {
    playLoot, playBossAoE, playBossDeath, playPortal, playBreak, startMusic
} from '../sound.js';
import { recordKill } from '../bestiary.js';
import { onKill } from '../quests.js';
import { recordSoulCollect } from '../soulBook.js';

export class VillageZone {
    constructor(scene) {
        this.scene = scene;
    }

    setup(frozen = false) {
        this.scene._destroyOrphanedCaveStairs();
        const ox = (GAME_WIDTH - VILLAGE_WIDTH) / 2;
        this.scene.villageFrozen = frozen;
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
        this.scene.villageAllCleared = false;
        this.scene.childSpawned = false;
        this.scene.villageBossAlive = false;
        this.scene.villageBossDefeated = false;
        this.scene.villageBossSpawned = false;
        this.scene.snowyVillageAllCleared = false;
        this.scene.snowyIceSpirit = null;
        this.scene.snowyIceSpiritNameText = null;
        this.scene.snowyIceSpiritAbilities = null;
        this.scene.snowyIceShards = null;
        this.scene.campfire = null;
        this.scene.campfireHint = null;
        this.scene.castleChildNPC = null;
        this.scene.castleChildHint = null;

        if (frozen) {
            this._spawnSnowyVillageCamps();
            this._spawnSnowyVillageChests();
            this._spawnSnowyCampfire();
        } else if (!this.scene.villageRestored) {
            this._spawnVillageCamps();
            this._spawnVillageDecor();
            this._spawnVillageChests();
        } else {
            this._spawnVillageDecor();
            this._showVillageClearedDecor();
            if (!this.scene.villageThriving && !this.scene.castleQuestDone) {
                this.scene.time.delayedCall(1500, () => {
                    this._spawnCastleChild();
                });
            }
            this._spawnVillageShop();
            this._spawnVillageInn();
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
        startMusic();
        if (frozen && this.scene.particles) {
            this.scene.particles.startSnowfall(VILLAGE_WIDTH, VILLAGE_TOTAL_HEIGHT);
        }
        if (!frozen && this.scene.particles) {
            this.scene.particles.startFirefly(VILLAGE_WIDTH, VILLAGE_HEIGHT);
        }
    }

    clear() {
        this.scene.physics.world.colliders.destroy();
        if (this.scene.fireballs) {
            this.scene.fireballs.forEach(fb => { if (fb.glow) fb.glow.destroy(); fb.destroy(); });
            this.scene.fireballs = [];
        }
        if (this.scene.enemyProjectiles) {
            this.scene.enemyProjectiles.forEach(p => { if (p && p.destroy) p.destroy(); });
            this.scene.enemyProjectiles = [];
        }
        if (this.scene.particles) {
            this.scene.particles.stopEnvironment();
        }
        if (this.scene.shieldActive) {
            this.scene.shieldActive = false;
            this.scene.shieldHP = 0;
            if (this.scene.shieldVfx) { this.scene.shieldVfx.destroy(); this.scene.shieldVfx = null; }
        }
        if (this.scene.enemies && this.scene.enemies.getLength && this.scene.enemies.getLength() > 0) {
            this.scene.enemies.getChildren().forEach(e => {
                if (e.hpBg) e.hpBg.destroy();
                if (e.hpFill) e.hpFill.destroy();
                if (e.nameText) e.nameText.destroy();
            });
            this.scene.enemies.clear(true, true);
        }
        if (this.scene.enemies) { this.scene.enemies.destroy(); this.scene.enemies = null; }
        if (this.scene.villageChests && this.scene.villageChests.getLength && this.scene.villageChests.getLength() > 0) {
            this.scene.villageChests.getChildren().forEach(ch => {
                if (ch.hintText) ch.hintText.destroy();
                if (ch.hpBg) ch.hpBg.destroy();
                if (ch.hpFill) ch.hpFill.destroy();
            });
            this.scene.villageChests.clear(true, true);
        }
        if (this.scene.villageChests) { this.scene.villageChests.destroy(); this.scene.villageChests = null; }
        if (this.scene.villageCorpses) { this.scene.villageCorpses.clear(true, true); this.scene.villageCorpses.destroy(); this.scene.villageCorpses = null; }
        if (this.scene.villageZombies && this.scene.villageZombies.getLength && this.scene.villageZombies.getLength() > 0) {
            this.scene.villageZombies.getChildren().forEach(e => {
                if (e.hpBg) e.hpBg.destroy();
                if (e.hpFill) e.hpFill.destroy();
            });
            this.scene.villageZombies.clear(true, true);
        }
        if (this.scene.villageZombies) { this.scene.villageZombies.destroy(); this.scene.villageZombies = null; }
        if (this.scene.villageDecor) {
            this.scene.villageDecor.forEach(d => { if (d && d.destroy) d.destroy(); });
            this.scene.villageDecor = null;
        }
        if (this.scene.villageBg) { this.scene.villageBg.destroy(); this.scene.villageBg = null; }
        if (this.scene.villageChildNPC) { if (this.scene.villageChildNPC.destroy) this.scene.villageChildNPC.destroy(); this.scene.villageChildNPC = null; }
        if (this.scene.villageChildHint) { this.scene.villageChildHint.destroy(); this.scene.villageChildHint = null; }
        if (this.scene.villageBoss) {
            if (this.scene.villageBoss.hpBg) this.scene.villageBoss.hpBg.destroy();
            if (this.scene.villageBoss.hpFill) this.scene.villageBoss.hpFill.destroy();
            if (this.scene.villageBossNameText) this.scene.villageBossNameText.destroy();
            this.scene.villageBoss.destroy();
            this.scene.villageBoss = null;
        }
        this.scene.villageBossClones = null;
        if (this.scene.villageCemeteryGate) { this.scene.villageCemeteryGate.destroy(); this.scene.villageCemeteryGate = null; }
        if (this.scene.hellPortal) { if (this.scene.hellPortal.destroy) this.scene.hellPortal.destroy(); this.scene.hellPortal = null; }
        if (this.scene.hellPortalHint) { if (this.scene.hellPortalHint.destroy) this.scene.hellPortalHint.destroy(); this.scene.hellPortalHint = null; }
        if (this.scene.campfire) { if (this.scene.campfire.destroy) this.scene.campfire.destroy(); this.scene.campfire = null; }
        if (this.scene.campfireHint) { if (this.scene.campfireHint.destroy) this.scene.campfireHint.destroy(); this.scene.campfireHint = null; }
        if (this.scene.castleChildNPC) { if (this.scene.castleChildNPC.destroy) this.scene.castleChildNPC.destroy(); this.scene.castleChildNPC = null; }
        if (this.scene.castleChildHint) { if (this.scene.castleChildHint.destroy) this.scene.castleChildHint.destroy(); this.scene.castleChildHint = null; }
        if (this.scene.villageMerchantNPC) { if (this.scene.villageMerchantNPC.destroy) this.scene.villageMerchantNPC.destroy(); this.scene.villageMerchantNPC = null; }
        if (this.scene.villageMerchantHint) { if (this.scene.villageMerchantHint.destroy) this.scene.villageMerchantHint.destroy(); this.scene.villageMerchantHint = null; }
        if (this.scene.villageInn) { if (this.scene.villageInn.destroy) this.scene.villageInn.destroy(); this.scene.villageInn = null; }
        if (this.scene.villageInnHint) { if (this.scene.villageInnHint.destroy) this.scene.villageInnHint.destroy(); this.scene.villageInnHint = null; }
        if (this.scene.shopGroup) { this.scene.shopGroup.forEach(e => { if (e && e.destroy) e.destroy(); }); this.scene.shopGroup = []; }
        if (this.scene.snowyIceSpirit) {
            if (this.scene.snowyIceSpirit.hpBg) this.scene.snowyIceSpirit.hpBg.destroy();
            if (this.scene.snowyIceSpirit.hpFill) this.scene.snowyIceSpirit.hpFill.destroy();
            if (this.scene.snowyIceSpiritNameText) this.scene.snowyIceSpiritNameText.destroy();
            this.scene.snowyIceSpirit.destroy();
            this.scene.snowyIceSpirit = null;
        }
        if (this.scene.snowyIceShards) {
            this.scene.snowyIceShards.getChildren().forEach(s => {
                if (s.hpBg) s.hpBg.destroy();
                if (s.hpFill) s.hpFill.destroy();
            });
            this.scene.snowyIceShards.clear(true, true);
            this.scene.snowyIceShards.destroy();
            this.scene.snowyIceShards = null;
        }
        this.scene.snowyVillageAllCleared = false;
        this.scene.villageFrozen = false;
        if (this.scene.defeatedText) { this.scene.defeatedText.destroy(); this.scene.defeatedText = null; }
        if (this.scene.defeatedLoot) {
            this.scene.defeatedLoot.forEach(t => { if (t && t.destroy) t.destroy(); });
            this.scene.defeatedLoot = null;
        }
    }

    update(time, delta) {
        this._updateVillageMobs();
        this._updateSnowyVillageMobs();
        this._updateVillageBoss();
        this._updateSnowyVillageBoss();
        this._checkVillageProgress();
        this._checkSnowyVillageProgress();
        this._updateCastleChildHint();
    }

    _spawnVillageShop() {
        if (this.scene.villageMerchantNPC) return;
        const ox = this.scene.villageOffsetX;
        const house = VILLAGE_HOUSE_POSITIONS[2] || VILLAGE_HOUSE_POSITIONS[0];
        const x = ox + house.x + 40;
        const y = house.y + 30;

        this.scene.villageMerchantNPC = this.scene.add.sprite(x, y, 'villager_merchant').setDepth(6);
        this.scene.villageMerchantHint = this.scene.add.text(x, y - 20, '', {
            fontSize: '11px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(12);

        this.scene.tweens.add({
            targets: this.scene.villageMerchantNPC,
            y: y - 3, duration: 1500, yoyo: true, repeat: -1, ease: 'Sine.easeInOut'
        });

        this.scene.time.delayedCall(1000, () => {
            if (this.scene.villageMerchantHint && this.scene.villageMerchantHint.active) {
                this.scene.villageMerchantHint.setText('SPACE = shop');
            }
        });
    }

    _spawnVillageInn() {
        if (this.scene.villageInn) return;
        const ox = this.scene.villageOffsetX;
        const house = VILLAGE_HOUSE_POSITIONS[3] || VILLAGE_HOUSE_POSITIONS[1];
        const x = ox + house.x;
        const y = house.y + 25;

        this.scene.villageInn = this.scene.add.image(x, y, 'village_bed').setDepth(4);
        this.scene.physics.add.existing(this.scene.villageInn, true);
        this.scene.villageInn.body.setSize(32, 20);

        this.scene.villageInnHint = this.scene.add.text(x, y - 18, '', {
            fontSize: '10px', fill: '#2ecc71', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(12);
    }

    _useInn() {
        if (this.scene.innUsed) {
            if (this.scene.villageInnHint) this.scene.villageInnHint.setText('Already rested!');
            return;
        }
        this.scene.innUsed = true;
        this.scene.playerHP = this.scene.playerMaxHP;
        this.scene.floatingText(this.scene.player.x, this.scene.player.y - 30, 'Fully healed!', '#2ecc71');
        if (this.scene.villageInnHint) this.scene.villageInnHint.setText('Rest (+50 EXP)');
        this.scene.playerExp += 50;
        this.scene.checkLevelUp();
    }

    _openShop() {
        if (this.scene.menuOpen) return;
        this.scene.menuOpen = true;
        this.scene.physics.pause();
        if (this.scene.enemies) this.scene.enemies.getChildren().forEach(e => { if (e.body) e.body.setVelocity(0); });
        this.scene.shopGroup = [];
        const mk = (el) => { el.setScrollFactor(0).setDepth(200); return el; };

        const W = 400, H = 380;
        this.scene.shopGroup.push(mk(this.scene.add.rectangle(400, 300, W, H, 0x0a0a1a, 0.95).setStrokeStyle(2, 0xf1c40f)));
        this.scene.shopGroup.push(mk(this.scene.add.text(400, 130, 'VILLAGE MERCHANT', {
            fontSize: '18px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5)));
        this.scene.shopGroup.push(mk(this.scene.add.text(400, 150, 'Gold: ' + (this.scene.gold || 0), {
            fontSize: '12px', fill: '#f1c40f', fontFamily: 'Arial'
        }).setOrigin(0.5)));

        const items = CONSUMABLES.slice();
        const cols = 3, slotSize = 50, gap = 10;
        const startX = 400 - (cols * (slotSize + gap)) / 2 + slotSize / 2;
        const startY = 190;

        items.forEach((item, i) => {
            const col = i % cols;
            const row = Math.floor(i / cols);
            const sx = startX + col * (slotSize + gap);
            const sy = startY + row * (slotSize + gap + 16);

            const bg = mk(this.scene.add.rectangle(sx, sy, slotSize, slotSize, 0x1a1a2e).setStrokeStyle(1, 0x444));
            this.scene.shopGroup.push(bg);
            this.scene.shopGroup.push(mk(this.scene.add.sprite(sx, sy - 4, item.texKey).setScale(1.5)));

            const rc = '#' + (RARITY_COLORS[item.rarity] || 0xaaaaaa).toString(16).padStart(6, '0');
            this.scene.shopGroup.push(mk(this.scene.add.text(sx, sy + slotSize / 2 - 4, item.name.split(' ').slice(0, 2).join(' '), {
                fontSize: '7px', fill: rc, fontFamily: 'Arial'
            }).setOrigin(0.5)));

            this.scene.shopGroup.push(mk(this.scene.add.text(sx, sy + slotSize / 2 + 8, item.price + 'g', {
                fontSize: '9px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold'
            }).setOrigin(0.5)));

            bg.setInteractive({ useHandCursor: true });
            bg.on('pointerover', () => { bg.setScale(1.1); this.scene._showItemTooltip(sx + 35, sy, item); });
            bg.on('pointerout', () => { bg.setScale(1); this.scene._hideItemTooltip(); });
            bg.on('pointerdown', () => {
                if ((this.scene.gold || 0) >= item.price) {
                    this.scene.gold -= item.price;
                    const consumableItem = { ...item, type: 'consumable' };
                    this.scene.consumable = consumableItem;
                    this.scene.floatingText(this.scene.player.x, this.scene.player.y - 30, '+' + item.name, '#2ecc71');
                    this._closeShop();
                    this._openShop();
                } else {
                    this.scene.floatingText(this.scene.player.x, this.scene.player.y - 30, 'Not enough gold!', '#e74c3c');
                }
            });
        });

        const closeBg = mk(this.scene.add.rectangle(400, 480, 100, 24, 0x34495e)
            .setStrokeStyle(1, 0x5a6c7d).setInteractive({ useHandCursor: true }));
        const closeTxt = mk(this.scene.add.text(400, 480, 'CLOSE', {
            fontSize: '12px', fill: '#fff', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5));
        closeBg.on('pointerdown', () => this._closeShop());
        this.scene.shopGroup.push(closeBg, closeTxt);
    }

    _closeShop() {
        this.scene._hideItemTooltip();
        if (this.scene.shopGroup) {
            this.scene.shopGroup.forEach(e => e.destroy());
            this.scene.shopGroup = [];
        }
        this.scene.menuOpen = false;
        this.scene.physics.resume();
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

    _spawnVillageCamps() {
        const ox = this.scene.villageOffsetX;
        const roleOrder = ['tank', 'assassin', 'archer', 'healer'];
        for (let i = 0; i < VILLAGE_CAMP_COUNT; i++) {
            const cp = VILLAGE_CAMP_POSITIONS[i];
            for (let j = 0; j < VILLAGE_MOBS_PER_CAMP; j++) {
                const role = roleOrder[j];
                const t = VILLAGE_ENEMY_TYPES[role];
                const angle = (j / VILLAGE_MOBS_PER_CAMP) * Math.PI * 2;
                const ex = ox + cp.x + Math.cos(angle) * 30;
                const ey = cp.y + Math.sin(angle) * 25;
                this._makeVillageEnemy(t, ex, ey, i);
            }
        }
    }

    _makeVillageEnemy(t, x, y, campIndex) {
        const walkTex = t.key + '_walk';
        const animKey = t.key + '_walk_anim';
        const e = this.scene.add.sprite(x, y, walkTex).setDepth(5);
        this.scene.physics.add.existing(e, false);
        e.body.setSize(t.bw, t.bh);
        e.body.setCollideWorldBounds(true);
        if (this.scene.anims.exists(animKey)) e.play(animKey);

        const rangedInterval = t.role === 'archer' ? 1800 : t.role === 'healer' ? 2500 : 2000;
        e.stats = {
            key: t.key, name: t.name,
            hp: Math.floor(t.hp * this.scene.diffMulti.hp),
            maxHp: Math.floor(t.hp * this.scene.diffMulti.hp),
            damage: Math.floor(t.dmg * this.scene.diffMulti.dmg),
            exp: Math.floor(t.exp * this.scene.diffMulti.exp),
            bw: t.bw, bh: t.bh, role: t.role,
            campIndex: campIndex,
            wTimer: 0, wDir: 0,
            rangedTimer: 0, rangedInterval
        };

        const hw = t.bw + 4;
        e.hpBg = this.scene.add.rectangle(x, y - t.bh / 2 - 8, hw, 3, 0x333333).setOrigin(0.5).setDepth(11);
        e.hpFill = this.scene.add.rectangle(x, y - t.bh / 2 - 8, hw, 3, 0xe74c3c).setOrigin(0.5).setDepth(11);
        this.scene.enemies.add(e);
        return e;
    }

    _spawnVillageDecor() {
        const ox = this.scene.villageOffsetX;
        this.scene.villageDecor = [];

        VILLAGE_HOUSE_POSITIONS.forEach(hp => {
            const h = this.scene.add.image(ox + hp.x, hp.y, 'village_house').setDepth(2);
            this.scene.villageDecor.push(h);
        });

        const ch = this.scene.add.image(ox + VILLAGE_CHILD_HOUSE.x, VILLAGE_CHILD_HOUSE.y, 'village_house').setDepth(2);
        this.scene.villageDecor.push(ch);

        VILLAGE_CORPSE_POSITIONS.forEach(cp => {
            const c = this.scene.add.image(ox + cp.x, cp.y, 'village_corpse').setDepth(1).setAlpha(0.8);
            this.scene.villageDecor.push(c);
        });

        VILLAGE_GARDEN_POSITIONS.forEach(gp => {
            const g = this.scene.add.image(ox + gp.x, gp.y, 'village_garden').setDepth(1);
            this.scene.villageDecor.push(g);
        });

        for (let y = 1980; y < 2010; y += 12) {
            const f = this.scene.add.image(ox + 100, y, 'village_fence').setDepth(1);
            this.scene.villageDecor.push(f);
            const f2 = this.scene.add.image(ox + 600, y, 'village_fence').setDepth(1);
            this.scene.villageDecor.push(f2);
        }
        this.scene.villageCemeteryGate = this.scene.add.rectangle(ox + VILLAGE_WIDTH / 2, 2000, 60, 12, 0x8a30a0, 0.35).setDepth(2);

        this.scene._villageClearedDecor = false;
    }

    _showVillageClearedDecor() {
        if (this.scene._villageClearedDecor) return;
        this.scene._villageClearedDecor = true;
        const ox = this.scene.villageOffsetX;
        VILLAGE_CORPSE_POSITIONS.forEach(cp => {
            const c = this.scene.add.image(ox + cp.x, cp.y, 'village_corpse').setDepth(1).setAlpha(0.4).setTint(0x555555);
            this.scene.villageDecor.push(c);
        });
    }

    _spawnVillageChests() {
        const ox = this.scene.villageOffsetX;
        const count = VILLAGE_CHEST_COUNT_MIN + Math.floor(Math.random() * (VILLAGE_CHEST_COUNT_MAX - VILLAGE_CHEST_COUNT_MIN + 1));
        for (let i = 0; i < count; i++) {
            const cy = 100 + Math.random() * (VILLAGE_HEIGHT - 200);
            const cx = ox + 50 + Math.random() * (VILLAGE_WIDTH - 100);
            this._createVillageChest(cx, cy);
        }
    }

    _createVillageChest(x, y) {
        const ch = this.scene.add.sprite(x, y, VILLAGE_CHEST_CLOSED_KEY).setDepth(6);
        this.scene.physics.add.existing(ch, false);
        ch.body.setSize(VILLAGE_CHEST_W, VILLAGE_CHEST_H);
        ch.body.setCollideWorldBounds(true);
        ch.stats = { hp: 60, maxHp: 60 };
        ch.hpBg = this.scene.add.rectangle(x, y - 16, VILLAGE_CHEST_W + 4, 3, 0x333333).setOrigin(0.5).setDepth(11);
        ch.hpFill = this.scene.add.rectangle(x, y - 16, VILLAGE_CHEST_W + 4, 3, 0xf39c12).setOrigin(0.5).setDepth(11);
        ch.loot = [];
        const count = 1 + Math.floor(Math.random() * 2);
        for (let i = 0; i < count; i++) {
            if (Math.random() < VILLAGE_CHEST_DROP_CHANCE) {
                ch.loot.push(rollVillageEquip());
            }
        }
        if (Math.random() < VILLAGE_CHEST_EQUIP_DROP_CHANCE) {
            ch.loot.push(rollEquip());
        }
        ch.hintText = this.scene.add.text(x, y - 20, '', {
            fontSize: '10px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(12);
        ch.broken = false;
        this.scene.villageChests.add(ch);
        return ch;
    }

    _activateCampfire() {
        if (!this.scene.villageFrozen || !this.scene.campfire) return;
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
            this.scene.villageRestored = true;
            this.clear();
            this.setup(false);
            this.scene.cameras.main.fadeIn(1000, 255, 200, 100);
            this.scene.transitioning = false;

            this.scene.time.delayedCall(500, () => {
                this.scene.floatingText(this.scene.villageOffsetX + VILLAGE_WIDTH / 2, 200, 'The village is restored!', '#ff6600');
                if (!this.scene.villageThriving && !this.scene.castleQuestDone) {
                    this.scene.time.delayedCall(2000, () => {
                        this._spawnCastleChild();
                    });
                }
            });
        });
    }

    _spawnCastleChild() {
        if (this.scene.castleChildNPC) return;
        const ox = this.scene.villageOffsetX;
        const house = VILLAGE_HOUSE_POSITIONS[1];
        const x = ox + house.x + 35;
        const y = house.y + 10;

        this.scene.castleChildNPC = this.scene.add.sprite(x, y, 'child_npc').setDepth(6);
        this.scene.castleChildHint = this.scene.add.text(x, y - 20, '', {
            fontSize: '11px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(12);

        this.scene.tweens.add({
            targets: this.scene.castleChildNPC,
            y: y - 3, duration: 1500, yoyo: true, repeat: -1, ease: 'Sine.easeInOut'
        });

        this.scene.time.delayedCall(1000, () => {
            if (this.scene.castleChildHint && this.scene.castleChildHint.active) {
                this.scene.castleChildHint.setText('SPACE to talk');
            }
        });
    }

    _talkToCastleChild() {
        if (!this.scene.castleChildNPC || !this.scene.castleChildHint) return;
        const dist = Phaser.Math.Distance.Between(
            this.scene.player.x, this.scene.player.y, this.scene.castleChildNPC.x, this.scene.castleChildNPC.y
        );
        if (dist >= 50) return;

        this.scene.castleChildHint.setText('');

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
                    this.scene.zones.castle.setup(0);
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

        this.scene.enemies.getChildren().forEach(e => {
            if (!e.active || !e.stats) return;

            const dx = this.scene.player.x - e.x;
            const dy = this.scene.player.y - e.y;
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
                const dx = this.scene.player.x - e.x;
                const dy = this.scene.player.y - e.y;
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
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const speed = type === 'arrow' ? 180 : type === 'heal' ? 120 : 150;
        const texKey = type === 'arrow' ? 'enemy_arrow' : type === 'heal' ? 'enemy_heal' : 'enemy_magic';

        const proj = this.scene.add.sprite(e.x, e.y, texKey).setDepth(15);
        this.scene.physics.add.existing(proj);
        proj.body.setVelocity((dx / dist) * speed, (dy / dist) * speed);
        proj.damage = e.stats.damage;
        proj.lifespan = 2000;
        proj.isHeal = (type === 'heal');
        this.scene.enemyProjectiles.push(proj);
    }

    _updateEnemyProjectiles() {
        for (let i = this.scene.enemyProjectiles.length - 1; i >= 0; i--) {
            const p = this.scene.enemyProjectiles[i];
            if (!p.active) { this.scene.enemyProjectiles.splice(i, 1); continue; }

            p.lifespan -= this.scene.game.loop.delta;
            if (p.lifespan <= 0) { p.destroy(); this.scene.enemyProjectiles.splice(i, 1); continue; }

            if (!p.isHeal) {
                const dist = Phaser.Math.Distance.Between(p.x, p.y, this.scene.player.x, this.scene.player.y);
                if (dist < 16) {
                    this.scene.combat.takeDamage(p.damage);
                    p.destroy();
                    this.scene.enemyProjectiles.splice(i, 1);
                }
            }
        }
    }

    _checkVillageProgress() {
        if (this.scene.zone !== 'village' || this.scene.villageFrozen || this.scene.villageAllCleared) return;
        if (!this.scene.enemies || this.scene.enemies.getLength() === 0) {
            this.scene.villageAllCleared = true;
            this._spawnChildNPC();
            this._showVillageClearedDecor();
        }
    }

    _spawnChildNPC() {
        if (this.scene.childSpawned) return;
        this.scene.childSpawned = true;
        const ox = this.scene.villageOffsetX;
        const x = ox + VILLAGE_CHILD_HOUSE.x + 35;
        const y = VILLAGE_CHILD_HOUSE.y + 10;

        this.scene.villageChildNPC = this.scene.add.sprite(x, y, 'child_npc').setDepth(6);
        this.scene.villageChildHint = this.scene.add.text(x, y - 20, '', {
            fontSize: '11px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(12);

        this.scene.tweens.add({
            targets: this.scene.villageChildNPC,
            y: y - 3, duration: 1500, yoyo: true, repeat: -1, ease: 'Sine.easeInOut'
        });

        this.scene.time.delayedCall(1000, () => {
            if (this.scene.villageChildHint && this.scene.villageChildHint.active) {
                this.scene.villageChildHint.setText('SPACE to talk');
            }
        });
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

        this.scene.time.delayedCall(4000, () => {
            if (this.scene.villageChildNPC && this.scene.villageChildNPC.active) {
                this.scene.villageChildNPC.destroy();
                this.scene.villageChildNPC = null;
            }
        });
    }

    _enterCemetery() {
        if (this.scene.transitioning || this.scene.menuOpen) return;
        if (this.scene.zone !== 'village' || !this.scene.villageAllCleared) return;
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
        this.scene.villageBossClones = null;
        this.scene.villageBossAlive = false;
        this.scene.villageBossDefeated = false;
        this.scene.villageBossSpawned = false;

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
        this.scene.hintText.setText('SPACE=attack | I=inventory | TAB=stats | T=talents | C=craft | Q=quests | P=pause');

        if (this.scene.particles) {
            this.scene.particles.startCaveDrip(VILLAGE_WIDTH, CEMETERY_HEIGHT);
        }

        this.scene.time.delayedCall(1200, () => {
            if (this.scene.zone === 'cemetery' && !this.scene.villageBossSpawned && !this.scene.villageBossDefeated) {
                this._spawnVillageBoss();
            }
        });
    }

    _spawnVillageBoss() {
        if (this.scene.villageBossSpawned) return;
        try {
            const bt = VILLAGE_BOSS_TYPE;
            const hp = Math.floor(bt.hp[this.scene.difficulty] || bt.hp.Normal);
            const dmg = Math.floor(bt.dmg[this.scene.difficulty] || bt.dmg.Normal);
            const exp = Math.floor(bt.exp[this.scene.difficulty] || bt.exp.Normal);
            const spd = bt.speeds[this.scene.difficulty] || bt.speeds.Normal;
            const ox = this.scene.villageOffsetX;

            this.scene.villageBossSpawned = true;
            this.scene.villageBossAlive = true;

            this.scene.villageBoss = this.scene.add.sprite(ox + VILLAGE_WIDTH / 2, CEMETERY_HEIGHT - 80, 'purple_demon_walk').setDepth(5);
            this.scene.physics.add.existing(this.scene.villageBoss, false);
            this.scene.villageBoss.body.setSize(bt.bw, bt.bh);
            this.scene.villageBoss.body.setCollideWorldBounds(true);
            if (this.scene.anims.exists('purple_demon_walk_anim')) this.scene.villageBoss.play('purple_demon_walk_anim');

            this.scene.villageBoss.stats = {
                name: bt.name, hp: hp, maxHp: hp,
                damage: dmg, exp: exp, speed: spd,
                bw: bt.bw, bh: bt.bh,
                meteorTimer: 0, meteorInterval: bt.meteorInterval,
                meteorRadius: bt.meteorRadius, meteorDmgMul: bt.meteorDmgMul,
                corpseTimer: 0, corpseInterval: bt.corpseInterval,
                corpseCount: bt.corpseCount,
                splitThreshold: bt.splitThreshold,
                splitDone: false
            };

            const hw = bt.bw + 20;
            this.scene.villageBoss.hpBg = this.scene.add.rectangle(ox + VILLAGE_WIDTH / 2, 100, hw, 5, 0x333333).setOrigin(0.5).setDepth(15).setScrollFactor(0);
            this.scene.villageBoss.hpFill = this.scene.add.rectangle(ox + VILLAGE_WIDTH / 2, 100, hw, 5, 0x8a30a0).setOrigin(0.5).setDepth(15).setScrollFactor(0);
            this.scene.villageBossNameText = this.scene.add.text(ox + VILLAGE_WIDTH / 2, 85, bt.name, {
                fontSize: '12px', fill: '#bf77f6', fontFamily: 'Arial', fontStyle: 'bold',
                stroke: '#000', strokeThickness: 2
            }).setOrigin(0.5).setDepth(15).setScrollFactor(0);

            if (this.scene.enemies) this.scene.enemies.add(this.scene.villageBoss);

            try { playBossAoE(); } catch(e) {}
            this.scene.floatingText(ox + VILLAGE_WIDTH / 2, CEMETERY_HEIGHT / 2, 'PURPLE DEMON AWAKENS!', '#8a30a0');
        } catch(e) {
            console.error('[Cemetery] Boss spawn error:', e);
            this.scene.villageBossSpawned = false;
            this.scene.villageBossAlive = false;
        }
    }

    _updateVillageBoss() {
        if (!this.scene.villageBossAlive || !this.scene.villageBoss || !this.scene.villageBoss.active) return;
        const b = this.scene.villageBoss;
        const s = b.stats;
        const ox = this.scene.villageOffsetX;

        b.hpBg.x = ox + VILLAGE_WIDTH / 2;
        b.hpBg.y = 100;
        b.hpFill.x = ox + VILLAGE_WIDTH / 2;
        b.hpFill.y = 100;

        if (this.scene.menuOpen || this.scene.transitioning) {
            b.body.setVelocity(0);
            return;
        }

        const dx = this.scene.player.x - b.x;
        const dy = this.scene.player.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 16) {
            const chaseSpeed = dist < 80 ? s.speed * 1.4 : s.speed;
            b.body.setVelocity((dx / dist) * chaseSpeed, (dy / dist) * chaseSpeed);
            b.setFlipX(dx < 0);
        } else {
            b.body.setVelocity(0);
        }

        s.meteorTimer += this.scene.game.loop.delta;
        if (s.meteorTimer >= s.meteorInterval) {
            s.meteorTimer = 0;
            this._villageBossMeteor(b);
        }

        s.corpseTimer += this.scene.game.loop.delta;
        if (s.corpseTimer >= s.corpseInterval) {
            s.corpseTimer = 0;
            this._villageBossSummonCorpses(b);
        }

        if (!s.splitDone && s.hp / s.maxHp <= s.splitThreshold) {
            s.splitDone = true;
            this._villageBossSplit(b);
        }
    }

    _villageBossMeteor(boss) {
        const ox = this.scene.villageOffsetX;
        const dmg = Math.floor(boss.stats.damage * boss.stats.meteorDmgMul);
        playBossAoE();

        const meteorCount = 3;
        for (let i = 0; i < meteorCount; i++) {
            const mx = ox + 80 + Math.random() * (VILLAGE_WIDTH - 160);
            const my = this.scene.player.y - 20 + Math.random() * 40;

            const warning = this.scene.add.circle(mx, my, 15, 0xff4400, 0.4).setDepth(12);
            this.scene.tweens.add({
                targets: warning, alpha: 0, duration: 600,
                onComplete: () => warning.destroy()
            });

            this.scene.time.delayedCall(600, () => {
                const meteor = this.scene.add.sprite(mx, my - 100, 'meteor_vfx').setDepth(10);
                this.scene.tweens.add({
                    targets: meteor, y: my, duration: 300, ease: 'Quad.easeIn',
                    onComplete: () => {
                        meteor.destroy();
                        const dist = Phaser.Math.Distance.Between(mx, my, this.scene.player.x, this.scene.player.y);
                        if (dist < boss.stats.meteorRadius) {
                            this.scene.combat.takeDamage(dmg);
                            this.scene.floatingText(this.scene.player.x, this.scene.player.y - 30, 'METEOR!', '#ff4400');
                        }
                        const ring = this.scene.add.circle(mx, my, 5, 0xff4400, 0.6).setDepth(12);
                        this.scene.tweens.add({
                            targets: ring, scaleX: 5, scaleY: 5, alpha: 0, duration: 400,
                            onComplete: () => ring.destroy()
                        });
                    }
                });
            });
        }
    }

    _villageBossSummonCorpses(boss) {
        const ox = this.scene.villageOffsetX;
        playBossAoE();
        this.scene.floatingText(boss.x, boss.y - 40, 'RISE!', '#5a6a4a');

        for (let i = 0; i < boss.stats.corpseCount; i++) {
            const angle = (i / boss.stats.corpseCount) * Math.PI * 2;
            const sx = boss.x + Math.cos(angle) * 60;
            const sy = boss.y + Math.sin(angle) * 50;
            const clampedX = Phaser.Math.Clamp(sx, ox + 20, ox + VILLAGE_WIDTH - 20);
            const clampedY = Phaser.Math.Clamp(sy, 20, CEMETERY_HEIGHT - 20);
            this._spawnVillageZombie(clampedX, clampedY);
        }
    }

    _spawnVillageZombie(x, y) {
        const bt = VILLAGE_CORPSE_MINION;
        const e = this.scene.add.sprite(x, y, 'zombie_walk').setDepth(5);
        this.scene.physics.add.existing(e, false);
        e.body.setSize(bt.bw, bt.bh);
        e.body.setCollideWorldBounds(true);
        if (this.scene.anims.exists('zombie_walk_anim')) e.play('zombie_walk_anim');

        e.stats = {
            key: bt.key, name: bt.name,
            hp: Math.floor(bt.hp * this.scene.diffMulti.hp),
            maxHp: Math.floor(bt.hp * this.scene.diffMulti.hp),
            damage: Math.floor(bt.dmg * this.scene.diffMulti.dmg),
            exp: Math.floor(bt.exp * this.scene.diffMulti.exp),
            bw: bt.bw, bh: bt.bh
        };

        const hw = bt.bw + 4;
        e.hpBg = this.scene.add.rectangle(x, y - bt.bh / 2 - 6, hw, 3, 0x333333).setOrigin(0.5).setDepth(11);
        e.hpFill = this.scene.add.rectangle(x, y - bt.bh / 2 - 6, hw, 3, 0x5a6a4a).setOrigin(0.5).setDepth(11);
        this.scene.villageZombies.add(e);
    }

    _villageBossSplit(boss) {
        this.scene.floatingText(boss.x, boss.y - 40, 'SPLIT!', '#ff0000');
        playBossAoE();

        this.scene.villageBossClones = [];
        const ox = this.scene.villageOffsetX;
        const bt = VILLAGE_BOSS_TYPE;
        const fullHp = Math.floor(bt.hp[this.scene.difficulty] || bt.hp.Normal);
        const fullDmg = Math.floor(bt.dmg[this.scene.difficulty] || bt.dmg.Normal);
        const fullSpd = bt.speeds[this.scene.difficulty] || bt.speeds.Normal;

        for (let i = 0; i < 2; i++) {
            const angle = (i / 2) * Math.PI * 2;
            const sx = boss.x + Math.cos(angle) * 70;
            const sy = boss.y + Math.sin(angle) * 60;
            const clampX = Phaser.Math.Clamp(sx, ox + 20, ox + VILLAGE_WIDTH - 20);
            const clampY = Phaser.Math.Clamp(sy, 20, CEMETERY_HEIGHT - 20);

            const clone = this.scene.add.sprite(clampX, clampY, 'purple_demon_walk').setDepth(5).setAlpha(1);
            this.scene.physics.add.existing(clone, false);
            clone.body.setSize(bt.bw, bt.bh);
            clone.body.setCollideWorldBounds(true);
            if (this.scene.anims.exists('purple_demon_walk_anim')) clone.play('purple_demon_walk_anim');

            clone.stats = {
                key: 'purple_demon_clone_' + i, name: bt.name,
                hp: fullHp, maxHp: fullHp, damage: fullDmg,
                exp: Math.floor(bt.exp[this.scene.difficulty] || bt.exp.Normal) * 0.5 | 0,
                speed: fullSpd, bw: bt.bw, bh: bt.bh,
                isBossClone: true,
                meteorTimer: 0, meteorInterval: bt.meteorInterval,
                meteorRadius: bt.meteorRadius, meteorDmgMul: bt.meteorDmgMul,
                corpseTimer: 0, corpseInterval: bt.corpseInterval,
                corpseCount: bt.corpseCount,
                wTimer: 0, wDir: 0
            };

            const hw = bt.bw + 10;
            clone.hpBg = this.scene.add.rectangle(clampX, clampY - bt.bh / 2 - 8, hw, 4, 0x333333).setOrigin(0.5).setDepth(11);
            clone.hpFill = this.scene.add.rectangle(clampX, clampY - bt.bh / 2 - 8, hw, 4, 0x8a30a0).setOrigin(0.5).setDepth(11);

            this.scene.enemies.add(clone);
            this.scene.villageBossClones.push(clone);
        }

        boss.body.setVelocity(0);
        this.scene.tweens.add({
            targets: boss, alpha: 0, scaleX: 0.5, scaleY: 0.5, duration: 500,
            onComplete: () => {
                if (boss.hpBg) boss.hpBg.destroy();
                if (boss.hpFill) boss.hpFill.destroy();
                if (boss.active) boss.destroy();
            }
        });
        if (this.scene.villageBossNameText) this.scene.villageBossNameText.destroy();
        this.scene.villageBoss = null;
        this.scene.villageBossAlive = false;

        this.scene.floatingText(ox + VILLAGE_WIDTH / 2, CEMETERY_HEIGHT / 2, 'DEMON CLONES APPEAR!', '#ff4444');
    }

    _killBossClone(clone) {
        if (clone._killed) return;
        clone._killed = true;
        clone.body.setVelocity(0);
        clone.setTint(0xff0000);
        const exp = clone.stats.exp;
        if (exp > 0) {
            const expBonus = 1 + (this.scene.accountEffects ? (this.scene.accountEffects.expPercent || 0) / 100 : 0);
            this.scene.playerExp += exp;
            this.scene.accountExp += Math.floor(exp * expBonus);
            this.scene.floatingText(clone.x, clone.y - 30, '+' + exp + ' EXP', '#f1c40f');
        }
        if (this.scene.particles) this.scene.particles.spawnBossDeath(clone.x, clone.y);

        this.scene.tweens.add({
            targets: clone, alpha: 0, scaleX: 1.5, scaleY: 1.5, duration: 800,
            onComplete: () => {
                if (clone.hpBg) clone.hpBg.destroy();
                if (clone.hpFill) clone.hpFill.destroy();
                clone.destroy();
            }
        });

        if (clone.stats && clone.stats.key) {
            recordKill(clone.stats.key);
            recordSoulCollect(clone.stats.key);
            onKill(clone.stats.key);
        }
        this.scene.kills++;
        this.scene._updateQuestIcons();

        if (this.scene.villageBossClones) {
            const idx = this.scene.villageBossClones.indexOf(clone);
            if (idx !== -1) this.scene.villageBossClones.splice(idx, 1);
        }

        if (!this.scene.villageBossClones || this.scene.villageBossClones.length === 0) {
            this.scene.time.delayedCall(800, () => {
                this._victoryBossClone();
            });
        }
    }

    _victoryBossClone() {
        const ox = this.scene.villageOffsetX;
        this.scene.villageBossDefeated = true;
        playBossDeath();

        this.scene.defeatedText = this.scene.add.text(ox + VILLAGE_WIDTH / 2, 250, 'PURPLE DEMON DEFEATED!', {
            fontSize: '26px', fill: '#8a30a0', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 4
        }).setOrigin(0.5).setScrollFactor(0);
        this.scene.tweens.add({
            targets: this.scene.defeatedText, alpha: 0, duration: 5000,
            onComplete: () => { if (this.scene.defeatedText) this.scene.defeatedText.destroy(); this.scene.defeatedText = null; }
        });

        this.scene.defeatedLoot = [];
        const lootItems = [];

        const magmaArmor = { ...MAGMA_ARMOR, type: 'equip' };
        if (this.scene.addEquip(magmaArmor)) {
            lootItems.push(magmaArmor);
            playLoot();
        }

        if (Math.random() < 0.6) {
            const item = rollEquip();
            if (this.scene.addEquip(item)) {
                lootItems.push(item);
                playLoot();
            }
        }

        if (Math.random() < BOSS_DROP_CHANCE) {
            const accItem = rollVillageAccountEquip();
            if (this.scene.addAccountEquip(accItem)) {
                lootItems.push({ ...accItem, name: accItem.name + ' [ACCOUNT]' });
                playLoot();
            }
        }

        if (Math.random() < 0.3) {
            const accItem2 = rollAccountEquip();
            if (this.scene.addAccountEquip(accItem2)) {
                lootItems.push({ ...accItem2, name: accItem2.name + ' [ACCOUNT]' });
                playLoot();
            }
        }

        lootItems.forEach((item, i) => {
            const rc = '#' + RARITY_COLORS[item.rarity].toString(16).padStart(6, '0');
            const lt = this.scene.add.text(this.scene.villageOffsetX + VILLAGE_WIDTH / 2, 280 + i * 22, '+' + item.name, {
                fontSize: '14px', fill: rc, fontFamily: 'Arial', fontStyle: 'bold',
                stroke: '#000', strokeThickness: 2
            }).setOrigin(0.5).setScrollFactor(0);
            this.scene.defeatedLoot.push(lt);
            this.scene.tweens.add({
                targets: lt, alpha: 0, duration: 5000,
                onComplete: () => { if (lt.active) lt.destroy(); }
            });
        });

        this.scene.time.delayedCall(6000, () => {
            if (this.scene.zone === 'cemetery') {
                this.scene.floatingText(this.scene.villageOffsetX + VILLAGE_WIDTH / 2, CEMETERY_HEIGHT / 2,
                    'Village saved... for now.', '#2ecc71');
            }
        });

        this.scene.hellPortal = this.scene.add.rectangle(this.scene.villageOffsetX + VILLAGE_WIDTH / 2, CEMETERY_HEIGHT - 40, 60, 12, 0xff2200, 0.5).setDepth(2);
        this.scene.hellPortalHint = this.scene.add.text(this.scene.villageOffsetX + VILLAGE_WIDTH / 2, CEMETERY_HEIGHT - 55, '', {
            fontSize: '11px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(12);

        this.scene.checkLevelUp();
        this.scene._checkAccountLevelUp();
        this.scene.updateUI();

        const vc = rollBossCrystals('village');
        if (vc > 0) {
            this.scene.crystals = (this.scene.crystals || 0) + vc;
            this.scene.floatingText(this.scene.villageOffsetX + VILLAGE_WIDTH / 2, 310, '+' + vc + ' \u{1F48E}', '#3498db');
        }
    }

    _spawnSnowyVillageCamps() {
        const ox = this.scene.villageOffsetX;
        const roleOrder = ['tank', 'assassin', 'archer', 'healer'];
        for (let i = 0; i < SNOWY_VILLAGE_CAMP_POSITIONS.length; i++) {
            const cp = SNOWY_VILLAGE_CAMP_POSITIONS[i];
            for (let j = 0; j < 4; j++) {
                const role = roleOrder[j % roleOrder.length];
                const t = SNOWY_VILLAGE_ENEMY_TYPES[role];
                const angle = (j / 4) * Math.PI * 2;
                const ex = ox + cp.x + Math.cos(angle) * 30;
                const ey = cp.y + Math.sin(angle) * 25;
                this._makeSnowyVillageEnemy(t, ex, ey, i);
            }
        }
    }

    _makeSnowyVillageEnemy(t, x, y, campIndex) {
        const walkTex = t.key + '_walk';
        const animKey = t.key + '_walk_anim';
        const e = this.scene.add.sprite(x, y, walkTex).setDepth(5);
        this.scene.physics.add.existing(e, false);
        e.body.setSize(t.bw, t.bh);
        e.body.setCollideWorldBounds(true);
        if (this.scene.anims.exists(animKey)) e.play(animKey);

        e.stats = {
            key: t.key, name: t.name,
            hp: Math.floor(t.hp * this.scene.diffMulti.hp),
            maxHp: Math.floor(t.hp * this.scene.diffMulti.hp),
            damage: Math.floor(t.dmg * this.scene.diffMulti.dmg),
            exp: Math.floor(t.exp * this.scene.diffMulti.exp),
            bw: t.bw, bh: t.bh, role: t.role,
            campIndex: campIndex,
            wTimer: 0, wDir: 0
        };

        const hw = t.bw + 4;
        e.hpBg = this.scene.add.rectangle(x, y - t.bh / 2 - 8, hw, 3, 0x333333).setOrigin(0.5).setDepth(11);
        e.hpFill = this.scene.add.rectangle(x, y - t.bh / 2 - 8, hw, 3, 0x3498db).setOrigin(0.5).setDepth(11);
        this.scene.enemies.add(e);
        return e;
    }

    _spawnSnowyVillageChests() {
        const ox = this.scene.villageOffsetX;
        for (let i = 0; i < SNOWY_VILLAGE_CHEST_COUNT; i++) {
            const cy = 100 + Math.random() * (VILLAGE_HEIGHT - 200);
            const cx = ox + 50 + Math.random() * (VILLAGE_WIDTH - 100);
            this._createSnowyVillageChest(cx, cy);
        }
    }

    _createSnowyVillageChest(x, y) {
        const ch = this.scene.add.sprite(x, y, 'snowy_barrel').setDepth(6);
        this.scene.physics.add.existing(ch, false);
        ch.body.setSize(18, 22);
        ch.body.setCollideWorldBounds(true);
        ch.stats = { hp: 60, maxHp: 60 };
        ch.hpBg = this.scene.add.rectangle(x, y - 16, 22, 3, 0x333333).setOrigin(0.5).setDepth(11);
        ch.hpFill = this.scene.add.rectangle(x, y - 16, 22, 3, 0x3498db).setOrigin(0.5).setDepth(11);
        ch.loot = [];
        const count = 1 + Math.floor(Math.random() * 2);
        for (let i = 0; i < count; i++) {
            if (Math.random() < SNOWY_VILLAGE_CHEST_DROP_CHANCE) {
                ch.loot.push(rollVillageEquip());
            }
        }
        if (Math.random() < VILLAGE_CHEST_EQUIP_DROP_CHANCE) {
            ch.loot.push(rollEquip());
        }
        ch.hintText = this.scene.add.text(x, y - 20, '', {
            fontSize: '10px', fill: '#3498db', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(12);
        ch.broken = false;
        this.scene.villageChests.add(ch);
        return ch;
    }

    _spawnSnowyCampfire() {
        const ox = this.scene.villageOffsetX;
        const cf = this.scene.add.image(ox + VILLAGE_WIDTH / 2, 100, 'campfire').setDepth(6);
        this.scene.physics.add.existing(cf, false);
        cf.body.setSize(24, 30);
        cf.body.setCollideWorldBounds(true);
        this.scene.campfire = cf;
        this.scene.campfireHint = this.scene.add.text(ox + VILLAGE_WIDTH / 2, 70, '', {
            fontSize: '11px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(12);
    }

    _spawnSnowyVillageBoss() {
        if (this.scene.snowyIceSpirit) return;
        const ox = this.scene.villageOffsetX;
        const x = ox + VILLAGE_WIDTH / 2;
        const y = VILLAGE_HEIGHT - 100;

        const walkTex = SNOWY_VILLAGE_BOSS_TYPE.key + '_walk';
        const animKey = SNOWY_VILLAGE_BOSS_TYPE.key + '_walk_anim';
        const e = this.scene.add.sprite(x, y, walkTex).setDepth(6);
        this.scene.physics.add.existing(e, false);
        e.body.setSize(SNOWY_VILLAGE_BOSS_TYPE.bw, SNOWY_VILLAGE_BOSS_TYPE.bh);
        e.body.setCollideWorldBounds(true);
        if (this.scene.anims.exists(animKey)) e.play(animKey);

        const bt = SNOWY_VILLAGE_BOSS_TYPE;
        const diffKey = this.scene.difficulty || 'Normal';
        e.stats = {
            key: bt.key, name: bt.name,
            hp: Math.floor((bt.hp[diffKey] || bt.hp.Normal)),
            maxHp: Math.floor((bt.hp[diffKey] || bt.hp.Normal)),
            damage: Math.floor((bt.dmg[diffKey] || bt.dmg.Normal)),
            exp: Math.floor((bt.exp[diffKey] || bt.exp.Normal)),
            bw: bt.bw, bh: bt.bh
        };

        const hpW = 80;
        e.hpBg = this.scene.add.rectangle(400, 56, hpW, 6, 0x333333).setOrigin(0.5).setScrollFactor(0).setDepth(20);
        e.hpFill = this.scene.add.rectangle(400 - hpW / 2, 56, hpW, 6, 0x3498db).setOrigin(0, 0.5).setScrollFactor(0).setDepth(20);
        this.scene.snowyIceSpiritNameText = this.scene.add.text(400, 44, bt.name, {
            fontSize: '13px', fill: '#3498db', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setScrollFactor(0).setDepth(20);

        this.scene.snowyIceSpirit = e;
        this.scene.snowyIceSpiritAbilities = { frostWaveTimer: 0, blizzardTimer: 0, summonTimer: 0 };
        this.scene.snowyIceShards = this.scene.physics.add.group();
    }

    _updateSnowyVillageBoss() {
        if (!this.scene.snowyIceSpirit || !this.scene.snowyIceSpirit.active) return;
        const b = this.scene.snowyIceSpirit;
        const s = b.stats;

        b.hpBg.x = 400;
        b.hpBg.y = 56;
        b.hpFill.x = 400 - b.hpBg.width / 2;
        b.hpFill.y = 56;
        b.hpFill.width = b.hpBg.width * (s.hp / s.maxHp);

        if (b.hp <= 0) {
            this._snowyIceSpiritDied();
            return;
        }

        const dx = this.scene.player.x - b.x;
        const dy = this.scene.player.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const chaseSpeed = dist < 80 ? 80 : 60;
        if (dist > 16) {
            b.body.setVelocity((dx / dist) * chaseSpeed, (dy / dist) * chaseSpeed);
            b.setFlipX(dx < 0);
        } else {
            b.body.setVelocity(0);
            if (!this.scene.menuOpen && !this.scene.transitioning) {
                this.scene.combat.takeDamage(Math.floor(b.stats.damage * 0.5));
            }
        }

        const ab = this.scene.snowyIceSpiritAbilities;
        ab.frostWaveTimer += this.scene.game.loop.delta;
        ab.blizzardTimer += this.scene.game.loop.delta;
        ab.summonTimer += this.scene.game.loop.delta;

        if (ab.frostWaveTimer >= 5000) {
            ab.frostWaveTimer = 0;
            this._snowyFrostWave(b);
        }
        if (ab.blizzardTimer >= 8000) {
            ab.blizzardTimer = 0;
            this._snowyBlizzard(b);
        }
        if (ab.summonTimer >= 12000) {
            ab.summonTimer = 0;
            this._snowySummonShards(b);
        }

        if (this.scene.snowyIceShards && this.scene.snowyIceShards.getLength() > 0) {
            this.scene.snowyIceShards.getChildren().forEach(s => {
                if (!s.active || !s.stats) return;
                const sdx = this.scene.player.x - s.x;
                const sdy = this.scene.player.y - s.y;
                const sd = Math.sqrt(sdx * sdx + sdy * sdy);
                if (sd < 200) {
                    if (sd > 15) {
                        s.body.setVelocity((sdx / sd) * 90, (sdy / sd) * 90);
                        s.setFlipX(sdx < 0);
                    } else {
                        s.body.setVelocity(0);
                    }
                } else {
                    s.body.setVelocity(0);
                }
                if (s.hpBg) { s.hpBg.x = s.x; s.hpBg.y = s.y - s.stats.bh / 2 - 6; }
                if (s.hpFill) { s.hpFill.x = s.x; s.hpFill.y = s.y - s.stats.bh / 2 - 6; }
            });
        }
    }

    _snowyFrostWave(boss) {
        if (!boss || !boss.active) return;
        const ox = this.scene.villageOffsetX;
        const px = this.scene.player.x;
        const py = this.scene.player.y;
        const dx = px - boss.x;
        const dy = py - boss.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 250) return;
        if (dist < 100) {
            this.scene.combat.takeDamage(Math.floor(boss.stats.damage * 0.6));
        }
        const vfx = this.scene.add.image(boss.x + dx * 0.5, boss.y + dy * 0.5, 'frost_wave_vfx').setDepth(10).setAlpha(0.7);
        this.scene.tweens.add({ targets: vfx, alpha: 0, scale: 1.5, duration: 600, onComplete: () => vfx.destroy() });
    }

    _snowyBlizzard(boss) {
        if (!boss || !boss.active) return;
        const dist = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, boss.x, boss.y);
        if (dist < 150) {
            this.scene.combat.takeDamage(Math.floor(boss.stats.damage * 0.8));
        }
        const vfx = this.scene.add.image(boss.x, boss.y, 'blizzard_vfx').setDepth(10).setAlpha(0.7).setScale(1.5);
        this.scene.tweens.add({ targets: vfx, alpha: 0, scale: 2, duration: 800, onComplete: () => vfx.destroy() });
    }

    _snowySummonShards(boss) {
        if (!boss || !boss.active || !this.scene.snowyIceShards) return;
        for (let i = 0; i < 3; i++) {
            const angle = (i / 3) * Math.PI * 2;
            const sx = boss.x + Math.cos(angle) * 50;
            const sy = boss.y + Math.sin(angle) * 40;
            const shard = this.scene.add.sprite(sx, sy, 'ice_shard').setDepth(5);
            this.scene.physics.add.existing(shard, false);
            shard.body.setSize(10, 12);
            shard.body.setCollideWorldBounds(true);
            const dm = this.scene.diffMulti || { hp: 1, dmg: 1 };
            shard.stats = { hp: Math.floor(SNOWY_BOSS_MINION.hp * dm.hp), maxHp: Math.floor(SNOWY_BOSS_MINION.hp * dm.hp), damage: Math.floor(SNOWY_BOSS_MINION.dmg * dm.dmg), bh: 12 };
            shard.hpBg = this.scene.add.rectangle(sx, sy - 12, 14, 3, 0x333333).setOrigin(0.5).setDepth(11);
            shard.hpFill = this.scene.add.rectangle(sx, sy - 12, 14, 3, 0x3498db).setOrigin(0.5).setDepth(11);
            this.scene.snowyIceShards.add(shard);
        }
    }

    _snowyIceSpiritDied() {
        if (!this.scene.snowyIceSpirit) return;
        playBossDeath();
        const ox = this.scene.villageOffsetX;
        if (this.scene.particles) this.scene.particles.spawnBossDeath(this.scene.snowyIceSpirit.x, this.scene.snowyIceSpirit.y);

        if (this.scene.snowyIceSpirit.hpBg) this.scene.snowyIceSpirit.hpBg.destroy();
        if (this.scene.snowyIceSpirit.hpFill) this.scene.snowyIceSpirit.hpFill.destroy();
        if (this.scene.snowyIceSpiritNameText) this.scene.snowyIceSpiritNameText.destroy();
        this.scene.snowyIceSpirit.destroy();
        this.scene.snowyIceSpirit = null;

        if (this.scene.snowyIceShards) {
            this.scene.snowyIceShards.getChildren().forEach(s => {
                if (s.hpBg) s.hpBg.destroy();
                if (s.hpFill) s.hpFill.destroy();
            });
            this.scene.snowyIceShards.clear(true, true);
        }

        this.scene.defeatedText = this.scene.add.text(ox + VILLAGE_WIDTH / 2, 200, 'ICE SPIRIT DEFEATED!', {
            fontSize: '22px', fill: '#3498db', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 4
        }).setOrigin(0.5).setScrollFactor(0);
        this.scene.tweens.add({
            targets: this.scene.defeatedText, alpha: 0, duration: 5000,
            onComplete: () => { if (this.scene.defeatedText) this.scene.defeatedText.destroy(); this.scene.defeatedText = null; }
        });

        const warmCore = { ...WARMTH_CORE, type: 'equip' };
        if (this.scene.addEquip(warmCore)) {
            this.scene.floatingText(ox + VILLAGE_WIDTH / 2, 230, '+' + warmCore.name, '#ff6600');
            playLoot();
        }

        this.scene.villageBossDefeated = true;
        this.scene.checkLevelUp();
        this.scene._checkAccountLevelUp();
        this.scene.updateUI();

        this.scene.time.delayedCall(2000, () => {
            this.scene.floatingText(ox + VILLAGE_WIDTH / 2, 260, 'Use Warmth Core at the campfire!', '#f1c40f');
        });

        const sc = rollBossCrystals('snowy');
        if (sc > 0) {
            this.scene.crystals = (this.scene.crystals || 0) + sc;
            this.scene.floatingText(ox + VILLAGE_WIDTH / 2, 290, '+' + sc + ' \u{1F48E}', '#3498db');
        }
    }

    _updateSnowyVillageMobs() {
        if (this.scene.zone !== 'village' || !this.scene.villageFrozen || this.scene.menuOpen || this.scene.transitioning) return;
        if (!this.scene.enemies) return;

        const delta = this.scene.game.loop.delta;

        this.scene.enemies.getChildren().forEach(e => {
            if (!e.active || !e.stats) return;
            const dx = this.scene.player.x - e.x;
            const dy = this.scene.player.y - e.y;
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
    }

    _checkSnowyVillageProgress() {
        if (this.scene.zone !== 'village' || !this.scene.villageFrozen || this.scene.snowyVillageAllCleared) return;
        if (!this.scene.enemies || this.scene.enemies.getLength() === 0) {
            this.scene.snowyVillageAllCleared = true;
            this.scene.floatingText(this.scene.villageOffsetX + VILLAGE_WIDTH / 2, 180, 'All winter spirits vanquished!', '#3498db');
            this.scene.time.delayedCall(2000, () => {
                this._spawnSnowyVillageBoss();
                this.scene.floatingText(this.scene.villageOffsetX + VILLAGE_WIDTH / 2, 200, 'ICE SPIRIT has appeared!', '#ff4444');
            });
        }
    }
}
