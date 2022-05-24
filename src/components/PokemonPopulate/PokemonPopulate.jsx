//Styles
import './PokemonPopulate.css';

export default function PokemonPopulate({ pokedexList }) {
    return (
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

                    return (
                        <div
                            className="pokemonContainer"
                            key={index}
                        >
                            <h1>{initialUpperCaseName}</h1>
                            <div className="pokemonTypes">
                                Type:
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
    );
};

