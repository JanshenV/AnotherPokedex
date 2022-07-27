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
    randomDescriptions
} from '../../../util/randomDescriptions';
import {
    shinyAndFemaleSprites
} from '../../../util/handlingShinyAndFemaleSprites';

//Api
import {
    handlePokemonVariations,
handleIndividualPokemon
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
    setModalUp, pokemonModalData, setPokemonModalData
}) {

    const {
        useState, useEffect, 
        currentSprite, handleCurrentSprite,

        allSprites, setAllSprites,
        width, setSelectionSprites,
        currentGender, setCurrentGender,

        selectionVersions, setSelectionVersions,
        setVariationsSeleciton, setCurrentVariation,

        showShiny, setShowShiny,
        currentVariation, setWarningMessage
    } = useGlobal();

    const [species, setSpecies] = useState('');
    const [pokemonDescription, setPokemonDescription] = useState('');

    const [evolutions, setEvolutions] = useState([]);

    const [forms, setForms] = useState([]);
    const [stats, setStats] = useState([]);
    const [first, setFirst] = useState(true);

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
            await setCurrentGender({
                male: true,
                female: false
            });
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
        function organizePokemonHeaderInfo(dexNumbers, name) {
            let firstHyphen = name.indexOf('-');
            if (firstHyphen === -1) firstHyphen = name.length;
            const slicedName = name.slice(0, firstHyphen);
            let formattedName = slicedName.replace('-', " ");

            if (pokemonModalData.name.includes('mo-o') ||
                pokemonModalData.name.includes('-mime') ||
                pokemonModalData.name.includes('tapu-')) formattedName = pokemonModalData.name;

            const localHeaderInfo = {
                name: formattedName,
                national: dexNumbers?.length ?
                    dexNumbers[0]?.entryNumber : '??',
                regional: dexNumbers?.length ?
                    dexNumbers[1]?.entryNumber : '??'
            };
            setPokemonHeaderInfo(localHeaderInfo);
        };

        async function organizeDescriptions(descriptions) {
            await setSelectionVersions([...descriptions]);

            await randomDescriptions(
                descriptions,
                setPokemonDescription,
            );
        };

        function organizeEvolutions(evolutions) {
            const localEvolutions = [...evolutions];
            setEvolutions(localEvolutions);
            console.log({localEvolutions})
        };

        function organizeForms(forms) {
            if (forms.length > 1) {
                let localForms = [
                    {
                        front: [],
                        shiny_front: [],
                    },

                    {
                        front: [],
                        shiny_front: [],
                    },
                ];

                forms.forEach(form => {
                    localForms[0].front.push({
                        sprite: form.default,
                        name: form.name
                    });
                    localForms[0].shiny_front.push({
                        sprite: form.shiny,
                        name: form.name
                    });
                });
                
                setForms([...localForms]);
            };
        };

        function organizeVariationsSelections(variations, forms) {
            const localVariations = variations.map(variation => {
                
                if (variation.name.includes('mo-o')) return {
                    name: 'totem'
                };

                const firstHyphen = variation.name.indexOf('-');
                const slicedName = variation.name.slice(firstHyphen + 1, variation.name.length);

                return {
                    name: slicedName.replace('-', " ")
                };
            });

            if (forms?.length > 1) {
                localVariations.push({ name: 'forms' });
            };

            setVariationsSeleciton([...localVariations]);
            setCurrentVariation('default');
        };

        function organizeStats(stats) {
            const localStats = [];

            for (let stat of stats) {
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

            if (first) handleCurrentSprite(localAllSprites[0]?.front[2]);
            setFirst(false);
        };

        async function makeAllRequests() {
            const {
                all_dex_numbers: dexNumbers,
                name,
                descriptions,
                evolutions,
                varieties,
                forms,
                stats,
                sprites,
                species: {specie}
            } = pokemonModalData;
            
            organizePokemonHeaderInfo(dexNumbers, name);
            await organizeDescriptions(descriptions);
            organizeEvolutions(evolutions);
            organizeForms(forms);
            organizeVariationsSelections(varieties, forms);
            organizeStats(stats);
            organizeSprites(sprites);
            setSpecies(specie);
            setModalLoading(false);
        };
        
        makeAllRequests();
    }, [pokemonModalData, 0]);

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



