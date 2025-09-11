const { Builder, By, Key, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');

// require('chromedriver');

async function runTest20(driver) {
    // let driver = await new Builder().forBrowser('chrome').build();

    try {

        // -------------------------------------------- Connect as ADMIN --------------------------------------------
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

        //Go to quarterfinal results admin page
        const URL_BET_QUARTERFINAL = 'http://127.0.0.1:8000/admin/quarterfinals-results/1';
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
        const successResultsScoreRegistration = await driver.wait(until.elementLocated(By.css('div.alert-success > p')), 3000);
        const successMsgResultsScore_registration = await successResultsScoreRegistration.getText();
        console.log(`19 - Message succes : "${successMsgResultsScore_registration}"`);
        strictEqual(successMsgResultsScore_registration, 'The match result has been registered !', 'Le message de succès ne correspond pas...');
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

        const successResultsScoreRegistration_match2 = await driver.wait(until.elementLocated(By.css('div.alert-success > p')), 3000);
        const successMsgResultsScore_registration_match2 = await successResultsScoreRegistration_match2.getText();
        console.log(`21 - Message succes : "${successMsgResultsScore_registration_match2}"`);
        strictEqual(successMsgResultsScore_registration_match2, 'The match result has been registered !', 'Le message de succès ne correspond pas...');
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

        const successResultsScoreRegistration_match3 = await driver.wait(until.elementLocated(By.css('div.alert-success > p')), 3000);
        const successMsgResultsScore_registration_match3 = await successResultsScoreRegistration_match3.getText();
        console.log(`23 - Message succes : "${successMsgResultsScore_registration_match3}"`);
        strictEqual(successMsgResultsScore_registration_match3, 'The match result has been registered !', 'Le message de succès ne correspond pas...');
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

        const successResultsScoreRegistration_match4 = await driver.wait(until.elementLocated(By.css('div.alert-success > p')), 3000);
        const successMsgResultsScore_registration_match4 = await successResultsScoreRegistration_match4.getText();
        console.log(`25 - Message succes : "${successMsgResultsScore_registration_match4}"`);
        strictEqual(successMsgResultsScore_registration_match4, 'The match result has been registered !', 'Le message de succès ne correspond pas...');
        console.log("26 - Admin quarterfinal results match 4 registered !");

        //Validate quarterfinal matchs results
        const successResultsScoreRegistration_allMatches = await driver.wait(until.elementLocated(By.css('div.alert-success p:nth-child(2)')), 3000);
        const successMsgResultsScore_registration_allMatches = await successResultsScoreRegistration_allMatches.getText();
        console.log(`27 - Message succes : "${successMsgResultsScore_registration_allMatches}"`);
        strictEqual(successMsgResultsScore_registration_allMatches, 'All the quarterfinals results have been registered !', 'Le message de succès ne correspond pas...');
        console.log("28 - Admin quarterfinal results ALL MATCHES registered !");
    }
    catch (error) {
        console.log("Erreur - Catch");
        console.error('Test failed. Error details:', error);
    } finally {
        //await driver.quit();
    }
}

// runTest20();

module.exports = { runTest20 };
