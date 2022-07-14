//Styles
import './PokemonModal.css';
import '../../css/Global.css';

//Assets
import femaleIcon from '../../assets/femaleIcon.png';
import maleIcon from '../../assets/maleIcon.png';
import pokeballCloseIcon from '../../assets/pokeballClose.png';
import loadingIcon from '../../assets/loadingIcon.png';

//Components
import PokemonTypes from '../PokemonTypes';

//React
import { useState, useEffect } from 'react';

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
    const [allSprites, setallSprites] = useState([]);
    const [sprites, setSprites] = useState([]);
    const [currentSprite, setCurrentSprite] = useState('');
    const [index, setIndex] = useState(0);
    const [species, setSpecies] = useState('');
    const [forms, setForms] = useState([]);
    const [stats, setStats] = useState([]);

    const backgroundByType = pokemonModalData.types[0].name;
    const [genderMessage, setGenderMessage] = useState('');
    const [closeModalMessage, setCloseModalMessage] = useState(false);
    const [modalLoading, setModalLoading] = useState(true);

    function setSpriteByGender(sprites, gender) {
        if (gender === 'female') {
            if (sprites[1]?.front.length) {
                setCurrentSprite(sprites[1].front[0]);
                return setSprites(sprites[1]?.front);
            };

            if (sprites[1]?.shiny_front.length) {
                setGenderMessage('There are only shiny female sprites to be shown.')
                setCurrentSprite(sprites[1].shiny_front[0]);
                return setSprites(sprites[1]?.shiny_front);
            };
            setGenderMessage('There are not female sprites to be shown.');
            return setSprites(sprites[0]?.front);
        };

        return setSprites(sprites[0]?.front);
    };

    useEffect(() => {
        async function requestSpecies() {
            const { species: { url } } = pokemonModalData;
            const request = await fetch(url);
            if (!request.ok) return;

            const { genera } = await request.json();
            setSpecies(genera[7].genus);
        };

        async function requestForms() {
            const { forms } = pokemonModalData;
            if (!forms.length > 1) return setForms([]);

            const localForms = [];
            for (let form of forms) {
                const request = await fetch(form.url);
                if (!request.ok) return;
                const response = await request.json();
                const formsData = {
                    name: response.form_name,
                    default: response.sprites.front_default,
                    shiny: response.sprites.front_shiny,
                }
                localForms.push(formsData);
            }
            setForms(localForms);
        };

        async function organizeStats() {
            const localStats = [];

            for (let stat of pokemonModalData.stats) {
                const statData = {
                    name: stat.stat.name,
                    base: stat.base_stat
                };
                localStats.push(statData);
            };
            setStats(localStats);
        };

        async function organiSprites() {
            const localAllSprites = pokemonModalData.sprites;
            setallSprites([...localAllSprites]);
            setCurrentSprite(localAllSprites[0].front[2]);
            setSpriteByGender(localAllSprites, 'male');
        };

        async function makeAllRequests() {
            await requestSpecies();
            await requestForms();
            await organizeStats();
            await organiSprites();
            setModalLoading(false);
        };

        makeAllRequests();
    }, [pokemonModalData]);

    useEffect(() => {
        setTimeout(() => setGenderMessage(''), 3000);
    }, [genderMessage]);

    console.log(pokemonModalData)

    return (
        <div className='outerContainer'>
            {
                !modalLoading ?
                    <div className="innerContainer">
                        <div className='closeModalContainer'>
                            <img
                                className="closeModalImg"
                                src={pokeballCloseIcon}
                                alt="close modal"
                                onMouseEnter={() => setCloseModalMessage(true)}
                                onMouseLeave={() => setCloseModalMessage(false)}
                                onClick={() => setModalUp(false)}
                            />
                            {
                                closeModalMessage &&
                                <span>Click to close!</span>
                            }
                        </div>
                        <div className={`spritesContainer ${backgroundByType}`}>
                            <select defaultValue={currentSprite} onChange={(e) => setCurrentSprite(e.target.value)}>
                                {
                                    sprites?.length &&
                                    sprites.map((sprite, index) => {
                                        return (
                                            <option
                                                value={sprite}
                                                key={index}
                                                selected={currentSprite === sprite}
                                            >
                                                Sprite: {index + 1}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                            {
                                currentSprite &&
                                <img
                                    src={currentSprite}
                                    alt={pokemonModalData.name}
                                    className="pokemonImg"
                                />
                            }
                            <div className="genderIcons">
                                {
                                    genderMessage &&
                                    <span>{genderMessage}</span>
                                }
                                <button
                                    onClick={() => setSpriteByGender(allSprites, 'female')}
                                >
                                </button>

                                <button
                                    onClick={() => setSpriteByGender(allSprites, 'male')}
                                >
                                </button>
                              
                            </div>
                        </div>
                        <div className="pokemonInfo">
                            <div className='unitInfo'>
                                <h3>Pokémon:</h3>
                                <h3 >{pokemonModalData.name}</h3>
                            </div>

                            <div className='unitInfo'>
                                <h3>Type:</h3>
                                <PokemonTypes
                                    types={pokemonModalData.types}
                                />
                            </div>


                            <div className='unitInfo'>
                                <h3>National Dex: </h3>
                                <span>#{pokemonModalData.dexnr}</span>
                            </div>

                            <div className='unitInfo'>
                                <h3>Species: </h3>
                                <span>{species}</span>
                            </div>

                            <div className='unitInfo'>
                                <h3>Height: </h3>
                                <span>{pokemonModalData.height / 10} m</span>
                            </div>

                            <div className='unitInfo'>
                                <h3>Weight: </h3>
                                <span>{pokemonModalData.weight / 10} kg</span>
                            </div>

                            <div className='unitInfo'>
                                <h3>Abilities: </h3>
                                {
                                    pokemonModalData?.abilities?.length &&
                                    pokemonModalData.abilities.map((ability, index) => {
                                        const { ability: { name }, is_hidden } = ability;
                                        return (
                                            <span key={index}>
                                                {`${index + 1}.
                                                 ${name}
                                                 ${is_hidden ? '(hidden ability)' : ''}`}
                                            </span>
                                        )
                                    })
                                }
                            </div>
                        </div>

                    </div>
                    :
                    <div className='contentLoading'>
                        <img src={loadingIcon} alt="content loading" />
                    </div>
            }
        </div>
    );
};



