class BasePage {
    constructor(page) {
        this.page = page;
    }

    async find(locator) {
        const element = this.page.locator(locator);
        await element.waitFor({ state: 'visible' });
        return element;
    }

    async getText(locator) {
        const element = await this.find(locator);
        return await element.textContent();
    }

    async getImageUrl(locator) {
        const imageUrl = await (await this.find(locator)).getAttribute('src');
        return imageUrl ? `https:${imageUrl}` : '';
    }
}

module.exports = BasePage;

