#!/usr/bin/env node
/*
 * Munkaeszköz HUB – automatikus tesztfuttató (fej nélküli böngészővel).
 *
 * Futtatás:   node tests/run-tests.js
 * Képernyőképek is:  node tests/run-tests.js --shots <mappa>
 *
 * Előfeltétel: Node.js és a Playwright csomag Chromiummal
 *   (npm i -D playwright && npx playwright install chromium).
 *
 * Mit csinál:
 *   1. Megnyitja az index.html-t, és lefuttatja a beépített tesztcsomagot
 *      (ugyanazt, ami a felületen a Fejlesztő mód → Rendszerállapot → Tesztek futtatása gomb).
 *   2. Valódi böngészős ellenőrzések: nyelv/téma/mód megmarad újratöltés után,
 *      teljes mentési folyamat, export, hibás import, ikonok mindkét témában.
 */
const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');

const FILE = 'file://' + path.resolve(__dirname, '..', 'index.html');
const shotsIdx = process.argv.indexOf('--shots');
const SHOTS = shotsIdx > -1 ? process.argv[shotsIdx + 1] : null;

const results = [];
async function check(name, fn) {
  try { await fn(); results.push({ name, ok: true }); }
  catch (e) { results.push({ name, ok: false, error: e.message.split('\n')[0] }); }
}
function assert(c, m) { if (!c) throw new Error(m || 'assertion failed'); }

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ acceptDownloads: true });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto(FILE);

  // 1. Beépített tesztcsomag
  const suite = await page.evaluate(() => window.MunkaHub.runTests());
  suite.results.forEach(r => results.push({ name: '[beépített] ' + r.name, ok: r.ok, error: r.error }));

  // 2. Böngészős ellenőrzések
  await check('Indulás: angol nyelv, verziószám a láblécben', async () => {
    assert(await page.getAttribute('html', 'lang') === 'en', 'lang');
    assert((await page.textContent('#app-version')).includes('0.1.0'), 'verzió');
    assert((await page.textContent('#tiles')).includes('Empty space count'), 'angol csempe');
  });

  await check('Csempék: 1 működő, 2 "Hamarosan", mindegyiken ikon', async () => {
    assert(await page.locator('.tile.ready').count() === 1);
    assert(await page.locator('.tile.soon').count() === 2);
    assert(await page.locator('.tile .tile-icon svg').count() === 3);
  });

  await check('Értesítési központ: üres állapot', async () => {
    await page.click('#bell-btn');
    assert((await page.textContent('#notif-empty')).trim() === 'No notifications');
    await page.keyboard.press('Escape');
    await page.click('[data-lang="hu"]');
    await page.click('#bell-btn');
    assert((await page.textContent('#notif-empty')).trim() === 'Nincs értesítés');
    await page.keyboard.press('Escape');
    await page.click('[data-lang="en"]');
  });

  await check('Nyelv, téma és mód megmarad újratöltés után', async () => {
    await page.click('[data-lang="uk"]');
    await page.click('[data-theme-opt="dark"]');
    await page.selectOption('#mode-select', 'admin');
    await page.reload();
    assert(await page.getAttribute('html', 'lang') === 'uk', 'nyelv');
    assert(await page.getAttribute('html', 'data-theme') === 'dark', 'téma');
    assert(await page.inputValue('#mode-select') === 'admin', 'mód');
    assert((await page.getAttribute('#mode-indicator', 'data-mode')) === 'admin', 'mód a fejlécben');
    await page.click('[data-theme-opt="system"]');
    await page.reload();
    assert(await page.getAttribute('html', 'data-theme') === null, 'rendszer téma');
  });

  await check('Felhasználó módban a rendszerállapot oldal nem nyílik meg', async () => {
    await page.click('[data-lang="hu"]');
    await page.selectOption('#mode-select', 'user');
    await page.goto(FILE + '#system');
    assert(await page.locator('#sys-table').count() === 0, 'nem szabadna megjelennie');
    assert(await page.locator('#tiles').count() === 1, 'kezdőoldalra irányít');
  });

  await check('Teljes folyamat: bevitel → összeg → mentés → előző napok → felülírás kérdés', async () => {
    await page.click('.tile.ready');
    const inputs = page.locator('input[data-row]');
    const vals = ['3', '0', '7', '2', '1'];
    for (let i = 0; i < 5; i++) await inputs.nth(i).fill(vals[i]);
    assert((await page.textContent('#es-total')).trim() === '13', 'összeg');
    await page.click('#es-save');
    await page.waitForSelector('#es-history .hist-item');
    assert(await page.locator('#es-history .hist-item').count() === 1);
    for (let i = 0; i < 5; i++) await inputs.nth(i).fill('4');
    await page.click('#es-save');
    await page.waitForSelector('#es-confirm-save');
    assert((await page.textContent('.modal')).includes('felülírja'), 'felülírás kérdés');
    await page.click('#es-confirm-save');
    await page.waitForFunction(() => document.querySelector('#es-history .h-total') && document.querySelector('#es-history .h-total').textContent === '20');
    assert(await page.locator('#es-history .hist-item').count() === 1, 'egy nap egy bejegyzés');
    await page.click('#es-history .hist-item');
    assert((await page.textContent('.modal')).includes('A sor'), 'soronkénti bontás');
    await page.keyboard.press('Escape');
  });

  await check('Export fájl letöltése érvényes JSON', async () => {
    await page.click('#es-export');
    const [dl] = await Promise.all([page.waitForEvent('download'), page.click('#es-export-save')]);
    const p = await dl.path();
    const data = JSON.parse(fs.readFileSync(p, 'utf8'));
    assert(data.app === 'munkaeszkoz-hub' && data.days.length === 1 && data.days[0].total === 20);
    assert(/^\d{4}-\d{2}-\d{2}$/.test(data.days[0].date), 'ISO dátum');
    await page.keyboard.press('Escape');
  });

  await check('Hibás import: magyar hibaüzenet, adat változatlan (Admin)', async () => {
    assert(await page.locator('#es-import').count() === 0, 'felhasználó módban nincs import');
    await page.selectOption('#mode-select', 'admin');
    await page.click('#es-import');
    await page.setInputFiles('#es-import-file', { name: 'rossz.json', mimeType: 'application/json', buffer: Buffer.from('{"app":"mas"}') });
    await page.click('#es-import-check');
    await page.waitForSelector('#es-import-error:not([hidden])');
    const msg = await page.textContent('#es-import-error');
    assert(msg.includes('nem ennek az eszköznek'), 'hibaüzenet: ' + msg);
    await page.keyboard.press('Escape');
    assert(await page.locator('#es-history .hist-item').count() === 1, 'adat változatlan: ' + await page.locator('#es-history .hist-item').count());
  });

  await check('Fejlesztő mód: demó adat, tesztek a felületről, demó törlése', async () => {
    await page.selectOption('#mode-select', 'dev');
    await page.click('#es-demo-gen');
    await page.waitForFunction(() => document.querySelectorAll('#es-history .hist-item').length > 1);
    assert(await page.locator('#es-history .chip.demo').count() >= 1, 'demó jelölés');
    await page.click('#es-demo-clear');
    await page.waitForFunction(() => document.querySelectorAll('#es-history .hist-item').length === 1);
    await page.goto(FILE + '#system');
    await page.click('#run-tests');
    await page.waitForSelector('#test-summary');
    const s = await page.textContent('#test-summary');
    assert(/ 0 sikertelen/.test(s), s);
  });

  await check('Ikonok világos és sötét témában láthatók (képernyőkép)', async () => {
    await page.goto(FILE);
    await page.click('[data-lang="en"]');
    for (const th of ['light', 'dark']) {
      await page.click('[data-theme-opt="' + th + '"]');
      const n = await page.locator('.tile svg:visible').count();
      assert(n === 3, th + ': ' + n);
      if (SHOTS) {
        fs.mkdirSync(SHOTS, { recursive: true });
        await page.screenshot({ path: path.join(SHOTS, 'hub-' + th + '.png'), fullPage: true });
      }
    }
    await page.click('[data-theme-opt="system"]');
  });

  if (SHOTS) {
    const phone = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
    const p2 = await phone.newPage();
    await p2.goto(FILE);
    await p2.screenshot({ path: path.join(SHOTS, 'phone-hub.png'), fullPage: true });
    await p2.click('.tile.ready');
    await p2.locator('input[data-row]').first().fill('12');
    await p2.screenshot({ path: path.join(SHOTS, 'phone-module.png'), fullPage: true });
    await check('Telefonon nincs vízszintes görgetés', async () => {
      const w = await p2.evaluate(() => document.documentElement.scrollWidth);
      assert(w <= 390, 'scrollWidth ' + w);
    });
    await phone.close();
  }

  await check('Nincs JavaScript hiba a konzolon', async () => { assert(errors.length === 0, errors.join(' | ')); });

  await browser.close();
  let failed = 0;
  for (const r of results) {
    if (!r.ok) failed++;
    console.log((r.ok ? '  ✓ ' : '  ✗ ') + r.name + (r.ok ? '' : '  —  ' + r.error));
  }
  console.log('\n' + (results.length - failed) + ' sikeres, ' + failed + ' sikertelen (' + results.length + ' teszt)');
  process.exit(failed ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
