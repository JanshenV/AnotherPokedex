const baseUrl = 'https://anotherpokedexdb.herokuapp.com/';

<<<<<<< HEAD:src/api/apiCalls.js

=======
>>>>>>> 0bc3b920578a0a0723459f70c1590e48b8da0202:src/api/apiCalls.jsx
export default async function handlePokedex(region) {
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'Application/json'
            }
        };

        const pokedexRequest = await fetch(`${baseUrl}pokedex/${region}`, requestOptions);
        if (!pokedexRequest.ok) throw 'Pokedex request failed';

        const pokedexResponse = await pokedexRequest.json();

        return { pokedexResponse };
    } catch (error) {
        return { error };
    };
};
<<<<<<< HEAD:src/api/apiCalls.js

=======
>>>>>>> 0bc3b920578a0a0723459f70c1590e48b8da0202:src/api/apiCalls.jsx
