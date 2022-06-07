//Styles
import './PokemonPopulate.css';
import '../../css/Global.css';

//Icons
import {
    ArrowCircleLeftIcon as ArrowLeft,
    ArrowCircleRightIcon as ArrowRight
} from '@heroicons/react/solid'

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

    return (
        <>
            <h1 style={{
                fontFamily: 'Montserrat, sansSerif',
                marginBottom: '20px'
            }}>
                {selectedRegion ? `${selectedRegion} Pokedex` : 'Kanto Pokedex'}
            </h1>
            <div className={`${pokedexListLength > 5 ?
                'pokedexContainer' : 'notGrid'
                }`}>

                {
                    pokedexList.map((pokemon, index) => {
                        const { types, sprites } = pokemon;
                        const backgroundFirstType = types[0].name;

                        return (
                            <div
                                className={`pokemonContainer`}
                                key={index}
                            >
                                <PokemonSprites
                                    sprites={sprites}
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

