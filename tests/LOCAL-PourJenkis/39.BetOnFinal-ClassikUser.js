const { Builder, By, Key, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');

// require('chromedriver');

async function runTest39(driver) {
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

        //Accéder à la page du pari de la finale
        const URL_BET_FINAL = 'http://127.0.0.1:8000/lets_bet/final';
        await driver.get(URL_BET_FINAL);
        console.log("7 - Navigation forcée vers la page de pari de la finale");

        //Bet on final
        await driver.wait(until.elementLocated(By.name('winnerBet_1')), 3000);
        console.log("8");
        const listPlayerOnelement = await driver.findElement(By.name('winnerBet_1'));
        console.log("9");
        const optionElement = await listPlayerOnelement.findElement(By.xpath("./option[@value='11']"));
        console.log("10");
        await optionElement.click();
        console.log("11 - L'option 'Casper RUUD' a été sélectionnée avec succès.");
        const listSetNumberElement = await driver.findElement(By.name('numberSetsBet_1'));
        console.log("12");
        const optionSetNumberElement = await listSetNumberElement.findElement(By.xpath("./option[@value='5']"));
        console.log("13");
        await optionSetNumberElement.click();
        console.log("14 - Le nombre de sets a été sélectionné");

        //Validate final bet
        async function elementToBeClickable(driver, locator, timeout = 3000) {
            const element = await driver.wait(until.elementLocated(locator), timeout);
            await driver.wait(until.elementIsVisible(element), timeout);
            await driver.wait(until.elementIsEnabled(element), timeout);
            // petit délai pour être sûr que rien ne le recouvre
            await driver.sleep(200);
            return element;
        }
        console.log("15");
        const validateBetsButton = await elementToBeClickable(driver, By.id('button-text'));
        console.log("16");
        await validateBetsButton.click();
        console.log("17");

        //Verify success msg
        const successBetsRegistration = await driver.wait(until.elementLocated(By.css('div.alert-success > p')), 3000);
        const successMsg_registration = await successBetsRegistration.getText();
        console.log(`18 - Success message : "${successMsg_registration}"`);
        strictEqual(successMsg_registration, 'Vos paris ont bien été enregistrés', 'Le message de succès ne correspond pas...');
        console.log("19 - Classik User Final Bet Registered !");
    }
    catch (error) {
        console.log("Erreur - Catch");
        console.error('Test failed. Error details:', error);
    } finally {
        //await driver.quit();
    }
}

// runTest39();

module.exports = { runTest39 };