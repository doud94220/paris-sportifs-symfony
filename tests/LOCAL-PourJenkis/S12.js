const { Builder, By, Key, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');

const chrome = require('selenium-webdriver/chrome')

const { runTest3 } = require('./3.ConnectionAsAdmin.js');
console.log("A");
const { runTest37 } = require('./37.InsertFinalShowdownsAndDeadLine-Admin.js');
console.log("B");
const { runTest46 } = require('./46.AdminLogout.js');
console.log("C");

async function main() {
    let driver = await new Builder().forBrowser('chrome').build();
    console.log("D");

    try {
        await runTest3(driver);
        console.log("E");
        await runTest37(driver);
        console.log("F");
        await runTest46(driver);
        console.log("G");
    } catch (error) {
        console.log("Erreur - Catch - S12 has a problem...");
        console.error('Test failed. Error details:', error);
    } finally {
        //await driver.quit();
    }
}

main();