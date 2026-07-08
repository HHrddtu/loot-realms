import {
    sendMobSync, sendBossUpdate, sendChestOpened, sendLootCollected,
    sendMobUpdate, sendPlayerUpdate, sendZoneChange, sendBossKilled,
    onMobSync, onBossUpdate, onChestOpened, onLootCollected,
    onMobUpdate, onPlayerUpdate, onZoneChange, onBossKilled,
    isHost, getMyId, getPlayers
} from './network.js';

export class MultiplayerSync {
    constructor(scene) {
        this.scene = scene;
        this.mobSyncData = {};
        this.remotePlayers = {};
        this.remoteZones = {};
        this.mobIdCounter = 0;
        this._mobSyncInterval = null;
        this._registerHandlers();
    }

    _registerHandlers() {
        onMobSync((data) => this._handleMobSync(data));
        onBossUpdate((data) => this._handleBossUpdate(data));
        onChestOpened((data) => this._handleChestOpened(data));
        onLootCollected((data) => this._handleLootCollected(data));
        onMobUpdate((data) => this._handleMobUpdate(data));
        onPlayerUpdate((data) => this._handlePlayerUpdate(data));
        onZoneChange((data) => this._handleZoneChange(data));
        onBossKilled((data) => this._handleBossKilled(data));
    }

    cleanup() {
        if (this._mobSyncInterval) {
            clearInterval(this._mobSyncInterval);
            this._mobSyncInterval = null;
        }
        Object.keys(this.mobSyncData).forEach(id => {
            const m = this.mobSyncData[id];
            if (m.sprite) m.sprite.destroy();
            if (m.hpBg) m.hpBg.destroy();
            if (m.hpFill) m.hpFill.destroy();
        });
        this.mobSyncData = {};
    }

    _handleMobSync(data) {
        if (!data || !data.mobs) return;
        data.mobs.forEach(mobData => {
            const existing = this.mobSyncData[mobData.id];
            if (existing) {
                if (existing.sprite && existing.sprite.active) {
                    existing.sprite.x = mobData.x;
                    existing.sprite.y = mobData.y;
                    if (existing.hpBg) {
                        existing.hpBg.x = mobData.x;
                        existing.hpBg.y = mobData.y - 20;
                    }
                    if (existing.hpFill) {
                        existing.hpFill.x = mobData.x;
                        existing.hpFill.y = mobData.y - 20;
                        existing.hpFill.width = 24 * (mobData.hp / mobData.maxHp);
                    }
                }
                existing.hp = mobData.hp;
                existing.maxHp = mobData.maxHp;
            } else {
                this._createClientMob(mobData);
            }
        });

        const seenIds = new Set(data.mobs.map(m => m.id));
        Object.keys(this.mobSyncData).forEach(id => {
            if (!seenIds.has(id)) {
                const m = this.mobSyncData[id];
                if (m.sprite) m.sprite.destroy();
                if (m.hpBg) m.hpBg.destroy();
                if (m.hpFill) m.hpFill.destroy();
                delete this.mobSyncData[id];
            }
        });
    }

    _handleBossUpdate(data) {
        if (!data) return;
        const s = this.scene;
        const boss = s.boss || s.mineBoss || s.caveBoss || s.villageBoss || s.hellBoss || s.snowyIceSpirit || s.castleBoss;
        if (boss && boss.active && boss.stats) {
            boss.stats.hp = data.hp;
            boss.stats.maxHp = data.maxHp;
            if (data.phase) boss.stats.phase = data.phase;
            if (data.x !== undefined) boss.x = data.x;
            if (data.y !== undefined) boss.y = data.y;
            // Update HP bar
            if (boss.hpFill) {
                boss.hpFill.width = (boss.hpBg ? boss.hpBg.width : 80) * (data.hp / data.maxHp);
            }
        }
    }

    _handleChestOpened(data) {
        if (!data || !data.chestId) return;
        const s = this.scene;
        const groups = [s.forestChests, s.mineChests, s.caveChests, s.villageChests];
        groups.forEach(group => {
            if (!group) return;
            group.getChildren().forEach(ch => {
                if (ch.mpId === data.chestId && !ch.broken) {
                    ch.broken = true;
                    ch.opened = true;
                    if (ch.body) ch.body.enable = false;
                    if (ch.hpBg) ch.hpBg.destroy();
                    if (ch.hpFill) ch.hpFill.destroy();
                }
            });
        });
    }

