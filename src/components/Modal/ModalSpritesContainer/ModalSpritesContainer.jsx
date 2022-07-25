//Styles
import './ModalSpritesContainer.css';

//Global Provider
import useGlobal from '../../../hooks/useGlobal';

//Components
import GenderIcons  from '../../GenderIcon/GenderIcons';

//Assets
import darkerPokeballBackGround from '../../../assets/darkerPokeballBackground.svg';
import noPokemonSprite from '../../../assets/ultraBall.png';

//PropTypes
import PropTypes from 'prop-types';
ModalSpritesContainer.propTypes = {
    pokemonHeaderInfo: PropTypes.shape({
        name: PropTypes.string,
            national: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            regional: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        }),
    handleSpriteByGender: PropTypes.func,
    forms: PropTypes.arrayOf(
        PropTypes.shape({
            default: PropTypes.string,
            name: PropTypes.string,
            shiny: PropTypes.string
        })
    ),
    handleVariations: PropTypes.func
};

ModalSpritesContainer.defaultProps = {
    handleSpriteByGender: () => null,
    handleVariations: () => null
};

export default function ModalSpritesContainer({
    pokemonHeaderInfo, handleSpriteByGender,
    handleVariations
}) {
    //From Global Provider
    const {
        useEffect, useState, variationsSeleciton,
        currentSprite, handleCurrentSprite, selectionSprites,
        currentGender, genderMessage, setGenderMessage,
        currentVariation
    } = useGlobal();

    const [spriteClassName, setSpriteClassName] = useState('pokemonImg');

    useEffect(() => {
        setTimeout(() => setGenderMessage(''), 3000);
    }, [genderMessage]);

    useEffect(() => {
        if (!currentSprite || !currentSprite.includes('http')) {
            handleCurrentSprite(noPokemonSprite);
        };

        if (currentSprite === noPokemonSprite) {
            setSpriteClassName('noPokemonImg');
        } else {
            setSpriteClassName('pokemonImg');
        };
    }, [currentSprite]);

    return (
        <div className={`spritesContainer`}>
            <div className='spritesContainerHeader'>
                <h2 className='titleName'>
                    {pokemonHeaderInfo?.name}
                </h2>
                
                <div className='dexNumbers'>
                    <span className='titleDexnr'>
                        National: #{pokemonHeaderInfo?.national}
                    </span>
                    <span className='titleDexnr'>
                        Regional: #{pokemonHeaderInfo?.regional}
                    </span>
                </div>
            </div>

            <div className='spritesContainerMain'>
                <img
                    src={darkerPokeballBackGround}
                    alt="Background Pokeball"
                    className='pokeballBackGround'
                />

                {
                    currentSprite &&
                    <div
                        className={`${spriteClassName}`}
                        style={{
                            backgroundImage: `url(${currentSprite})`
                        }}
                    >
                    </div>
                }
                
                {
                    genderMessage &&
                    <span className='genderMessage'>
                        {genderMessage}
                    </span>
                }
            </div>
            
            <div className='spritesContainerFooter'>
                <div className="genderIcons">
                    <GenderIcons
                        gender={'female'}
                        onClick={() => handleSpriteByGender('female')}
                        disabled={currentGender?.female}
                    />
                    <GenderIcons
                        gender={'male'}
                        onClick={() => handleSpriteByGender('male')}
                        disabled={currentGender?.male}
                    />
                </div>

                {
                    (variationsSeleciton?.length && variationsSeleciton?.length > 1) ?
                        <select
                            onChange={({ target: { value } }) => handleVariations(value)}
                        >
                            {
                                variationsSeleciton?.map(({name}, index) => {
                                    return (
                                        <option
                                            value={name}
                                            key={index}
                                        >
                                            {name}                                            
                                        </option>
                                    )
                                })
                            }
                        </select>
                        :
                        <></>
                }

                {/* Different Pokémon forms sprites */}
                  {
                    (currentVariation === 'forms' &&
                        selectionSprites?.length) ?
                        <select
                            value={currentSprite}
                            className="selectionSprite"
                            onChange={({ target: { value } }) => handleCurrentSprite(value)}
                        >
                            {
                                selectionSprites?.length &&
                                selectionSprites?.map((form, index) => {
                                    return (
                                        <option
                                            value={form.default}
                                            key={index}
                                        >
                                            {form.name}
                                        </option>
                                    )
                                })
                            }
                        </select>
                        :
                        <></>
                }
                
                {/* Normal Sprites */}
                {
                    (currentVariation !== 'forms' &&
                        selectionSprites?.length) ?
                        <select
                            value={currentSprite}
                            onChange={({ target: { value } }) => handleCurrentSprite(value)}
                        >
                            {
                                selectionSprites?.length &&
                                selectionSprites?.map((sprite, index) => {
                                    return (
                                        <option
                                            value={sprite}
                                            key={index}
                                        >
                                            Sprite: {index + 1}
                                        </option>
                                    )
                                })
                            }
                        </select>
                        :
                        <> </>
                }
            </div>
        </div>
    );
};
