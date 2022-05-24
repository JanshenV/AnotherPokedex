//Styles
import './Body.css';

//Components
import Header from '../Header';
import PokemonPopulate from '../PokemonPopulate';

//React Hooks
import { useState, useEffect } from 'react';

//Util
import pokeApiUrl from '../../util/constants';

//Assets
import loadingIcon from '../../assets/loadingIcon.png';

export default function Body({ }) {

    const [pokedexList, setPokedexList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPokedex() {
            const fetch151 = await fetch(`${pokeApiUrl}pokemon?limit=151&offset=0`);
            if (fetch151.ok) {
                const { results: rawPokedex } = await fetch151.json();
                const localPokedexList = [];

                for (let { url } of rawPokedex) {
                    const fetchIndividual = await fetch(`${url}`);

                    if (fetchIndividual.ok) {
                        const pokemonInfo = await fetchIndividual.json();
                        localPokedexList.push(pokemonInfo);
                    };
                };

                setPokedexList(localPokedexList);
                setLoading(false);
            };
        };
        fetchPokedex();
    }, []);


    return (
        <main className='bodyContainer'>
            <Header />

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

