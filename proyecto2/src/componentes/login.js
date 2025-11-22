import { auth } from '../firebaseConfig.js';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function mostrarLogin() {
  const app = document.querySelector('#app');

  app.innerHTML = `
    <h2>Login</h2>
    <input id="correoLogin" placeholder="Correo">
    <input id="contrasenaLogin" placeholder="Contraseña" type="password">
    <button id="btnLogin">Iniciar sesión</button>
  `;

  document.querySelector('#btnLogin').addEventListener('click', async () => {
    const correo = document.querySelector('#correoLogin').value;
    const contrasena = document.querySelector('#contrasenaLogin').value;

    try {
      await signInWithEmailAndPassword(auth, correo, contrasena);
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  });
}
