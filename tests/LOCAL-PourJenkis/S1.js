const { Builder, By, Key, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');

require('chromedriver');
const serverUrl = 'http://localhost:4444/wd/hub';

const { runTest2 } = require('./2.RegisterAsClassikUser.js');
const { runTest4 } = require('./4.ConnectionAsClassikUser.js');
const { runTest7_2 } = require('./7._2_ConsultOneTennisPlayerInformation.js');
const { runTest47 } = require('./47.ClassikUserLogout.js');

let driver;

describe('S1', function () {
    this.timeout(20000); // Set a global timeout for the suite

    before(async function () {
        driver = await new Builder().forBrowser('chrome').usingServer(serverUrl).build();
    });

    it('should successfully register a new user', async function () {
        await runTest2(driver);
    });

    it('should successfully register a new user', async function () {
        await runTest4(driver);
    });

    it('should successfully register a new user', async function () {
        await runTest7_2(driver);
    });

    it('should successfully register a new user', async function () {
        await runTest47(driver);
    });
});

after(async function () {
    // This runs after all tests and cleans up the driver
    await driver.quit();
});
});