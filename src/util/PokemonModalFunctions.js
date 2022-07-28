export async function organizePokemonHeaderInfo(
    pokedexNumbers,
    pokemonName,
    setPokemonHeaderInfo) {
    let formattedName;

    if (pokemonName.includes('mo-o') ||
        pokemonName.includes('-mime') ||
        pokemonName.includes('tapu-')) {
        formattedName = pokemonName;
    } else {
        let indexFirstHyphen = pokemonName.indexOf('-');
        if (indexFirstHyphen === -1) indexFirstHyphen = pokemonName.length;

        const slicedName = pokemonName.slice(0, indexFirstHyphen);
        formattedName = slicedName.replace('-', " ");
    };

    let national = (pokedexNumbers?.length &&
        pokedexNumbers[0]?.entryNumber) ?
        pokedexNumbers[0]?.entryNumber : '??';

    let regional = (pokedexNumbers?.length &&
        pokedexNumbers[1]?.entryNumber) ?
        pokedexNumbers[1]?.entryNumber : '??';


    const localHeaderInfo = {
        name: formattedName,
        national,
        regional
    };

    await setPokemonHeaderInfo(localHeaderInfo);
};

export async function organizeDescriptions(
    descriptionsList,
    setSelectionVersions,
    setPokemonDescription
) {
    async function randomDescriptions(descriptionsList) {
        const randomIndex = Math.floor(
            Math.random() * descriptionsList?.length
        );
        let chosenDescription = descriptionsList[randomIndex];

        chosenDescription = {
            text: chosenDescription?.text,
            language: chosenDescription?.language,
            version: chosenDescription?.version
        };

        return { chosenDescription };
    };

    const {
        chosenDescription
    } = await randomDescriptions(descriptionsList);

    await setSelectionVersions([...descriptionsList]);
    await setPokemonDescription(chosenDescription);

};

//In progress
export async function organizeEvolutions(
    evolutionsList,
    setEvolutions
) {
    setEvolutions([...evolutionsList]);
};

export async function organizeForms(
    formsList,
    setForms
) {
    if (formsList.length > 1) {
        let localForms = [
            {
                front: [],
                shiny_front: [],
            },

            {
                front: [],
                shiny_front: [],
            },
        ];

        formsList.forEach(form => {
            localForms[0].front.push({
                sprite: form.default,
                name: form.name
            });
            localForms[0].shiny_front.push({
                sprite: form.shiny,
                name: form.name
            });
        });

        setForms([...localForms]);
    };
};

export async function organizeVariationsSelection(
    variationsList,
    formsList,
    setVariationsSelection,
    setCurrentVariation
) {
    let localVariations = [];

    if (variationsList?.length) {
        localVariations = variationsList.map(({ name }) => {

            if (name.includes('-totem')) return '';
            const firstHyphenIndex = name.indexOf('-');
            const slicedName = name.slice(
                firstHyphenIndex + 1, name.length
            );

            return slicedName.replace('-', " ");
        });

        localVariations = localVariations.filter(variation => variation);
    };

    if (formsList?.length > 1) {
        localVariations.push({ name: 'forms' });
    };

    setVariationsSelection([...localVariations]);
    setCurrentVariation('default');
};

export async function organizeStats(
    statsList,
    setStats
) {
    let localStatsList = [];

    if (statsList?.length) {
        localStatsList = statsList.map(({
            stat,
            base_stat
        }) => {
            let name = stat.name;
            let base = base_stat
            let statLv = base_stat;

            if (name === 'attack') name = 'ATK';
            if (name === 'defense') name = 'DEF';
            if (name === 'special-attack') name = 'SATK';
            if (name === 'special-defense') name = 'SDEF';
            if (name === 'speed') name = 'SPE';

            if (statLv <= 50) statLv = 'low';
            if (statLv > 50 & statLv <= 80) statLv = 'medium';
            if (statLv > 80 & statLv <= 120) statLv = 'high';
            if (statLv > 120) statLv = 'higher';

            return {
                name,
                base,
                statLv
            };
        });
    };

    setStats([...localStatsList]);
};

export async function callAllOrganizeFunctions(
    pokemonData,
    setPokemonHeaderInfo,
    setSelectionVersions,
    setPokemonDescription,
    setEvolutions,
    setForms,
    setVariationsSelection,
    setCurrentVariation,
    setStats
) {
    const {
        all_dex_numbers: pokedexNumbers,
        name: pokemonName,
        descriptions,
        evolutions,
        varieties: variations,
        forms,
        stats,
        sprites,
        species: { specie }
    } = pokemonData;

    await organizePokemonHeaderInfo(
        pokedexNumbers,
        pokemonName,
        setPokemonHeaderInfo
    );

    await organizeDescriptions(
        descriptions,
        setSelectionVersions,
        setPokemonDescription
    );

    await organizeEvolutions(
        evolutions,
        setEvolutions
    );

    await organizeForms(
        forms,
        setForms
    );

    await organizeVariationsSelection(
        variations,
        forms,
        setVariationsSelection,
        setCurrentVariation
    );

    await organizeStats(
        stats,
        setStats
    );
}