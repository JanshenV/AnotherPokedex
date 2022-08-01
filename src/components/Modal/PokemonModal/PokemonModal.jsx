//Styles
import './PokemonModal.css';
import '../../../css/Global.css';

//Global Provider
import useGlobal from '../../../hooks/useGlobal';

import ReactAudioPlayer from 'react-audio-player';
// import ABRA from '../../../assets/Cries/CHARIZARD_2.ogg';

//Assets
import closeModalDark from '../../../assets/closeModalDark.svg';
import SoundOnIcon from '../../../assets/soundOn.png';
import SoundOffIcon from '../../../assets/soundOff.png';

//Components
import ModalSpritesContainer from '../ModalSpritesContainer';
import ModalPokemonInfo from '../ModalPokemonInfo';
import CircularIndeterminate from '../../LoadingComponent';

//Util
import {
    shinyAndFemaleSprites
} from '../../../util/handlingShinyAndFemaleSprites';

import {
    callAllOrganizeFunctions
} from '../../../util/PokemonModalFunctions';

//Api
import {
    handlePokemonVariations,
    handleIndividualPokemon,
} from '../../../api/apiCalls';

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
    setModalUp,
    pokemonModalData,
    setPokemonModalData,
    cry
}) {

    const {
        useState, useEffect, 
        currentSprite, handleCurrentSprite,

        allSprites, setAllSprites,
        width, setSelectionSprites,
        currentGender, setCurrentGender,

        selectionVersions, setSelectionVersions,
        setVariationsSelection, setCurrentVariation,

        showShiny, setShowShiny,
        currentVariation, setWarningMessage,

        permaPokedexList,

        easter, setEaster

    } = useGlobal();

    const [species, setSpecies] = useState('');
    const [pokemonDescription, setPokemonDescription] = useState('');

    const [evolutions, setEvolutions] = useState([]);

    const [forms, setForms] = useState([]);
    const [stats, setStats] = useState([]);


    const [pokemonHeaderInfo, setPokemonHeaderInfo] = useState({
        name: '',
        national: '',
        regional: ''
    });

    let localStorageSoundOn = localStorage.getItem('soundOn');
  
    const [soundOn, setSoundOn] = useState(localStorageSoundOn === 'on' ? true : false);

    const [crySound, setCrySound] = useState('');

    const backgroundByType = pokemonModalData?.types[0]?.name ;
    const [closeModalMessage, setCloseModalMessage] = useState(false);
    const [modalLoading, setModalLoading] = useState(true);

    async function handleSpriteByGender() {
        if (currentVariation === 'forms') return await setWarningMessage('There are no female sprites.');;

        const localCurrentGender = {
            male: !currentGender.male,
            female: !currentGender.female
        };

        setCurrentGender(localCurrentGender);

        await shinyAndFemaleSprites(
            allSprites,
            setAllSprites,
            handleCurrentSprite,
            setSelectionSprites,
            localCurrentGender,
            showShiny,
            setCurrentGender,
            setShowShiny,
            '',
            currentSprite,
            setWarningMessage
        );
    };

    async function handleVersionDescription(value) {
        const chosenDescription = selectionVersions?.find(({ version }) => version === value);

        return setPokemonDescription({
            text: chosenDescription?.text,
            language: chosenDescription?.language,
            version: chosenDescription?.version
        });
    };

    async function handleVariations(variation) {
        let localPokemonData = {...pokemonModalData};
        if (!variation.includes('forms') &&
            !variation.includes('shiny')) {
            variation = variation.replace(" ", "-");

            const pokemonNameRequest = `${pokemonHeaderInfo.name}${variation !== pokemonHeaderInfo.name ?  `-${variation}`: ""}`

            const {
                pokedexResponse, error
            } = await handlePokemonVariations(`${pokemonNameRequest}`);
            if (error) return console.log(error);

            localPokemonData = pokedexResponse[0];
            setPokemonModalData({ ...localPokemonData });
            await shinyAndFemaleSprites(
                pokedexResponse[0].sprites,
                setAllSprites,
                handleCurrentSprite,
                setSelectionSprites,
                currentGender,
                showShiny,
                setCurrentGender,
                currentSprite,
                '',
                setWarningMessage
            );
            await setCurrentVariation(variation);
        };
        if (variation === pokemonHeaderInfo.name) {
            const {
                pokedexResponse, error
            } = await handleIndividualPokemon(pokemonHeaderInfo.name);
            if (error) return console.log(error);

            localPokemonData = pokedexResponse[0];
            setPokemonModalData({ ...localPokemonData });
             await shinyAndFemaleSprites(
                pokedexResponse[0].sprites,
                setAllSprites,
                handleCurrentSprite,
                setSelectionSprites,
                currentGender,
                showShiny,
                setCurrentGender,
                currentSprite,
                 '',
                setWarningMessage
            );
            await setCurrentVariation('default');
        };
        if (variation === 'forms') {

            if (showShiny) {
                await setAllSprites([...forms[0]?.shiny_front]);
                await setSelectionSprites([...forms[0]?.shiny_front]);
                await handleCurrentSprite(forms[0]?.shiny_front[0]?.sprite);
            } else {
                await setAllSprites([...forms[0]?.front]);
                await setSelectionSprites([...forms[0]?.front]);
                await handleCurrentSprite(forms[0]?.front[0]?.sprite);
            };

            await setCurrentVariation('forms');
            await setWarningMessage('There are no female sprites.');
        };

        await setCurrentGender({
            male: true,
            female: false
        });
    };

    async function handleShowShiny() {
        const localShowShiny = !showShiny;
        setShowShiny(localShowShiny);
        await shinyAndFemaleSprites(
            currentVariation === 'forms' ? forms : allSprites,
            setAllSprites,
            handleCurrentSprite,
            setSelectionSprites,
            currentGender,
            localShowShiny,
            setCurrentGender,
            setShowShiny,
            currentVariation === 'forms' ? currentVariation : ''
        );
    };

    async function clearStates() {
        setModalUp(false);
        setShowShiny(false);
        setCurrentGender({
            male: true,
            female: false
        });
        setCurrentVariation('default');
    };

    function handleSoundOn() {
        const localSoundOn = !soundOn;
        setSoundOn(localSoundOn);
        localStorageSoundOn = localStorage.setItem('soundOn', localSoundOn ? 'on' : 'off');
    };

    useEffect(() => {
        if (localStorageSoundOn === null) {
            localStorageSoundOn = localStorage.setItem('soundOn', 'on');
        };
    }, []);

    useEffect(() => {
        async function organizeSprites(sprites) {
            let localAllSprites = sprites;
            
            await shinyAndFemaleSprites(
                localAllSprites,
                setAllSprites,
                handleCurrentSprite,
                setSelectionSprites,
                currentGender,
                showShiny,
            );

        };

        async function makeAllRequests() {
            await callAllOrganizeFunctions(
                pokemonModalData,
                setPokemonHeaderInfo,
                setSelectionVersions,
                setPokemonDescription,
                setEvolutions,
                setForms,
                setVariationsSelection,
                setCurrentVariation,
                setStats,
                setSpecies,
                permaPokedexList,
                currentVariation
            );
            
            handleCries(pokemonModalData.name);
            organizeSprites(pokemonModalData.sprites);
            setModalLoading(false);
        };

        async function handleCries(pokemon) {
            console.log({pokemonModalData})
            pokemon = pokemon.toUpperCase();

            let cryParameter = '_1';
            const firstHyphenIndex = pokemon.indexOf('-');
            if (currentVariation.includes('mega')) {
                if (pokemon.includes('-Y')) cryParameter = '_2';
                pokemon = pokemon.slice(0, firstHyphenIndex);
                pokemon = `${pokemon}${cryParameter}`;
            };

             if (currentVariation.includes('primal')) {
                pokemon = pokemon.replace('-PRIMAL', "");
                pokemon = `${pokemon}${cryParameter}`;
            };


            if (pokemon === 'MR-MIME' ||
                pokemon === 'MR-RIME' ||
                pokemon === 'MIME-JR' ||
                pokemon === 'HO-OH' ||
                pokemon === 'PORYGON-Z') {
                pokemon = pokemon.replace('-', '');
            };

            if (pokemon.includes('DEOXYS')) {
                pokemon = pokemon.slice(0, firstHyphenIndex);
            };
            
            if (pokemon.includes('-')) {
                if (pokemon.includes('-ICE')) cryParameter = '';
                if (pokemon.includes('-NOICE')) cryParameter = '_1';

                if (pokemon.includes('-HANGRY')) cryParameter = '_1';
                if (pokemon.includes('-FULL-BELLY')) cryParameter = '';

                if (pokemon.includes('-MALE')) cryParameter = '';
                if (pokemon.includes('-FEMALE')) cryParameter = '_1';

                if (pokemon.includes('-BLACK')) cryParameter = '_1';
                if (pokemon.includes('-WHITE')) cryParameter = '_2';
                
                if (pokemon === ('NECROZMA-DUSK')) cryParameter = '_1';
                if (pokemon.includes('-DAWN')) cryParameter = '_2';
                if (pokemon.includes('-ULTRA')) cryParameter = '_3';

                if (pokemon.includes('MIDDAY')) cryParameter = '';
                if (pokemon.includes('-MIDNIGHT')) cryParameter = '_1';
                if (pokemon.includes('-DUSK')) cryParameter = '_2';

                if (pokemon.includes('-BAILE')) cryParameter = '';
                if (pokemon.includes('-POM-POM')) cryParameter = '_1';
                if (pokemon.includes('-PAU')) cryParameter = '_2';
                if (pokemon.includes('-SENSU')) cryParameter = '_3';

                if (pokemon.includes('-SPECTRIER')) cryParameter = '_2';

                if (pokemon.includes('-SOLO')) cryParameter = '';
                if (pokemon.includes('-SCHOOL')) cryParameter = '_1';

                if (pokemon.includes('-INCARNATE')) cryParameter = '';
                if (pokemon.includes('-THERIAN')) cryParameter = '_1';

                if (pokemon.includes('-AVERAGE') ||
                    pokemon.includes('-SMALL')) cryParameter = '';
                
                
                if (pokemon.includes('-LARGE') ||
                    pokemon.includes('-SUPER')) cryParameter = '_3';
                
                
                if (pokemon.includes('-SCHOOL')) cryParameter = '_1';

                pokemon = pokemon.slice(0, firstHyphenIndex);
                pokemon = `${pokemon}${cryParameter}`;
            };
            
            const cry = `./Cries/${pokemon}.ogg`;
            if (cry) await setCrySound(cry);
        };


        makeAllRequests();
    }, [pokemonModalData]);

    function EasterEgg(value) {
        const localValue = value;
        setEaster(localValue);
        if (easter?.length > 12) setEaster('');
    };

    useEffect(() => {
        if (easter === 'blastoiseafv') {
            window.location.href = 'https://www.youtube.com/watch?v=GgINGJsAjA0&ab_channel=MarioMitchell';
        };

        if (easter === 'jigglypuff') {
            window.location.href = 'https://www.youtube.com/watch?v=d2NTtbusUso&ab_channel=Hector';
        };
    }, [easter]);
   
    return (
        <div
            className='outerContainer'
        >
            {
                (pokemonModalData.name === 'blastoise' ||
                pokemonModalData.name === 'jigglypuff') &&
                <input
                    autoFocus
                    className='hiddenEasterEgg'
                    type="text"
                    onChange={({target:{ value}}) => EasterEgg(value)}
                />
            }
            {/* Close Modal */}
            <div className='closeModalContainer'>
                <img
                    className="closeModalImg"
                    src={closeModalDark}
                    alt="close modal"
                    onMouseEnter={() => setCloseModalMessage(true)}
                    onMouseLeave={() => setCloseModalMessage(false)}
                    onClick={clearStates}
                />
                {
                    (closeModalMessage || width <= 400) &&
                    <span>Click to close!</span>
                }
            </div>
            {
                !modalLoading ?
                    <div
                        className='innerContainer'
                    >
                        <div className={`contentContainer background-${backgroundByType}`}>

                            {soundOn ?
                                <img
                                    className='soundIcon'
                                    src={SoundOnIcon}
                                    onClick={handleSoundOn}
                                /> :
                                <img
                                    className='soundIcon'
                                    src={SoundOffIcon}
                                    onClick={handleSoundOn}
                                />
                            }


                            {/* crySound */}
                            {
                            (soundOn && crySound) &&
                                <ReactAudioPlayer
                                    src={crySound}
                                    autoPlay
                                    volume={0.2}
                                />
                            }
    
                            <ModalSpritesContainer
                                handleSpriteByGender={handleSpriteByGender}
                                handleVariations={handleVariations}
                                handleShowShiny={handleShowShiny}
                                pokemonHeaderInfo={pokemonHeaderInfo}
                                forms={forms}
                            />
                            <ModalPokemonInfo
                                Pokemon={pokemonModalData}
                                species={species}
                                evolutions={evolutions}
                                stats={stats}
                                color={backgroundByType}
                                description={pokemonDescription}
                                handleVersionDescription={handleVersionDescription}
                            />
                        </div>
                    </div>
                    :
                    <div className='contentLoading'>
                        <CircularIndeterminate />
                    </div>
            }
        </div>
    );
};



