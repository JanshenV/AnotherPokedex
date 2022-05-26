//Styles
import './PokemonSprites.css';

//React
import { useState, useEffect } from 'react';

//PropTypes
import PropTypes from 'prop-types';
PokemonSprites.propTypes = {
    sprites: PropTypes.object
};

PokemonSprites.defaultProps = {
    sprites: {}
};

export default function PokemonSprites({ sprites }) {

    const [pokemonSprites, setPokemonSprites] = useState([]);

    useEffect(() => {
        function organizingSprites() {
            const {
                front_default,
                front_shiny,
            } = sprites;

            const localSprites = [
                front_default,
                front_shiny
            ];
            setPokemonSprites(localSprites);
        };
        organizingSprites();
    }, []);

    return (
        <img

            src={
                pokemonSprites[
                Math.floor(
                    Math.random() * pokemonSprites.length
                )]
            }
            alt='Pokemon Image'
        />
    );
};
