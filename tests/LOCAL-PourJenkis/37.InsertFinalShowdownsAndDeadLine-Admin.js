const { Builder, By, Key, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');

// let driver = null;

async function runTest37(driver) {
    // let driver = await new Builder().forBrowser('chrome').build();

    try {
        // -------------------------------------------- Connection as ADMIN --------------------------------------------
        // Y'a-t-il une possibilité de faire une sorte de "require" pour injecter le code de connexion en admin ? On verra plus tard
        // driver = await new Builder().forBrowser('chrome').build();
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

        // ------------------------------------------- ENTER FINAL SHOWDOWN --------------------------------------
        console.log("7");
        //Clicker sur le lien Admin en haut de page
        const adminLink = await driver.wait(until.elementLocated(By.css('ul > li:nth-child(6) > a.nav-link')), 3000);
        await adminLink.click();
        console.log("8");

        const URL_ADMIN_FINAL = 'http://127.0.0.1:8000/admin/final?round=final';
        await driver.get(URL_ADMIN_FINAL);
        console.log("9 - Forced navigation toward final admin page");

        // ----------------------------------- Enter Final showdown -----------------------------
        const URL_ADMIN_FINAL_SHOWDONN = 'http://127.0.0.1:8000/admin/final-showdown';
        await driver.get(URL_ADMIN_FINAL_SHOWDONN);
        console.log("10 - Forced navigation toward final showdown admin page");

        const successButtonElement_showdown = await driver.wait(
            until.elementLocated((By.css('button.btn-success'))),
            3000 // Le temps d'attente maximum en millisecondes
        );
        console.log("11 - L'élément button.btn-success est localisé");

        await driver.wait(until.elementIsVisible(successButtonElement_showdown), 3000);
        console.log("12 - L'élément est visible");

        await driver.wait(until.elementLocated(By.id('tennis_match_playerOne')), 3000);
        const listPlayerOne = await driver.findElement(By.id('tennis_match_playerOne'));
        const option = await listPlayerOne.findElement(By.xpath("./option[text()='Novak DJOKOVIC']"));
        await option.click();
        console.log("13 - L'option 'Novak DJOKOVIC' a été sélectionnée avec succès.");

        await driver.wait(until.elementLocated(By.id('tennis_match_playerTwo')), 3000);
        const listPlayerTwo = await driver.findElement(By.id('tennis_match_playerTwo'));
        const option2 = await listPlayerTwo.findElement(By.xpath("./option[text()='Casper RUUD']"));
        await option2.click();
        console.log("14 - L'option 'Casper RUUD' a été sélectionnée avec succès.");

        await successButtonElement_showdown.click();
        console.log("15 - ShowDown validation button clicked !");

        //Verify success msg
        const successRegistrationMsgElement_showdown = await driver.wait(until.elementLocated(By.css('div.alert-success > p')), 6000);
        const successMsg_showdown = await successRegistrationMsgElement_showdown.getText(); //Sans Await, j'ai le Promise, et ca plante
        console.log(`Success message : "${successMsg_showdown}"`);
        strictEqual(successMsg_showdown, 'The showdown has been registered !', 'Success msg not ok...');
        console.log("16 - Final match inserted !");

        // ----------------------------- ENTER FINAL BET DEAD LINE ---------------------------------
        const URL_ADMIN_FINAL_DEADLINE = 'http://127.0.0.1:8000/admin/final-deadline';
        await driver.get(URL_ADMIN_FINAL_DEADLINE);
        console.log("17 - Forced navigation toward final bet dead line administration");

        const successButton_deadline = await driver.wait(
            until.elementLocated((By.css('button.btn-success'))),
            3000 // Le temps d'attente maximum en millisecondes
        );

        // Calcul et formatage de la date
        let now = new Date();
        let futureDate = new Date(now.getTime() + 4 * 60 * 60 * 1000);
        let year = futureDate.getFullYear();
        let month = (futureDate.getMonth() + 1).toString().padStart(2, '0');
        let day = futureDate.getDate().toString().padStart(2, '0');
        let hours = futureDate.getHours().toString().padStart(2, '0');
        let minutes = futureDate.getMinutes().toString().padStart(2, '0');
        let formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
        // let formattedDateTime = `${day}-${month}-${year}T${hours}:${minutes}`;

        // Trouver l'élément input et lui envoyer la valeur
        const dateInput = await driver.findElement(By.id('dead_line_deadLine'));
        await driver.executeScript("arguments[0].value = arguments[1];", dateInput, formattedDateTime);
        console.log(`18 - La date et l'heure "${formattedDateTime}" ont été renseignées.`);

        //Valider la dead line
        await successButton_deadline.click();

        //Vérifier le message en haut de la page
        const successRegistrationDeadLine = await driver.wait(until.elementLocated(By.css('div.alert-success > p')), 6000);
        const successMsg_deadline = await successRegistrationDeadLine.getText(); //Sans Await, j'ai le Promise, et ca plante
        console.log(`19 - Message succes : "${successMsg_deadline}"`);
        strictEqual(successMsg_deadline, 'The deadline has been registered !', 'Wrong success message');
        console.log("20 - Final bet dead line inserted !");

    } catch (error) {
        console.log("Erreur - Catch");
        console.error('Test failed. Error details:', error);
    } finally {
        // await driver.sleep(5000); //Ca me permet de voir l'état final avant la suppression de l'instance de chrome
        // await driver.quit();
    }
}

// runTest37();

module.exports = { runTest37 };