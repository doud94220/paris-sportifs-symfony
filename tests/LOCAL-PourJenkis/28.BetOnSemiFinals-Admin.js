const { Builder, By, Key, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');

// require('chromedriver');

async function runTest28(driver) {
    // let driver = await new Builder().forBrowser('chrome').build();

    try {

        // -------------------------------------------- Connection as ADMIN --------------------------------------------
        // await driver.get('http://127.0.0.1:8000/');
        // console.log("1");

        // const connectionButton = await driver.wait(until.elementLocated(By.css('ul > li:nth-child(3) > a')), 3000);
        // console.log("2");

        // await connectionButton.click();
        // console.log("3");

        // await driver.findElement(By.id('login_email')).sendKeys('doud75@gmail.com', Key.RETURN);
        // console.log("4");

        // await driver.findElement(By.id('login_password')).sendKeys('Doud', Key.RETURN);
        // console.log("5");

        // await driver.wait(until.elementLocated(By.css('li > a.btn-danger')), 3000);
        // console.log("6 - On est loggué en admin !");
        // -------------------------------------------------------------------------------------------------------------

        //Accéder à la page des paris des 1/2
        const URL_BET_QUARTERFINAL = 'http://127.0.0.1:8000/lets_bet/semifinals';
        await driver.get(URL_BET_QUARTERFINAL);
        console.log("7 - Navigation forcée vers la page de paris des 1/2 de finale");

        //Bet on Semifinal n°1
        await driver.wait(until.elementLocated(By.name('winnerBet_1')), 3000);
        console.log("8");
        const listPlayerOnelement = await driver.findElement(By.name('winnerBet_1'));
        console.log("9");
        const optionElement = await listPlayerOnelement.findElement(By.xpath("./option[@value='5']"));
        console.log("10");
        await optionElement.click();
        console.log("11 - L'option 'Stefanos TSITSIPAS' a été sélectionnée avec succès.");
        const listSetNumberElement = await driver.findElement(By.name('numberSetsBet_1'));
        console.log("12");
        const optionSetNumberElement = await listSetNumberElement.findElement(By.xpath("./option[@value='4']"));
        console.log("13");
        await optionSetNumberElement.click();
        console.log("14 - Le nombre de sets a été sélectionné");

        //Bet on Semifinal n°2
        const listPlayerOnelement_Match2 = await driver.findElement(By.name('winnerBet_2'));
        console.log("15");
        const optionElementMatch2 = await listPlayerOnelement_Match2.findElement(By.xpath("./option[normalize-space(text())='Hubert HURKACZ']"));
        console.log("16");
        await optionElementMatch2.click();
        console.log("17 - L'option 'Hubert HURKACZ' a été sélectionnée avec succès.");
        const listSetNumberElement_Match2 = await driver.findElement(By.name('numberSetsBet_2'));
        console.log("18");
        const optionSetNumberElement_Match2 = await listSetNumberElement_Match2.findElement(By.xpath("./option[@value='3']"));
        console.log("19");
        await optionSetNumberElement_Match2.click();
        console.log("20 - Le nombre de sets a été sélectionné");

        //Validate quarterfinals bets
        async function elementToBeClickable(driver, locator, timeout = 3000) {
            const element = await driver.wait(until.elementLocated(locator), timeout);
            await driver.wait(until.elementIsVisible(element), timeout);
            await driver.wait(until.elementIsEnabled(element), timeout);
            // petit délai pour être sûr que rien ne le recouvre
            await driver.sleep(200);
            return element;
        }
        console.log("21");
        const validateBetsButton = await elementToBeClickable(driver, By.id('button-text'));
        console.log("22");
        await validateBetsButton.click();
        console.log("23");
        const successBetsRegistration = await driver.wait(until.elementLocated(By.css('div.alert-success > p')), 3000);
        const successMsg_registration = await successBetsRegistration.getText();
        console.log(`24 - Success message : "${successMsg_registration}"`);
        strictEqual(successMsg_registration, 'Vos paris ont bien été enregistrés', 'Le message de succès ne correspond pas...');
        console.log("25 - Admin SemiFinal bets registered !");
    }
    catch (error) {
        console.log("Erreur - Catch");
        console.error('Test failed. Error details:', error);
    } finally {
        //await driver.quit();
    }
}

// runTest28();

module.exports = { runTest28 };