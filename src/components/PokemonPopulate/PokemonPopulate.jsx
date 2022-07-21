//Styles
import './PokemonPopulate.css';
import '../../css/Global.css';

//Assets
import pokeballIcon from '../../assets/pokeballIcon.png';

//Global Provider
import useGlobal from '../../hooks/useGlobal';

//Components
import PokemonCardSprite from '../PokemonCardSprite';
import PokemonTypes from '../PokemonTypes';
import PokemonModal from '../PokemonModal/PokemonModal';

//PropTypes
import PropTypes from 'prop-types';

PokemonPopulate.propTypes = {
    pokedexList: PropTypes.arrayOf(
        PropTypes.object
    ),
    selectedRegion: PropTypes.string
};

PokemonPopulate.defaultProps = {
    pokedexList: [{}],
};

export default function PokemonPopulate({ pokedexList, selectedRegion }) {
    const { useState, useEffect } = useGlobal();

    let storageIconSprites = localStorage.getItem('iconSprites');

    const [iconSprites, setIconSprites] = useState(storageIconSprites === 'icons' ? true : false);
    const [modalUp, setModalUp] = useState(false);
    const [pokemonModalData, setPokemonModalData] = useState();


    function handleModalUp(pokemonData) {
        setPokemonModalData(pokemonData);
        setModalUp(true);
    };

    function handleStorageIconSprites() {
        const localInconSprite = !iconSprites;
        setIconSprites(localInconSprite);
        storageIconSprites = localStorage.setItem('iconSprites', localInconSprite ? 'icons' : 'images');
    };

    useEffect(() => {
        if (!storageIconSprites) {
            storageIconSprites = localStorage.setItem('iconSprites', 'images');
        };
    }, []);

    return (
        <>
            <h1 className='pokedexTitle'>
                {selectedRegion ? `${selectedRegion} Pokedex` : 'Kanto Pokedex'}
            </h1>
            <div
                className={`${pokedexList.length > 5 ? 'pokedexContainer' : 'notGrid'}`}>
                {
                    pokedexList?.length &&
                    <img
                        className='pokeballChangeSprites'
                        src={pokeballIcon}
                        alt="Change pokemon sprite"
                        onClick={() => handleStorageIconSprites()}
                    />
                }

                {
                    pokedexList?.length &&
                    pokedexList?.map((pokemon, index) => {
                        const { types, sprites } = pokemon;
                        return (
                            <div
                                className={`mainPokemonContainer
                                 ${iconSprites ? 'pokemonIconsContainer' : 'pokemonContainer'}
                                 border-${types[0].name}
                                 `}
                                key={index}
                                onClick={() => handleModalUp(pokemon)}
                            >
                                <PokemonCardSprite
                                    sprites={sprites}
                                    iconSprites={iconSprites}
                                />
                                <h3>#{pokemon.id}</h3>
                                <h2>{pokemon.name}</h2>

                                <PokemonTypes
                                    types={types}
                                />
                            </div>
                        );
                    })
                }

                {
                    modalUp &&
                    <PokemonModal
                        setModalUp={setModalUp}
                        setPokemonModalData={setPokemonModalData}
                        pokemonModalData={pokemonModalData}
                    />
                }
            </div>
        </>
    );
};

