const pokeApi = {}

pokeApi.getPokemonDetail = (pokemon)=>{
    return fetch(pokemon.url)
    .then((response) => response.json(''))
}

pokeApi.getPokemons = (offset=0, limit=10) => { /*essa função abstrai o consumo do http e dá o resultado. Para funcionar, 
precisa ser importado antes do main*/
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
    .then((response) => response.json()) /* o fetch nos retorna uma promise */
    .then((jsonBody) => jsonBody.results)
    .catch((error) => console.error(error))
    .then((pokemonOl) => pokemonOl.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests)) /* recebe um array de promise */
    .then((pokemonDetails) => pokemonDetails)
}

