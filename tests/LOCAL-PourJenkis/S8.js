const { Builder, By, Key, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');

const chrome = require('selenium-webdriver/chrome')

const { runTest3 } = require('./3.ConnectionAsAdmin.js');
console.log("A");
const { runTest20 } = require('./20.InsertQuarterFinalsMatchsResults-Admin.js');
console.log("B");
const { runTest21 } = require('./21.GiveQuarterFinalsPoints-Admin.js');
console.log("C");
const { runTest22 } = require('./22.CheckBettorsRankingAfterQuarterFinals-Admin.js');
console.log("D");
const { runTest24 } = require('./24.CheckQuaterFinalsMatchsResults-Admin.js');
console.log("E");
const { runTest46 } = require('./46.AdminLogout.js');
console.log("F");
const { runTest4 } = require('./4.ConnectionAsClassikUser.js');
console.log("G");
const { runTest23 } = require('./23.CheckBettorsRankingAfterQuarterFinals-ClassikUser.js');
console.log("H");
const { runTest25 } = require('./25.CheckQuaterFinalsMatchsResults-ClassikUser.js');
console.log("I");
const { runTest47 } = require('./47.ClassikUserLogout.js');
console.log("J");

async function main() {
    let driver = await new Builder().forBrowser('chrome').build();
    console.log("k");

    try {
        await runTest3(driver);
        console.log("L");
        await runTest20(driver);
        console.log("M");
        await runTest21(driver);
        console.log("N");
        await runTest22(driver);
        console.log("O");
        await runTest24(driver);
        console.log("P");
        await runTest46(driver);
        console.log("Q");
        await runTest4(driver);
        console.log("R");
        await runTest23(driver);
        console.log("S");
        await runTest25(driver);
        console.log("T");
        await runTest47(driver);
        console.log("U");
    } catch (error) {
        console.log("Erreur - Catch - S8 has a problem...");
        console.error('Test failed. Error details:', error);
    } finally {
        //await driver.quit();
    }
}

main();