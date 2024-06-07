// Variables globales
let allPokemon = [];
let currentPage = 1;
const pokemonPerPage = 20;

// Función para cargar todos los Pokémon
async function loadAllPokemon() {
  showLoader();
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025');
    const data = await response.json();
    allPokemon = data.results;
    hideLoader();
    displayPage(currentPage);
    populateTypeFilter();
  } catch (error) {
    console.error("Error loading Pokémon:", error);
    hideLoader();
  }
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
  resetFilters();
  currentPage = 1;
  displayPage(currentPage);
});

document.getElementById('random').addEventListener('click', async () => {
  const randomId = Math.floor(Math.random() * allPokemon.length);
  const pokemonData = await getPokemon(allPokemon[randomId].name);
  if (pokemonData) {
    const container = document.getElementById('pokemon-list');
    container.innerHTML = '';
    container.appendChild(createPokemonCard(pokemonData));
    document.getElementById('pagination-controls').innerHTML = '';
  }
});