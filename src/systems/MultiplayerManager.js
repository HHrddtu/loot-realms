import { getClassData } from '../classes.js';
import {
    isHost, getMyId, getPlayers, getPlayerNames,
    onPlayerJoin, onPlayerLeave, onSnapshot, onAttackAction,
    onChestInteract, onLootPickup, onGameOver, onDisconnect, onInventoryUpdate,
    onPlayerDowned, onRevive,
    sendInput, sendAttackAction, sendChestInteract, sendLootPickup, sendDowned, sendRevive
} from '../network.js';
import { MultiplayerSync } from '../multiplayer.js';
import { InterpolationBuffer } from './InterpolationBuffer.js';

const INPUT_RATE_MS = 33;
const SNAPSHOT_RATE_MS = 50;
const RENDER_DELAY_MS = 100;
const HP_BAR_W = 24;
const HP_BAR_H = 3;

export class MultiplayerManager {
    constructor(scene) {
        this.scene = scene;
        this.remotePlayers = {};
        this.mpSync = null;
        this._inputTimer = 0;
        this._snapTimer = 0;
    }

    setup() {
        const s = this.scene;
        const names = getPlayerNames();
        const players = getPlayers();
        const ids = Object.keys(names);
        ids.forEach(id => {
            if (id === getMyId()) return;
            this.spawnRemotePlayer(id, names[id], players[id] && players[id].classKey);
        });

        this.mpSync = new MultiplayerSync(s);
        this.mpSync.setup();

        onPlayerJoin((peerId, name, classKey) => this._onPlayerJoin(peerId, name, classKey));
        onPlayerLeave((peerId) => this._onPlayerLeave(peerId));
        onSnapshot((data) => this._onSnapshot(data));
        onGameOver((data) => this._onGameOver(data));
        onDisconnect((reason) => this._onDisconnect(reason));
        onInventoryUpdate((data) => this._onInventoryUpdate(data));
        onPlayerDowned((peerId, isDowned) => this._onPlayerDowned(peerId, isDowned));
        onRevive((peerId, targetId) => this._onRevive(peerId, targetId));

        if (isHost()) {
            this._setupHostHandlers();
        }

        this.mpSync.broadcastSnapshot();
    }

    _setupHostHandlers() {
        onAttackAction((peerId, data) => this._handleAttackAction(peerId, data));
        onChestInteract((peerId, data) => this._handleChestInteract(peerId, data));
        onLootPickup((peerId, data) => this._handleLootPickup(peerId, data));
    }

