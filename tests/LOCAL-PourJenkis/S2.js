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

async function main() {
    let driver = await new Builder().forBrowser('chrome').build();
    console.log("E");

    try {
        await runTest1(driver);
        console.log("F");
        await runTest3(driver);
        console.log("G");
        await runTest7_2(driver);
        console.log("H");
        await runTest46(driver);
        console.log("I");

    } catch (error) {
        console.log("Erreur - Catch - S2 has a problem...");
        console.error('Test failed. Error details:', error);
    } finally {
        //await driver.quit();
    }
}

main();