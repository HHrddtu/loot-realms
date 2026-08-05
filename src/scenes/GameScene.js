import Phaser from 'phaser';
import {
    DIFF_MULT, MATERIAL_SLOTS, EQUIP_BAG_SLOTS, ACCOUNT_EQUIP_BAG_SLOTS, EMPTY_ACCOUNT_EQUIPMENT,
    CORRUPTION,
    GAME_WIDTH, GAME_HEIGHT
} from '../config/index.js';
import { stopMusic, startZoneMusic } from '../sound.js';
import { loadAccount, saveAccount } from '../save.js';
import { getClassData, getClassStats } from '../classes.js';
import { getTalentEffects } from '../talents.js';
import { getAccountTalentEffects } from '../accountTalents.js';
import { initBestiary, recordEncounter } from '../bestiary.js';
import { initMaterialBook } from '../materialBook.js';
import { initSoulBook } from '../soulBook.js';
import { initQuests, onExplore, setGameScene } from '../quests.js';
import { MAP_CHAPTERS } from '../config/mapData.js';
import { CombatSystem } from '../systems/CombatSystem.js';
import { CombatFacade } from '../systems/CombatFacade.js';
import { PlayerSystem } from '../systems/PlayerSystem.js';
import { SpellSystem } from '../systems/SpellSystem.js';
import { UISystem } from '../systems/UISystem.js';
import { NpcSystem } from '../systems/NpcSystem.js';
import { ParticleSystem } from '../systems/ParticleSystem.js';
import { PetSystem } from '../systems/PetSystem.js';
import { SaveLoadSystem } from '../systems/SaveLoadSystem.js';
import { InputSystem } from '../systems/InputSystem.js';
import { LootDistributor } from '../systems/LootDistributor.js';
import { PrestigeSystem } from '../systems/PrestigeSystem.js';
import { TutorialManager } from '../systems/TutorialManager.js';
import { LoreItemSystem } from '../systems/LoreItemSystem.js';
import { ForestBossAI } from '../systems/ForestBossAI.js';
import { EnemyAI } from '../systems/EnemyAI.js';
import { ForestZone } from '../zones/ForestZone.js';
import { ArenaZone } from '../zones/ArenaZone.js';
import { MineZone } from '../zones/MineZone.js';
import { CaveZone } from '../zones/CaveZone.js';
import { VillageZone } from '../zones/VillageZone.js';
import { HellZone } from '../zones/HellZone.js';
import { DepthsZone } from '../zones/DepthsZone.js';
import { CursedZone } from '../zones/CursedZone.js';
import { ShadowZone } from '../zones/ShadowZone.js';
import { TowerZone } from '../zones/TowerZone.js';
import { ThroneZone } from '../zones/ThroneZone.js';
import { SnowyZone } from '../zones/SnowyZone.js';
import { CastleZone } from '../zones/CastleZone.js';
import { MeadowZone } from '../zones/MeadowZone.js';
import { CRYSTAL_RUN_CAPS } from '../config/pets.js';
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
        this.combatFacade = new CombatFacade(this);
        this.playerSys = new PlayerSystem(this);
        this.spellSys = new SpellSystem(this);
        this.ui = new UISystem(this);
        this.npc = new NpcSystem(this);
        this.particles = new ParticleSystem(this);
        this.particles.init();
        this.petSys = new PetSystem(this);
        this.saveLoad = new SaveLoadSystem(this);
        this.inputSys = new InputSystem(this);
        this.lootDist = new LootDistributor(this);
        this.prestigeSys = new PrestigeSystem(this);
        this.tutorialMgr = new TutorialManager(this);
        this.loreItems = new LoreItemSystem(this);
        this.forestBossAI = new ForestBossAI(this);

        this.zones = {
            forest: new ForestZone(this),
            arena: new ArenaZone(this),
            mine: new MineZone(this),
            cave: new CaveZone(this),
            village: new VillageZone(this),
            hell: new HellZone(this),
            depths: new DepthsZone(this),
            cursed: new CursedZone(this),
            shadow: new ShadowZone(this),
            tower: new TowerZone(this),
            throne: new ThroneZone(this),
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
        this.inputSys.bindKeys();

        if (this.cameras.main.postFX) {
            this.cameras.main.postFX.addBloom(0xffffff, 0.5, 0.4, 0.1, 0.3);
        }

        this.events.on('resume', () => {
            this.inputSys.bindKeys();
        });

        this.invOpen = false;
        this.invGroup = [];
        this._tooltipGroup = [];
        this.cartDriverNpc = null;
        this.meadowGate = null;
        this.meadowBg = null;
        this.gateArrow = null;
        this.gateGlow = null;
        this.portalArrow = null;
        this._meadowSwordGiven = false;
        this._guidedReadyAt = 0;

        initBestiary();
        initMaterialBook();
        initSoulBook();
        initQuests();
        setGameScene(this);
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
        this._consumableBonusKeys = [
            ['_consumableBonusDmgTimer', '_consumableBonusDmg', 'DMG boost expired'],
            ['_consumableBonusSpdTimer', '_consumableBonusSpd', 'SPD boost expired'],
            ['_consumableBonusDefTimer', '_consumableBonusDef', 'DEF boost expired'],
            ['_consumableBonusCritTimer', '_consumableBonusCrit', 'Crit boost expired'],
            ['_consumableBonusLifestealTimer', '_consumableBonusLifesteal', 'Lifesteal expired']
        ];
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

        // Account data already loaded in _initStats()
        this.recalcStats();

        if (this.loadOnStart) this.doLoad();

        if (this.loadOnStart && this._savedZone) {
            if (this._savedZone === 'mine') {
                this._setupZone('mine');
            } else if (this._savedZone === 'cave') {
                this._setupZone('cave');
            } else if (this._savedZone === 'meadow') {
                this._setupZone('forest');
            } else if (this._savedZone === 'village') {
                this._setupZone('village', this.zones.village.isFrozen);
            } else if (this._savedZone === 'cemetery') {
                this._setupZone('village', false);
                this.zone = 'cemetery';
                startZoneMusic('cemetery');
            } else if (this._savedZone === 'hell') {
                this._setupZone('hell');
            } else if (this._savedZone === 'depths') {
                this._setupZone('depths');
            } else if (this._savedZone === 'cursed') {
                this._setupZone('cursed');
            } else if (this._savedZone === 'shadow') {
                this._setupZone('shadow');
            } else if (this._savedZone === 'tower') {
                this._setupZone('tower');
            } else if (this._savedZone === 'throne') {
                this._setupZone('throne');
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
            this._setupZone('meadow');
        }

        if (this.multiplayer) {
            import('../systems/MultiplayerManager.js').then(({ MultiplayerManager }) => {
                this.mpManager = new MultiplayerManager(this);
                this.mpManager.setup();
                this.mpSync = this.mpManager.mpSync;
            }).catch(err => console.error('Multiplayer init failed:', err));
        }

        this.events.on('shutdown', () => {
            if (this._onBeforeUnload) {
                window.removeEventListener('beforeunload', this._onBeforeUnload);
                this._onBeforeUnload = null;
            }
            if (this.particles) { this.particles.destroy(); this.particles = null; }
            if (this.petSys) { this.petSys.destroy(); this.petSys = null; }
            this.doSave();
            stopMusic();
            if (this.multiplayer) {
                this._cleanupMultiplayer();
                this._synergyDmgBuff = 0;
                this._synergyDmgTimer = 0;
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

    /* ===== LOOT DELEGATION ===== */

    _applyLoot(lootData) { this.lootDist.applyLoot(lootData); }
    _distributeLoot(lootData, targetPeerId) { this.lootDist.distributeLoot(lootData, targetPeerId); }
    _lootDataToPayload(lootData) { return this.lootDist._lootDataToPayload(lootData); }

    _onMultiplayerGameOver(data) {
        if (this._multiplayerGameOverHandled) return;
        this._multiplayerGameOverHandled = true;
        const reason = (data && data.reason) || 'unknown';
        this._exitToMenu('Multiplayer ended: ' + reason);
    }

    _onMultiplayerDisconnect(reason) {
        if (this._multiplayerGameOverHandled) return;
        this._multiplayerGameOverHandled = true;
        this._exitToMenu('Disconnected: ' + (reason || 'unknown'));
    }

    _exitToMenu(message) {
        const s = this;
        try {
            if (s.mpSync && s.mpSync.cleanup) s.mpSync.cleanup();
        } catch (e) { /* ignore */ }
        try {
            if (s.mpManager && s.mpManager.cleanup) s.mpManager.cleanup();
        } catch (e) { /* ignore */ }
        try {
            if (message && s.cameras && s.cameras.main && s.cameras.main.flash) {
                s.cameras.main.flash(200, 60, 30, 30);
            }
        } catch (e) { /* ignore */ }
        s.time.delayedCall(400, () => {
            import('../network.js').then(({ disconnect }) => { try { disconnect(); } catch (e) { /* ignore */ } });
            s.scene.start('Menu');
        });
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
        this._synergyDmgBuff = 0;
        this._synergyDmgTimer = 0;
        this.playerAttacking = false;
        this.facing = 'right';
        this.invincible = false;
        this.isDodging = false;
        this.dodgeCooldown = false;
        this.isDowned = false;
        this.downedTimer = 0;
        this.menuOpen = false;
        this.kills = 0;
        this.stumpsBroken = 0;
        this.deaths = 0;
        this.tutorialSeen = {};
        this.talentEffects = getTalentEffects([]);

        const acc = loadAccount() || {};
        this.accountLevel = acc.accountLevel || 1;
        this.accountExp = acc.accountExp || 0;
        this.accountTalentPoints = acc.accountTalentPoints || 0;
        this.unlockedAccountTalents = acc.unlockedAccountTalents || [];
        this.accountEffects = getAccountTalentEffects(this.unlockedAccountTalents);
        this.upgradeLevels = acc.upgradeLevels || {};
        this.activeBoosts = acc.activeBoosts || {};

        // Load account equipment per class
        const accEquipPerClass = acc.accountEquipment || {};
        const accBagPerClass = acc.accountEquipBag || {};
        this.accountEquipment = accEquipPerClass[this.classKey] || { ...EMPTY_ACCOUNT_EQUIPMENT };
        this.accountEquipBag = accBagPerClass[this.classKey] || [];
        this.spellAssignments = acc.spellAssignments || {};

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

    doSave() { this.saveLoad.doSave(); if (this.ui && this.ui.hud) this.ui.hud.showSaveIndicator(); }
    doLoad() { return this.saveLoad.doLoad(); }
    getAggroTarget() { return this.petSys.getAggroTarget(); }
    _makeEnemy(t, x, y) { this.combat.makeEnemy(t, x, y); }
    _makeMineEnemy(t, x, y) { if (this.zones.mine) this.zones.mine.makeMineEnemy(t, x, y); }
    _villageBossSplit(boss) { if (this.zones.village) this.zones.village.boss.splitBoss(boss); }
    _killBossClone(clone) { if (this.zones.village) this.zones.village.boss.killBossClone(clone); }
    _victoryHellBoss() { if (this.zones.hell) this.zones.hell.victoryHellBoss(); }
    _victoryDepthsBoss() { if (this.zones.depths) this.zones.depths.victoryDepthsBoss(); }
    _victoryCursedBoss() { if (this.zones.cursed) this.zones.cursed.victoryCursedBoss(); }
    _victoryShadowBoss() { if (this.zones.shadow) this.zones.shadow.victoryShadowBoss(); }
    _victoryTowerBoss() { if (this.zones.tower) this.zones.tower.victoryTowerBoss(); }
    _victoryThroneBoss() { if (this.zones.throne) this.zones.throne.victoryThroneBoss(); }
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
        for (const [timerKey, valueKey, label] of this._consumableBonusKeys) {
            if (this[timerKey] > 0) {
                this[timerKey] -= delta;
                if (this[timerKey] <= 0) {
                    this[valueKey] = 0;
                    this.floatingText(this.player.x, this.player.y - 30, label, '#95a5a6');
                }
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

    _getChapterForZone(zoneName) {
        for (const ch of MAP_CHAPTERS) {
            if (ch.zones.some(z => z.key === zoneName)) return ch;
        }
        return null;
    }

    _hasItem(itemId) {
        if (this.equipBag?.some(i => i.id === itemId)) return true;
        if (this.materials?.some(m => m.id === itemId)) return true;
        if (this.accountEquipBag?.some(i => i.id === itemId)) return true;
        for (const slot of ['weapon', 'armor', 'accessory']) {
            if (this.equipment[slot]?.id === itemId) return true;
        }
        return false;
    }

    _setupZone(zoneName, ...args) {
        if (this.particles) this.particles.stopEnvironment();
        this.petTarget = null;
        if (this.currentZone) {
            this.currentZone.clear();
        }
        const zone = this.zones[zoneName];
        if (zone) {
            // Zone gating: check if chapter requires an item
            const chapter = (zoneName === 'forest' || zoneName === 'arena' || zoneName === 'mine') ? null : this._getChapterForZone(zoneName);
            const required = chapter && chapter.requireItem;
            if (required && !this._hasItem(required)) {
                const itemName = required.replace(/_/g, ' ');
                this.floatingText(this.player.x, this.player.y - 30, 'Need: ' + itemName, '#e74c3c');
                return;
            }
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
            if (zone.spawnObstacles) zone.spawnObstacles();
            this.tutorialMgr.cleanupZoneIntro();
            onExplore(zoneName);
            this.tutorialMgr.showZoneIntro(zoneName);
            this.tutorialMgr.showZoneTutorial(zoneName);
            if (this.prestigeSys) this.prestigeSys.applyZoneModifiers(zoneName);
        }
    }

    /* ===== COMBAT DELEGATION ===== */

    floatingText(x, y, text, color) { if (this.ui) this.ui.floatingText(x, y, text, color); }
    takeDamage(amount) { this.combatFacade.takeDamage(amount); }
    attack() { this.combatFacade.attack(); }

    /* ===== INPUT DELEGATION ===== */

    _bindKeys() { this.inputSys.bindKeys(); }
    _handleInput() { this.inputSys.handleInput(); }
    _handleActionKeys() { this.inputSys.handleActionKeys(); }
    dodgeRoll() { this.inputSys.dodgeRoll(); }
    _tryReviveAlly() { return this.inputSys._tryReviveAlly(); }

    _guestAttack() { this.combatFacade._guestAttack(); }
    hitEnemy(enemy, damage, opts) { this.combatFacade.hitEnemy(enemy, damage, opts); }
    killEnemy(enemy) { this.combatFacade.killEnemy(enemy); }
    killBoss() { this.combatFacade.killBoss(); }
    killMineBoss() { this.combatFacade.killMineBoss(); }
    killCaveBoss() { this.combatFacade.killCaveBoss(); }
    breakChest(ch, opts) { this.combatFacade.breakChest(ch, opts); }
    breakStump(stump, opts) { this.combatFacade.breakStump(stump, opts); }
    breakVillageChest(ch, opts) { this.combatFacade.breakVillageChest(ch, opts); }
    hitChest(ch, damage, opts) { this.combatFacade.hitChest(ch, damage, opts); }
    hitStump(stump, damage) { this.combatFacade.hitStump(stump, damage); }
    respawnPlayer() { this.combatFacade.respawnPlayer(); }

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
    _updateCorruption(delta) { if (this.spellSys) this.spellSys._updateCorruption(delta); }
    _updateSpells(delta) { if (this.spellSys) this.spellSys._updateSpells(delta); }

    /* ===== UI DELEGATION ===== */

    addPet(petId) {
        const acc = loadAccount() || {};
        if (!acc.ownedPets) acc.ownedPets = [];
        if (!acc.ownedPets.includes(petId)) acc.ownedPets.push(petId);
        saveAccount(acc);
        this.floatingText(this.player.x, this.player.y - 40, 'Pet unlocked!', '#9b59b6');
    }
    increaseSlots(amount) {
        this.maxMaterials = (this.maxMaterials || 10) + amount;
        this.floatingText(this.player.x, this.player.y - 40, '+' + amount + ' material slot', '#f1c40f');
    }
    unlockVendor(vendorId) {
        this._vendorUnlocked = this._vendorUnlocked || {};
        this._vendorUnlocked[vendorId] = true;
        this.floatingText(this.player.x, this.player.y - 40, vendorId + ' unlocked!', '#2ecc71');
    }

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
    _openMap() { if (!this.menuOpen && !this.transitioning) { this.scene.launch('Map'); this.menuOpen = true; this.physics.pause(); } }
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
        this.scene.wake();
        this.recalcStats();
    }

    receiveCraftData(materials) {
        this.materials = materials || this.materials;
        this.menuOpen = false;
        this.physics.resume();
        this.scene.wake();
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

    _checkSpikeDamage(delta) {
        if (!this.obstacles || this.menuOpen || this.transitioning) return;
        this._spikeTimer = (this._spikeTimer || 0) - delta;
        if (this._spikeTimer > 0) return;
        this._spikeTimer = 500;
        this.obstacles.getChildren().forEach(obs => {
            if (!obs.active || obs.texture?.key !== 'obstacle_spike') return;
            if (Phaser.Math.Distance.Between(this.player.x, this.player.y, obs.x, obs.y) < 18) {
                this.combat.takeDamage(5);
                this.floatingText(this.player.x, this.player.y - 30, '-5 SPIKE', '#ff4444');
            }
        });
    }

    /* ===== GAME LOOP ===== */

    update(time, delta) {
        if (this.menuOpen) return;
        if (this.playerSys) this.playerSys.resetStatsRecalcFlag();
        this._handleInput();
        if (this.isDowned) {
            this.downedTimer -= delta;
            if (this.downedTimer <= 0) {
                this.isDowned = false;
                this.combat.respawnPlayer();
            }
        }
        this._updateEnemies();
        if (this.tutorialMgr) this.tutorialMgr.updateGuided();
        if (this._poisonDot && this._poisonTimer > 0) {
            this._poisonTimer -= delta;
            if (this._poisonTimer <= 0) {
                this._poisonDot = false;
                if (this.player && this.player.active) this.player.clearTint();
            } else if (this.game.loop.frame % 30 === 0) {
                this.combat.takeDamage(3);
                this.floatingText(this.player.x, this.player.y - 20, '-3 POISON', '#27ae60');
            }
        }
        if (this._synergyDmgBuff && this._synergyDmgTimer > 0) {
            this._synergyDmgTimer -= delta;
            if (this._synergyDmgTimer <= 0) {
                this._synergyDmgBuff = 0;
            }
        }
        this.forestBossAI.update(time, delta);
        this._updateCorruption(delta);
        this._updateSpells(delta);
        this._updateConsumableBonuses(delta);
        this._updateRegen(delta);
        this._checkSpikeDamage(delta);
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
                this.tutorialMgr.showEnemyTutorial(e.stats);
            }

            try { EnemyAI.updateWanderChase(e, this.player, this); } catch (e2) {}
        });
    }

}
