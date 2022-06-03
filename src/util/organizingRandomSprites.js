async function organizingSprites(sprites, setPokemonSprites) {
    const randomZeroOne = Math.floor(Math.random() * 2);
    const localSprites = sprites[randomZeroOne];
    const frontDefaultLength = localSprites.front.length;

    let sprite;

    if (frontDefaultLength) {

        sprite = localSprites.front[2];
        setPokemonSprites(sprite);
    } else {
        sprite = sprites[0].front[2];
        setPokemonSprites(sprite);
    };

};

module.exports = organizingSprites;