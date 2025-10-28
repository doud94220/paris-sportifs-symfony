const { Builder, By, Key, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');

async function runTest29(driver, BASE_URL) {

    //Attendre et récuperer les msgs Flash (msgs de confirmation en vert)
    async function waitFlashSuccess(driver, {
        // locator = By.css("div.alert-success > p, .alert, .alert-success, .alert-info, [role='alert'], .toast, .toast-body, .notification, .flash, .flash-message"),
        locator = By.css("div.alert-success > p"),
        // expectedText = 'The match result has been registered !',
        expectedText = null,
        timeout = 12000,
        pollMs = 200
    } = {}) {
        const deadline = Date.now() + timeout;
        let lastErr;

        while (Date.now() < deadline) {
            try {
                // (re)localise à chaque boucle -> évite les références périmées
                const el = await driver.findElement(locator);

                // Visible ?
                if (await el.isDisplayed()) {
                    const raw = await el.getText();

                    // ✅ Essaie de prendre la valeur de la variable raw
                    // ❌ Si raw est null, undefined, ou une valeur "falsy"(comme '' ou 0), alors à la place, on utilise la chaîne vide ''
                    // ✂️ Puis on appelle.trim() sur le résultat — pour enlever les espaces au début et à la fin
                    const text = (raw || '').trim();

                    if (!expectedText) {
                        // Mode souple : on accepte tout texte non-vide
                        if (text.length > 0) return text;
                    } else {
                        // Mode strict : texte exact attendu
                        if (text === expectedText) return text;
                    }
                }
            } catch (e) {
                // On ignore NoSuchElement et StaleElement et on re-tente
                if (e.name !== 'NoSuchElementError' && e.name !== 'StaleElementReferenceError') {
                    throw e;
                }
                lastErr = e;
            }
            await driver.sleep(pollMs);
        }

        // Rien trouvé dans le temps imparti
        await debugAlerts(driver);
        throw lastErr ?? new Error('Timeout waiting for success flash');
    }

    //Accéder à la page des paris des 1/2
    // const URL_BET_QUARTERFINAL = 'http://127.0.0.1:8000/lets_bet/semifinals';
    const URL_BET_QUARTERFINAL = `${BASE_URL}/lets_bet/semifinals`;
    await driver.get(URL_BET_QUARTERFINAL);
    console.log("7 - Navigation forcée vers la page de paris des 1/2 de finale");

    //Bet on Semifinal n°1
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
    const optionSetNumberElement_Match2 = await listSetNumberElement_Match2.findElement(By.xpath("./option[@value='5']"));
    console.log("19");
    await optionSetNumberElement_Match2.click();
    console.log("20 - Le nombre de sets a été sélectionné");

    //Validate Semifinal bets
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

    // const successBetsRegistration = await driver.wait(until.elementLocated(By.css('div.alert-success > p')), 3000);
    // const successMsg_registration = await successBetsRegistration.getText();
    const msgSuccess = await waitFlashSuccess(driver);

    console.log(`24 - Success message : "${msgSuccess}"`);
    strictEqual(msgSuccess, 'Vos paris ont bien été enregistrés', 'Le message de succès ne correspond pas...');
    console.log("25 - Classik user Semifinal bets registered !");
}

module.exports = { runTest29 };