# Changements — Atrium 2026

## Examens de fin de leçon
- Nouveau type d'exercice `exam` : 6 à 12 questions couvrant toute la leçon (un choix, plusieurs bonnes réponses, réponse courte), choix mélangés à chaque essai, correction détaillée, score en %, seuil de réussite et meilleur score gardé.
- Examens complets pour les 3 leçons du parcours Comprendre. Les autres leçons gardent leurs exercices actuels en attendant leur examen.
- Pour en ajouter : `source/data-exams.js`, entrée `'id-de-la-leçon':{pass:.7,questions:[…]}`, puis `node build.mjs`.

## Avant

- Leçons : 168 au total (88 avant), 19 parcours (9 avant), 263 exercices (103 avant).
- Nouveaux parcours : L'informatique, Terminal, TypeScript, React, Node.js, API et JSON, Algorithmique, Git/livraison/regex, Coder avec l'IA, Projets guidés.
- Python +5 leçons, Java +2 leçons.
- Parcours remis dans l'ordre d'apprentissage ; page d'accueil mise à jour.
- `review.html` régénéré par `build.mjs`.

# Version précédente — Atrium enrichi

- Leçons : 88 au total, 9 parcours.
- Exercices : 103 au total.
- Ajouts : formulaires HTML et accessibilité, DOM, cascade et responsive CSS, structures de données et fonctions JavaScript, localStorage, événements, débogage, fetch et modules, collections et fichiers Python, tests, PDO, sessions et validation PHP, agrégations, relations, transactions SQL, Git, planification et tests de projet.
- Ajout d'un projet de synthèse : mini-portfolio responsive.
- Ajout d'un preset Portfolio dans l'atelier.
- Ajout de `review.html` pour classer les leçons et exporter les retours.
- Nouveau parcours Java : compiler et lancer, types et chaînes, contrôle et tableaux, classes et encapsulation, collections et exceptions.
