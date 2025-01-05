import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBjXCrkAEdSiAWs51UsSJLbNxb4qZExuqc",
  authDomain: "blog-d9a1e.firebaseapp.com",
  projectId: "blog-d9a1e",
  storageBucket: "blog-d9a1e.firebasestorage.app",
  messagingSenderId: "573026862174",
  appId: "1:573026862174:web:ca9c0e561accbe63f520cf",
  measurementId: "G-B66WSEWQ2L",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
