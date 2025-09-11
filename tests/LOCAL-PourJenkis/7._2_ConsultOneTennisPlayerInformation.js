const { Builder, By, Key, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');

// require('chromedriver');

async function runTest7_2(driver) {
    // let driver = await new Builder().forBrowser('chrome').build();

    try {
        //Accéder à la page du joueur Federer
        await driver.get('http://localhost:4444/wd/hub/tennis-players/');
        const playerRogerFederer = await driver.findElement(By.css('.color-players:nth-child(5) > b'));
        await playerRogerFederer.click();
        console.log("0");

        //Vérifier les informations du joueur
        const playerNameElement = await driver.findElement(By.css('div.card-body > h5'));
        const playerName = await playerNameElement.getText();
        strictEqual(playerName, 'Roger FEDERER', 'Le NOM du joueur est incorrect...');
        console.log("1");

        const playerCountryElement = await driver.findElement(By.css('div.card-body > h6'));
        const playerCountry = await playerCountryElement.getText();
        strictEqual(playerCountry, 'Switzerland', 'Le PAYS du joueur est incorrect...');
        console.log("2");

        const playerCountryFlagElement = await driver.findElement(By.css('div.card-body > img'));
        const playerCountryFlagPath = await playerCountryFlagElement.getAttribute('src');

        if (playerCountryFlagPath.includes('/img/Swiss.svg')) {
            console.log("3 - Correct Path !");
        }
        else {
            console.log("3 - Incorrect Path....");
        };

        const playerPictureElement = await driver.findElement(By.css('div.card > img'));
        const playerPictureElementPath = await playerPictureElement.getAttribute('src');

        if (playerPictureElementPath.includes('/img/Federer.png')) {
            console.log("4 - Correct Path !");
        }
        else {
            console.log("4- Incorrect Path....");
        };

        const playerAgeElement = await driver.findElement(By.css('div.card > ul > li:nth-child(1)'));
        const playerAge = await playerAgeElement.getText();
        strictEqual(playerAge, 'Age : 40', 'Incorrect player age');
        console.log("5");

        const playerRankingElement = await driver.findElement(By.css('div.card > ul > li:nth-child(2)'));
        const playerRanking = await playerRankingElement.getText();
        strictEqual(playerRanking, 'Atp Ranking : 9', 'Incorrect ranking');
        console.log("6 - We have just consulted one player information !");
    } catch (error) {
        console.log("Erreur - Catch - 7._2_ConsultOneTennisPlayerInformation.js");
        console.error('Test failed. Error details:', error);
    } finally {
        //await driver.quit();
    }
}

module.exports = { runTest7_2 };

// runTest7_2();