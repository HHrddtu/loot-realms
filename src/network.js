import Peer from 'peerjs';
import { loadAccount } from './save.js';

let _peer = null;
let _isHost = false;
let _roomCode = null;
let _hostConn = null;
let _guestConns = {};
let _players = {};
let _myId = null;
let _hostName = '';
let _playerNames = {};

let _onPlayerJoin = null;
let _onPlayerLeave = null;
let _onChat = null;
let _onDisconnect = null;
let _onStartGame = null;
let _onWelcome = null;
let _onDifficulty = null;

let _onSnapshot = null;
let _onAttackAction = null;
let _onChestInteract = null;
let _onLootPickup = null;
let _onPortalEnter = null;
let _onEntitySpawn = null;
let _onEntityDespawn = null;
let _onDamageEvent = null;
let _onChestOpened = null;
let _onLootCollected = null;
let _onZoneState = null;
let _onGameOver = null;
let _onInventoryUpdate = null;

const ROOM_PREFIX = 'lr-';
const MAX_PLAYERS = 3;

function _genCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
    return code;
}

function _sendToHost(data) {
    if (_hostConn && _hostConn.open) {
        _hostConn.send(data);
    }
}

function _broadcastToGuests(data) {
    Object.values(_guestConns).forEach(conn => {
        if (conn.open) conn.send(data);
    });
}

function _sendToGuest(peerId, data) {
    const conn = _guestConns[peerId];
    if (conn && conn.open) conn.send(data);
}

function _makePlayerState(x, y, hp, maxHp, classKey) {
    return {
        x: x || 400, y: y || 300,
        vx: 0, vy: 0,
        facing: 'down',
        attacking: false, casting: false,
        hp: hp || 100, maxHp: maxHp || 100,
        alive: true, zone: 'forest',
        classKey: classKey || 'sage'
    };
}

export function isHost() { return _isHost; }
export function getRoomCode() { return _roomCode; }
export function getMyId() { return _myId; }
export function getPlayers() { return { ..._players }; }
export function getPlayerNames() { return { ..._playerNames }; }
export function isConnected() { return _peer !== null; }
export function getMaxPlayers() { return MAX_PLAYERS; }

export function onPlayerJoin(cb) { _onPlayerJoin = cb; }
export function onPlayerLeave(cb) { _onPlayerLeave = cb; }
export function onChat(cb) { _onChat = cb; }
export function onDisconnect(cb) { _onDisconnect = cb; }
export function onStartGame(cb) { _onStartGame = cb; }
export function onWelcome(cb) { _onWelcome = cb; }
export function onDifficulty(cb) { _onDifficulty = cb; }

export function onSnapshot(cb) { _onSnapshot = cb; }
export function onAttackAction(cb) { _onAttackAction = cb; }
export function onChestInteract(cb) { _onChestInteract = cb; }
export function onLootPickup(cb) { _onLootPickup = cb; }
export function onPortalEnter(cb) { _onPortalEnter = cb; }
export function onEntitySpawn(cb) { _onEntitySpawn = cb; }
export function onEntityDespawn(cb) { _onEntityDespawn = cb; }
export function onDamageEvent(cb) { _onDamageEvent = cb; }
export function onChestOpened(cb) { _onChestOpened = cb; }
export function onLootCollected(cb) { _onLootCollected = cb; }
export function onZoneState(cb) { _onZoneState = cb; }
export function onGameOver(cb) { _onGameOver = cb; }
export function onInventoryUpdate(cb) { _onInventoryUpdate = cb; }

export function createRoom(playerName) {
    return new Promise((resolve, reject) => {
        let settled = false;
        _roomCode = _genCode();
        _isHost = true;
        _hostName = playerName || 'Host';
        _myId = ROOM_PREFIX + _roomCode;
        _playerNames = {};
        _players = {};

        _peer = new Peer(_myId);

        const timer = setTimeout(() => {
            if (!settled) {
                settled = true;
                _peer.destroy();
                _peer = null;
                reject(new Error('PeerJS connection timeout'));
            }
        }, 10000);

        _peer.on('open', (id) => {
            if (settled) return;
            settled = true;
            clearTimeout(timer);
            _myId = id;
            const acc = loadAccount();
            const classKey = (acc && acc.classKey) || 'sage';
            _players[id] = _makePlayerState(400, 300, 100, 100, classKey);
            _playerNames[id] = _hostName;
            resolve(_roomCode);
        });

        _peer.on('connection', (conn) => {
            _handleGuestConnection(conn);
        });

        _peer.on('disconnected', () => {
            if (_onDisconnect) _onDisconnect('peer_disconnected');
        });

        _peer.on('error', (err) => {
            console.warn('PeerJS host error:', err);
            if (!settled) {
                settled = true;
                clearTimeout(timer);
                if (err.type === 'unavailable-id') {
                    _roomCode = _genCode();
                    _myId = ROOM_PREFIX + _roomCode;
                    _peer.destroy();
                    _peer = null;
                    createRoom(playerName).then(resolve).catch(reject);
                } else {
                    reject(err);
                }
            }
        });
    });
}

