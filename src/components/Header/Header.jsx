//Styles
import './Header.css';

//Icons
import { SearchIcon } from '@heroicons/react/solid'
import PokedexIcon from '../../assets/pokedex-icon-21.jpg';

//React
import { useState } from 'react';

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
    const [searchInputValue, setSearchInputValue] = useState('');

    return (
        <header>
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
                onKeyDown={(e) => requestPokemon(e, searchInputValue)} />

            <SearchIcon className='searchIcon' />
        </header>
    );
};

