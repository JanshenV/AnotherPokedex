export async function organizingEnglishDescriptions(allDescriptions) {
    const formattingAllDescriptions = allDescriptions.map((item) => {
        return item = {
            text: item.flavor_text.replace(/(\n|\f)/gm, " "),
            language: item.language.name,
            version: item.version.name
        }
    });
    const englishDescriptions = formattingAllDescriptions.filter(({ language }) => language === 'en');

    return { englishDescriptions };
};


export async function randomDescriptions(
    descriptions, setDescription
) {
    const randomIndex = Math.floor(Math.random() * descriptions.length);
    const chosenDescription = descriptions[randomIndex];

    await setDescription({
        text: chosenDescription?.text,
        language: chosenDescription?.language,
        version: chosenDescription?.version
    });
};


