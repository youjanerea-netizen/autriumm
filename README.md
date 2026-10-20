# Atrium — version 2026

Application autonome pour apprendre les bases du développement, avec des parcours, leçons, exercices et atelier web.

## Ouvrir l'application

- Ouvre `index.html` dans un navigateur récent.
- L'application front-end fonctionne sans serveur pour les leçons et l'atelier HTML/CSS/JavaScript.
- La progression est conservée localement dans le navigateur.
- Les polices externes peuvent nécessiter une connexion ; des polices de secours sont prévues.

## Nouveautés de cette version

- Programme porté de 88 à **168 leçons** et **263 exercices**, répartis en **19 parcours** dans un ordre d'apprentissage : Comprendre → L'informatique → Terminal → HTML → CSS → JavaScript → TypeScript → React → Node.js → API et JSON → Python → Java → PHP → SQL → Algorithmique → Git, livraison, regex → Coder avec l'IA → Pratique → Projets guidés.
- Nouveaux parcours : **L'informatique** (comment l'ordinateur fonctionne), **Terminal**, **TypeScript**, **React**, **Node.js**, **API et JSON**, **Algorithmique**, **Git, livraison, regex**, **Coder avec l'IA** (demander, relire, tester, sans valider à l'aveugle) et **Projets guidés**.
- Python et Java prolongés (5 et 2 leçons de plus).
- `review.html` est régénéré automatiquement avec les 168 leçons.

## Limites pédagogiques importantes

- L'atelier exécute HTML, CSS et JavaScript dans un aperçu isolé.
- Les exercices Python, Java, PHP, TypeScript, React et Node.js (hors atelier web) sont des exercices d'écriture et de comparaison ; ils ne lancent ni interpréteur Python, ni JDK, ni serveur PHP.
- Le moteur SQL intégré est pédagogique et limité : il ne remplace pas un vrai moteur SQL.
- Les exemples PHP de sécurité et de base de données sont des démonstrations à étudier, pas un système d'authentification prêt à déployer.

## Modifier les leçons

- `source/data.js` : parcours, chapitres, leçons et exercices.
- `source/tpl.html` : interface et logique de l'application.
- `source/data-java.js` : le parcours Java (ajouté à `data.js` au build).
- `source/sql.js` : moteur SQL pédagogique.
- `source/build.mjs` : assemble les sources en `index.html` et met à jour `review.html`.

- `source/data-exams.js` : les examens de fin de leçon (format en tête de fichier).
- `source/data-2026.js` : les parcours ajoutés en 2026 et l'ordre final des parcours.

Pour reconstruire l'application, avec Node.js 18 ou plus récent :

```bash
cd source
node build.mjs
```

## Faire la revue avec l'utilisatrice

Ouvre `review.html`, puis classe les leçons et exporte le fichier JSON. Le tableau de revue ne modifie pas automatiquement le programme ; il sert à transmettre les choix pour une prochaine révision.
