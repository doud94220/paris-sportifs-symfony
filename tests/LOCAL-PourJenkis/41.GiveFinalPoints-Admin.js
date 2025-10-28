const { Builder, By, Key, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');

async function runTest41(driver, BASE_URL) {

    //Go to the final admin page and launch the points attribution
    // const ADMIN_SEMIFINAL = 'http://127.0.0.1:8000/admin/final?round=final';
    const ADMIN_SEMIFINAL = `${BASE_URL}/admin/final?round=final`;
    await driver.get(ADMIN_SEMIFINAL);
    console.log("7 - Navigation forcée vers la page d'admin de la finale");

    const adminAttributionPointsLink = await driver.wait(until.elementLocated(By.css('div#container-admin > ul > li:nth-child(4) > a')), 3000);
    console.log("8");

    const adminAttributionPointsLink_Element = await driver.findElement(By.css('div#container-admin > ul > li:nth-child(4) > a'));
    await adminAttributionPointsLink_Element.click();

    //Verify success msg
    const successAdminAttributionPointsElement = await driver.wait(until.elementLocated(By.css('div.alert-success > p')), 3000);
    const successMsg_AdminAttributionPoints = await successAdminAttributionPointsElement.getText();
    console.log(`9 - Message succes : "${successMsg_AdminAttributionPoints}"`);
    strictEqual(successMsg_AdminAttributionPoints, 'The points are attributed for the Final !', 'Le message de succès ne correspond pas...');
    console.log("10 - Final attribution points is done !");
}

module.exports = { runTest41 };