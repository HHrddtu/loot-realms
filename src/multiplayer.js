import {
    isHost, getMyId, getPlayers,
    onSnapshot, onEntitySpawn, onEntityDespawn, onDamageEvent,
    onChestOpened, onLootCollected, onZoneState, onGameOver,
    broadcastSnapshot, broadcastEntitySpawn, broadcastEntityDespawn, broadcastDamageEvent,
    broadcastChestOpened, broadcastLootCollected, broadcastZoneState
} from './network.js';

const MOB_GROUPS = [
    'enemies', 'villageZombies', 'caveSmallBats', 'hellImps',
    'depthsMinions', 'cursedMinions', 'shadowMinions', 'towerMinions',
    'stumps'
];

const BOSS_KEYS = [
    'boss', 'mineBoss', 'caveBoss', 'villageBoss', 'hellBoss',
    'snowyIceSpirit', 'castleBoss', 'cursedBoss', 'shadowBoss',
    'towerBoss', 'depthsBoss', 'throneBoss', 'arenaBoss'
];

const CHEST_GROUPS = [
    'forestChests', 'mineChests', 'caveChests', 'villageChests',
    'caveExtraChests', 'depthsChests', 'cursedChests',
    'shadowChests', 'towerChests'
];

export class MultiplayerSync {
    constructor(scene) {
        this.scene = scene;
        this.mobGhosts = {};
        this.bossGhosts = {};
        this.chestGhosts = {};
        this.lootGhosts = {};
        this.zoneFlags = {};
        this._seq = 0;
        this._mobIdCounter = 0;
        this._bossIdCounter = 0;
        this._chestIdCounter = 0;
        this._lootIdCounter = 0;
        this._registered = false;
    }

    setup() {
        if (this._registered) return;
        this._registered = true;
        onSnapshot((data) => this._handleSnapshot(data));
        onEntitySpawn((data) => this._handleEntitySpawn(data));
        onEntityDespawn((data) => this._handleEntityDespawn(data));
        onDamageEvent((data) => this._handleDamageEvent(data));
        onChestOpened((data) => this._handleChestOpened(data));
        onLootCollected((data) => this._handleLootCollected(data));
        onZoneState((data) => this._handleZoneState(data));
        onGameOver((data) => this._handleGameOver(data));
    }

    update(_delta) { /* event-driven; nothing per-frame */ }

    cleanup() {
        Object.values(this.mobGhosts).forEach(g => this._destroyGhost(g));
        Object.values(this.bossGhosts).forEach(g => this._destroyGhost(g));
        Object.values(this.chestGhosts).forEach(g => this._destroyGhost(g));
        Object.values(this.lootGhosts).forEach(g => this._destroyGhost(g));
        this.mobGhosts = {};
        this.bossGhosts = {};
        this.chestGhosts = {};
        this.lootGhosts = {};
        this.zoneFlags = {};
        this._registered = false;
    }

    _destroyGhost(g) {
        if (g.sprite && g.sprite.active) g.sprite.destroy();
        if (g.hpBg && g.hpBg.active) g.hpBg.destroy();
        if (g.hpFill && g.hpFill.active) g.hpFill.destroy();
    }

    assignMobId(enemy, type) {
        if (!enemy || enemy.mpId) return;
        const label = type || (enemy.stats && enemy.stats.key) || 'mob';
        enemy.mpId = 'mob_' + label + '_' + (this._mobIdCounter++);
    }

    assignBossId(boss) {
        if (!boss || boss.mpId) return;
        const label = (boss.stats && boss.stats.key) || 'boss';
        boss.mpId = 'boss_' + label + '_' + (this._bossIdCounter++);
    }

    assignChestId(chest) {
        if (!chest || chest.mpId) return;
        chest.mpId = 'chest_' + (this._chestIdCounter++);
    }

    assignLootId(loot) {
        if (!loot || loot.mpId) return;
        loot.mpId = 'loot_' + (this._lootIdCounter++);
    }

