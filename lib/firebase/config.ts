import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getMessaging, isSupported } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyAK0j_HCF2oP2UWDuMVZpz4Qwk4YBysN6U",
  authDomain: "hafa-trading.firebaseapp.com",
  projectId: "hafa-trading",
  storageBucket: "hafa-trading.firebasestorage.app",
  messagingSenderId: "1095191275274",
  appId: "1:1095191275274:web:9f7b752b44fc8e30587cf3"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize messaging only in browser
export const getMessagingInstance = async () => {
  if (typeof window !== 'undefined' && await isSupported()) {
    return getMessaging(app);
  }
  return null;
};

export default app;
