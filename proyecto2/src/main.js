import { auth } from './firebaseConfig.js';
import { onAuthStateChanged } from 'firebase/auth';

import mostrarRegistro from './componentes/registro.js';
import mostrarLogin from './componentes/login.js';
import mostrarHome from './componentes/home.js';
import mostrarOriginal from './componentes/original.js';
import mostrarLogout from './componentes/logout.js';

onAuthStateChanged(auth, (user) => {
  const menu = document.querySelector('#menu');

  if (user) {
    // Usuario logueado
    menu.innerHTML = `
      <button id="menuHome">Home</button>
      <button id="menuOriginal">Original</button>
      <button id="menuLogout">Logout</button>
    `;

    document.querySelector('#menuHome').addEventListener('click', mostrarHome);
    document.querySelector('#menuOriginal').addEventListener('click', mostrarOriginal);
    document.querySelector('#menuLogout').addEventListener('click', mostrarLogout);

    mostrarHome();
  } else {
    // Usuario NO logueado
    menu.innerHTML = `
      <button id="menuLogin">Login</button>
      <button id="menuRegistro">Registro</button>
    `;

    document.querySelector('#menuLogin').addEventListener('click', mostrarLogin);
    document.querySelector('#menuRegistro').addEventListener('click', mostrarRegistro);

    mostrarLogin();
  }
});
