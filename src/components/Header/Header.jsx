//Styles
import './Header.css';

//Icons
import { SearchIcon } from '@heroicons/react/solid'
import PokedexIcon from '../../assets/pokedex-icon-21.jpg';

//React
import { useState } from 'react';

//Global Provider
import  useGlobal  from '../../hooks/useGlobal';

//PropTypes
import PropTypes from 'prop-types';

Header.propTypes = {
    searchPokemon: PropTypes.func,
    requestPokemon: PropTypes.func
};

Header.defaultProps = {
    searchPokemon: () => null,
    requestPokemon: () => null
};


export default function Header({ searchPokemon, requestPokemon }) {
    const {
        setSearchInputValue, searchInputValue,
        useState, useEffect
    } = useGlobal();

    const [focusMessage, setFocusMessage] = useState('');

    useEffect(() => {
        setTimeout(() => setFocusMessage(''), 3000);
    }, [focusMessage]);
    
    return (
        <header>
            {
                focusMessage &&
                <span className='focusMessage'>
                    {focusMessage}
                </span>
            }
            <img
                className="logoIcon"
                src={PokedexIcon}
                alt="Logo Icon"
            />

            <input
                type="text"
                value={searchInputValue}
                placeholder="Pokemon's name or Pokedex Nr."
                onChange={(e) => searchPokemon(e, setSearchInputValue)}
                onKeyDown={(e) => requestPokemon(e, searchInputValue)}
                onFocus={() => setFocusMessage('If pokémon not found, press "Enter" to request it.')}/>
        </header>
    );
};

