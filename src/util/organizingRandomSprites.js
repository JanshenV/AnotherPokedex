function organizingSprites(sprites, setPokemonSprites) {
    const randomZeroOne = Math.floor(Math.random() * 2);
    const localSprites = sprites[randomZeroOne];
    const randomDefaultShiny = Math.floor(Math.random() * 2);

    const frontShiniesLength = localSprites.shiny_front.length;
    const frontDefaultLength = localSprites.front.length;

    let sprite;

    if (randomDefaultShiny === 1) {
        if (frontShiniesLength !== 0) {
            const randomSpriteNumber = Math.floor(Math.random() * frontShiniesLength);

            sprite = localSprites.shiny_front[randomSpriteNumber];
            setPokemonSprites(sprite);
            return { sprite };
        } else {
            const randomSpriteNumber = Math.floor(Math.random() * frontDefaultLength);

            sprite = sprites[0].front[randomSpriteNumber];
            setPokemonSprites(sprite);
            return { sprite };
        };
    } else {
        if (frontShiniesLength !== 0) {
            const randomSpriteNumber = Math.floor(Math.random() * frontShiniesLength);

            const sprite = localSprites.shiny_front[randomSpriteNumber];
            setPokemonSprites(sprite);
            return { sprite };
        } else {
            const randomSpriteNumber = Math.floor(Math.random() * frontDefaultLength);

            sprite = sprites[0].front[randomSpriteNumber];
            setPokemonSprites(sprite);
            return { sprite };
        };
    };

};

module.exports = organizingSprites;