# Munkaeszköz HUB

Privát, egyszemélyes, böngészőből használható munkaeszköz-gyűjtő. Telefonon és számítógépen is
kényelmes (reszponzív, nagy érintésbarát gombok). **Csak fiktív adatokkal működik**: nincs valódi
bejelentkezés, nincs külső szolgáltatás, nincs hálózati kérés, nincs külső függőség.

- Aktuális verzió: **0.2.0** (az oldal alján is látszik)
- Megosztható link (minden későbbi verzió ugyanitt jelenik meg):
  **https://claude.ai/artifact/HaTxqPTUoMvZhahzh7wr2Z**
  A link alapból privát; másokkal a lap *Share* menüjéből lehet megosztani.
- Helyi használat: az `index.html` fájl dupla kattintással megnyitható bármely modern böngészőben.

## Mire való?

Egy „HUB” kezdőoldal csempékkel, amelyek mögött önálló modulok vannak:

| Modul | Állapot | Tárolási kulcs | Export fájl |
|---|---|---|---|
| Üres hely számolás | működik | `mhub.v1.emptySpace` | `ures-hely-ÉÉÉÉ-HH-NN.json` |
| Export raklap számolás | működik (0.2.0) | `mhub.v1.exportPallets` | `export-raklap-ÉÉÉÉ-HH-NN.json` |
| Gépnapló | működik (0.2.0) | `mhub.v1.machineLog` | `gepnaplo-ÉÉÉÉ-HH-NN.json` |
| Feladatok | működik (0.2.0) | `mhub.v1.tasks` | `feladatok-ÉÉÉÉ-HH-NN.json` |
| Pull list | Hamarosan | – | – |
| Priority fuvarköltség | Hamarosan | – | – |

**Minden modul adata külön tárolódik, és külön kell exportálni.** Egy modul exportfájlja csak
ugyanabba a modulba tölthető vissza; egy modul törlése vagy demó adata a többit nem érinti.

A kezdőoldalon a csempék fölött a **Mai teendők** szakasz a Feladatok modul mai esedékes
feladatait mutatja; helyben pipálhatók. Ha nincs mai teendő: „Mára nincs teendő”.

### Üres hely számolás

1. Soronként (alapértelmezés: A–E sor) beírod az üres raklaphelyek számát. Csak 0 vagy annál nagyobb egész szám fogadható el; a hibás mező pirosan jelez.
2. A végösszeg gépelés közben, nagy kijelzőn frissül.
3. **Nap mentése**: a kiválasztott dátumra (alapból a mai nap) menti a soronkénti értékeket és az összeget. Egy napra egy bejegyzés lehet; ha már van, felülírás előtt rákérdez.
4. **Eltérésjelzés**: ha egy sor az *utolsó korábbi mentett naphoz* képest jobban eltér, mint a küszöb (alap: 5 hely), a mező narancssárga lesz, alatta „Eltérés az előző naphoz képest: +X / -X”. Mentéskor megerősítést kér. Pontosan a küszöbnyi eltérés még nem jelez.
5. **Előző napok**: legújabb elöl, dátum és összeg; egy napra koppintva látszik a soronkénti bontás.
6. **Mentés fájlba (export)** / **Betöltés fájlból (import)**: JSON fájl. Import előtt a szerkezet ellenőrzése megtörténik; hibás fájlnál az aktuális nyelven érthető hibaüzenet jelenik meg, és a meglévő adat nem változik. Érvényes fájlnál az azonos dátumú napokat a fájl tartalma váltja fel, a többi mentett nap megmarad (a betöltés előtt erről összesítő kérdés jelenik meg).

### Másolás üzenetként (az Üres hely, az Export raklap és a Gépnapló modulban)

Rövid sort tesz a vágólapra az aktuális (még nem feltétlenül mentett) értékekről, a kiválasztott
dátummal és az aktuális nyelvű modulnévvel:

- Üres hely / Export raklap: `2026-11-16 – Export raklap számolás: 15`
- Gépnapló: `2026-11-16 – Gépnapló: N10: 1250; N11: 980` (csak a kitöltött gépek)

Sikeres másolás után rövid visszajelzés jelenik meg. Ha a böngésző nem engedi a másolást, egy
ablak mutatja a szöveget kijelölve, hogy kézzel másolható legyen.

### Export raklap számolás

Ugyanúgy működik, mint az Üres hely számolás, csak kategóriákkal (alapértelmezés: „A kategória”,
„B kategória”, „C kategória”). Kategóriánként egy nemnegatív egész szám – a már átszámolt
érték, szorzó és kapacitás-számolás nélkül. Azonnali végösszeg, egy nap egy bejegyzés
(felülírás előtt kérdez), választható dátum, előző napok, eltérésjelzés saját küszöbbel
(alap: 5, csak Admin/Fejlesztő módosítja), export/import (import csak Admin módban,
összefésüléssel).

