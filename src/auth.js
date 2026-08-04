import { getFirebaseAuth, getFirebaseDb, firebaseReady } from './firebase.js';

let _currentUser = null;
let _cachedDisplayName = null;
let _authReady = false;
let _authReadyCallbacks = [];
let _firebaseAvailable = false;

let _fbAuth = null;
let _fbDb = null;
let _fbModule = null;
let _fsModule = null;

function _setCachedName(name) {
    _cachedDisplayName = name;
    try { localStorage.setItem('lr_displayName', name); } catch (e) {}
}

function _getCachedName() {
    if (_cachedDisplayName) return _cachedDisplayName;
    try {
        const stored = localStorage.getItem('lr_displayName');
        if (stored) { _cachedDisplayName = stored; return stored; }
    } catch (e) {}
    return null;
}

async function _initAuth() {
    try {
        const available = await firebaseReady;
        if (!available) {
            console.warn('Firebase unavailable — offline mode');
            _authReady = true;
            _authReadyCallbacks.forEach(cb => cb());
            _authReadyCallbacks = [];
            return;
        }

        _fbAuth = getFirebaseAuth();
        _fbDb = getFirebaseDb();
        if (!_fbAuth) {
            _authReady = true;
            _authReadyCallbacks.forEach(cb => cb());
            _authReadyCallbacks = [];
            return;
        }

        _fbModule = await import('firebase/auth');
        _fsModule = await import('firebase/firestore');
        _firebaseAvailable = true;

        _fbModule.onAuthStateChanged(_fbAuth, async (user) => {
            _currentUser = user;
            if (user && !user.isAnonymous) {
                const stored = _getCachedName();
                if (stored && !user.displayName) {
                    try { await _fbModule.updateProfile(user, { displayName: stored }); } catch (e) {}
                }
                if (user.displayName && !_cachedDisplayName) {
                    _setCachedName(user.displayName);
                }
                if (!_cachedDisplayName) {
                    try {
                        const snap = await _fsModule.getDoc(_fsModule.doc(_fbDb, 'users', user.uid));
                        if (snap.exists() && snap.data().displayName) {
                            _setCachedName(snap.data().displayName);
                            await _fbModule.updateProfile(user, { displayName: _cachedDisplayName });
                        }
                    } catch (e) {}
                }
            }
            if (!_authReady) {
                _authReady = true;
                _authReadyCallbacks.forEach(cb => cb());
                _authReadyCallbacks = [];
            }
        });
    } catch (e) {
        console.warn('Auth init failed:', e.message);
        _firebaseAvailable = false;
        _authReady = true;
        _authReadyCallbacks.forEach(cb => cb());
        _authReadyCallbacks = [];
    }
}

_initAuth();

export function getCurrentUser() { return _currentUser; }
export function getCurrentUid() { return _currentUser ? _currentUser.uid : null; }
export function isAnonymous() { return _currentUser ? _currentUser.isAnonymous : true; }
export function isAuthReady() { return _authReady; }
export function isFirebaseAvailable() { return _firebaseAvailable; }

export function waitForAuth() {
    return new Promise(resolve => {
        if (_authReady) resolve();
        else _authReadyCallbacks.push(resolve);
    });
}

export function getDisplayName() {
    if (!_currentUser) return 'Guest';
    if (_currentUser.isAnonymous) return 'Guest';
    return _getCachedName() || _currentUser.displayName || _currentUser.email || 'Player';
}

export function onAuthChange(callback) {
    const wrapped = () => callback(_currentUser);
    if (_authReady) {
        setTimeout(wrapped, 0);
        return () => {};
    }
    _authReadyCallbacks.push(wrapped);
    return () => {
        _authReadyCallbacks = _authReadyCallbacks.filter(cb => cb !== wrapped);
    };
}

export async function register(email, password, displayName) {
    if (!_firebaseAvailable) throw new Error('Offline mode');
    if (displayName) _setCachedName(displayName);
    const cred = await _fbModule.createUserWithEmailAndPassword(_fbAuth, email, password);
    if (displayName) {
        await _fbModule.updateProfile(cred.user, { displayName });
        await _fsModule.setDoc(_fsModule.doc(_fbDb, 'users', cred.user.uid), {
            email, displayName, createdAt: Date.now(), accountData: null
        }, { merge: true });
    }
    return cred.user;
}

export async function login(email, password) {
    if (!_firebaseAvailable) throw new Error('Offline mode');
    const cred = await _fbModule.signInWithEmailAndPassword(_fbAuth, email, password);
    if (!cred.user.displayName) {
        try {
            const ref = _fsModule.doc(_fbDb, 'users', cred.user.uid);
            const snap = await _fsModule.getDoc(ref);
            if (snap.exists() && snap.data().displayName) {
                _setCachedName(snap.data().displayName);
                await _fbModule.updateProfile(cred.user, { displayName: _cachedDisplayName });
            }
        } catch (e) {}
    } else {
        _setCachedName(cred.user.displayName);
    }
    return cred.user;
}

export async function loginAsGuest() {
    if (!_firebaseAvailable) {
        _currentUser = { uid: 'guest-' + Date.now(), isAnonymous: true, displayName: 'Guest' };
        return _currentUser;
    }
    return (await _fbModule.signInAnonymously(_fbAuth)).user;
}

export async function logout() {
    if (_firebaseAvailable && _fbModule) await _fbModule.signOut(_fbAuth);
    _currentUser = null;
    _cachedDisplayName = null;
    try { localStorage.removeItem('lr_displayName'); } catch (e) {}
}

export async function saveAccountToFirestore(accountData) {
    if (!_firebaseAvailable) return false;
    const user = _currentUser;
    if (!user || user.isAnonymous) return false;
    try {
        await _fsModule.setDoc(_fsModule.doc(_fbDb, 'users', user.uid), { accountData }, { merge: true });
        return true;
    } catch (e) { return false; }
}

export async function loadAccountFromFirestore() {
    if (!_firebaseAvailable) return null;
    const user = _currentUser;
    if (!user || user.isAnonymous) return null;
    try {
        const snap = await _fsModule.getDoc(_fsModule.doc(_fbDb, 'users', user.uid));
        if (snap.exists()) return snap.data().accountData || null;
        return null;
    } catch (e) { return null; }
}
