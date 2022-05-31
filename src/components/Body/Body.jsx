//Styles
import './Body.css';

//Components
import Header from '../Header';
import PokemonPopulate from '../PokemonPopulate';

//React Hooks
import { useState, useEffect } from 'react';

//Api
import { handlePokedex } from '../../api/apiCalls';

//Assets
import loadingIcon from '../../assets/loadingIcon.png';

export default function Body({ }) {

    const [pokedexList, setPokedexList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPokedex() {
            const {
                pokedexResponse, error
            } = await handlePokedex('kanto');
            if (error) return alert(`${error}. Refresh page`);

            setPokedexList(pokedexResponse);
            setLoading(false);
        };
        fetchPokedex();
    }, []);


    return (
        <main className='bodyContainer'>
            <Header />

            {loading ?
                <img
                    className="loadingIcon"
                    src={loadingIcon}
                    alt="Your Content is Loading"
                />
                :
                <PokemonPopulate
                    pokedexList={pokedexList}
                />
            }
        </main>
    );
};

