const { Builder, By, Key, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');

require('chromedriver');
const serverUrl = 'http://localhost:4444/wd/hub';

const { runTest2 } = require('./2.RegisterAsClassikUser.js');
const { runTest4 } = require('./4.ConnectionAsClassikUser.js');
const { runTest7_2 } = require('./7._2_ConsultOneTennisPlayerInformation.js');
const { runTest47 } = require('./47.ClassikUserLogout.js');

let driver;

// Function to add a timeout to a promise
function withTimeout(promise, ms) {
    return Promise.race([
        promise,
        new Promise((_, reject) => setTimeout(() => reject(new Error('Promise timed out')), ms))
    ]);
}

describe('S1', function () {
    this.timeout(45000); // Set a global timeout for the suite

    // beforeEach(async function () {
    //     driver = await new Builder().forBrowser('chrome').usingServer(serverUrl).build();
    // });

    beforeEach(async function () {
        // Initialisation du pilote avec des options pour le mode non-headless
        let options = new chrome.Options();
        options.headless = false; // Désactive le mode headless

        driver = await new Builder().forBrowser('chrome')
            .usingServer(serverUrl)
            .setChromeOptions(options) // Applique les options
            .build();
    });

    afterEach(async function () {
        // This runs after all tests and cleans up the driver
        try {
            if (driver) {
                // await driver.quit();
                // This line is what solves the problem
                await withTimeout(driver.quit(), 10000);
            }
        } catch (e) {
            console.error("Error quitting the WebDriver:", e);
        }
    });

    it('should run Test 2 - Register a new user', async function () {
        await runTest2(driver);
    });

    it('should run Test 4 - Connect as a new user', async function () {
        await runTest4(driver);
    });

    it('should run Test 7.2 - Consult one tennis player info', async function () {
        await runTest7_2(driver);
    });

    it('should run Test 47 - Classik user logout', async function () {
        await runTest47(driver);
    });
});
