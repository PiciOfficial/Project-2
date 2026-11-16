# Munkaeszköz HUB

Privát, egyszemélyes, böngészőből használható munkaeszköz-gyűjtő. Telefonon és számítógépen is
kényelmes (reszponzív, nagy érintésbarát gombok). **Csak fiktív adatokkal működik**: nincs valódi
bejelentkezés, nincs külső szolgáltatás, nincs hálózati kérés, nincs külső függőség.

- Aktuális verzió: **0.3.0** (az oldal alján is látszik)
- Megosztható link (minden későbbi verzió ugyanitt jelenik meg):
  **https://claude.ai/artifact/HaTxqPTUoMvZhahzh7wr2Z**
  A link alapból privát; másokkal a lap *Share* menüjéből lehet megosztani.
- Helyi használat: az `index.html` fájl dupla kattintással megnyitható bármely modern böngészőben.

## Mire való?

Egy „HUB” kezdőoldal csempékkel, amelyek mögött önálló modulok vannak:

| Modul | Állapot | Tárolási kulcs | Export fájl |
|---|---|---|---|
| Üres hely számolás | működik | `mhub.v1.emptySpace` | `ures-hely-ÉÉÉÉ-HH-NN.json` |
| Export raklap számolás | működik (0.3.0-tól új szerkezet) | `mhub.v1.exportPallets2` | `export-raklap-ÉÉÉÉ-HH-NN.json` |
| Gépnapló | működik (0.2.0) | `mhub.v1.machineLog` | `gepnaplo-ÉÉÉÉ-HH-NN.json` |
| Feladatok | működik (0.2.0) | `mhub.v1.tasks` | `feladatok-ÉÉÉÉ-HH-NN.json` |
| Pull list | Hamarosan | – | – |
| Priority fuvarköltség | Hamarosan | – | – |

**Minden modul adata külön tárolódik, és külön kell exportálni.** Egy modul exportfájlja csak
ugyanabba a modulba tölthető vissza; egy modul törlése vagy demó adata a többit nem érinti.

A kezdőoldalon a csempék fölött a **Mai teendők** szakasz a Feladatok modul mai esedékes
feladatait mutatja; helyben pipálhatók (a „Ma kihagyom” csak a Feladatok modulban van). Ha nincs
mai teendő: „Mára nincs teendő”. A késő feladatok száma jelvényként („N késik”) látszik a szakasz
fejlécén és a Feladatok csempén; nullánál a jelvény nem jelenik meg.

### Jelentés másolása (kezdőoldal, 0.3.0)

A „Mai teendők” alatt a **Jelentés másolása** gomb egyetlen sort tesz a vágólapra az Üres hely
és az Export raklap számolás **aznapi mentett** végösszegével. Alapértelmezett szöveg:

- magyarul: `2026-11-16 – Üres hely: 12; Export raklap: 48`
- angolul / ukránul ugyanez az adott nyelv címkéivel.

A sablon Admin és Fejlesztő módban szerkeszthető a `{datum}`, `{uresHely}`, `{exportRaklap}`
helyettesítőkkel; a szerkesztett sablon minden nyelven érvényes, „Visszaállítás alapra” gombbal
visszaállítható. Ha az egyik érték aznap még nincs mentve, a figyelmeztetés megnevezi
(„Az Export raklap mai értéke még nincs mentve”), és választani lehet: másolás a jelenlegi, nem
mentett értékkel, vagy Mégse. Ha egyik sincs mentve, üzenet kéri, hogy előbb mentsd el őket.
Sikeres másolás után rövid visszajelzés jön, és a „Jelentés elküldése a vezetőnek” feladat
automatikusan pipát kap (ha aznap esedékes). Ha a böngésző nem enged másolni, egy ablakban kézzel
másolható a szöveg.

### Üres hely számolás

