import { auth, db } from '../firebaseConfig.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function mostrarRegistro() {
  const app = document.querySelector('#app');

  app.innerHTML = `
    <h2>Registro</h2>
    <input id="nombre" placeholder="Nombre">
    <input id="correo" placeholder="Correo">
    <input id="contrasena" placeholder="Contraseña" type="password">
    <input id="fecha" type="date" placeholder="Fecha de nacimiento">
    <input id="telefono" placeholder="Teléfono">

    <button id="btnRegistro">Registrarse</button>
  `;

  document.querySelector('#btnRegistro').addEventListener('click', async () => {
    const nombre = document.querySelector('#nombre').value;
    const correo = document.querySelector('#correo').value;
    const contrasena = document.querySelector('#contrasena').value;
    const fecha = document.querySelector('#fecha').value;
    const telefono = document.querySelector('#telefono').value;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, correo, contrasena);

      await setDoc(doc(db, "usuarios", userCredential.user.uid), {
        nombre,
        correo,
        fecha,
        telefono
      });

      alert("Usuario registrado correctamente");
    } catch (error) {
      alert(error.message);
    }
  });
}

