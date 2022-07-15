//Styles
import './PokemonModal.css';
import '../../css/Global.css';

//Assets
import pokeballCloseIcon from '../../assets/pokeballClose.png';
import loadingIcon from '../../assets/loadingIcon.png';

//Components
import PokemonTypes from '../PokemonTypes';
import ModalSpritesContainer from './ModalSpritesContainer/ModalSpritesContainer';

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
    setModalUp, pokemonModalData
}) {
    const [allSprites, setallSprites] = useState([]);
    const [selectionSprites, setSelectionSprites] = useState([]);
    const [currentSprite, setCurrentSprite] = useState('');
    const [species, setSpecies] = useState('');
    const [forms, setForms] = useState([]);
    const [stats, setStats] = useState([]);

    const [currentGender, setCurrentGender] = useState({
        male: '',
        female: ''
    });

    const backgroundByType = pokemonModalData.types[0].name;
    const [closeModalMessage, setCloseModalMessage] = useState(false);
    const [modalLoading, setModalLoading] = useState(true);

    function handleSpriteByGender(gender, sprites, first) {
        if (allSprites.length && !sprites) sprites = [...allSprites];

        if (gender === 'female') {
            setCurrentGender({
                male: false,
                female: true
            });
            if (sprites[1]?.front.length) {
                setCurrentSprite(sprites[1].front[0]);
                return setSelectionSprites(sprites[1]?.front);
            };

            if (sprites[1]?.shiny_front.length) {
                // setGenderMessage('There are only shiny female sprites to be shown.')
                setCurrentSprite(sprites[1].shiny_front[0]);
                return setSelectionSprites(sprites[1]?.shiny_front);
            };
            // setGenderMessage('There are not female sprites to be shown.');
        };

        setCurrentGender({
            male: true,
            female: false
        });

        if (!first) {
            setCurrentSprite(sprites[0].front[0]);
        };

        return setSelectionSprites(sprites[0]?.front);
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
                let name = stat.stat.name;
                let statLv = stat.base_stat;

                if (name === 'attack') name = 'ATK';
                if (name === 'defense') name = 'DEF';
                if (name === 'special-attack') name = 'SATK';
                if (name === 'special-defense') name = 'SDEF';
                if (name === 'speed') name = 'SPD';

                if (statLv <= 50) statLv = 'low';
                if (statLv > 50 & statLv <= 80) statLv = 'medium';
                if (statLv > 80 & statLv <= 120) statLv = 'high';
                if (statLv > 120) statLv = 'higher';

                const statData = {
                    name,
                    base: stat.base_stat,
                    statLv
                };
                localStats.push(statData);
            };
            setStats(localStats);
        };

        async function organiSprites() {
            const localAllSprites = pokemonModalData.sprites;
            setallSprites([...localAllSprites]);
            setCurrentSprite(localAllSprites[0].front[2]);
            handleSpriteByGender('male', localAllSprites, true);
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


    // console.log(pokemonModalData)

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

                        <ModalSpritesContainer
                            currentSprite={currentSprite}
                            setCurrentSprite={setCurrentSprite}
                            currentGender={currentGender}
                            selectionSprites={selectionSprites}
                            handleSpriteByGender={handleSpriteByGender}
                            pokemonName={pokemonModalData.name}
                        />
                        
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

                            <div className='unitInfo'>
                                <h3>Stats: </h3>
                                {
                                    stats?.length &&
                                    stats.map((stat, index) => {
                                        const { name, base, statLv } = stat;
                                        return (
                                            <div
                                                className='pokemonStats'
                                                key={index}
                                            >
                                                
                                                <div className='statsBaseName'>
                                                    <span>{name}</span>
                                                    <span>{base}</span>
                                                </div>

                                            

                                                <div className='emptyStatBar'>
                                                    <div
                                                    className={`statBar ${statLv}`} style={{
                                                    width: `${base*2}px`,   
                                                    }}>
                                                    
                                                </div>
                                                </div>
                                            </div>
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



