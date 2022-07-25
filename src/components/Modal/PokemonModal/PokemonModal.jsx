//Styles
import './PokemonModal.css';
import '../../../css/Global.css';

//Global Provider
import useGlobal from '../../../hooks/useGlobal';

//Assets
import pokeballCloseIcon from '../../../assets/pokeballClose.png';

//Components
import ModalSpritesContainer from '../ModalSpritesContainer';
import ModalPokemonInfo from '../ModalPokemonInfo';
import CircularIndeterminate from '../../LoadingComponent';

//Util
import {randomDescriptions} from '../../../util/randomDescriptions';

//Api
import { handlePokemonVariations } from '../../../api/apiCalls';

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

    const {
        useState, useEffect,
        handleCurrentSprite, allSprites, setAllSprites,
        setSelectionSprites, setCurrentGender, setGenderMessage,
        width, selectionVersions, setSelectionVersions,
        showForms, setShowForms, setVariationsSeleciton,
        setCurrentVariation
    } = useGlobal();

    const [species, setSpecies] = useState('');
    const [pokemonDescription, setPokemonDescription] = useState('');

    const [forms, setForms] = useState([]);
    const [stats, setStats] = useState([]);

    const [pokemonHeaderInfo, setPokemonHeaderInfo] = useState({
        name: '',
        national: '',
        regional: ''
    });

    const backgroundByType = pokemonModalData.types[0].name;
    const [closeModalMessage, setCloseModalMessage] = useState(false);
    const [modalLoading, setModalLoading] = useState(true);

    async function handleSpriteByGender(gender, sprites, first) {
        if (allSprites.length && !sprites) sprites = [...allSprites];

        if (gender === 'female') {
            setCurrentGender({
                male: false,
                female: true
            });

            setShowForms(false);
            if (sprites[1]?.front.length) {
                handleCurrentSprite(sprites[1]?.front[0]);
                return setSelectionSprites(sprites[1]?.front);
            };

            if (sprites[1]?.shiny_front.length) {
                setGenderMessage('There are only shiny female sprites to be shown.')
                handleCurrentSprite(sprites[1]?.shiny_front[0]);
                return setSelectionSprites(sprites[1]?.shiny_front);
            };
            setGenderMessage('There are no female sprites to be shown.');
        };

        await setCurrentGender({
            male: true,
            female: false
        });

        setShowForms(false);

        if (first) {
            await handleCurrentSprite(sprites[0].front[2]);
        } else {
            await handleCurrentSprite(sprites[0].front[0]);
        };

        return setSelectionSprites(sprites[0]?.front);
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
        if (!variation.includes('default') &&
            !variation.includes('forms') ) {
            variation = variation.replace(" ", "-");

            const {
                pokedexResponse, error
            } = await handlePokemonVariations(`${pokemonHeaderInfo.name}-${variation}`);
            if (error) return console.log(error);

            if (variation.includes('mega')) await setCurrentVariation('mega');
            if (variation.includes('gmax')) await setCurrentVariation('gmax');
            if (variation.includes('alola')) await setCurrentVariation('alola');
            if (variation.includes('galar')) await setCurrentVariation('galar');
            if (variation.includes('hisui')) await setCurrentVariation('hisui');
            
            await setSelectionSprites([...pokedexResponse[0]?.sprites[0]?.front]);
            await handleCurrentSprite(pokedexResponse[0]?.sprites[0]?.front[0]);
        };
        if (variation === 'default') {
            await setCurrentVariation('default');
            await setSelectionSprites([...allSprites[0]?.front]);
            await handleCurrentSprite(allSprites[0]?.front[0]);
        };

        if (variation === 'forms') {
            await setCurrentVariation('forms');
            await setSelectionSprites([...forms]);
            await handleCurrentSprite(forms[0]?.default);
        };

        await setCurrentGender({
            male: true,
            female: false
        });
    };

    useEffect(() => {
        function organizePokemonHeaderInfo(dexNumbers, name) {
            let firstHyphen = name.indexOf('-');
            if (firstHyphen === -1) firstHyphen = name.length;
            const slicedName = name.slice(0, firstHyphen);
            let formattedName = slicedName.replace('-', " ");

            if (pokemonModalData.name.includes('mo-o') ||
                pokemonModalData.name.includes('-mime') ||
             pokemonModalData.name.includes('tapu-') ) formattedName = pokemonModalData.name;

            const localHeaderInfo = {
                name: formattedName,
                national: dexNumbers?.length ?
                    dexNumbers[0].entryNumber : '??',
                regional: dexNumbers?.length ?
                    dexNumbers[1].entryNumber : '??'
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
            // setPokemonHeaderInfo({

            // })
        };

        function organizeForms(forms) {
            if (forms.length > 1) {
                setForms([...forms]);
            };   
        };

        function organizeVariationsSelections(variations, forms) {
            console.log(pokemonHeaderInfo);
            const localVariations = variations.map(variation => {
                if (variation.name === pokemonModalData.name) return {
                    name: 'default'
                };
                
                if (variation.name.includes('mo-o')) return {
                    name: 'totem'
                };

                const firstHyphen = variation.name.indexOf('-');
                const slicedName = variation.name.slice(firstHyphen + 1, variation.name.length);

                return {
                    name: slicedName.replace('-', " ")
                };
            });
            console.log({ localVariations });

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

        function organizeSprites(sprites) {
            const localAllSprites = sprites;
            setAllSprites([...localAllSprites]);
            handleCurrentSprite(localAllSprites[0].front[2]);
            handleSpriteByGender('male', localAllSprites, true);
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
        console.log(pokemonModalData);
        makeAllRequests();
    }, [pokemonModalData]);

    return (
        <div className='outerContainer'>

            {/* Close Modal */}
            <div className='closeModalContainer'>
                <img
                    className="closeModalImg"
                    src={pokeballCloseIcon}
                    alt="close modal"
                    onMouseEnter={() => setCloseModalMessage(true)}
                    onMouseLeave={() => setCloseModalMessage(false)}
                    onClick={() => {
                        setModalUp(false);
                        setShowForms(false);
                    }}
                />
                {
                    (closeModalMessage || width <= 400) &&
                    <span>Click to close!</span>
                }
            </div>
            {
                !modalLoading ?
                    <div className={`innerContainer background-${backgroundByType}`}>
                        <ModalSpritesContainer
                            handleSpriteByGender={handleSpriteByGender}
                            pokemonHeaderInfo={pokemonHeaderInfo}
                            forms={forms}
                            handleVariations={handleVariations}
                        />
                        <ModalPokemonInfo
                            Pokemon={pokemonModalData}
                            species={species}
                            stats={stats}
                            color={backgroundByType}
                            description={pokemonDescription}
                            handleVersionDescription={handleVersionDescription}
                        />
                    </div>
                    :
                    <div className='contentLoading'>
                        <CircularIndeterminate />
                    </div>
            }
        </div>
    );
};