function _handleGuestConnection(conn) {
    const peerId = conn.peer;

    if (Object.keys(_guestConns).length >= MAX_PLAYERS - 1) {
        conn.on('open', () => {
            conn.send({ type: 'disconnect' });
            conn.close();
        });
        return;
    }

    _guestConns[peerId] = conn;

    conn.on('open', () => {
        conn.on('data', (data) => {
            _handleGuestData(peerId, data);
        });
    });

    conn.on('close', () => {
        const disconnectedPeerId = peerId;
        delete _guestConns[disconnectedPeerId];
        delete _players[disconnectedPeerId];
        delete _playerNames[disconnectedPeerId];
        _broadcastToGuests({ type: 'playerLeave', peerId: disconnectedPeerId });
        if (_onPlayerLeave) _onPlayerLeave(disconnectedPeerId);
        _broadcastToGuests({ type: 'game_over', reason: 'player_disconnect', peerId: disconnectedPeerId });
        if (_onGameOver) _onGameOver({ reason: 'player_disconnect', peerId: disconnectedPeerId });
    });

    conn.on('error', (err) => {
        console.warn('PeerJS guest conn error:', err);
    });
}

function _handleGuestData(peerId, data) {
    switch (data.type) {
        case 'join':
            _playerNames[peerId] = data.name || 'Guest';
            _players[peerId] = _makePlayerState(data.x, data.y, data.hp, data.maxHp, data.classKey);

            const existingPlayers = {};
            Object.keys(_playerNames).forEach(id => {
                if (_guestConns[id] || id === _myId) {
                    existingPlayers[id] = {
                        name: _playerNames[id],
                        classKey: (_players[id] && _players[id].classKey) || 'sage'
                    };
                }
            });
            _sendToGuest(peerId, { type: 'welcome', roomCode: _roomCode, hostName: _hostName, players: existingPlayers });

            _broadcastToGuests({ type: 'playerJoin', peerId, name: data.name, classKey: data.classKey });
            if (_onPlayerJoin) _onPlayerJoin(peerId, data.name, data.classKey);
            break;

        case 'input':
            if (_players[peerId]) {
                _players[peerId].x = data.x;
                _players[peerId].y = data.y;
                _players[peerId].vx = data.vx || 0;
                _players[peerId].vy = data.vy || 0;
                _players[peerId].facing = data.facing;
                _players[peerId].attacking = !!data.attacking;
                _players[peerId].casting = !!data.casting;
                _players[peerId].hp = data.hp;
                _players[peerId].maxHp = data.maxHp;
                _players[peerId].zone = data.zone || _players[peerId].zone;
                if (data.pet !== undefined) _players[peerId].pet = data.pet;
            }
            break;

        case 'attack_action':
            if (_onAttackAction) _onAttackAction(peerId, data);
            break;

        case 'chest_interact':
            if (_onChestInteract) _onChestInteract(peerId, data);
            break;

        case 'loot_pickup':
            if (_onLootPickup) _onLootPickup(peerId, data);
            break;

        case 'portal_enter':
            if (_onPortalEnter) _onPortalEnter(peerId, data);
            break;

        case 'player_downed':
            if (_players[peerId]) _players[peerId].isDowned = data.isDowned;
            _broadcastToGuests({ type: 'player_downed', peerId, isDowned: data.isDowned });
            if (_onPlayerDowned) _onPlayerDowned(peerId, data.isDowned);
            break;

        case 'revive':
            _broadcastToGuests({ type: 'revive', peerId, targetId: data.targetId });
            if (_onRevive) _onRevive(peerId, data.targetId);
            break;

        case 'chat':
            _broadcastToGuests({ type: 'chat', peerId, name: _playerNames[peerId] || '??', msg: data.msg });
            if (_onChat) _onChat(peerId, _playerNames[peerId], data.msg);
            break;
    }
}

