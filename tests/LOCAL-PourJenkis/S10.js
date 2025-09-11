const { Builder, By, Key, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');

const chrome = require('selenium-webdriver/chrome')

const { runTest3 } = require('./3.ConnectionAsAdmin.js');
console.log("A");
const { runTest28 } = require('./28.BetOnSemiFinals-Admin.js');
console.log("B");
const { runTest46 } = require('./46.AdminLogout.js');
console.log("C");
const { runTest4 } = require('./4.ConnectionAsClassikUser.js');
console.log("D");
const { runTest29 } = require('./29.BetOnSemiFinals-ClassikUser.js');
console.log("E");
const { runTest47 } = require('./47.ClassikUserLogout.js');
console.log("F");

async function main() {
    let driver = await new Builder().forBrowser('chrome').build();
    console.log("G");

    try {
        await runTest3(driver);
        console.log("H");
        await runTest28(driver);
        console.log("I");
        await runTest46(driver);
        console.log("J");
        await runTest4(driver);
        console.log("K");
        await runTest29(driver);
        console.log("L");
        await runTest47(driver);
        console.log("M");
    } catch (error) {
        console.log("Erreur - Catch - S10 has a problem...");
        console.error('Test failed. Error details:', error);
    } finally {
        //await driver.quit();
    }
}

main();