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

## 0.2.0-val felmerült tételek

8. **Ünnepnapok kezelése a Feladatokban**
   - Jelenleg nincs ünnepnapi naptár (ünnepnapon is dolgoznak), a kihagyás kézi.
   - Ha később kell: honnan jön a naptár (céges, országos), ki tartja karban, és melyik feladatot érinti.
9. **Az értesítések szerveres megoldása**
   - A Feladatok „Késik” állapota természetes értesítési forrás lenne, de push-értesítéshez
     szerver, értesítési engedély és üzemeltetés kell; a tartalmáról még nincs döntés.
10. **Üzenetként másolt adatok továbbítása**
    - A „Másolás üzenetként” szövegét a felhasználó kézzel küldi tovább (pl. csevegőalkalmazásban).
      Valódi adatoknál tisztázni kell, melyik csatornán szabad üzemi adatot (raklapszám,
      üzemóra) megosztani.
11. **Gépadatok és karbantartás**
    - Valódi gépazonosítók, üzemórák rögzítése: kell-e összhang a karbantartási rendszerrel
      (pl. SAP PM), és ki felel a hibás leolvasások javításáért.
