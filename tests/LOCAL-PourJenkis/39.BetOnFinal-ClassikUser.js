const { Builder, By, Key, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');

async function runTest39(driver, BASE_URL) {

    //Accéder à la page du pari de la finale
    // const URL_BET_FINAL = 'http://127.0.0.1:8000/lets_bet/final';
    const URL_BET_FINAL = `${BASE_URL}/lets_bet/final`;
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

module.exports = { runTest39 };