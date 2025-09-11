// Import des classes et fonctions nécessaires depuis la bibliothèque selenium-webdriver :
/*
    Builder: Permet de créer une instance de WebDriver.
    By: Sert à localiser des éléments sur la page web (par nom, ID, classe, etc.).
    Key: Permet d'envoyer des touches spéciales (comme RETURN pour la touche Entrée).
    until: Contient des conditions qui permettent d'attendre qu'un certain état soit atteint sur la page
    (par exemple, qu'un élément soit visible ou que le titre contienne un texte spécifique).
*/
const { Builder, By, Key, until } = require('selenium-webdriver');

//Charge le pilote (driver) pour le navigateur Chrome, nécessaire pour que Selenium puisse interagir avec lui.
require('chromedriver');

//Définit une fonction asynchrone pour contenir tout le code du test, ce qui permet d'utiliser await pour attendre la fin des opérations de Selenium.
async function runTest() {
    /* Crée une instance du navigateur Chrome et la stocke dans la variable driver. C'est cet objet driver qui servira pour
       toutes les interactions avec le navigateur.*/
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Demande au navigateur d'aller à l'URL de Google.
        await driver.get('https://www.google.com');

        /*  UK :
            Wait for the cookie acceptance button to be located and click it
            Using an ID is generally more reliable than XPath

            FR :
            C'est une instruction d'attente. Elle demande à Selenium d'attendre jusqu'à ce qu'un élément (ici, le bouton d'acceptation des cookies)
            soit localisé sur la page. Il utilise By.className pour le trouver en se basant sur ses classes CSS. Le 15000 est le délai maximal en
            millisecondes (15 secondes) avant que l'attente ne s'arrête avec une erreur (TimeoutError).
        */
        const acceptButton = await driver.wait(
            //until.elementLocated(By.id('L2AGpb')),
            until.elementLocated(By.className('QS5gu sy4vM')),
            //button:nth-child(5)
            //500000
            15000
        );
        //Une fois que le bouton est trouvé, cette ligne simule un clic dessus.
        await acceptButton.click();

        /*  Un autre appel à wait. Cette fois, le code attend que la barre de recherche, qui a pour attribut name la valeur 'q',
            apparaisse sur la page, avec un délai de 10 secondes. */
        const searchBox = await driver.wait(until.elementLocated(By.name('q')), 10000);

        /*  Simule la saisie du texte "Selenium WebDriver" dans la barre de recherche, puis appuie sur la touche Entrée (Key.RETURN) pour
            lancer la recherche. */
        await searchBox.sendKeys('Selenium WebDriver', Key.RETURN);

        /* Attend que le titre de la page des résultats de recherche contienne le texte "Selenium WebDriver", avec un délai de 15 secondes
        C'est une manière de s'assurer que la page des résultats a bien chargé. */
        await driver.wait(until.titleContains('Selenium WebDriver'), 500);

        console.log('Test successful! The page title is correct.');

    } catch (error) {
        console.error('Test failed. Error details:', error);
    } finally {
        await driver.quit();
    }
}

runTest();