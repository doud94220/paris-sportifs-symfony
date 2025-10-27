const { Builder, By, Key, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');

async function runTest23(driver, BASE_URL) {

    //Go to bettors ranking page
    // const RANKING_PAGE = 'http://127.0.0.1:8000/ranking';
    const RANKING_PAGE = `${BASE_URL}/ranking`;
    await driver.get(RANKING_PAGE);
    console.log("7 - Forced navigation toward ranking page");

    //Check bettors ranking and points
    const rankingOneSurnameElement = await driver.wait(until.elementLocated(By.css('div#information-container table.table tr td:nth-child(2)')), 3000);
    const rankingOneSurname = await rankingOneSurnameElement.getText();
    strictEqual(rankingOneSurname, 'Doud', "The surname isn't the good one...");
    console.log("8");

    const rankingOnePointsNumberElement = await driver.wait(until.elementLocated(By.css('div#information-container table.table tr td:nth-child(3)')), 3000);
    const rankingOnePointsNumber = await rankingOnePointsNumberElement.getText();
    strictEqual(rankingOnePointsNumber, '26', "The number of points is  no good...");
    console.log("9");

    const rankingTwoSurnameElement = await driver.wait(until.elementLocated(By.css('div#information-container table.table tr:nth-child(2) td:nth-child(2)')), 3000);
    const rankingTwoSurname = await rankingTwoSurnameElement.getText();
    strictEqual(rankingTwoSurname, 'Ricou', "The surname isn't the good one...");
    console.log("10");

    const rankingTwoPointsNumberElement = await driver.wait(until.elementLocated(By.css('div#information-container table.table tr:nth-child(2) td:nth-child(3)')), 3000);
    const rankingTwoPointsNumber = await rankingTwoPointsNumberElement.getText();
    strictEqual(rankingTwoPointsNumber, '23', "The number of points is  no good...");
    console.log("11");

    console.log("The bettors ranking and points is fine !");

}

module.exports = { runTest23 };