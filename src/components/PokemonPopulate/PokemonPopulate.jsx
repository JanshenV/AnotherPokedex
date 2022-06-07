//Styles
import './PokemonPopulate.css';
import '../../css/Global.css';

//Assets
import pokeballIcon from '../../assets/pokeballIcon.png';

//React
import { useState } from 'react';

//Components
import PokemonSprites from '../PokemonSprites';
import PokemonTypes from '../PokemonTypes';

//PropTypes
import PropTypes from 'prop-types';

PokemonPopulate.propTypes = {
    pokedexList: PropTypes.arrayOf(
        PropTypes.object
    ),
    selectedRegion: PropTypes.string
};

PokemonPopulate.defaultProps = {
    pokedexList: [{}],
};

export default function PokemonPopulate({ pokedexList, selectedRegion }) {
    const pokedexListLength = pokedexList.length;
    const [iconSprites, setIconSprites] = useState(false);

    return (
        <>
            <h1 style={{
                fontFamily: 'Montserrat, sansSerif',
                marginBottom: '10px'
            }}>
                {selectedRegion ? `${selectedRegion} Pokedex` : 'Kanto Pokedex'}
            </h1>
            <div
                className={`${pokedexListLength > 5 ? 'pokedexContainer' : 'notGrid'}`}>
                {
                    pokedexListLength ?
                        <img
                            className='pokeballChangeSprites'
                            src={pokeballIcon}
                            alt="Change pokemon sprite"
                            onClick={() => { setIconSprites(!iconSprites) }}
                        />
                        :
                        null
                }
                {
                    pokedexList.map((pokemon, index) => {
                        const { types, sprites } = pokemon;

                        return (
                            <div
                                className={`mainPokemonContainer ${iconSprites ? 'pokemonIconsContainer' : 'pokemonContainer'}`}
                                key={index}
                            >
                                <PokemonSprites
                                    sprites={sprites}
                                    iconSprites={iconSprites}
                                />
                                <h3>#{pokemon.id}</h3>
                                <h2>{pokemon.name}</h2>

                                <PokemonTypes
                                    types={types}
                                />
                            </div>
                        );
                    })
                }
            </div>
        </>
    );
};