### Gépnapló

- Gépenként (alapértelmezés: N10, N11, N12) egy nemnegatív egész szám: az üzemóra. **Összeg nincs.**
- Egy gépet üresen lehet hagyni, ha aznap nem olvasták le; legalább egy értéket meg kell adni.
- Mentés: egy nap egy bejegyzés, felülírás előtt kérdez, választható dátum. Az Előző napok listán
  a dátum és a rögzített gépek száma látszik, kattintásra a gépek üzemórái.
- **Ellenőrzés küszöb nélkül**, minden gépnél a saját utolsó, korábbi dátumú mentéséhez képest
  (nem feltétlenül az előző naphoz – ha egy gépet több napig nem olvastak le, a legutóbbi
  leolvasáshoz hasonlít):
  - jelzés, ha az üzemóra **kisebb**, mint az előző mentésnél;
  - jelzés, ha a növekedés **nagyobb, mint eltelt napok × 24 óra** (pontosan ennyi még rendben van);
  - ha a gépnek még nincs előző mentése, nincs jelzés.
  Jelzésnél a mező narancssárga, alatta a magyarázat, és mentés előtt megerősítést kér.

### Feladatok

- Ismétlődő feladatok. Egy feladat: **név**, **gyakoriság**, opcionális **időszak** (pl. 07:00–08:00)
  és opcionális **Megnyitás** gomb egy modulhoz (Üres hely, Export raklap, Gépnapló).
- Gyakoriság: minden nap / hétköznap (H–P) / hétvége (Szo–V) / a hét adott napjai / minden N. hét
  (kezdő dátummal; a kezdő dátum hét napján, N hetente) / a hónap X. napja (ha a hónap rövidebb,
  pl. 31. februárban, akkor a hónap utolsó napján).
- Nincs értékrögzítés, csak pipa (kész / nem kész). Pipálni minden módban lehet, a kezdőoldalon is.
- **Állapotok:** Esedékes – Kész – Kihagyva – **Késik** (az időszak vége elmúlt és nincs pipa;
  pontosan a záró percben még nem késik; időszak nélküli feladat aznap nem késik, csak
  a következő naptól). A korábbi napok pipálatlan feladatai az Előzményekben „Elmaradt”-ként látszanak.
- **„Ma kihagyom”**: csak arra a napra hagyja ki a feladatot, visszavonható. Ünnepnapi naptár
  nincs (ünnepnapon is dolgoznak), a kihagyás mindig kézi.
- Napi nézet: előző / következő nap, dátumválasztó, „Ma” gomb.
- **Előzmények:** a korábbi napok (legfeljebb 60 nap, a feladatok létrehozásától), naponként
  kész / elmaradt / kihagyott darabszámmal, kinyitva feladatonként.
- Szerkesztés (hozzáadás, módosítás, törlés megerősítéssel) csak Admin és Fejlesztő módban.
  Feladat törlésekor a pipái is törlődnek.
- Alapértelmezett fiktív feladatok: „Üres hely számolás” (hétköznap 07:00–08:00 → Üres hely),
  „Export raklap számolás” (hétköznap 07:00–08:00 → Export raklap), „Gépnapló ellenőrzés”
  (vasárnap → Gépnapló).
- Saját export/import (import csak Admin módban, összefésüléssel: az azonos azonosítójú
  feladatokat és az azonos napi pipákat a fájl tartalma váltja fel).

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
| Másolás üzenetként | ✓ | ✓ | ✓ |
| Feladat pipálása, „Ma kihagyom”, előzmények | ✓ | ✓ | ✓ |
| Mentés fájlba (export) | ✓ | ✓ | ✓ |
| Betöltés fájlból (import) | – | ✓ | ✓ |
| Sorok / kategóriák / gépek kezelése (hozzáadás, átnevezés, törlés) | – | ✓ | ✓ |
| Feladatok szerkesztése (hozzáadás, módosítás, törlés) | – | ✓ | ✓ |
| Eltérésküszöb beállítása | – | ✓ | ✓ |
| Mentett adatok törlése (megerősítéssel) | – | ✓ | ✓ |
| Demó adat generálása / csak a demó törlése (minden modulban) | – | – | ✓ |
| Rendszerállapot oldal (modulonkénti napok, utolsó mentés), tesztek futtatása | – | – | ✓ |

A táblázat a kódban egy helyen van: `PERMISSIONS` az `index.html` elején – ott módosítható.

