// Función para poblar el filtro de tipos
async function populateTypeFilter() {
  const response = await fetch('https://pokeapi.co/api/v2/type');
  const data = await response.json();
  const typeFilter = document.getElementById('type-filter');
  data.results.forEach(type => {
    const option = document.createElement('option');
    option.value = type.name;
    option.textContent = type.name;
    typeFilter.appendChild(option);
  });
}

// Función para aplicar filtros
async function applyFilters() {
  const typeFilter = document.getElementById('type-filter').value;
  const minAttack = parseInt(document.getElementById('min-attack').value) || 0;
  const minPeso = parseInt(document.getElementById('min-peso').value) || 0;

  const filteredPokemon = await Promise.all(allPokemon.map(async (pokemon) => {
    const data = await getPokemon(pokemon.name);
    return { pokemon, data };
  }));

  const filtered = filteredPokemon.filter(({ data }) => {
    const hasType = !typeFilter || data.types.some(t => t.type.name === typeFilter);
    const hasMinAttack = data.stats.find(s => s.stat.name === 'attack').base_stat >= minAttack;
    const hasMinPeso = data.weight >= minPeso;
    return hasType && hasMinAttack && hasMinPeso;
  }).map(({ pokemon }) => pokemon);

  allPokemon = filtered;
  currentPage = 1;
  displayPage(currentPage);
}

// Función para resetear filtros
function resetFilters() {
  document.getElementById('type-filter').value = '';
  document.getElementById('min-attack').value = '';
  document.getElementById('min-peso').value = '';
  loadAllPokemon(); // Esto recargará todos los Pokémon
}