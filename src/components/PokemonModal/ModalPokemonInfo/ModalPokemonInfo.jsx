//Styles
import './ModalPokemonInfo.css';

//Assets
import HeightIcon from '../../../assets/heightIcon.svg';
import WeightIcon from '../../../assets/weightIcon.svg';

//Components
import PokemonTypes from '../../PokemonTypes';

export default function ModalPokemonInfo({
    pokemonModalData, species, stats, 
    description, color
}) {

    return (
        <div className="pokemonInfo">
            <PokemonTypes
                types={pokemonModalData.types}
            />

            <h1>About:</h1>
            {/* {description} */}


            <div className='generalInfo'>
                <div>
                    <img src={HeightIcon} alt="Height Icon" />
                    <h4>{pokemonModalData.height / 10} m</h4>
                    <span>Height</span>
                </div>

                <div>
                    <img src={WeightIcon} alt="Weight Icon" />
                    <h4>{pokemonModalData.weight / 10} kg</h4>
                    <span>Weight</span>
                </div>

                <div>
                    <h4>{species}</h4>
                    <span>Species</span>
                </div>

                <div>
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
                    <h4>Abilities: </h4>
                </div>
            </div>

            {/* <h3>Stats: </h3>
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
                                            width: `${base * 2}px`,
                                        }}>
                                                    
                                    </div>
                                </div>
                            </div>
                        )
                    })
                } */}
        </div>
    );
}

