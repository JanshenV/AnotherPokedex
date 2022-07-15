import { useState, useEffect } from 'react';

export default function useGlobalProvider() {
    const [currentSprite, setCurrentSprite] = useState('');
    const [allSprites, setAllSprites] = useState([]);
    const [selectionSprites, setSelectionSprites] = useState([]);
    const [genderMessage, setGenderMessage] = useState('');

    const [currentGender, setCurrentGender] = useState({
        male: '',
        female: ''
    });

    return {
        useState, useEffect,
        currentSprite, setCurrentSprite,
        allSprites,  setAllSprites,
        selectionSprites, setSelectionSprites,
        currentGender, setCurrentGender,
        genderMessage, setGenderMessage
    };
};