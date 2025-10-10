const { Builder, By, Key, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');

const chrome = require('selenium-webdriver/chrome')

const { runTest1 } = require('./1.RegisterAsAdmin.js');
console.log("A");
const { runTest3 } = require('./3.ConnectionAsAdmin.js');
console.log("B");
const { runTest7_2 } = require('./7._2_ConsultOneTennisPlayerInformation.js');
console.log("C");
const { runTest46 } = require('./46.AdminLogout.js');
console.log("D");

let driver;

// 🌍 Base URL dynamique : Jenkins définit BASE_URL en variable d’environnement pour Heroku
const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:8000';
console.log(`🌍 Tests exécutés sur : ${BASE_URL}`);

describe('S2', function () {
    this.timeout(120000); // Set a global timeout for the suite

    before(async function () {
        const useCi = process.env.USE_CI === 'true'; // 🏭 true = Jenkins
        const gridUrl = process.env.SELENIUM_URL || 'http://localhost:4444';
        let retries = 5;

        while (retries > 0) {
            try {
                const options = new chrome.Options();

                if (useCi) {
                    options.addArguments(
                        '--headless',
                        '--disable-gpu',
                        '--no-sandbox',
                        '--disable-dev-shm-usage',
                        '--ignore-certificate-errors',
                        '--dns-prefetch-disable',
                        '--disable-features=NetworkService',
                        '--disable-web-security',
                        '--allow-running-insecure-content',
                        '--no-proxy-server',
                        '--proxy-server="direct://"'
                    );
                }

                driver = await new Builder()
                    .forBrowser('chrome')
                    .usingServer(gridUrl)
                    .setChromeOptions(options)
                    .build();

                console.log(
                    `✅ Driver initialized via Selenium Grid (${gridUrl}) [Mode: ${useCi ? 'CI' : 'Local'}]`
                );

                return;
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

    it('should run Test 1 - Register a new user', async function () {
        await runTest1(driver, BASE_URL);
        // await sleep(2000); // Ajoute un délai de 2 secondes
    });

    it('should run Test 3 - Connect as a new user', async function () {
        await runTest3(driver, BASE_URL);
        // await sleep(2000); // Ajoute un délai de 2 secondes
    });

    it('should run Test 7.2 - Consult one tennis player info', async function () {
        await runTest7_2(driver, BASE_URL);
        // await sleep(2000); // Ajoute un délai de 2 secondes
    });

    it('should run Test 46 - Classik user logout', async function () {
        await runTest46(driver, BASE_URL);
        // await sleep(2000); // Ajoute un délai de 2 secondes
    });
});