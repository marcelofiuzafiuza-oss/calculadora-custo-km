// ============================
// firebase.js
// Configuração central do Firebase
// ============================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// CONFIG DO SEU FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyBXkQlm0TbCsCdVGil8-5kGWbtj07SKXwA",
  authDomain: "maxrota.firebaseapp.com",
  projectId: "maxrota",
  storageBucket: "maxrota.firebasestorage.app",
  messagingSenderId: "425002957978",
  appId: "1:425002957978:web:1e4f38239e552de452f323",
  measurementId: "G-RBK7LM483D"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta serviços
export const auth = getAuth(app);
export const db = getFirestore(app);

// Disponível globalmente
window.__FIREBASE__ = { auth, db };
