const { test, expect } = require('@playwright/test');
const axios = require('axios');
const { hashSecretKey, testData } = require('../../config/utils');
const { BASE_URL_POKEMON } = require('../../config/environments');
const { format } = require('date-fns');

const testDataPromise = testData('tests/data/Dataset.xlsx');
const TIME_LIMIT = 10000;

test.describe('GET Pokemon Test', () => {
    async function getRequest(keyType) {
        const testData = await testDataPromise;
        let totalResponseTime = 0;

        for (const [index, data] of testData.entries()) {
            const key = keyType === 'ID' ? data.id.toString() : data.name;
            const startTime = new Date();


            console.log(`Encrypted Secret Key: ${hashSecretKey}`);
            console.log(`Pokemon ${keyType}: ${key}`);

            const response = await axios.get(`${BASE_URL_POKEMON}/pokemon/${key}`);
            const responseBody = response.data;

            // Assertions
            expect(response.status).toBe(200);
            expect(responseBody.id).toBe(data.id);
            expect(responseBody.name).toBe(data.name);

            const expectedAbilities = data.abilities.split(',').map(ability => ability.trim());
            const actualAbilities = responseBody.abilities.map(ability => ability.ability.name);
            expect(actualAbilities.sort()).toEqual(expectedAbilities.sort());

            const endTime = new Date();
            const responseTime = endTime.getTime() - startTime.getTime();
            totalResponseTime += responseTime;
        }

        const endTime = new Date();
        console.log(`Total response time for ${keyType} test: ${totalResponseTime} ms`);
        const formattedEndTime = format(endTime, 'MM/dd/yyyy hh:mm a');
        console.log(`Test end date and time: ${formattedEndTime}`);

        expect(totalResponseTime).toBeLessThan(TIME_LIMIT);
    }

    test('GET Pokemon by ID', async () => await getRequest('ID'));
    test('GET Pokemon by Name', async () => await getRequest('Name'));
});