
let todosPokemon = [];
let actualPagina = 1;
const catidadPorPagina = 20;

async function caragarTodosPokemon() {
    try {
        //peticion a la api
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
        const data = await response.json();
        todosPokemon = data.results;
        mostrarPagina(actualPagina);
    } catch (error) {
        console.error(error);
    }
}


function mostrarPagina(pagina) {
    //calcular inicio y final
    const inicio = (pagina - 1) * catidadPorPagina;
    const final = inicio + catidadPorPagina;
    const paginaPokemon = todosPokemon.slice(inicio, final);
    //mostrar en el html
    const contenedor = document.getElementById('pokemon-list');
    contenedor.innerHTML = ''; //limpiar
    //recorrer los pokemones de la pagina
    paginaPokemon.forEach(async (pokemon) => {
        const datosPokemon = await getPokemon(pokemon.name);
        const card = createPokemonCard(datosPokemon);
        contenedor.appendChild(card);
    });

    actualizarControlesPaginasion();    
}


function actualizarControlesPaginasion() {
    const totalPaginas = Math.ceil(todosPokemon.length / catidadPorPagina);
    const controles = document.getElementById('pagination-controls');
    controles.innerHTML = `
        <button onclick="cambiarPagina(-1)">Anterior</button>
        <span>Pagina ${actualPagina} de ${totalPaginas}</span>
        <button onclick="cambiarPagina(1)">Siguiente</button>
    `;
}


function cambiarPagina(cambio) {
    const nuevaPagina = actualPagina + cambio;
    if (nuevaPagina > 0 && nuevaPagina <= Math.ceil(todosPokemon.length / catidadPorPagina)) {
        actualPagina = nuevaPagina;
        mostrarPagina(actualPagina);
    }
}


caragarTodosPokemon();

