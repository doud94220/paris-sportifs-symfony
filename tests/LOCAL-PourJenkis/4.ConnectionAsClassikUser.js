const { Builder, By, Key, until } = require('selenium-webdriver');

async function runTest4(driver, BASE_URL) {

    await driver.get(`${BASE_URL}`);
    console.log("1");

    const connectionButton = await driver.wait(until.elementLocated(By.css('ul > li:nth-child(3) > a')), 3000);
    console.log("2");

    await connectionButton.click();
    console.log("3");

    await driver.findElement(By.id('login_email')).sendKeys('eric.dujnou@gmx.fr', Key.RETURN);
    console.log("4");

    await driver.findElement(By.id('login_password')).sendKeys('Ricou', Key.RETURN);
    console.log("5");

    const successRegistrationMsg = await driver.wait(until.elementLocated(By.css('li > a.btn-danger')), 3000);
    console.log("6 - On est loggué en classik user !");
};

module.exports = { runTest4 };
