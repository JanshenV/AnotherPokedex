//Styles
import './PokemonTypes.css';

//React
import { useEffect, useState } from 'react';

//Props
import PropTypes from 'prop-types';

PokemonTypes.propTypes = {
    types: PropTypes.arrayOf(PropTypes.object)
};

PokemonTypes.defaultProps = {
    types: [{}]
};



export default function PokemonTypes({ types }) {

    const [firstType, setFirstType] = useState('');
    const [secondType, setSecondType] = useState('');

    useEffect(() => {
        function organizingTypeNames() {
            const typeNames = types.map(({ type: { name } }) => {
                return name;
            });

            setFirstType(typeNames[0]);

            if (typeNames[1]) {
                setSecondType(typeNames[1]);
            };
        };

        organizingTypeNames();
    }, []);


    return (
        <div className="pokemonTypes">
            <span className={`${firstType}`}>
                {firstType}
            </span>
            {
                secondType &&
                <span className={`${secondType}`} >
                    {secondType}
                </span>
            }
        </div>
    );
};

