//Styles
import './Body.css';

//Components
import Header from '../Header';
import PokemonPopulate from '../PokemonPopulate';

//React Hooks
import { useState, useEffect } from 'react';

//Api
import handlePokedex from '../../api/apiCalls';

//Assets
import loadingIcon from '../../assets/loadingIcon.png';

export default function Body({ }) {

    const [pokedexList, setPokedexList] = useState([]);
    const [permaPokedexList, setPermaPokedexList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPokedex() {
            const {
                pokedexResponse, error
            } = await handlePokedex('kanto');
            if (error) return alert(`${error}. Refresh page`);

            setPokedexList(pokedexResponse);
            setPermaPokedexList(pokedexResponse);
            setLoading(false);
        };
        fetchPokedex();
    }, []);

    async function searchPokemon(event, setSearchInputValue) {
        const pokemonName = event.target.value.toLowerCase();
        setSearchInputValue(pokemonName);

        if (!pokemonName.length) return setPokedexList(permaPokedexList);

        const filteredPokedexList = permaPokedexList.filter((pokemon) => {
            return pokemon.name.toLowerCase().includes(pokemonName)
        });

        if (!filteredPokedexList) return setPokedexList(permaPokedexList);

        return setPokedexList(filteredPokedexList);
    };


    return (
        <main className='bodyContainer'>
            <Header
                searchPokemon={searchPokemon}
            />

            {loading ?
                <img
                    className="loadingIcon"
                    src={loadingIcon}
                    alt="Your Content is Loading"
                />
                :
                <PokemonPopulate
                    pokedexList={pokedexList}
                />
            }
        </main>
    );
};

