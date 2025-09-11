const { Builder, By, Key, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');

// let driver = null;

async function runTest16(driver) {
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

        // ------------------------------------------ ENTER QUARTER FINAL SHOWDOWNS ------------------------------------
        console.log("7");
        //Clicker sur le lien Admin en haut de page
        const adminLink = await driver.wait(until.elementLocated(By.css('ul > li:nth-child(6) > a.nav-link')), 3000);
        await adminLink.click();
        console.log("8");

        const URL_ADMIN_QUARTERFINAL = 'http://127.0.0.1:8000/admin/quarterfinals?round=quaterfinals';
        await driver.get(URL_ADMIN_QUARTERFINAL);
        console.log("9 - Forced navigation toward quarter final admin page");

        // ----------------------------------- Enter quarter final showdown - FIRST Quarter -----------------------------
        const URL_ADMIN_QUARTERFINAL_SHOWDONNS = 'http://127.0.0.1:8000/admin/quarterfinals-showdowns/1';
        await driver.get(URL_ADMIN_QUARTERFINAL_SHOWDONNS);
        console.log("10 - Forced navigation toward quarter final showdown admin page 1");

        const successButtonElement_showdown_1 = await driver.wait(
            until.elementLocated((By.css('button.btn-success'))),
            3000 // Le temps d'attente maximum en millisecondes
        );
        console.log("11 - L'élément button.btn-success est localisé");

        await driver.wait(until.elementIsVisible(successButtonElement_showdown_1), 3000);
        console.log("12 - L'élément est visible");

        await driver.wait(until.elementLocated(By.id('tennis_match_playerOne')), 3000);
        const listPlayerOne = await driver.findElement(By.id('tennis_match_playerOne'));
        const option = await listPlayerOne.findElement(By.xpath("./option[text()='Novak DJOKOVIC']"));
        await option.click();
        console.log("13 - L'option 'Novak DJOKOVIC' a été sélectionnée avec succès.");

        await driver.wait(until.elementLocated(By.id('tennis_match_playerTwo')), 3000);
        const listPlayerTwo = await driver.findElement(By.id('tennis_match_playerTwo'));
        const option2 = await listPlayerTwo.findElement(By.xpath("./option[text()='Roger FEDERER']"));
        await option2.click();
        console.log("14 - L'option 'Roger FEDERER' a été sélectionnée avec succès.");

        await successButtonElement_showdown_1.click();
        console.log("15 - Bouton showdown 1 cliqué");
        const successRegistrationMsgElement_showdown_1 = await driver.wait(until.elementLocated(By.css('div.alert-success > p')), 6000);
        const successMsg_showdown_1 = await successRegistrationMsgElement_showdown_1.getText(); //Sans Await, j'ai le Promise, et ca plante
        console.log(`Success message : "${successMsg_showdown_1}"`);
        strictEqual(successMsg_showdown_1, 'The showdown has been registered !', 'LSuccess msg not ok...');
        console.log("16 - Quarterfinal match 1 inserted !");

        // ----------------------------------- Enter quarter final showdown - SECOND Quarter -----------------------------
        const successButtonElement_showdown_2 = await driver.wait(
            until.elementLocated((By.css('button.btn-success'))),
            3000 // Le temps d'attente maximum en millisecondes
        );
        console.log("17 - L'élément button.btn-success est localisé");

        await driver.wait(until.elementIsVisible(successButtonElement_showdown_2), 3000);
        console.log("18 - L'élément est visible");

        await driver.wait(until.elementLocated(By.id('tennis_match_playerOne')), 3000);
        const listPlayerOne_match2 = await driver.findElement(By.id('tennis_match_playerOne'));
        const option_match2 = await listPlayerOne_match2.findElement(By.xpath("./option[text()='Stefanos TSITSIPAS']"));
        await option_match2.click();
        console.log("19 - L'option 'Stefanos TSITSIPAS' a été sélectionnée avec succès.");

        await driver.wait(until.elementLocated(By.id('tennis_match_playerTwo')), 3000);
        const listPlayerTwo_match2 = await driver.findElement(By.id('tennis_match_playerTwo'));
        const option2_match2 = await listPlayerTwo_match2.findElement(By.xpath("./option[text()='Dominic THIEM']"));
        await option2_match2.click();
        console.log("20 - L'option 'Dominic THIEM' a été sélectionnée avec succès.");

        await successButtonElement_showdown_2.click();
        console.log("21 - Bouton showdown 2 cliqué");
        const successRegistrationMsgElement_showdown_2 = await driver.wait(until.elementLocated(By.css('div.alert-success > p')), 6000);
        const successMsg_showdown_2 = await successRegistrationMsgElement_showdown_2.getText(); //Sans Await, j'ai le Promise, et ca plante
        console.log(`Success message : "${successMsg_showdown_2}"`);
        strictEqual(successMsg_showdown_2, 'The showdown has been registered !', 'Success msg not ok...');
        console.log("22 - Quarterfinal match 2 inserted !");

        // ----------------------------------- Enter quarter final showdown - THIRD Quarter -----------------------------
        const successButtonElement_showdown_3 = await driver.wait(
            until.elementLocated((By.css('button.btn-success'))),
            3000 // Le temps d'attente maximum en millisecondes
        );
        console.log("23 - L'élément button.btn-success est localisé");

        await driver.wait(until.elementIsVisible(successButtonElement_showdown_3), 3000);
        console.log("24 - L'élément est visible");

        await driver.wait(until.elementLocated(By.id('tennis_match_playerOne')), 3000);
        const listPlayerOne_match3 = await driver.findElement(By.id('tennis_match_playerOne'));
        const option_match3 = await listPlayerOne_match3.findElement(By.xpath("./option[text()='Matteo BERRETTINI']"));
        await option_match3.click();
        console.log("25 - L'option 'Matteo BERRETTINI' a été sélectionnée avec succès.");

        await driver.wait(until.elementLocated(By.id('tennis_match_playerTwo')), 3000);
        const listPlayerTwo_match3 = await driver.findElement(By.id('tennis_match_playerTwo'));
        const option2_match3 = await listPlayerTwo_match3.findElement(By.xpath("./option[text()='Casper RUUD']"));
        await option2_match3.click();
        console.log("26 - L'option 'Casper RUUD' a été sélectionnée avec succès.");

        await successButtonElement_showdown_3.click();
        console.log("27 - Bouton showdown 3 cliqué");
        const successRegistrationMsgElement_showdown_3 = await driver.wait(until.elementLocated(By.css('div.alert-success > p')), 6000);
        const successMsg_showdown_3 = await successRegistrationMsgElement_showdown_3.getText(); //Sans Await, j'ai le Promise, et ca plante
        console.log(`Success message : "${successMsg_showdown_3}"`);
        strictEqual(successMsg_showdown_3, 'The showdown has been registered !', 'Success msg not ok...');
        console.log("28 - Quarterfinal match 3 inserted !");

        // ----------------------------------- Enter quarter final showdown - FOURTH Quarter -----------------------------
        const successButtonElement_showdown_4 = await driver.wait(
            until.elementLocated((By.css('button.btn-success'))),
            3000 // Le temps d'attente maximum en millisecondes
        );
        console.log("29 - L'élément button.btn-success est localisé");

        await driver.wait(until.elementIsVisible(successButtonElement_showdown_4), 3000);
        console.log("30 - L'élément est visible");

        await driver.wait(until.elementLocated(By.id('tennis_match_playerOne')), 3000);
        const listPlayerOne_match4 = await driver.findElement(By.id('tennis_match_playerOne'));
        const option_match4 = await listPlayerOne_match4.findElement(By.xpath("./option[text()='Hubert HURKACZ']"));
        await option_match4.click();
        console.log("31 - L'option 'Hubert HURKACZ' a été sélectionnée avec succès.");

        await driver.wait(until.elementLocated(By.id('tennis_match_playerTwo')), 3000);
        const listPlayerTwo_match4 = await driver.findElement(By.id('tennis_match_playerTwo'));
        const option2_match4 = await listPlayerTwo_match4.findElement(By.xpath("./option[text()='Felix AUGER-ALIASSIME']"));
        await option2_match4.click();
        console.log("32 - L'option 'Felix AUGER-ALIASSIME' a été sélectionnée avec succès.");

        await successButtonElement_showdown_4.click();
        console.log("33 - Bouton showdown 4 cliqué");
        const successRegistrationMsgElement_showdown_4 = await driver.wait(until.elementLocated(By.css('div.alert-success > p')), 6000);
        const successMsg_showdown_4 = await successRegistrationMsgElement_showdown_4.getText(); //Sans Await, j'ai le Promise, et ca plante
        console.log(`Success message : "${successMsg_showdown_4}"`);
        strictEqual(successMsg_showdown_4, 'The showdown has been registered !', 'Success msg not ok...');
        console.log("34 - Quarterfinal match 4 inserted !");

        // ----------------------------- ENTER QUARTERFINALS BET DEAD LINE ---------------------------------
        const URL_ADMIN_QUARTERFINAL_DEADLINE = 'http://127.0.0.1:8000/admin/quarterfinals-deadline';
        await driver.get(URL_ADMIN_QUARTERFINAL_DEADLINE);
        console.log("35 - Forced navigation toward quarter finals bet dead line administration");

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
        console.log(`36 - La date et l'heure "${formattedDateTime}" ont été renseignées.`);

        //Valider la dead line
        await successButton_deadline.click();
        const successRegistrationDeadLine = await driver.wait(until.elementLocated(By.css('div.alert-success > p')), 6000);
        const successMsg_deadline = await successRegistrationDeadLine.getText(); //Sans Await, j'ai le Promise, et ca plante
        console.log(`37 - Message succes : "${successMsg_deadline}"`);
        strictEqual(successMsg_deadline, 'The deadline has been registered !', 'Le message de succès ne correspond pas');
        console.log("38 - Quarter Finals bet dead line inserted !");

    } catch (error) {
        console.log("Erreur - Catch");
        console.error('Test failed. Error details:', error);
    } finally {
        // await driver.sleep(5000); //Ca me permet de voir l'état final avant la suppression de l'instance de chrome
        // await driver.quit();
    }
}

module.exports = { runTest16 };

// runTest15();