    _handleLootCollected(data) {
        if (!data || !data.lootId) return;
        const s = this.scene;
        if (s.groundLootGroup) {
            s.groundLootGroup.getChildren().forEach(loot => {
                if (loot.mpId === data.lootId) {
                    loot.destroy();
                }
            });
        }
    }

    _handleMobUpdate(data) {
        if (!data || !data.mobs) return;
        data.mobs.forEach(mobData => {
            const existing = this.mobSyncData[mobData.id];
            if (existing) {
                if (existing.sprite && existing.sprite.active) {
                    existing.sprite.x = mobData.x;
                    existing.sprite.y = mobData.y;
                    if (existing.hpBg) {
                        existing.hpBg.x = mobData.x;
                        existing.hpBg.y = mobData.y - 20;
                    }
                    if (existing.hpFill) {
                        existing.hpFill.x = mobData.x;
                        existing.hpFill.y = mobData.y - 20;
                        existing.hpFill.width = 24 * (mobData.hp / mobData.maxHp);
                    }
                }
                existing.hp = mobData.hp;
                existing.maxHp = mobData.maxHp;
            }
        });
    }

    _handlePlayerUpdate(data) {
        if (!data || !data.peerId) return;
        if (data.peerId === getMyId()) return;
        this.remotePlayers[data.peerId] = {
            x: data.x,
            y: data.y,
            hp: data.hp,
            direction: data.direction
        };
    }

    _handleZoneChange(data) {
        if (!data || !data.peerId) return;
        if (data.peerId === getMyId()) return;
        this.remoteZones[data.peerId] = data.zone;
    }

    _handleBossKilled(data) {
        if (!data || !data.bossType) return;
        const s = this.scene;
        
        // Find the boss on client side
        const bossKey = data.bossType;
        const boss = s[bossKey];
        
        if (boss && boss.active) {
            // Trigger boss death logic
            if (bossKey === 'boss') s.killBoss();
            else if (bossKey === 'mineBoss') s.killMineBoss();
            else if (bossKey === 'caveBoss') s.killCaveBoss();
            else if (bossKey === 'villageBoss') s.zones.village.boss.iceSpiritDied();
            else if (bossKey === 'hellBoss') s.zones.hell.victoryHellBoss();
            else if (bossKey === 'snowyIceSpirit') s.zones.village.boss.iceSpiritDied();
        }
        
        // Sync loot from host
        if (data.loot && Array.isArray(data.loot)) {
            data.loot.forEach(item => {
                if (item.type === 'equip') s.addEquip(item);
                else if (item.type === 'accountEquip') s.addAccountEquip(item);
            });
        }
        
        // Show floating text
        s.floatingText(s.player.x, s.player.y - 50, 'Boss defeated!', '#f1c40f');
    }

    _createClientMob(mobData) {
        const s = this.scene;
        let texKey = mobData.texKey || 'goblin_walk';
        const sprite = s.add.sprite(mobData.x, mobData.y, texKey).setDepth(5);
        s.physics.add.existing(sprite, false);
        sprite.body.setSize(18, 24);
        sprite.body.setCollideWorldBounds(true);
        const hpBg = s.add.rectangle(mobData.x, mobData.y - 20, 24, 3, 0x333333).setOrigin(0.5).setDepth(11);
        const hpFill = s.add.rectangle(mobData.x, mobData.y - 20, 24, 3, 0xe74c3c).setOrigin(0.5).setDepth(11);
        this.mobSyncData[mobData.id] = {
            sprite,
            hpBg,
            hpFill,
            hp: mobData.hp,
            maxHp: mobData.maxHp,
            type: mobData.type
        };
    }

    startHostSync() {
        if (!isHost()) return;
        this._mobSyncInterval = setInterval(() => {
            this._broadcastMobSync();
        }, 100);
    }

