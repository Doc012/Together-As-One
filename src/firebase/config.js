import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "together-as-one-b3900",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "together-as-one-b3900.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "795895882842",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:795895882842:web:113aa4ccac995926e9a463",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-RCV9NJTTF7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };