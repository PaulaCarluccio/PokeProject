const { defineConfig, devices } = require('@playwright/test');
const { BASE_URL } = require('./config/environments');

module.exports = defineConfig({
    testDir: './tests',
    timeout: 30000,
    retries: 2,
    reporter: [
        ['list'],
        ['html', {
            open: 'always',
            outputFolder: 'playwright-report',
            filename: 'index.html',
            attachment: true,
        }]
    ],
    use: {
        baseURL: BASE_URL,
        trace: 'on-first-retry',
    },
    projects: [
        {
            name: 'API Testing',
            testMatch: /.*\.api\.spec\.js$/,
            use: {
                ...devices['Desktop Chrome'],
                headless: true,
            },
        },
        {
            name: 'UI Testing',
            testMatch: /.*\.ui\.spec\.js$/,
            use: {
                ...devices['Desktop Chrome'],
                headless: true,
            },
        },
    ],
});
