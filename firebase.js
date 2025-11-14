// firebase.js  (COLE COMO firebase.js)
// Módulo ES: usado por login.html, register.html e app.html
// (usa a config que você forneceu)

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import {
  getFirestore, doc, setDoc, getDoc
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// <-- sua firebaseConfig (você enviou este bloco) -->
const firebaseConfig = {
  apiKey: "AIzaSyBXkQlm0TbCsCdVGil8-5kGWbtj07SKXwA",
  authDomain: "maxrota.firebaseapp.com",
  projectId: "maxrota",
  storageBucket: "maxrota.firebasestorage.app",
  messagingSenderId: "425002957978",
  appId: "1:425002957978:web:1e4f38239e552de452f323",
  measurementId: "G-RBK7LM483D"
};
// ---------------------------------------

const app = initializeApp(firebaseConfig);
try { getAnalytics(app); } catch(e) { /* analytics optional */ }

const auth = getAuth(app);
const db = getFirestore(app);

// Export functions
export {
  auth, db,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  doc, setDoc, getDoc
};

// Helper: save state to Firestore under users/{uid}/state
export async function saveStateToFirestore(uid, stateObj){
  if(!uid) return;
  const ref = doc(db, "users", uid);
  try{
    await setDoc(ref, { state: stateObj, updatedAt: new Date().toISOString() }, { merge: true });
    return true;
  }catch(e){
    console.error("saveStateToFirestore error", e);
    return false;
  }
}

// Helper: load state from Firestore
export async function loadStateFromFirestore(uid){
  if(!uid) return null;
  const ref = doc(db, "users", uid);
  try{
    const snap = await getDoc(ref);
    if(snap.exists()){
      const data = snap.data();
      return data.state || null;
    }
    return null;
  }catch(e){
    console.error("loadStateFromFirestore error", e);
    return null;
  }
}
