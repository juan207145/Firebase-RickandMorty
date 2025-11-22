import { auth } from '../firebaseConfig.js';
import { signOut } from 'firebase/auth';
import mostrarLogin from './login.js';

export default function mostrarLogout() {
  const app = document.querySelector('#app');
  app.innerHTML = `<h2>Cerrando sesión...</h2>`;

  signOut(auth)
    .then(() => mostrarLogin())
    .catch(() => mostrarLogin());
}
