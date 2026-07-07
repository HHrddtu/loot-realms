import Phaser from 'phaser';
import {
    DIFF_MULT, MATERIAL_SLOTS, EQUIP_BAG_SLOTS, ACCOUNT_EQUIP_BAG_SLOTS, EMPTY_ACCOUNT_EQUIPMENT,
    CORRUPTION,
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
import { EnemyAI } from '../systems/EnemyAI.js';
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
import { MultiplayerManager } from '../systems/MultiplayerManager.js';
import { CRYSTAL_RUN_CAPS, canGetCrystals } from '../config/pets.js';
import { getKeybinds, parseKeyCode } from '../keybinds.js';
import { createAllAnimations } from '../config/animations.js';


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

        this.defeatedText = null;
        this.defeatedLoot = null;

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
        this.zones.mine.isUnlocked = false;
        this.zones.mine.hasSecretKey = false;
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
        this.lockedBranches = [];
        this._loadAccountTalents = () => this.saveLoad.loadAccountTalents();
        this._loadAccountTalents();

        this.corruption = 0;
        this.corruptionMax = this.classStats ? this.classStats.corruptionMax : CORRUPTION.max;

        this.spellCooldowns = this.spellSys.cast.cooldowns;
        this.shieldActive = false;
        this.shieldHP = 0;
        this.shieldTimer = 0;
        this.lifeLinkActive = false;
        this.lifeLinkTimer = 0;
        this.lifeLinkHealPerSec = 0;
        this.fireballs = [];
        this.enemyProjectiles = [];
        this.villageMerchantNPC = null;
        this.villageMerchantHint = null;
        this.villageInn = null;
        this.villageInnHint = null;
        this.shopGroup = [];
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
        this.mpManager = null;

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
                this._setupZone('meadow');
            } else if (this._savedZone === 'village') {
                this._setupZone('village', this.zones.village.isFrozen);
            } else if (this._savedZone === 'cemetery') {
                this._setupZone('village', false);
                this.zone = 'cemetery';
                startZoneMusic('cemetery');
            } else if (this._savedZone === 'hell') {
                this._setupZone('hell');
            } else if (this._savedZone === 'snowy') {
                this._setupZone('village', true);
                startZoneMusic('snowy');
            } else if (this._savedZone === 'castle') {
                this._setupZone('castle', this.zones.castle.currentRoom || 0);
            } else {
                this._setupZone('forest');
            }
            delete this._savedZone;
        } else {
            this._setupZone('forest');
        }

        if (this.multiplayer) {
            this.mpManager = new MultiplayerManager(this);
            this.mpManager.setup();
            this.mpSync = this.mpManager.mpSync;
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
        createAllAnimations(this.anims);
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

    _cleanupMultiplayer() {
        if (this.mpManager) {
            this.mpManager.cleanup();
            this.mpManager = null;
        }
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
    getAggroTarget() { return this.petSys.getAggroTarget(); }
    _makeEnemy(t, x, y) { this.combat.makeEnemy(t, x, y); }
    _makeMineEnemy(t, x, y) { if (this.zones.mine) this.zones.mine.makeMineEnemy(t, x, y); }
    _villageBossSplit(boss) { if (this.zones.village) this.zones.village.boss.splitBoss(boss); }
    _killBossClone(clone) { if (this.zones.village) this.zones.village.boss.killBossClone(clone); }
    _victoryHellBoss() { if (this.zones.hell) this.zones.hell.victoryHellBoss(); }
    _snowyIceSpiritDied() { if (this.zones.village) this.zones.village.boss.iceSpiritDied(); }
    _setupVillage(frozen) {
        if (!this.zones.village) return;
        this.zones.village.setup(frozen);
        this.currentZone = this.zones.village;
        this.zone = 'village';
    }
    _clearVillage() { if (this.zones.village) this.zones.village._destroyZoneSpecific(); }

    _updateRegen(delta) {
        if (!this.player || this.playerHP <= 0 || this.playerHP >= this.playerMaxHP) return;
        this._regenTimer = (this._regenTimer || 0) + delta;
        if (this._regenTimer >= 1000) {
            this._regenTimer -= 1000;
            const flat = this.computedRegenFlat || 0;
            const pct = this.computedRegenPercent || 0;
            const heal = Math.floor(flat + (this.playerMaxHP * pct / 100));
            if (heal > 0) {
                this.playerHP = Math.min(this.playerMaxHP, this.playerHP + heal);
            }
        }
    }

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
                    castleBossDefeated: this.zones.castle.bossDefeated,
                    castleKeyObtained: this.zones.castle.keyObtained,
                    castleRescued: this.zones.castle.rescued,
                    castleAtticUnlocked: this.zones.castle.atticUnlocked,
                    castleQuestDone: this.zones.castle.questDone
                };
                zone.setup(...args);
                Object.assign(this.zones.castle, savedFlags);
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
        this.doSave();
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
            // Movement
            const moveMap = [
                [this.cursors.left, 'left', -1, 0],
                [this.cursors.right, 'right', 1, 0],
                [this.cursors.up, 'up', 0, -1],
                [this.cursors.down, 'down', 0, 1],
            ];
            for (const [key, dir, dx, dy] of moveMap) {
                if (key.isDown) {
                    body.setVelocityX(dx * this.playerSpeed);
                    body.setVelocityY(dy * this.playerSpeed);
                    this.facing = dir;
                    isMoving = true;
                }
            }

            // Walk animation
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

            // Action keys
            this._handleActionKeys();
        } else if (this.invOpen) {
            if (Phaser.Input.Keyboard.JustDown(this.iKey)) this.closeInventory();
            if (Phaser.Input.Keyboard.JustDown(this.pKey)) {
                this.closeInventory();
                this.togglePause();
            }
        }
    }

    _handleActionKeys() {
        const JustDown = Phaser.Input.Keyboard.JustDown;

        // SPACE: zone > npc > attack
        if (JustDown(this.spaceKey)) {
            if (this.currentZone && typeof this.currentZone.handleSpace === 'function') {
                this.currentZone.handleSpace();
            } else if (this.nearbyNpc) {
                this._interactWithNpc();
            } else {
                this.attack();
            }
        }

        // UI keys
        if (JustDown(this.iKey)) this.toggleInventory();
        if (JustDown(this.pKey)) this.togglePause();
        if (JustDown(this.tKey)) this._openTalentTree();
        if (JustDown(this.mKey)) this._toggleMute();
        if (JustDown(this.fKey) && this.playerSys) this.playerSys.useConsumable();
        if (JustDown(this.bKey)) this._openBestiary();
        if (JustDown(this.nKey)) this._openQuestLog();
        if (JustDown(this.cKey)) this._openCrafting();
        if (JustDown(this.xKey)) this._openSpellAssign();

        // Spell keys
        const spells = this._getClassSpells();
        if (JustDown(this.qKey)) this._castSpell(spells.q);
        if (JustDown(this.wKey)) this._castSpell(spells.w);
        if (JustDown(this.eKey)) this._castSpell(spells.e);
        if (JustDown(this.rKey)) this._castSpell(spells.r);
    }

    /* ===== GAME LOOP ===== */

    update(time, delta) {
        if (this.playerSys) this.playerSys.resetStatsRecalcFlag();
        this._handleInput();
        this._updateEnemies();
        this.forestBossAI.update(time, delta);
        this._updateCorruption();
        this._updateSpells(delta);
        this._updateConsumableBonuses(delta);
        this._updateRegen(delta);
        this.petSys.updateFollow();
        this.petSys.updateCombat(delta);

        if (this.currentZone) {
            this.currentZone.update(time, delta);
        }

        this.updateUI();
        this._checkNpcProximity();

        if (this.multiplayer && this.mpManager) {
            this.mpManager.update(delta);
        }
    }

    _updateEnemies() {
        if (!this.enemies) return;
        let children;
        try { children = this.enemies.getChildren(); } catch (e) { return; }
        children.forEach(e => {
            if (!e.active || !e.stats) return;
            if (e.stats.isBossClone) return;
            if (e === this.villageBoss || e === this.hellBoss || e === this.boss || e === this.mineBoss || e === this.caveBoss || e === this.castleBoss || e === this.snowyIceSpirit) return;

            if (!this.bestiarySeen[e.stats.key]) {
                try { recordEncounter(e.stats.key); } catch (e2) {}
                this.bestiarySeen[e.stats.key] = true;
            }

            try { EnemyAI.updateWanderChase(e, this.player, this); } catch (e2) {}
        });
    }
}
