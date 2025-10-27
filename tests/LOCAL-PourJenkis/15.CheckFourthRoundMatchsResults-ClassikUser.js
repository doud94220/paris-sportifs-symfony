const { Builder, By, Key, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');

// require('chromedriver');

async function runTest15(driver, BASE_URL) {
    // let driver = await new Builder().forBrowser('chrome').build();

    //Go to the fourth round results page
    const MATCHS_RESULT_PAGE = `${BASE_URL}/matchs-results-show/fourthround`;
    await driver.get(MATCHS_RESULT_PAGE);
    console.log("1 - Forced navigation toward matchs result page");

    // --------------------------------------- Check each matchs result element ------------------------------------

    //Check MATCH 1 ------------------------------------------------------------------------------------------------
    const showDownMatch1Element = await driver.wait(until.elementLocated(By.css('table > tbody > tr:nth-child(1) > td:nth-child(1)')), 3000);
    const showDownMatch1 = await showDownMatch1Element.getText();
    strictEqual(showDownMatch1, 'Novak DJOKOVIC VS Rafael NADAL', "The showdown is not good...");
    console.log("2");

    const winnerMatch1Element = await driver.wait(until.elementLocated(By.css('table > tbody > tr:nth-child(1) > td:nth-child(2)')), 3000);
    const winnerMatch1 = await winnerMatch1Element.getText();
    strictEqual(winnerMatch1, 'Novak DJOKOVIC', "The winner is not good...");
    console.log("3");

    const winnerPictureElementMatch1 = await driver.findElement(By.css('table > tbody > tr:nth-child(1) > td:nth-child(3) > img'));
    const winnerPictureElementPathMatch1 = await winnerPictureElementMatch1.getAttribute('src');

    if (winnerPictureElementPathMatch1.includes('/img/Djokovic.png')) {
        console.log("4 - Correct picture path winner !");
    }
    else {
        console.log("4 - Incorrect picture path winner...");
    };

    const resultScoreMatch1Element = await driver.wait(until.elementLocated(By.css('table > tbody > tr:nth-child(1) > td:nth-child(4)')), 3000);
    const resultScoreMatch1 = await resultScoreMatch1Element.getText();
    strictEqual(resultScoreMatch1, '6/0 6/1 6/2', "The result score of the MATCH 1 is not good...");
    console.log("5");

    //Check MATCH 2 ------------------------------------------------------------------------------------------------
    const showDownMatch2Element = await driver.wait(until.elementLocated(By.css('table > tbody > tr:nth-child(2) > td:nth-child(1)')), 3000);
    const showDownMatch2 = await showDownMatch2Element.getText();
    strictEqual(showDownMatch2, 'Roger FEDERER VS Daniil MEDVEDEV', "The showdown is not good...");
    console.log("6");

    const winnerMatch2Element = await driver.wait(until.elementLocated(By.css('table > tbody > tr:nth-child(2) > td:nth-child(2)')), 3000);
    const winnerMatch2 = await winnerMatch2Element.getText();
    strictEqual(winnerMatch2, 'Roger FEDERER', "The winner is not good...");
    console.log("7");

    const winnerPictureElementMatch2 = await driver.findElement(By.css('table > tbody > tr:nth-child(2) > td:nth-child(3) > img'));
    const winnerPictureElementPathMatch2 = await winnerPictureElementMatch2.getAttribute('src');

    if (winnerPictureElementPathMatch2.includes('/img/Federer.png')) {
        console.log("8 - Correct picture path winner !");
    }
    else {
        console.log("8 - Incorrect picture path winner...");
    };

    const resultScoreMatch2Element = await driver.wait(until.elementLocated(By.css('table > tbody > tr:nth-child(2) > td:nth-child(4)')), 3000);
    const resultScoreMatch2 = await resultScoreMatch2Element.getText();
    strictEqual(resultScoreMatch2, '6/4 3/6 7/5 6/4', "The result score of the MATCH 2 is not good...");
    console.log("9");

    //Check MATCH 3 ------------------------------------------------------------------------------------------------
    const showDownMatch3Element = await driver.wait(until.elementLocated(By.css('table > tbody > tr:nth-child(3) > td:nth-child(1)')), 3000);
    const showDownMatch3 = await showDownMatch3Element.getText();
    strictEqual(showDownMatch3, 'Stefanos TSITSIPAS VS Alexander ZVEREV', "The showdown is not good...");
    console.log("10");

    const winnerMatch3Element = await driver.wait(until.elementLocated(By.css('table > tbody > tr:nth-child(3) > td:nth-child(2)')), 3000);
    const winnerMatch3 = await winnerMatch3Element.getText();
    strictEqual(winnerMatch3, 'Stefanos TSITSIPAS', "The winner is not good...");
    console.log("11");

    const winnerPictureElementMatch3 = await driver.findElement(By.css('table > tbody > tr:nth-child(3) > td:nth-child(3) > img'));
    const winnerPictureElementPathMatch3 = await winnerPictureElementMatch3.getAttribute('src');

    if (winnerPictureElementPathMatch3.includes('/img/Tsitsipas.png')) {
        console.log("12 - Correct picture path winner !");
    }
    else {
        console.log("12 - Incorrect picture path winner...");
    };

    const resultScoreMatch3Element = await driver.wait(until.elementLocated(By.css('table > tbody > tr:nth-child(3) > td:nth-child(4)')), 3000);
    const resultScoreMatch3 = await resultScoreMatch3Element.getText();
    strictEqual(resultScoreMatch3, '2/6 7/5 6/3 4/6 6/1', "The result score of the MATCH 3 is not good...");
    console.log("13");

    //Check MATCH 4 ------------------------------------------------------------------------------------------------
    const showDownMatch4Element = await driver.wait(until.elementLocated(By.css('table > tbody > tr:nth-child(4) > td:nth-child(1)')), 3000);
    const showDownMatch4 = await showDownMatch4Element.getText();
    strictEqual(showDownMatch4, 'Dominic THIEM VS Andrey RUBLEV', "The showdown is not good...");
    console.log("14");

    const winnerMatch4Element = await driver.wait(until.elementLocated(By.css('table > tbody > tr:nth-child(4) > td:nth-child(2)')), 3000);
    const winnerMatch4 = await winnerMatch4Element.getText();
    strictEqual(winnerMatch4, 'Dominic THIEM', "The winner is not good...");
    console.log("15");

    const winnerPictureElementMatch4 = await driver.findElement(By.css('table > tbody > tr:nth-child(4) > td:nth-child(3) > img'));
    const winnerPictureElementPathMatch4 = await winnerPictureElementMatch4.getAttribute('src');

    if (winnerPictureElementPathMatch4.includes('/img/Thiem.png')) {
        console.log("16 - Correct picture path winner !");
    }
    else {
        console.log("16 - Incorrect picture path winner...");
    };

    const resultScoreMatch4Element = await driver.wait(until.elementLocated(By.css('table > tbody > tr:nth-child(4) > td:nth-child(4)')), 3000);
    const resultScoreMatch4 = await resultScoreMatch4Element.getText();
    strictEqual(resultScoreMatch4, '6/4 7/5 7/6', "The result score of the MATCH 4 is not good...");
    console.log("17");

    //Check MATCH 5 ------------------------------------------------------------------------------------------------
    const showDownMatch5Element = await driver.wait(until.elementLocated(By.css('table > tbody > tr:nth-child(5) > td:nth-child(1)')), 3000);
    const showDownMatch5 = await showDownMatch5Element.getText();
    strictEqual(showDownMatch5, 'Matteo BERRETTINI VS Denis SHAPOVALOV', "The showdown is not good...");
    console.log("18");

    const winnerMatch5Element = await driver.wait(until.elementLocated(By.css('table > tbody > tr:nth-child(5) > td:nth-child(2)')), 3000);
    const winnerMatch5 = await winnerMatch5Element.getText();
    strictEqual(winnerMatch5, 'Matteo BERRETTINI', "The winner is not good...");
    console.log("19");

    const winnerPictureElementMatch5 = await driver.findElement(By.css('table > tbody > tr:nth-child(5) > td:nth-child(3) > img'));
    const winnerPictureElementPathMatch5 = await winnerPictureElementMatch5.getAttribute('src');

    if (winnerPictureElementPathMatch5.includes('/img/Berrettini.png')) {
        console.log("20 - Correct picture path winner !");
    }
    else {
        console.log("20 - Incorrect picture path winner...");
    };

    const resultScoreMatch5Element = await driver.wait(until.elementLocated(By.css('table > tbody > tr:nth-child(5) > td:nth-child(4)')), 3000);
    const resultScoreMatch5 = await resultScoreMatch5Element.getText();
    strictEqual(resultScoreMatch5, '2/6 7/5 6/3 6/0', "The result score of the MATCH 5 is not good...");
    console.log("21");

    //Check MATCH 6 ------------------------------------------------------------------------------------------------
    const showDownMatch6Element = await driver.wait(until.elementLocated(By.css('table > tbody > tr:nth-child(6) > td:nth-child(1)')), 3000);
    const showDownMatch6 = await showDownMatch6Element.getText();
    strictEqual(showDownMatch6, 'Casper RUUD VS Pablo CARRENO BUSTA', "The showdown is not good...");
    console.log("22");

    const winnerMatch6Element = await driver.wait(until.elementLocated(By.css('table > tbody > tr:nth-child(6) > td:nth-child(2)')), 3000);
    const winnerMatch6 = await winnerMatch6Element.getText();
    strictEqual(winnerMatch6, 'Casper RUUD', "The winner is not good...");
    console.log("23");

    const winnerPictureElementMatch6 = await driver.findElement(By.css('table > tbody > tr:nth-child(6) > td:nth-child(3) > img'));
    const winnerPictureElementPathMatch6 = await winnerPictureElementMatch6.getAttribute('src');

    if (winnerPictureElementPathMatch6.includes('/img/Ruud.png')) {
        console.log("24 - Correct picture path winner !");
    }
    else {
        console.log("24 - Incorrect picture path winner...");
    };

    const resultScoreMatch6Element = await driver.wait(until.elementLocated(By.css('table > tbody > tr:nth-child(6) > td:nth-child(4)')), 3000);
    const resultScoreMatch6 = await resultScoreMatch6Element.getText();
    strictEqual(resultScoreMatch6, '6/4 6/4 6/3', "The result score of the MATCH 6 is not good...");
    console.log("25");

    //Check MATCH 7 ------------------------------------------------------------------------------------------------
    const showDownMatch7Element = await driver.wait(until.elementLocated(By.css('table > tbody > tr:nth-child(7) > td:nth-child(1)')), 3000);
    const showDownMatch7 = await showDownMatch7Element.getText();
    strictEqual(showDownMatch7, 'Hubert HURKACZ VS Diego SCHWARTZMAN', "The showdown is not good...");
    console.log("26");

    const winnerMatch7Element = await driver.wait(until.elementLocated(By.css('table > tbody > tr:nth-child(7) > td:nth-child(2)')), 3000);
    const winnerMatch7 = await winnerMatch7Element.getText();
    strictEqual(winnerMatch7, 'Hubert HURKACZ', "The winner is not good...");
    console.log("27");

    const winnerPictureElementMatch7 = await driver.findElement(By.css('table > tbody > tr:nth-child(7) > td:nth-child(3) > img'));
    const winnerPictureElementPathMatch7 = await winnerPictureElementMatch7.getAttribute('src');

    if (winnerPictureElementPathMatch7.includes('/img/Hurkacz.png')) {
        console.log("28 - Correct picture path winner !");
    }
    else {
        console.log("28 - Incorrect picture path winner...");
    };

    const resultScoreMatch7Element = await driver.wait(until.elementLocated(By.css('table > tbody > tr:nth-child(7) > td:nth-child(4)')), 3000);
    const resultScoreMatch7 = await resultScoreMatch7Element.getText();
    strictEqual(resultScoreMatch7, '6/4 6/1 6/4', "The result score of the MATCH 7 is not good...");
    console.log("29");

    //Check MATCH 8 ------------------------------------------------------------------------------------------------
    const showDownMatch8Element = await driver.wait(until.elementLocated(By.css('table > tbody > tr:nth-child(8) > td:nth-child(1)')), 3000);
    const showDownMatch8 = await showDownMatch8Element.getText();
    strictEqual(showDownMatch8, 'Felix AUGER-ALIASSIME VS Jannik SINNER', "The showdown is not good...");
    console.log("30");

    const winnerMatch8Element = await driver.wait(until.elementLocated(By.css('table > tbody > tr:nth-child(8) > td:nth-child(2)')), 3000);
    const winnerMatch8 = await winnerMatch8Element.getText();
    strictEqual(winnerMatch8, 'Felix AUGER-ALIASSIME', "The winner is not good...");
    console.log("31");

    const winnerPictureElementMatch8 = await driver.findElement(By.css('table > tbody > tr:nth-child(8) > td:nth-child(3) > img'));
    const winnerPictureElementPathMatch8 = await winnerPictureElementMatch8.getAttribute('src');

    if (winnerPictureElementPathMatch8.includes('/img/AugerAliassime.png')) {
        console.log("32 - Correct picture path winner !");
    }
    else {
        console.log("32 - Incorrect picture path winner...");
    };

    const resultScoreMatch8Element = await driver.wait(until.elementLocated(By.css('table > tbody > tr:nth-child(8) > td:nth-child(4)')), 3000);
    const resultScoreMatch8 = await resultScoreMatch8Element.getText();
    strictEqual(resultScoreMatch8, '6/4 6/2 3/6 7/5', "The result score of the MATCH 8 is not good...");
    console.log("33");

    console.log("34 - ALL THE MATCHS RESULT ARE FINE !!!");
}

module.exports = { runTest15 };
