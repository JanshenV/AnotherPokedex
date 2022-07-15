//Styles
import './ModalSpritesContainer.css';

//React
import { useState, useEffect } from 'react';


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
    currentSprite, setCurrentSprite,
    currentGender,
    selectionSprites, handleSpriteByGender,
    pokemonName,
}) {

    const [genderMessage, setGenderMessage] = useState('');

    useEffect(() => {
        setTimeout(() => setGenderMessage(''), 3000);
    }, [genderMessage]);
    return (
        <div className={`spritesContainer`}>
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
            {
                currentSprite &&
                <img
                    src={currentSprite}
                    alt={pokemonName}
                    className="pokemonImg"
                />
            }
            <div className="genderIcons">
                {
                    genderMessage &&
                    <span>{genderMessage}</span>
                }
                <button
                    onClick={() => handleSpriteByGender('female')}
                >
                </button>

                <button
                    onClick={() => handleSpriteByGender('male')}
                >
                </button>
                              
            </div>
        </div>
    );
};
