//Styles
import './ModalSpritesContainer.css';

//Global Provider
import useGlobal from '../../../hooks/useGlobal';

//Components
import GenderIcons  from '../../GenderIcon/GenderIcons';

//Assets
import darkerPokeballBackGround from '../../../assets/darkerPokeballBackground.svg';

//PropTypes
import PropTypes from 'prop-types';
ModalSpritesContainer.propTypes = {
    handleSpriteByGender: PropTypes.func,
    pokemonName: PropTypes.string,
    pokemonDexNr: PropTypes.number,
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
    pokemonName: 'Noah',
    pokemonDexNr: 666,
    handleShowForms: () => null
};

export default function ModalSpritesContainer({
    pokemonName, handleSpriteByGender, pokemonDexNr,
    forms, handleShowForms
}) {

    //From Global Provider
    const {
        useEffect, currentSprite, setCurrentSprite,
        selectionSprites, currentGender,
        genderMessage, setGenderMessage, showForms
    } = useGlobal();

    useEffect(() => {
        setTimeout(() => setGenderMessage(''), 3000);
    }, [genderMessage]);

    return (
        <div className={`spritesContainer`}>
            <div className='spritesContainerHeader'>
                <h2 className='titleName'>
                    {pokemonName}
                </h2>
                
                <span className='titleDexnr'>
                    #{pokemonDexNr}
                </span>
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
                        className="pokemonImg"
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
                        disabled={currentGender.female}
                    />
                    <GenderIcons
                        gender={'male'}
                        onClick={() => handleSpriteByGender('male')}
                        disabled={currentGender.male}
                    />
                </div>

                {
                    forms?.length > 1 ?
                        <button
                            className='showFormsButton'
                            onClick={handleShowForms}
                        >
                            {showForms ? 'Show Sprites' : 'Show Forms'}
                        </button>
                        : null
                }

                {
                    showForms ?
                        <select
                            value={currentSprite}
                            onChange={(e) => setCurrentSprite(e.target.value)}
                        >
                            {
                                selectionSprites?.length &&
                                selectionSprites.map((form, index) => {
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
                        
                        <select
                            value={currentSprite}
                            onChange={(e) => setCurrentSprite(e.target.value)}
                        >
                            {
                                selectionSprites?.length &&
                                selectionSprites.map((sprite, index) => {
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
                }
            </div>
        </div>
    );
};
