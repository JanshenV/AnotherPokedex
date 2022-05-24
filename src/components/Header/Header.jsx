//Styles
import './Header.css';

//Icons
import { SearchIcon } from '@heroicons/react/solid'
import PokedexIcon from '../../assets/pokedex-icon-21.jpg';


export default function Header({ }) {

    return (
        <header>
            <img
                className="logoIcon"
                src={PokedexIcon}
                alt="Logo Icon"
            />

            <input
                type="text"
                placeholder="Pokemon's name or Pokedex Nr."
            />

            <SearchIcon className='searchIcon' />
        </header>
    );
};