1. Soronként (alapértelmezés: A–E sor) beírod az üres raklaphelyek számát. Csak 0 vagy annál nagyobb egész szám fogadható el; a hibás mező pirosan jelez.
2. A végösszeg gépelés közben, nagy kijelzőn frissül.
3. **Nap mentése**: a kiválasztott dátumra (alapból a mai nap) menti a soronkénti értékeket és az összeget. Egy napra egy bejegyzés lehet; ha már van, felülírás előtt rákérdez.
4. **Eltérésjelzés**: ha egy sor az *utolsó korábbi mentett naphoz* képest jobban eltér, mint a küszöb (alap: 5 hely), a mező narancssárga lesz, alatta „Eltérés az előző naphoz képest: +X / -X”. Mentéskor megerősítést kér. Pontosan a küszöbnyi eltérés még nem jelez.
5. **Előző napok**: legújabb elöl, dátum és összeg; egy napra koppintva látszik a soronkénti bontás.
5/b. **Összehasonlítás (0.3.0)**: a végösszeg alatt „Előző mentés (ÉÉÉÉ-HH-NN): X, változás: +Y/-Y”,
   a választott dátum előtti utolsó mentett naphoz képest. Ha nincs előző mentés, a sor nem
   látszik. Csak megjelenítés, a tárolt adatot nem módosítja.
6. **Mentés fájlba (export)** / **Betöltés fájlból (import)**: JSON fájl. Import előtt a szerkezet ellenőrzése megtörténik; hibás fájlnál az aktuális nyelven érthető hibaüzenet jelenik meg, és a meglévő adat nem változik. Érvényes fájlnál az azonos dátumú napokat a fájl tartalma váltja fel, a többi mentett nap megmarad (a betöltés előtt erről összesítő kérdés jelenik meg).

### Másolás üzenetként (az Üres hely, az Export raklap és a Gépnapló modulban)

Rövid sort tesz a vágólapra az aktuális (még nem feltétlenül mentett) értékekről, a kiválasztott
dátummal és az aktuális nyelvű modulnévvel:

- Üres hely / Export raklap: `2026-11-16 – Export raklap számolás: 15`
- Gépnapló: `2026-11-16 – Gépnapló: N10: 1250; N11: 980` (csak a kitöltött gépek)

Sikeres másolás után rövid visszajelzés jelenik meg. Ha a böngésző nem engedi a másolást, egy
ablak mutatja a szöveget kijelölve, hogy kézzel másolható legyen.

### Export raklap számolás (0.3.0-tól új szerkezet)

- **Kategóriák helyett szabad számmezők**: induláskor 5 üres mező, „+ Új mező” gombbal bővíthető,
  mezőnként „×” gombbal törölhető. Érték: 0 vagy nagyobb egész szám. A mezőnek opcionális neve
  (megjegyzés) lehet. Az üres mezők nem számítanak, de legalább egy értéket meg kell adni.
- **Végösszeg** a mezők összege, gépelés közben, nagy betűvel frissül; alatta az összehasonlítás
  az előző mentéssel (mint az Üres helynél).
- **Gyors gombok**: legfeljebb 8 gomb, mindegyiknek neve és pozitív egész értéke van. Egy
  megnyomás új sort ad a gomb értékével és nevével; két megnyomás két sor. A sor törölhető.
  Alapértelmezett fiktív gombok: „A gomb” (+33) és „B gomb” (+15). A gombokat Admin és Fejlesztő
  módban lehet hozzáadni, átnevezni, átállítani és törölni (törlés megerősítéssel).
- **Mentés**: egy nap egy bejegyzés (felülírás előtt kérdez), választható dátum. A mentés a sorok
  (név, érték) listáját és a végösszeget tárolja. Mentés után újra 5 üres mező jelenik meg.
  Előző napok: dátum és végösszeg, kattintásra a sorok.
- **Eltérésjelzés a végösszegre**, az előző mentett nap végösszegéhez képest, saját küszöbbel
  (alap: **10**, Admin/Fejlesztő módosítja). Pontosan a küszöbnyi eltérés még nem jelez. Jelzésnél
  mentés előtt megerősítést kér.
- **Export/import**: az export fájl sémaverziója **2**. Import csak Admin módban, összefésüléssel.
  Egy 0.2.0-s (kategóriás) exportfájl betöltésekor érthető hibaüzenet jön az aktuális nyelven,
  és semmi nem változik.
