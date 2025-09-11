const { Builder, By, Key, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');

const chrome = require('selenium-webdriver/chrome')

const { runTest3 } = require('./3.ConnectionAsAdmin.js');
console.log("A");
const { runTest40 } = require('./40.InsertFinalMatchResult-Admin.js');
console.log("B");
const { runTest41 } = require('./41.GiveFinalPoints-Admin.js');
console.log("C");
const { runTest42 } = require('./42.CheckBettorsRankingAfterFinal-Admin.js');
console.log("D");
const { runTest44 } = require('./44.CheckFinalMatchsResults-Admin.js');
console.log("E");
const { runTest46 } = require('./46.AdminLogout.js');
console.log("F");
const { runTest4 } = require('./4.ConnectionAsClassikUser.js');
console.log("G");
const { runTest43 } = require('./43.CheckBettorsRankingAfterFinal-ClassikUser.js');
console.log("H");
const { runTest45 } = require('./45.CheckFinalMatchsResults-ClassikUser.js');
console.log("I");
const { runTest47 } = require('./47.ClassikUserLogout.js');
console.log("J");

async function main() {
    let driver = await new Builder().forBrowser('chrome').build();
    console.log("K");

    try {
        await runTest3(driver);
        console.log("L");
        await runTest40(driver);
        console.log("M");
        await runTest41(driver);
        console.log("N");
        await runTest42(driver);
        console.log("O");
        await runTest44(driver);
        console.log("P");
        await runTest46(driver);
        console.log("Q");
        await runTest4(driver);
        console.log("R");
        await runTest43(driver);
        console.log("S");
        await runTest45(driver);
        console.log("T");
        await runTest47(driver);
        console.log("U");
    } catch (error) {
        console.log("Erreur - Catch - S14 has a problem...");
        console.error('Test failed. Error details:', error);
    } finally {
        //await driver.quit();
    }
}

main();