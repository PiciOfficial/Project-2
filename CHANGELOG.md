# Változásnapló

A formátum: minden kiadás egy új bejegyzés, legújabb felül. Verziózás: MAJOR.MINOR.PATCH.

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
