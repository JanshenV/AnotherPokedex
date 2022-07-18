//React
import { useState, useEffect } from 'react';

//Util
import { organizingSprites } from '../../util/organizingRandomSprites';

//PropTypes
import PropTypes from 'prop-types';

PokemonSprites.propTypes = {
    sprites: PropTypes.arrayOf(
        PropTypes.object
    ),
    iconSprites: PropTypes.bool
};

PokemonSprites.defaultProps = {
    sprites: [{}]
};


export default function PokemonSprites({ sprites, iconSprites }) {
    const [pokemonSprites, setPokemonSprites] = useState([]);

    useEffect(() => {
        organizingSprites(sprites, setPokemonSprites, iconSprites);
    }, [sprites, iconSprites]);

    return (
        <img
            width='200px'
            height='200px'
            src={pokemonSprites}
            alt='Pokemon Image'
        />
    );
};
