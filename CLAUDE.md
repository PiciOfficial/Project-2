# Munkaeszköz HUB – munkaszabályok

## Kommunikáció
- A kiadás végi összefoglalót MINDIG másolható formában add meg: egyetlen ```text kódblokkban,
  egyszerű szöveggel (mi készült el, mi nem, saját döntések, mit kell eldönteni a következő kiadás előtt).
- A dokumentáció (README, CHANGELOG, ELESITES_TEENDOK) magyarul készül, a felület nyelvétől függetlenül.

## Projekt
- Egyetlen önálló fájl: `index.html`, külső függőség és hálózati kérés nélkül. Csak fiktív adatok.
- Megosztható link (minden verzió ugyanide): https://claude.ai/artifact/HaTxqPTUoMvZhahzh7wr2Z
  Kiadás: `node tools/build-artifact.js`, majd a `dist/munkaeszkoz-hub.html` közzététele erre az URL-re.
- Minden kiadásnál: `VERSION` frissítése az `index.html`-ben, új CHANGELOG bejegyzés,
  és a tesztek futtatása (`node tests/run-tests.js`) – az eredményt az összefoglalóban jelezni kell.
- Új felirat csak az `I18N` listán keresztül, mindhárom nyelven (en / hu / uk).
