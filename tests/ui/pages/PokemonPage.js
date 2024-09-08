const path = require('path');
const BasePage = require('./BasePage');

class PokemonPage extends BasePage {
    constructor(page, testInfo) {
        super(page);
        this.page = page;
        this.testInfo = testInfo;
        //Locators
        this.pokemonTitle = '//div[@class="infobox-caption"]';
        this.pokemonArtist = '//div[@class="infobox-caption"]/a';
        this.pokemonImage = '//table[@class="infobox"]//img[@class="mw-file-element"]';
    }

    async navigateTo(pokemonName) {
        await this.page.goto(`https://en.wikipedia.org/wiki/${pokemonName}`);
    }

    async getPageTitle() {
        return this.getText(this.pokemonTitle);
    }

    async getArtistText() {
        return this.getText(this.pokemonArtist);
    }

    async getPokemonImageUrl() {
        return this.getImageUrl(this.pokemonImage);
    }

    async captureScreenshot(name) {
        const screenshot = await this.page.screenshot();
        await this.testInfo.attach(`${name}-screenshot`, {
            body: screenshot,
            contentType: 'image/png',
        });
    }
}

module.exports = PokemonPage;
