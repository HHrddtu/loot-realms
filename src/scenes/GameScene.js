import Phaser from 'phaser';
import {
    DIFF_MULT, MATERIAL_SLOTS, EQUIP_BAG_SLOTS, ACCOUNT_EQUIP_BAG_SLOTS, EMPTY_ACCOUNT_EQUIPMENT,
    CORRUPTION, MINE_BOSS_PORTAL_POS,
    GAME_WIDTH, GAME_HEIGHT
} from '../config/index.js';
import { playPortal, stopMusic, playPetPickup, startZoneMusic } from '../sound.js';
import { loadAccount } from '../save.js';
import { getClassData, getClassStats } from '../classes.js';
import { getTalentEffects } from '../talents.js';
import { getAccountTalentEffects } from '../accountTalents.js';
import { initBestiary, recordEncounter } from '../bestiary.js';
import { initMaterialBook } from '../materialBook.js';
import { initSoulBook } from '../soulBook.js';
import { initQuests } from '../quests.js';
import { CombatSystem } from '../systems/CombatSystem.js';
import { PlayerSystem } from '../systems/PlayerSystem.js';
import { SpellSystem } from '../systems/SpellSystem.js';
import { UISystem } from '../systems/UISystem.js';
import { NpcSystem } from '../systems/NpcSystem.js';
import { ParticleSystem } from '../systems/ParticleSystem.js';
import { PetSystem } from '../systems/PetSystem.js';
import { SaveLoadSystem } from '../systems/SaveLoadSystem.js';
import { ForestBossAI } from '../systems/ForestBossAI.js';
import { ForestZone } from '../zones/ForestZone.js';
import { ArenaZone } from '../zones/ArenaZone.js';
import { MineZone } from '../zones/MineZone.js';
import { CaveZone } from '../zones/CaveZone.js';
import { VillageZone } from '../zones/VillageZone.js';
import { HellZone } from '../zones/HellZone.js';
import { SnowyZone } from '../zones/SnowyZone.js';
import { CastleZone } from '../zones/CastleZone.js';
import { MeadowZone } from '../zones/MeadowZone.js';
import { isHost, getMyId, getPlayers, getPlayerNames, onStateUpdate, onLoot, onKey, sendInput, sendGameState, sendLootPickup, sendKeyPickup } from '../network.js';
import { MultiplayerSync } from '../multiplayer.js';
import { CRYSTAL_RUN_CAPS, canGetCrystals } from '../config/pets.js';
import { getKeybinds, parseKeyCode } from '../keybinds.js';