    buildSnapshot() {
        if (!isHost()) return null;
        const s = this.scene;
        const t = performance.now();
        this._seq++;

        const localPet = (s.petSys && s.petSys.petSprite) ? {
            x: Math.round(s.petSys.petSprite.x),
            y: Math.round(s.petSys.petSprite.y),
            texKey: (s.petSys.petData && s.petSys.petData.texKey) || null
        } : null;

        const players = {};
        if (s.player) {
            players[getMyId()] = {
                x: s.player.x, y: s.player.y,
                vx: s.player.body ? s.player.body.velocity.x : 0,
                vy: s.player.body ? s.player.body.velocity.y : 0,
                facing: s.facing || 'down',
                attacking: !!s.playerAttacking,
                casting: !!s.playerCasting,
                hp: s.playerHP, maxHp: s.playerMaxHP,
                alive: (s.playerHP || 0) > 0,
                zone: s.zone || 'forest',
                classKey: s.classKey || 'sage',
                pet: localPet,
                isDowned: !!s.isDowned
            };
        }
        const netPlayers = getPlayers();
        Object.keys(netPlayers).forEach(id => {
            if (id === getMyId()) return;
            const p = netPlayers[id];
            players[id] = {
                x: p.x, y: p.y,
                vx: p.vx || 0, vy: p.vy || 0,
                facing: p.facing || 'down',
                attacking: !!p.attacking,
                casting: !!p.casting,
                hp: p.hp, maxHp: p.maxHp,
                alive: (p.hp || 0) > 0,
                zone: p.zone || 'forest',
                classKey: p.classKey || 'sage',
                pet: p.pet || null,
                isDowned: !!p.isDowned
            };
        });

        return {
            t, seq: this._seq,
            players,
            mobs: this._buildMobList(),
            bosses: this._buildBossList(),
            chests: this._buildChestList(),
            loot: this._buildLootList(),
            zoneFlags: this.zoneFlags
        };
    }

    broadcastSnapshot() {
        const snap = this.buildSnapshot();
        if (snap) broadcastSnapshot(snap);
    }

    _buildMobList() {
        const s = this.scene;
        const out = [];
        MOB_GROUPS.forEach(name => {
            const group = s[name];
            if (!group || !group.getLength) return;
            group.getChildren().forEach(e => {
                if (!e.active || !e.stats || e.stats.hp <= 0) return;
                if (!e.mpId) this.assignMobId(e);
                out.push({
                    id: e.mpId,
                    x: Math.round(e.x), y: Math.round(e.y),
                    vx: e.body ? Math.round(e.body.velocity.x) : 0,
                    vy: e.body ? Math.round(e.body.velocity.y) : 0,
                    hp: e.stats.hp, maxHp: e.stats.maxHp,
                    type: e.stats.key || 'unknown',
                    texKey: e.texture ? e.texture.key : 'goblin_walk'
                });
            });
        });
        return out;
    }

    _buildBossList() {
        const s = this.scene;
        const out = [];
        BOSS_KEYS.forEach(key => {
            const b = s[key];
            if (b && b.active && b.stats && b.stats.hp > 0) {
                if (!b.mpId) this.assignBossId(b);
                out.push({
                    id: b.mpId,
                    x: Math.round(b.x), y: Math.round(b.y),
                    hp: b.stats.hp, maxHp: b.stats.maxHp,
                    phase: b.stats.phase || 1,
                    type: key,
                    texKey: b.texture ? b.texture.key : 'treant_walk'
                });
            }
        });
        return out;
    }

    _buildChestList() {
        const s = this.scene;
        const out = [];
        CHEST_GROUPS.forEach(name => {
            const group = s[name];
            if (!group || !group.getLength) return;
            group.getChildren().forEach(ch => {
                if (!ch.active) return;
                if (!ch.mpId) this.assignChestId(ch);
                out.push({
                    id: ch.mpId,
                    x: Math.round(ch.x), y: Math.round(ch.y),
                    opened: !!ch.broken,
                    texKey: ch.texture ? ch.texture.key : 'mine_chest'
                });
            });
        });
        return out;
    }

    _buildLootList() {
        const s = this.scene;
        const out = [];
        if (!s.groundLootGroup || !s.groundLootGroup.getLength) return out;
        s.groundLootGroup.getChildren().forEach(loot => {
            if (!loot.active) return;
            if (!loot.mpId) this.assignLootId(loot);
            out.push({
                id: loot.mpId,
                x: Math.round(loot.x), y: Math.round(loot.y),
                type: loot.itemType || 'material',
                ownerPeerId: loot.ownerPeerId || null,
                texKey: loot.texture ? loot.texture.key : 'loot_bag'
            });
        });
        return out;
    }

    _handleSnapshot(data) {
        if (!data) return;
        this.zoneFlags = data.zoneFlags || this.zoneFlags;
        this._applyMobSnapshot(data.mobs || []);
        this._applyBossSnapshot(data.bosses || []);
        this._applyChestSnapshot(data.chests || []);
        this._applyLootSnapshot(data.loot || []);
    }

