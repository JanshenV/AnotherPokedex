const baseUrl = process.env.REACT_APP_BASE_URL ||
    process.env.REACT_APP_DEV_URL;

export async function handlePokedex(region) {
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'Application/json'
            }
        };

        const pokedexRequest = await fetch(`${baseUrl}pokedex/${region}`, requestOptions);
        console.log(pokedexRequest)
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

