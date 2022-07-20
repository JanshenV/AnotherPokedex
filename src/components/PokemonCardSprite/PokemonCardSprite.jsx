//Styles
import './PokemonCardSprite.css';

//React
import {useState,  useEffect } from 'react';

//Global Provider
import useGlobal from '../../hooks/useGlobal';

//Util
import { organizingSprites } from '../../util/organizingRandomSprites';

//PropTypes
import PropTypes from 'prop-types';

PokemonCardSprite.propTypes = {
    sprites: PropTypes.arrayOf(
        PropTypes.object
    ),
    iconSprites: PropTypes.bool
};

PokemonCardSprite.defaultProps = {
    sprites: [{}]
};

export default function PokemonCardSprite({sprites, iconSprites}) {
    const [pokemonCardSprite, setPokemonCardSprite] = useState([]);

    useEffect(() => {
        organizingSprites(sprites, setPokemonCardSprite, iconSprites);
    }, [sprites, iconSprites]);

    return (
        <img
            className="PokemonSprite"
            src={pokemonCardSprite}
            alt='Pokemon Image'
        />
    );
};
