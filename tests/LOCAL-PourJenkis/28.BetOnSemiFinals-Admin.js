const { Builder, By, Key, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');

async function runTest28(driver, BASE_URL) {

    async function scrollIntoViewCentered(driver, el) {
        await driver.executeScript(
            "arguments[0].scrollIntoView({block:'center', inline:'center'});", el
        );
        // petite pause pour laisser finir un éventuel sticky header/animation
        await driver.sleep(150);
    }

    async function isCovered(driver, el) {
        // vérifie si l’élément est le top-most au centre de sa bbox
        const rect = await el.getRect();
        const centerX = Math.floor(rect.x + rect.width / 2);
        const centerY = Math.floor(rect.y + rect.height / 2);
        return await driver.executeScript(function (x, y, el) {
            const e = document.elementFromPoint(x, y);
            return e && e !== el && !el.contains(e);
        }, centerX, centerY, el);
    }

    //Validate Semifinal bets
    async function elementToBeClickable(driver, locator, timeout = 10000) {
        const el = await driver.wait(until.elementLocated(locator), timeout);
        await driver.wait(until.elementIsVisible(el), timeout);
        await driver.wait(until.elementIsEnabled(el), timeout);
        await scrollIntoViewCentered(driver, el);
        return el;
    }

    //Essaie de cliquer proprement, avec retries et fallback JS si intercepté.
    async function clickSafely(driver, locator, {
        retries = 3,
        retryDelayMs = 250,
        waitAfterMs = 100
    } = {}) {
        let lastErr;
        for (let i = 0; i < retries; i++) {
            try {
                const el = await elementToBeClickable(driver, locator, 10000);
                await scrollIntoViewCentered(driver, el);

                // si recouvert, on patiente un peu et on recheck
                if (await isCovered(driver, el)) {
                    await driver.sleep(retryDelayMs);
                    if (await isCovered(driver, el)) throw new Error('Element covered');
                }

                // tentative de clic natif
                await el.click();
                await driver.sleep(waitAfterMs);
                return;
            } catch (e) {
                lastErr = e;
                // fallback: JS click si c’est juste un intercept
                if (e.name === 'ElementClickInterceptedError' || /covered/i.test(String(e))) {
                    try {
                        const el = await driver.findElement(locator);
                        await scrollIntoViewCentered(driver, el);
                        await driver.executeScript("arguments[0].click();", el);
                        await driver.sleep(waitAfterMs);
                        return;
                    } catch (e2) {
                        lastErr = e2;
                    }
                }
                await driver.sleep(retryDelayMs);
            }
        }
        throw lastErr;
    }

    async function getClickableButtonFromLabel(driver, labelLocator) {
        const labelEl = await driver.findElement(labelLocator);
        const tag = await labelEl.getTagName();
        if (tag.toLowerCase() === 'button') return labelEl;
        // remonter au bouton parent si c’est un span/div
        return await labelEl.findElement(By.xpath('ancestor::button[1]'));
    }

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
    async function elementToBeClickable(driver, locator, timeout = 7000) {
        const element = await driver.wait(until.elementLocated(locator), timeout);
        await driver.wait(until.elementIsVisible(element), timeout);
        await driver.wait(until.elementIsEnabled(element), timeout);
        // petit délai pour être sûr que rien ne le recouvre
        await driver.sleep(200);
        return element;
    }
    console.log("21");
    const submitBtn = await getClickableButtonFromLabel(driver, By.id('button-text'));
    console.log("22");
    await clickSafely(driver, By.xpath("//button[descendant-or-self::*[@id='button-text']]"));
    console.log("23");

    // const successBetsRegistration = await driver.wait(until.elementLocated(By.css('div.alert-success > p')), 3000);
    // const successMsg_registration = await successBetsRegistration.getText();
    const msgSuccess = await waitFlashSuccess(driver);

    console.log(`24 - Success message : "${msgSuccess}"`);
    strictEqual(msgSuccess, 'Vos paris ont bien été enregistrés', 'Le message de succès ne correspond pas...');
    console.log("25 - Admin SemiFinal bets registered !");
}

module.exports = { runTest28 };