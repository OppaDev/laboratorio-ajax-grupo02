async function loadTypes() {
    const response = await fetch('https://pokeapi.co/api/v2/type');
    const data = await response.json();
    const select = document.getElementById('type-filter');
    data.results.forEach(type => {
      const option = document.createElement('option');
      option.value = type.name;
      option.textContent = type.name;
      select.appendChild(option);
    });
  }
  
  async function applyFilters() {
    const type = document.getElementById('type-filter').value;
    const minAttack = parseInt(document.getElementById('min-attack').value) || 0;
  
    const filteredPokemon = await Promise.all(allPokemon.map(async (pokemon) => {
      const data = await getPokemon(pokemon.name);
      return {
        ...pokemon,
        types: data.types.map(t => t.type.name),
        attack: data.stats.find(s => s.stat.name === 'attack').base_stat
      };
    }));
  
    const filtered = filteredPokemon.filter(pokemon => 
      (type ? pokemon.types.includes(type) : true) && pokemon.attack >= minAttack
    );
  
    allPokemon = filtered; // Update for pagination
    currentPage = 1;
    displayPage(currentPage);
  }
  
  // Call this with loadAllPokemon
  loadTypes();