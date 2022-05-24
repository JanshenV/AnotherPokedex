//Styles
import './Body.css';

//Components
import Header from '../Header';

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
            const fetch151 = await fetch(`${pokeApiUrl}pokemon?limit=4&offset=0`);
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
                <div className="pokedexContainer">
                    {
                        pokedexList.map((pokemon, index) => {
                            const {
                                sprites: { front_default },
                                types
                            } = pokemon;
                            const initialUpperCaseName = `${pokemon.name[0].toUpperCase()}${pokemon.name.slice(1)}`;
                            const typeNames = types.map(({ type: { name } }) => {
                                return name;
                            });
                            console.log(pokemon)
                            return (
                                <div
                                    className="pokemonContainer"
                                    key={index}
                                >
                                    <h1>{initialUpperCaseName}</h1>
                                    <div className="pokemonTypes">
                                        Types:
                                        <span>
                                            {
                                                ` ${typeNames[0][0].toUpperCase()}${typeNames[0].slice(1)}`
                                            }
                                        </span>
                                        <span>
                                            {
                                                typeNames[1] ?
                                                    ` / ${typeNames[1][0].toUpperCase()}${typeNames[1].slice(1)}`
                                                    :
                                                    null
                                            }
                                        </span>
                                    </div>
                                    <h3>
                                        #{pokemon.id}
                                    </h3>
                                    <img
                                        className="pokemonFront"
                                        src={front_default}
                                        alt="Pokemon's front image"
                                    />
                                </div>
                            );
                        })
                    }
                </div>
            }
        </main>
    );
};

