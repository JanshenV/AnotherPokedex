export async function shinyAndFemaleSprites(
    sprites,
    setAllSprites,
    currentSpriteHandler,
    setSelectionSprites,
    currentGender,
    showShiny,
    setCurrentGender,
    setShowShiny,
    currentVariation,
    onScreenSprite,
    setWarningMessage
) {

    let localSelectionSprites = [];
    let currentSprite = '';

    if (showShiny) {
        if (currentGender.female &&
            sprites[1]?.shiny_front?.length) {
            localSelectionSprites = [...sprites[1]?.shiny_front];
            currentSprite = sprites[1]?.shiny_front[0];
        } else if (currentGender.female &&
            !sprites[1]?.shiny_front?.length &&
            sprites[1]?.front?.length) {
            localSelectionSprites = [...sprites[1]?.front];
            currentSprite = sprites[1]?.front[0];
            if (setShowShiny) setShowShiny(false);
        } else {
            if ((!sprites[1]?.front?.length &&
                currentGender.female) &&
                setWarningMessage) setWarningMessage('There are no female sprites.');
            if (sprites[0]?.shiny_front?.length) {
                localSelectionSprites = [...sprites[0]?.shiny_front];
                currentSprite = sprites[0]?.shiny_front[0];
                if (setCurrentGender) setCurrentGender({
                    male: true,
                    female: false
                });
            };
        };
    } else {
        if (currentGender.female &&
            sprites[1]?.front?.length) {
            localSelectionSprites = [...sprites[1]?.front];
            currentSprite = sprites[1]?.front[0];
        } else if (currentGender.female &&
            !sprites[1]?.front?.length &&
            sprites[1]?.shiny_front?.length) {
            localSelectionSprites = [...sprites[1]?.shiny_front];
            currentSprite = sprites[1]?.shiny_front[0];
            if (setShowShiny) setShowShiny(true);
        } else {
            if ((!sprites[1]?.front?.length &&
                currentGender.female) &&
                setWarningMessage) setWarningMessage('There are no female sprites.');
            localSelectionSprites = [...sprites[0]?.front];
            currentSprite = sprites[0]?.front[0];
            if (currentGender.female &&
                (onScreenSprite &&
                    onScreenSprite === sprites[0]?.front[2])) currentSprite = sprites[0]?.front[2];
            if (setCurrentGender) setCurrentGender({
                male: true,
                female: false
            });
        };
    };


    await setAllSprites([...sprites]);
    await setSelectionSprites([...localSelectionSprites]);
    if (currentVariation === 'forms') {
        await currentSpriteHandler(currentSprite.sprite);
        return;
    };
    await currentSpriteHandler(currentSprite);
};