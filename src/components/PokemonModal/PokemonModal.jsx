//Styles
import './PokemonModal.css';

//React
import { useState } from 'react';

//PropTypes
import PropTypes from 'prop-types';
PokemonModal.propTypes = {
    setModalUp: PropTypes.func,
    setPokemonModalData: PropTypes.func,
    pokemonModalData: PropTypes.object,
};

PokemonModal.defaultProps = {
    setModalUp: () => null,
    setPokemonModalData: () => null,
};



export default function PokemonModal({
    setModalUp, setPokemonModalData, pokemonModalData
}) {

    console.log(pokemonModalData.sprites);
    return (
        <div className='outerContainer'>
            <div className="innerContainer">

            </div>
        </div>
    );
};