    _applyMobSnapshot(mobs) {
        const seen = new Set();
        mobs.forEach(m => {
            seen.add(m.id);
            let g = this.mobGhosts[m.id];
            if (!g) {
                g = this._createMobGhost(m);
                this.mobGhosts[m.id] = g;
            } else {
                if (g.sprite && g.sprite.active) {
                    g.sprite.x = m.x;
                    g.sprite.y = m.y;
                }
            }
            const prevHp = g.hp;
            g.hp = m.hp;
            g.maxHp = m.maxHp;
            if (g.hpBg && g.hpBg.active) {
                g.hpBg.x = m.x;
                g.hpBg.y = m.y - 20;
            }
            if (g.hpFill && g.hpFill.active) {
                g.hpFill.x = m.x;
                g.hpFill.y = m.y - 20;
                g.hpFill.width = 24 * (m.maxHp > 0 ? m.hp / m.maxHp : 0);
            }
            if (prevHp !== undefined && m.hp < prevHp && this.scene.floatingText) {
                const diff = prevHp - m.hp;
                this.scene.floatingText(m.x, m.y - 20, '-' + diff, '#e74c3c');
            }
        });
        Object.keys(this.mobGhosts).forEach(id => {
            if (!seen.has(id)) {
                this._destroyGhost(this.mobGhosts[id]);
                delete this.mobGhosts[id];
            }
        });
    }

    _applyBossSnapshot(bosses) {
        const seen = new Set();
        bosses.forEach(b => {
            seen.add(b.id);
            let g = this.bossGhosts[b.id];
            if (!g) {
                g = this._createBossGhost(b);
                this.bossGhosts[b.id] = g;
            } else {
                if (g.sprite && g.sprite.active) {
                    g.sprite.x = b.x;
                    g.sprite.y = b.y;
                }
            }
            const prevHp = g.hp;
            g.hp = b.hp;
            g.maxHp = b.maxHp;
            if (g.hpBg && g.hpBg.active) {
                g.hpBg.x = b.x;
                g.hpBg.y = b.y - 30;
            }
            if (g.hpFill && g.hpFill.active) {
                g.hpFill.x = b.x;
                g.hpFill.y = b.y - 30;
                g.hpFill.width = 80 * (b.maxHp > 0 ? b.hp / b.maxHp : 0);
            }
            if (prevHp !== undefined && b.hp < prevHp && this.scene.floatingText) {
                const diff = prevHp - b.hp;
                this.scene.floatingText(b.x, b.y - 30, '-' + diff, '#e74c3c');
            }
        });
        Object.keys(this.bossGhosts).forEach(id => {
            if (!seen.has(id)) {
                this._destroyGhost(this.bossGhosts[id]);
                delete this.bossGhosts[id];
            }
        });
    }

    _applyChestSnapshot(chests) {
        const seen = new Set();
        chests.forEach(c => {
            seen.add(c.id);
            let g = this.chestGhosts[c.id];
            if (!g) {
                g = this._createChestGhost(c);
                this.chestGhosts[c.id] = g;
            }
            if (c.opened && !g.opened) {
                g.opened = true;
                if (g.sprite && g.sprite.active) g.sprite.setAlpha(0.4);
            }
        });
        Object.keys(this.chestGhosts).forEach(id => {
            if (!seen.has(id)) {
                this._destroyGhost(this.chestGhosts[id]);
                delete this.chestGhosts[id];
            }
        });
    }

    _applyLootSnapshot(lootList) {
        const seen = new Set();
        lootList.forEach(l => {
            seen.add(l.id);
            let g = this.lootGhosts[l.id];
            if (!g) {
                g = this._createLootGhost(l);
                this.lootGhosts[l.id] = g;
            } else {
                if (g.sprite && g.sprite.active) {
                    g.sprite.x = l.x;
                    g.sprite.y = l.y;
                }
            }
        });
        Object.keys(this.lootGhosts).forEach(id => {
            if (!seen.has(id)) {
                this._destroyGhost(this.lootGhosts[id]);
                delete this.lootGhosts[id];
            }
        });
    }

    _createMobGhost(m) {
        const s = this.scene;
        const texKey = m.texKey || 'goblin_walk';
        const sprite = s.add.sprite(m.x, m.y, texKey).setDepth(5).setAlpha(0.85);
        if (s.physics && s.physics.add && s.physics.add.existing) {
            s.physics.add.existing(sprite, false);
            if (sprite.body) {
                sprite.body.setSize(18, 24);
                sprite.body.moves = false;
            }
        }
        const hpBg = s.add.rectangle(m.x, m.y - 20, 24, 3, 0x333333).setOrigin(0.5).setDepth(11);
        const hpFill = s.add.rectangle(m.x, m.y - 20, 24, 3, 0xe74c3c).setOrigin(0.5).setDepth(11);
        return { sprite, hpBg, hpFill, hp: m.hp, maxHp: m.maxHp, type: m.type };
    }

    _createBossGhost(b) {
        const s = this.scene;
        const texKey = b.texKey || 'treant_walk';
        const sprite = s.add.sprite(b.x, b.y, texKey).setDepth(5).setAlpha(0.85);
        const hpBg = s.add.rectangle(b.x, b.y - 30, 80, 4, 0x333333).setOrigin(0.5).setDepth(11);
        const hpFill = s.add.rectangle(b.x, b.y - 30, 80, 4, 0xe74c3c).setOrigin(0.5).setDepth(11);
        return { sprite, hpBg, hpFill, hp: b.hp, maxHp: b.maxHp, type: b.type };
    }

