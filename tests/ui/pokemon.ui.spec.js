const { test, expect } = require('../fixtures/fixtures'); // Import fixtures
const PokemonPage = require('../ui/pages/PokemonPage');
const { downloadImageToProjectFolder, validateImageFile } = require('../../config/utils');

const getImageFileName = (pokemonName, path) => {
    return path.join('tests/images', `${pokemonName.toLowerCase()}.png`);
};

const validatePokemon = async (page, data, fs, path, testInfo) => {
    const { name } = data;
    if (!name) return;

    const pokemonPage = new PokemonPage(page, testInfo);

    await test.step(`Navigate to Pokemon page for ${name}`, async () => {
        await pokemonPage.navigateTo(name);
        const title = await pokemonPage.getPageTitle();
        expect(title.toLowerCase()).toContain(name.toLowerCase());
    });

    await test.step(`Validate page title for ${name}`, async () => {
        const title = await pokemonPage.getPageTitle();
        const expectedTitle = `${name} artwork by`;
        expect(title.toLowerCase()).toMatch(new RegExp(`^${expectedTitle.toLowerCase()}`));
    });

    await test.step(`Validate Pokemon image for ${name}`, async () => {
        const imageUrl = await pokemonPage.getPokemonImageUrl();
        // Capture screenshot of the Pokemon page
        await pokemonPage.captureScreenshot(name);

        // Download and save the image
        const imageName = getImageFileName(name, path);
        await downloadImageToProjectFolder(imageUrl, imageName, fs);
        // Validates
        validateImageFile(imageName, fs);
    });
};

test.describe('Pokemon UI Tests', () => {
    let pokemonData;

    test.beforeAll(async ({ pokemonData: loadedPokemonData }) => {
        pokemonData = loadedPokemonData;
    });

    test.beforeEach(async ({ page }) => {
        // Maximize the browser window
        await page.setViewportSize({ width: 1920, height: 1080 });
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });

    test('Wikipedia', async ({ page, fsInstance, pathInstance }, testInfo) => {
        // Use a loop to iterate through each Pokemon and create tests dynamically
        for (let pokemon of pokemonData) {
            const name = pokemon.name;
            await test.step(`Go to Pokemon page for ${name} on Wikipedia`, async () => {
                await validatePokemon(page, pokemon, fsInstance, pathInstance, testInfo);
            });
        }
    });
});