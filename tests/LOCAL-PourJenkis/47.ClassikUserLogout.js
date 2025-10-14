const { Builder, By, Key, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');

// require('chromedriver');

async function runTest47(driver, BASE_URL) {
    // ----------------------------------------------- DISconnect as CLASSIK USER ----------------------------------
    await driver.get(`${BASE_URL}`);
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