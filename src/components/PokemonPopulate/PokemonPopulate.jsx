//Styles
import './PokemonPopulate.css';
import '../../css/Global.css';

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
                    const backgroundFirstType = types[0].type.name;
                    const initialUpperCaseName = `${pokemon.name[0].toUpperCase()}${pokemon.name.slice(1)}`;

                    return (
                        <div
                            className={`pokemonContainer ${backgroundFirstType}`}
                            key={index}
                        >

                            <h2>{initialUpperCaseName}</h2>

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

