//Styles
import './Header.css';

//Icons
import PokedexIcon from '../../assets/pokedex-icon-21.jpg';

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
        searchInputValue,
        useState, useEffect, width
    } = useGlobal();

    const [focusMessage, setFocusMessage] = useState('');
    const [placeholderMessage, setPlaceholderMessage] = useState('');

    useEffect(() => {
        setTimeout(() => setFocusMessage(''), 3000);
    }, [focusMessage]);

    useEffect(() => {
        function handlePlaceholder() {
            if (width <= 500) return setPlaceholderMessage('Name or Dex Nrº');
            setPlaceholderMessage("Search by Pokémon's name or Pokédex Number.");
        };
        handlePlaceholder();
    }, [width]);

    function handleFocusMessage() {
        if (width <= 500) return setFocusMessage('"Enter" to request.');
        setFocusMessage("If pokémon not filtered, press 'Enter' to request.");
    };

    return (
        <header className='headerContainer'>
            {
                focusMessage &&
                <span className='focusMessage'>
                    {focusMessage}
                </span>
            }

            <div className='inputButtonContainer'>
                <input
                    type="text"
                    value={searchInputValue}
                    placeholder={placeholderMessage}
                    onChange={({ target: { value } }) => searchPokemon(value)}
                    onKeyDown={(e) => requestPokemon(e)}
                    onFocus={() => handleFocusMessage()}
                />
                
                <button
                    className='searchButton'
                    onClick={(e) => requestPokemon(e)}
                >
                    Search
                </button>


            </div>

            <img
                className="logoIcon"
                src={PokedexIcon}
                alt="Logo Icon"
            />
        </header>
    );
};

