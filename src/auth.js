import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInAnonymously,
    signOut,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase.js';

let _currentUser = null;
let _cachedDisplayName = null;
let _authReady = false;
let _authReadyCallbacks = [];

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

onAuthStateChanged(auth, async (user) => {
    _currentUser = user;
    if (user && !user.isAnonymous) {
        const stored = _getCachedName();
        if (stored && !user.displayName) {
            try { await updateProfile(user, { displayName: stored }); } catch (e) {}
        }
        if (user.displayName && !_cachedDisplayName) {
            _setCachedName(user.displayName);
        }
        if (!_cachedDisplayName) {
            try {
                const snap = await getDoc(doc(db, 'users', user.uid));
                if (snap.exists() && snap.data().displayName) {
                    _setCachedName(snap.data().displayName);
                    await updateProfile(user, { displayName: _cachedDisplayName });
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

export function getCurrentUser() { return _currentUser; }
export function getCurrentUid() { return _currentUser ? _currentUser.uid : null; }
export function isAnonymous() { return _currentUser ? _currentUser.isAnonymous : true; }
export function isAuthReady() { return _authReady; }

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
    return onAuthStateChanged(auth, (user) => {
        _currentUser = user;
        callback(user);
    });
}

export async function register(email, password, displayName) {
    if (displayName) _setCachedName(displayName);
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
        await updateProfile(cred.user, { displayName });
        await setDoc(doc(db, 'users', cred.user.uid), {
            email, displayName, createdAt: Date.now(), accountData: null
        }, { merge: true });
    }
    return cred.user;
}

export async function login(email, password) {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    if (!cred.user.displayName) {
        try {
            const ref = doc(db, 'users', cred.user.uid);
            const snap = await getDoc(ref);
            if (snap.exists() && snap.data().displayName) {
                _setCachedName(snap.data().displayName);
                await updateProfile(cred.user, { displayName: _cachedDisplayName });
            }
        } catch (e) {}
    } else {
        _setCachedName(cred.user.displayName);
    }
    return cred.user;
}

export async function loginAsGuest() {
    return (await signInAnonymously(auth)).user;
}

export async function logout() {
    await signOut(auth);
    _currentUser = null;
    _cachedDisplayName = null;
    try { localStorage.removeItem('lr_displayName'); } catch (e) {}
}

export async function saveAccountToFirestore(accountData) {
    const user = _currentUser;
    if (!user || user.isAnonymous) return false;
    try {
        await setDoc(doc(db, 'users', user.uid), { accountData }, { merge: true });
        return true;
    } catch (e) { return false; }
}

export async function loadAccountFromFirestore() {
    const user = _currentUser;
    if (!user || user.isAnonymous) return null;
    try {
        const snap = await getDoc(doc(db, 'users', user.uid));
        if (snap.exists()) return snap.data().accountData || null;
        return null;
    } catch (e) { return null; }
}
