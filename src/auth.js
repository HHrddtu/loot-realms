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

onAuthStateChanged(auth, async (user) => {
    _currentUser = user;
    if (_cachedDisplayName) return;
    if (user && !user.isAnonymous && user.displayName) {
        _cachedDisplayName = user.displayName;
    } else if (user && !user.isAnonymous) {
        try {
            const snap = await getDoc(doc(db, 'users', user.uid));
            if (snap.exists() && snap.data().displayName) {
                _cachedDisplayName = snap.data().displayName;
                await updateProfile(user, { displayName: _cachedDisplayName });
            }
        } catch (e) {}
    }
});

export function getCurrentUser() { return _currentUser; }
export function getCurrentUid() { return _currentUser ? _currentUser.uid : null; }
export function isAnonymous() { return _currentUser ? _currentUser.isAnonymous : true; }

export function getDisplayName() {
    if (!_currentUser) return 'Guest';
    if (_currentUser.isAnonymous) return 'Guest';
    return _cachedDisplayName || _currentUser.displayName || _currentUser.email || 'Player';
}

export function onAuthChange(callback) {
    return onAuthStateChanged(auth, (user) => {
        _currentUser = user;
        callback(user);
    });
}

export async function register(email, password, displayName) {
    if (displayName) _cachedDisplayName = displayName;
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
                _cachedDisplayName = snap.data().displayName;
                await updateProfile(cred.user, { displayName: _cachedDisplayName });
            }
        } catch (e) {}
    } else {
        _cachedDisplayName = cred.user.displayName;
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