- **A régi adat nem kerül át.** A 0.2.0-ban kategóriákkal mentett (fiktív) Export raklap adat
  (`mhub.v1.exportPallets` kulcs) nem alakul át és nem jelenik meg; a modul az új szerkezettel
  (`mhub.v1.exportPallets2` kulcs) üresen indul. A régi kulcsot az alkalmazás nem olvassa és nem
  törli, más modul adatához nem nyúl.
- Másolás üzenetként: `ÉÉÉÉ-HH-NN – Export raklap számolás: <végösszeg>` (változatlan).

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
- **Másolás táblázatba (0.3.0)**: az üzemórákat gépenként egy sorba másolja, a gépek jelenlegi
  sorrendjében, gépnevek nélkül (táblázatkezelőbe egy oszlopként illeszthető). Érték: a beírt
  szám, ennek híján az adott nap mentett értéke; ha egyik sincs, a sor **üres** marad, így a
  sorok száma mindig egyezik a gépek számával. A megmaradó „Dátum a tetején” kapcsolóval az első
  sor az ISO dátum.
- **Gépek sorrendje (0.3.0)**: Admin és Fejlesztő módban fel/le nyilakkal átrendezhető. A mentett
  napok a gépneveket tárolják, ezért az átrendezés a korábbi mentéseket nem módosítja.
- A „Másolás üzenetként” gomb megmaradt.

### Feladatok

- Ismétlődő feladatok. Egy feladat: **név**, **gyakoriság**, opcionális **időszak** (pl. 07:00–08:00)
  és opcionális **Megnyitás** gomb egy modulhoz (Üres hely, Export raklap, Gépnapló).
- Gyakoriság: minden nap / hétköznap (H–P) / hétvége (Szo–V) / a hét adott napjai / minden N. hét
  (kezdő dátummal; a kezdő dátum hét napján, N hetente) / a hónap X. napja (ha a hónap rövidebb,
  pl. 31. februárban, akkor a hónap utolsó napján).
- Nincs értékrögzítés, csak pipa (kész / nem kész). Pipálni minden módban lehet, a kezdőoldalon is.
- **Állapotok:** Esedékes (semleges) – **Hamarosan lejár** (sárga: az időszak végéig kevesebb
  mint 30 perc van hátra; pontosan 30 perc még Esedékes; a 30 perc Admin/Fejlesztő módban
  1–240 perc között állítható) – **Késik** (piros: az időszak vége elmúlt és nincs pipa; pontosan
  a záró percben még nem késik) – Kész – Kihagyva. Időszak nélküli feladat aznap nem késik.
  A korábbi napok pipálatlan feladatai az Előzményekben „Elmaradt”-ként látszanak.
- A késő feladatok a lista **tetejére** kerülnek (utánuk a hamarosan lejárók), és ikonnal **és**
  felirattal jelöltek, nem csak színnel. Az állapot nyitott alkalmazásban percenként magától
  frissül (a kezdőoldalon és a Feladatok modulban; gépelés vagy nyitott ablak közben vár).
- **Automatikus pipa (0.3.0)** – feladatonként beállítható (Admin/Fejlesztő):
  - „Mai mentéskor a kapcsolt modulban”: ha a feladat Megnyitás moduljában mentést végzel, a
    feladat pipát kap – de csak ha a mentés dátuma a mai nap, a feladat ma esedékes és még nincs
    kész. Múltbeli nap pótlása és egy már mentett nap felülírása **nem** pipál.
  - „A jelentés másolásakor”: a kezdőoldali Jelentés másolása sikeres használatakor pipál
    (ugyanezekkel a szabályokkal).
  - Az automatikus pipa rövid visszajelzéssel jár („Feladat kipipálva: …”), amelyben egy
    kattintással visszavonható. A kézzel tett pipát a visszavonás nem érinti.
- **„Ma kihagyom”**: csak arra a napra hagyja ki a feladatot, visszavonható. Ünnepnapi naptár
  nincs (ünnepnapon is dolgoznak), a kihagyás mindig kézi.
