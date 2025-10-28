const { Builder, By, Key, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');

async function runTest31(driver, BASE_URL) {

    //Go to the fourth round admin page and launch the points attribution
    // const ADMIN_SEMIFINAL = 'http://127.0.0.1:8000/admin/semifinals?round=semifinals';
    const ADMIN_SEMIFINAL = `${BASE_URL}/admin/semifinals?round=semifinals`;
    await driver.get(ADMIN_SEMIFINAL);
    console.log("7 - Navigation forcée vers la page d'admin des 1/2 de finale");

    const adminAttributionPointsLink = await driver.wait(until.elementLocated(By.css('div#container-admin > ul > li:nth-child(4) > a')), 3000);
    console.log("8");

    const adminAttributionPointsLink_Element = await driver.findElement(By.css('div#container-admin > ul > li:nth-child(4) > a'));
    await adminAttributionPointsLink_Element.click();

    const successAdminAttributionPointsElement = await driver.wait(until.elementLocated(By.css('div.alert-success > p')), 3000);
    const successMsg_AdminAttributionPoints = await successAdminAttributionPointsElement.getText();
    console.log(`9 - Message succes : "${successMsg_AdminAttributionPoints}"`);
    strictEqual(successMsg_AdminAttributionPoints, 'The points are attributed for the Semi Finals !', 'Le message de succès ne correspond pas...');
}

module.exports = { runTest31 };