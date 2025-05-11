// Función para mostrar los personajes en el contenedor
function mostrarPersonajes(personajes) {
  const container = document.getElementById('data-container');
  container.innerHTML = ''; // Limpiar el contenedor antes de mostrar nuevos datos

  personajes.forEach(personaje => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
      <h3>${personaje.name}</h3>
      <img src="${personaje.image}" alt="${personaje.name}">
    `;

    container.appendChild(card);
  });
}

// Función para obtener los datos usando fetch
function obtenerConFetch() {
  fetch('https://rickandmortyapi.com/api/character')
    .then(response => response.json())
    .then(data => {
      mostrarPersonajes(data.results);
    })
    .catch(error => console.error('Error con Fetch:', error));
}

// Función para obtener los datos usando Axios
function obtenerConAxios() {
  axios.get('https://rickandmortyapi.com/api/character')
    .then(response => {
      mostrarPersonajes(response.data.results);
    })
    .catch(error => console.error('Error con Axios:', error));
}

// Asignación de eventos a los botones
document.getElementById('fetch-btn').addEventListener('click', obtenerConFetch);
document.getElementById('axios-btn').addEventListener('click', obtenerConAxios);
