const { Builder, By, Key, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');

async function runTest26(driver, BASE_URL) {

    // ------------------------------------------- ENTER SEMI FINAL SHOWDOWNS --------------------------------------
    console.log("7");
    //Clicker sur le lien Admin en haut de page
    const adminLink = await driver.wait(until.elementLocated(By.css('ul > li:nth-child(6) > a.nav-link')), 3000);
    await adminLink.click();
    console.log("8");

    //const URL_ADMIN_SEMIFINAL = 'http://127.0.0.1:8000/admin/semifinals?round=semifinals';
    const URL_ADMIN_SEMIFINAL = `${BASE_URL}/admin/semifinals?round=semifinals`;
    await driver.get(URL_ADMIN_SEMIFINAL);
    console.log("9 - Forced navigation toward semi final admin page");

    // ----------------------------------- Enter semi final showdown - FIRST semi -----------------------------
    // const URL_ADMIN_SEMIFINAL_SHOWDONNS = 'http://127.0.0.1:8000/admin/semifinals-showdowns/1';
    const URL_ADMIN_SEMIFINAL_SHOWDONNS = `${BASE_URL}/admin/semifinals-showdowns/1`;
    await driver.get(URL_ADMIN_SEMIFINAL_SHOWDONNS);
    console.log("10 - Forced navigation toward semi final showdown admin page 1");

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
    const option2 = await listPlayerTwo.findElement(By.xpath("./option[text()='Stefanos TSITSIPAS']"));
    await option2.click();
    console.log("14 - L'option 'Stefanos TSITSIPAS' a été sélectionnée avec succès.");

    await successButtonElement_showdown_1.click();
    console.log("15 - Bouton showdown 1 cliqué");
    const successRegistrationMsgElement_showdown_1 = await driver.wait(until.elementLocated(By.css('div.alert-success > p')), 6000);
    const successMsg_showdown_1 = await successRegistrationMsgElement_showdown_1.getText(); //Sans Await, j'ai le Promise, et ca plante
    console.log(`Success message : "${successMsg_showdown_1}"`);
    strictEqual(successMsg_showdown_1, 'The showdown has been registered !', 'Success msg not ok...');
    console.log("16 - Semifinal match 1 inserted !");

    // ----------------------------------- Enter semi final showdown - SECOND semi -----------------------------
    const successButtonElement_showdown_2 = await driver.wait(
        until.elementLocated((By.css('button.btn-success'))),
        3000 // Le temps d'attente maximum en millisecondes
    );
    console.log("17 - L'élément button.btn-success est localisé");

    await driver.wait(until.elementIsVisible(successButtonElement_showdown_2), 3000);
    console.log("18 - L'élément est visible");

    await driver.wait(until.elementLocated(By.id('tennis_match_playerOne')), 3000);
    const listPlayerOne_match2 = await driver.findElement(By.id('tennis_match_playerOne'));
    const option_match2 = await listPlayerOne_match2.findElement(By.xpath("./option[text()='Casper RUUD']"));
    await option_match2.click();
    console.log("19 - L'option 'Casper RUUD' a été sélectionnée avec succès.");

    await driver.wait(until.elementLocated(By.id('tennis_match_playerTwo')), 3000);
    const listPlayerTwo_match2 = await driver.findElement(By.id('tennis_match_playerTwo'));
    const option2_match2 = await listPlayerTwo_match2.findElement(By.xpath("./option[text()='Hubert HURKACZ']"));
    await option2_match2.click();
    console.log("20 - L'option 'Hubert HURKACZ' a été sélectionnée avec succès.");

    await successButtonElement_showdown_2.click();
    console.log("21 - Bouton showdown 2 cliqué");
    const successRegistrationMsgElement_showdown_2 = await driver.wait(until.elementLocated(By.css('div.alert-success > p')), 6000);
    const successMsg_showdown_2 = await successRegistrationMsgElement_showdown_2.getText(); //Sans Await, j'ai le Promise, et ca plante
    console.log(`Success message : "${successMsg_showdown_2}"`);
    strictEqual(successMsg_showdown_2, 'The showdown has been registered !', 'Success msg not ok...');
    console.log("22 - Semifinal match 2 inserted !");

    // ----------------------------- ENTER SEMIFINALS BET DEAD LINE ---------------------------------
    // const URL_ADMIN_SEMIFINAL_DEADLINE = 'http://127.0.0.1:8000/admin/semifinals-deadline';
    const URL_ADMIN_SEMIFINAL_DEADLINE = `${BASE_URL}/admin/semifinals-deadline`;
    await driver.get(URL_ADMIN_SEMIFINAL_DEADLINE);
    console.log("23 - Forced navigation toward semi finals bet dead line administration");

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
    console.log(`24 - La date et l'heure "${formattedDateTime}" ont été renseignées.`);

    //Valider la dead line
    await successButton_deadline.click();

    //Vérifier le message en haut de la page
    const successRegistrationDeadLine = await driver.wait(until.elementLocated(By.css('div.alert-success > p')), 6000);
    const successMsg_deadline = await successRegistrationDeadLine.getText(); //Sans Await, j'ai le Promise, et ca plante
    console.log(`25 - Message succes : "${successMsg_deadline}"`);
    strictEqual(successMsg_deadline, 'The deadline has been registered !', 'Wrong success message');
    console.log("26 - Semi Finals bet dead line inserted !");
}

module.exports = { runTest26 };