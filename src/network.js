import Peer from 'peerjs';

let _peer = null;
let _isHost = false;
let _roomCode = null;
let _hostConn = null;
let _guestConns = {};
let _players = {};
let _myId = null;
let _onStateUpdate = null;
let _onPlayerJoin = null;
let _onPlayerLeave = null;
let _onLoot = null;
let _onKey = null;
let _onChat = null;
let _onDisconnect = null;
let _onStartGame = null;
let _onWelcome = null;
let _onDifficulty = null;
let _onMobSync = null;
let _onBossUpdate = null;
let _onChestOpened = null;
let _onLootCollected = null;
let _onMobUpdate = null;
let _onPlayerUpdate = null;
let _onZoneChange = null;
let _onBossKilled = null;
let _onMobDamage = null;
let _hostName = '';
let _playerNames = {};

const ROOM_PREFIX = 'lr-';
const MAX_PLAYERS = 4;

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

export function isHost() { return _isHost; }
export function getRoomCode() { return _roomCode; }
export function getMyId() { return _myId; }
export function getPlayers() { return { ..._players }; }
export function getPlayerNames() { return { ..._playerNames }; }
export function isConnected() { return _peer !== null; }

export function onStateUpdate(cb) { _onStateUpdate = cb; }
export function onPlayerJoin(cb) { _onPlayerJoin = cb; }
export function onPlayerLeave(cb) { _onPlayerLeave = cb; }
export function onLoot(cb) { _onLoot = cb; }
export function onKey(cb) { _onKey = cb; }
export function onChat(cb) { _onChat = cb; }
export function onDisconnect(cb) { _onDisconnect = cb; }
export function onStartGame(cb) { _onStartGame = cb; }
export function onWelcome(cb) { _onWelcome = cb; }
export function onDifficulty(cb) { _onDifficulty = cb; }
export function onMobSync(cb) { _onMobSync = cb; }
export function onBossUpdate(cb) { _onBossUpdate = cb; }
export function onChestOpened(cb) { _onChestOpened = cb; }
export function onLootCollected(cb) { _onLootCollected = cb; }
export function onMobUpdate(cb) { _onMobUpdate = cb; }
export function onPlayerUpdate(cb) { _onPlayerUpdate = cb; }
export function onZoneChange(cb) { _onZoneChange = cb; }
export function onBossKilled(cb) { _onBossKilled = cb; }
export function onMobDamage(cb) { _onMobDamage = cb; }

function _getHostPlayerNames() {
    const out = {};
    Object.keys(_playerNames).forEach(id => {
        if (_guestConns[id] || id === _myId) {
            out[id] = _playerNames[id];
        }
    });
    return out;
}

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
            _players[id] = { x: 400, y: 300, facing: 'down', hp: 100, maxHp: 100, classKey: 'sage', attacking: false };
            _playerNames[id] = _hostName;
            resolve(_roomCode);
        });

        _peer.on('connection', (conn) => {
            _handleGuestConnection(conn);
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

    if (Object.keys(_guestConns).length >= MAX_PLAYERS) {
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
        delete _guestConns[peerId];
        delete _players[peerId];
        delete _playerNames[peerId];
        _broadcastToGuests({ type: 'playerLeave', peerId });
        if (_onPlayerLeave) _onPlayerLeave(peerId);
    });
}

function _handleGuestData(peerId, data) {
    switch (data.type) {
        case 'join':
            _playerNames[peerId] = data.name || 'Guest';
            _players[peerId] = { x: data.x || 400, y: data.y || 300, facing: 'down', hp: data.hp || 100, maxHp: data.maxHp || 100, classKey: data.classKey || 'sage', attacking: false };

            const existingNames = {};
            Object.keys(_playerNames).forEach(id => {
                if (_guestConns[id] || id === _myId) {
                    existingNames[id] = _playerNames[id];
                }
            });
            _sendToGuest(peerId, { type: 'welcome', roomCode: _roomCode, hostName: _hostName, players: existingNames });

            _broadcastToGuests({ type: 'playerJoin', peerId, name: data.name, classKey: data.classKey });
            if (_onPlayerJoin) _onPlayerJoin(peerId, data.name);
            break;

        case 'input':
            if (_players[peerId]) {
                _players[peerId].x = data.x;
                _players[peerId].y = data.y;
                _players[peerId].facing = data.facing;
                _players[peerId].attacking = data.attacking;
                _players[peerId].hp = data.hp;
                _players[peerId].maxHp = data.maxHp;
            }
            break;

        case 'chat':
            _broadcastToGuests({ type: 'chat', peerId, name: _playerNames[peerId] || '??', msg: data.msg });
            if (_onChat) _onChat(peerId, _playerNames[peerId], data.msg);
            break;

        case 'mob_sync':
            _broadcastToGuests(data);
            if (_onMobSync) _onMobSync(data);
            break;

        case 'boss_update':
            _broadcastToGuests(data);
            if (_onBossUpdate) _onBossUpdate(data);
            break;

        case 'chest_opened':
            _broadcastToGuests(data);
            if (_onChestOpened) _onChestOpened(data);
            break;

        case 'loot_collected':
            _broadcastToGuests(data);
            if (_onLootCollected) _onLootCollected(data);
            break;

        case 'player_update':
            if (_players[peerId]) {
                _players[peerId].x = data.x;
                _players[peerId].y = data.y;
                _players[peerId].facing = data.direction;
            }
            if (_onPlayerUpdate) _onPlayerUpdate(data);
            break;

        case 'zone_change':
            _broadcastToGuests(data);
            if (_onZoneChange) _onZoneChange(data);
            break;

        case 'boss_killed':
            _broadcastToGuests(data);
            if (_onBossKilled) _onBossKilled(data);
            break;

        case 'mob_damage':
            _broadcastToGuests(data);
            if (_onMobDamage) _onMobDamage(data);
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

                conn.send({ type: 'join', name: playerName || 'Guest', classKey: 'sage', x: 400, y: 300, hp: 100, maxHp: 100 });

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
                if (!settled) {
                    settled = true;
                    clearTimeout(timer);
                    reject(err);
                }
            });
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
                        _playerNames[id] = data.players[id];
                    }
                });
            }
            if (_onWelcome) _onWelcome();
            break;

        case 'state':
            if (_onStateUpdate) _onStateUpdate(data);
            break;

        case 'loot':
            if (_onLoot) _onLoot(data);
            break;

        case 'key':
            if (_onKey) _onKey(data);
            break;

        case 'playerJoin':
            _playerNames[data.peerId] = data.name;
            if (_onPlayerJoin) _onPlayerJoin(data.peerId, data.name);
            break;

        case 'playerLeave':
            delete _playerNames[data.peerId];
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

        case 'mob_sync':
            if (_onMobSync) _onMobSync(data);
            break;

        case 'boss_update':
            if (_onBossUpdate) _onBossUpdate(data);
            break;

        case 'chest_opened':
            if (_onChestOpened) _onChestOpened(data);
            break;

        case 'loot_collected':
            if (_onLootCollected) _onLootCollected(data);
            break;

        case 'mob_update':
            if (_onMobUpdate) _onMobUpdate(data);
            break;

        case 'player_update':
            if (_players[data.peerId]) {
                _players[data.peerId].x = data.x;
                _players[data.peerId].y = data.y;
                _players[data.peerId].facing = data.direction;
            }
            if (_onPlayerUpdate) _onPlayerUpdate(data);
            break;

        case 'zone_change':
            if (_onZoneChange) _onZoneChange(data);
            break;

        case 'boss_killed':
            if (_onBossKilled) _onBossKilled(data);
            break;

        case 'mob_damage':
            if (_onMobDamage) _onMobDamage(data);
            break;
    }
}

