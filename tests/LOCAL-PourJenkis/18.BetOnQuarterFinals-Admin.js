const { Builder, By, Key, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');

async function runTest18(driver) {
    // let driver = await new Builder().forBrowser('chrome').build();

    //Accéder à la page des paris des 1/4
    // const URL_BET_QUARTERFINAL = 'http://127.0.0.1:8000/lets_bet/quarterfinals';
    const URL_BET_QUARTERFINAL = `${BASE_URL}/lets_bet/quarterfinals`;
    await driver.get(URL_BET_QUARTERFINAL);
    console.log("7 - Navigation forcée vers la page de paris des 1/4 de finale");

    //Bet on Quarterfinal n°1
    await driver.wait(until.elementLocated(By.name('winnerBet_1')), 3000);
    console.log("8");
    const listPlayerOnelement = await driver.findElement(By.name('winnerBet_1'));
    console.log("9");
    const optionElement = await listPlayerOnelement.findElement(By.xpath("./option[@value='3']"));
    console.log("10");
    await optionElement.click();
    console.log("11 - L'option 'Roger FEDERER' a été sélectionnée avec succès.");
    const listSetNumberElement = await driver.findElement(By.name('numberSetsBet_1'));
    console.log("12");
    const optionSetNumberElement = await listSetNumberElement.findElement(By.xpath("./option[@value='4']"));
    console.log("13");
    await optionSetNumberElement.click();
    console.log("14 - Le nombre de sets a été sélectionné");

    //Bet on Quarterfinal n°2
    const listPlayerOnelement_Match2 = await driver.findElement(By.name('winnerBet_2'));
    console.log("15");
    const optionElementMatch2 = await listPlayerOnelement_Match2.findElement(By.xpath("./option[normalize-space(text())='Stefanos TSITSIPAS']"));
    console.log("16");
    await optionElementMatch2.click();
    console.log("17 - L'option 'Stefanos TSITSIPAS' a été sélectionnée avec succès.");
    const listSetNumberElement_Match2 = await driver.findElement(By.name('numberSetsBet_2'));
    console.log("18");
    const optionSetNumberElement_Match2 = await listSetNumberElement_Match2.findElement(By.xpath("./option[@value='5']"));
    console.log("19");
    await optionSetNumberElement_Match2.click();
    console.log("20 - Le nombre de sets a été sélectionné");

    //Bet on Quarterfinal n°3
    const listPlayerOnelement_Match3 = await driver.findElement(By.name('winnerBet_3'));
    const optionElementMatch3 = await listPlayerOnelement_Match3.findElement(By.xpath("./option[normalize-space(text())='Casper RUUD']"));
    await optionElementMatch3.click();
    console.log("21- L'option 'Casper RUUD' a été sélectionnée avec succès.");
    const listSetNumberElement_Match3 = await driver.findElement(By.name('numberSetsBet_3'));
    const optionSetNumberElement_Match3 = await listSetNumberElement_Match3.findElement(By.xpath("./option[@value='4']"));
    await optionSetNumberElement_Match3.click();
    console.log("22 - Le nombre de sets a été sélectionné");

    //Bet on Quarterfinal n°4
    const listPlayerOnelement_Match4 = await driver.findElement(By.name('winnerBet_4'));
    const optionElementMatch4 = await listPlayerOnelement_Match4.findElement(By.xpath("./option[normalize-space(text())='Felix AUGER-ALIASSIME']"));
    await optionElementMatch4.click();
    console.log("23- L'option 'Felix AUGER-ALIASSIME' a été sélectionnée avec succès.");
    const listSetNumberElement_Match4 = await driver.findElement(By.name('numberSetsBet_4'));
    const optionSetNumberElement_Match4 = await listSetNumberElement_Match4.findElement(By.xpath("./option[@value='3']"));
    await optionSetNumberElement_Match4.click();
    console.log("24 - Le nombre de sets a été sélectionné");

    //Validate quarterfinals bets
    async function elementToBeClickable(driver, locator, timeout = 3000) {
        const element = await driver.wait(until.elementLocated(locator), timeout);
        await driver.wait(until.elementIsVisible(element), timeout);
        await driver.wait(until.elementIsEnabled(element), timeout);
        // petit délai pour être sûr que rien ne le recouvre
        await driver.sleep(200);
        return element;
    }
    // console.log("25");
    // const validateBetsButton = await elementToBeClickable(driver, By.id('button-text'));
    // console.log("26");
    // await validateBetsButton.click();
    // console.log("27");

    console.log("25");
    const element = await driver.findElement(By.id('button-text'));
    console.log("26");
    await driver.executeScript("arguments[0].click();", element);
    console.log("27");

    //Verify success message
    const successBetsRegistration = await driver.wait(until.elementLocated(By.css('div.alert-success > p')), 3000);
    const successMsg_registration = await successBetsRegistration.getText();
    console.log(`28 - Success message : "${successMsg_registration}"`);
    strictEqual(successMsg_registration, 'Vos paris ont bien été enregistrés', 'Le message de succès ne correspond pas...');
    console.log("29 - Admin quarterfinal bets registered !");
}

module.exports = { runTest18 };