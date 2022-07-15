//Styles
import './ModalSpritesContainer.css';

//Global Provider
import useGlobal from '../../../hooks/useGlobal';

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

// ModalSpritesContainer.defaultProps = {

// };

export default function ModalSpritesContainer({
    pokemonName, handleSpriteByGender, pokemonDexNr
}) {

    //From Global Provider
    const {
        useEffect, currentSprite, setCurrentSprite,
        selectionSprites, currentGender,
        genderMessage, setGenderMessage
    } = useGlobal();

    useEffect(() => {
        setTimeout(() => setGenderMessage(''), 3000);
    }, [genderMessage]);

    return (
        <div className={`spritesContainer`}>
            <h2 className='titleName'>
                {pokemonName}
            </h2>

            <span className='titleDexnr'>
                #{pokemonDexNr}
            </span>
            {/* <select
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
            </select> */}
            {
                currentSprite &&
                <img
                    src={currentSprite}
                    alt={pokemonName}
                    className="pokemonImg"
                />
            }

            {/* {
                genderMessage &&
                <span className='genderMessage'>
                    {genderMessage}
                </span>
            } */}
{/* 
            <div className="genderIcons">
                <button
                    onClick={() => handleSpriteByGender('female')}
                    className="femaleButton"
                    disabled={currentGender.female}
                >
                </button>

                <button
                    onClick={() => handleSpriteByGender('male')}
                    className="maleButton"
                    disabled={currentGender.male}
                >
                </button>
                              
            </div> */}
        </div>
    );
};
