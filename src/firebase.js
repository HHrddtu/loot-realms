import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

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
export const auth = getAuth(app);
export const db = getFirestore(app);
