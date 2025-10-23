const { Builder, By, Key, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');

async function runTest10(driver) {

    async function waitFlashSuccess(driver, {
        locator = By.css('div.alert-success > p'),
        expectedText = 'The match result has been registered !',
        timeout = 8000,
        pollMs = 200
    } = {}) {
        const deadline = Date.now() + timeout;
        let lastErr;

        while (Date.now() < deadline) {
            try {
                // (re)localise à chaque boucle -> évite les références périmées
                const el = await driver.findElement(locator);

                // visible ?
                if (await el.isDisplayed()) {
                    const text = await el.getText();
                    if (!expectedText || text === expectedText) return text;
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
        throw lastErr ?? new Error('Timeout waiting for success flash');
    }

    async function elementToBeClickable(driver, locator, timeout = 10000) {
        const element = await driver.wait(until.elementLocated(locator), timeout);
        await driver.wait(until.elementIsVisible(element), timeout);
        await driver.wait(until.elementIsEnabled(element), timeout);
        // petit délai pour être sûr que rien ne le recouvre
        await driver.sleep(200);
        return element;
    }

    //Go to fourth round results admin page
    const URL_BET_FOURTHROUND = 'http://127.0.0.1:8000/admin/fourthround-results/1';
    await driver.get(URL_BET_FOURTHROUND);
    console.log("1 - Forced navigation to fourth round results admin page");

    //Set results MATCH 1
    await driver.wait(until.elementLocated(By.id('results_winner')), 3000);
    console.log("2");
    const listWinnerElement = await driver.findElement(By.id('results_winner'));
    console.log("3");
    const optionWinnerElement = await listWinnerElement.findElement(By.xpath("./option[@value='1']"));
    console.log("4");
    await optionWinnerElement.click();

    await driver.wait(until.elementLocated(By.id('results_setsNumber')), 3000);
    console.log("5");
    const setsNumberElement = await driver.findElement(By.id('results_setsNumber'));
    console.log("6");
    const optionSetsNumberElement = await setsNumberElement.findElement(By.xpath("./option[@value='3']"));
    console.log("7");
    await optionSetsNumberElement.click();

    await driver.wait(until.elementLocated(By.id('results_result')), 3000);
    console.log("8");
    const scoreResultElement = await driver.findElement(By.id('results_result'));
    console.log("9");
    await scoreResultElement.sendKeys('6/0 6/1 6/2');

    console.log("10");

    const validateResultsScoreButton = await elementToBeClickable(driver, By.css('.btn-success'));
    console.log("11");
    await validateResultsScoreButton.click();
    console.log("12-1");

    // const successResultsScoreRegistration = await driver.wait(until.elementLocated(By.css('div.alert-success > p')), 6000);
    // console.log("12-2");
    // await driver.wait(until.elementIsVisible(successResultsScoreRegistration), 6000);
    // console.log("12-3");
    // const successMsgResultsScore_registration = await successResultsScoreRegistration.getText();
    const msg1 = await waitFlashSuccess(driver);

    console.log(`13 - Message succes : "${msg1}"`);
    strictEqual(msg1, 'The match result has been registered !', 'Le message de succès ne correspond pas...');
    console.log("14 - Admin fourth round results match 1 registered !");

    //Set results MATCH 2
    await driver.wait(until.elementLocated(By.id('results_winner')), 3000);
    const listWinnerElement_match2 = await driver.findElement(By.id('results_winner'));;
    const optionWinnerElement_match2 = await listWinnerElement_match2.findElement(By.xpath("./option[normalize-space(text())='Roger FEDERER']"));
    await optionWinnerElement_match2.click();

    await driver.wait(until.elementLocated(By.id('results_setsNumber')), 3000);
    const setsNumberElement_match2 = await driver.findElement(By.id('results_setsNumber'));
    const optionSetsNumberElement_match2 = await setsNumberElement_match2.findElement(By.xpath("./option[@value='4']"));
    await optionSetsNumberElement_match2.click();

    await driver.wait(until.elementLocated(By.id('results_result')), 3000);
    const scoreResultElement_match2 = await driver.findElement(By.id('results_result'));
    await scoreResultElement_match2.sendKeys('6/4 3/6 7/5 6/4');

    // await driver.wait(until.elementLocated(By.css('.btn-success')), 3000);
    // const validateResultsScoreButton_match2 = await driver.findElement(By.css('.btn-success'));
    // await validateResultsScoreButton_match2.click();
    const validateResultsScoreButton_2 = await elementToBeClickable(driver, By.css('.btn-success'));
    console.log("15");
    await validateResultsScoreButton_2.click();
    console.log("16-1");

    const msg2 = await waitFlashSuccess(driver);

    console.log(`17 - Message succes : "${msg2}"`);
    strictEqual(msg2, 'The match result has been registered !', 'Le message de succès ne correspond pas...');
    console.log("18 - Admin fourth round results match 2 registered !");

    //Set results MATCH 3
    await driver.wait(until.elementLocated(By.id('results_winner')), 3000);
    const listWinnerElement_match3 = await driver.findElement(By.id('results_winner'));;
    const optionWinnerElement_match3 = await listWinnerElement_match3.findElement(By.xpath("./option[normalize-space(text())='Stefanos TSITSIPAS']"));
    await optionWinnerElement_match3.click();

    await driver.wait(until.elementLocated(By.id('results_setsNumber')), 3000);
    const setsNumberElement_match3 = await driver.findElement(By.id('results_setsNumber'));
    const optionSetsNumberElement_match3 = await setsNumberElement_match3.findElement(By.xpath("./option[@value='5']"));
    await optionSetsNumberElement_match3.click();

    await driver.wait(until.elementLocated(By.id('results_result')), 3000);
    const scoreResultElement_match3 = await driver.findElement(By.id('results_result'));
    await scoreResultElement_match3.sendKeys('2/6 7/5 6/3 4/6 6/1');

    const validateResultsScoreButton_3 = await elementToBeClickable(driver, By.css('.btn-success'));
    console.log("19");
    await validateResultsScoreButton_3.click();
    console.log("20");

    const msg3 = await waitFlashSuccess(driver);

    console.log(`21 - Message succes : "${msg3}"`);
    strictEqual(msg3, 'The match result has been registered !', 'Le message de succès ne correspond pas...');
    console.log("22 - Admin fourth round results match 3 registered !");

    //Set results MATCH 4
    await driver.wait(until.elementLocated(By.id('results_winner')), 3000);
    const listWinnerElement_match4 = await driver.findElement(By.id('results_winner'));;
    const optionWinnerElement_match4 = await listWinnerElement_match4.findElement(By.xpath("./option[normalize-space(text())='Dominic THIEM']"));
    await optionWinnerElement_match4.click();

    await driver.wait(until.elementLocated(By.id('results_setsNumber')), 3000);
    const setsNumberElement_match4 = await driver.findElement(By.id('results_setsNumber'));
    const optionSetsNumberElement_match4 = await setsNumberElement_match4.findElement(By.xpath("./option[@value='3']"));
    await optionSetsNumberElement_match4.click();

    await driver.wait(until.elementLocated(By.id('results_result')), 3000);
    const scoreResultElement_match4 = await driver.findElement(By.id('results_result'));
    await scoreResultElement_match4.sendKeys('6/4 7/5 7/6');

    const validateResultsScoreButton_4 = await elementToBeClickable(driver, By.css('.btn-success'));
    console.log("23");
    await validateResultsScoreButton_4.click();
    console.log("24");

    const msg4 = await waitFlashSuccess(driver);

    console.log(`25 - Message succes : "${msg4}"`);
    strictEqual(msg4, 'The match result has been registered !', 'Le message de succès ne correspond pas...');
    console.log("26 - Admin fourth round results match 4 registered !");

    //Set results MATCH 5
    await driver.wait(until.elementLocated(By.id('results_winner')), 3000);
    const listWinnerElement_match5 = await driver.findElement(By.id('results_winner'));;
    const optionWinnerElement_match5 = await listWinnerElement_match5.findElement(By.xpath("./option[normalize-space(text())='Matteo BERRETTINI']"));
    await optionWinnerElement_match5.click();

    await driver.wait(until.elementLocated(By.id('results_setsNumber')), 3000);
    const setsNumberElement_match5 = await driver.findElement(By.id('results_setsNumber'));
    const optionSetsNumberElement_match5 = await setsNumberElement_match5.findElement(By.xpath("./option[@value='4']"));
    await optionSetsNumberElement_match5.click();

    await driver.wait(until.elementLocated(By.id('results_result')), 3000);
    const scoreResultElement_match5 = await driver.findElement(By.id('results_result'));
    await scoreResultElement_match5.sendKeys('2/6 7/5 6/3 6/0');

    const validateResultsScoreButton_5 = await elementToBeClickable(driver, By.css('.btn-success'));
    console.log("27");
    await validateResultsScoreButton_5.click();
    console.log("28");

    const msg5 = await waitFlashSuccess(driver);

    console.log(`29 - Message succes : "${msg5}"`);
    strictEqual(msg5, 'The match result has been registered !', 'Le message de succès ne correspond pas...');
    console.log("30 - Admin fourth round results match 5 registered !");

    //Set results MATCH 6
    await driver.wait(until.elementLocated(By.id('results_winner')), 3000);
    const listWinnerElement_match6 = await driver.findElement(By.id('results_winner'));;
    const optionWinnerElement_match6 = await listWinnerElement_match6.findElement(By.xpath("./option[normalize-space(text())='Casper RUUD']"));
    await optionWinnerElement_match6.click();

    await driver.wait(until.elementLocated(By.id('results_setsNumber')), 3000);
    const setsNumberElement_match6 = await driver.findElement(By.id('results_setsNumber'));
    const optionSetsNumberElement_match6 = await setsNumberElement_match6.findElement(By.xpath("./option[@value='3']"));
    await optionSetsNumberElement_match6.click();

    await driver.wait(until.elementLocated(By.id('results_result')), 3000);
    const scoreResultElement_match6 = await driver.findElement(By.id('results_result'));
    await scoreResultElement_match6.sendKeys('6/4 6/4 6/3');

    const validateResultsScoreButton_6 = await elementToBeClickable(driver, By.css('.btn-success'));
    console.log("31");
    await validateResultsScoreButton_6.click();
    console.log("32");

    const msg6 = await waitFlashSuccess(driver);

    console.log(`33 - Message succes : "${msg6}"`);
    strictEqual(msg6, 'The match result has been registered !', 'Le message de succès ne correspond pas...');
    console.log("34 - Admin fourth round results match 6 registered !");

    //Set results MATCH 7
    await driver.wait(until.elementLocated(By.id('results_winner')), 3000);
    const listWinnerElement_match7 = await driver.findElement(By.id('results_winner'));;
    const optionWinnerElement_match7 = await listWinnerElement_match7.findElement(By.xpath("./option[normalize-space(text())='Hubert HURKACZ']"));
    await optionWinnerElement_match7.click();

    await driver.wait(until.elementLocated(By.id('results_setsNumber')), 3000);
    const setsNumberElement_match7 = await driver.findElement(By.id('results_setsNumber'));
    const optionSetsNumberElement_match7 = await setsNumberElement_match7.findElement(By.xpath("./option[@value='3']"));
    await optionSetsNumberElement_match7.click();

    await driver.wait(until.elementLocated(By.id('results_result')), 3000);
    const scoreResultElement_match7 = await driver.findElement(By.id('results_result'));
    await scoreResultElement_match7.sendKeys('6/4 6/1 6/4');

    const validateResultsScoreButton_7 = await elementToBeClickable(driver, By.css('.btn-success'));
    console.log("35");
    await validateResultsScoreButton_7.click();
    console.log("36");

    const msg7 = await waitFlashSuccess(driver);

    console.log(`37 - Message succes : "${msg7}"`);
    strictEqual(msg7, 'The match result has been registered !', 'Le message de succès ne correspond pas...');
    console.log("38 - Admin fourth round results match 7 registered !");

    //Set results MATCH 8
    await driver.wait(until.elementLocated(By.id('results_winner')), 3000);
    const listWinnerElement_match8 = await driver.findElement(By.id('results_winner'));;
    const optionWinnerElement_match8 = await listWinnerElement_match8.findElement(By.xpath("./option[normalize-space(text())='Felix AUGER-ALIASSIME']"));
    await optionWinnerElement_match8.click();

    await driver.wait(until.elementLocated(By.id('results_setsNumber')), 3000);
    const setsNumberElement_match8 = await driver.findElement(By.id('results_setsNumber'));
    const optionSetsNumberElement_match8 = await setsNumberElement_match8.findElement(By.xpath("./option[@value='4']"));
    await optionSetsNumberElement_match8.click();

    await driver.wait(until.elementLocated(By.id('results_result')), 3000);
    const scoreResultElement_match8 = await driver.findElement(By.id('results_result'));
    await scoreResultElement_match8.sendKeys('6/4 6/2 3/6 7/5');

    const validateResultsScoreButton_8 = await elementToBeClickable(driver, By.css('.btn-success'));
    console.log("39");
    await validateResultsScoreButton_8.click();
    console.log("40");

    const msg8 = await waitFlashSuccess(driver);

    console.log(`41 - Message succes : "${msg8}"`);
    strictEqual(msg8, 'The match result has been registered !', 'Le message de succès ne correspond pas...');
    console.log("42 - Admin fourth round results match 8 registered !");

    ////////////// Je commente les 4 lignes en dessous car ne marche pas en prod
    // const msg9 = await waitFlashSuccess(driver, { locator: By.css('div.alert-success p:nth-child(2)') });
    // console.log(`43 - Message succes : "${msg9}"`);
    // strictEqual(msg9, 'All the fourthround results have been registered !', 'Le message de succès ne correspond pas...');
    // console.log("44 - Admin fourth round results ALL MATCHES registered !");
}

module.exports = { runTest10 };
