//Styles
import './PokemonSprites.css';

//React
import { useState, useEffect } from 'react';

//Util
import organizingSprites from '../../util/organizingRandomSprites';

//PropTypes
import PropTypes from 'prop-types';

PokemonSprites.propTypes = {
    sprites: PropTypes.arrayOf(
        PropTypes.object
    )
};

PokemonSprites.defaultProps = {
    sprites: [{}]
};


export default function PokemonSprites({ sprites }) {

    const [pokemonSprites, setPokemonSprites] = useState([]);

    useEffect(() => {

        const { sprite } = organizingSprites(sprites, setPokemonSprites);

    }, []);
    return (
        <img
            className="pokemonSprite"
            src={pokemonSprites}
            alt='Pokemon Image'
        />
    );
};
