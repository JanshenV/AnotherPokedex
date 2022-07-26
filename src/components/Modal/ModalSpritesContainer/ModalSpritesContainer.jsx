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
    handleVariations, handleShowShiny,
    forms
}) {
    //From Global Provider
    const {
        useEffect, useState, variationsSeleciton,
        currentSprite, handleCurrentSprite, selectionSprites,
        currentGender,  warningMessage, setWarningMessage,
        currentVariation, allSprites, showShiny
    } = useGlobal();

    const [spriteClassName, setSpriteClassName] = useState('pokemonImg');

    useEffect(() => {
        setTimeout(() => setWarningMessage(''), 3000);
    }, [warningMessage]);

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
                    warningMessage &&
                    <span className='genderMessage'>
                        {warningMessage}
                    </span>
                }
            </div>
            
            <div className='spritesContainerFooter'>
                <div className="genderIcons">
                    <GenderIcons
                        gender={'female'}
                        onClick={() => handleSpriteByGender()}
                        disabled={currentGender?.female}
                    />
                    <GenderIcons
                        gender={'male'}
                        onClick={() => handleSpriteByGender()}
                        disabled={currentGender?.male}
                    />
                </div>

                {
                    (allSprites[0]?.shiny_front?.length ||
                        allSprites[1]?.shiny_front?.length ||
                        forms[0]?.shiny_front?.length) ?
                        <button
                            className='buttonShowShiny'
                            onClick={() => handleShowShiny()}
                        >
                            {
                                showShiny ?
                                    'Show Default' : 'Show Shiny'
                            }
                        </button>
                        :
                        <></>
                }

                {
                    (variationsSeleciton?.length && variationsSeleciton?.length > 1) ?
                        <select
                            onChange={({ target: { value } }) => handleVariations(value)}
                        >
                            {
                                variationsSeleciton?.map(({ name }, index) => {
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

                {
                    selectionSprites?.length ?
                        <select
                            value={currentSprite}
                            onChange={({ target: { value } }) => handleCurrentSprite(value)}
                        >
                            {
                                (selectionSprites?.length) ?
                                    selectionSprites?.map((item, index) => {
                                        return (
                                            <option
                                                value={item?.name ? item?.sprite : item}
                                                key={index}
                                            >
                                                {item?.name ? item.name : `Sprite: ${index + 1}`}
                                            </option>
                                        )
                                    })
                                    :
                                    <></>
                            }
                        </select>
                        :
                        <> </>
                }
            </div>
        </div>
    );
};
