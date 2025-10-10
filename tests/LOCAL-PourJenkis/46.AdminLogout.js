const { Builder, By, Key, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');

// require('chromedriver');

async function runTest46(driver, BASE_URL) {
    // let driver = await new Builder().forBrowser('chrome').build();

    // ----------------------------------------------- DISconnect as ADMIN -----------------------------------------
    await driver.get(`${BASE_URL}`);
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

module.exports = { runTest46 };