- Napi nézet: előző / következő nap, dátumválasztó, „Ma” gomb.
- **Előzmények:** a korábbi napok (legfeljebb 60 nap, a feladatok létrehozásától), naponként
  kész / elmaradt / kihagyott darabszámmal, kinyitva feladatonként.
- Szerkesztés (hozzáadás, módosítás, törlés megerősítéssel) csak Admin és Fejlesztő módban.
  Feladat törlésekor a pipái is törlődnek.
- Alapértelmezett fiktív feladatok (0.3.0):
  1. „Üres hely számolás” – hétköznap, 06:00–08:00, Megnyitás: Üres hely, automatikus pipa mentéskor;
  2. „Export raklap számolás” – hétköznap, 06:00–08:00, Megnyitás: Export raklap, automatikus pipa mentéskor;
  3. „Jelentés elküldése a vezetőnek” – hétköznap, 06:00–08:00, automatikus pipa a jelentés másolásakor;
  4. „Gépnapló ellenőrzés” – vasárnap, időszak nélkül, Megnyitás: Gépnapló, automatikus pipa mentéskor;
  5. „Műszaknapló kitöltése” – minden nap, időszak nélkül, sima pipa.
- **Meglévő (0.2.0-s) feladatlista frissítése**: az első 0.3.0-s betöltéskor egyszer fut
  (jelzőzászlóval védve, `flags.v030`): (a) az 1. és 2. feladat időszaka 06:00–08:00 lesz,
  **csak ha** még az eredeti 07:00–08:00; (b) a hiányzó 3. és 5. feladat bekerül; (c) a Megnyitás
  modullal rendelkező feladatoknál bekapcsol az automatikus pipa. A pipák és a felhasználó egyéb
  szerkesztései megmaradnak; később törölt feladat nem jön vissza. Üres lista esetén mind az öt
  alapértelmezett feladat létrejön.
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
| Másolás üzenetként, Gépnapló másolás táblázatba | ✓ | ✓ | ✓ |
| Jelentés másolása (kezdőoldal) | ✓ | ✓ | ✓ |
| Jelentéssablon szerkesztése | – | ✓ | ✓ |
| Export raklap gyors gombok szerkesztése | – | ✓ | ✓ |
| Gépek átrendezése | – | ✓ | ✓ |
| Automatikus pipa beállítása, „Hamarosan lejár” küszöb | – | ✓ | ✓ |
| Feladat pipálása, „Ma kihagyom”, előzmények | ✓ | ✓ | ✓ |
| Mentés fájlba (export) | ✓ | ✓ | ✓ |
| Betöltés fájlból (import) | – | ✓ | ✓ |
| Sorok / gépek kezelése (hozzáadás, átnevezés, törlés) | – | ✓ | ✓ |
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
- `mhub.v1.exportPallets2` – Export raklap (0.3.0): gyors gombok, küszöb, mentett napok (sorok + végösszeg), félbehagyott mezők
- `mhub.v1.exportPallets` – a 0.2.0-s kategóriás Export raklap adat; 0.3.0 óta nem használt, nem alakul át, nem törlődik
- `mhub.v1.machineLogOptions` – Gépnapló: „Dátum a tetején” beállítás
- `mhub.v1.report` – a jelentés szerkesztett sablonja (ha van)
- `mhub.v1.machineLog` – Gépnapló: gépek, mentett napok, félbehagyott bevitel
- `mhub.v1.tasks` – Feladatok: feladatok, pipák (`log`: dátum → feladat → kész/kihagyva, automatikus pipánál `auto: true`), „Hamarosan lejár” küszöb, frissítési jelzőzászló
- `mhub.v1.notifications` – értesítések

Minden mentett nap szerkezete (alkalmas későbbi becslésre):

```json
{ "date": "2026-11-16", "rows": [{ "id": "r1", "name": "A sor", "value": 3 }], "total": 3,
  "savedAt": "2026-11-16T14:05:00.000Z", "demo": true }
```

