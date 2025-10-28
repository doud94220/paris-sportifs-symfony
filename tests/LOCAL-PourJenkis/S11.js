const { Builder, By, Key, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');

const chrome = require('selenium-webdriver/chrome')

const { runTest3 } = require('./3.ConnectionAsAdmin.js');
console.log("A");
const { runTest30 } = require('./30.InsertSemiFinalsMatchsResults-Admin.js');
console.log("B");
const { runTest31 } = require('./31.GiveSemiFinalsPoints-Admin.js');
console.log("C");
const { runTest32 } = require('./32.CheckBettorsRankingAfterSemiFinals-Admin.js');
console.log("D");
const { runTest35 } = require('./35.CheckSemiFinalsMatchsResults-Admin.js');
console.log("E");
const { runTest46 } = require('./46.AdminLogout.js');
console.log("F");
const { runTest4 } = require('./4.ConnectionAsClassikUser.js');
console.log("G");
const { runTest33 } = require('./33.CheckBettorsRankingAfterSemiFinals-ClassikUser.js');
console.log("H");
const { runTest36 } = require('./36.CheckSemiFinalsMatchsResults-ClassikUser.js');
console.log("I");
const { runTest47 } = require('./47.ClassikUserLogout.js');
console.log("J");

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

describe('S11', function () {
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

    it('should run Test 3 - Connect as Admin', async function () {
        await runTest3(driver, BASE_URL);
    });

    it('should run Test 30 - Insert SemiFinals Matchs Results as Admin', async function () {
        await runTest30(driver, BASE_URL);
    });

    it('should run Test 31 - Give SemiFinals Points as Admin', async function () {
        await runTest31(driver, BASE_URL);
    });

    it('should run Test 32 - Check Bettors Ranking After SemiFinals as Admin', async function () {
        await runTest32(driver, BASE_URL);
    });

    it('should run Test 35 - Check SemiFinals Matchs Results as Admin', async function () {
        await runTest35(driver, BASE_URL);
    });

    it('should run Test 46 - Logout as Admin', async function () {
        await runTest46(driver, BASE_URL);
    });

    it('should run Test 4 - Connect as Classik User', async function () {
        await runTest4(driver, BASE_URL);
    });

    it('should run Test 33 - Check Bettors Ranking After SemiFinals as Classik User', async function () {
        await runTest33(driver, BASE_URL);
    });

    it('should run Test 36 - Check SemiFinals Matchs Results as Classik User', async function () {
        await runTest36(driver, BASE_URL);
    });

    it('should run Test 47 - Logout as Classik User', async function () {
        await runTest47(driver, BASE_URL);
    });
});