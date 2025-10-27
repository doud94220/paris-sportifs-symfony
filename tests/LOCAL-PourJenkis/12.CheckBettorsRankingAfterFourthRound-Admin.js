const { Builder, By, Key, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');

// require('chromedriver');

async function runTest12(driver, BASE_URL) {
    // let driver = await new Builder().forBrowser('chrome').build();

    //Go to bettors ranking page
    const RANKING_PAGE = `${BASE_URL}/ranking`;
    await driver.get(RANKING_PAGE);
    console.log("1 - Forced navigation toward ranking page");

    //Check bettors ranking and points
    const rankingOneSurnameElement = await driver.wait(until.elementLocated(By.css('div#information-container table.table tr td:nth-child(2)')), 3000);
    const rankingOneSurname = await rankingOneSurnameElement.getText();
    strictEqual(rankingOneSurname, 'Doud', "The surname isn't the good one...");
    console.log("2");

    const rankingOnePointsNumberElement = await driver.wait(until.elementLocated(By.css('div#information-container table.table tr td:nth-child(3)')), 3000);
    const rankingOnePointsNumber = await rankingOnePointsNumberElement.getText();
    strictEqual(rankingOnePointsNumber, '20', "The number of points is  no good...");
    console.log("3");

    const rankingTwoSurnameElement = await driver.wait(until.elementLocated(By.css('div#information-container table.table tr:nth-child(2) td:nth-child(2)')), 3000);
    const rankingTwoSurname = await rankingTwoSurnameElement.getText();
    strictEqual(rankingTwoSurname, 'Ricou', "The surname isn't the good one...");
    console.log("4");

    const rankingTwoPointsNumberElement = await driver.wait(until.elementLocated(By.css('div#information-container table.table tr:nth-child(2) td:nth-child(3)')), 3000);
    const rankingTwoPointsNumber = await rankingTwoPointsNumberElement.getText();
    strictEqual(rankingTwoPointsNumber, '11', "The number of points is  no good...");
    console.log("5");

    console.log("The bettors ranking and points is fine !");
}

module.exports = { runTest12 };
