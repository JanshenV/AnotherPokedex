export async function randomDescriptions(
    descriptions, setDescription
) {
    const randomIndex = Math.floor(Math.random() * descriptions?.length);
    const chosenDescription = descriptions[randomIndex];

    await setDescription({
        text: chosenDescription?.text,
        language: chosenDescription?.language,
        version: chosenDescription?.version
    });
};


