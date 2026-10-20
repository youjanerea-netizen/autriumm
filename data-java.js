DATA.tracks.splice(5,0,{id:"java",title:"Java",kicker:"Les applications",summary:"Un langage typé et orienté objet : serveurs, Android, outils d'entreprise.",chapters:[
{id:"java-1",title:"Java : les bases",lessons:[
{id:"java-intro",title:"Compiler et lancer un programme",summary:"JDK, javac, JVM, et la classe avec main.",minutes:10,blocks:[
{type:"p",text:"Java est **compilé** puis exécuté par la **JVM** (Java Virtual Machine). Tu écris un fichier `.java`, `javac` le transforme en bytecode `.class`, et la JVM le lance sur n'importe quel système. Le **JDK** contient tout cela. Les versions 21 et 25 sont à support long (LTS) : choisis-en une."},
{type:"code",lang:"java",caption:"Bonjour.java : le nom du fichier = le nom de la classe publique.",code:`public class Bonjour {
    public static void main(String[] args) {
        System.out.println("Bonjour, Java !");
    }
}`},
{type:"code",lang:"bash",code:`javac Bonjour.java   # compile
java Bonjour         # exécute
java Bonjour.java    # ou les deux d'un coup (Java 11+)`},
{type:"ul",items:["Tout code Java vit dans une **classe**. `main` est le point d'entrée.","`System.out.println` affiche une ligne. Chaque instruction finit par `;`.","Java distingue majuscules et minuscules : `String` n'est pas `string`.","Les accolades `{}` délimitent les blocs ; l'indentation est une convention, pas une règle."]},
{type:"note",text:"Comme Python et PHP, Java ne s'exécute pas dans cette page. Tu écris, tu compares, puis tu lances sur ta machine avec le JDK."}],
exercises:[
{type:"write",id:"java-intro-w",prompt:"Écris une classe Salut avec un main qui affiche : Salut le monde",lang:"java",starter:"",solution:`public class Salut {
    public static void main(String[] args) {
        System.out.println("Salut le monde");
    }
}`,expected:"Salut le monde",mustInclude:["class Salut","public static void main","System.out.println"]},
{type:"quiz",id:"java-intro-q",prompt:"Que produit la commande javac Bonjour.java ?",choices:["Le résultat affiché à l'écran","Un fichier Bonjour.class en bytecode","Une page HTML","Un fichier .exe obligatoire"],answer:1,explain:"javac compile le source en bytecode (.class). C'est ensuite la JVM, via la commande java, qui l'exécute."}]},
{id:"java-types",title:"Types, variables et chaînes",summary:"int, double, boolean, String, var, et le piège de ==.",minutes:12,blocks:[
{type:"p",text:"Java est **typé statiquement** : chaque variable a un type fixé, vérifié à la compilation. Une erreur de type est trouvée avant même de lancer le programme."},
{type:"table",headers:["Type","Contient","Exemple"],rows:[["int / long","entiers","int age = 20;"],["double","décimaux","double prix = 12.5;"],["boolean","vrai / faux","boolean ok = true;"],["char","un caractère","char c = 'A';"],["String","du texte (un objet)","String nom = \"Awa\";"]]},
{type:"code",lang:"java",code:`int age = 20;
var total = age * 2;          // var : le type est déduit (int)
System.out.println(7 / 2);    // 3   (division entière)
System.out.println(7 / 2.0);  // 3.5
String a = new String("hi");
System.out.println(a.equals("hi")); // true : compare le texte`},
{type:"caution",text:"Pour comparer deux String, utilise `equals`, jamais `==`. `==` compare les références (les objets en mémoire), pas le texte."},
{type:"ul",items:["Constante : `final int MAX = 10;`.","Conversion : `Integer.parseInt(\"42\")`, `String.valueOf(42)`.","Texte utile : `length()`, `toUpperCase()`, `substring(0, 3)`, `contains(\"x\")`.","`String.format(\"%.2f\", 3.14159)` donne `3,14` ou `3.14` selon la langue du système."]}],
exercises:[
{type:"write",id:"java-types-w",prompt:"Déclare String ville = \"Dakar\" et int habitants = 1000, puis affiche : Dakar : 1000 (avec une concaténation).",lang:"java",starter:"",solution:`String ville = "Dakar";
int habitants = 1000;
System.out.println(ville + " : " + habitants);`,expected:"Dakar : 1000",mustInclude:["String ville","int habitants","System.out.println"]},
{type:"quiz",id:"java-types-q",prompt:"Comment comparer correctement le contenu de deux String ?",choices:["a == b","a.equals(b)","a = b","a.same(b)"],answer:1,explain:"equals compare le texte. == teste si ce sont les mêmes objets en mémoire."}]}]},
{id:"java-2",title:"Contrôle et objets",lessons:[
{id:"java-controle",title:"Conditions, boucles, tableaux",summary:"if, switch moderne, for, for-each, int[].",minutes:12,blocks:[
{type:"code",lang:"java",code:`int[] notes = {12, 15, 9};
int somme = 0;
for (int note : notes) {      // for-each
    somme += note;
}
if (somme >= 30) {
    System.out.println("Bon total : " + somme);
} else {
    System.out.println("À reprendre");
}

int jour = 2;
String nom = switch (jour) {  // switch expression (Java 14+)
    case 1 -> "lundi";
    case 2 -> "mardi";
    default -> "autre";
};`},
{type:"ul",items:["Un tableau a une taille fixe : `notes.length` (sans parenthèses). Premier indice : 0.","`for (int i = 0; i < n; i++)` quand il faut l'indice, `for (T x : tableau)` sinon.","`while` répète tant que la condition est vraie. `break` sort, `continue` passe au tour suivant.","`switch` avec `->` n'a pas besoin de `break` et renvoie une valeur."]},
{type:"note",text:"Accéder à notes[3] dans un tableau de 3 cases lève une ArrayIndexOutOfBoundsException : c'est le bug classique des boucles."}],
exercises:[{type:"write",id:"java-controle-w",prompt:"Avec int[] notes = {12, 15, 9}, calcule la somme avec une boucle for-each et un +=, puis affiche-la.",lang:"java",starter:"int[] notes = {12, 15, 9};\n",solution:`int[] notes = {12, 15, 9};
int somme = 0;
for (int note : notes) {
    somme += note;
}
System.out.println(somme);`,expected:"36",mustInclude:["for","+=","System.out.println"]}]},
{id:"java-poo",title:"Classes, objets, encapsulation",summary:"Constructeur, private, getters, record.",minutes:14,blocks:[
{type:"p",text:"Une **classe** est un modèle ; un **objet** en est une instance créée avec `new`. L'**encapsulation** garde les champs `private` et n'expose que ce qui est utile, pour que l'objet reste toujours cohérent."},
{type:"code",lang:"java",code:`public class Livre {
    private final String titre;
    private double prix;

    public Livre(String titre, double prix) {
        this.titre = titre;
        this.prix = prix;
    }
    public String getTitre() { return titre; }
    public void remise(double pourcent) {
        prix = prix * (1 - pourcent / 100);
    }
}

Livre l = new Livre("Beloved", 16);
l.remise(10);`},
{type:"ul",items:["Le **constructeur** porte le nom de la classe et initialise l'objet. `this` désigne l'objet courant.","`private` cache un champ, `public` l'expose. `final` interdit de le réaffecter.","Un **record** (Java 16+) écrit une classe de données en une ligne : `public record Point(int x, int y) {}`.","L'**héritage** (`extends`) et les **interfaces** (`implements`) viennent ensuite : une classe peut avoir un seul parent mais plusieurs interfaces."]}],
exercises:[
{type:"write",id:"java-poo-w",prompt:"Écris une classe Lecteur avec un champ private String nom, un constructeur qui l'initialise avec this.nom, et un getter getNom().",lang:"java",starter:"",solution:`public class Lecteur {
    private String nom;

    public Lecteur(String nom) {
        this.nom = nom;
    }

    public String getNom() {
        return nom;
    }
}`,mustInclude:["class Lecteur","private String nom","this.nom","getNom"]},
{type:"quiz",id:"java-poo-q",prompt:"Pourquoi mettre un champ en private ?",choices:["Pour que le programme aille plus vite","Pour contrôler comment l'objet est lu et modifié","Parce que Java l'exige","Pour le cacher à la JVM"],answer:1,explain:"L'encapsulation empêche de mettre l'objet dans un état invalide : seules ses méthodes modifient ses champs."}]},
{id:"java-collections",title:"Collections et exceptions",summary:"ArrayList, HashMap, génériques, try/catch.",minutes:14,blocks:[
{type:"code",lang:"java",code:`import java.util.*;

List<String> langages = new ArrayList<>();
langages.add("Java");
langages.add("SQL");
System.out.println(langages.size());   // 2

Map<String, Integer> notes = new HashMap<>();
notes.put("Awa", 15);
System.out.println(notes.get("Awa"));  // 15

try {
    int n = Integer.parseInt("abc");
} catch (NumberFormatException e) {
    System.out.println("Pas un nombre");
} finally {
    System.out.println("Toujours exécuté");
}`},
{type:"ul",items:["`List` garde l'ordre, `Set` les valeurs uniques, `Map` des paires clé → valeur.","Les **génériques** `<String>` fixent le type des éléments : le compilateur refuse un intrus.","On déclare par l'interface (`List`), on crée avec la classe (`ArrayList`).","Une **exception** signale un problème d'exécution. `try/catch` la traite ; ne capture que ce que tu sais gérer.","Les exceptions *vérifiées* (comme `IOException`) doivent être capturées ou déclarées avec `throws`."]}],
exercises:[
{type:"write",id:"java-collections-w",prompt:"Crée une List<String> nommée titres (ArrayList), ajoute deux titres, puis affiche titres.size().",lang:"java",starter:"import java.util.*;\n",solution:`import java.util.*;

List<String> titres = new ArrayList<>();
titres.add("Beloved");
titres.add("Sula");
System.out.println(titres.size());`,expected:"2",mustInclude:["List<String>","ArrayList","add","size"]},
{type:"quiz",id:"java-collections-q",prompt:"Quelle structure garantit des valeurs uniques ?",choices:["List","Set","Map avec doublons","int[]"],answer:1,explain:"Un Set refuse les doublons. Une List les accepte, une Map associe une clé à une valeur."}]}]}]});
