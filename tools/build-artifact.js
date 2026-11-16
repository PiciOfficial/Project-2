#!/usr/bin/env node
/*
 * A megosztható (claude.ai Artifact) változat előállítása az index.html-ből.
 * A közzétevő maga teszi köré a <!doctype>/<html>/<head>/<body> vázat, ezért
 * csak az <!--ARTIFACT:BEGIN--> és <!--ARTIFACT:END--> közötti részt adjuk át.
 *
 * Használat:  node tools/build-artifact.js [kimeneti fájl]
 * Alapértelmezett kimenet: dist/munkaeszkoz-hub.html
 */
const fs = require('fs');
const path = require('path');
const src = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const m = src.match(/<!--ARTIFACT:BEGIN-->([\s\S]*)<!--ARTIFACT:END-->/);
if (!m) { console.error('Hiányzó ARTIFACT jelölők az index.html-ben.'); process.exit(1); }
const out = process.argv[2] || path.join(__dirname, '..', 'dist', 'munkaeszkoz-hub.html');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, m[1].trim() + '\n');
console.log('Kész: ' + out);
