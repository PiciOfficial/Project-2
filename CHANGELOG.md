# Változásnapló

A formátum: minden kiadás egy új bejegyzés, legújabb felül. Verziózás: MAJOR.MINOR.PATCH.

## [0.3.0] – 2026-11-16

### Új
- **Export raklap számolás új szerkezete**: kategóriák helyett szabad számmezők (induláskor 5,
  „+ Új mező”, „×” törlés, opcionális név), azonnali végösszeg; **gyors gombok** (legfeljebb 8,
  név + pozitív egész érték; egy megnyomás = egy új sor; alapértelmezett „A gomb” +33,
  „B gomb” +15; szerkesztés Admin/Fejlesztő módban); eltérésjelzés a **végösszegre** saját
  küszöbbel (alap: 10); export **sémaverzió 2**, a 0.2.0-s kategóriás fájl érthető hibaüzenettel
  elutasítva; demó adat gyors gombos és kézi sorokkal.
- **Összehasonlítás az előző mentéssel** (Üres hely és Export raklap): „Előző mentés
  (ÉÉÉÉ-HH-NN): X, változás: +Y/-Y” a végösszeg alatt; csak megjelenítés.
- **Jelentés másolása** a kezdőoldalon (a Mai teendők alatt): az Üres hely és az Export raklap
  aznapi mentett végösszege egy sorban; szerkeszthető sablon (`{datum}`, `{uresHely}`,
  `{exportRaklap}`), „Visszaállítás alapra”; figyelmeztetés mentetlen értéknél.
- **Gépnapló**: „Másolás táblázatba” (gépenként egy sor, gépnév nélkül, üres gépnél üres sor,
  megmaradó „Dátum a tetején” kapcsoló); gépek átrendezése fel/le nyilakkal (Admin/Fejlesztő).
- **Feladatok**: „Hamarosan lejár” állapot (állítható, alap: 30 perc), a késők a lista tetején
  ikonnal és felirattal, „N késik” jelvény a Mai teendők fejlécén és a Feladatok csempén,
  percenkénti automatikus frissítés.
- **Automatikus pipa** feladatonként: mai mentés a kapcsolt modulban, illetve a jelentés
  másolása pipál; visszajelzés egy kattintásos visszavonással.
- Két új alapértelmezett feladat: „Jelentés elküldése a vezetőnek” és „Műszaknapló kitöltése”.
- Új jogosultságok: `quick.edit`, `report.copy`, `report.template`, `rows.reorder`, `tasks.settings`.
- Tesztek: 139 (121 beépített + 18 böngészős; `--shots` kapcsolóval 140), mind sikeres;
  a böngészős tesztek óraszimulációval ellenőrzik a percenkénti frissítést.

### Változott
- Export raklap: új tárolási kulcs (`exportPallets2`). A 0.2.0-s kategóriás adat nem kerül át,
  a modul üresen indul; a régi kulcsot az alkalmazás nem olvassa és nem törli.
- A kezdőoldali Mai teendőkből eltűnt a „Ma kihagyom” gomb (a Feladatok modulban megmaradt).
- Alapértelmezett feladatok időszaka 06:00–08:00. A meglévő listát egyszeri, jelzőzászlóval
  védett frissítés igazítja: csak a szerkesztetlen 07:00–08:00 időszak módosul, a hiányzó
  feladatok pótlódnak, a Megnyitás modullal rendelkező feladatoknál bekapcsol az automatikus pipa.
- Üres hely számolás: csak a kért két kiegészítés került be (összehasonlítás sor; a mentés
  jelzése az automatikus pipához). A tárolt adat, a kulcs, az export formátum és a működés
  változatlan (regressziós tesztek ellenőrzik).
- Korábbi tesztek: csak a feladat által módosított elvárások változtak (verziószám, Export raklap
  szerkezete, alapértelmezett feladatlista és a „Hamarosan lejár” állapot két határértéke).

## [0.2.0] – 2026-11-16

### Új
- **Export raklap számolás** modul: kategóriánként egy egész szám, azonnali végösszeg, napi
  mentés felülírás-kérdéssel, választható dátum, előző napok, eltérésjelzés saját küszöbbel
  (alap: 5), kategóriák kezelése (Admin), export/import (import: Admin, összefésüléssel).
