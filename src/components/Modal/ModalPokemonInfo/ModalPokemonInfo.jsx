//Styles
import './ModalPokemonInfo.css';
import '../../../css/Global.css';

//Assets
import HeightIcon from '../../../assets/heightIcon.svg';
import WeightIcon from '../../../assets/weightIcon.svg';

//Components
import PokemonTypes from '../../PokemonTypes';

//Global Provider
import useGlobal from '../../../hooks/useGlobal';

//PropTypes
import PropTypes from 'prop-types';

ModalPokemonInfo.propTypes = {
    pokemonModalData: PropTypes.object,
    species: PropTypes.string,
    stats: PropTypes.arrayOf(
        PropTypes.object
    ),
    color: PropTypes.string,
    description: PropTypes.shape({
        text: PropTypes.string,
        language: PropTypes.string,
        version: PropTypes.string
    }),
    handleVersionDescription: PropTypes.func
};

ModalPokemonInfo.defaultProps = {
    stats: [{}],
    color: 'fire',
    description: {
        text: "lasciate ogne speranza, voi ch'intrate",
        language: 'Italian',
        version: 'The Vision'
    },
    handleVersionDescription: () => null
};

export default function ModalPokemonInfo({
    Pokemon, species, forms,
    stats, color, description,
    handleVersionDescription
}) {

    const {
        useState, width, useEffect,
        selectionVersions
    } = useGlobal();
    
    const [widthMultiplier, setWidthMultiplier] = useState(1.2);

    useEffect(() => {
        function handleWidthMultiplier() {
            if (width > 844 && width <= 1599) return setWidthMultiplier(1.8);
            if (width > 1600) return setWidthMultiplier(2.8);
        };

        handleWidthMultiplier();
    }, [width]);

    return (
        <div className="pokemonInfo">
            <PokemonTypes
                types={Pokemon.types}
            />

            <div className='descriptionContainer'>
                <h1 className={`color-${color}`}>
                    About:
                </h1>

                <h4 style={{ color: 'grey' }}>
                    {description?.text}
                </h4>

                <div className='descriptionInfos'>
                    <h4>Language: </h4>
                    <span>
                        {description?.language}
                    </span>
                </div>

                <div className='descriptionInfos descriptionVersions'>
                    <h4>Version: </h4>
                    <select
                        defaultValue={description.version}
                        onChange={({ target: { value } }) => handleVersionDescription(value)}
                    >
                        {
                            selectionVersions?.map(({ version }, index) => {
                                return (
                                    <option
                                        key={index}
                                        value={version}
                                    >
                                        {version}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>
            </div>
 
            <div className='generalInfo'>
                <div className='unitGeneralInfo'>
                    <div className='flex-row'>
                        <img src={HeightIcon} alt="Height Icon" />
                        <h4>{Pokemon.height / 10} m</h4>
                    </div>
                    <span>Height</span>
                </div>

                <div className='unitGeneralInfo'>
                    <div className='flex-row'>
                        <img src={WeightIcon} alt="Weight Icon" />
                        <h4>{Pokemon.weight / 10} kg</h4>
                    </div>
                    <span>Weight</span>
                </div>

                <div className='unitGeneralInfo'>
                    <h4>{species}</h4>
                    <span>Species</span>
                </div>
            </div>

            <div className='abilities-Moves'>
                <div className='flex-column'>
                    <h4>Abilities: </h4>
                    <div className='flex-column'>
                        {
                            Pokemon?.abilities?.length &&
                            Pokemon.abilities.map((ability, index) => {
                                const { ability: { name }, is_hidden } = ability;
                                return (
                                    <span
                                        className='ability'
                                        key={index}>
                                        {`${index + 1}. ${name}
                                        ${is_hidden ? '(hidden ability)' : ''}`}
                                    </span>
                                )
                            })
                        }
                    </div>
                </div>

                <div className='flex-column'>
                    <h4>Moves: </h4>
                    <div className='flex-column'>
                        {
                            Pokemon?.moves?.length ?
                                Pokemon?.moves.slice(0, 4).map(({ name }, index) => {
                                    return (
                                        <span key={index}>
                                            {name}
                                        </span>
                                    )
                                }) :
                                <></>
                        }
                    </div>
                </div>
            </div>

            <div className='pokemonStatsContainer'>
                <h3>Base Stats: </h3>
                {
                    stats?.length &&
                    stats.map((stat, index) => {
                        const { name, base, statLv } = stat;
                        return (
                            <div
                                className={`pokemonStats`}
                                key={index}
                            >
                                                
                                <div className='statsBaseName'>
                                    <span>{name}</span>
                                    <span>{base}</span>
                                </div>

                                <div className='emptyStatBar'>
                                    <div
                                        className={`statBar ${statLv}`}
                                        style={{
                                            width: `${base * widthMultiplier}px`,
                                        }}>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

