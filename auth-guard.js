// auth-guard.js
// Coloque <script type="module" src="auth-guard.js"></script> antes do body do seu HTML
import { auth, onAuthStateChanged } from "./firebase.js";

// Este arquivo só garante que a página só seja acessível por usuários logados.
// Se não estiver logado, redireciona para login.html
onAuthStateChanged(auth, (user) => {
  if (!user) {
    // usuário não logado => redireciona ao login
    const path = location.pathname.split("/").pop();
    // se já estiver na página de login, não redireciona
    if (path !== "login.html" && path !== "index.html") {
      location.href = "login.html";
    }
  } else {
    // usuário logado — nada a fazer aqui, a página que importa este guard
    // pode usar `auth.currentUser` ou onAuthStateChanged novamente.
    // Disponibilizamos globalmente para scripts inline:
    window.__MAXROTA_USER__ = user;
  }
});

export default null;
