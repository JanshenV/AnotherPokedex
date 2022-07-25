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
    handleShowForms: PropTypes.func
};

ModalSpritesContainer.defaultProps = {
    handleSpriteByGender: () => null,
    handleShowForms: () => null
};

export default function ModalSpritesContainer({
    pokemonHeaderInfo, handleSpriteByGender,
    forms, handleShowForms
}) {
    //From Global Provider
    const {
        useEffect, useState,
        currentSprite, handleCurrentSprite,
        selectionSprites, currentGender,
        genderMessage, setGenderMessage, showForms
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

                {/* Button to show different Pokémon forms */}
                {
                    forms?.length > 1 ?
                        <button
                            className='showFormsButton'
                            onClick={handleShowForms}
                        >
                            {showForms ? 'Show Sprites' : 'Show Forms'}
                        </button>
                        :
                        <> </>
                }

                {/* Different Pokémon forms sprites */}
                {
                    (showForms && selectionSprites?.length) ?
                        <select
                            value={currentSprite}
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
                    (!showForms && selectionSprites?.length) ?
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
                        <div> No Sprites </div>
                }
            </div>
        </div>
    );
};
