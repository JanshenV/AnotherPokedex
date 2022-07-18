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

export default function ModalPokemonInfo({
    pokemonModalData, species, stats, 
    description, color
}) {
    
    const {
        useState, width, useEffect
    } = useGlobal();

    const [widthMultiplier, setWidthMultiplier] = useState(0);

    useEffect(() => {
        function handleWidthMultiplier() {
            if (width <= 844) return setWidthMultiplier(1);
            if (width >= 1920) return setWidthMultiplier(2.5);
            setWidthMultiplier(2);
        };

        handleWidthMultiplier();
    }, [width]);

    return (
        <div className="pokemonInfo">
            <PokemonTypes
                types={pokemonModalData.types}
            />

            <h1>About:</h1>
            {/* {description} */}


            <div className='generalInfo'>
                <div className='unitGeneralInfo'>
                    <div className='flex-row'>
                        <img src={HeightIcon} alt="Height Icon" />
                        <h4>{pokemonModalData.height / 10} m</h4>
                    </div>
                    <span>Height</span>
                </div>

                <div className='unitGeneralInfo'>
                    <div className='flex-row'>
                        <img src={WeightIcon} alt="Weight Icon" />
                        <h4>{pokemonModalData.weight / 10} kg</h4>
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
                            pokemonModalData?.abilities?.length &&
                            pokemonModalData.abilities.map((ability, index) => {
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
                            pokemonModalData?.moves?.length ?
                                pokemonModalData?.moves.slice(0, 4).map(({ name }, index) => {
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
                                className='pokemonStats'
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
                                            width: `${base*widthMultiplier}px`,
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
}

