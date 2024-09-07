const { test, expect } = require('@playwright/test');
const axios = require('axios');
const { hashSecretKey } = require('../../config/utils');
const { BASE_URL_TYPICODE } = require('../../config/environments');
const { format } = require('date-fns');

const TIME_LIMIT = 10000;

test.describe('POST Request Test', () => {
    test('Create Post', async () => {
        console.log(`Encrypted secret key: ${hashSecretKey}`); // Log the encrypted secret key

        const testData = {
            title: 'This is a test title',
            body: 'lorem ipsum dolor sit amet',
            userId: 1
        };

        const startTime = new Date(); // Record the start time of the test

        const url = `${BASE_URL_TYPICODE}/posts`;

        const response = await axios.post(url, testData);
        const responseBody = response.data;

        // Assertions
        expect(response.status).toBe(201);
        expect(responseBody).toMatchObject(testData);
        expect(responseBody.title).toBe(testData.title);
        expect(responseBody.body).toBe(testData.body);

        const endTime = new Date();
        const responseTime = endTime.getTime() - startTime.getTime();
        
        console.log(`Total response time for POST request: ${responseTime} ms`);
        const formattedEndTime = format(endTime, 'MM/dd/yyyy hh:mm a');
        console.log(`Test end date and time: ${formattedEndTime}`);

        expect(responseTime).toBeLessThan(TIME_LIMIT);
    });
});