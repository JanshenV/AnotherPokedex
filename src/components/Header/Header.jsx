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
    searchPokemon: PropTypes.func
};

Header.defaultProps = {
    searchPokemon: () => null
};


export default function Header({ searchPokemon }) {
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
            />

            <SearchIcon className='searchIcon' />
        </header>
    );
};

