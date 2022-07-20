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
    currentSprite: PropTypes.string,
    setCurrentSprite: PropTypes.func,
    currentGender: PropTypes.shape(
        {
            male: PropTypes.bool,
            female: PropTypes.bool,
        }
    ),
    selectionSprites: PropTypes.arrayOf(
        PropTypes.string
    ),
    handleSpriteByGender: PropTypes.func,
    pokemonName: PropTypes.string,
};

ModalSpritesContainer.defaultProps = {
    setCurrentSprite: () => null,
    currentGender: {
        male: true,
        female: false
    },
    selectionSprites: ['option 1', 'option 2', 'option ...'],
    handleSpriteByGender: () => null,
    pokemonName: 'Noah'
};

export default function ModalSpritesContainer({
    pokemonName, handleSpriteByGender, pokemonDexNr
}) {

    //From Global Provider
    const {
        useEffect, currentSprite, setCurrentSprite,
        selectionSprites, currentGender, allSprites,
        genderMessage, setGenderMessage
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

                <select
                    defaultValue={currentSprite}
                    onChange={(e) => setCurrentSprite(e.target.value)}
                >
                    {
                        selectionSprites?.length &&
                        selectionSprites.map((sprite, index) => {
                            return (
                                <option
                                    value={sprite}
                                    key={index}
                                    selected={currentSprite === sprite}
                                >
                                    Sprite: {index + 1}
                                </option>
                            )
                        })
                    }
                </select>
            </div>
        </div>
    );
};
