# Munkaeszköz HUB

Privát, egyszemélyes, böngészőből használható munkaeszköz-gyűjtő. Telefonon és számítógépen is
kényelmes (reszponzív, nagy érintésbarát gombok). **Csak fiktív adatokkal működik**: nincs valódi
bejelentkezés, nincs külső szolgáltatás, nincs hálózati kérés, nincs külső függőség.

- Aktuális verzió: **0.1.0** (az oldal alján is látszik)
- Megosztható link (minden későbbi verzió ugyanitt jelenik meg):
  **https://claude.ai/artifact/HaTxqPTUoMvZhahzh7wr2Z**
  A link alapból privát; másokkal a lap *Share* menüjéből lehet megosztani.
- Helyi használat: az `index.html` fájl dupla kattintással megnyitható bármely modern böngészőben.

## Mire való?

Egy „HUB” kezdőoldal csempékkel, amelyek mögött önálló modulok vannak:

| Modul | Állapot |
|---|---|
| Üres hely számolás | működik |
| Pull list | Hamarosan |
| Priority fuvarköltség | Hamarosan |

### Üres hely számolás

1. Soronként (alapértelmezés: A–E sor) beírod az üres raklaphelyek számát. Csak 0 vagy annál nagyobb egész szám fogadható el; a hibás mező pirosan jelez.
2. A végösszeg gépelés közben, nagy kijelzőn frissül.
3. **Nap mentése**: a kiválasztott dátumra (alapból a mai nap) menti a soronkénti értékeket és az összeget. Egy napra egy bejegyzés lehet; ha már van, felülírás előtt rákérdez.
4. **Eltérésjelzés**: ha egy sor az *utolsó korábbi mentett naphoz* képest jobban eltér, mint a küszöb (alap: 5 hely), a mező narancssárga lesz, alatta „Eltérés az előző naphoz képest: +X / -X”. Mentéskor megerősítést kér. Pontosan a küszöbnyi eltérés még nem jelez.
5. **Előző napok**: legújabb elöl, dátum és összeg; egy napra koppintva látszik a soronkénti bontás.
6. **Mentés fájlba (export)** / **Betöltés fájlból (import)**: JSON fájl. Import előtt a szerkezet ellenőrzése megtörténik; hibás fájlnál az aktuális nyelven érthető hibaüzenet jelenik meg, és a meglévő adat nem változik. Érvényes fájlnál az azonos dátumú napokat a fájl tartalma váltja fel, a többi mentett nap megmarad (a betöltés előtt erről összesítő kérdés jelenik meg).

## Közös felület (fejléc)

- **Nyelv**: ENG / HU / UK. Indulási nyelv: angol. A választás megmarad. Minden felirat egyetlen közös fordítási listából (`I18N` az `index.html`-ben) jön. Az ukrán szövegek gépi fordításúak – **anyanyelvi ellenőrzés szükséges**.
- **Téma**: rendszer szerint / világos / sötét. A választás megmarad.
- **Útmutató** (? ikon): a kezdőoldalon általános, modulban az adott modulra vonatkozó, háromnyelvű.
- **Értesítések** (harang): értesítési központ, jelenleg üres („Nincs értesítés”). Olvasatlan-jelzés (piros számláló) kész. Új értesítés később egy sorral adható hozzá: `MunkaHub.notifications.add({ title: '…', body: '…' })` vagy fordítási kulccsal (`titleKey`, `bodyKey`).
- **Mód**: Felhasználó / Admin / Fejlesztő (lásd lent).

## A módok – és miért NEM biztonsági funkció

| Funkció | Felhasználó | Admin | Fejlesztő |
|---|:-:|:-:|:-:|
| Bevitel, nap mentése, előző napok | ✓ | ✓ | ✓ |
| Mentés fájlba (export) | ✓ | ✓ | ✓ |
| Betöltés fájlból (import) | – | ✓ | ✓ |
| Sorok kezelése (hozzáadás, átnevezés, törlés) | – | ✓ | ✓ |
| Eltérésküszöb beállítása | – | ✓ | ✓ |
| Mentett adatok törlése (megerősítéssel) | – | ✓ | ✓ |
| Demó adat generálása / csak a demó törlése | – | – | ✓ |
| Rendszerállapot oldal, tesztek futtatása | – | – | ✓ |

