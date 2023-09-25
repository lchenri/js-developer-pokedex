const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function imprimeModal(number, name, attack, defense, speed) {

    document.getElementById("modalPokemonName").textContent = name;
    document.getElementById("modalPokemonImg").src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${number}.svg`;
    document.getElementById("modalPokemonAttack").textContent = attack;
    document.getElementById("modalPokemonDefense").textContent = defense;
    document.getElementById("modalPokemonSpeed").textContent = speed;

    document.getElementById("myModal").style.display = "block";
}

function fecharModal(){
    document.getElementById("myModal").style.display = "none";
}

function convertPokemonToLi(pokemon) {
    return `
        <li onClick="imprimeModal('${pokemon.number}', '${pokemon.name}', '${pokemon.attack}', '${pokemon.defense}', '${pokemon.speed}')" class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})