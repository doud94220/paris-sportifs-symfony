const { Builder, By, Key, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');

async function runTest30(driver, BASE_URL) {

    //Go to quarterfinal results admin page
    // const URL_BET_SEMIFINAL = 'http://127.0.0.1:8000/admin/semifinals-results/1';
    const URL_BET_SEMIFINAL = `${BASE_URL}/admin/semifinals-results/1`;
    await driver.get(URL_BET_SEMIFINAL);
    console.log("7 - Forced navigation to semi final results admin page");

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
    const optionSetsNumberElement = await setsNumberElement.findElement(By.xpath("./option[@value='5']"));
    console.log("13");
    await optionSetsNumberElement.click();

    await driver.wait(until.elementLocated(By.id('results_result')), 3000);
    console.log("14");
    const scoreResultElement = await driver.findElement(By.id('results_result'));
    console.log("15");
    await scoreResultElement.sendKeys('4/6 6/2 5/7 6/3 6/0');

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
    const successResultsScoreRegistration = await driver.wait(until.elementLocated(By.css('div.alert-success > p')), 3000);
    const successMsgResultsScore_registration = await successResultsScoreRegistration.getText();
    console.log(`19 - Message succes : "${successMsgResultsScore_registration}"`);
    strictEqual(successMsgResultsScore_registration, 'The match result has been registered !', 'Le message de succès ne correspond pas...');
    console.log("20 - Admin Semifinal results match 1 registered !");

    //Set results MATCH 2
    await driver.wait(until.elementLocated(By.id('results_winner')), 3000);
    const listWinnerElement_match2 = await driver.findElement(By.id('results_winner'));;
    const optionWinnerElement_match2 = await listWinnerElement_match2.findElement(By.xpath("./option[normalize-space(text())='Casper RUUD']"));
    await optionWinnerElement_match2.click();

    await driver.wait(until.elementLocated(By.id('results_setsNumber')), 3000);
    const setsNumberElement_match2 = await driver.findElement(By.id('results_setsNumber'));
    const optionSetsNumberElement_match2 = await setsNumberElement_match2.findElement(By.xpath("./option[@value='4']"));
    await optionSetsNumberElement_match2.click();

    await driver.wait(until.elementLocated(By.id('results_result')), 3000);
    const scoreResultElement_match2 = await driver.findElement(By.id('results_result'));
    await scoreResultElement_match2.sendKeys('6/7 7/5 6/3 6/2');

    await driver.wait(until.elementLocated(By.css('.btn-success')), 3000);
    const validateResultsScoreButton_match2 = await driver.findElement(By.css('.btn-success'));
    await validateResultsScoreButton_match2.click();

    const successResultsScoreRegistration_match2 = await driver.wait(until.elementLocated(By.css('div.alert-success > p')), 3000);
    const successMsgResultsScore_registration_match2 = await successResultsScoreRegistration_match2.getText();
    console.log(`21 - Message succes : "${successMsgResultsScore_registration_match2}"`);
    strictEqual(successMsgResultsScore_registration_match2, 'The match result has been registered !', 'Le message de succès ne correspond pas...');
    console.log("22 - Admin Semifinal results match 2 registered !");

    //Verify Semifinal matchs results last succeess message
    const successResultsScoreRegistration_allMatches = await driver.wait(until.elementLocated(By.css('div.alert-success p:nth-child(2)')), 3000);
    const successMsgResultsScore_registration_allMatches = await successResultsScoreRegistration_allMatches.getText();
    console.log(`23 - Message succes : "${successMsgResultsScore_registration_allMatches}"`);
    strictEqual(successMsgResultsScore_registration_allMatches, 'All the semifinals results have been registered !', 'Le message de succès ne correspond pas...');
    console.log("24 - Admin SemiFinal results ALL MATCHES registered !");
}

module.exports = { runTest30 };