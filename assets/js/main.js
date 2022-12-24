const pokemonOl = document.getElementById('pokemonOl')
const buttonPagination = document.getElementById('loadMoreButton')
const limit = 10;
let offset = 0;

function convertPokemonTypesToList(pokemonTypes) {
    return pokemonTypes.map((typeSlot) => `<li class="type ${typeSlot.type.name}">${typeSlot.type.name}</li>`)
}
function convertPokemonTypesToList2(types) {
    return types.map((type) => `<li class="dtype ${type}">${type}</li>`)
}

function convertPokemonAbilitiesToList(abilities,type){
    return abilities.map((ability)=>`<li class="dability ${type}">${ability}</li>`)
}
function convertPokemonStatsToList(pokestats,type){
    return pokestats.map((stats)=>`<li class="${type}" style= "width:${stats}%; border-radius:0.5rem;
    padding: 0 0 0 .5rem;">${stats}</li>`)
}

function convertPokemonTypesToNames(pokemonTypes) {
    return pokemonTypes.map((typeSlot) => typeSlot.type.name)
}

function convertPokemonAbilitiesToNames(pokemonAbilities) {
    return pokemonAbilities.map((abilitySlot) => abilitySlot.ability.name)
}
function convertPokemonStatsToNames(pokemonStats){
    return pokemonStats.map((stats) => stats.base_stat)
}


/* const listaHtml = [];    
for (let i = 0; i < pokemonList.length; i++) {
        const pokemon = pokemonList[i];
        listaHtml.push(convertPokemonToList(pokemon))
    }
    pokemonOl.innerHTML = listaHtml.join(''); */

/* os símbolos => são chamados de arrow functions e deixam o código mais limpo */

function convertPokemonToList(pokemon) {
    const pokemonType = convertPokemonTypesToNames(pokemon.types);
    const pokemonAbilities = convertPokemonAbilitiesToNames(pokemon.abilities);
    const pokemonStats = convertPokemonStatsToNames(pokemon.stats);
        return `
    <li class="pokemon ${pokemonType[0]}">
                <span class="number">#${pokemon.id}</span>
                <button id="btnpokemonDetail" type="button" class="name" onclick="openPokemonDetails('${pokemonType[0]}','${pokemon.id}',
                '${pokemon.name}','${pokemonType}', '${pokemon.weight}','${pokemon.height}','${pokemonAbilities}','${pokemonStats}')" 
                name=${pokemon.name}> <span>${pokemon.name}</span>
                </button>
                <div class="detail">
                    <ol class="types">
                        ${convertPokemonTypesToList(pokemon.types).join('')}
                    </ol>
                    <img src= "https://img.pokemondb.net/sprites/black-white/anim/normal/${pokemon.name}.gif" alt="${pokemon.name}">
                </div>
            </li>
    `
}
function loadMorePokemons(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemonsList = []) => {
        const newHtml = pokemonsList.map(convertPokemonToList).join('')
        pokemonOl.innerHTML += newHtml
    })
}

loadMorePokemons(offset, limit)

buttonPagination.addEventListener('click', () => {
    offset += limit
    loadMorePokemons(offset, limit)
})

function openPokemonDetails(type, id, name, poketypes, weight, height, pokeabilities, pokestats){
    
    const popup = document.getElementById('popup'); 
    const containerPopup = document.getElementById('container-popup');
    containerPopup.style.display = 'block'; 
    popup.style.display = 'block';
    const types = poketypes.split(',');
    const abilities = pokeabilities.split(',');
    const stats = pokestats.split(',');
    pokemonsDetails.innerHTML += `<li class="dpokemon ${type}">
    <div class="dbuttonclose"> <button class="dbuttonclose" type="button" onclick="closePokemonDetails()">X</button>
    </div>
    <div class="dnumber"> <span class="dnumber">#${id}</span>
    </div>
    <div class="dimg"> <img src="https://img.pokemondb.net/sprites/black-white/anim/normal/${name}.gif" alt="${name}">
    </div>
    <div class="dname"> <span class="dname">${name}</span>
    </div>
    <div class="ddetail">
        <ol class="dtypes">
            ${convertPokemonTypesToList2(types).join('')}
        </ol>
    </div>
    <div class="dcharacts"> <span class="dweight">| WT: ${weight/10} Kg |</span>
        <span class="dheight">HT: ${height/10} m |</span>
    </div>
</li>
<section class="contentdetail">
    <div class="contentdabilities">
        <div style="text-align: center;font-weight: bold;"> Abilitys </div>
        <div class="dabilities">
        <ol class="dabilitiesname">
        ${convertPokemonAbilitiesToList(abilities,type).join('')}
        </ol>
        </div>
        </div>
    <div style="text-align: center;font-weight: bold;"> Base Stats </div>
    <div class="dstats">
    <ol class="stats">
    <li>hp</li>
    <li>attack</li>
    <li>deffense</li>
    <li>special-attack</li>
    <li>special-deffense</li>
    <li>speed</li>
  </ol>
  <ol class="statsolist">
    ${convertPokemonStatsToList(stats,type).join('')}
  </ol>
    </div>
</section>`
}

function closePokemonDetails(){
    const popup = document.getElementById('popup'); 
    const containerPopup = document.getElementById('container-popup');
    containerPopup.style.display = 'none'; 
    popup.style.display = 'none';
    const pokemonsDetails = document.getElementById('pokemonsDetails');
    pokemonsDetails.innerHTML = '';

}








