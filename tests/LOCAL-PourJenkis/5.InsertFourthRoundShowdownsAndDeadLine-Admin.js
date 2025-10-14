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

    //Fonction qui factorise des étapes faites 8 fois (une par match)
    async function waitForSuccessMessage(
        driver,
        expectedMessage = 'The showdown has been registered !',
        timeout = 8000
    ) {
        const locator = By.css('div.alert-success');

        // 1) Attendre qu'un alert-success apparaisse quelque part
        await driver.wait(until.elementLocated(locator), timeout);

        // 2) Polling: à chaque essai on RE-trouve l'élément, on vérifie visible + texte
        await driver.wait(async () => {
            try {
                const el = await driver.findElement(locator);  // re-find à chaque poll
                const visible = await el.isDisplayed();
                if (!visible) return false;

                const text = (await el.getText()).trim();
                return expectedMessage ? text === expectedMessage : text.length > 0;
            } catch (e) {
                // Si le DOM s'est rerendu → handle stale → on réessaie
                if (e.name === 'StaleElementReferenceError' || /stale element/i.test(e.message)) {
                    return false;
                }
                throw e; // autre erreur → on arrête l'attente
            }
        }, timeout, 'Success message not visible with expected text');

        // 3) Une dernière lecture propre du texte (ré-loc encore une fois)
        const finalText = (await (await driver.findElement(locator)).getText()).trim();
        console.log(`✅ Message de succès détecté : "${finalText}"`);
        return finalText;
    }

    // ----------------------------- Renseigner affiche 8ème finale - PREMIER 8ème ---------------------------------

    console.log("1");
    //Clicker sur le lien Admin en haut de page
    const adminLink = await driver.wait(until.elementLocated(By.css('ul > li:nth-child(6) > a.nav-link')), 3000);
    await adminLink.click();
    console.log("2");

    const URL_ADMIN_FOURTHROUND = `${BASE_URL}/admin/fourthround`;
    await driver.get(URL_ADMIN_FOURTHROUND);
    console.log("3 - Navigation forcée vers la page d'admin des 8èmes de finale");

    //Renseigner affiche 8ème finale - Premier 8ème
    const URL_ADMIN_FOURTHROUND_SHOWDONNS = `${BASE_URL}/admin/fourthround-showdowns/1`;
    await driver.get(URL_ADMIN_FOURTHROUND_SHOWDONNS);
    console.log("4 - Navigation forcée vers la page d'admin des confrontations des 8èmes de finale - Page 1");

    const successButton_showdown_1 = await driver.wait(
        until.elementLocated((By.css('button.btn-success'))),
        3000 // Le temps d'attente maximum en millisecondes
    );
    console.log("5 - L'élément button.btn-success est localisé enfin !!!!!");

    await driver.wait(until.elementIsVisible(successButton_showdown_1), 3000);
    console.log("6 - L'élément est visible");

    const playerOne = await driver.findElement(By.id('tennis_match_playerOne'));
    const option1 = await playerOne.findElement(By.xpath("./option[text()='Novak DJOKOVIC']"));
    await option1.click();
    console.log("7 - L'option 'Novak DJOKOVIC' a été sélectionnée avec succès.");

    const playerTwo = await driver.findElement(By.id('tennis_match_playerTwo'));
    const option2 = await playerTwo.findElement(By.xpath("./option[text()='Rafael NADAL']"));
    await option2.click();
    console.log("8 - L'option 'Rafael NADAL' a été sélectionnée avec succès.");

    await successButton_showdown_1.click();
    console.log("9 - Bouton showdown 1 cliqué");

    await waitForSuccessMessage(driver);
    console.log("10 - Match 1 des 8ème inséré !");

    // ----------------------------- Renseigner affiche 8ème finale - DEUXIEME 8ème ---------------------------------

    const successButton_showdown_2 = await driver.wait(
        until.elementLocated((By.css('button.btn-success'))),
        3000 // Le temps d'attente maximum en millisecondes
    );

    const playerOne_2 = await driver.findElement(By.id('tennis_match_playerOne'));
    const option1_2 = await playerOne_2.findElement(By.xpath("./option[text()='Roger FEDERER']"));
    await option1_2.click();
    console.log("11 - L'option 'Roger FEDERER' a été sélectionnée avec succès.");

    const playerTwo_2 = await driver.findElement(By.id('tennis_match_playerTwo'));
    const option2_2 = await playerTwo_2.findElement(By.xpath("./option[text()='Daniil MEDVEDEV']"));
    await option2_2.click();
    console.log("12 - L'option 'Daniil MEDVEDEV' a été sélectionnée avec succès.");

    await successButton_showdown_2.click();
    console.log("13 - Clic effectué");

    await waitForSuccessMessage(driver);
    console.log("14 - Match 2 des 8ème inséré !");

    // ----------------------------- Renseigner affiche 8ème finale - TROISIEME 8ème ---------------------------------

    const successButton_showdown_3 = await driver.wait(
        until.elementLocated((By.css('button.btn-success'))),
        3000 // Le temps d'attente maximum en millisecondes
    );
    console.log("15 - Bouton localisé");

    const playerOne_3 = await driver.findElement(By.id('tennis_match_playerOne'));
    const option1_3 = await playerOne_3.findElement(By.xpath("./option[text()='Stefanos TSITSIPAS']"));
    await option1_3.click();
    console.log("16 - L'option 'Stefanos TSITSIPAS' a été sélectionnée avec succès.");

    const playerTwo_3 = await driver.findElement(By.id('tennis_match_playerTwo'));
    const option2_3 = await playerTwo_3.findElement(By.xpath("./option[text()='Alexander ZVEREV']"));
    await option2_3.click();
    console.log("17 - L'option 'Alexander ZVEREV' a été sélectionnée avec succès.");

    await successButton_showdown_3.click();
    console.log("18");

    await waitForSuccessMessage(driver);
    console.log("19 - Match 3 des 8ème inséré !");

    // ----------------------------- Renseigner affiche 8ème finale - QUATRIEME 8ème ---------------------------------

    // Donne du temps au DOM pour se mettre à jour
    await sleep(2000);
    console.log("20");

    const successButton_showdown_4 = await driver.wait(
        until.elementLocated((By.css('button.btn-success'))),
        3000 // Le temps d'attente maximum en millisecondes
    );
    console.log("21");

    const playerOne_4 = await driver.findElement(By.id('tennis_match_playerOne'));
    const option1_4 = await playerOne_4.findElement(By.xpath("./option[text()='Dominic THIEM']"));
    await option1_4.click();
    console.log("22 - L'option 'Dominic THIEM' a été sélectionnée avec succès.");

    const playerTwo_4 = await driver.findElement(By.id('tennis_match_playerTwo'));
    const option2_4 = await playerTwo_4.findElement(By.xpath("./option[text()='Andrey RUBLEV']"));
    await option2_4.click();
    console.log("23 - L'option 'Andrey RUBLEV' a été sélectionnée avec succès.");

    await successButton_showdown_4.click();
    console.log("24");

    await waitForSuccessMessage(driver);
    console.log("25 - Match 4 des 8ème inséré !");

    // ----------------------------- Renseigner affiche 8ème finale - CINQUIEME 8ème ---------------------------------

    const successButton_showdown_5 = await driver.wait(
        until.elementLocated((By.css('button.btn-success'))),
        3000 // Le temps d'attente maximum en millisecondes
    );
    console.log("26");

    const playerOne_5 = await driver.findElement(By.id('tennis_match_playerOne'));
    const option1_5 = await playerOne_5.findElement(By.xpath("./option[text()='Matteo BERRETTINI']"));
    await option1_5.click();
    console.log("27 - L'option 'Matteo BERRETTINI' a été sélectionnée avec succès.");

    const playerTwo_5 = await driver.findElement(By.id('tennis_match_playerTwo'));
    const option2_5 = await playerTwo_5.findElement(By.xpath("./option[text()='Denis SHAPOVALOV']"));
    await option2_5.click();
    console.log("28 - L'option 'Denis SHAPOVALOV' a été sélectionnée avec succès.");

    await successButton_showdown_5.click();
    console.log("29");

    await waitForSuccessMessage(driver);
    console.log("30 - Match 5 des 8ème inséré !");

    // ----------------------------- Renseigner affiche 8ème finale - SIXIEME 8ème ---------------------------------

    const successButton_showdown_6 = await driver.wait(
        until.elementLocated((By.css('button.btn-success'))),
        3000 // Le temps d'attente maximum en millisecondes
    );

    const playerOne_6 = await driver.findElement(By.id('tennis_match_playerOne'));
    const option1_6 = await playerOne_6.findElement(By.xpath("./option[text()='Casper RUUD']"));
    await option1_6.click();
    console.log("31 - L'option 'Casper RUUD' a été sélectionnée avec succès.");

    const playerTwo_6 = await driver.findElement(By.id('tennis_match_playerTwo'));
    const option2_6 = await playerTwo_6.findElement(By.xpath("./option[text()='Pablo CARRENO BUSTA']"));
    await option2_6.click();
    console.log("32 - L'option 'Pablo CARRENO BUSTA' a été sélectionnée avec succès.");

    await successButton_showdown_6.click();
    console.log("33");

    await waitForSuccessMessage(driver);
    console.log("34 - Match 6 des 8ème inséré !");

    // ----------------------------- Renseigner affiche 8ème finale - SEPTIEME 8ème ---------------------------------

    const successButton_showdown_7 = await driver.wait(
        until.elementLocated((By.css('button.btn-success'))),
        3000 // Le temps d'attente maximum en millisecondes
    );

    const playerOne_7 = await driver.findElement(By.id('tennis_match_playerOne'));
    const option1_7 = await playerOne_7.findElement(By.xpath("./option[text()='Hubert HURKACZ']"));
    await option1_7.click();
    console.log("35 - L'option 'Hubert HURKACZ' a été sélectionnée avec succès.");

    const playerTwo_7 = await driver.findElement(By.id('tennis_match_playerTwo'));
    const option2_7 = await playerTwo_7.findElement(By.xpath("./option[text()='Diego SCHWARTZMAN']"));
    await option2_7.click();
    console.log("36 - L'option 'Diego SCHWARTZMAN' a été sélectionnée avec succès.");

    await successButton_showdown_7.click();
    console.log("37");

    await waitForSuccessMessage(driver);
    console.log("38 - Match 7 des 8ème inséré !");

    // ----------------------------- Renseigner affiche 8ème finale - HUITIEME 8ème ---------------------------------

    const successButton_showdown_8 = await driver.wait(
        until.elementLocated((By.css('button.btn-success'))),
        3000 // Le temps d'attente maximum en millisecondes
    );

    const playerOne_8 = await driver.findElement(By.id('tennis_match_playerOne'));
    const option1_8 = await playerOne_8.findElement(By.xpath("./option[text()='Felix AUGER-ALIASSIME']"));
    await option1_8.click();
    console.log("39 - L'option 'Felix AUGER-ALIASSIME' a été sélectionnée avec succès.");

    const playerTwo_8 = await driver.findElement(By.id('tennis_match_playerTwo'));
    const option2_8 = await playerTwo_8.findElement(By.xpath("./option[text()='Jannik SINNER']"));
    await option2_8.click();
    console.log("40 - L'option 'Jannik SINNER' a été sélectionnée avec succès.");

    await successButton_showdown_8.click();
    console.log("41");

    await waitForSuccessMessage(driver);
    console.log("42 - Match 8 des 8ème inséré !");

    // ----------------------------- Renseigner DEAD LINE des 8ème ---------------------------------
    const URL_ADMIN_FOURTHROUND_DEADLINE = `${BASE_URL}/admin/fourthround-deadline`;
    await driver.get(URL_ADMIN_FOURTHROUND_DEADLINE);
    console.log("43 - Navigation forcée vers la page d'admin de la DEAD LINE des 8èmes de finale");

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
    console.log(`44 - La date et l'heure "${formattedDateTime}" ont été renseignées.`);

    //Valider la dead line
    await successButton_deadline.click();
    const successRegistrationDeadLine = await driver.wait(until.elementLocated(By.css('div.alert-success > p')), 6000);
    const successMsg_deadline = await successRegistrationDeadLine.getText(); //Sans Await, j'ai le Promise, et ca plante
    console.log(`Message succes : "${successMsg_deadline}"`);
    strictEqual(successMsg_deadline, 'The deadline has been registered !', 'Le message de succès ne correspond pas');
    console.log("45 - Deadline des 8 des 8ème insérée !");
}

module.exports = { runTest5 };
