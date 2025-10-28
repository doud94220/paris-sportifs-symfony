const { Builder, By, Key, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');

async function runTest20(driver, BASE_URL) {

    // Pour voir le CSS en prod
    async function debugAlerts(driver) {
        const candidates = await driver.findElements(
            // By.css("div.alert-success > p, .alert, .alert-success, .alert-info, [role='alert'], .toast, .toast-body, .notification, .flash, .flash-message")
            By.css("div.alert-success > p")
        );
        console.log(`[debugAlerts] found ${candidates.length} candidates`);
        for (let i = 0; i < candidates.length; i++) {
            try {
                const el = candidates[i];
                const tag = await el.getTagName();
                const cls = await el.getAttribute('class');
                const role = await el.getAttribute('role');
                const text = (await el.getText() || '').replace(/\s+/g, ' ').trim();
                console.log(`[debugAlerts] #${i} <${tag} class="${cls}" role="${role}"> -> "${text}"`);
            } catch { }
        }
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

    //Go to quarterfinal results admin page
    // const URL_BET_QUARTERFINAL = 'http://127.0.0.1:8000/admin/quarterfinals-results/1';
    const URL_BET_QUARTERFINAL = `${BASE_URL}/admin/quarterfinals-results/1`;
    await driver.get(URL_BET_QUARTERFINAL);
    console.log("7 - Forced navigation to quarter final results admin page");

    //Set results MATCH 1
    await driver.wait(until.elementLocated(By.id('results_winner')), 3000);
    console.log("8");
    const listWinnerElement = await driver.findElement(By.id('results_winner'));
    console.log("9");
    const optionWinnerElement = await listWinnerElement.findElement(By.xpath("./option[@value='1']"));
    console.log("10");
    await optionWinnerElement.click();

    await driver.wait(until.elementLocated(By.id('results_setsNumber')), 3000);
    console.log("11");
    const setsNumberElement = await driver.findElement(By.id('results_setsNumber'));
    console.log("12");
    const optionSetsNumberElement = await setsNumberElement.findElement(By.xpath("./option[@value='3']"));
    console.log("13");
    await optionSetsNumberElement.click();

    await driver.wait(until.elementLocated(By.id('results_result')), 3000);
    console.log("14");
    const scoreResultElement = await driver.findElement(By.id('results_result'));
    console.log("15");
    await scoreResultElement.sendKeys('6/4 6/3 6/2');

    async function elementToBeClickable(driver, locator, timeout = 10000) {
        const element = await driver.wait(until.elementLocated(locator), timeout);
        await driver.wait(until.elementIsVisible(element), timeout);
        await driver.wait(until.elementIsEnabled(element), timeout);
        // petit délai pour être sûr que rien ne le recouvre
        await driver.sleep(200);
        return element;
    }
    console.log("16");

    const validateResultsScoreButton = await elementToBeClickable(driver, By.css('.btn-success'));
    console.log("17");
    await validateResultsScoreButton.click();
    console.log("18");

    // const successResultsScoreRegistration = await driver.wait(until.elementLocated(By.css('div.alert-success > p')), 3000);
    // const successMsgResultsScore_registration = await successResultsScoreRegistration.getText();
    const msg1 = await waitFlashSuccess(driver);

    console.log(`19 - Message succes : "${msg1}"`);
    strictEqual(msg1, 'The match result has been registered !', 'Le message de succès ne correspond pas...');
    console.log("20 - Admin quarterfinal results match 1 registered !");

    //Set results MATCH 2
    await driver.wait(until.elementLocated(By.id('results_winner')), 3000);
    const listWinnerElement_match2 = await driver.findElement(By.id('results_winner'));;
    const optionWinnerElement_match2 = await listWinnerElement_match2.findElement(By.xpath("./option[normalize-space(text())='Stefanos TSITSIPAS']"));
    await optionWinnerElement_match2.click();

    await driver.wait(until.elementLocated(By.id('results_setsNumber')), 3000);
    const setsNumberElement_match2 = await driver.findElement(By.id('results_setsNumber'));
    const optionSetsNumberElement_match2 = await setsNumberElement_match2.findElement(By.xpath("./option[@value='4']"));
    await optionSetsNumberElement_match2.click();

    await driver.wait(until.elementLocated(By.id('results_result')), 3000);
    const scoreResultElement_match2 = await driver.findElement(By.id('results_result'));
    await scoreResultElement_match2.sendKeys('6/7 7/5 6/1 6/4');

    await driver.wait(until.elementLocated(By.css('.btn-success')), 3000);
    const validateResultsScoreButton_match2 = await driver.findElement(By.css('.btn-success'));
    await validateResultsScoreButton_match2.click();

    // const successResultsScoreRegistration_match2 = await driver.wait(until.elementLocated(By.css('div.alert-success > p')), 3000);
    // const successMsgResultsScore_registration_match2 = await successResultsScoreRegistration_match2.getText();
    const msg2 = await waitFlashSuccess(driver);

    console.log(`21 - Message succes : "${msg2}"`);
    strictEqual(msg2, 'The match result has been registered !', 'Le message de succès ne correspond pas...');
    console.log("22 - Admin quarterfinal results match 2 registered !");

    //Set results MATCH 3
    await driver.wait(until.elementLocated(By.id('results_winner')), 3000);
    const listWinnerElement_match3 = await driver.findElement(By.id('results_winner'));;
    const optionWinnerElement_match3 = await listWinnerElement_match3.findElement(By.xpath("./option[normalize-space(text())='Casper RUUD']"));
    await optionWinnerElement_match3.click();

    await driver.wait(until.elementLocated(By.id('results_setsNumber')), 3000);
    const setsNumberElement_match3 = await driver.findElement(By.id('results_setsNumber'));
    const optionSetsNumberElement_match3 = await setsNumberElement_match3.findElement(By.xpath("./option[@value='5']"));
    await optionSetsNumberElement_match3.click();

    await driver.wait(until.elementLocated(By.id('results_result')), 3000);
    const scoreResultElement_match3 = await driver.findElement(By.id('results_result'));
    await scoreResultElement_match3.sendKeys('1/6 4/6 7/5 6/3 6/1');

    await driver.wait(until.elementLocated(By.css('.btn-success')), 3000);
    const validateResultsScoreButton_match3 = await driver.findElement(By.css('.btn-success'));
    await validateResultsScoreButton_match3.click();

    // const successResultsScoreRegistration_match3 = await driver.wait(until.elementLocated(By.css('div.alert-success > p')), 3000);
    // const successMsgResultsScore_registration_match3 = await successResultsScoreRegistration_match3.getText();
    const msg3 = await waitFlashSuccess(driver);

    console.log(`23 - Message succes : "${msg3}"`);
    strictEqual(msg3, 'The match result has been registered !', 'Le message de succès ne correspond pas...');
    console.log("24 - Admin quarterfinal results match 3 registered !");

    //Set results MATCH 4
    await driver.wait(until.elementLocated(By.id('results_winner')), 3000);
    const listWinnerElement_match4 = await driver.findElement(By.id('results_winner'));;
    const optionWinnerElement_match4 = await listWinnerElement_match4.findElement(By.xpath("./option[normalize-space(text())='Hubert HURKACZ']"));
    await optionWinnerElement_match4.click();

    await driver.wait(until.elementLocated(By.id('results_setsNumber')), 3000);
    const setsNumberElement_match4 = await driver.findElement(By.id('results_setsNumber'));
    const optionSetsNumberElement_match4 = await setsNumberElement_match4.findElement(By.xpath("./option[@value='3']"));
    await optionSetsNumberElement_match4.click();

    await driver.wait(until.elementLocated(By.id('results_result')), 3000);
    const scoreResultElement_match4 = await driver.findElement(By.id('results_result'));
    await scoreResultElement_match4.sendKeys('6/4 6/2 7/6');

    await driver.wait(until.elementLocated(By.css('.btn-success')), 3000);
    const validateResultsScoreButton_match4 = await driver.findElement(By.css('.btn-success'));
    await validateResultsScoreButton_match4.click();

    // const successResultsScoreRegistration_match4 = await driver.wait(until.elementLocated(By.css('div.alert-success > p')), 7000);
    // const successMsgResultsScore_registration_match4 = await successResultsScoreRegistration_match4.getText();
    const msg4 = await waitFlashSuccess(driver);

    console.log(`25 - Message succes : "${msg4}"`);
    strictEqual(msg4, 'The match result has been registered !', 'Le message de succès ne correspond pas...');
    console.log("26 - Admin quarterfinal results match 4 registered !");

    //Validate quarterfinal matchs results
    // const successResultsScoreRegistration_allMatches = await driver.wait(until.elementLocated(By.css('div.alert-success p:nth-child(2)')), 7000);
    // const successMsgResultsScore_registration_allMatches = await successResultsScoreRegistration_allMatches.getText();
    const msgSuccessAllQuarterFinalsResultsInserted = await waitFlashSuccess(driver, { locator: By.css("div.alert-success > p:nth-child(2)") });

    console.log(`27 - Message succes : "${msgSuccessAllQuarterFinalsResultsInserted}"`);
    strictEqual(msgSuccessAllQuarterFinalsResultsInserted, 'All the quarterfinals results have been registered !', 'Le message de succès ne correspond pas...');
    console.log("28 - Admin quarterfinal results ALL MATCHES registered !");
}

module.exports = { runTest20 };
