import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAvuV2xWGSjF79rTi3EpXQjGRlstSACTes",
  authDomain: "freightintelligence.firebaseapp.com",
  projectId: "freightintelligence",
  storageBucket: "freightintelligence.firebasestorage.app",
  messagingSenderId: "90212566268",
  appId: "1:90212566268:web:d80701b7a4a424c353c379",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);