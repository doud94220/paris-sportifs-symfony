const { Builder, By, Key, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');

async function runTest40(driver, BASE_URL) {

    //Go to final result admin page
    // const URL_BET_FINAL = 'http://127.0.0.1:8000/admin/final-result';
    const URL_BET_FINAL = `${BASE_URL}/admin/final-result`;
    await driver.get(URL_BET_FINAL);
    console.log("7 - Forced navigation to final result admin page");

    //Set final result
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
    await scoreResultElement.sendKeys('6/4 5/7 6/4 6/7 6/2');

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

    //Verify success msg
    const successResultsScoreRegistration = await driver.wait(until.elementLocated(By.css('div.alert-success > p')), 3000);
    const successMsgResultsScore_registration = await successResultsScoreRegistration.getText();
    console.log(`19 - Message succes : "${successMsgResultsScore_registration}"`);
    strictEqual(successMsgResultsScore_registration, 'The match result has been registered !', 'Le message de succès ne correspond pas...');
    console.log("20 - Admin final match result registered !");
}

module.exports = { runTest40 };