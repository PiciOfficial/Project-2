# Változásnapló

A formátum: minden kiadás egy új bejegyzés, legújabb felül. Verziózás: MAJOR.MINOR.PATCH.

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
- Tesztek: 104 (86 beépített + 18 böngészős), mind sikeres.

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
