const { Builder, By, Key, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');

async function runTest21(driver, BASE_URL) {
    //Variables pour la fonction dumpAfterClick()
    const fs = require('fs');
    const path = require('path');

    // Pour voir le CSS en prod
    async function debugAlerts(driver) {
        const candidates = await driver.findElements(
            // By.css("div.alert-success > p, .alert, .alert-success, .alert-info, [role='alert'], .toast, .toast-body, .notification, .flash, .flash-message")
            By.css("div.alert-success > p")
        );
        console.log(`[debugAlerts] found ${candidates.length} candidates`);
        for (let i = 0; i < candidates.length; i++) {
            try {
                const el = candidates[i];
                const tag = await el.getTagName();
                const cls = await el.getAttribute('class');
                const role = await el.getAttribute('role');
                const text = (await el.getText() || '').replace(/\s+/g, ' ').trim();
                console.log(`[debugAlerts] #${i} <${tag} class="${cls}" role="${role}"> -> "${text}"`);
            } catch { }
        }
    }

    //Faire un capture d'écran du DOM
    async function dumpAfterClick(driver, label = 'after-click') {
        const url = await driver.getCurrentUrl();
        const title = await driver.getTitle().catch(() => '');
        console.log(`[dump] url=${url}`);
        console.log(`[dump] title=${title}`);

        // 1) Screenshot
        try {
            const img = await driver.takeScreenshot();
            const file = path.join(process.cwd(), `dump-${label}.png`);
            fs.writeFileSync(file, img, 'base64');
            console.log(`[dump] screenshot saved: ${file}`);
        } catch (e) {
            console.log('[dump] screenshot failed:', e && e.message);
        }

        // 2) Quelques candidats classiques (sans préfixer par 'div')
        try {
            const nodes = await driver.findElements(
                // By.css(".alert, .alert-success, .alert-info, [role='alert'], .toast, .toast-body, .notification, .flash, .flash-message")
                By.css("div.alert-success > p")
            );
            console.log(`[dump] classic candidates count: ${nodes.length}`);
            let idx = 0;
            for (const n of nodes) {
                try {
                    const tag = await n.getTagName();
                    const cls = await n.getAttribute('class');
                    const role = await n.getAttribute('role');
                    const text = ((await n.getText()) || '').replace(/\s+/g, ' ').trim();
                    console.log(`[dump] #${idx++} <${tag} class="${cls}" role="${role}"> -> "${text}"`);
                } catch { }
            }
        } catch (e) {
            console.log('[dump] classic selector scan error:', e && e.message);
        }
    }

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

        ////////// Tempo Debug
        // Donne 200–400 ms au DOM pour peindre le flash éventuel
        await driver.sleep(400);
        // Faire capture d'écran pour voi ce qui se passe en prod
        await dumpAfterClick(driver, 'CaptureDom');

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
