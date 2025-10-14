const { Builder, By, Key, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');

// require('chromedriver');

async function runTest9(driver, BASE_URL) {
    //Accéder à la page des paris des 8èmes
    const URL_BET_FOURTHROUND = `${BASE_URL}/lets_bet/fourthround`;
    await driver.get(URL_BET_FOURTHROUND);
    console.log("7 - Navigation forcée vers la page de paris des 8èmes de finale");

    //Bet on fourthround n°1
    await driver.wait(until.elementLocated(By.name('winnerBet_1')), 3000);
    console.log("8");
    const listPlayerOnelement = await driver.findElement(By.name('winnerBet_1'));
    console.log("9");
    const optionElement = await listPlayerOnelement.findElement(By.xpath("./option[@value='1']"));
    console.log("10");
    await optionElement.click();
    console.log("11 - L'option 'Novak DJOKOVIC' a été sélectionnée avec succès.");
    const listSetNumberElement = await driver.findElement(By.name('numberSetsBet_1'));
    console.log("12");
    const optionSetNumberElement = await listSetNumberElement.findElement(By.xpath("./option[@value='3']"));
    console.log("13");
    await optionSetNumberElement.click();
    console.log("14 - Le nombre de sets a été  sélectionné");

    //Bet on fourthround n°2
    const listPlayerOnelement_Match2 = await driver.findElement(By.name('winnerBet_2'));
    console.log("15");
    const optionElementMatch2 = await listPlayerOnelement_Match2.findElement(By.xpath("./option[normalize-space(text())='Daniil MEDVEDEV']"));
    console.log("16");
    await optionElementMatch2.click();
    console.log("17 - L'option 'Daniil MEDVEDEV' a été sélectionnée avec succès.");
    const listSetNumberElement_Match2 = await driver.findElement(By.name('numberSetsBet_2'));
    console.log("18");
    const optionSetNumberElement_Match2 = await listSetNumberElement_Match2.findElement(By.xpath("./option[@value='4']"));
    console.log("19");
    await optionSetNumberElement_Match2.click();
    console.log("20 - Le nombre de sets a été  sélectionné");

    //Bet on fourthround n°3
    const listPlayerOnelement_Match3 = await driver.findElement(By.name('winnerBet_3'));
    const optionElementMatch3 = await listPlayerOnelement_Match3.findElement(By.xpath("./option[normalize-space(text())='Stefanos TSITSIPAS']"));
    await optionElementMatch3.click();
    console.log("23- L'option 'Stefanos TSITSIPAS' a été sélectionnée avec succès.");
    const listSetNumberElement_Match3 = await driver.findElement(By.name('numberSetsBet_3'));
    const optionSetNumberElement_Match3 = await listSetNumberElement_Match3.findElement(By.xpath("./option[@value='4']"));
    await optionSetNumberElement_Match3.click();
    console.log("24 - Le nombre de sets a été  sélectionné");

    //Bet on fourthround n°4
    const listPlayerOnelement_Match4 = await driver.findElement(By.name('winnerBet_4'));
    const optionElementMatch4 = await listPlayerOnelement_Match4.findElement(By.xpath("./option[normalize-space(text())='Andrey RUBLEV']"));
    await optionElementMatch4.click();
    console.log("25- L'option 'Andrey RUBLEV' a été sélectionnée avec succès.");
    const listSetNumberElement_Match4 = await driver.findElement(By.name('numberSetsBet_4'));
    const optionSetNumberElement_Match4 = await listSetNumberElement_Match4.findElement(By.xpath("./option[@value='3']"));
    await optionSetNumberElement_Match4.click();
    console.log("26 - Le nombre de sets a été  sélectionné");

    //Bet on fourthround n°5
    const listPlayerOnelement_Match5 = await driver.findElement(By.name('winnerBet_5'));
    const optionElementMatch5 = await listPlayerOnelement_Match5.findElement(By.xpath("./option[normalize-space(text())='Denis SHAPOVALOV']"));
    await optionElementMatch5.click();
    console.log("27- L'option 'Denis SHAPOVALOV' a été sélectionnée avec succès.");
    const listSetNumberElement_Match5 = await driver.findElement(By.name('numberSetsBet_5'));
    const optionSetNumberElement_Match5 = await listSetNumberElement_Match5.findElement(By.xpath("./option[@value='3']"));
    await optionSetNumberElement_Match5.click();
    console.log("28 - Le nombre de sets a été  sélectionné");

    //Bet on fourthround n°6
    const listPlayerOnelement_Match6 = await driver.findElement(By.name('winnerBet_6'));
    const optionElementMatch6 = await listPlayerOnelement_Match6.findElement(By.xpath("./option[normalize-space(text())='Pablo CARRENO BUSTA']"));
    await optionElementMatch6.click();
    console.log("29- L'option 'Pablo CARRENO BUSTA' a été sélectionnée avec succès.");
    const listSetNumberElement_Match6 = await driver.findElement(By.name('numberSetsBet_6'));
    const optionSetNumberElement_Match6 = await listSetNumberElement_Match6.findElement(By.xpath("./option[@value='3']"));
    await optionSetNumberElement_Match6.click();
    console.log("30 - Le nombre de sets a été  sélectionné");

    //Bet on fourthround n°7
    const listPlayerOnelement_Match7 = await driver.findElement(By.name('winnerBet_7'));
    const optionElementMatch7 = await listPlayerOnelement_Match7.findElement(By.xpath("./option[normalize-space(text())='Diego SCHWARTZMAN']"));
    await optionElementMatch7.click();
    console.log("31- L'option 'Diego SCHWARTZMAN' a été sélectionnée avec succès.");
    const listSetNumberElement_Match7 = await driver.findElement(By.name('numberSetsBet_7'));
    const optionSetNumberElement_Match7 = await listSetNumberElement_Match7.findElement(By.xpath("./option[@value='4']"));
    await optionSetNumberElement_Match7.click();
    console.log("32 - Le nombre de sets a été  sélectionné");

    //Bet on fourthround n°8
    const listPlayerOnelement_Match8 = await driver.findElement(By.name('winnerBet_8'));
    const optionElementMatch8 = await listPlayerOnelement_Match8.findElement(By.xpath("./option[normalize-space(text())='Felix AUGER-ALIASSIME']"));
    await optionElementMatch8.click();
    console.log("33- L'option 'Felix AUGER-ALIASSIME' a été sélectionnée avec succès.");
    const listSetNumberElement_Match8 = await driver.findElement(By.name('numberSetsBet_8'));
    const optionSetNumberElement_Match8 = await listSetNumberElement_Match8.findElement(By.xpath("./option[@value='4']"));
    await optionSetNumberElement_Match8.click();
    console.log("34 - Le nombre de sets a été  sélectionné");

    async function elementToBeClickable(driver, locator, timeout = 3000) {
        const element = await driver.wait(until.elementLocated(locator), timeout);
        await driver.wait(until.elementIsVisible(element), timeout);
        await driver.wait(until.elementIsEnabled(element), timeout);
        // petit délai pour être sûr que rien ne le recouvre
        await driver.sleep(200);
        return element;
    }

    console.log("35");
    const element = await driver.findElement(By.id('button-text'));
    console.log("36");
    await driver.executeScript("arguments[0].click();", element);
    console.log("37");

    //Verify success message
    const successBetsRegistration = await driver.wait(until.elementLocated(By.css('div.alert-success > p')), 3000);
    const successMsg_registration = await successBetsRegistration.getText();
    console.log(`38 - Message succes : "${successMsg_registration}"`);
    strictEqual(successMsg_registration, 'Vos paris ont bien été enregistrés', 'Le message de succès ne correspond pas...');
    console.log("39 - Admin fourth round bets registered !");
}

module.exports = { runTest9 };