    _createChestGhost(c) {
        const s = this.scene;
        const texKey = c.texKey || 'mine_chest';
        const sprite = s.add.sprite(c.x, c.y, texKey).setDepth(4);
        if (c.opened) sprite.setAlpha(0.4);
        return { sprite, opened: !!c.opened };
    }

    _createLootGhost(l) {
        const s = this.scene;
        const texKey = l.texKey || 'loot_bag';
        const sprite = s.add.sprite(l.x, l.y, texKey).setDepth(3);
        return { sprite };
    }

    notifyMobKilled(mobId) {
        if (!isHost()) return;
        broadcastEntityDespawn('mob', mobId);
    }

    notifyBossKilled(bossId) {
        if (!isHost()) return;
        broadcastEntityDespawn('boss', bossId);
    }

    notifyChestOpened(chestId) {
        if (!isHost()) return;
        broadcastChestOpened(chestId, getMyId());
    }

    notifyLootSpawned(loot) {
        if (!isHost()) return;
        this.assignLootId(loot);
        broadcastEntitySpawn('loot', {
            id: loot.mpId,
            x: Math.round(loot.x), y: Math.round(loot.y),
            type: loot.itemType || 'material',
            ownerPeerId: loot.ownerPeerId || null,
            texKey: loot.texture ? loot.texture.key : 'loot_bag'
        });
    }

    notifyLootCollected(lootId, gold) {
        if (!isHost()) return;
        broadcastLootCollected(lootId, getMyId(), gold);
    }

    notifyPlayerDamage(playerId, amount, x, y) {
        if (!isHost()) return;
        broadcastDamageEvent({ targetType: 'player', targetId: playerId, amount, x, y });
    }

    setZoneFlag(key, value) {
        if (!isHost()) return;
        this.zoneFlags[key] = value;
        broadcastZoneState(this.zoneFlags);
    }

    _handleEntitySpawn(data) {
        if (!data || !data.kind || !data.def) return;
        if (data.kind === 'mob') {
            if (!this.mobGhosts[data.def.id]) {
                const g = this._createMobGhost(data.def);
                g.hp = data.def.hp;
                g.maxHp = data.def.maxHp;
                this.mobGhosts[data.def.id] = g;
            }
        } else if (data.kind === 'boss') {
            if (!this.bossGhosts[data.def.id]) {
                const g = this._createBossGhost(data.def);
                g.hp = data.def.hp;
                g.maxHp = data.def.maxHp;
                this.bossGhosts[data.def.id] = g;
            }
        } else if (data.kind === 'chest') {
            if (!this.chestGhosts[data.def.id]) {
                this.chestGhosts[data.def.id] = this._createChestGhost(data.def);
            }
        } else if (data.kind === 'loot') {
            if (!this.lootGhosts[data.def.id]) {
                this.lootGhosts[data.def.id] = this._createLootGhost(data.def);
            }
        }
    }

    _handleEntityDespawn(data) {
        if (!data || !data.kind || !data.id) return;
        let map = null;
        if (data.kind === 'mob') map = this.mobGhosts;
        else if (data.kind === 'boss') map = this.bossGhosts;
        else if (data.kind === 'loot') map = this.lootGhosts;
        if (map && map[data.id]) {
            this._destroyGhost(map[data.id]);
            delete map[data.id];
        }
    }

    _handleDamageEvent(data) {
        if (!data) return;
        if (data.targetType === 'player' && this.scene && this.scene.mpManager) {
            this.scene.mpManager.showRemotePlayerDamage(data.targetId, data.amount, data.x, data.y);
        }
    }

    _handleChestOpened(data) {
        if (!data || !data.chestId) return;
        if (this.chestGhosts[data.chestId]) {
            this.chestGhosts[data.chestId].opened = true;
            const sp = this.chestGhosts[data.chestId].sprite;
            if (sp && sp.active) sp.setAlpha(0.4);
        }
    }

    _handleLootCollected(data) {
        if (!data || !data.lootId) return;
        if (this.lootGhosts[data.lootId]) {
            this._destroyGhost(this.lootGhosts[data.lootId]);
            delete this.lootGhosts[data.lootId];
        }
        if (data.peerId && data.peerId === getMyId() && this.scene && this.scene.mpManager) {
            this.scene.mpManager.applyLootGold(data.gold || 0);
        }
    }

    _handleZoneState(data) {
        if (!data || !data.flags) return;
        this.zoneFlags = data.flags;
    }

    _handleGameOver(data) {
        if (!data) return;
        if (this.scene && this.scene._onMultiplayerGameOver) {
            this.scene._onMultiplayerGameOver(data);
        }
    }
}
