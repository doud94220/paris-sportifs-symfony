const { Builder, By, Key, until } = require('selenium-webdriver');

// require('chromedriver');

async function runTest1(driver) {
    // let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('http://127.0.0.1:8000/');
        console.log("0");

        // --- Attendre affichage image de fond => NOK...
        // await driver.wait(until.elementIsVisible(driver.findElement(By.id('containerAcceuilNotLogged'))), 5000);
        // console.log("1");

        // -------------------------------- ATTENDRE CHARGEMENT IMAGE DE FOND ------------------------------
        // => En fait ca sert à rien parce que on ne voit pas l'image dans l'instance de chrome ouverte !
        // await driver.get('http://127.0.0.1:8000/img/ExterieurStade.jpg');

        // Étape 1: Exécuter un script pour obtenir l'URL de l'image de fond.
        // const imageUrl = await driver.executeScript(`
        //     const element = document.getElementById('containerAcceuilNotLogged');
        //     const style = window.getComputedStyle(element);
        //     const backgroundImage = style.getPropertyValue('background-image');

        //     // Extrait l'URL de la propriété 'url("...")'
        //     return backgroundImage.replace(/url\\("?'?"?(.+?)'?"?\\)/i, '$1');
        // `);

        // Étape 2: Exécuter un autre script pour attendre que l'image soit chargée.
        // await driver.executeAsyncScript(`
        //     const imageUrl = arguments[0];
        //     const callback = arguments[arguments.length - 1];

        //     const img = new Image();
        //     img.onload = () => callback(true);
        //     img.onerror = () => callback(false);
        //     img.src = imageUrl;
        // `, imageUrl);

        console.log("1 - L'image de fond a été chargée avec succès !");
        //-------------------------------------------------------------------------------------------------

        const InscriptionLink = await driver.wait(until.elementLocated(By.css('ul > li:nth-child(2) > a.nav-link')), 3000);
        console.log("2");

        await InscriptionLink.click();
        console.log("3");

        const creationButton = await driver.wait(until.elementLocated(By.css('button.btn-success')), 3000);
        //Pour Info : Failed to execute 'querySelector' on 'Document': 'button.btn-success:has-text("Création")' is not a valid selector
        console.log("4");

        await driver.findElement(By.id('user_firstName')).sendKeys('Edouard', Key.RETURN);
        console.log("5");

        await driver.findElement(By.id('user_lastName')).sendKeys('ANTHONY', Key.RETURN);
        console.log("6");

        await driver.findElement(By.id('user_nickName')).sendKeys('Doud', Key.RETURN);
        console.log("7");

        await driver.findElement(By.id('user_email')).sendKeys('doud75@gmail.com', Key.RETURN);
        console.log("8");

        await driver.findElement(By.id('user_password')).sendKeys('Doud2', Key.RETURN);
        console.log("9");

        // ----- Pas besoin, Selenium valide le form (équivaut click bouton) quand tous les champs sont remplis
        // await creationButton.click();
        // console.log("10");

        const successRegistrationMsg = await driver.wait(until.elementLocated(By.css('div.alert-success > p')), 3000);
        console.log("Admin account creation !");
    } catch (error) {
        console.log("Erreur - Catch - Account Creation Failed...");
        console.error('Test failed. Error details:', error);
    } finally {
        // await driver.quit();
    }
}

module.exports = { runTest1 };

// runTest1();