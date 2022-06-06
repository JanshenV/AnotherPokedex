//Styles
import './PokedexRegion.css';

//React Hooks
import { useState } from 'react';

//Api
import handlePokedex from '../../api/apiCalls';

//Props
import PropTypes from 'prop-types';

PokedexRegion.propTypes = {
    textContent: PropTypes.string,
    setPermaPokedexList: PropTypes.func,
    setPokedexList: PropTypes.func,
    setLoading: PropTypes.func
};

PokedexRegion.defaultProps = {
    setPermaPokedexList: () => null,
    setPokedexList: () => null,
    setLoading: () => null
};



export default function PokedexRegion({
    textContent,
    setPermaPokedexList, setPokedexList, setLoading
}) {

    async function handleRegionalPokedex() {
        setLoading(true);
        const {
            pokedexResponse,
            error
        } = await handlePokedex(textContent);

        if (error) return alert(`${error}. Refresh page.`);
        setPermaPokedexList(pokedexResponse);
        setPokedexList(pokedexResponse);
        setLoading(false);
    };

    return (
        <div
            className='regionContainer'
            onClick={handleRegionalPokedex}
        >
            <h3>
                {textContent} Pokedex
            </h3>
        </div>
    );
};
