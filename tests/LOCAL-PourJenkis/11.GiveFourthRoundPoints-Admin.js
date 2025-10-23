const { Builder, By, Key, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');

// require('chromedriver');

async function runTest11(driver) {
    // let driver = await new Builder().forBrowser('chrome').build();

    //Go to the fourth round admin page and launch the points attribution
    const ADMIN_FOURTHROUND = 'http://127.0.0.1:8000/admin/fourthround';
    await driver.get(ADMIN_FOURTHROUND);
    console.log("1 - Navigation forcée vers la page d'admin des 8èmes de finale");

    const adminAttributionPointsLink = await driver.wait(until.elementLocated(By.css('div#container-admin > ul > li:nth-child(4) > a')), 3000);
    console.log("2");

    const adminAttributionPointsLink_Element = await driver.findElement(By.css('div#container-admin > ul > li:nth-child(4) > a'));
    await adminAttributionPointsLink_Element.click();

    const successAdminAttributionPointsElement = await driver.wait(until.elementLocated(By.css('div.alert-success > p')), 3000);
    const successMsg_AdminAttributionPoints = await successAdminAttributionPointsElement.getText();
    console.log(`3 - Message succes : "${successMsg_AdminAttributionPoints}"`);
    strictEqual(successMsg_AdminAttributionPoints, 'The points are attributed for the fourthround !', 'Le message de succès ne correspond pas...');
    console.log("4 - Fourth round attribution points has been launched !");
}

module.exports = { runTest11 };