export function joinRoom(code, playerName) {
    return new Promise((resolve, reject) => {
        _isHost = false;
        _roomCode = code.toUpperCase();
        _myId = null;
        _playerNames = {};
        _players = {};

        _peer = new Peer();

        let settled = false;

        const timer = setTimeout(() => {
            if (!settled) {
                settled = true;
                _peer.destroy();
                _peer = null;
                reject(new Error('Connection timeout'));
            }
        }, 10000);

        _peer.on('open', (id) => {
            _myId = id;
            const hostId = ROOM_PREFIX + _roomCode;
            const conn = _peer.connect(hostId, { reliable: true });
            _hostConn = conn;

            conn.on('open', () => {
                conn.on('data', (data) => {
                    _handleHostData(data);
                });

                const acc = loadAccount();
                const classKey = (acc && acc.classKey) || 'sage';
                conn.send({ type: 'join', name: playerName || 'Guest', classKey, x: 400, y: 300, hp: 100, maxHp: 100 });

                if (!settled) {
                    settled = true;
                    clearTimeout(timer);
                    resolve();
                }
            });

            conn.on('close', () => {
                _hostConn = null;
                if (_onDisconnect) _onDisconnect('host');
            });

            conn.on('error', (err) => {
                console.warn('PeerJS guest conn error:', err);
            });
        });

        _peer.on('disconnected', () => {
            if (_onDisconnect) _onDisconnect('peer_disconnected');
        });

        _peer.on('error', (err) => {
            console.warn('PeerJS guest error:', err);
            if (!settled) {
                settled = true;
                clearTimeout(timer);
                reject(err);
            }
        });
    });
}

function _handleHostData(data) {
    switch (data.type) {
        case 'welcome':
            _roomCode = data.roomCode;
            if (data.players) {
                Object.keys(data.players).forEach(id => {
                    if (id && id !== _myId) {
                        _playerNames[id] = data.players[id].name;
                        if (data.players[id].classKey) {
                            _players[id] = _players[id] || _makePlayerState(400, 300, 100, 100, data.players[id].classKey);
                            _players[id].classKey = data.players[id].classKey;
                        }
                    }
                });
            }
            if (_onWelcome) _onWelcome();
            break;

        case 'playerJoin':
            _playerNames[data.peerId] = data.name;
            if (data.classKey) {
                _players[data.peerId] = _players[data.peerId] || _makePlayerState(400, 300, 100, 100, data.classKey);
                _players[data.peerId].classKey = data.classKey;
            }
            if (_onPlayerJoin) _onPlayerJoin(data.peerId, data.name, data.classKey);
            break;

        case 'playerLeave':
            delete _playerNames[data.peerId];
            delete _players[data.peerId];
            if (_onPlayerLeave) _onPlayerLeave(data.peerId);
            break;

        case 'chat':
            if (_onChat) _onChat(data.peerId, data.name, data.msg);
            break;

        case 'disconnect':
            if (_onDisconnect) _onDisconnect('kicked');
            break;

        case 'startGame':
            if (_onStartGame) _onStartGame();
            break;

        case 'difficulty':
            if (_onDifficulty) _onDifficulty(data.difficulty);
            break;

        case 'snapshot':
            if (_onSnapshot) _onSnapshot(data);
            break;

        case 'entity_spawn':
            if (_onEntitySpawn) _onEntitySpawn(data);
            break;

        case 'entity_despawn':
            if (_onEntityDespawn) _onEntityDespawn(data);
            break;

        case 'damage_event':
            if (_onDamageEvent) _onDamageEvent(data);
            break;

        case 'chest_opened':
            if (_onChestOpened) _onChestOpened(data);
            break;

        case 'loot_collected':
            if (_onLootCollected) _onLootCollected(data);
            break;

        case 'zone_state':
            if (_onZoneState) _onZoneState(data);
            break;

        case 'game_over':
            if (_onGameOver) _onGameOver(data);
            break;

        case 'player_downed':
            if (_onPlayerDowned) _onPlayerDowned(data.peerId, data.isDowned);
            break;

        case 'revive':
            if (_onRevive) _onRevive(data.peerId, data.targetId);
            break;

        case 'inventory_update':
            if (_onInventoryUpdate) _onInventoryUpdate(data);
            break;
    }
}

export function sendInput(inputData) {
    _sendToHost({ type: 'input', ...inputData });
}

