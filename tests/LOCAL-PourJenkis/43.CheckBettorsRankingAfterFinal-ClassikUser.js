const { Builder, By, Key, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');

// require('chromedriver');

async function runTest43(driver) {
    // let driver = await new Builder().forBrowser('chrome').build();

    try {
        // // -------------------------------------------- Connection as CLASSIK USER --------------------------------------------
        // await driver.get('http://127.0.0.1:8000/');
        // console.log("1");

        // const connectionButton = await driver.wait(until.elementLocated(By.css('ul > li:nth-child(3) > a')), 3000);
        // console.log("2");

        // await connectionButton.click();
        // console.log("3");

        // await driver.findElement(By.id('login_email')).sendKeys('eric.dujnou@gmx.fr', Key.RETURN);
        // console.log("4");

        // await driver.findElement(By.id('login_password')).sendKeys('Ricou', Key.RETURN);
        // console.log("5");

        // const successRegistrationMsg = await driver.wait(until.elementLocated(By.css('li > a.btn-danger')), 3000);
        // console.log("6 - On est loggué en classik user !");
        // -------------------------------------------------------------------------------------------------------------

        //Go to bettors ranking page
        const RANKING_PAGE = 'http://127.0.0.1:8000/ranking';
        await driver.get(RANKING_PAGE);
        console.log("7 - Forced navigation toward ranking page");

        //Check bettors ranking and points
        const rankingOneSurnameElement = await driver.wait(until.elementLocated(By.css('div#information-container table.table tr td:nth-child(2)')), 3000);
        const rankingOneSurname = await rankingOneSurnameElement.getText();
        strictEqual(rankingOneSurname, 'Doud', "The surname isn't the good one...");
        console.log("8");

        const rankingOnePointsNumberElement = await driver.wait(until.elementLocated(By.css('div#information-container table.table tr td:nth-child(3)')), 3000);
        const rankingOnePointsNumber = await rankingOnePointsNumberElement.getText();
        strictEqual(rankingOnePointsNumber, '29', "The number of points is  no good...");
        console.log("9");

        const rankingTwoSurnameElement = await driver.wait(until.elementLocated(By.css('div#information-container table.table tr:nth-child(2) td:nth-child(2)')), 3000);
        const rankingTwoSurname = await rankingTwoSurnameElement.getText();
        strictEqual(rankingTwoSurname, 'Ricou', "The surname isn't the good one...");
        console.log("10");

        const rankingTwoPointsNumberElement = await driver.wait(until.elementLocated(By.css('div#information-container table.table tr:nth-child(2) td:nth-child(3)')), 3000);
        const rankingTwoPointsNumber = await rankingTwoPointsNumberElement.getText();
        strictEqual(rankingTwoPointsNumber, '27', "The number of points is  no good...");
        console.log("11");

        console.log("The bettors ranking and points is fine !");
    }
    catch (error) {
        console.log("Erreur - Catch");
        console.error('Test failed. Error details:', error);
    } finally {
        //await driver.quit();
    }
}

// runTest43();

module.exports = { runTest43 };