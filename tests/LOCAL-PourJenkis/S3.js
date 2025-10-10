const { Builder, By, Key, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');

const chrome = require('selenium-webdriver/chrome')

const { runTest3 } = require('./3.ConnectionAsAdmin.js');
console.log("A");
const { runTest5 } = require('./5.InsertFourthRoundShowdownsAndDeadLine-Admin.js');
console.log("B");
const { runTest46 } = require('./46.AdminLogout.js');
console.log("C");

let driver;

// 🌍 Base URL dynamique : Jenkins définit BASE_URL en variable d’environnement pour Heroku
const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:8000';
console.log(`🌍 Tests exécutés sur : ${BASE_URL}`);

//Exécute une promise, mais si elle ne se termine pas avant ms millisecondes, considère que c’est un échec et lève une erreur.”
async function withTimeout(promise, ms) {
    let timeoutId;

    //Création d'une promesse de délai (timeoutPromise) qui échoue au bout de ms millisecondes
    const timeoutPromise = new Promise((_, reject) => {
        timeoutId = setTimeout(() => {
            reject(new Error(`Timeout after ${ms}ms`));
        }, ms);
    });

    try {
        /*
            Lancement de 2 promesses en même temps :
            - Si promise finit avant le délai → ✅ OK
            - Si le délai (timeoutPromise) arrive avant → ❌ Timeout error
        */
        await Promise.race([promise, timeoutPromise]);
    } finally {
        clearTimeout(timeoutId);
    }
}

//Fonction qui crée une pause de ms millisecondes ⏱️ avant de reprendre le code. Elle retourne cette promesse, qu'on peut "await"
function sleep(ms) {
    //Enveloppe ce timer dans une promesse et la retourne
    return new Promise(
        //Lance un timer qui attend ms millisecondes, puis appelle resolve()
        resolve => setTimeout(resolve, ms)
    );
}

describe('S3', function () {
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

    it('should run Test 3 - Register a new user', async function () {
        await runTest3(driver, BASE_URL);
        // await sleep(2000); // Ajoute un délai de 2 secondes
    });

    it('should run Test 5 - Connect as a new user', async function () {
        await runTest5(driver, BASE_URL);
        // await sleep(2000); // Ajoute un délai de 2 secondes
    });

    it('should run Test 46 - Classik user logout', async function () {
        await runTest46(driver, BASE_URL);
        // await sleep(2000); // Ajoute un délai de 2 secondes
    });
});