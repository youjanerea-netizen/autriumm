# Atrium — version enrichie

Application autonome pour apprendre les bases du développement, avec des parcours, leçons, exercices et atelier web.

## Ouvrir l'application

- Ouvre `index.html` dans un navigateur récent.
- L'application front-end fonctionne sans serveur pour les leçons et l'atelier HTML/CSS/JavaScript.
- La progression est conservée localement dans le navigateur.
- Les polices externes peuvent nécessiter une connexion ; des polices de secours sont prévues.

## Nouveautés de cette version

- Programme enrichi de 54 à **83 leçons**, réparties dans les 8 parcours.
- Nouveaux chapitres sur les formulaires accessibles, la cascade CSS, les données JavaScript, le stockage local, les événements, l'asynchrone, les modules, les collections et fichiers Python, PDO et sessions PHP, les agrégations et relations SQL, Git, les tests et la planification de projets.
- Nouveaux exercices et projet de synthèse : mini-portfolio responsive.
- Nouveau preset Portfolio dans l'atelier.
- `review.html` : outil indépendant pour parcourir le programme, choisir Garder / Modifier / Retirer, écrire des remarques et exporter ses décisions en JSON.

## Limites pédagogiques importantes

- L'atelier exécute HTML, CSS et JavaScript dans un aperçu isolé.
- Les exercices Python et PHP sont des exercices d'écriture et de comparaison ; ils ne lancent pas un interpréteur Python ni un serveur PHP.
- Le moteur SQL intégré est pédagogique et limité : il ne remplace pas un vrai moteur SQL.
- Les exemples PHP de sécurité et de base de données sont des démonstrations à étudier, pas un système d'authentification prêt à déployer.

## Modifier les leçons

- `source/data.js` : parcours, chapitres, leçons et exercices.
- `source/tpl.html` : interface et logique de l'application.
- `source/sql.js` : moteur SQL pédagogique.
- `source/build.mjs` : assemble les sources en `index.html`.

Pour reconstruire l'application, avec Node.js 18 ou plus récent :

```bash
cd source
node build.mjs
```

## Faire la revue avec l'utilisatrice

Ouvre `review.html`, puis classe les leçons et exporte le fichier JSON. Le tableau de revue ne modifie pas automatiquement le programme ; il sert à transmettre les choix pour une prochaine révision.
