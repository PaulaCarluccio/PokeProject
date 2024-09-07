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
            name: 'API TEST',
            testMatch: /.*\.api\.spec\.js$/,
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'Web TEST',
            testMatch: /.*\.web\.spec\.js$/,
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});
