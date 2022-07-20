export async function organizingSprites(sprites, setPokemonSprites, iconSprites) {
    const randomZeroOne = Math.floor(Math.random() * 2);
    const localSprites = sprites[randomZeroOne];
    const frontDefaultLength = localSprites.front.length;

    let sprite;

    if (frontDefaultLength) {
        sprite = localSprites.front[2];
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