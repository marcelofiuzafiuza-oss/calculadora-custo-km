// ===============================
// MAX ROTA — PROTEÇÃO DE ACESSO
// ===============================

import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
  if (!user) {
    location.href = "login.html"; // tira quem não está logado
  }
});
