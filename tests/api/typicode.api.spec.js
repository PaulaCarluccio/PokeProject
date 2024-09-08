//Import fixtures
const { test, expect } = require('../fixtures/fixtures');

const TIME_LIMIT = 10000;

test.describe('POST Request', () => {
    test('with Pokemon Data', async ({ pokemonData, typicodeUrl, formatDate }) => {
        const firstPokemon = pokemonData[0];
        
        const testData = {
            title: firstPokemon.name,
            body: `Details about ${firstPokemon.name}`,
            userId: 1
        };

        const startTime = new Date();

        await test.step('Send POST request', async () => {
            const endpoint = '/posts';
            const response = await typicodeUrl.post(endpoint, testData);
            const responseBody = response.data;

            // Assertions
            expect(response.status).toBe(201);
            expect(responseBody).toMatchObject(testData);
            expect(responseBody.title).toBe(testData.title);
            expect(responseBody.body).toBe(testData.body);
        });

        const endTime = new Date();
        const responseTime = endTime.getTime() - startTime.getTime();
        
        await test.step('Validate total response time', async () => {
            console.log(`Total response time: ${responseTime} ms`);
            const formattedEndTime = formatDate(endTime, 'MM/dd/yyyy hh:mm a');
            console.log(`Test end date and time: ${formattedEndTime}`);
            expect(responseTime).toBeLessThan(TIME_LIMIT);
        });
    });
});
