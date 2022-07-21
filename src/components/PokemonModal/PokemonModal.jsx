//Styles
import './PokemonModal.css';
import '../../css/Global.css';

//Global Provider
import useGlobal from '../../hooks/useGlobal';

//Assets
import pokeballCloseIcon from '../../assets/pokeballClose.png';

//Components
import ModalSpritesContainer from './ModalSpritesContainer/ModalSpritesContainer';
import ModalPokemonInfo from './ModalPokemonInfo/ModalPokemonInfo';
import CircularIndeterminate from '../LoadingComponent';

//Util
import {
    randomDescriptions,
    organizingEnglishDescriptions
} from '../../util/randomDescriptions';

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
        useState, useEffect, setCurrentSprite,
        allSprites, setAllSprites, setSelectionSprites,
        setCurrentGender, setGenderMessage, width,
        selectionVersions, setSelectionVersions,
        showForms, setShowForms
    } = useGlobal();

    const [species, setSpecies] = useState('');
    const [pokemonDescription, setPokemonDescription] = useState('');

    const [forms, setForms] = useState([]);
    const [stats, setStats] = useState([]);

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
                setCurrentSprite(sprites[1]?.front[0]);
                return setSelectionSprites(sprites[1]?.front);
            };

            if (sprites[1]?.shiny_front.length) {
                setGenderMessage('There are only shiny female sprites to be shown.')
                setCurrentSprite(sprites[1]?.shiny_front[0]);
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
            await setCurrentSprite(sprites[0].front[2]);
        } else {
            await setCurrentSprite(sprites[0].front[0]);
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

    async function handleShowForms() {
        const localShowForms = !showForms;
        await setShowForms(localShowForms);

        if (localShowForms) {
            await setSelectionSprites([...forms]);
            await setCurrentSprite(forms[0]?.default);
        };

        if (!localShowForms) {
            await setSelectionSprites(allSprites[0]?.front);
            await setCurrentSprite(allSprites[0]?.front[2]);
        };

        setCurrentGender({
            male: true,
            female: false
        });
    };

    useEffect(() => {
        async function requestSpeciesAndDescriptions() {
            const { species: { url } } = pokemonModalData;
            const request = await fetch(url);
            if (!request.ok) return;

            const { genera, flavor_text_entries } = await request.json();
            setSpecies(genera[7].genus);
            
            const {
                englishDescriptions
            } = await organizingEnglishDescriptions(flavor_text_entries);

            await setSelectionVersions([...englishDescriptions]);

            await randomDescriptions(
                englishDescriptions,
                setPokemonDescription,
            );
        };

        async function requestForms() {
            const { forms } = pokemonModalData;
   
            // if (!forms.length > 1) {

            // };
            setForms([...forms]);
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

        async function organizeSprites() {
            const localAllSprites = pokemonModalData.sprites;
            setAllSprites([...localAllSprites]);
            setCurrentSprite(localAllSprites[0].front[2]);
            handleSpriteByGender('male', localAllSprites, true);
        };

        async function makeAllRequests() {
            await requestSpeciesAndDescriptions();
            await requestForms();
            await organizeStats();
            await organizeSprites();
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
                            pokemonName={pokemonModalData.name}
                            pokemonDexNr={pokemonModalData.dexnr}
                            forms={forms}
                            handleShowForms={handleShowForms}
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



