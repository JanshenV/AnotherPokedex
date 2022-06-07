async function organizingSprites(sprites, setPokemonSprites, iconSprites) {
    const randomZeroOne = Math.floor(Math.random() * 2);
    const localSprites = sprites[randomZeroOne];
    const frontDefaultLength = localSprites.front.length;

    let sprite;

    if (frontDefaultLength) {
        sprite = localSprites.front[2];
        if (iconSprites) {
            sprite = localSprites.front[12];
        };
    } else {
        sprite = sprites[0].front[2];
        if (iconSprites) {
            sprite = sprites[0].front[12];
        };

    };
    setPokemonSprites(sprite);
};

module.exports = organizingSprites;