A táblázat a kódban egy helyen van: `PERMISSIONS` az `index.html` elején – ott módosítható.

**Ez nem biztonság.** A módváltó csak azt szabályozza, mely gombok látszanak. Nincs jelszó,
bárki bármikor átválthat, és aki megnyitja a böngésző fejlesztői eszközeit, bármit megtehet az
adatokkal. Valódi jogosultságkezeléshez szerveroldali bejelentkezés kell (lásd `ELESITES_TEENDOK.md`).

## Hol tárolódnak az adatok?

A böngésző helyi tárolójában (`localStorage`), `mhub.v1.` előtagú kulcsokon:

- `mhub.v1.prefs` – nyelv, téma, mód
- `mhub.v1.emptySpace` – sorok, küszöb, mentett napok, félbehagyott bevitel
- `mhub.v1.notifications` – értesítések

Minden mentett nap szerkezete (alkalmas későbbi becslésre):

```json
{ "date": "2026-11-16", "rows": [{ "id": "r1", "name": "A sor", "value": 3 }], "total": 3,
  "savedAt": "2026-11-16T14:05:00.000Z", "demo": true }
```

(`demo` csak a fejlesztői demó napokon szerepel.)

**Fontos:** az adatok eszközönként és böngészőnként *külön* vannak. A telefon és a gép nem lát
egymásra, a megosztott link és a helyi `index.html` is külön tárolót használ, és a böngészőadatok
törlése mindent töröl. Ezért **rendszeresen exportálj**, és importtal vidd át az adatot másik
eszközre. Ha a tároló nem érhető el (pl. privát ablak bizonyos böngészőkben), az oldal piros
sávval jelzi, hogy semmi nem marad meg.

A megosztott linken a fájlmentés a claude.ai saját letöltés-megerősítésén keresztül megy; ha ott
nem menne, az export ablakban a szöveg kimásolható és `.json` fájlként elmenthető, az import
ablakba pedig vissza is illeszthető.

## Tesztek

Két egyszerű mód:

1. **A felületről** (nem kell semmit telepíteni): Mód → *Fejlesztő* → *Rendszerállapot* → *Tesztek futtatása*.
   A tesztek külön, memóriabeli másolaton futnak, a valódi mentett adatot nem érintik.
2. **Parancssorból** (Node.js + Playwright):
   ```bash
   npm i -D playwright && npx playwright install chromium
   node tests/run-tests.js
   ```
   Ez lefuttatja a beépített tesztcsomagot, majd valódi böngészőben is végigkattintja a fő
   folyamatokat (újratöltés utáni megmaradás, mentés, export, hibás import, demó adat, ikonok).
   `--shots <mappa>` kapcsolóval képernyőképeket is készít (világos/sötét, telefon).

Lefedett területek: összegszámítás (üres, egy, több sor); érvénytelen bevitel (negatív, tört,
szöveg, üres); mentés, felülírás, előző napok; eltérésjelzés küszöb alatt/-on/fölött;
export/import körút és hibás fájlok; fordítások teljessége mindhárom nyelven; jogosultsági
táblázat a felületen; téma/nyelv/mód megmaradása; csempeikonok megléte és kontrasztja világos és
sötét módban.

## Fejlesztői jegyzetek

- Egyetlen önálló fájl: `index.html` (HTML + CSS + JS, külső függőség nélkül).
- **Új modul**: új `registerModule({...})` hívás (id, ikon, hangsúlyszín, fordítási kulcsok,
  `render(root, ctx)`), a meglévő modulok módosítása nélkül. Új ikon: új kulcs az `ICONS`
  objektumban (64×64 viewBox, 3px vonal, `currentColor`). Új szöveg: új kulcs mindhárom nyelven
  az `I18N`-ben (a teszt jelzi, ha valamelyik hiányzik).
- **Kiadás a megosztott linkre**: `node tools/build-artifact.js` elkészíti a `dist/munkaeszkoz-hub.html`
  fájlt (a közzétevő maga teszi köré a HTML-vázat), ezt kell ugyanarra a linkre közzétenni.
- Verziószám: `VERSION` konstans az `index.html`-ben + `CHANGELOG.md` új bejegyzés.
