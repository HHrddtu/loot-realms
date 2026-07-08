import { getClassData } from '../classes.js';
import { isHost, getMyId, getPlayers, getPlayerNames, onStateUpdate, onLoot, onKey, onZoneChange } from '../network.js';
import { MultiplayerSync } from '../multiplayer.js';

/**
 * Manages multiplayer state, remote players, and network sync.
 * Extracted from GameScene to reduce God Object.
 */
export class MultiplayerManager {
    constructor(scene) {
        this.scene = scene;
        this.remotePlayers = {};
        this.mpSync = null;
        this._sendTimer = 0;
        this._mobTimer = 0;
        this._stateHandler = null;
        this._lootHandler = null;
        this._keyHandler = null;
        this._zoneHandler = null;
    }

    setup() {
        const s = this.scene;
        const names = getPlayerNames();
        const players = getPlayers();
        const ids = Object.keys(names);
        ids.forEach(id => {
            if (id === getMyId()) return;
            this.spawnRemotePlayer(id, names[id], players[id]?.classKey);
        });

        this.mpSync = new MultiplayerSync(s);

        this._stateHandler = (data) => {
            if (!data || !data.players) return;
            const seen = {};
            Object.keys(data.players).forEach(id => {
                if (id === getMyId()) return;
                seen[id] = true;
                const p = data.players[id];
                if (this.remotePlayers[id]) {
                    this.remotePlayers[id].sprite.x = p.x;
                    this.remotePlayers[id].sprite.y = p.y;
                    if (p.flipX !== undefined) this.remotePlayers[id].sprite.setFlipX(p.flipX);
                } else {
                    this.spawnRemotePlayer(id, data.names?.[id] || '???', p.classKey);
                    if (this.remotePlayers[id]) {
                        this.remotePlayers[id].sprite.x = p.x;
                        this.remotePlayers[id].sprite.y = p.y;
                    }
                }
            });
            Object.keys(this.remotePlayers).forEach(id => {
                if (!seen[id]) this.despawnRemotePlayer(id);
            });
        };

        this._lootHandler = (data) => {
            if (!data) return;
            if (data.type === 'heal') {
                s.playerHP = Math.min(s.playerMaxHP, s.playerHP + data.amount);
            }
        };

        this._keyHandler = (data) => {
            if (!data) return;
            if (data.key === 'secret') s.zones.mine.hasSecretKey = true;
            if (data.key === 'mine') s.zones.mine.isUnlocked = true;
            if (data.key === 'cave') s.zones.cave.bossDefeated = true;
        };

        this._zoneHandler = (data) => {
            if (!data || !data.peerId) return;
            if (data.peerId === getMyId()) return;
            // Store remote player's zone for visibility filtering
            if (this.remotePlayers[data.peerId]) {
                this.remotePlayers[data.peerId].zone = data.zone;
            }
        };

        onStateUpdate(this._stateHandler);
        onLoot(this._lootHandler);
        onKey(this._keyHandler);
        onZoneChange(this._zoneHandler);

        if (isHost() && this.mpSync) {
            this.mpSync.startHostSync();
        }

        if (this.mpSync) {
            this.mpSync.broadcastZoneChange(s.zone);
        }
    }

    spawnRemotePlayer(id, name, remoteClassKey) {
        const s = this.scene;
        if (id === getMyId()) return;
        if (this.remotePlayers[id]) return;
        const cls = getClassData(remoteClassKey || s.classKey);
        const walkKey = cls.walkTexKey || 'player_sage_walk';
        const sprite = s.add.sprite(400, 400, walkKey).setDepth(9);
        s.physics.add.existing(sprite, false);
        sprite.body.setSize(18, 38);
        sprite.body.setOffset(7, 8);
        sprite.body.setCollideWorldBounds(true);
        sprite.setAlpha(0.7);
        const nameText = s.add.text(0, 0, name || '...', {
            fontSize: '10px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(11);
        this.remotePlayers[id] = { sprite, nameText };
    }

    despawnRemotePlayer(id) {
        if (!this.remotePlayers[id]) return;
        this.remotePlayers[id].sprite.destroy();
        this.remotePlayers[id].nameText.destroy();
        delete this.remotePlayers[id];
    }

    broadcastState() {
        if (!isHost()) return;
        const s = this.scene;
        const players = {};
        players[getMyId()] = {
            x: s.player.x,
            y: s.player.y,
            flipX: s.player.flipX
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
        const { sendGameState } = require('../network.js');
        sendGameState({ players, names: getPlayerNames() });
    }

    sendInput() {
        if (isHost()) return;
        const s = this.scene;
        const { sendInput } = require('../network.js');
        sendInput({
            x: s.player.x,
            y: s.player.y,
            facing: s.facing,
            attacking: s.playerAttacking,
            hp: s.playerHP,
            maxHp: s.playerMaxHP
        });
    }

    update(delta) {
        const s = this.scene;

        // Sync remote player positions from network
        if (isHost()) {
            const netPlayers = getPlayers();
            Object.keys(this.remotePlayers).forEach(id => {
                if (netPlayers[id] && this.remotePlayers[id]) {
                    this.remotePlayers[id].sprite.x = netPlayers[id].x;
                    this.remotePlayers[id].sprite.y = netPlayers[id].y;
                    if (netPlayers[id].facing) {
                        this.remotePlayers[id].sprite.setFlipX(netPlayers[id].facing === 'left');
                    }
                }
            });
        }

        // Update name tags and zone visibility
        Object.values(this.remotePlayers).forEach(rp => {
            if (rp.nameText) {
                rp.nameText.x = rp.sprite.x;
                rp.nameText.y = rp.sprite.y - 28;
            }
            // Show/hide based on zone
            const sameZone = !rp.zone || rp.zone === s.zone;
            rp.sprite.setVisible(sameZone);
            if (rp.nameText) rp.nameText.setVisible(sameZone);
        });

        // Send/receive state
        this._sendTimer += delta;
        if (this._sendTimer >= 50) {
            this._sendTimer = 0;
            if (isHost()) {
                this.broadcastState();
            } else {
                this.sendInput();
            }
        }

        // Mob sync
        this._mobTimer += delta;
        if (this._mobTimer >= 100) {
            this._mobTimer = 0;
            if (this.mpSync && !isHost()) {
                this.mpSync.broadcastPlayerUpdate();
            }
        }

        // Detect mob kills (host only)
        if (this.mpSync && isHost()) {
            this._detectMobKills();
        }

        // Update multiplayer sync
        if (this.mpSync) {
            this.mpSync.update(delta);
        }
    }

    _detectMobKills() {
        if (!this.mpSync) return;
        const s = this.scene;
        if (!this._prevMobIds) this._prevMobIds = new Set();
        const currentIds = new Set();
        const checkGroup = (group) => {
            if (!group || !group.getLength) return;
            group.getChildren().forEach(e => {
                if (e.active && e.mpId) currentIds.add(e.mpId);
            });
        };
        checkGroup(s.enemies);
        checkGroup(s.villageZombies);
        checkGroup(s.caveSmallBats);
        checkGroup(s.hellImps);
        this._prevMobIds.forEach(id => {
            if (!currentIds.has(id)) {
                delete this.mpSync.mobSyncData[id];
            }
        });
        this._prevMobIds = currentIds;
    }

    cleanup() {
        if (this.mpSync) {
            this.mpSync.cleanup();
            this.mpSync = null;
        }
        Object.keys(this.remotePlayers).forEach(id => this.despawnRemotePlayer(id));
        this.remotePlayers = {};
    }
}
