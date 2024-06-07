let allPokemon = [];
let currentPage = 1;
const pokemonPerPage = 10;

// Función para cargar todos los Pokémon
async function loadAllPokemon() {
  showLoader();
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=898');
  const data = await response.json();
  allPokemon = data.results;
  hideLoader();
  displayPage(currentPage);
}

// Función para mostrar una página de Pokémon
function displayPage(page) {
  const start = (page - 1) * pokemonPerPage;
  const end = start + pokemonPerPage;
  const pagePokemons = allPokemon.slice(start, end);

  const container = document.getElementById('pokemon-list');
  container.innerHTML = ''; // Limpiar contenido previo

  pagePokemons.forEach(async (pokemon) => {
    const pokemonData = await getPokemon(pokemon.name);
    if (pokemonData) {
      const card = createPokemonCard(pokemonData);
      container.appendChild(card);
    }
  });

  updatePaginationControls();
}

// Función para actualizar los controles de paginación
function updatePaginationControls() {
  const totalPages = Math.ceil(allPokemon.length / pokemonPerPage);
  const controls = document.getElementById('pagination-controls');
  controls.innerHTML = `
    <button onclick="changePage(-1)">Anterior</button>
    <span>Página ${currentPage} de ${totalPages}</span>
    <button onclick="changePage(1)">Siguiente</button>
  `;
}

// Función para cambiar de página
function changePage(delta) {
  const newPage = currentPage + delta;
  if (newPage > 0 && newPage <= Math.ceil(allPokemon.length / pokemonPerPage)) {
    currentPage = newPage;
    displayPage(currentPage);
  }
}

// Función para obtener datos de un Pokémon (ya la tienes, pero la modifiqué para usar caché)
const pokemonCache = {};
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

// Función para crear una tarjeta de Pokémon (modifiqué ligeramente tu código)
function createPokemonCard(data) {
  const card = document.createElement('div');
  card.className = 'pokemon-card';
  card.innerHTML = `
    <h3>${data.name}</h3>
    <img src="${data.sprites.front_default}" alt="${data.name}" loading="lazy">
    <p>Altura: ${data.height / 10} m</p>
    <p>Peso: ${data.weight / 10} kg</p>
  `;
  return card;
}

// Funciones para mostrar/ocultar el loader (tu código original)
function showLoader() {
  document.getElementById('loader').style.display = 'block';
}

function hideLoader() {
  document.getElementById('loader').style.display = 'none';
}

// Event listeners
document.addEventListener('DOMContentLoaded', loadAllPokemon);

document.getElementById('search-button').addEventListener('click', () => {
  const search = document.getElementById('search').value.toLowerCase();
  const pokemonIndex = allPokemon.findIndex(p => p.name === search);
  if (pokemonIndex !== -1) {
    currentPage = Math.floor(pokemonIndex / pokemonPerPage) + 1;
    displayPage(currentPage);
  } else {
    alert('Pokémon no encontrado');
  }
});

document.getElementById('refresh-button').addEventListener('click', () => {
  document.getElementById('search').value = '';
  currentPage = 1;
  displayPage(currentPage);
});

document.getElementById('random').addEventListener('click', async () => {
  const randomId = Math.floor(Math.random() * 898) + 1;
  const pokemonData = await getPokemon(allPokemon[randomId - 1].name);
  if (pokemonData) {
    const container = document.getElementById('pokemon-list');
    container.innerHTML = '';
    container.appendChild(createPokemonCard(pokemonData));
    document.getElementById('pagination-controls').innerHTML = ''; // Ocultar paginación
  }
});