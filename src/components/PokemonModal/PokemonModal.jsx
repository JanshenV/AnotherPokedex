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
import { randomDescriptions } from '../../util/randomDescriptions';

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
        selectionVersions, setSelectionVersions
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

        if (first) {
            await setCurrentSprite(sprites[0].front[2]);
        } else {
            await setCurrentSprite(sprites[0].front[0]);
        };

        return setSelectionSprites(sprites[0]?.front);
    };

    async function handleDescriptions(value) {
        const chosenDescription = selectionVersions?.find(({ version: { name } }) => name === value);

        return setPokemonDescription({
            text: chosenDescription?.flavor_text,
            language: chosenDescription?.language.name,
            version: chosenDescription?.version.name
        });
    };

    useEffect(() => {
        async function requestSpeciesAndDescription() {
            const { species: { url } } = pokemonModalData;
            const request = await fetch(url);
            if (!request.ok) return;

            const { genera, flavor_text_entries } = await request.json();
            setSpecies(genera[7].genus);
            randomDescriptions(flavor_text_entries, setPokemonDescription, setSelectionVersions);
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

        async function organizeSprites() {
            const localAllSprites = pokemonModalData.sprites;
            setAllSprites([...localAllSprites]);
            setCurrentSprite(localAllSprites[0].front[2]);
            handleSpriteByGender('male', localAllSprites, true);
        };

        async function makeAllRequests() {
            await requestSpeciesAndDescription();
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
                    onClick={() => setModalUp(false)}
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
                        />
                        <ModalPokemonInfo
                            pokemonModalData={pokemonModalData}
                            species={species}
                            stats={stats}
                            color={backgroundByType}
                            description={pokemonDescription}
                            handleDescriptions={handleDescriptions}
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



