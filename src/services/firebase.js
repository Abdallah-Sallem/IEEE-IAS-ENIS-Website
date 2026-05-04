import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCwc5TO9Mn98MWIYCA-ICanPwFhOdtEbcw",
  authDomain: "newsletter-ias.firebaseapp.com",
  projectId: "newsletter-ias",
  storageBucket: "newsletter-ias.firebasestorage.app",
  messagingSenderId: "23670980964",
  appId: "1:23670980964:web:b6cca2f38aad6df8cb3a71",
  measurementId: "G-GPMV52HJZS"
};

let app = null;
let db = null;
let analytics = null;

try {
  // Initialize Firebase
  app = initializeApp(firebaseConfig);
  
  // Initialize Firestore (needed for the newsletter)
  db = getFirestore(app);
  
  // Initialize Analytics (from your snippet)
  if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
  }
} catch (err) {
  console.warn('Firebase initialization failed:', err.message);
}

export { db, analytics };
export default app;
