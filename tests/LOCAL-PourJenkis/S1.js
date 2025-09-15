const { Builder, By, Key, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');

require('chromedriver');
const serverUrl = 'http://localhost:4444/wd/hub';

const { runTest2 } = require('./2.RegisterAsClassikUser.js');
const { runTest4 } = require('./4.ConnectionAsClassikUser.js');
const { runTest7_2 } = require('./7._2_ConsultOneTennisPlayerInformation.js');
const { runTest47 } = require('./47.ClassikUserLogout.js');

async function main() {
    let driver = await new Builder().forBrowser('chrome').usingServer(serverUrl).build();

    try {
        await runTest2(driver);
        await runTest4(driver);
        await runTest7_2(driver);
        await runTest47(driver);

    } catch (error) {
        console.log("Erreur - Catch - S1 has a problem...");
        console.error('Test failed. Error details:', error);
    } finally {
        await driver.quit();
    }
}

main();