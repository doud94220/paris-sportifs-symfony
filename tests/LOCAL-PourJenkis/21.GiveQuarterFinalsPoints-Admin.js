const { Builder, By, Key, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');

async function runTest21(driver, BASE_URL) {

    //Attendre et récuperer les msgs Flash (msgs de confirmation en vert)
    async function waitFlashSuccess(driver, {
        // locator = By.css("div.alert-success > p, .alert, .alert-success, .alert-info, [role='alert'], .toast, .toast-body, .notification, .flash, .flash-message"),
        locator = By.css("div.alert-success > p"),
        // expectedText = 'The match result has been registered !',
        expectedText = null,
        timeout = 12000,
        pollMs = 200
    } = {}) {
        const deadline = Date.now() + timeout;
        let lastErr;

        while (Date.now() < deadline) {
            try {
                // (re)localise à chaque boucle -> évite les références périmées
                const el = await driver.findElement(locator);

                // Visible ?
                if (await el.isDisplayed()) {
                    const raw = await el.getText();

                    // ✅ Essaie de prendre la valeur de la variable raw
                    // ❌ Si raw est null, undefined, ou une valeur "falsy"(comme '' ou 0), alors à la place, on utilise la chaîne vide ''
                    // ✂️ Puis on appelle.trim() sur le résultat — pour enlever les espaces au début et à la fin
                    const text = (raw || '').trim();

                    if (!expectedText) {
                        // Mode souple : on accepte tout texte non-vide
                        if (text.length > 0) return text;
                    } else {
                        // Mode strict : texte exact attendu
                        if (text === expectedText) return text;
                    }
                }
            } catch (e) {
                // On ignore NoSuchElement et StaleElement et on re-tente
                if (e.name !== 'NoSuchElementError' && e.name !== 'StaleElementReferenceError') {
                    throw e;
                }
                lastErr = e;
            }
            await driver.sleep(pollMs);
        }

        // Rien trouvé dans le temps imparti
        await debugAlerts(driver);
        throw lastErr ?? new Error('Timeout waiting for success flash');
    }

    //Go to the fourth round admin page and launch the points attribution
    // const ADMIN_QUARTERFINAL = 'http://127.0.0.1:8000/admin/quarterfinals?round=quaterfinals';
    const ADMIN_QUARTERFINAL = `${BASE_URL}/admin/quarterfinals?round=quaterfinals`;
    await driver.get(ADMIN_QUARTERFINAL);
    console.log("7 - Navigation forcée vers la page d'admin des 1/4 de finale");

    const adminAttributionPointsLink = await driver.wait(until.elementLocated(By.css('div#container-admin > ul > li:nth-child(4) > a')), 3000);
    console.log("8");

    const adminAttributionPointsLink_Element = await driver.findElement(By.css('div#container-admin > ul > li:nth-child(4) > a'));
    await adminAttributionPointsLink_Element.click();

    // const successAdminAttributionPointsElement = await driver.wait(until.elementLocated(By.css('div.alert-success > p')), 3000);
    // const successMsg_AdminAttributionPoints = await successAdminAttributionPointsElement.getText();
    const msgSuccess = await waitFlashSuccess(driver);

    console.log(`9 - Message succes : "${msgSuccess}"`);
    strictEqual(msgSuccess, 'The points are attributed for the Quarter Finals !', 'Le message de succès ne correspond pas...');
    console.log("10 - Quartefinal attribution points has been launched !");
}

module.exports = { runTest21 };