export function sendInput(inputData) {
    _sendToHost({ type: 'input', ...inputData });
}

export function sendGameState(state) {
    _broadcastToGuests({ type: 'state', ...state });
}

export function sendLootPickup(playerId, itemId, itemName) {
    const msg = { type: 'loot', peerId: playerId, itemId, itemName };
    if (_isHost) {
        _broadcastToGuests(msg);
        if (_onLoot) _onLoot(msg);
    } else {
        _sendToHost(msg);
    }
}

export function sendKeyPickup(playerId) {
    const msg = { type: 'key', peerId: playerId };
    if (_isHost) {
        _broadcastToGuests(msg);
        if (_onKey) _onKey(msg);
    } else {
        _sendToHost(msg);
    }
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

export function sendMobSync(data) {
    const msg = { type: 'mob_sync', ...data };
    if (_isHost) {
        _broadcastToGuests(msg);
    } else {
        _sendToHost(msg);
    }
}

export function sendBossUpdate(data) {
    const msg = { type: 'boss_update', ...data };
    if (_isHost) {
        _broadcastToGuests(msg);
    } else {
        _sendToHost(msg);
    }
}

export function sendChestOpened(data) {
    const msg = { type: 'chest_opened', ...data };
    if (_isHost) {
        _broadcastToGuests(msg);
        if (_onChestOpened) _onChestOpened(msg);
    } else {
        _sendToHost(msg);
    }
}

export function sendLootCollected(data) {
    const msg = { type: 'loot_collected', ...data };
    if (_isHost) {
        _broadcastToGuests(msg);
        if (_onLootCollected) _onLootCollected(msg);
    } else {
        _sendToHost(msg);
    }
}

export function sendMobUpdate(data) {
    const msg = { type: 'mob_update', ...data };
    if (_isHost) {
        _broadcastToGuests(msg);
    } else {
        _sendToHost(msg);
    }
}

export function sendPlayerUpdate(data) {
    const msg = { type: 'player_update', peerId: _myId, ...data };
    if (_isHost) {
        if (_onPlayerUpdate) _onPlayerUpdate(msg);
    } else {
        _sendToHost(msg);
    }
}

export function sendZoneChange(data) {
    const msg = { type: 'zone_change', peerId: _myId, ...data };
    if (_isHost) {
        _broadcastToGuests(msg);
        if (_onZoneChange) _onZoneChange(msg);
    } else {
        _sendToHost(msg);
    }
}

export function sendBossKilled(bossType, loot) {
    const msg = { type: 'boss_killed', bossType, loot };
    if (_isHost) {
        _broadcastToGuests(msg);
        if (_onBossKilled) _onBossKilled(msg);
    } else {
        _sendToHost(msg);
    }
}

export function sendMobDamage(mobId, damage) {
    const msg = { type: 'mob_damage', mobId, damage };
    if (_isHost) {
        _broadcastToGuests(msg);
        if (_onMobDamage) _onMobDamage(msg);
    } else {
        _sendToHost(msg);
    }
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
    _onStateUpdate = null;
    _onPlayerJoin = null;
    _onPlayerLeave = null;
    _onLoot = null;
    _onKey = null;
    _onChat = null;
    _onDisconnect = null;
    _onStartGame = null;
    _onWelcome = null;
    _onDifficulty = null;
    _onMobSync = null;
    _onBossUpdate = null;
    _onChestOpened = null;
    _onLootCollected = null;
    _onMobUpdate = null;
    _onPlayerUpdate = null;
    _onZoneChange = null;
    _onBossKilled = null;
    _onMobDamage = null;
}
