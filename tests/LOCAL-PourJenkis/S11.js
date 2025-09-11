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

async function main() {
    let driver = await new Builder().forBrowser('chrome').build();
    console.log("K");

    try {
        await runTest3(driver);
        console.log("L");
        await runTest30(driver);
        console.log("M");
        await runTest31(driver);
        console.log("N");
        await runTest32(driver);
        console.log("O");
        await runTest35(driver);
        console.log("P");
        await runTest46(driver);
        console.log("Q");
        await runTest4(driver);
        console.log("R");
        await runTest33(driver);
        console.log("S");
        await runTest36(driver);
        console.log("T");
        await runTest47(driver);
        console.log("U");
    } catch (error) {
        console.log("Erreur - Catch - S11 has a problem...");
        console.error('Test failed. Error details:', error);
    } finally {
        //await driver.quit();
    }
}

main();