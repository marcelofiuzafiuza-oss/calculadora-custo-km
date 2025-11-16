// ============================
// auth-guard.js
// Protege páginas privadas
// ============================

import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Evita dupla execução
let alreadyChecked = false;

onAuthStateChanged(auth, (user) => {
  if (alreadyChecked) return;
  alreadyChecked = true;

  if (!user) {
    // Usuário não logado → volta para login
    window.location.href = "login.html";
  } else {
    // Usuário autenticado
    window.__USER_UID__ = user.uid;
    console.log("Usuário autenticado:", user.uid);
  }
});
