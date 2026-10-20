// Examens de fin de leçon. Ajout : EXAMS['id-de-la-leçon'] = { pass, questions }.
// Types de question : one (un seul choix), multi (plusieurs bonnes réponses), fill (réponse courte).
(function(){
const O=(prompt,choices,answer,explain)=>({k:'one',prompt,choices,answer,explain});
const M=(prompt,choices,answer,explain)=>({k:'multi',prompt,choices,answer,explain});
const F=(prompt,accept,explain)=>({k:'fill',prompt,accept,explain});
const VF=(prompt,answer,explain)=>O(prompt,['Vrai','Faux'],answer?0:1,explain);
const EXAMS={
'reperes-role':{pass:.7,questions:[
O('Que fait un **navigateur** ?',['Il stocke les données du site','Il lit une page et l’affiche','Il envoie la page aux internautes','Il écrit le code HTML à ta place'],1,'Le navigateur (Firefox, Chrome, Safari) est le programme qui montre la page. Envoyer la page, c’est le rôle du serveur.'),
O('Qu’est-ce qu’un **serveur** ?',['Un programme qui affiche les pages','Un ordinateur qui envoie la page, et parfois calcule ou enregistre','Un fichier .html','Un langage de programmation'],1,'Un serveur est un ordinateur : il envoie la page, et peut aussi calculer ou enregistrer des informations.'),
M('Lesquels sont des navigateurs ?',['Firefox','Chrome','Safari','Python'],[0,1,2],'Python est un langage, pas un navigateur.'),
O('Une **page web** est…',['Un document que le navigateur lit et affiche','Un programme qui tourne sur le serveur','Une base de données','Un ordinateur'],0,'La page est un document. C’est le navigateur qui la lit et l’affiche.'),
O('Un **fichier** est…',['L’endroit où tu écris ton code','Un serveur distant','Une page déjà affichée','Un navigateur'],0,'C’est l’endroit où tu écris. Son extension indique son rôle.'),
F('Quelle extension de fichier correspond à une page HTML ? (écris-la avec le point)',['.html','html'],'`.html` pour la structure, `.css` pour l’apparence, `.py` pour Python.'),
O('Dans quel ordre la leçon conseille-t-elle d’avancer ?',['Comprendre le contenu d’une page, décider de son apparence, la rendre réactive','Rendre la page réactive, puis seulement écrire son contenu','Commencer par la base de données et la mise en ligne','Apprendre tous les langages en même temps'],0,'D’abord le contenu, ensuite l’apparence, ensuite la réactivité.'),
O('Quand le serveur, la base de données et la mise en ligne deviennent-ils utiles ?',['Dès le premier jour','Quand la page doit se souvenir de quelque chose','Jamais dans un cours web','Avant d’apprendre HTML'],1,'Ils arrivent quand la page doit retenir une information.'),
VF('« Il faut tout savoir dès le premier jour pour commencer à développer. »',false,'Tu as besoin d’un ordre, pas de tout savoir tout de suite.'),
M('Quels résultats visibles viennent d’une instruction écrite quelque part ?',['Afficher une page','Calculer un total','Enregistrer un nom','Ouvrir un menu','Le hasard, sans aucune instruction'],[0,1,2,3],'Chaque résultat visible vient d’une instruction : rien n’arrive sans qu’on l’ait écrit.'),
O('Dans ce cours, à quoi sert l’avancement ?',['À débloquer des niveaux','À gagner des points','À retrouver sa place','À obtenir un diplôme'],2,'Rien n’est verrouillé et rien ne se gagne : l’avancement sert seulement à retrouver sa place.')]},
'reperes-langages':{pass:.7,questions:[
O('Quel est le rôle de **HTML** ?',['L’interactivité','La structure : titres, textes, images, liens, formulaires','L’apparence','Le stockage des données'],1,'HTML décrit le contenu : c’est le squelette de la maison.'),
O('Quel est le rôle de **CSS** ?',['L’apparence : couleurs, espaces, grilles, adaptation au téléphone','Le stockage des données','Le calcul des totaux','La sécurité des mots de passe'],0,'CSS s’occupe de l’apparence : la décoration et l’aménagement.'),
O('Quel est le rôle de **JavaScript** dans la page ?',['Décrire la structure','L’interactivité : clics, menus, changements','Stocker les données','Remplacer CSS'],1,'JavaScript est « l’électricité et les mécanismes » de la page.'),
O('Quel est le rôle de **PHP** ?',['Le travail côté serveur : comptes, formulaires, pages calculées','La mise en forme','La structure de la page','Les animations'],0,'PHP est du côté serveur : il traite les demandes.'),
O('À quoi sert **SQL** ?',['À mettre en forme','À enregistrer, chercher, modifier et supprimer dans une base','À animer une page','À écrire des titres'],1,'SQL, ce sont les classeurs de la maison : les données.'),
O('**Python** est présenté comme…',['Un outil généraliste : calculs, données, automatisation, serveurs','Un langage réservé à la mise en page','Une base de données','Un navigateur'],0,'Python est polyvalent, sans métier unique.'),
O('Avec l’image de la maison, HTML correspond à…',['Le squelette','La décoration','L’électricité','Les classeurs'],0,'HTML est le squelette, CSS la décoration, JavaScript l’électricité.'),
F('Quelle technologie joue le rôle des « classeurs de la maison » ?',['sql'],'SQL range et retrouve les informations.'),
VF('« HTML est un langage de programmation au sens strict : il décide et calcule. »',false,'HTML ne « décide » pas : il décrit.'),
O('Qui doit garder un mot de passe en sécurité ?',['JavaScript dans la page, seul','CSS','Un langage serveur comme PHP, avec SQL','HTML'],2,'JavaScript dans la page ne suffit pas : c’est le travail du serveur, avec une base de données.'),
M('Lesquelles de ces technologies s’exécutent directement dans l’atelier d’Atrium ?',['HTML','CSS','JavaScript','Python','PHP'],[0,1,2],'L’atelier exécute HTML, CSS et JavaScript. Python et PHP s’écrivent ici, puis se lancent ailleurs.'),
O('Que deviennent Python et PHP dans Atrium ?',['Ils s’exécutent dans l’aperçu','Ils s’écrivent ici, puis se lancent plus tard sur un ordinateur ou un serveur','Ils ne sont pas enseignés','Ils remplacent SQL'],1,'Les exercices Python et PHP se comparent à une solution : tu les lances ensuite chez toi.')]},
'reperes-parcours':{pass:.7,questions:[
O('Quand ouvrir la solution d’un exercice ?',['Tout de suite','Seulement après avoir essayé','Jamais','Avant de lire la leçon'],1,'Essaie d’abord : c’est ainsi que tu retiens.'),
O('Que montrent les aperçus dans une leçon ?',['Le même code que l’exemple','Un autre exemple','Le serveur','Rien de précis'],0,'L’aperçu affiche le résultat du code donné en exemple.'),
O('Qu’est-ce que l’**atelier** ?',['Une page libre : HTML, CSS et JavaScript avec aperçu en direct','Un exercice noté','Un serveur','Une base de données'],0,'Utilise-le pour rejouer une leçon ou inventer une page.'),
M('Que peut-on faire dans l’atelier ?',['Rejouer une leçon','Inventer une page absente de tout exercice','Voir l’aperçu en direct','Envoyer un formulaire vers un vrai serveur'],[0,1,2],'L’aperçu n’envoie rien à un vrai serveur.'),
VF('« Un formulaire dans l’aperçu crée un vrai compte. »',false,'Il montre seulement ce que le visiteur verrait.'),
VF('« Il faut marquer chaque leçon comme lue pour continuer. »',false,'Rien n’est obligatoire pour continuer.')]}
};
for(const t of DATA.tracks)for(const c of t.chapters)for(const l of c.lessons){const x=EXAMS[l.id];if(x)l.exercises.push({type:'exam',id:l.id+'-exam',pass:x.pass,questions:x.questions})}
})();
