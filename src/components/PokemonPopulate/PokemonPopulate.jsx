//Styles
import './PokemonPopulate.css';

//Components
import PokemonSprites from '../PokemonSprites';
import PokemonTypes from '../PokemonTypes';


//PropTypes
import PropTypes from 'prop-types';

PokemonPopulate.propTypes = {
    pokedexList: PropTypes.arrayOf(
        PropTypes.object
    )
};

PokemonPopulate.defaultProps = {
    pokedexList: [{}]
};

export default function PokemonPopulate({ pokedexList }) {
    return (
        <div className="pokedexContainer">
            {
                pokedexList.map((pokemon, index) => {
                    const { types, sprites } = pokemon;

                    const initialUpperCaseName = `${pokemon.name[0].toUpperCase()}${pokemon.name.slice(1)}`;


                    return (
                        <div
                            className="pokemonContainer"
                            key={index}
                        >

                            <h1>{initialUpperCaseName}</h1>

                            <PokemonTypes
                                types={types}
                            />

                            <h3>#{pokemon.id}</h3>
                            <PokemonSprites
                                sprites={sprites}
                            />
                        </div>
                    );
                })
            }
        </div>
    );
};

