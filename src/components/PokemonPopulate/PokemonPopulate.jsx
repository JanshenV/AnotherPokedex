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

//React
import { useEffect, useState } from 'react';

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
    const pokedexListLength = pokedexList.length;
    const [sliceParameter, setSliceParameter] = useState(0);

    async function handlePagination(direction) {

        if (direction === 'left') {
            if (sliceParameter <= 0) {
                setSliceParameter(0);
                return;
            };
            setSliceParameter(sliceParameter - 1);
            return;
        };

        if (direction === 'right') {
            if (sliceParameter + 5 >= pokedexListLength) {
                return;
            };
            setSliceParameter(sliceParameter + 1);
            return;
        };
    };

    useEffect(() => {
        setSliceParameter(0);
    }, [pokedexList]);


    return (
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
    );
};

