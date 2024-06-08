// Caché para datos de Pokémon
const pokemonCache = {};

// Función optimizada para obtener datos de un Pokémon
async function getPokemon(name) {
  if (pokemonCache[name]) return pokemonCache[name];

  showLoader();
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    pokemonCache[name] = data;
    return data;
  } catch (error) {
    console.error(`Error fetching ${name}:`, error);
    return null;
  } finally {
    hideLoader();
  }
}

// Función para crear una tarjeta de Pokémon con sus datos
function createPokemonCard(data) {
  const card = document.createElement('div');
  card.className = 'pokemon-card';
  card.innerHTML = `
    <div class="card h-100 pokemon-card">
  <div class="card-header bg-primary text-white">
    <h5 class="card-title text-capitalize mb-0">${data.name}</h5>
  </div>
  <div class="row g-0">
    <div class="col-md-8">
      <img src="${data.sprites.front_default}" class="img-fluid rounded-start p-3" alt="${data.name}" loading="lazy">
      <div class="card-body">
        <ul class="list-group list-group-flush">
          <li class="list-group-item d-flex justify-content-between">
            <span>Altura:</span>
            <span>${data.height / 10} m</span>
          </li>
          <li class="list-group-item d-flex justify-content-between">
            <span>Peso:</span>
            <span>${data.weight / 10} kg</span>
          </li>
          <li class="list-group-item d-flex justify-content-between">
            <span>Exp: </span>
            <span>${data.base_experience}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-md-4 d-flex flex-column">
      <button class="btn btn-link text-start text-decoration-none p-3 mt-auto" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#statsCollapse${data.id}" 
              aria-expanded="true" 
              aria-controls="statsCollapse${data.id}">
        <span class="text-muted">Stats</span>
        <i class="bi bi-chevron-right float-end"></i>
      </button>
      <div class="collapse show" id="statsCollapse${data.id}">
        <ul class="list-group list-group-flush">
          ${data.stats.map(stat => `
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <span class="text-capitalize">${stat.stat.name}</span>
              <span class="badge bg-primary rounded-pill">${stat.base_stat}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    </div>
  </div>
</div>
  `;
  return card;
}

// Funciones para mostrar/ocultar el loader
function showLoader() {
  document.getElementById('loader').style.display = 'block';
}

function hideLoader() {
  document.getElementById('loader').style.display = 'none';
}