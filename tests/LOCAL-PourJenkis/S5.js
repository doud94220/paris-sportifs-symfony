const { Builder, By, Key, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');

const chrome = require('selenium-webdriver/chrome')

const { runTest3 } = require('./3.ConnectionAsAdmin.js');
console.log("A");
const { runTest10 } = require('./10.InsertFourthRoundMatchsResults-Admin.js');
console.log("B");
const { runTest11 } = require('./11.GiveFourthRoundPoints-Admin.js');
console.log("C");
const { runTest12 } = require('./12.CheckBettorsRankingAfterFourthRound-Admin.js');
console.log("D");
const { runTest14 } = require('./14.CheckFourthRoundMatchsResults-Admin.js');
console.log("E");
const { runTest46 } = require('./46.AdminLogout.js');
console.log("F");
const { runTest4 } = require('./4.ConnectionAsClassikUser.js');
console.log("G");
const { runTest13 } = require('./13.CheckBettorsRankingAfterFourthRound-ClassikUser.js');
console.log("H");
const { runTest15 } = require('./15.CheckFourthRoundMatchsResults-ClassikUser.js');
console.log("I");
const { runTest47 } = require('./47.ClassikUserLogout.js');
console.log("J");

async function main() {
    let driver = await new Builder().forBrowser('chrome').build();
    console.log("K");

    try {
        await runTest3(driver);
        console.log("L");
        await runTest10(driver);
        console.log("M");
        await runTest11(driver);
        console.log("N");
        await runTest12(driver);
        console.log("O");
        await runTest14(driver);
        console.log("P");
        await runTest46(driver);
        console.log("Q");
        await runTest4(driver);
        console.log("R");
        await runTest13(driver);
        console.log("S");
        await runTest15(driver);
        console.log("T");
        await runTest47(driver);
        console.log("U");
    } catch (error) {
        console.log("Erreur - Catch - S5 has a problem...");
        console.error('Test failed. Error details:', error);
    } finally {
        //await driver.quit();
    }
}

main();