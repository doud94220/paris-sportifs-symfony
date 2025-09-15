const { Builder, By, Key, until } = require('selenium-webdriver');

// require('chromedriver');

async function runTest2(driver) {
    // let driver = await new Builder().forBrowser('chrome').build();

    await driver.get('http://127.0.0.1:8000/');
    console.log("1");

    const InscriptionLink = await driver.wait(until.elementLocated(By.css('ul > li:nth-child(2) > a.nav-link')), 3000);
    console.log("2");

    await InscriptionLink.click();
    console.log("3");

    const creationButton = await driver.wait(until.elementLocated(By.css('button.btn-success')), 3000);
    //Pour Info : Failed to execute 'querySelector' on 'Document': 'button.btn-success:has-text("Création")' is not a valid selector
    console.log("4");

    await driver.findElement(By.id('user_firstName')).sendKeys('Eric', Key.RETURN);
    console.log("5");

    await driver.findElement(By.id('user_lastName')).sendKeys('DUGNOU', Key.RETURN);
    console.log("6");

    await driver.findElement(By.id('user_nickName')).sendKeys('Ricou', Key.RETURN);
    console.log("7");

    await driver.findElement(By.id('user_email')).sendKeys('eric.dujnou@gmx.fr', Key.RETURN);
    console.log("8");

    await driver.findElement(By.id('user_password')).sendKeys('Ricou', Key.RETURN);
    console.log("9");

    // ----- Pas besoin, Selenium valide le form (équivaut click bouton) quand tous les champs sont remplis
    // await creationButton.click();
    // console.log("10");

    const successRegistrationMsg = await driver.wait(until.elementLocated(By.css('div.alert-success > p')), 3000);
    console.log("Classik user is registered !");
};

module.exports = { runTest2 };

// runTest2();