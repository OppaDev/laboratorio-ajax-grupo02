document.getElementById('search-button').addEventListener('click', () => {
    const loder = document.getElementById('pokemon');
    loder.innerHTML = `
    <div aria-label="Orange and tan hamster running in a metal wheel" role="img" class="wheel-and-hamster">
	<div class="wheel"></div>
	<div class="hamster">
		<div class="hamster__body">
			<div class="hamster__head">
				<div class="hamster__ear"></div>
				<div class="hamster__eye"></div>
				<div class="hamster__nose"></div>
			</div>
			<div class="hamster__limb hamster__limb--fr"></div>
			<div class="hamster__limb hamster__limb--fl"></div>
			<div class="hamster__limb hamster__limb--br"></div>
			<div class="hamster__limb hamster__limb--bl"></div>
			<div class="hamster__tail"></div>
		</div>
	</div>
	<div class="spoke"></div>
</div>
    `;
    const search = document.getElementById('search').value;
    fetch(`https://pokeapi.co/api/v2/pokemon/${search}`)
        .then(response => {
            const pokemon = document.getElementById('pokemon');
            if (response.status === 200) {
                response.json().then(data => {
                    pokemon.innerHTML = `
                        <h2>${data.name}</h2>
                        <img src="${data.sprites.front_default}" alt="${data.name}">
                        <p>Altura: ${data.height}</p>
                        <p>Peso: ${data.weight}</p>
                    `;
                });
            } else {
                pokemon.innerHTML = `
                    <h2>Pokemon no encontrado</h2>
                    <img src="../img/poketroll.png">
                `;
            }
        })
});

document.getElementById('refresh-button').addEventListener('click', () => {
    document.getElementById('search').value = '';
    document.getElementById('pokemon').innerHTML = '';
});

document.getElementById('random').addEventListener('click', () => {
    const loder = document.getElementById('pokemon');
    loder.innerHTML = `
    <div aria-label="Orange and tan hamster running in a metal wheel" role="img" class="wheel-and-hamster">
    <div class="wheel"></div>
    <div class="hamster">
        <div class="hamster__body">
            <div class="hamster__head">
                <div class="hamster__ear"></div>
                <div class="hamster__eye"></div>
                <div class="hamster__nose"></div>
            </div>
            <div class="hamster__limb hamster__limb--fr"></div>
            <div class="hamster__limb hamster__limb--fl"></div>
            <div class="hamster__limb hamster__limb--br"></div>
            <div class="hamster__limb hamster__limb--bl"></div>
            <div class="hamster__tail"></div>
        </div>
    </div>
    <div class="spoke"></div>
</div>
    `;
    fetch(`https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 1000)}`)
        .then(response => {
            const pokemon = document.getElementById('pokemon');
            if (response.status === 200) {
                response.json().then(data => {
                    pokemon.innerHTML = `
                        <h2>${data.name}</h2>
                        <img src="${data.sprites.front_default}" alt="${data.name}">
                        <p>Altura: ${data.height}</p>
                        <p>Peso: ${data.weight}</p>
                    `;
                });
            } else {
                pokemon.innerHTML = `
                    <h2>Pokemon no encontrado</h2>
                    <img src="../img/poketroll.png">
                `;
            }
        })
});