    spawnRemotePlayer(id, name, remoteClassKey) {
        const s = this.scene;
        if (id === getMyId()) return;
        if (this.remotePlayers[id]) return;
        const cls = getClassData(remoteClassKey || s.classKey || 'sage');
        const walkKey = cls.walkTexKey || 'player_sage_walk';
        const sprite = s.add.sprite(400, 400, walkKey).setDepth(9).setAlpha(0.85);
        s.physics.add.existing(sprite, false);
        sprite.body.setSize(18, 38);
        sprite.body.setOffset(7, 8);
        sprite.body.moves = false;
        const nameText = s.add.text(0, 0, name || '...', {
            fontSize: '10px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(11);
        const hpBg = s.add.rectangle(0, 0, HP_BAR_W, HP_BAR_H, 0x333333).setOrigin(0.5).setDepth(11);
        const hpFill = s.add.rectangle(0, 0, HP_BAR_W, HP_BAR_H, 0x2ecc71).setOrigin(0.5).setDepth(11);
        this.remotePlayers[id] = {
            sprite, nameText, hpBg, hpFill,
            buffer: new InterpolationBuffer(6),
            zone: null,
            lastHp: null,
            name,
            petSprite: null,
            petTexKey: null
        };
    }

    despawnRemotePlayer(id) {
        const rp = this.remotePlayers[id];
        if (!rp) return;
        if (rp.sprite && rp.sprite.active) rp.sprite.destroy();
        if (rp.nameText && rp.nameText.active) rp.nameText.destroy();
        if (rp.hpBg && rp.hpBg.active) rp.hpBg.destroy();
        if (rp.hpFill && rp.hpFill.active) rp.hpFill.destroy();
        if (rp.downedText && rp.downedText.active) rp.downedText.destroy();
        if (rp.petSprite && rp.petSprite.active) rp.petSprite.destroy();
        delete this.remotePlayers[id];
    }

    showRemotePlayerDamage(peerId, amount, x, y) {
        const rp = this.remotePlayers[peerId];
        if (!rp || !rp.sprite) return;
        if (rp.sprite.active) {
            rp.sprite.setTint(0xff0000);
            this.scene.time.delayedCall(100, () => { if (rp.sprite.active) rp.sprite.clearTint(); });
        }
        if (this.scene.floatingText && (x !== undefined && y !== undefined)) {
            this.scene.floatingText(x, y - 40, '-' + amount, '#e74c3c');
        }
    }

    _onPlayerJoin(peerId, name, classKey) {
        if (peerId === getMyId()) return;
        if (!this.remotePlayers[peerId]) {
            this.spawnRemotePlayer(peerId, name, classKey);
        }
    }

    _onPlayerLeave(peerId) {
        this.despawnRemotePlayer(peerId);
    }

    _onSnapshot(data) {
        if (!data || !data.players) return;
        Object.keys(data.players).forEach(id => {
            if (id === getMyId()) return;
            const p = data.players[id];
            const rp = this.remotePlayers[id];
            if (!rp) return;
            rp.buffer.push({
                t: data.t,
                x: p.x, y: p.y,
                vx: p.vx || 0, vy: p.vy || 0,
                facing: p.facing,
                attacking: !!p.attacking,
                casting: !!p.casting,
                hp: p.hp, maxHp: p.maxHp,
                zone: p.zone,
                classKey: p.classKey,
                isDowned: !!p.isDowned
            });
            rp.zone = p.zone;
            rp.isDowned = !!p.isDowned;
            if (p.hp !== undefined) {
                const prev = rp.lastHp;
                if (prev !== null && prev !== undefined && p.hp < prev) {
                    this.showRemotePlayerDamage(id, prev - p.hp, rp.sprite.x, rp.sprite.y);
                }
                rp.lastHp = p.hp;
            }
            if (p.pet) {
                if (p.pet.texKey && p.pet.texKey !== rp.petTexKey) {
                    this._ensurePetGhost(id, p.pet.texKey);
                }
                if (rp.petSprite && rp.petSprite.active) {
                    rp.petSprite.x = p.pet.x || 0;
                    rp.petSprite.y = p.pet.y || 0;
                }
            } else if (rp.petSprite) {
                if (rp.petSprite.active) rp.petSprite.destroy();
                rp.petSprite = null;
                rp.petTexKey = null;
            }
        });
    }

    _ensurePetGhost(id, texKey) {
        const s = this.scene;
        const rp = this.remotePlayers[id];
        if (!rp) return;
        if (rp.petSprite && rp.petSprite.active && rp.petTexKey === texKey) return;
        if (rp.petSprite && rp.petSprite.active) rp.petSprite.destroy();
        try {
            rp.petSprite = s.add.sprite(0, 0, texKey).setDepth(8).setAlpha(0.85).setScale(1.2);
        } catch (e) {
            rp.petSprite = null;
        }
        rp.petTexKey = texKey;
    }

    _onGameOver(data) {
        if (this.scene && this.scene._onMultiplayerGameOver) {
            this.scene._onMultiplayerGameOver(data);
        }
    }

    _onDisconnect(reason) {
        if (this.scene && this.scene._onMultiplayerDisconnect) {
            this.scene._onMultiplayerDisconnect(reason);
        }
    }

    _onInventoryUpdate(data) {
        if (this.scene && this.scene._applyLoot) {
            this.scene._applyLoot(data);
        }
    }

    _handleAttackAction(peerId, data) {
        const s = this.scene;
        if (peerId === getMyId()) return;
        if (!s.combat || !s.combat.applyAttackAt) return;
        const cls = s.classData || getClassData(s.classKey || 'sage');
        const ax = data.ax;
        const ay = data.ay;
        const dmg = data.attackDamage || 0;
        if (typeof ax !== 'number' || typeof ay !== 'number' || dmg <= 0) return;
        s.combat.applyAttackAt(ax, ay, dmg, cls, { bypassModifiers: true, attackerPeerId: peerId });
    }

    _handleChestInteract(peerId, data) {
        const s = this.scene;
        const chestId = data.chestId;
        if (!chestId) return;
        const chest = this._findChestById(chestId);
        if (!chest || chest.broken) return;
        if (s.combat && s.combat.breakChest) {
            const result = s.combat.breakChest(chest);
            if (s._distributeLoot) s._distributeLoot(result, peerId);
        }
        if (this.mpSync) this.mpSync.notifyChestOpened(chestId);
    }

    _findChestById(chestId) {
        const s = this.scene;
        const groups = ['forestChests', 'mineChests', 'caveChests', 'villageChests',
            'caveExtraChests', 'depthsChests', 'cursedChests', 'shadowChests', 'towerChests'];
        for (const g of groups) {
            const group = s[g];
            if (!group || !group.getLength) continue;
            const found = group.getChildren().find(c => c.mpId === chestId);
            if (found) return found;
        }
        return null;
    }

    _handleLootPickup(peerId, data) {
        const s = this.scene;
        const lootId = data.lootId;
        if (!lootId) return;
        if (!s.groundLootGroup || !s.groundLootGroup.getLength) return;
        const loot = s.groundLootGroup.getChildren().find(l => l.mpId === lootId);
        if (!loot) return;
        const gold = loot.goldValue || 10;
        if (peerId === getMyId()) {
            s.gold = (s.gold || 0) + gold;
            if (s.floatingText) s.floatingText(loot.x, loot.y - 20, '+' + gold + ' gold', '#f1c40f');
        }
        loot.destroy();
        if (this.mpSync) this.mpSync.notifyLootCollected(lootId, gold);
    }

    applyLootGold(gold) {
        const s = this.scene;
        if (!gold) return;
        s.gold = (s.gold || 0) + gold;
        if (s.updateUI) s.updateUI();
    }

    handleLocalLootPickup(loot) {
        if (!loot || !loot.active) return;
        if (!loot.mpId) {
            const s = this.scene;
            const gold = loot.goldValue || 10;
            s.gold = (s.gold || 0) + gold;
            if (s.floatingText) s.floatingText(loot.x, loot.y - 20, '+' + gold + ' gold', '#f1c40f');
            loot.destroy();
            return;
        }
        if (isHost()) {
            this._handleLootPickup(getMyId(), { lootId: loot.mpId });
        } else {
            sendLootPickup(loot.mpId);
        }
    }

    sendGuestAttackAction(attackData) {
        if (isHost()) return;
        sendAttackAction(attackData);
    }

    sendGuestChestInteract(chestId) {
        if (isHost()) return;
        sendChestInteract(chestId);
    }

    sendGuestLootPickup(lootId) {
        if (isHost()) return;
        sendLootPickup(lootId);
    }

    sendInput() {
        if (isHost()) return;
        const s = this.scene;
        if (!s.player) return;
        const v = s.player.body ? s.player.body.velocity : null;
        const pet = (s.petSys && s.petSys.petSprite) ? {
            x: Math.round(s.petSys.petSprite.x),
            y: Math.round(s.petSys.petSprite.y),
            texKey: (s.petSys.petData && s.petSys.petData.texKey) || null
        } : null;
        sendInput({
            x: s.player.x, y: s.player.y,
            vx: v ? v.x : 0, vy: v ? v.y : 0,
            facing: s.facing || 'down',
            attacking: !!s.playerAttacking,
            casting: !!s.playerCasting,
            hp: s.playerHP, maxHp: s.playerMaxHP,
            zone: s.zone || 'forest',
            pet,
            isDowned: !!s.isDowned
        });
    }

    update(delta) {
        const s = this.scene;
        const now = performance.now();
        const renderT = now - RENDER_DELAY_MS;

        Object.keys(this.remotePlayers).forEach(id => {
            const rp = this.remotePlayers[id];
            const sample = rp.buffer.sample(renderT);
            if (sample && rp.sprite && rp.sprite.active) {
                rp.sprite.x = sample.x;
                rp.sprite.y = sample.y;
                if (sample.facing === 'left') rp.sprite.setFlipX(true);
                else if (sample.facing === 'right') rp.sprite.setFlipX(false);
                if (rp.nameText && rp.nameText.active) {
                    rp.nameText.x = sample.x;
                    rp.nameText.y = sample.y - 28;
                }
                if (rp.hpBg && rp.hpBg.active) {
                    rp.hpBg.x = sample.x;
                    rp.hpBg.y = sample.y - 20;
                }
                if (rp.hpFill && rp.hpFill.active) {
                    rp.hpFill.x = sample.x;
                    rp.hpFill.y = sample.y - 20;
                    const ratio = sample.maxHp > 0 ? Math.max(0, sample.hp / sample.maxHp) : 0;
                    rp.hpFill.width = HP_BAR_W * ratio;
                }
                if (rp.downedText && rp.downedText.active) {
                    rp.downedText.x = sample.x;
                    rp.downedText.y = sample.y - 36;
                }
            }
            const sameZone = !rp.zone || rp.zone === s.zone;
            if (rp.sprite && rp.sprite.active) rp.sprite.setVisible(sameZone);
            if (rp.nameText && rp.nameText.active) rp.nameText.setVisible(sameZone);
            if (rp.hpBg && rp.hpBg.active) rp.hpBg.setVisible(sameZone);
            if (rp.hpFill && rp.hpFill.active) rp.hpFill.setVisible(sameZone);
            if (rp.petSprite && rp.petSprite.active) rp.petSprite.setVisible(sameZone);
        });

        this._inputTimer += delta;
        if (this._inputTimer >= INPUT_RATE_MS) {
            this._inputTimer = 0;
            if (!isHost()) this.sendInput();
        }

        this._snapTimer += delta;
        if (this._snapTimer >= SNAPSHOT_RATE_MS) {
            this._snapTimer = 0;
            if (isHost() && this.mpSync) this.mpSync.broadcastSnapshot();
        }

        if (this.mpSync) this.mpSync.update(delta);
    }

    broadcastDowned(isDowned) {
        sendDowned(isDowned);
    }

    sendRevive(targetId) {
        sendRevive(targetId);
    }

    _onPlayerDowned(peerId, isDowned) {
        const rp = this.remotePlayers[peerId];
        if (!rp) return;
        rp.isDowned = isDowned;
        if (rp.sprite && rp.sprite.active) {
            if (isDowned) {
                rp.sprite.setTint(0x666666);
                rp.sprite.setAlpha(0.6);
                if (!rp.downedText) {
                    rp.downedText = this.scene.add.text(0, 0, 'DOWNED', {
                        fontSize: '10px', fill: '#e74c3c', fontFamily: 'Arial', fontStyle: 'bold',
                        stroke: '#000', strokeThickness: 2
                    }).setOrigin(0.5).setDepth(12);
                }
                rp.downedText.setVisible(true);
            } else {
                rp.sprite.clearTint();
                rp.sprite.setAlpha(0.85);
                if (rp.downedText) rp.downedText.setVisible(false);
            }
        }
    }

    _onRevive(peerId, targetId) {
        if (targetId === getMyId()) {
            const s = this.scene;
            if (s.combat) s.combat.revivePlayer();
        }
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
