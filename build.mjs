// Regénère ../index.html à partir du gabarit et des données.
// Usage (depuis le dossier source/) : node build.mjs
import fs from 'node:fs';
const t = fs.readFileSync('tpl.html', 'utf8')
  .replace('%%DATA%%', () => fs.readFileSync('data.js', 'utf8'))
  .replace('%%SQL%%', () => fs.readFileSync('sql.js', 'utf8'));
fs.writeFileSync('../index.html', t);
console.log('index.html généré');
