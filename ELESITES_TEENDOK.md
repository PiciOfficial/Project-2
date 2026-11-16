# Élesítés előtti teendők

Az alábbi kérdéseket az éles (valódi adatokkal történő) használat előtt át kell beszélni.
A 0.1.0 prototípus ezek egyikét sem oldja meg – szándékosan csak fiktív adatokkal működik.

1. **Adat behúzása munkahelyi weboldalról vagy SAP-ból privát eszközre**
   - Megengedi-e a céges szabályzat? Kell-e írásos engedély (IT, adatvédelmi felelős, vezető)?
   - Milyen jogosultsággal és milyen technikai úton (export fájl, API, kézi másolás)?
   - Adatvédelem: kerülhet-e céges adat magáneszközre, magán-böngészőbe, felhőbe?
2. **Jogi és szerzői jogi kérdések**
   - Kié az alkalmazás és a benne rögzített adat? Használhatók-e céges nevek, logók, folyamatleírások?
   - Munkaidőben, céges feladatra készült eszköz jogi státusza.
3. **Valódi bejelentkezés és jogosultságok**
   - A helyi módváltó (Felhasználó / Admin / Fejlesztő) nem biztonság, bárki átválthat.
   - Éles használathoz szerveroldali azonosítás (pl. céges SSO) és szerveroldali jogosultságellenőrzés kell.
4. **Adatmegőrzés és szinkron**
   - Szinkron több eszköz (telefon, gép) között – jelenleg csak kézi export/import.
   - Szinkron / adatcsere a másik projekttel (formátum, irány, gyakoriság).
   - Mennyi ideig kell/szabad megőrizni az adatokat, ki törölheti?
5. **Mentések biztonsága**
   - Hol tároljuk az exportált fájlokat? Titkosítás, hozzáférés, elvesztés esetén mi a teendő.
   - Rendszeres, automatikus biztonsági mentés szükségessége.
6. **Push-értesítések szerverrel**
   - Az értesítési központ szerkezete kész, de tartalma és forrása nincs eldöntve.
   - Valódi push-értesítéshez szerver, értesítési engedély és üzemeltetés kell; ki küld, mit, milyen gyakran.
7. **Az ukrán szövegek anyanyelvi ellenőrzése**
   - A felület ukrán fordítása gépi; anyanyelvi lektor kell, különösen a hibaüzeneteknél és az útmutatónál.