    _broadcastMobSync() {
        const s = this.scene;
        const mobs = [];
        const addMobsFromGroup = (group) => {
            if (!group || !group.getLength) return;
            group.getChildren().forEach(e => {
                if (!e.active || !e.stats || e.stats.hp <= 0) return;
                if (!e.mpId) {
                    e.mpId = 'mob_' + (this.mobIdCounter++);
                }
                mobs.push({
                    id: e.mpId,
                    x: Math.round(e.x),
                    y: Math.round(e.y),
                    hp: e.stats.hp,
                    maxHp: e.stats.maxHp,
                    texKey: e.texture ? e.texture.key : 'goblin_walk',
                    type: e.stats.key || 'unknown'
                });
            });
        };
        addMobsFromGroup(s.enemies);
        addMobsFromGroup(s.villageZombies);
        addMobsFromGroup(s.caveSmallBats);
        addMobsFromGroup(s.hellImps);
        const bosses = ['boss', 'mineBoss', 'caveBoss', 'villageBoss', 'hellBoss', 'snowyIceSpirit', 'castleBoss'];
        bosses.forEach(key => {
            const b = s[key];
            if (b && b.active && b.stats && b.stats.hp > 0) {
                if (!b.mpId) {
                    b.mpId = 'boss_' + key;
                }
                mobs.push({
                    id: b.mpId,
                    x: Math.round(b.x),
                    y: Math.round(b.y),
                    hp: b.stats.hp,
                    maxHp: b.stats.maxHp,
                    texKey: b.texture ? b.texture.key : 'treant_walk',
                    type: key
                });
            }
        });
        if (mobs.length > 0) {
            sendMobSync({ mobs });
        }

        const activeBoss = bosses.find(key => {
            const b = s[key];
            return b && b.active && b.stats && b.stats.hp > 0;
        });
        if (activeBoss) {
            const b = s[activeBoss];
            sendBossUpdate({
                bossType: activeBoss,
                hp: b.stats.hp,
                maxHp: b.stats.maxHp,
                phase: b.stats.phase || 1,
                x: Math.round(b.x),
                y: Math.round(b.y)
            });
        }
    }

    broadcastMobKilled(mobId) {
        sendMobSync({ type: 'mob_killed', mobId });
    }

    broadcastBossKilled(bossType, loot) {
        sendBossKilled(bossType, loot);
    }

    broadcastChestOpened(chestId) {
        sendChestOpened({ chestId });
    }

    broadcastLootCollected(lootId) {
        sendLootCollected({ lootId });
    }

    broadcastZoneChange(zone) {
        sendZoneChange({ zone });
    }

    broadcastPlayerUpdate() {
        const s = this.scene;
        sendPlayerUpdate({
            x: Math.round(s.player.x),
            y: Math.round(s.player.y),
            hp: s.playerHP,
            direction: s.facing
        });
    }

    update(delta) {
        const s = this.scene;
        if (!s.multiplayer) return;
        if (isHost()) {
            this._syncClientMobs();
        } else {
            this._applyHostMobs();
        }
        this._filterByZone();
    }

    _syncClientMobs() {
        const s = this.scene;
        const netPlayers = getPlayers();
        Object.keys(this.remotePlayers).forEach(id => {
            if (netPlayers[id]) {
                this.remotePlayers[id].x = netPlayers[id].x;
                this.remotePlayers[id].y = netPlayers[id].y;
            }
        });
    }

    _applyHostMobs() {
        const s = this.scene;
        Object.keys(this.mobSyncData).forEach(id => {
            const m = this.mobSyncData[id];
            if (m.sprite && m.sprite.active && s.enemies) {
                const localMob = s.enemies.getChildren().find(e => e.mpId === id);
                if (localMob) {
                    localMob.x = m.sprite.x;
                    localMob.y = m.sprite.y;
                    if (localMob.stats) {
                        localMob.stats.hp = m.hp;
                    }
                }
            }
        });
    }

    _filterByZone() {
        const s = this.scene;
        const myZone = s.zone;
        Object.keys(s._remotePlayers || {}).forEach(id => {
            const remoteZone = this.remoteZones[id];
            const rp = s._remotePlayers[id];
            if (rp && rp.sprite) {
                if (remoteZone && remoteZone !== myZone) {
                    rp.sprite.setVisible(false);
                    if (rp.nameText) rp.nameText.setVisible(false);
                } else {
                    rp.sprite.setVisible(true);
                    if (rp.nameText) rp.nameText.setVisible(true);
                }
            }
        });
    }

    assignMobId(enemy, type) {
        if (!enemy || enemy.mpId) return;
        enemy.mpId = type + '_' + (this.mobIdCounter++);
    }
}