**Ez nem biztonság.** A módváltó csak azt szabályozza, mely gombok látszanak. Nincs jelszó,
bárki bármikor átválthat, és aki megnyitja a böngésző fejlesztői eszközeit, bármit megtehet az
adatokkal. Valódi jogosultságkezeléshez szerveroldali bejelentkezés kell (lásd `ELESITES_TEENDOK.md`).

## Hol tárolódnak az adatok?

A böngésző helyi tárolójában (`localStorage`), `mhub.v1.` előtagú kulcsokon:

- `mhub.v1.prefs` – nyelv, téma, mód
- `mhub.v1.emptySpace` – Üres hely: sorok, küszöb, mentett napok, félbehagyott bevitel (0.1.0 óta változatlan)
- `mhub.v1.exportPallets` – Export raklap: kategóriák, küszöb, mentett napok, félbehagyott bevitel
- `mhub.v1.machineLog` – Gépnapló: gépek, mentett napok, félbehagyott bevitel
- `mhub.v1.tasks` – Feladatok: feladatok és pipák (`log`: dátum → feladat → kész/kihagyva)
- `mhub.v1.notifications` – értesítések

Minden mentett nap szerkezete (alkalmas későbbi becslésre):

```json
{ "date": "2026-11-16", "rows": [{ "id": "r1", "name": "A sor", "value": 3 }], "total": 3,
  "savedAt": "2026-11-16T14:05:00.000Z", "demo": true }
```

(`demo` csak a fejlesztői demó napokon szerepel. A Gépnapló napjaiban nincs `total`, és csak a
kitöltött gépek szerepelnek.)

**Fontos:** minden modul adata külön kulcson van, ezért **modulonként külön kell exportálni és
importálni**. Az adatok eszközönként és böngészőnként *külön* vannak. A telefon és a gép nem lát
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

Az utolsó futtatás: **103 teszt, mind sikeres** (86 beépített + 17 böngészős ellenőrzés; `--shots` kapcsolóval +1 telefonos szélességi ellenőrzés, összesen 104).

Lefedett területek (0.1.0): összegszámítás (üres, egy, több sor); érvénytelen bevitel (negatív, tört,
szöveg, üres); mentés, felülírás, előző napok; eltérésjelzés küszöb alatt/-on/fölött;
export/import körút és hibás fájlok; fordítások teljessége mindhárom nyelven; jogosultsági
táblázat a felületen; téma/nyelv/mód megmaradása; csempeikonok megléte és kontrasztja világos és
sötét módban.

Lefedett területek (0.2.0): Export raklap (összeg, érvénytelen bevitel, mentés/felülírás, előző
napok, eltérés küszöb alatt/-on/fölött, export/import és hibás fájl); Gépnapló (csak egész szám,
nincs összeg, csökkenés, 24 óra/nap szabály, első mentésnél nincs jelzés, gépenkénti előző érték,
mentés/felülírás, előző napok, export/import); Üres hely regresszió (0.1.0-s tárolt adat és
exportfájl épen betöltődik, a formátum változatlan); független tárolás; Másolás üzenetként
mindhárom modulban és nyelven; Feladatok (mind a hat gyakoriság, pipa megmaradása, „Ma kihagyom”
és visszavonás, „Késik”, előzmények, szerkesztés, export/import, Mai teendők a kezdőoldalon,
„Mára nincs teendő” háromnyelvűen); demó adat minden modulban; új jogosultságok; rendszerállapot
modulonként; új csempék és ikonok világos/sötét módban.

## Fejlesztői jegyzetek

- Egyetlen önálló fájl: `index.html` (HTML + CSS + JS, külső függőség nélkül).
- **Közös napló elem** (`createDayLog` + `renderDayLog`): az Export raklap és a Gépnapló ezt
  használja, külön tárolási kulccsal és külön exporttal. Új „soronként egy szám, napi mentés”
  modul egy új `createDayLog({...})` példánnyal és egy `registerModule` hívással adható hozzá.
  Az Üres hely számolás szándékosan nem erre épül (lásd CHANGELOG 0.2.0).
- **Új modul**: új `registerModule({...})` hívás (id, ikon, hangsúlyszín, fordítási kulcsok,
  `render(root, ctx)`), a meglévő modulok módosítása nélkül. Új ikon: új kulcs az `ICONS`
  objektumban (64×64 viewBox, 3px vonal, `currentColor`). Új szöveg: új kulcs mindhárom nyelven
  az `I18N`-ben (a teszt jelzi, ha valamelyik hiányzik).
- **Kiadás a megosztott linkre**: `node tools/build-artifact.js` elkészíti a `dist/munkaeszkoz-hub.html`
  fájlt (a közzétevő maga teszi köré a HTML-vázat), ezt kell ugyanarra a linkre közzétenni.
- Verziószám: `VERSION` konstans az `index.html`-ben + `CHANGELOG.md` új bejegyzés.
