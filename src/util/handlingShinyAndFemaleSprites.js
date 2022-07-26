export async function shinyAndFemaleSprites(
    sprites,
    setAllSprites,
    currentSpriteHandler,
    setSelectionSprites,
    currentGender,
    showShiny,
    setCurrentGender,
    setShowShiny
) {

    let localSelectionSprites = [];
    let currentSprite = '';

    if (showShiny) {
        if (currentGender.female && sprites[1]?.shiny_front?.length) {
            localSelectionSprites = [...sprites[1]?.shiny_front];
            currentSprite = sprites[1]?.shiny_front[0];
        } else if (currentGender.female &&
            !sprites[1]?.shiny_front?.length &&
            sprites[1]?.front?.length) {
            localSelectionSprites = [...sprites[1]?.front];
            currentSprite = sprites[1]?.front[0];
            if (setShowShiny) setShowShiny(false);
        } else {
            if (sprites[0]?.shiny_front?.length &&
                !sprites[0]?.name?.length) {
                localSelectionSprites = [...sprites[0]?.shiny_front];
                currentSprite = sprites[0]?.shiny_front[0];
                if (setCurrentGender) setCurrentGender({
                    male: true,
                    female: false
                });
            };
        };
    } else {
        if (currentGender.female && sprites[1]?.front?.length) {
            localSelectionSprites = [...sprites[1]?.front];
            currentSprite = sprites[1]?.front[0];
        } else if (currentGender.female &&
            !sprites[1]?.front?.length &&
            sprites[1]?.shiny_front?.length) {
            localSelectionSprites = [...sprites[1]?.shiny_front];
            currentSprite = sprites[1]?.shiny_front[0];

            if (setShowShiny) setShowShiny(true);
        } else {
            if (sprites[0]?.front?.length &&
                !sprites[0]?.name?.length) {
                localSelectionSprites = [...sprites[0]?.front];
                currentSprite = sprites[0]?.front[0];
                if (setCurrentGender) setCurrentGender({
                    male: true,
                    female: false
                });
            };
        };
    };

    if (sprites[0]?.name?.length) {
        if (showShiny) {
            sprites[0]?.shiny_front?.forEach((sprite, index) => {
                localSelectionSprites.push({
                    sprite,
                    name: sprites[0]?.name[index]
                });
            });
        } else {
            sprites[0]?.front?.forEach((sprite, index) => {
                localSelectionSprites.push({
                    sprite,
                    name: sprites[0]?.name[index]
                });
            });
        };
        currentSprite = localSelectionSprites[0];
    };


    await setAllSprites([...sprites]);
    await setSelectionSprites([...localSelectionSprites]);
    await currentSpriteHandler(currentSprite);

};