const { Builder, By, Key, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');

async function runTest5(driver, BASE_URL) {
    // let driver = await new Builder().forBrowser('chrome').build();

    //Fonction qui crée une pause de ms millisecondes ⏱️ avant de reprendre le code. Elle retourne cette promesse, qu'on peut "await"
    function sleep(ms) {
        //Enveloppe ce timer dans une promesse et la retourne
        return new Promise(
            //Lance un timer qui attend ms millisecondes, puis appelle resolve()
            resolve => setTimeout(resolve, ms)
        );
    }

    // ----------------------------- Renseigner affiche 8ème finale - PREMIER 8ème ---------------------------------

    console.log("7");
    //Clicker sur le lien Admin en haut de page
    const adminLink = await driver.wait(until.elementLocated(By.css('ul > li:nth-child(6) > a.nav-link')), 3000);
    await adminLink.click();
    console.log("8");

    const URL_ADMIN_FOURTHROUND = `${BASE_URL}/admin/fourthround`;
    await driver.get(URL_ADMIN_FOURTHROUND);
    console.log("10 - Navigation forcée vers la page d'admin des 8èmes de finale");

    //Renseigner affiche 8ème finale - Premier 8ème
    const URL_ADMIN_FOURTHROUND_SHOWDONNS = `${BASE_URL}/admin/fourthround-showdowns/1`;
    await driver.get(URL_ADMIN_FOURTHROUND_SHOWDONNS);
    console.log("11 - Navigation forcée vers la page d'admin des confrontations des 8èmes de finale - Page 1");

    const successButton_showdown_1 = await driver.wait(
        until.elementLocated((By.css('button.btn-success'))),
        3000 // Le temps d'attente maximum en millisecondes
    );
    console.log("13 - L'élément button.btn-success est localisé enfin !!!!!");

    await driver.wait(until.elementIsVisible(successButton_showdown_1), 3000);
    console.log("14 - L'élément est visible");

    await driver.wait(until.elementLocated(By.id('tennis_match_playerOne')), 3000);
    const listPlayerOne = await driver.findElement(By.id('tennis_match_playerOne'));
    const option = await listPlayerOne.findElement(By.xpath("./option[text()='Novak DJOKOVIC']"));
    await option.click();
    console.log("15 - L'option 'Novak DJOKOVIC' a été sélectionnée avec succès.");

    await driver.wait(until.elementLocated(By.id('tennis_match_playerTwo')), 3000);
    const listPlayerTwo = await driver.findElement(By.id('tennis_match_playerTwo'));
    const option2 = await listPlayerTwo.findElement(By.xpath("./option[text()='Rafael NADAL']"));
    await option2.click();
    console.log("16 - L'option 'Rafael NADAL' a été sélectionnée avec succès.");

    await successButton_showdown_1.click();
    console.log("17 - Bouton showdown 1 cliqué");
    const successRegistrationMsgElement_showdown_1 = await driver.wait(until.elementLocated(By.css('div.alert-success > p')), 6000);
    const successMsg_showdown_1 = await successRegistrationMsgElement_showdown_1.getText(); //Sans Await, j'ai le Promise, et ca plante
    console.log(`Message succes : "${successMsg_showdown_1}"`);
    strictEqual(successMsg_showdown_1, 'The showdown has been registered !', 'Le message de succès ne correspond pas');
    console.log("18 - Match 1 des 8ème inséré !");

    // ----------------------------- Renseigner affiche 8ème finale - DEUXIEME 8ème ---------------------------------

    const successButton_showdown_2 = await driver.wait(
        until.elementLocated((By.css('button.btn-success'))),
        3000 // Le temps d'attente maximum en millisecondes
    );

    await driver.wait(until.elementLocated(By.id('tennis_match_playerOne')), 3000);
    const listPlayerOne_showdown_2 = await driver.findElement(By.id('tennis_match_playerOne'));
    const option1_showdown_2 = await listPlayerOne_showdown_2.findElement(By.xpath("./option[text()='Roger FEDERER']"));
    await option1_showdown_2.click();
    console.log("19");

    await driver.wait(until.elementLocated(By.id('tennis_match_playerTwo')), 3000);
    const listPlayerTwo_showdown_2 = await driver.findElement(By.id('tennis_match_playerTwo'));
    const option2_showdown_2 = await listPlayerTwo_showdown_2.findElement(By.xpath("./option[text()='Daniil MEDVEDEV']"));
    await option2_showdown_2.click();
    console.log("20");

    await successButton_showdown_2.click();
    console.log("21-1 (clic effectué)");

    // Donne du temps au DOM pour se mettre à jour
    await sleep(2000);

    // Debug : regarde le HTML visible
    const htmlSnippet = await driver.getPageSource();
    console.log("🧩 Extrait du HTML :", htmlSnippet.slice(0, 800));

    const successRegistrationMsgElement_showdown_2 = await driver.wait(
        until.elementLocated(By.css('div.alert-success > p')),
        10000
    );
    await driver.wait(
        until.elementIsVisible(successRegistrationMsgElement_showdown_2),
        10000
    );
    console.log("21-2");

    // Récupérer le texte directement, sans stocker l'élément dans une variable intermédiaire pour l'action getText()
    const successMsg_showdown_2 = successRegistrationMsgElement_showdown_2.getText();
    console.log("21-3");

    console.log(`Message succes : "${successMsg_showdown_2}"`);
    console.log("21-4");
    strictEqual(successMsg_showdown_2, 'The showdown has been registered !', 'Le message de succès ne correspond pas');
    console.log("21-5 - Match 2 des 8ème inséré !");

    // ----------------------------- Renseigner affiche 8ème finale - TROISIEME 8ème ---------------------------------

    const successButton_showdown_3 = await driver.wait(
        until.elementLocated((By.css('button.btn-success'))),
        3000 // Le temps d'attente maximum en millisecondes
    );
    console.log("21-2 - Bouton localisé");

    await driver.wait(until.elementLocated(By.id('tennis_match_playerOne')), 3000);
    console.log("21-3 - Select Player One localisé");
    const listPlayerOne_showdown_3 = await driver.findElement(By.id('tennis_match_playerOne'));
    const option1_showdown_3 = await listPlayerOne_showdown_3.findElement(By.xpath("./option[text()='Stefanos TSITSIPAS']"));
    await option1_showdown_3.click();
    console.log("22");

    await driver.wait(until.elementLocated(By.id('tennis_match_playerTwo')), 3000);
    const listPlayerTwo_showdown_3 = await driver.findElement(By.id('tennis_match_playerTwo'));
    const option2_showdown_3 = await listPlayerTwo_showdown_3.findElement(By.xpath("./option[text()='Alexander ZVEREV']"));
    await option2_showdown_3.click();
    console.log("23");

    await successButton_showdown_3.click();
    console.log("là");
    const successRegistrationMsgElement_showdown_3 = await driver.wait(until.elementLocated(By.css('div.alert-success > p')), 6000);
    console.log("ici");
    const successMsg_showdown_3 = await successRegistrationMsgElement_showdown_3.getText(); //Sans Await, j'ai le Promise, et ca plante
    console.log("par là");
    console.log(`Message succes : "${successMsg_showdown_3}"`);
    strictEqual(successMsg_showdown_3, 'The showdown has been registered !', 'Le message de succès ne correspond pas');
    console.log("24 - Match 3 des 8ème inséré !");

    // ----------------------------- Renseigner affiche 8ème finale - QUATRIEME 8ème ---------------------------------

    const successButton_showdown_4 = await driver.wait(
        until.elementLocated((By.css('button.btn-success'))),
        3000 // Le temps d'attente maximum en millisecondes
    );

    await driver.wait(until.elementLocated(By.id('tennis_match_playerOne')), 3000);
    const listPlayerOne_showdown_4 = await driver.findElement(By.id('tennis_match_playerOne'));
    const option1_showdown_4 = await listPlayerOne_showdown_4.findElement(By.xpath("./option[text()='Dominic THIEM']"));
    await option1_showdown_4.click();
    console.log("25");

    await driver.wait(until.elementLocated(By.id('tennis_match_playerTwo')), 3000);
    const listPlayerTwo_showdown_4 = await driver.findElement(By.id('tennis_match_playerTwo'));
    const option2_showdown_4 = await listPlayerTwo_showdown_4.findElement(By.xpath("./option[text()='Andrey RUBLEV']"));
    await option2_showdown_4.click();
    console.log("26");

    await successButton_showdown_4.click();
    const successRegistrationMsgElement_showdown_4 = await driver.wait(until.elementLocated(By.css('div.alert-success > p')), 6000);
    const successMsg_showdown_4 = await successRegistrationMsgElement_showdown_4.getText(); //Sans Await, j'ai le Promise, et ca plante
    console.log(`Message succes : "${successMsg_showdown_4}"`);
    strictEqual(successMsg_showdown_4, 'The showdown has been registered !', 'Le message de succès ne correspond pas');
    console.log("27 - Match 4 des 8ème inséré !");

    // ----------------------------- Renseigner affiche 8ème finale - CINQUIEME 8ème ---------------------------------

    const successButton_showdown_5 = await driver.wait(
        until.elementLocated((By.css('button.btn-success'))),
        3000 // Le temps d'attente maximum en millisecondes
    );

    await driver.wait(until.elementLocated(By.id('tennis_match_playerOne')), 3000);
    const listPlayerOne_showdown_5 = await driver.findElement(By.id('tennis_match_playerOne'));
    const option1_showdown_5 = await listPlayerOne_showdown_5.findElement(By.xpath("./option[text()='Matteo BERRETTINI']"));
    await option1_showdown_5.click();
    console.log("28");

    await driver.wait(until.elementLocated(By.id('tennis_match_playerTwo')), 3000);
    const listPlayerTwo_showdown_5 = await driver.findElement(By.id('tennis_match_playerTwo'));
    const option2_showdown_5 = await listPlayerTwo_showdown_5.findElement(By.xpath("./option[text()='Denis SHAPOVALOV']"));
    await option2_showdown_5.click();
    console.log("29");

    await successButton_showdown_5.click();
    const successRegistrationMsgElement_showdown_5 = await driver.wait(until.elementLocated(By.css('div.alert-success > p')), 6000);
    const successMsg_showdown_5 = await successRegistrationMsgElement_showdown_5.getText(); //Sans Await, j'ai le Promise, et ca plante
    console.log(`Message succes : "${successMsg_showdown_5}"`);
    strictEqual(successMsg_showdown_5, 'The showdown has been registered !', 'Le message de succès ne correspond pas');
    console.log("30 - Match 5 des 8ème inséré !");

    // ----------------------------- Renseigner affiche 8ème finale - SIXIEME 8ème ---------------------------------

    const successButton_showdown_6 = await driver.wait(
        until.elementLocated((By.css('button.btn-success'))),
        3000 // Le temps d'attente maximum en millisecondes
    );

    await driver.wait(until.elementLocated(By.id('tennis_match_playerOne')), 3000);
    const listPlayerOne_showdown_6 = await driver.findElement(By.id('tennis_match_playerOne'));
    const option1_showdown_6 = await listPlayerOne_showdown_6.findElement(By.xpath("./option[text()='Casper RUUD']"));
    await option1_showdown_6.click();
    console.log("31");

    await driver.wait(until.elementLocated(By.id('tennis_match_playerTwo')), 3000);
    const listPlayerTwo_showdown_6 = await driver.findElement(By.id('tennis_match_playerTwo'));
    const option2_showdown_6 = await listPlayerTwo_showdown_6.findElement(By.xpath("./option[text()='Pablo CARRENO BUSTA']"));
    await option2_showdown_6.click();
    console.log("32");

    const successButton_showdown_6_2 = await driver.wait(
        until.elementLocated((By.css('button.btn-success'))),
        3000 // Le temps d'attente maximum en millisecondes
    );

    await successButton_showdown_6_2.click();
    const successRegistrationMsgElement_showdown_6 = await driver.wait(until.elementLocated(By.css('div.alert-success > p')), 6000);
    const successMsg_showdown_6 = await successRegistrationMsgElement_showdown_6.getText(); //Sans Await, j'ai le Promise, et ca plante
    console.log(`Message succes : "${successMsg_showdown_6}"`);
    strictEqual(successMsg_showdown_6, 'The showdown has been registered !', 'Le message de succès ne correspond pas');
    console.log("33 - Match 6 des 8ème inséré !");

    // ----------------------------- Renseigner affiche 8ème finale - SEPTIEME 8ème ---------------------------------

    const successButton_showdown_7 = await driver.wait(
        until.elementLocated((By.css('button.btn-success'))),
        3000 // Le temps d'attente maximum en millisecondes
    );

    await driver.wait(until.elementLocated(By.id('tennis_match_playerOne')), 3000);
    const listPlayerOne_showdown_7 = await driver.findElement(By.id('tennis_match_playerOne'));
    const option1_showdown_7 = await listPlayerOne_showdown_7.findElement(By.xpath("./option[text()='Hubert HURKACZ']"));
    await option1_showdown_7.click();
    console.log("34");

    await driver.wait(until.elementLocated(By.id('tennis_match_playerTwo')), 3000);
    const listPlayerTwo_showdown_7 = await driver.findElement(By.id('tennis_match_playerTwo'));
    const option2_showdown_7 = await listPlayerTwo_showdown_7.findElement(By.xpath("./option[text()='Diego SCHWARTZMAN']"));
    await option2_showdown_7.click();
    console.log("35");

    await successButton_showdown_7.click();
    const successRegistrationMsgElement_showdown_7 = await driver.wait(until.elementLocated(By.css('div.alert-success > p')), 6000);
    const successMsg_showdown_7 = await successRegistrationMsgElement_showdown_7.getText(); //Sans Await, j'ai le Promise, et ca plante
    console.log(`Message succes : "${successMsg_showdown_7}"`);
    strictEqual(successMsg_showdown_7, 'The showdown has been registered !', 'Le message de succès ne correspond pas');
    console.log("36 - Match 7 des 8ème inséré !");

    // ----------------------------- Renseigner affiche 8ème finale - HUITIEME 8ème ---------------------------------

    const successButton_showdown_8 = await driver.wait(
        until.elementLocated((By.css('button.btn-success'))),
        3000 // Le temps d'attente maximum en millisecondes
    );

    await driver.wait(until.elementLocated(By.id('tennis_match_playerOne')), 3000);
    const listPlayerOne_showdown_8 = await driver.findElement(By.id('tennis_match_playerOne'));
    const option1_showdown_8 = await listPlayerOne_showdown_8.findElement(By.xpath("./option[text()='Felix AUGER-ALIASSIME']"));
    await option1_showdown_8.click();
    console.log("37");

    await driver.wait(until.elementLocated(By.id('tennis_match_playerTwo')), 3000);
    const listPlayerTwo_showdown_8 = await driver.findElement(By.id('tennis_match_playerTwo'));
    const option2_showdown_8 = await listPlayerTwo_showdown_8.findElement(By.xpath("./option[text()='Jannik SINNER']"));
    await option2_showdown_8.click();
    console.log("38");

    await successButton_showdown_8.click();
    const successRegistrationMsgElement_showdown_8 = await driver.wait(until.elementLocated(By.css('div.alert-success > p')), 6000);
    const successMsg_showdown_8 = await successRegistrationMsgElement_showdown_8.getText(); //Sans Await, j'ai le Promise, et ca plante
    console.log(`Message succes : "${successMsg_showdown_8}"`);
    strictEqual(successMsg_showdown_8, 'The showdown has been registered !', 'Le message de succès ne correspond pas');
    console.log("39 - Match 8 des 8ème inséré !");

    // ----------------------------- Renseigner DEAD LINE des 8ème ---------------------------------
    const URL_ADMIN_FOURTHROUND_DEADLINE = `${BASE_URL}/admin/fourthround-deadline`;
    await driver.get(URL_ADMIN_FOURTHROUND_DEADLINE);
    console.log("40 - Navigation forcée vers la page d'admin de la DEAD LINE des 8èmes de finale");

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
    console.log(`41 - La date et l'heure "${formattedDateTime}" ont été renseignées.`);

    //Valider la dead line
    await successButton_deadline.click();
    const successRegistrationDeadLine = await driver.wait(until.elementLocated(By.css('div.alert-success > p')), 6000);
    const successMsg_deadline = await successRegistrationDeadLine.getText(); //Sans Await, j'ai le Promise, et ca plante
    console.log(`Message succes : "${successMsg_deadline}"`);
    strictEqual(successMsg_deadline, 'The deadline has been registered !', 'Le message de succès ne correspond pas');
    console.log("42 - Deadline des 8 des 8ème insérée !");
}

module.exports = { runTest5 };
