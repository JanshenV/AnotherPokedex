//Styles
import './Body.css';

//Components
import Header from '../Header';
import PokemonPopulate from '../PokemonPopulate';


//Util
import allRegions from '../../util/staticArray';

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
    const [selectedRegion, setSelectedRegion] = useState('Kanto Pokedex');

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
        let pokemonName = event.target.value;
        setSearchInputValue(pokemonName);
        pokemonName = pokemonName.toLowerCase();


        if (!pokemonName.length) return setPokedexList(permaPokedexList);

        const filteredPokedexList = permaPokedexList.filter((pokemon) => {
            return pokemon.name.toLowerCase().includes(pokemonName) ||
                String(pokemon.dexnr).includes(pokemonName)
        });

        if (!filteredPokedexList) return setPokedexList(permaPokedexList);

        return setPokedexList(filteredPokedexList);
    };

    async function handleRegionalPokedex(region) {
        if (!region) return;
        setLoading(true);

        const {
            pokedexResponse,
            error
        } = await handlePokedex(region);

        if (error) return alert(`${error}. Refresh page.`);
        setPermaPokedexList(pokedexResponse);
        setPokedexList(pokedexResponse);
        setSelectedRegion(`${region} Pokedex`);
        setLoading(false);
    };



    return (
        <main className='bodyContainer'>
            <Header
                searchPokemon={searchPokemon}
            />

            {!loading &&
                <>
                    <div className="pokedexRegionMenu">
                        <label for="chooseRegion">
                            Choose Pokedex Region:
                        </label>
                        <select
                            onChange={({ target: { value } }) => handleRegionalPokedex(value)}
                            name="chooseRegion"
                        >
                            <option value=""> - </option>
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
                    <h1>{selectedRegion}</h1>
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
                />
            }
        </main>
    );
};

