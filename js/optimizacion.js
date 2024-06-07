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

// Función para crear una tarjeta de Pokémon (usando template literals para mejor rendimiento)
function createPokemonCard(data) {
  const card = document.createElement('div');
  card.className = 'pokemon-card';
  card.innerHTML = `
    <h3>${data.name}</h3>
    <img src="${data.sprites.front_default}" alt="${data.name}" loading="lazy">
    <p>Altura: ${data.height / 10} m</p>
    <p>Peso: ${data.weight / 10} kg</p>
    <p>Experiencia base: ${data.base_experience}</p>
    <p>Stats:</p>
    <ul>
      ${data.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('')}
    </ul>
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