(`demo` csak a fejlesztői demó napokon szerepel. A Gépnapló napjaiban nincs `total`, és csak a
kitöltött gépek szerepelnek. Az Export raklap (0.3.0) napjaiban a sorok `{ "name", "value" }`
párok, a név lehet üres.)

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
   folyamatokat (újratöltés utáni megmaradás, mentés, export, hibás import, demó adat, ikonok,
   és óraszimulációval a percenkénti „Hamarosan lejár” → „Késik” váltást, az automatikus pipát
   és a jelentés másolását).
   `--shots <mappa>` kapcsolóval képernyőképeket is készít (világos/sötét, telefon).

Az utolsó futtatás (0.3.0): **139 teszt, mind sikeres** (121 beépített + 18 böngészős ellenőrzés;
`--shots` kapcsolóval +1 telefonos szélességi ellenőrzés, összesen 140).

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

Lefedett területek (0.3.0): Export raklap új szerkezete (végösszeg, mező hozzáadása/törlése,
érvénytelen bevitel, gyors gomb egyszer/kétszer, gyors gomb szerkesztése/törlése/max. 8,
mentés/felülírás, előző napok, végösszeg-eltérés küszöb alatt/-on/fölött, export/import séma 2,
0.2.0-s fájl hibaüzenettel, hibás fájl, régi tárolt adat nem okoz hibát és mást nem érint, demó);
összehasonlítás az előző mentéssel (van/nincs, +/-, választott dátum előtti mentés, csak
megjelenítés); jelentés (mindkettő mentve, egyik hiányzik, egyik sincs, sablon szerkesztése és
visszaállítása, mindhárom nyelv, a jelentés feladata pipát kap); Gépnapló másolás táblázatba
(gépenként egy sor, üres gép üres sor, Dátum a tetején, átrendezés után új sorrend, mentések
változatlanok); Feladatok (Hamarosan lejár / Késik a határokon, késők elöl ikonnal és felirattal,
„N késik” jelvény a fejlécen és a csempén, nullánál eltűnik, percenkénti frissülés, nincs
„Ma kihagyom” a kezdőoldalon); automatikus pipa (mai mentés pipál, múltbeli dátum és felülírás
nem, visszavonás, kikapcsolva nem pipál); feladatlista egyszeri frissítése (szerkesztetlen
idő módosul, szerkesztett nem, hiányzók pótlódnak, üres listán mind létrejön); új jogosultságok;
minden új felirat mindhárom nyelven.

A 0.3.0 a korábbi tesztek közül csak azok elvárását módosította, amelyeket a feladat kifejezetten
változtat: verziószám; a 0.2.0-s kategóriás Export raklap tesztjei helyett az új szerkezet
tesztjei; az alapértelmezett feladatlista (5 feladat, 06:00–08:00) és az ebből következő
darabszámok, valamint a „Hamarosan lejár” állapot (két határérték).

## Fejlesztői jegyzetek

- Egyetlen önálló fájl: `index.html` (HTML + CSS + JS, külső függőség nélkül).
- **Közös napló elem** (`createDayLog` + `renderDayLog`): 0.3.0 óta csak a Gépnapló használja
  (az Export raklap saját szerkezetet kapott: `ExportPallets`, `renderExportPallets`). Új „soronként egy szám, napi mentés”
  modul egy új `createDayLog({...})` példánnyal és egy `registerModule` hívással adható hozzá.
  Az Üres hely számolás szándékosan nem erre épül (lásd CHANGELOG 0.2.0).
- **Új modul**: új `registerModule({...})` hívás (id, ikon, hangsúlyszín, fordítási kulcsok,
  `render(root, ctx)`), a meglévő modulok módosítása nélkül. Új ikon: új kulcs az `ICONS`
  objektumban (64×64 viewBox, 3px vonal, `currentColor`). Új szöveg: új kulcs mindhárom nyelven
  az `I18N`-ben (a teszt jelzi, ha valamelyik hiányzik).
- **Kiadás a megosztott linkre**: `node tools/build-artifact.js` elkészíti a `dist/munkaeszkoz-hub.html`
  fájlt (a közzétevő maga teszi köré a HTML-vázat), ezt kell ugyanarra a linkre közzétenni.
- Verziószám: `VERSION` konstans az `index.html`-ben + `CHANGELOG.md` új bejegyzés.
