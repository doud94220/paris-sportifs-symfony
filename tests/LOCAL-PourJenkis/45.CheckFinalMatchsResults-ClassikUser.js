const { Builder, By, Key, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');

// require('chromedriver');

async function runTest45(driver) {
    // let driver = await new Builder().forBrowser('chrome').build();

    try {
        // -------------------------------------------- Connection as CLASSIK USER --------------------------------------------
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

        //Go to the quarter final results page
        const MATCHS_RESULT_PAGE = 'http://127.0.0.1:8000/matchs-results-show/final';
        await driver.get(MATCHS_RESULT_PAGE);
        console.log("7 - Forced navigation toward match result page");

        //Check Final Result -------------------------------------------------------------------------------------------
        const showDownMatch1Element = await driver.wait(until.elementLocated(By.css('table > tbody > tr:nth-child(1) > td:nth-child(1)')), 3000);
        const showDownMatch1 = await showDownMatch1Element.getText();
        strictEqual(showDownMatch1, 'Novak DJOKOVIC VS Casper RUUD', "The showdown is not good...");
        console.log("8");

        const winnerMatch1Element = await driver.wait(until.elementLocated(By.css('table > tbody > tr:nth-child(1) > td:nth-child(2)')), 3000);
        const winnerMatch1 = await winnerMatch1Element.getText();
        strictEqual(winnerMatch1, 'Novak DJOKOVIC', "The winner is not good...");
        console.log("9");

        const winnerPictureElementMatch1 = await driver.findElement(By.css('table > tbody > tr:nth-child(1) > td:nth-child(3) > img'));
        const winnerPictureElementPathMatch1 = await winnerPictureElementMatch1.getAttribute('src');

        if (winnerPictureElementPathMatch1.includes('/img/Djokovic.png')) {
            console.log("10 - Correct picture path winner !");
        }
        else {
            console.log("10 - Incorrect picture path winner...");
        };

        const resultScoreMatch1Element = await driver.wait(until.elementLocated(By.css('table > tbody > tr:nth-child(1) > td:nth-child(4)')), 3000);
        const resultScoreMatch1 = await resultScoreMatch1Element.getText();
        strictEqual(resultScoreMatch1, '6/4 5/7 6/4 6/7 6/2', "The result score of the final is not good...");
        console.log("11 - The final result is perfect !");
    }
    catch (error) {
        console.log("Erreur - Catch");
        console.error('Test failed. Error details:', error);
    } finally {
        //await driver.quit();
    }
}

// runTest45();

module.exports = { runTest45 };