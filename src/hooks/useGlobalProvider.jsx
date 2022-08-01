import { useState, useEffect } from 'react';

//Assets
import noPokemonSprite from '../assets/ultraBall.png';

export default function useGlobalProvider() {
    const [permaPokedexList, setPermaPokedexList] = useState([]);

    const [currentSprite, setCurrentSprite] = useState('');
    const [allSprites, setAllSprites] = useState([]);

    const [selectionSprites, setSelectionSprites] = useState([]);
    const [selectionVersions, setSelectionVersions] = useState([]);

    const [variationsSelection, setVariationsSelection] = useState([]);
    const [currentVariation, setCurrentVariation] = useState('');

    const [showShiny, setShowShiny] = useState(false);

    const [searchInputValue, setSearchInputValue] = useState('');

    const [warningMessage, setWarningMessage] = useState('');
    const [currentGender, setCurrentGender] = useState({
        male: true,
        female: false
    });

    const [easter, setEaster] = useState('');
    
    function handleCurrentSprite(sprite) {
        if (!sprite?.sprite ||
            !sprite ||
            !sprite.includes('http')) {
            setCurrentSprite(noPokemonSprite);
        };
        setCurrentSprite(sprite);
    };

    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');

    function handleWindowSizes() {
        const { innerWidth, innerHeight } = window;
        setWidth(innerWidth);
        setHeight(innerHeight);
    };

    useEffect(() => {
        handleWindowSizes();
    }, []);

    window.addEventListener('resize', handleWindowSizes);

    return {
        useState, useEffect,

        permaPokedexList, setPermaPokedexList,

        currentSprite, setCurrentSprite,
        allSprites, setAllSprites,

        selectionSprites, setSelectionSprites,
        selectionVersions, setSelectionVersions,

        variationsSelection, setVariationsSelection,
        currentVariation, setCurrentVariation,

        currentGender, setCurrentGender,
        warningMessage, setWarningMessage,

        showShiny, setShowShiny,

        handleCurrentSprite,

        searchInputValue, setSearchInputValue,
        width, height,

        easter, setEaster,
    };
};