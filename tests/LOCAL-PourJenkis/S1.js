const { Builder, By, Key, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');

// require('chromedriver');
// const chrome = require('selenium-webdriver/chrome');
// const serverUrl = 'http://localhost:4444/wd/hub';

const { runTest2 } = require('./2.RegisterAsClassikUser.js');
const { runTest4 } = require('./4.ConnectionAsClassikUser.js');
const { runTest7_2 } = require('./7._2_ConsultOneTennisPlayerInformation.js');
const { runTest47 } = require('./47.ClassikUserLogout.js');

let driver;

// 🌍 Base URL dynamique : Jenkins définit BASE_URL en variable d’environnement pour Heroku
const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:8000';
console.log(`🌍 Tests exécutés sur : ${BASE_URL}`);

// Function to add a timeout to a promise
async function withTimeout(promise, ms) {
    let timeoutId;
    const timeoutPromise = new Promise((_, reject) => {
        timeoutId = setTimeout(() => {
            reject(new Error(`Timeout after ${ms}ms`));
        }, ms);
    });

    try {
        await Promise.race([promise, timeoutPromise]);
    } finally {
        clearTimeout(timeoutId);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

describe('S1', function () {
    this.timeout(120000); // Set a global timeout for the suite

    // beforeEach(async function () {
    //     driver = await new Builder().forBrowser('chrome').usingServer(serverUrl).build();
    // });

    before(async function () {
        // Initialisation du pilote avec des options pour le mode non-headless
        // let options = new chrome.Options();
        // options.headless = false; // Désactive le mode headless

        let retries = 5;
        while (retries > 0) {
            try {
                driver = await new Builder().forBrowser('chrome')
                    .usingServer('http://localhost:4444')
                    .build();
                console.log("Driver successfully initialized!");
                return; // Exit the loop on success
                // driver = await new Builder().forBrowser('chrome')
                // .usingServer(serverUrl)
                // .setChromeOptions(options) // Applique les options
                // .build();
            }
            catch (e) {
                console.error(`Failed to connect to Selenium server. Retries left: ${retries}`);
                retries--;
                await sleep(5000); // Wait 5 seconds before retrying
                if (retries === 0) {
                    throw new Error("Could not connect to Selenium server after multiple retries.");
                }
            }
        }
    });

    after(async function () {
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
        await runTest2(driver, BASE_URL);
        // await sleep(2000); // Ajoute un délai de 2 secondes
    });

    it('should run Test 4 - Connect as a new user', async function () {
        await runTest4(driver, BASE_URL);
        // await sleep(2000); // Ajoute un délai de 2 secondes
    });

    it('should run Test 7.2 - Consult one tennis player info', async function () {
        await runTest7_2(driver, BASE_URL);
        // await sleep(2000); // Ajoute un délai de 2 secondes
    });

    it('should run Test 47 - Classik user logout', async function () {
        await runTest47(driver, BASE_URL);
        // await sleep(2000); // Ajoute un délai de 2 secondes
    });
});
