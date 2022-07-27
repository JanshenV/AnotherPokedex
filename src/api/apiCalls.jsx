const baseUrl = 'https://anotherpokedexdb.herokuapp.com/';
// const baseUrl = 'http://localhost:3300/';

export async function handlePokedex(region) {
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'Application/json'
            }
        };

        const pokedexRequest = await fetch(`${baseUrl}pokedex/${region}`, requestOptions);
        if (!pokedexRequest.ok) throw new Error('Pokedex request failed');

        const pokedexResponse = await pokedexRequest.json();

        return { pokedexResponse };
    } catch (error) {
        return { error };
    };
};

export async function handleIndividualPokemon(pokemonName) {
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'Application/json'
            }
        };

        const pokedexRequest = await fetch(`${baseUrl}pokemon/${pokemonName}`, requestOptions);
        if (!pokedexRequest.ok) throw new Error('Pokedex request failed');
        

        const pokedexResponse = await pokedexRequest.json();

        return { pokedexResponse };
    } catch (error) {
        return { error };
    };
};

export async function handlePokemonVariations(pokemonName) {
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'Application/json'
            }
        };

        const pokedexRequest = await fetch(`${baseUrl}variations/${pokemonName}`, requestOptions);
        if (!pokedexRequest.ok) throw new Error('Pokedex request failed');
        

        const pokedexResponse = await pokedexRequest.json();

        return { pokedexResponse };
    } catch (error) {
        return { error };
    };
};

