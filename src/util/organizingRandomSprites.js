export async function organizingSprites(
    sprites,
    setPokemonCardSprite,
    iconSprites,
) {
    const randomZeroOne = Math.floor(Math.random() * 2);
    const localSprites = sprites[randomZeroOne];
    const frontDefaultLength = localSprites.front.length;
    const indexOfLocalSprites = sprites.indexOf(localSprites);
    let sprite;

    if (frontDefaultLength && indexOfLocalSprites === 1) {
        sprite = localSprites.front[1];
    } else {
        sprite = sprites[0].front[2];
    };

    if (iconSprites) {
        const existingFemaleIcons = sprites[1]?.front.filter(icon => {
            if (icon.includes('icons')) return icon;
        });
        const existingMaleIcons = sprites[0]?.front.filter(icon => {
            if (icon.includes('icons')) return icon;
        });


        if (indexOfLocalSprites === 1 && existingFemaleIcons?.length) {
            sprite = existingFemaleIcons[0];
        } else {
            sprite = existingMaleIcons[1];
        };

        if (!sprite) sprite = existingMaleIcons[0];
    };

    return setPokemonCardSprite(sprite);
};