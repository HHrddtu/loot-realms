let auth = null;
let db = null;

async function initFirebase() {
    try {
        const { initializeApp } = await import('firebase/app');
        const { getAuth } = await import('firebase/auth');
        const { getFirestore } = await import('firebase/firestore');

        const firebaseConfig = {
            apiKey: "AIzaSyA7yrE5uMyDWETZxp1gLwgJD8bSn1rqlcg",
            authDomain: "oot-realms.firebaseapp.com",
            projectId: "oot-realms",
            storageBucket: "oot-realms.firebasestorage.app",
            messagingSenderId: "984757927856",
            appId: "1:984757927856:web:e21b3f8c0a14a49823a075",
            measurementId: "G-S3CRP5RD4Y"
        };

        const app = initializeApp(firebaseConfig);
        auth = getAuth(app);
        db = getFirestore(app);
        return true;
    } catch (e) {
        console.warn('Firebase unavailable:', e.message);
        auth = null;
        db = null;
        return false;
    }
}

const firebaseReady = initFirebase();

export function getFirebaseAuth() { return auth; }
export function getFirebaseDb() { return db; }
export { firebaseReady };
