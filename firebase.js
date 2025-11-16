// firebase.js
// Módulo para inicializar Firebase (Auth + Firestore) e helpers de leitura/gravação.
// Substitua as keys se quiser usar outras.

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  collection,
  addDoc,
  serverTimestamp,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// === CONFIG ===
// Você já enviou esta config; mantive a mesma.
const firebaseConfig = {
  apiKey: "AIzaSyBXkQlm0TbCsCdVGil8-5kGWbtj07SKXwA",
  authDomain: "maxrota.firebaseapp.com",
  projectId: "maxrota",
  storageBucket: "maxrota.firebasestorage.app",
  messagingSenderId: "425002957978",
  appId: "1:425002957978:web:1e4f38239e552de452f323",
  measurementId: "G-RBK7LM483D"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Helpers
async function saveUserState(uid, state) {
  if (!uid) return;
  try {
    const ref = doc(db, "users", uid);
    // grava campo `state` inteiro, mantendo timestamp
    await setDoc(ref, { state, updatedAt: serverTimestamp() }, { merge: true });
  } catch (e) {
    console.error("saveUserState error", e);
  }
}

function listenUserState(uid, onChange) {
  if (!uid) return () => {};
  const ref = doc(db, "users", uid);
  const unsub = onSnapshot(ref, (snap) => {
    if (!snap.exists()) {
      onChange(null);
      return;
    }
    const data = snap.data();
    onChange(data.state || null);
  }, (err) => {
    console.error("listenUserState err", err);
  });
  return unsub;
}

async function saveDayForUser(uid, daySummary) {
  if (!uid) return;
  try {
    const daysCol = collection(db, "users", uid, "days");
    await addDoc(daysCol, { ...daySummary, createdAt: serverTimestamp() });
  } catch (e) {
    console.error("saveDayForUser error", e);
  }
}

export {
  app,
  auth,
  db,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  saveUserState,
  listenUserState,
  saveDayForUser
};
