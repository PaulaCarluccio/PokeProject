//Imports
const { test: base, expect } = require('@playwright/test');
const { hashSecretKey, testData } = require('../../config/utils');
const axios = require('axios');
const { format } = require('date-fns');
const path = require('path');
const fs = require('fs');
const { BASE_URL_POKEMON, BASE_URL_TYPICODE } = require('../../config/environments');

const test = base.extend({
    // To provide the data to the tests
    pokemonData: async ({}, use) => {
        const data = await testData('tests/data/Dataset.xlsx');
        await use(data);
    },

    // URL for Pokemon API
    pokemonUrl: async ({}, use) => {
        const instance = axios.create({
            baseURL: BASE_URL_POKEMON,
        });
        await use(instance);
    },

    // URL for Typicode API
    typicodeUrl: async ({}, use) => {
        const instance = axios.create({
            baseURL: BASE_URL_TYPICODE,
        });
        await use(instance);
    },

    // Date formatting function
    formatDate: async ({}, use) => {
        await use(format);
    },

    // File system module
    fsInstance: async ({}, use) => {
        await use(fs);
    },

    // Path module
    pathInstance: async ({}, use) => {
        await use(path);
    },

    hashSecretKey: async ({}, use) => {
        await use(hashSecretKey);
    }
});

// Log the hashed secret key before each test
test.beforeEach(async ({ hashSecretKey }) => {
    console.log(`Hash Secret Key: ${hashSecretKey}`);
});

module.exports = { test, expect };

