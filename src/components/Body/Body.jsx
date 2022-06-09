//Styles
import './Body.css';

//Components
import Header from '../Header';
import PokemonPopulate from '../PokemonPopulate';

//Util
import { allRegions } from '../../util/staticArray';

//React Hooks
import { useState, useEffect } from 'react';

//Api
import {
    handlePokedex, handleIndividualPokemon
} from '../../api/apiCalls';

//Assets
import loadingIcon from '../../assets/loadingIcon.png';

export default function Body({ }) {

    const [pokedexList, setPokedexList] = useState([]);
    const [permaPokedexList, setPermaPokedexList] = useState([]);
    const [loading, setLoading] = useState(true);
    const selectedRegion = localStorage.getItem('selectedRegion');

    useEffect(() => {
        async function fetchPokedex() {
            const {
                pokedexResponse, error
            } = await handlePokedex(selectedRegion ? selectedRegion : 'kanto');
            if (error) return alert(`${error}. Refresh page`);

            setPokedexList(pokedexResponse);
            setPermaPokedexList(pokedexResponse);
            setLoading(false);
        };
        fetchPokedex();
    }, []);

    async function searchPokemonFilter(event, setSearchInputValue) {
        let pokemonName = event.target.value;
        setSearchInputValue(pokemonName);
        pokemonName = pokemonName.toLowerCase();


        if (!pokemonName.length) return setPokedexList(permaPokedexList);

        const filteredPokedexList = permaPokedexList.filter((pokemon) => {
            return pokemon.name.toLowerCase().includes(pokemonName) ||
                String(pokemon.dexnr).includes(pokemonName)
        });
        if (!filteredPokedexList) return setPokedexList(setPermaPokedexList);

        return setPokedexList(filteredPokedexList);
    };

    async function handleRegionalPokedex(region) {
        if (!region || selectedRegion === region) return;
        setLoading(true);

        const {
            pokedexResponse,
            error
        } = await handlePokedex(region);

        if (error) return alert(`${error}. Refresh page.`);
        setPermaPokedexList(pokedexResponse);
        setPokedexList(pokedexResponse);
        localStorage.setItem('selectedRegion', region);
        setLoading(false);
    };

    async function requestPokemon(event, searchInputValue) {
        const keyPressed = event.key;

        if (keyPressed !== 'Enter') return;

        const {
            pokedexResponse,
            error
        } = await handleIndividualPokemon(searchInputValue);

        if (error) return;

        setPokedexList(pokedexResponse);
    };

    return (
        <main className='bodyContainer'>
            <Header
                searchPokemon={searchPokemonFilter}
                requestPokemon={requestPokemon}
            />

            {!loading &&
                <>
                    <div className="pokedexRegionMenu">
                        <select
                            onChange={({ target: { value } }) => handleRegionalPokedex(value)}
                        >
                            <option value="" disabled={true}> Choose Pokedex Region </option>
                            {
                                allRegions.map(({ textContent }, index) => {
                                    return (
                                        <option
                                            value={textContent}
                                            key={index}
                                        >
                                            {
                                                `${textContent} Pokedex`
                                            }
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </>
            }

            {loading ?
                <img
                    className="loadingIcon"
                    src={loadingIcon}
                    alt="Your Content is Loading"
                />
                :
                <PokemonPopulate
                    pokedexList={pokedexList}
                    selectedRegion={selectedRegion}
                />
            }
        </main>
    );
};

