const { Builder, By, Key, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');

// require('chromedriver');

async function runTest46(driver) {
    // let driver = await new Builder().forBrowser('chrome').build();

    try {
        // -------------------------------------------- Connect as ADMIN ----------------------------------------------
        // await driver.get('http://127.0.0.1:8000/');
        // console.log("1");

        // const connectionButton = await driver.wait(until.elementLocated(By.css('nav > ul > li:nth-child(3) > a')), 3000);
        // console.log("2");

        // await connectionButton.click();
        // console.log("3");

        // await driver.findElement(By.id('login_email')).sendKeys('doud75@gmail.com', Key.RETURN);
        // console.log("4");

        // await driver.findElement(By.id('login_password')).sendKeys('Doud', Key.RETURN);
        // console.log("5");

        // await driver.wait(until.elementLocated(By.css('nav > ul > li:nth-child(7) > a.btn')), 3000);
        // console.log("6 - On est loggué en admin !");
        // -------------------------------------------------------------------------------------------------------------

        // ----------------------------------------------- DISconnect as ADMIN -----------------------------------------
        await driver.get('http://127.0.0.1:8000/');
        console.log("1");

        //Verify that admin is loggued
        const disconnectionButton = await driver.wait(until.elementLocated(By.css('nav > ul > li:nth-child(7) > a.btn')), 3000);
        console.log("2");

        await disconnectionButton.click();
        console.log("3 - Logout button clicked");

        // Verify that log button is displayed
        await driver.wait(until.elementLocated(By.css('nav > ul > li:nth-child(3) > a')), 3000);
        console.log("4 - On n'est plus loggué en admin !");
        // -------------------------------------------------------------------------------------------------------------
    }
    catch (error) {
        console.log("Erreur - Catch - Admin log out has failed");
        console.error('Test failed. Error details:', error);
    } finally {
        //await driver.quit();
    }
}

module.exports = { runTest46 };

// runTest46();