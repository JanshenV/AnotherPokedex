//Styles
import './PokemonCardSprite.css';

//React
import {useState,  useEffect } from 'react';

//Util
import { organizingSprites } from '../../util/organizingRandomSprites';

//Assets
import noImageUltraBall from '../../assets/ultraBall.png';

//PropTypes
import PropTypes from 'prop-types';

PokemonCardSprite.propTypes = {
    sprites: PropTypes.arrayOf(
        PropTypes.object
    ),
    iconSprites: PropTypes.bool,
};

PokemonCardSprite.defaultProps = {
    sprites: [{}],
};

export default function PokemonCardSprite({
    sprites, iconSprites
}) {
    const [pokemonCardSprite, setPokemonCardSprite] = useState([]);

    useEffect(() => {
        organizingSprites(
            sprites,
            setPokemonCardSprite,
            iconSprites,
        );
    }, [sprites, iconSprites]);


    if (pokemonCardSprite) return (
        <img
            className="PokemonSprite"
            src={pokemonCardSprite}
            alt='Pokemon Image'
        />
    );

    if (!pokemonCardSprite) return (
        <img
            className="noPokemonSprite"
            src={noImageUltraBall}
            alt='No Image'
        />
    );
};
