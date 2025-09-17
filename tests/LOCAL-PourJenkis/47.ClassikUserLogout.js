const { Builder, By, Key, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');

// require('chromedriver');

async function runTest47(driver) {
    // let driver = await new Builder().forBrowser('chrome').build();

    // -------------------------------------------- Connection as CLASSIK USER -------------------------------------
    // await driver.get('http://127.0.0.1:8000/');
    // console.log("1");

    // const connectionButton = await driver.wait(until.elementLocated(By.css('nav > ul > li:nth-child(3) > a')), 3000);
    // console.log("2");

    // await connectionButton.click();
    // console.log("3");

    // await driver.findElement(By.id('login_email')).sendKeys('eric.dujnou@gmx.fr', Key.RETURN);
    // console.log("4");

    // await driver.findElement(By.id('login_password')).sendKeys('Ricou', Key.RETURN);
    // console.log("5");

    // await driver.wait(until.elementLocated(By.css('nav > ul > li:nth-child(6) > a.btn')), 3000);
    // console.log("6 - On est loggué en CLASSIK USER !");
    // -------------------------------------------------------------------------------------------------------------

    // ----------------------------------------------- DISconnect as CLASSIK USER ----------------------------------
    await driver.get('http://127.0.0.1:8000/');
    console.log("7");

    //Verify that admin is loggued
    // const disconnectionButton = await driver.wait(until.elementLocated(By.css('nav > ul > li:nth-child(6) > a.btn')), 3000);
    await driver.wait(until.elementLocated(By.css('nav > ul > li:nth-child(6) > a.btn')), 5000); // Waits up to 5 seconds
    console.log("8");

    const logoutButton = await driver.findElement(By.css('nav > ul > li:nth-child(6) > a.btn'));
    console.log("9");

    // await disconnectionButton.click();
    await logoutButton.click();
    console.log("10 - Logout button clicked");

    // Verify that log button is displayed
    await driver.wait(until.elementLocated(By.css('nav > ul > li:nth-child(3) > a')), 5000);
    console.log("11 - On n'est PLUS loggué en CLASSIK USER !");
    // -------------------------------------------------------------------------------------------------------------
};

module.exports = { runTest47 };

// runTest47();