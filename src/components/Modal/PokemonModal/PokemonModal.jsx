//Styles
import './PokemonModal.css';
import '../../../css/Global.css';

//Global Provider
import useGlobal from '../../../hooks/useGlobal';

//Assets
import closeModalDark from '../../../assets/closeModalDark.svg';

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
    setPokemonModalData
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
        currentVariation, setWarningMessage
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
                setSpecies
            );

            organizeSprites(pokemonModalData.sprites);
            setModalLoading(false);
        };
        
        makeAllRequests();
    }, [pokemonModalData]);

    return (
        <div className='outerContainer'>

            {/* Close Modal */}
            <div className='closeModalContainer'>
                <img
                    className="closeModalImg"
                    src={closeModalDark}
                    alt="close modal"
                    onMouseEnter={() => setCloseModalMessage(true)}
                    onMouseLeave={() => setCloseModalMessage(false)}
                    onClick={() => {
                        setModalUp(false);
                        setShowShiny(false);
                        setCurrentGender({
                            male: true,
                            female: false
                        });
                    }}
                />
                {
                    (closeModalMessage || width <= 400) &&
                    <span>Click to close!</span>
                }
            </div>
            {
                !modalLoading ?
                    <div className='innerContainer'>
                        <div className={`contentContainer background-${backgroundByType}`}>
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



