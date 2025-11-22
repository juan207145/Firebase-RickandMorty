import { db } from '../firebaseConfig.js';
import { auth } from '../firebaseConfig.js';
import { doc, setDoc } from "firebase/firestore";

export default function mostrarOriginal() {
  const app = document.querySelector('#app');

  app.innerHTML = `
    <h2>Trivia Rick & Morty</h2>
    <p>Responde correctamente las preguntas. Al final se guardará tu puntuación.</p>

    <div id="pregunta"></div>
    <div id="opciones"></div>

    <button id="btnSiguiente" style="margin-top:20px;">Siguiente pregunta</button>

    <h3>Puntuación: <span id="puntos">0</span></h3>
  `;

  let puntuacion = 0;
  const puntosSpan = document.getElementById("puntos");

  const preguntaDiv = document.getElementById("pregunta");
  const opcionesDiv = document.getElementById("opciones");

  function cargarPregunta() {
    fetch("https://rickandmortyapi.com/api/character")
      .then(res => res.json())
      .then(data => {
        const personajes = data.results;

        // personaje correcto (respuesta correcta)
        const correcto = personajes[Math.floor(Math.random() * personajes.length)];

        // genera 2 personajes incorrectos
        const incorrectos = personajes
          .filter(p => p.id !== correcto.id)
          .sort(() => 0.5 - Math.random())
          .slice(0, 2);

        // junta respuestas y mezcla
        const opciones = [correcto, ...incorrectos].sort(() => 0.5 - Math.random());

        // muestra pregunta y opciones
        preguntaDiv.innerHTML = `
          <h3>¿Cuál de estos personajes se llama <span style="color:blue;">${correcto.name}</span>?</h3>
        `;

        opcionesDiv.innerHTML = "";

        opciones.forEach(op => {
          const btn = document.createElement("button");
          btn.textContent = op.name;
          btn.style.display = "block";
          btn.style.margin = "10px";
          btn.style.padding = "10px";
          btn.style.width = "100%";

          btn.addEventListener("click", () => {
            if (op.id === correcto.id) {
              puntuacion++;
              puntosSpan.textContent = puntuacion;
              alert("¡Correcto!");
            } else {
              alert("Incorrecto");
            }
          });

          opcionesDiv.appendChild(btn);
        });

      });
  }

  // cargar primera pregunta
  cargarPregunta();

  document.getElementById("btnSiguiente").addEventListener("click", async () => {
    cargarPregunta();

    // guardar puntuación actual en firebase
    if (auth.currentUser) {
      const uid = auth.currentUser.uid;

      await setDoc(doc(db, "trivia", uid), {
        puntuacion: puntuacion,
        fecha: new Date().toLocaleString()
      });

      console.log("Puntuación guardada");
    }
  });
}