- **Gépnapló** modul: gépenkénti üzemóra, összeg nélkül; ellenőrzés küszöb nélkül
  (csökkenés, illetve eltelt napok × 24 óránál nagyobb növekedés), gépek kezelése (Admin),
  előző napok gépszámmal, export/import.
- **Feladatok** modul: ismétlődő feladatok hat gyakorisággal, opcionális időszakkal és
  Megnyitás gombbal; pipa, „Ma kihagyom” (visszavonható), Esedékes / Kész / Kihagyva / Késik
  állapot, előzmények, szerkesztés (Admin), saját export/import. Három alapértelmezett fiktív feladat.
- **Mai teendők** a kezdőoldalon a csempék fölött, helyben pipálható; üresen „Mára nincs teendő”.
- **Másolás üzenetként** gomb az Üres hely, az Export raklap és a Gépnapló modulban.
- Új csempék saját SVG ikonnal és hangsúlyszínnel (raklapok kamion felé, fogaskerék óralappal,
  pipálható lista naptárral).
- Közös belső napló elem (`createDayLog`/`renderDayLog`) a két új listás modulhoz,
  modulonként külön tárolási kulccsal, exporttal és importtal.
- Demó adat minden modulban (fiktív, jelölt, csak a demó törölhető).
- Rendszerállapot: modulonként a mentett napok száma és az utolsó mentés ideje.
- Új jogosultságok a táblázatban: `entry.copy`, `tasks.check`, `tasks.skip`, `tasks.history`, `tasks.edit`.
- Tesztek: 103 (86 beépített + 17 böngészős; `--shots` kapcsolóval 104), mind sikeres.

### Változott
- Üres hely számolás: csak a „Másolás üzenetként” gomb került be (a Mentés mellé). A tárolt adat,
  a tárolási kulcs, az export formátum és a működés változatlan.
- Rendszerállapot: a korábbi „Mentett napok” és „Utolsó mentés” sor (amely csak az Üres hely
  modulra vonatkozott) helyett modulonkénti táblázat.
- Három 0.1.0-s teszt elvárása igazodott az új állapothoz (verziószám 0.2.0; 4 működő és
  6 csempe a 1 és 3 helyett; a jogosultsági és fordítási teszt az összes működő modult rendereli).

### Döntés
- Az Üres hely számolás nem a közös napló elemre épül, hanem érintetlen maradt, hogy a 0.1.0
  adatai és viselkedése garantáltan ne változzanak. Átállítás később, külön kiadásban lehetséges.

## [0.1.0] – 2026-11-16

Első kiadás (prototípus, csak fiktív adatokkal).

### Új
- Kezdőoldal (HUB) három csempével: „Üres hely számolás” (működik), „Pull list” és
  „Priority fuvarköltség” (Hamarosan). Beágyazott SVG ikonok, csempénkénti hangsúlyszín,
  rámutatás-animáció a működő csempén.
- Közös fejléc: ENG / HU / UK nyelvválasztó (alap: angol), háromállású téma (rendszer / világos /
  sötét), útmutató, értesítési központ (üres állapot, olvasatlan-jelzés), módváltó
  (Felhasználó / Admin / Fejlesztő). Minden választás megmarad.
- Jogosultsági táblázat (módok × funkciók) egy helyen a kódban.
- Üres hely számolás modul: soronkénti bevitel érvényesítéssel, azonnali végösszeg, napi mentés
  felülírás-kérdéssel, előző napok listája és részletei, eltérésjelzés állítható küszöbbel
  (alap: 5), JSON export/import szerkezet-ellenőrzéssel.
- Admin: sorok hozzáadása/átnevezése/törlése, küszöb, mentett adatok törlése megerősítéssel.
- Fejlesztő: jelölt demó adat generálása és külön törlése, rendszerállapot oldal, tesztek
  futtatása a felületről.
- Tesztcsomag (42 beépített + 11 böngészős ellenőrzés), `tests/run-tests.js`.
- Dokumentáció: README, CHANGELOG, ELESITES_TEENDOK.

### Ismert korlátok
- Az ukrán szövegek gépi fordításúak, anyanyelvi ellenőrzés szükséges.
- Az adatok eszközönként külön vannak; szinkron nincs (csak export/import).
- A módváltó nem biztonsági funkció.
