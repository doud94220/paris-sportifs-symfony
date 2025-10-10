const { Builder, By, Key, until } = require('selenium-webdriver');

// require('chromedriver');

async function runTest1(driver, BASE_URL) {
    // let driver = await new Builder().forBrowser('chrome').build();

    await driver.get(`${BASE_URL}`);
    console.log("0");

    console.log("1 - L'image de fond a été chargée avec succès !");
    //-------------------------------------------------------------------------------------------------

    const InscriptionLink = await driver.wait(until.elementLocated(By.css('ul > li:nth-child(2) > a.nav-link')), 3000);
    console.log("2");

    await InscriptionLink.click();
    console.log("3");

    const creationButton = await driver.wait(until.elementLocated(By.css('button.btn-success')), 3000);
    //Pour Info : Failed to execute 'querySelector' on 'Document': 'button.btn-success:has-text("Création")' is not a valid selector
    console.log("4");

    await driver.findElement(By.id('user_firstName')).sendKeys('Edouard', Key.RETURN);
    console.log("5");

    await driver.findElement(By.id('user_lastName')).sendKeys('ANTHONY', Key.RETURN);
    console.log("6");

    await driver.findElement(By.id('user_nickName')).sendKeys('Doud', Key.RETURN);
    console.log("7");

    await driver.findElement(By.id('user_email')).sendKeys('doud75@gmail.com', Key.RETURN);
    console.log("8");

    await driver.findElement(By.id('user_password')).sendKeys('Doud2', Key.RETURN);
    console.log("9");

    // ----- Pas besoin, Selenium valide le form (équivaut click bouton) quand tous les champs sont remplis
    // await creationButton.click();
    // console.log("10");

    const successRegistrationMsg = await driver.wait(until.elementLocated(By.css('div.alert-success > p')), 3000);
    console.log("Admin account creation !");
}

module.exports = { runTest1 };

// runTest1();