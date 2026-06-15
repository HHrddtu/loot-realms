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
let _hostName = '';
let _playerNames = {};

const ROOM_PREFIX = 'lr-';

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

export function createRoom(playerName) {
    return new Promise((resolve, reject) => {
        let settled = false;
        _roomCode = _genCode();
        _isHost = true;
        _hostName = playerName || 'Host';
        _myId = ROOM_PREFIX + _roomCode;

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
    _guestConns[peerId] = conn;

    conn.on('open', () => {
        conn.on('data', (data) => {
            _handleGuestData(peerId, data);
        });

        const existingNames = {};
        Object.keys(_playerNames).forEach(id => {
            existingNames[id] = _playerNames[id];
        });
        conn.send({ type: 'welcome', roomCode: _roomCode, hostName: _hostName, players: existingNames });
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
                existingNames[id] = _playerNames[id];
            });
            _sendToGuest(peerId, { type: 'playerList', players: existingNames });

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
    }
}

export function joinRoom(code, playerName) {
    return new Promise((resolve, reject) => {
        _isHost = false;
        _roomCode = code.toUpperCase();
        _myId = null;

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
            _playerNames[_myId] = _hostName;
            if (data.players) {
                Object.keys(data.players).forEach(id => {
                    _playerNames[id] = data.players[id];
                });
            }
            break;

        case 'playerList':
            if (data.players) {
                Object.keys(data.players).forEach(id => {
                    _playerNames[id] = data.players[id];
                });
            }
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
    _onStateUpdate = null;
    _onPlayerJoin = null;
    _onPlayerLeave = null;
    _onLoot = null;
    _onKey = null;
    _onChat = null;
    _onDisconnect = null;
}
