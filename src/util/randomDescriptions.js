export async function randomDescriptions(
    allDescriptions, setDescription, setSelectionVersions
) {
    const regexingAllDescriptions = allDescriptions.map((item) => {
        return item = {
            ...item,
            flavor_text: item.flavor_text.replace(/(\n|\f)/gm, " ")
        }
    });
    const englishDescriptions = regexingAllDescriptions.filter(({ language: { name } }) => name.includes('en'));

    const randomIndex = Math.floor(Math.random() * englishDescriptions.length)

    const chosenDescription = englishDescriptions[randomIndex];

    const text = chosenDescription.flavor_text;
    const language = chosenDescription.language.name;
    const version = chosenDescription.version.name;

    setDescription({
        text,
        language,
        version
    });

    setSelectionVersions([...englishDescriptions]);
};

