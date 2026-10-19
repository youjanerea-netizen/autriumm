# Atrium

Parcours pour apprendre à développer : 8 parties, 54 leçons, des exercices (quiz, web avec aperçu, écriture, SQL) et un atelier de code. Pas de points ni de récompenses.

## Utiliser l’appli

Ouvre `index.html` dans un navigateur. Aucune installation. La progression est enregistrée dans le navigateur (localStorage).

Pour la mettre en ligne, dépose `index.html` sur n’importe quel hébergement statique (Netlify, Vercel, GitHub Pages…).

## Modifier l’appli

Le dossier `source/` contient :

- `tpl.html` : l’interface (HTML, CSS et JavaScript)
- `data.js` : toutes les leçons et exercices (parties, chapitres, blocs de cours)
- `sql.js` : le petit moteur SQL des exercices
- `build.mjs` : assemble le tout en `index.html`

Après une modification : `cd source && node build.mjs` (Node 18 ou plus récent).

Note : les polices (Figtree, Fraunces, IBM Plex Mono) se chargent depuis Google Fonts ; hors connexion, l’appli utilise des polices de secours.
