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
        <div class="d-flex justify-content-between align-items-center my-3">
        <button class="btn btn-primary" onclick="changePage(-1)">
        <i class="bi bi-arrow-left"></i> Anterior
        </button>
        <span>Página ${currentPage} de ${totalPages}</span>
        <button class="btn btn-primary" onclick="changePage(1)">
        Siguiente <i class="bi bi-arrow-right"></i>
        </button>
        </div>
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

