//Styles
import './PokemonPopulate.css';
import '../../css/Global.css';

//Assets
import pokeballIcon from '../../assets/pokeballIcon.png';

//Global Provider
import useGlobal from '../../hooks/useGlobal';

//Components
import PokemonSprites from '../PokemonSprites';
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

    const {
        useState, useEffect, width
    } = useGlobal();

    const pokedexListLength = pokedexList.length;
    let storageIconSprites = localStorage.getItem('iconSprites');

    const [iconSprites, setIconSprites] = useState(storageIconSprites === 'icons' ? true : false);
    const [modalUp, setModalUp] = useState(false);
    const [pokemonModalData, setPokemonModalData] = useState();
    const [spritesSizes, setSpritesSizes] = useState({
        height: 0,
        width: 0
    });


    function handleModalUp(pokemonData) {
        setPokemonModalData(pokemonData);
        setModalUp(true);
    };

    function handleIconSprites() {
        const localInconSprite = !iconSprites;
        setIconSprites(localInconSprite);
        storageIconSprites = localStorage.setItem('iconSprites', localInconSprite ? 'icons' : 'images');
    };

    useEffect(() => {
        if (!storageIconSprites) {
            storageIconSprites = localStorage.setItem('iconSprites', 'images');
        };
    }, []);

    useEffect(() => {
        function handleSpritesSizes() {
            if (width <= 640) {
                return setSpritesSizes({
                    height: 96,
                    width: 96
                });
            };

            if (width > 640 && width <= 1521) {
                return setSpritesSizes({
                    height: 160,
                    width: 160
                });
            };

            if (width > 1521) {
                return setSpritesSizes({
                    height: 300,
                    width: 300
                });
            };
        };
        handleSpritesSizes();
    }, [width]);


    return (
        <>
            <h1 className='pokedexTitle'>
                {selectedRegion ? `${selectedRegion} Pokedex` : 'Kanto Pokedex'}
            </h1>
            <div
                className={`${pokedexListLength > 5 ? 'pokedexContainer' : 'notGrid'}`}>
                {
                    pokedexListLength ?
                        <img
                            className='pokeballChangeSprites'
                            src={pokeballIcon}
                            alt="Change pokemon sprite"
                            onClick={() => handleIconSprites()}
                        />
                        :
                        null
                }

                {
                    pokedexList.map((pokemon, index) => {
                        const { types, sprites } = pokemon;

                        return (
                            <div
                                className={`mainPokemonContainer ${iconSprites ? 'pokemonIconsContainer' : 'pokemonContainer'}`}
                                key={index}
                                onClick={() => handleModalUp(pokemon)}
                            >
                                <PokemonSprites
                                    sprites={sprites}
                                    iconSprites={iconSprites}
                                    sizes={spritesSizes}
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

