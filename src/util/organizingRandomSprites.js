export async function organizingSprites(sprites, setPokemonSprites, iconSprites) {
    const randomZeroOne = Math.floor(Math.random() * 2);
    const localSprites = sprites[randomZeroOne];
    const frontDefaultLength = localSprites.front.length;
    const indexOfLocalSprites = sprites.indexOf(localSprites)

    let sprite;
    if (frontDefaultLength && indexOfLocalSprites === 1) {
        sprite = localSprites.front[1];
        if (iconSprites) {
            for (let icon of localSprites.front) {
                if (icon.includes('icons')) {
                    sprite = icon;
                };
            };
        };
    } else {
        sprite = sprites[0].front[2];
        if (iconSprites) {
            for (let icon of sprites[0].front) {
                if (icon.includes('icons')) {
                    sprite = icon;
                };
            };
        };
    };
    return setPokemonSprites(sprite);
};