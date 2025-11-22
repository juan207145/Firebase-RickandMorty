export default function mostrarHome() {
  const app = document.querySelector('#app');

  app.innerHTML = `
    <h2>Personajes de Rick and Morty</h2>
    <div id="contenedor" style="
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      padding: 10px;
    "></div>
  `;

  const contenedor = document.querySelector('#contenedor');

  fetch('https://rickandmortyapi.com/api/character')
    .then(res => res.json())
    .then(data => {
      const personajes = data.results;

      contenedor.innerHTML = "";

      personajes.forEach(personaje => {
        const card = document.createElement("div");
        card.style.border = "1px solid #ccc";
        card.style.padding = "10px";
        card.style.borderRadius = "10px";
        card.style.background = "#f8f8f8";

        card.innerHTML = `
          <img src="${personaje.image}" style="width:100%; border-radius:10px;">
          <h3>${personaje.name}</h3>
          <p><strong>Estado:</strong> ${personaje.status}</p>
          <p><strong>Especie:</strong> ${personaje.species}</p>
        `;

        contenedor.appendChild(card);
      });
    })
    .catch(err => {
      contenedor.innerHTML = "<p>Error al cargar personajes</p>";
      console.error(err);
    });
}
