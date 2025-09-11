const { Builder, By, Key, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');

// require('chromedriver');

async function runTest36(driver) {
    // let driver = await new Builder().forBrowser('chrome').build();

    try {

        // -------------------------------------------- Connect as CLASSIK USER -----------------------------------------
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
        const MATCHS_RESULT_PAGE = 'http://127.0.0.1:8000/matchs-results-show/semifinals';
        await driver.get(MATCHS_RESULT_PAGE);
        console.log("7 - Forced navigation toward matchs result page");
        // --------------------------------------- Check each matchs result element ------------------------------------

        //Check MATCH 1 ------------------------------------------------------------------------------------------------
        const showDownMatch1Element = await driver.wait(until.elementLocated(By.css('table > tbody > tr:nth-child(1) > td:nth-child(1)')), 3000);
        const showDownMatch1 = await showDownMatch1Element.getText();
        strictEqual(showDownMatch1, 'Novak DJOKOVIC VS Stefanos TSITSIPAS', "The showdown is not good...");
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
        strictEqual(resultScoreMatch1, '4/6 6/2 5/7 6/3 6/0', "The result score of the MATCH 1 is not good...");
        console.log("11");

        //Check MATCH 2 ------------------------------------------------------------------------------------------------
        const showDownMatch2Element = await driver.wait(until.elementLocated(By.css('table > tbody > tr:nth-child(2) > td:nth-child(1)')), 3000);
        const showDownMatch2 = await showDownMatch2Element.getText();
        strictEqual(showDownMatch2, 'Casper RUUD VS Hubert HURKACZ', "The showdown is not good...");
        console.log("12");

        const winnerMatch2Element = await driver.wait(until.elementLocated(By.css('table > tbody > tr:nth-child(2) > td:nth-child(2)')), 3000);
        const winnerMatch2 = await winnerMatch2Element.getText();
        strictEqual(winnerMatch2, 'Casper RUUD', "The winner is not good...");
        console.log("13");

        const winnerPictureElementMatch2 = await driver.findElement(By.css('table > tbody > tr:nth-child(2) > td:nth-child(3) > img'));
        const winnerPictureElementPathMatch2 = await winnerPictureElementMatch2.getAttribute('src');

        if (winnerPictureElementPathMatch2.includes('/img/Ruud.png')) {
            console.log("14 - Correct picture path winner !");
        }
        else {
            console.log("14 - Incorrect picture path winner...");
        };

        const resultScoreMatch2Element = await driver.wait(until.elementLocated(By.css('table > tbody > tr:nth-child(2) > td:nth-child(4)')), 3000);
        const resultScoreMatch2 = await resultScoreMatch2Element.getText();
        strictEqual(resultScoreMatch2, '6/7 7/5 6/3 6/2', "The result score of the MATCH 2 is not good...");
        console.log("15");

        console.log("16 - ALL THE MATCHS RESULT ARE FINE !!!");
    }
    catch (error) {
        console.log("Erreur - Catch");
        console.error('Test failed. Error details:', error);
    } finally {
        //await driver.quit();
    }
}

// runTest36();

module.exports = { runTest36 };