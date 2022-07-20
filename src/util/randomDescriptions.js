export async function randomDescriptions(allDescriptions, setDescription) {
    const englishDescriptions = allDescriptions.filter(({ language: { name } }) => name.includes('en'));
    const randomIndex = Math.floor(Math.random() * englishDescriptions.length)

    const chosenDescription = englishDescriptions[randomIndex];
    const text = chosenDescription.flavor_text.replace(/(\n|\f)/gm, " ");
    const language = chosenDescription.language.name;
    const version = chosenDescription.version.name;

    setDescription({
        text,
        language,
        version
    });
};