export function sendAttackAction(attackData) {
    _sendToHost({ type: 'attack_action', ...attackData });
}

export function sendChestInteract(chestId) {
    _sendToHost({ type: 'chest_interact', chestId });
}

export function sendLootPickup(lootId) {
    _sendToHost({ type: 'loot_pickup', lootId });
}

export function sendDowned(isDowned) {
    const data = { type: 'player_downed', isDowned };
    if (_isHost) {
        _broadcastToGuests(data);
        if (_onPlayerDowned) _onPlayerDowned(_myId, isDowned);
    } else {
        _sendToHost(data);
    }
}

export function sendRevive(targetId) {
    const data = { type: 'revive', targetId };
    if (_isHost) {
        _broadcastToGuests(data);
        if (_onRevive) _onRevive(_myId, targetId);
    } else {
        _sendToHost(data);
    }
}

let _onPlayerDowned = null;
let _onRevive = null;

export function onPlayerDowned(cb) { _onPlayerDowned = cb; }
export function onRevive(cb) { _onRevive = cb; }

export function sendPortalEnter(portalData) {
    _sendToHost({ type: 'portal_enter', ...portalData });
}

export function sendChat(msg) {
    const data = { type: 'chat', msg };
    if (_isHost) {
        _broadcastToGuests(data);
        if (_onChat) _onChat(_myId, _hostName, msg);
    } else {
        _sendToHost(data);
    }
}

export function broadcastSnapshot(snapshot) {
    if (!_isHost) return;
    _broadcastToGuests({ type: 'snapshot', ...snapshot });
}

export function broadcastEntitySpawn(kind, def) {
    if (!_isHost) return;
    _broadcastToGuests({ type: 'entity_spawn', kind, def });
}

export function broadcastEntityDespawn(kind, id) {
    if (!_isHost) return;
    _broadcastToGuests({ type: 'entity_despawn', kind, id });
}

export function broadcastDamageEvent(event) {
    if (!_isHost) return;
    _broadcastToGuests({ type: 'damage_event', ...event });
}

export function broadcastChestOpened(chestId, peerId) {
    if (!_isHost) return;
    _broadcastToGuests({ type: 'chest_opened', chestId, peerId });
}

export function broadcastLootCollected(lootId, peerId, gold) {
    if (!_isHost) return;
    _broadcastToGuests({ type: 'loot_collected', lootId, peerId, gold });
}

export function broadcastZoneState(flags) {
    if (!_isHost) return;
    _broadcastToGuests({ type: 'zone_state', flags });
}

export function broadcastGameOver(reason) {
    if (!_isHost) return;
    _broadcastToGuests({ type: 'game_over', reason });
}

export function sendInventoryUpdate(peerId, payload) {
    if (!_isHost) return;
    if (!peerId || peerId === _myId) return;
    _sendToGuest(peerId, { type: 'inventory_update', ...payload });
}

export function kickPlayer(peerId) {
    if (!_isHost) return;
    const conn = _guestConns[peerId];
    if (conn) {
        conn.send({ type: 'disconnect' });
        conn.close();
        delete _guestConns[peerId];
        delete _players[peerId];
        delete _playerNames[peerId];
    }
}

export function broadcastStartGame() {
    if (!_isHost) return;
    _broadcastToGuests({ type: 'startGame' });
}

export function sendDifficulty(difficulty) {
    if (!_isHost) return;
    _broadcastToGuests({ type: 'difficulty', difficulty });
}

export function disconnect() {
    if (_hostConn) { _hostConn.close(); _hostConn = null; }
    Object.values(_guestConns).forEach(c => c.close());
    _guestConns = {};
    if (_peer) { _peer.destroy(); _peer = null; }
    _isHost = false;
    _roomCode = null;
    _myId = null;
    _players = {};
    _playerNames = {};
    _hostName = '';
    _onPlayerJoin = null;
    _onPlayerLeave = null;
    _onChat = null;
    _onDisconnect = null;
    _onStartGame = null;
    _onWelcome = null;
    _onDifficulty = null;
    _onSnapshot = null;
    _onAttackAction = null;
    _onChestInteract = null;
    _onLootPickup = null;
    _onPortalEnter = null;
    _onEntitySpawn = null;
    _onEntityDespawn = null;
    _onDamageEvent = null;
    _onChestOpened = null;
    _onLootCollected = null;
    _onZoneState = null;
    _onGameOver = null;
    _onInventoryUpdate = null;
}