export default class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    init(data) {
        this.difficulty = data.difficulty || 'Normal';
        this.loadOnStart = data.load || false;
        this.classKey = data.classKey || 'sage';
        this.multiplayer = data.multiplayer || false;
    }

    create() {
        this.zone = 'forest';
        this.transitioning = false;

        this.enemies = null;
        this.stumps = null;
        this.boss = null;
        this.bossTimer = null;
        this.bossNameText = null;
        this.defeatedText = null;
        this.defeatedLoot = null;
        this.exitPortal = null;
        this.exitHint = null;
        this.mineRocks = null;
        this.mineCrystals = null;
        this.mineChests = null;
        this.mineTorches = null;
        this.mineDarkness = null;
        this.mineBoss = null;
        this.mineBossNameText = null;
        this.mineBossTimer = null;

        this.combat = new CombatSystem(this);
        this.playerSys = new PlayerSystem(this);
        this.spellSys = new SpellSystem(this);
        this.ui = new UISystem(this);
        this.npc = new NpcSystem(this);
        this.particles = new ParticleSystem(this);
        this.particles.init();
        this.petSys = new PetSystem(this);
        this.saveLoad = new SaveLoadSystem(this);
        this.forestBossAI = new ForestBossAI(this);

        this.zones = {
            forest: new ForestZone(this),
            arena: new ArenaZone(this),
            mine: new MineZone(this),
            cave: new CaveZone(this),
            village: new VillageZone(this),
            hell: new HellZone(this),
            snowy: new SnowyZone(this),
            castle: new CastleZone(this),
            meadow: new MeadowZone(this)
        };
        this.currentZone = null;

        this._createAnimations();
        this._createPlayer();
        this.petSys.create();
        this._initInventory();
        this._initStats();
        this._createUI();
        this._bindKeys();

        this.events.on('resume', () => {
            this._bindKeys();
        });

        this.input.on('pointerdown', (pointer) => {
            if (this.menuOpen || this.transitioning || this.invOpen) return;
            if (pointer.button !== 0) return;
            const worldPoint = this.cameras.main.getWorldPoint(pointer.x, pointer.y);
            const dx = worldPoint.x - this.player.x;
            const dy = worldPoint.y - this.player.y;
            if (Math.abs(dx) > Math.abs(dy)) {
                this.facing = dx > 0 ? 'right' : 'left';
            } else {
                this.facing = dy > 0 ? 'down' : 'up';
            }
            this.attack();
        });

        this.invOpen = false;
        this.invGroup = [];
        this._tooltipGroup = [];
        this.bossDefeated = false;
        this.mineUnlocked = false;
        this.hasSecretKey = false;
        this.caveBossDefeated = false;
        this.cartDriverNpc = null;
        this.meadowGate = null;
        this.meadowBg = null;

        initBestiary();
        initMaterialBook();
        initSoulBook();
        initQuests();
        this.bestiarySeen = {};
        this.npcSprites = [];
        this.questIcons = [];
        this.nearbyNpc = null;
        this.nearbyShop = null;
        this.nearbyInn = null;
        this.questLogOpen = false;
        this.questLogGroup = [];

        this.unlockedTalents = [];
        this.talentPoints = 0;
        this._loadAccountTalents = () => this.saveLoad.loadAccountTalents();
        this._loadAccountTalents();

        this.corruption = 0;
        this.corruptionMax = this.classStats ? this.classStats.corruptionMax : CORRUPTION.max;

        this.spellCooldowns = { fireball: 0, shield: 0, heal: 0 };
        this.shieldActive = false;
        this.shieldHP = 0;
        this.shieldTimer = 0;
        this.lifeLinkActive = false;
        this.lifeLinkTimer = 0;
        this.lifeLinkHealPerSec = 0;
        this.fireballs = [];
        this.enemyProjectiles = [];
        this.villageFrozen = false;
        this.villageRestored = false;
        this.villageThriving = false;
        this.villageBossDefeated = false;
        this.hellBossDefeated = false;
        this.castleQuestDone = false;
        this.villageMerchantNPC = null;
        this.villageMerchantHint = null;
        this.villageInn = null;
        this.villageInnHint = null;
        this.shopGroup = [];
        this.castleRoom = 0;
        this.castleBossDefeated = false;
        this.castleKeyObtained = false;
        this.castleRescued = false;
        this.castleChildNPC = null;
        this.castleChildHint = null;
        this._consumableBonusDmg = 0;
        this._consumableBonusDmgTimer = 0;
        this._consumableBonusSpd = 0;
        this._consumableBonusSpdTimer = 0;
        this._consumableBonusDef = 0;
        this._consumableBonusDefTimer = 0;
        this._consumableBonusCrit = 0;
        this._consumableBonusCritTimer = 0;
        this._consumableBonusLifesteal = 0;
        this._consumableBonusLifestealTimer = 0;
        this.gold = 0;
        this.crystals = 0;
        this.crystalsThisRun = 0;
        this.innUsed = false;
        this.nearbyShop = null;
        this.nearbyInn = null;

        this._remotePlayers = {};
        this._mpSendTimer = 0;
        this._mpMobTimer = 0;
        this._mpStateHandler = null;
        this._mpLootHandler = null;
        this._mpKeyHandler = null;
        this.mpSync = null;

        const acc = loadAccount() || {};
        this.accountLevel = acc.accountLevel || 1;
        this.accountExp = acc.accountExp || 0;
        this.accountTalentPoints = acc.accountTalentPoints || 0;
        this.unlockedAccountTalents = acc.unlockedAccountTalents || [];
        const accEquipPerClass = acc.accountEquipment || {};
        const accBagPerClass = acc.accountEquipBag || {};
        this.accountEquipment = accEquipPerClass[this.classKey] || { ...EMPTY_ACCOUNT_EQUIPMENT };
        this.accountEquipBag = accBagPerClass[this.classKey] || [];
        this.accountEffects = getAccountTalentEffects(this.unlockedAccountTalents);
        this.spellAssignments = acc.spellAssignments || {};
        this.gold = acc.gold || 0;
        this.crystals = acc.crystals || 0;
        this.recalcStats();

        if (this.loadOnStart) this.doLoad();

        if (this.loadOnStart && this._savedZone) {
            if (this._savedZone === 'mine') {
                this._setupZone('mine');
            } else if (this._savedZone === 'cave') {
                this._setupZone('cave');
            } else if (this._savedZone === 'meadow') {
                this.zones.meadow.setup();
            } else if (this._savedZone === 'village') {
                this._setupZone('village', this.villageFrozen);
            } else if (this._savedZone === 'cemetery') {
                this._setupZone('village', false);
                this.zone = 'cemetery';
                startZoneMusic('cemetery');
            } else if (this._savedZone === 'hell') {
                this._setupZone('hell');
            } else if (this._savedZone === 'snowy') {
                this._setupZone('village', true);
                this.zone = 'snowy';
                startZoneMusic('snowy');
            } else if (this._savedZone === 'castle') {
                this._setupZone('castle', this.castleRoom || 0);
            } else {
                this._setupZone('forest');
            }
            delete this._savedZone;
        } else {
            this._setupZone('forest');
        }

        if (this.multiplayer) {
            this._setupMultiplayer();
        }

        this.events.on('shutdown', () => {
            if (this._onBeforeUnload) {
                window.removeEventListener('beforeunload', this._onBeforeUnload);
                this._onBeforeUnload = null;
            }
            if (this.particles) this.particles.destroy();
            this.petSys.destroy();
            this.doSave();
            stopMusic();
            if (this.multiplayer) {
                this._cleanupMultiplayer();
            }
        });

        this._onBeforeUnload = () => this.doSave();
        window.addEventListener('beforeunload', this._onBeforeUnload);

        this.autoSaveTimer = this.time.addEvent({
            delay: 300000,
            callback: () => this.doSave(),
            loop: true
        });

        this.events.on('resume', () => {
            const td = this.registry.get('talentData');
            if (td) {
                this.receiveTalentData(td);
                this.registry.remove('talentData');
            }
            this.petSys.create();
            const acc = loadAccount() || {};
            this.crystals = acc.crystals || 0;
            this._savedZone = null;
        });
    }

    /* ===== ANIMATIONS ===== */

    _createAnimations() {
        const anims = this.anims;

        if (!anims.exists('sage_walk_right')) {
            anims.create({ key: 'sage_walk_right', frames: anims.generateFrameNumbers('player_sage_walk', { start: 0, end: 3 }), frameRate: 8, repeat: -1 });
            anims.create({ key: 'sage_idle', frames: [{ key: 'player_sage', frame: 0 }], frameRate: 1 });
        }
        if (!anims.exists('sage_attack')) {
            anims.create({ key: 'sage_attack', frames: anims.generateFrameNumbers('player_sage_attack', { start: 0, end: 2 }), frameRate: 10, repeat: 0 });
        }
        if (!anims.exists('alchemist_walk_right')) {
            anims.create({ key: 'alchemist_walk_right', frames: anims.generateFrameNumbers('player_alchemist_walk', { start: 0, end: 3 }), frameRate: 7, repeat: -1 });
        }
        if (!anims.exists('alchemist_attack')) {
            anims.create({ key: 'alchemist_attack', frames: anims.generateFrameNumbers('player_alchemist_attack', { start: 0, end: 2 }), frameRate: 10, repeat: 0 });
        }
        if (!anims.exists('angel_walk_right')) {
            anims.create({ key: 'angel_walk_right', frames: anims.generateFrameNumbers('player_angel_walk', { start: 0, end: 3 }), frameRate: 7, repeat: -1 });
        }
        if (!anims.exists('angel_attack')) {
            anims.create({ key: 'angel_attack', frames: anims.generateFrameNumbers('player_angel_attack', { start: 0, end: 2 }), frameRate: 10, repeat: 0 });
        }
        if (!anims.exists('goblin_walk')) {
            anims.create({ key: 'goblin_walk', frames: anims.generateFrameNumbers('goblin_walk', { start: 0, end: 3 }), frameRate: 6, repeat: -1 });
            anims.create({ key: 'goblin_attack', frames: anims.generateFrameNumbers('goblin_attack', { start: 0, end: 2 }), frameRate: 10, repeat: 0 });
        }
        if (!anims.exists('slime_walk')) {
            anims.create({ key: 'slime_walk', frames: anims.generateFrameNumbers('slime_walk', { start: 0, end: 3 }), frameRate: 5, repeat: -1 });
        }
        if (!anims.exists('rat_walk')) {
            anims.create({ key: 'rat_walk', frames: anims.generateFrameNumbers('rat_walk', { start: 0, end: 3 }), frameRate: 8, repeat: -1 });
        }
        if (!anims.exists('skeleton_walk')) {
            anims.create({ key: 'skeleton_walk', frames: anims.generateFrameNumbers('skeleton_walk', { start: 0, end: 3 }), frameRate: 5, repeat: -1 });
            anims.create({ key: 'skeleton_attack', frames: anims.generateFrameNumbers('skeleton_attack', { start: 0, end: 2 }), frameRate: 8, repeat: 0 });
        }
        if (!anims.exists('skeleton_archer_walk_anim')) {
            anims.create({ key: 'skeleton_archer_walk_anim', frames: anims.generateFrameNumbers('skeleton_archer_walk', { start: 0, end: 3 }), frameRate: 5, repeat: -1 });
        }
        if (!anims.exists('skeleton_shaman_walk_anim')) {
            anims.create({ key: 'skeleton_shaman_walk_anim', frames: anims.generateFrameNumbers('skeleton_shaman_walk', { start: 0, end: 3 }), frameRate: 4, repeat: -1 });
        }
        if (!anims.exists('treant_walk')) {
            anims.create({ key: 'treant_walk', frames: anims.generateFrameNumbers('treant_walk', { start: 0, end: 3 }), frameRate: 3, repeat: -1 });
        }
        if (!anims.exists('skeleton_lord_walk')) {
            anims.create({ key: 'skeleton_lord_walk', frames: anims.generateFrameNumbers('skeleton_lord_walk', { start: 0, end: 3 }), frameRate: 4, repeat: -1 });
            anims.create({ key: 'skeleton_lord_attack', frames: anims.generateFrameNumbers('skeleton_lord_attack', { start: 0, end: 2 }), frameRate: 6, repeat: 0 });
        }
        if (!anims.exists('cave_spider_walk_anim')) {
            anims.create({ key: 'cave_spider_walk_anim', frames: anims.generateFrameNumbers('cave_spider_walk', { start: 0, end: 3 }), frameRate: 8, repeat: -1 });
        }
        if (!anims.exists('cave_bat_walk_anim')) {
            anims.create({ key: 'cave_bat_walk_anim', frames: anims.generateFrameNumbers('cave_bat_walk', { start: 0, end: 3 }), frameRate: 7, repeat: -1 });
        }
        if (!anims.exists('stone_golem_walk_anim')) {
            anims.create({ key: 'stone_golem_walk_anim', frames: anims.generateFrameNumbers('stone_golem_walk', { start: 0, end: 3 }), frameRate: 3, repeat: -1 });
        }
        if (!anims.exists('earth_worm_walk_anim')) {
            anims.create({ key: 'earth_worm_walk_anim', frames: anims.generateFrameNumbers('earth_worm_walk', { start: 0, end: 3 }), frameRate: 4, repeat: -1 });
        }
        if (!anims.exists('giant_bat_walk_anim')) {
            anims.create({ key: 'giant_bat_walk_anim', frames: anims.generateFrameNumbers('giant_bat_walk', { start: 0, end: 3 }), frameRate: 5, repeat: -1 });
        }
        if (!anims.exists('small_bat_walk_anim')) {
            anims.create({ key: 'small_bat_walk_anim', frames: anims.generateFrameNumbers('small_bat_walk', { start: 0, end: 3 }), frameRate: 7, repeat: -1 });
        }
        if (!anims.exists('village_brute_walk_anim')) {
            anims.create({ key: 'village_brute_walk_anim', frames: anims.generateFrameNumbers('village_brute_walk', { start: 0, end: 3 }), frameRate: 4, repeat: -1 });
        }
        if (!anims.exists('village_stalker_walk_anim')) {
            anims.create({ key: 'village_stalker_walk_anim', frames: anims.generateFrameNumbers('village_stalker_walk', { start: 0, end: 3 }), frameRate: 9, repeat: -1 });
        }
        if (!anims.exists('village_spitter_walk_anim')) {
            anims.create({ key: 'village_spitter_walk_anim', frames: anims.generateFrameNumbers('village_spitter_walk', { start: 0, end: 3 }), frameRate: 6, repeat: -1 });
        }
        if (!anims.exists('village_curser_walk_anim')) {
            anims.create({ key: 'village_curser_walk_anim', frames: anims.generateFrameNumbers('village_curser_walk', { start: 0, end: 3 }), frameRate: 5, repeat: -1 });
        }
        if (!anims.exists('zombie_walk_anim')) {
            anims.create({ key: 'zombie_walk_anim', frames: anims.generateFrameNumbers('zombie_walk', { start: 0, end: 3 }), frameRate: 3, repeat: -1 });
        }
        if (!anims.exists('purple_demon_walk_anim')) {
            anims.create({ key: 'purple_demon_walk_anim', frames: anims.generateFrameNumbers('purple_demon_walk', { start: 0, end: 3 }), frameRate: 4, repeat: -1 });
        }
        if (!anims.exists('hell_guard_walk_anim')) {
            anims.create({ key: 'hell_guard_walk_anim', frames: anims.generateFrameNumbers('hell_guard_walk', { start: 0, end: 3 }), frameRate: 4, repeat: -1 });
        }
        if (!anims.exists('hell_stalker_walk_anim')) {
            anims.create({ key: 'hell_stalker_walk_anim', frames: anims.generateFrameNumbers('hell_stalker_walk', { start: 0, end: 3 }), frameRate: 9, repeat: -1 });
        }
        if (!anims.exists('hell_archer_walk_anim')) {
            anims.create({ key: 'hell_archer_walk_anim', frames: anims.generateFrameNumbers('hell_archer_walk', { start: 0, end: 3 }), frameRate: 6, repeat: -1 });
        }
        if (!anims.exists('hell_mage_walk_anim')) {
            anims.create({ key: 'hell_mage_walk_anim', frames: anims.generateFrameNumbers('hell_mage_walk', { start: 0, end: 3 }), frameRate: 5, repeat: -1 });
        }
        if (!anims.exists('hell_priest_walk_anim')) {
            anims.create({ key: 'hell_priest_walk_anim', frames: anims.generateFrameNumbers('hell_priest_walk', { start: 0, end: 3 }), frameRate: 5, repeat: -1 });
        }
        if (!anims.exists('hell_imp_walk_anim')) {
            anims.create({ key: 'hell_imp_walk_anim', frames: anims.generateFrameNumbers('hell_imp_walk', { start: 0, end: 3 }), frameRate: 8, repeat: -1 });
        }
        if (!anims.exists('red_demon_walk_anim')) {
            anims.create({ key: 'red_demon_walk_anim', frames: anims.generateFrameNumbers('red_demon_walk', { start: 0, end: 3 }), frameRate: 4, repeat: -1 });
        }
        if (!anims.exists('bandit_melee_walk_anim')) {
            anims.create({ key: 'bandit_melee_walk_anim', frames: [{ key: 'bandit_melee', frame: 0 }], frameRate: 1, repeat: -1 });
        }
        if (!anims.exists('bandit_ranger_walk_anim')) {
            anims.create({ key: 'bandit_ranger_walk_anim', frames: [{ key: 'bandit_ranger', frame: 0 }], frameRate: 1, repeat: -1 });
        }
        if (!anims.exists('bandit_elite_walk_anim')) {
            anims.create({ key: 'bandit_elite_walk_anim', frames: [{ key: 'bandit_elite', frame: 0 }], frameRate: 1, repeat: -1 });
        }
        if (!anims.exists('bandit_leader_walk_anim')) {
            anims.create({ key: 'bandit_leader_walk_anim', frames: [{ key: 'bandit_leader', frame: 0 }], frameRate: 1, repeat: -1 });
        }
    }

    /* ===== PLAYER ===== */

    _createPlayer() {
        const cls = getClassData(this.classKey);
        const walkKey = cls.walkTexKey || 'player_sage_walk';
        const animKey = cls.walkAnim || 'sage_walk_right';
        this.player = this.add.sprite(400, 400, walkKey).setDepth(10);
        this.physics.add.existing(this.player, false);
        this.player.body.setSize(18, 38);
        this.player.body.setOffset(7, 8);
        this.player.body.setCollideWorldBounds(true);
        this.player.play(animKey);
    }

    /* ===== MULTIPLAYER ===== */

    _setupMultiplayer() {
        const names = getPlayerNames();
        const players = getPlayers();
        const ids = Object.keys(names);
        ids.forEach(id => {
            if (id === getMyId()) return;
            this._spawnRemotePlayer(id, names[id], players[id]?.classKey);
        });

        this.mpSync = new MultiplayerSync(this);

        this._mpStateHandler = (data) => {
            if (!data || !data.players) return;
            const seen = {};
            Object.keys(data.players).forEach(id => {
                if (id === getMyId()) return;
                seen[id] = true;
                const p = data.players[id];
                if (this._remotePlayers[id]) {
                    this._remotePlayers[id].sprite.x = p.x;
                    this._remotePlayers[id].sprite.y = p.y;
                    if (p.flipX !== undefined) this._remotePlayers[id].sprite.setFlipX(p.flipX);
                } else {
                    this._spawnRemotePlayer(id, data.names?.[id] || '???', p.classKey);
                    if (this._remotePlayers[id]) {
                        this._remotePlayers[id].sprite.x = p.x;
                        this._remotePlayers[id].sprite.y = p.y;
                    }
                }
            });
            Object.keys(this._remotePlayers).forEach(id => {
                if (!seen[id]) this._despawnRemotePlayer(id);
            });
        };

        this._mpLootHandler = (data) => {
            if (!data) return;
            if (data.type === 'heal') {
                this.playerHP = Math.min(this.playerMaxHP, this.playerHP + data.amount);
            }
        };

        this._mpKeyHandler = (data) => {
            if (!data) return;
            if (data.key === 'secret') this.hasSecretKey = true;
            if (data.key === 'mine') this.mineUnlocked = true;
            if (data.key === 'cave') this.caveBossDefeated = true;
        };

        onStateUpdate(this._mpStateHandler);
        onLoot(this._mpLootHandler);
        onKey(this._mpKeyHandler);

        if (isHost() && this.mpSync) {
            this.mpSync.startHostSync();
        }

        if (this.mpSync) {
            this.mpSync.broadcastZoneChange(this.zone);
        }
    }

    _spawnRemotePlayer(id, name, remoteClassKey) {
        if (id === getMyId()) return;
        if (this._remotePlayers[id]) return;
        const cls = getClassData(remoteClassKey || this.classKey);
        const walkKey = cls.walkTexKey || 'player_sage_walk';
        const sprite = this.add.sprite(400, 400, walkKey).setDepth(9);
        this.physics.add.existing(sprite, false);
        sprite.body.setSize(18, 38);
        sprite.body.setOffset(7, 8);
        sprite.body.setCollideWorldBounds(true);
        sprite.setAlpha(0.7);
        const nameText = this.add.text(0, 0, name || '...', {
            fontSize: '10px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(11);
        this._remotePlayers[id] = { sprite, nameText };
    }

    _despawnRemotePlayer(id) {
        if (!this._remotePlayers[id]) return;
        this._remotePlayers[id].sprite.destroy();
        this._remotePlayers[id].nameText.destroy();
        delete this._remotePlayers[id];
    }

    _broadcastState() {
        if (!isHost()) return;
        const players = {};
        players[getMyId()] = {
            x: this.player.x,
            y: this.player.y,
            flipX: this.player.flipX
        };
        const netPlayers = getPlayers();
        Object.keys(netPlayers).forEach(id => {
            if (id !== getMyId()) {
                players[id] = {
                    x: netPlayers[id].x,
                    y: netPlayers[id].y,
                    flipX: netPlayers[id].facing === 'left'
                };
            }
        });
        sendGameState({ players, names: getPlayerNames() });
    }

    _sendInputToHost() {
        if (isHost()) return;
        sendInput({
            x: this.player.x,
            y: this.player.y,
            facing: this.facing,
            attacking: this.playerAttacking,
            hp: this.playerHP,
            maxHp: this.playerMaxHP
        });
    }

    _detectMobKills() {
        if (!this.mpSync) return;
        if (!this._prevMobIds) this._prevMobIds = new Set();
        const currentIds = new Set();
        const checkGroup = (group) => {
            if (!group || !group.getLength) return;
            group.getChildren().forEach(e => {
                if (e.active && e.mpId) currentIds.add(e.mpId);
            });
        };
        checkGroup(this.enemies);
        checkGroup(this.villageZombies);
        checkGroup(this.caveSmallBats);
        checkGroup(this.hellImps);
        this._prevMobIds.forEach(id => {
            if (!currentIds.has(id)) {
                delete this.mpSync.mobSyncData[id];
            }
        });
        this._prevMobIds = currentIds;
    }

    _cleanupMultiplayer() {
        if (this.mpSync) {
            this.mpSync.cleanup();
            this.mpSync = null;
        }
        Object.keys(this._remotePlayers).forEach(id => this._despawnRemotePlayer(id));
        this._remotePlayers = {};
    }

    /* ===== STATS ===== */

    _initStats() {
        this.diffMulti = DIFF_MULT[this.difficulty] || DIFF_MULT.Normal;
        this.classData = getClassData(this.classKey);
        this.classStats = getClassStats(this.classKey, 1);
        this.playerHP = this.classStats.maxHp;
        this.playerMaxHP = this.classStats.maxHp;
        this.playerDamage = this.classStats.damage;
        this.playerSpeed = this.classStats.speed;
        this.playerExp = 0;
        this.playerLevel = 1;
        this.attackCooldown = false;
        this.playerAttacking = false;
        this.facing = 'right';
        this.invincible = false;
        this.menuOpen = false;
        this.kills = 0;
        this.stumpsBroken = 0;
        this.talentEffects = getTalentEffects([]);

        const acc = loadAccount() || {};
        this.accountLevel = acc.accountLevel || 1;
        this.accountExp = acc.accountExp || 0;
        this.accountTalentPoints = acc.accountTalentPoints || 0;
        this.unlockedAccountTalents = acc.unlockedAccountTalents || [];
        this.accountEffects = getAccountTalentEffects(this.unlockedAccountTalents);
        this.upgradeLevels = acc.upgradeLevels || {};
        this.activeBoosts = acc.activeBoosts || {};

        this.recalcStats();
    }

    awardCrystals(amount, x, y) {
        if (amount <= 0) return;
        const cap = CRYSTAL_RUN_CAPS[this.difficulty] || 200;
        const remaining = cap - (this.crystalsThisRun || 0);
        if (remaining <= 0) {
            if (x !== undefined && y !== undefined) {
                this.floatingText(x, y, 'Crystal cap reached!', '#888');
            }
            return 0;
        }
        const granted = Math.min(amount, remaining);
        this.crystals += granted;
        this.crystalsThisRun = (this.crystalsThisRun || 0) + granted;
        return granted;
    }

    /* ===== INVENTORY DATA ===== */

    _initInventory() {
        this.materials = [];
        this.maxMaterials = MATERIAL_SLOTS;
        this.equipBag = [];
        this.maxEquipBag = EQUIP_BAG_SLOTS;
        this.equipment = { weapon: null, armor: null, accessory: null };
        this.accountEquipment = { ...EMPTY_ACCOUNT_EQUIPMENT };
        this.accountEquipBag = [];
        this.maxAccountEquipBag = ACCOUNT_EQUIP_BAG_SLOTS;
    }

    /* ===== SAVE/LOAD ===== */

    doSave() { this.saveLoad.doSave(); }
    doLoad() { return this.saveLoad.doLoad(); }

    /* ===== UTILITY ===== */

    _updateConsumableBonuses(delta) {
        if (this._consumableBonusDmgTimer > 0) {
            this._consumableBonusDmgTimer -= delta;
            if (this._consumableBonusDmgTimer <= 0) {
                this._consumableBonusDmg = 0;
                this.floatingText(this.player.x, this.player.y - 30, 'DMG boost expired', '#95a5a6');
            }
        }
        if (this._consumableBonusSpdTimer > 0) {
            this._consumableBonusSpdTimer -= delta;
            if (this._consumableBonusSpdTimer <= 0) {
                this._consumableBonusSpd = 0;
                this.floatingText(this.player.x, this.player.y - 30, 'SPD boost expired', '#95a5a6');
            }
        }
        if (this._consumableBonusDefTimer > 0) {
            this._consumableBonusDefTimer -= delta;
            if (this._consumableBonusDefTimer <= 0) {
                this._consumableBonusDef = 0;
                this.floatingText(this.player.x, this.player.y - 30, 'DEF boost expired', '#95a5a6');
            }
        }
        if (this._consumableBonusCritTimer > 0) {
            this._consumableBonusCritTimer -= delta;
            if (this._consumableBonusCritTimer <= 0) {
                this._consumableBonusCrit = 0;
                this.floatingText(this.player.x, this.player.y - 30, 'Crit boost expired', '#95a5a6');
            }
        }
        if (this._consumableBonusLifestealTimer > 0) {
            this._consumableBonusLifestealTimer -= delta;
            if (this._consumableBonusLifestealTimer <= 0) {
                this._consumableBonusLifesteal = 0;
                this.floatingText(this.player.x, this.player.y - 30, 'Lifesteal expired', '#95a5a6');
            }
        }
    }

    _destroyOrphanedCaveStairs() {
        if (this.caveStairs) { this.caveStairs.destroy(); this.caveStairs = null; }
        if (this.caveStairsHint) { this.caveStairsHint.destroy(); this.caveStairsHint = null; }
        const toRemove = [];
        this.children.list.forEach(child => {
            if (child.texture && child.texture.key === 'cave_stairs') toRemove.push(child);
        });
        toRemove.forEach(s => s.destroy());
    }

    /* ===== ZONE DELEGATION ===== */

    _setupZone(zoneName, ...args) {
        if (this.particles) this.particles.stopEnvironment();
        this.petTarget = null;
        if (this.currentZone) {
            this.currentZone.clear();
        }
        const zone = this.zones[zoneName];
        if (zone) {
            this.currentZone = zone;
            this.zone = zoneName;
            startZoneMusic(zoneName);
            if (zoneName === 'castle') {
                const savedFlags = {
                    castleBossDefeated: this.castleBossDefeated,
                    castleKeyObtained: this.castleKeyObtained,
                    castleRescued: this.castleRescued,
                    castleAtticUnlocked: this.castleAtticUnlocked,
                    castleQuestDone: this.castleQuestDone
                };
                zone.setup(...args);
                Object.assign(this, savedFlags);
            } else {
                zone.setup(...args);
            }
            if (this.multiplayer && this.mpSync) {
                this.mpSync.broadcastZoneChange(zoneName);
            }
        }
    }

    /* ===== COMBAT DELEGATION ===== */

    floatingText(x, y, text, color) { if (this.ui) this.ui.floatingText(x, y, text, color); }
    takeDamage(amount) { if (this.combat) this.combat.takeDamage(amount); }
    attack() { if (this.combat) this.combat.attack(); }
    hitEnemy(enemy, damage) { if (this.combat) this.combat.hitEnemy(enemy, damage); }
    killEnemy(enemy) { if (this.combat) this.combat.killEnemy(enemy); }
    killBoss() { if (this.combat) this.combat.killBoss(); }
    killMineBoss() { if (this.combat) this.combat.killMineBoss(); }
    killCaveBoss() { if (this.combat) this.combat.killCaveBoss(); }
    breakChest(ch) { if (this.combat) this.combat.breakChest(ch); }
    breakStump(stump) { if (this.combat) this.combat.breakStump(stump); }
    breakVillageChest(ch) { if (this.combat) this.combat.breakVillageChest(ch); }
    hitChest(ch, damage) { if (this.combat) this.combat.hitChest(ch, damage); }
    hitStump(stump, damage) { if (this.combat) this.combat.hitStump(stump, damage); }
    respawnPlayer() { if (this.combat) this.combat.respawnPlayer(); }

    /* ===== PLAYER DELEGATION ===== */

    addEquip(item) { return this.playerSys ? this.playerSys.addEquip(item) : false; }
    addMaterial(item) { return this.playerSys ? this.playerSys.addMaterial(item) : false; }
    addAccountEquip(item) { return this.playerSys ? this.playerSys.addAccountEquip(item) : false; }
    equipFromBag(idx) { if (this.playerSys) this.playerSys.equipFromBag(idx); }
    unequipItem(slot) { if (this.playerSys) this.playerSys.unequipItem(slot); }
    unequipAccountItem(slot) { if (this.playerSys) this.playerSys.unequipAccountItem(slot); }
    deleteItem(type, idx) { return this.playerSys ? this.playerSys.deleteItem(type, idx) : 0; }
    sellItem(type, idx) { return this.playerSys ? this.playerSys.sellItem(type, idx) : 0; }
    toggleLock(type, idx) { return this.playerSys ? this.playerSys.toggleLock(type, idx) : false; }
    recalcStats() { if (this.playerSys) this.playerSys.recalcStats(); }
    checkLevelUp() { if (this.playerSys) this.playerSys.checkLevelUp(); }
    _checkAccountLevelUp() { if (this.playerSys) this.playerSys._checkAccountLevelUp(); }
    getMaterialStatsText() { return this.playerSys ? this.playerSys.getMaterialStatsText() : 'No bonuses'; }
    getAccountEquipStatsText() { return this.playerSys ? this.playerSys.getAccountEquipStatsText() : 'No bonuses'; }

    /* ===== SPELL DELEGATION ===== */

    _castSpell(slot) { if (this.spellSys) this.spellSys._castSpell(slot); }
    _getClassSpells() { return this.spellSys ? this.spellSys._getClassSpells() : { q: 'fireball', w: 'shield', e: 'heal' }; }
    _updateCorruption() { if (this.spellSys) this.spellSys._updateCorruption(); }
    _updateSpells(delta) { if (this.spellSys) this.spellSys._updateSpells(delta); }

    /* ===== UI DELEGATION ===== */

    _createUI() { if (this.ui) this.ui._createUI(); }
    _createTopBar() { if (this.ui) this.ui._createTopBar(); }
    _toggleMute() { if (this.ui) this.ui._toggleMute(); }
    _openTalentTree() { if (this.ui) this.ui._openTalentTree(); }
    _openBestiary() { if (this.ui) this.ui._openBestiary(); }
    _openCrafting() { if (this.ui) this.ui._openCrafting(); }
    _openSpellAssign() { if (this.ui) this.ui._openSpellAssign(); }
    updateUI() { if (this.ui) this.ui.updateUI(); }
    toggleInventory() { if (this.ui) this.ui.toggleInventory(); }
    openInventory() { if (this.ui) this.ui.openInventory(); }
    closeInventory() { if (this.ui) this.ui.closeInventory(); }
    togglePause() { if (this.ui) this.ui.togglePause(); }
    openPause() { if (this.ui) this.ui.openPause(); }
    closePause() { if (this.ui) this.ui.closePause(); }
    _openPauseAdvanced() { if (this.ui) this.ui._openPauseAdvanced(); }
    _openAccountEquipOverlay() { if (this.ui) this.ui._openAccountEquipOverlay(); }
    _closeAccountEquipOverlay() { if (this.ui) this.ui._closeAccountEquipOverlay(); }
    _showItemTooltip(x, y, item) { if (this.ui) this.ui._showItemTooltip(x, y, item); }
    _hideItemTooltip() { if (this.ui) this.ui._hideItemTooltip(); }

    /* ===== NPC DELEGATION ===== */

    _spawnNPCs() { if (this.npc) this.npc.spawnNPCs(); }
    _updateQuestIcons() { if (this.npc) this.npc.updateQuestIcons(); }
    _checkNpcProximity() { if (this.npc) this.npc.checkNpcProximity(); }
    _interactWithNpc() { if (this.npc) this.npc.interactWithNpc(); }
    _startCartRide() { if (this.npc) this.npc.startCartRide(); }
    _openQuestLog() { if (this.npc) this.npc.openQuestLog(); }
    _closeQuestLog() { if (this.npc) this.npc.closeQuestLog(); }

    /* ===== ZONE ACTION DELEGATION ===== */

    _enterPortal() { if (this.zones.forest) this.zones.forest.enterPortal(); }
    _exitArena() { if (this.zones.arena) this.zones.arena.exitArena(); }
    _exitMine() { if (this.zones.mine) this.zones.mine.exitMine(); }
    _enterMineBossArena() { if (this.zones.mine) this.zones.mine.enterMineBossArena(); }
    _exitMineBossArena() { if (this.zones.mine) this.zones.mine.exitMineBossArena(); }
    _enterCaveVillage() { if (this.zones.cave) this.zones.cave.enterCaveVillage(); }
    _activateCampfire() { if (this.zones.village) this.zones.village._activateCampfire(); }
    _talkToChild() { if (this.zones.village) this.zones.village._talkToChild(); }
    _enterCemetery() { if (this.zones.village) this.zones.village._enterCemetery(); }
    _openShop() { if (this.zones.village) this.zones.village._openShop(); }
    _useInn() { if (this.zones.village) this.zones.village._useInn(); }
    _enterHell() { if (this.zones.hell) this.zones.hell.enterHell(); }
    _exitHell() { if (this.zones.hell) this.zones.hell.exitHell(); }
    _villageBossMeteor(boss) { if (this.zones.village) this.zones.village._villageBossMeteor(boss); }
    _villageBossSummonCorpses(boss) { if (this.zones.village) this.zones.village._villageBossSummonCorpses(boss); }
    _villageBossSplit(boss) { if (this.zones.village) this.zones.village._villageBossSplit(boss); }
    _killBossClone(clone) { if (this.zones.village) this.zones.village._killBossClone(clone); }
    _victoryHellBoss() { if (this.zones.hell) this.zones.hell.victoryHellBoss(); }
    _snowyIceSpiritDied() { if (this.zones.village) this.zones.village._snowyIceSpiritDied(); }
    _clearVillage() { if (this.zones.village) this.zones.village.clear(); }
    _setupVillage(frozen) { if (this.zones.village) this.zones.village.setup(frozen); }
    _makeEnemy(t, x, y) { if (this.combat) this.combat.makeEnemy(t, x, y); }
    _makeMineEnemy(t, x, y) { if (this.zones.mine) this.zones.mine.makeMineEnemy(t, x, y); }
    _drawEquippedPanel() { if (this.ui) this.ui._drawEquippedPanel(); }
    _drawMaterialsPanel() { if (this.ui) this.ui._drawMaterialsPanel(); }
    _drawEquipmentBagPanel() { if (this.ui) this.ui._drawEquipmentBagPanel(); }
    _drawCloseButton() { if (this.ui) this.ui._drawCloseButton(); }

    /* ===== SCENE RESUME ===== */

    receiveBestiaryData() {
        this.menuOpen = false;
        this.physics.resume();
        this.scene.resume();
        this.recalcStats();
    }

    receiveCraftData(materials) {
        this.materials = materials || this.materials;
        this.menuOpen = false;
        this.physics.resume();
        this.scene.resume();
        this.recalcStats();
    }

    receiveTalentData(data) {
        this.unlockedTalents = data.unlockedTalents || [];
        this.talentPoints = data.talentPoints || 0;
        this.talentEffects = getTalentEffects(this.unlockedTalents);
        this.unlockedAccountTalents = data.unlockedAccountTalents || [];
        this.accountTalentPoints = data.accountTalentPoints || 0;
        this.accountEffects = getAccountTalentEffects(this.unlockedAccountTalents);
        this.lockedBranches = data.lockedBranches || [];
        this.recalcStats();
        this.menuOpen = false;
        this.physics.resume();
    }

    /* ===== INPUT ===== */

    _bindKeys() {
        const binds = getKeybinds();
        const kb = this.input.keyboard;

        const resolveKey = (name) => {
            const code = parseKeyCode(binds[name]);
            return code !== null ? kb.addKey(code) : kb.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        };

        this.cursors = {
            left: resolveKey('move_left'),
            right: resolveKey('move_right'),
            up: resolveKey('move_up'),
            down: resolveKey('move_down')
        };
        this.spaceKey = resolveKey('attack');
        this.fKey = resolveKey('consumable');
        this.qKey = resolveKey('spell_q');
        this.wKey = resolveKey('spell_w');
        this.eKey = resolveKey('spell_e');
        this.rKey = resolveKey('spell_r');
        this.iKey = resolveKey('inventory');
        this.pKey = resolveKey('pause');
        this.tKey = resolveKey('talents');
        this.bKey = resolveKey('bestiary');
        this.nKey = resolveKey('quests');
        this.cKey = resolveKey('crafting');
        this.xKey = resolveKey('spell_assign');
        this.mKey = resolveKey('mute');
    }

    _handleInput() {
        const body = this.player.body;
        body.setVelocity(0);
        let isMoving = false;

        if (!this.menuOpen && !this.transitioning) {
            if (this.cursors.left.isDown) {
                body.setVelocityX(-this.playerSpeed);
                this.facing = 'left';
                isMoving = true;
            } else if (this.cursors.right.isDown) {
                body.setVelocityX(this.playerSpeed);
                this.facing = 'right';
                isMoving = true;
            }
            if (this.cursors.up.isDown) {
                body.setVelocityY(-this.playerSpeed);
                this.facing = 'up';
                isMoving = true;
            } else if (this.cursors.down.isDown) {
                body.setVelocityY(this.playerSpeed);
                this.facing = 'down';
                isMoving = true;
            }

            if (isMoving && !this.playerAttacking) {
                const cls = this.classData || getClassData(this.classKey);
                const walkAnim = cls.walkAnim || 'sage_walk_right';
                if (!this.player.anims.isPlaying || this.player.anims.currentAnim.key !== walkAnim) {
                    this.player.play(walkAnim);
                }
                this.player.setFlipX(this.facing === 'left');
            } else if (!isMoving && !this.playerAttacking) {
                this.player.stop();
                this.player.setFrame(0);
            }

            if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
                if (this.nearbyNpc) {
                    this._interactWithNpc();
                } else if (this.nearbyShop) {
                    this.zones.village._openShop();
                } else if (this.nearbyInn) {
                    this.zones.village._useInn();
                } else if (this.zone === 'forest') {
                    if (this.player.y < 100) {
                        this._enterPortal();
                    } else {
                        this.attack();
                    }
                } else if (this.zone === 'arena') {
                    if (this.player.y > 500) {
                        this._exitArena();
                    } else if (!this.bossDefeated) {
                        this.attack();
                    }
                } else if (this.zone === 'mine') {
                    if (this.player.y < 100) {
                        this._exitMine();
                    } else if (this.mineBossPortal && !this.mineBossDefeated && Phaser.Math.Distance.Between(
                        this.player.x, this.player.y, MINE_BOSS_PORTAL_POS.x, MINE_BOSS_PORTAL_POS.y
                    ) < 50) {
                        this._enterMineBossArena();
                    } else {
                        this.attack();
                    }
                } else if (this.zone === 'mine_boss') {
                    if (this.player.y > 500) {
                        this._exitMineBossArena();
                    } else if (!this.mineBossDefeated) {
                        this.attack();
                    }
                } else if (this.zone === 'meadow') {
                    this.zones.meadow.handleSpace();
                } else if (this.zone === 'cave') {
                    if (this.caveBossDefeated && this.caveStairs && Phaser.Math.Distance.Between(
                        this.player.x, this.player.y, this.caveStairs.x, this.caveStairs.y
                    ) < 50) {
                        this._enterCaveVillage();
                    } else {
                        this.attack();
                    }
                } else if (this.zone === 'village') {
                    if (this.villageFrozen && this.campfire && Phaser.Math.Distance.Between(
                        this.player.x, this.player.y, this.campfire.x, this.campfire.y
                    ) < 60) {
                        this._activateCampfire();
                    } else if (this.villageFrozen && this.snowyIceSpirit && Phaser.Math.Distance.Between(
                        this.player.x, this.player.y, this.snowyIceSpirit.x, this.snowyIceSpirit.y
                    ) < 80) {
                        this.attack();
                    } else if (!this.villageFrozen && this.villageAllCleared && this.villageChildNPC && Phaser.Math.Distance.Between(
                        this.player.x, this.player.y, this.villageChildNPC.x, this.villageChildNPC.y
                    ) < 50) {
                        this._talkToChild();
                    } else if (!this.villageFrozen && this.villageAllCleared && this.villageCemeteryGate && Phaser.Math.Distance.Between(
                        this.player.x, this.player.y, this.villageCemeteryGate.x, this.villageCemeteryGate.y
                    ) < 50) {
                        this._enterCemetery();
                    } else if (!this.villageFrozen && this.villageRestored && !this.villageThriving && !this.castleQuestDone && this.castleChildNPC && Phaser.Math.Distance.Between(
                        this.player.x, this.player.y, this.castleChildNPC.x, this.castleChildNPC.y
                    ) < 50) {
                        this.zones.village._talkToCastleChild();
                    } else {
                        this.attack();
                    }
                } else if (this.zone === 'cemetery') {
                    if (this.villageBossDefeated && this.hellPortal && Phaser.Math.Distance.Between(
                        this.player.x, this.player.y, this.hellPortal.x, this.hellPortal.y
                    ) < 60) {
                        this._enterHell();
                    } else {
                        this.attack();
                    }
                } else if (this.zone === 'hell') {
                    if (this.hellBossDefeated && this.hellReturnPortal && Phaser.Math.Distance.Between(
                        this.player.x, this.player.y, this.hellReturnPortal.x, this.hellReturnPortal.y
                    ) < 60) {
                        this._exitHell();
                    } else {
                        this.attack();
                    }
                } else         if (this.zone === 'castle') {
                    this.zones.castle.handleSpace();
                }
            }
            if (Phaser.Input.Keyboard.JustDown(this.iKey)) this.toggleInventory();
            if (Phaser.Input.Keyboard.JustDown(this.pKey)) this.togglePause();
            if (Phaser.Input.Keyboard.JustDown(this.tKey)) this._openTalentTree();
            if (Phaser.Input.Keyboard.JustDown(this.mKey)) this._toggleMute();
            if (Phaser.Input.Keyboard.JustDown(this.fKey)) {
                if (this.playerSys) this.playerSys.useConsumable();
            }
            const spells = this._getClassSpells();
            if (Phaser.Input.Keyboard.JustDown(this.qKey)) this._castSpell(spells.q);
            if (Phaser.Input.Keyboard.JustDown(this.wKey)) this._castSpell(spells.w);
            if (Phaser.Input.Keyboard.JustDown(this.eKey)) this._castSpell(spells.e);
            if (Phaser.Input.Keyboard.JustDown(this.rKey)) this._castSpell(spells.r);
            if (Phaser.Input.Keyboard.JustDown(this.bKey)) this._openBestiary();
            if (Phaser.Input.Keyboard.JustDown(this.nKey)) this._openQuestLog();
            if (Phaser.Input.Keyboard.JustDown(this.cKey)) this._openCrafting();
            if (Phaser.Input.Keyboard.JustDown(this.xKey)) this._openSpellAssign();
        } else if (this.invOpen) {
            if (Phaser.Input.Keyboard.JustDown(this.iKey)) this.closeInventory();
            if (Phaser.Input.Keyboard.JustDown(this.pKey)) this.closeInventory();
        }
    }

    /* ===== GAME LOOP ===== */

    update(time, delta) {
        this._handleInput();
        this._updateEnemies();
        this.forestBossAI.update(time, delta);
        this._updateCorruption();
        this._updateSpells(delta);
        this._updateConsumableBonuses(delta);
        this.petSys.updateFollow();
        this.petSys.updateCombat(delta);

        if (this.currentZone) {
            this.currentZone.update(time, delta);
        }

        this.updateUI();
        this._checkNpcProximity();

        if (this.multiplayer) {
            this._mpSendTimer += delta;
            if (this._mpSendTimer >= 50) {
                this._mpSendTimer = 0;
                if (isHost()) {
                    this._broadcastState();
                } else {
                    this._sendInputToHost();
                }
            }
            this._mpMobTimer += delta;
            if (this._mpMobTimer >= 100) {
                this._mpMobTimer = 0;
                if (this.mpSync) {
                    if (!isHost()) {
                        this.mpSync.broadcastPlayerUpdate();
                    }
                }
            }
            if (this.mpSync && isHost()) {
                this._detectMobKills();
            }
            if (isHost()) {
                const netPlayers = getPlayers();
                Object.keys(this._remotePlayers).forEach(id => {
                    if (netPlayers[id] && this._remotePlayers[id]) {
                        this._remotePlayers[id].sprite.x = netPlayers[id].x;
                        this._remotePlayers[id].sprite.y = netPlayers[id].y;
                        if (netPlayers[id].facing) {
                            this._remotePlayers[id].sprite.setFlipX(netPlayers[id].facing === 'left');
                        }
                    }
                });
            }
            Object.values(this._remotePlayers).forEach(rp => {
                if (rp.nameText) {
                    rp.nameText.x = rp.sprite.x;
                    rp.nameText.y = rp.sprite.y - 28;
                }
            });
            if (this.mpSync) {
                this.mpSync.update(delta);
            }
        }
    }

    _updateEnemies() {
        if (!this.enemies) return;
        this.enemies.getChildren().forEach(e => {
            if (!e.active || !e.stats) return;
            if (e === this.villageBoss) return;

            if (!this.bestiarySeen[e.stats.key]) {
                recordEncounter(e.stats.key);
                this.bestiarySeen[e.stats.key] = true;
            }

            e.hpBg.x = e.x;
            e.hpBg.y = e.y - e.stats.bh / 2 - 8;
            e.hpFill.x = e.x;
            e.hpFill.y = e.hpBg.y;

            if (this.menuOpen || this.transitioning) {
                e.body.setVelocity(0);
                return;
            }

            if (e.stats.isBossClone) {
                const dx = this.player.x - e.x;
                const dy = this.player.y - e.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const spd = e.stats.speed || 60;
                if (dist > 16) {
                    const chaseSpd = dist < 80 ? spd * 1.4 : spd;
                    e.body.setVelocity((dx / dist) * chaseSpd, (dy / dist) * chaseSpd);
                    e.setFlipX(dx < 0);
                } else {
                    e.body.setVelocity(0);
                }

                if (this.anims.exists('purple_demon_walk_anim') && !e.anims.isPlaying) {
                    e.play('purple_demon_walk_anim');
                }

                e.stats.meteorTimer += this.game.loop.delta;
                if (e.stats.meteorTimer >= e.stats.meteorInterval) {
                    e.stats.meteorTimer = 0;
                    this._villageBossMeteor(e);
                }

                e.stats.corpseTimer += this.game.loop.delta;
                if (e.stats.corpseTimer >= e.stats.corpseInterval) {
                    e.stats.corpseTimer = 0;
                    this._villageBossSummonCorpses(e);
                }

                if (e.hpFill) {
                    e.hpFill.width = e.hpBg.width * (e.stats.hp / e.stats.maxHp);
                }
            } else {
                e.stats.wTimer++;
                if (e.stats.wTimer > 60) {
                    e.stats.wTimer = 0;
                    e.stats.wDir = Math.floor(Math.random() * 5);
                }
                const sp = 50;
                if (e.stats.wDir === 1) e.body.setVelocityX(-sp);
                else if (e.stats.wDir === 2) e.body.setVelocityX(sp);
                else if (e.stats.wDir === 3) e.body.setVelocityY(-sp);
                else if (e.stats.wDir === 4) e.body.setVelocityY(sp);
                else e.body.setVelocity(0);

                const isMoving = e.stats.wDir !== 0;
                if (isMoving && e.walkAnimKey) {
                    if (!e.anims.isPlaying || e.anims.currentAnim.key !== e.walkAnimKey) {
                        e.play(e.walkAnimKey);
                    }
                    e.setFlipX(e.body.velocity.x < 0);
                } else if (!isMoving) {
                    e.stop();
                    e.setFrame(0);
                }
            }
        });
    }
}
