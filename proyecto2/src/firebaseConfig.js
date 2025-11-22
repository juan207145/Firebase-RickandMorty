import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBi5r5NwrASE3qiPGBodFUFMheJA7m9IAw",
  authDomain: "apppersonal-a2e29.firebaseapp.com",
  projectId: "apppersonal-a2e29",
  storageBucket: "apppersonal-a2e29.firebasestorage.app",
  messagingSenderId: "341455057966",
  appId: "1:341455057966:web:93218830e07d1139025bbf"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };