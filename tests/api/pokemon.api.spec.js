//Import fixtures
const { test, expect } = require('../fixtures/fixtures');

const TIME_LIMIT = 10000;

test.describe('GET Pokemon', () => {
    async function getRequest(keyType, { pokemonData, pokemonUrl, formatDate }) {
        let totalResponseTime = 0;

        for (const [index, data] of pokemonData.entries()) {
            const key = keyType === 'ID' ? data.id.toString() : data.name;
            const startTime = new Date();

            await test.step(`GET Pokemon ${keyType}: ${key}`, async () => {
                const response = await pokemonUrl.get(`/pokemon/${key}`);
                const responseBody = response.data;

                // Assertions
                expect(response.status).toBe(200);
                expect(responseBody.id).toBe(data.id);
                expect(responseBody.name).toBe(data.name);

                const expectedAbilities = data.abilities.split(',').map(ability => ability.trim());
                const actualAbilities = responseBody.abilities.map(ability => ability.ability.name);
                expect(actualAbilities.sort()).toEqual(expectedAbilities.sort());
            });

            const endTime = new Date();
            const responseTime = endTime.getTime() - startTime.getTime();
            totalResponseTime += responseTime;
        }

        await test.step(`Validate total response time`, async () => {
            console.log(`Total response time: ${totalResponseTime} ms`);
            const formattedEndTime = formatDate(new Date(), 'MM/dd/yyyy hh:mm a');
            console.log(`Test end date and time: ${formattedEndTime}`);
            expect(totalResponseTime).toBeLessThan(TIME_LIMIT);
        });
    }

    test('by ID', async ({ pokemonData, pokemonUrl, formatDate }) => {
        await getRequest('ID', { pokemonData, pokemonUrl, formatDate });
    });

    test('by Name', async ({ pokemonData, pokemonUrl, formatDate }) => {
        await getRequest('Name', { pokemonData, pokemonUrl, formatDate });
    });
});