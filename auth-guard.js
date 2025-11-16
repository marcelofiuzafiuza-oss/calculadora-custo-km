// ===================================
// MAX ROTA – Auth Guard (proteção de página)
// ===================================

import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
  if (!user) {
    // Sem login → volta para login
    location.href = "login.html";
  } else {
    // Usuário logado → libera a página
    console.log("Usuário autenticado:", user.email);
  }
});
