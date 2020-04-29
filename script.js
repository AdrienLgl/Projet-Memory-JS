
//Fonctions utilisées :
//genererCarte = Génère les cartes
//melangeCarte = Mélange les cartes générées
//afficherCarte = Affiche les cartes
//start = Retourne les cartes pour le début du jeu
//insertTableau = Insert les cartes retournées dans un tableau pour les comparer
//comparaison = Compare les cartes insérées dans le tableau
//onClick = Retourne la carte quand on clique dessus
//calculScore = Calcul le score du joueur (score initial = 0)
//finJeu = Fin du jeu
//nouvellePartie = Nouvelle partie

//Déclaration des variables (tableaux, score...)
var tab = ["carte1.jpg", "carte2.jpg", "carte3.jpg", "carte4.jpg", "carte5.jpg", "carte6.jpg"];
var tab_carte = [];
var score;
score = 0;
var tab_end = [];
setTimeout(start, 5000);
var tab_OnClick = [];
var id = [];
let dossier;
page_html();
document.getElementById("bot").src="Images/"+dossier+"/dialog_01.png"; //Affichage du dialogue du perso
document.getElementById("audio").src="Images/"+dossier+"/musique.mp3"; //Définition du chemin vers la musique
genererCarte();



function page_html(){ //Définition du nom de dossier pour les cartes du deck (en fonction de l'url de la page et de mots clés)
    var page = window.location.href;
    var position = page.indexOf('poudlard');
    if(position == -1){
        var position2 = page.indexOf('index');
        if(position2 == -1){
            dossier = 'Medieval';
        }else{
            dossier = 'Fantasy';
        }
    }else{

        dossier = 'Poudlard';
    }

}


function genererCarte(){
    for (let index = 0; index < tab.length; index++) {
        tab_carte.push(tab[index]);
        tab_carte.push(tab[index]);     
    }
    melangeCarte();
}

function melangeCarte(){
  for (let index = 1; index <= tab.length*2; index++) {
        let carte = tab_carte[Math.floor(Math.random()*tab_carte.length)];
        afficherCarte(carte, index);
        var i = tab_carte.indexOf(carte);
        tab_carte.splice(i, 1);  
    }
}

function afficherCarte(carte, index){
    document.getElementById(index).style.backgroundImage = "url(Images/"+dossier+"/"+carte+")";
    document.getElementById(index).style.display = ''; 
    document.getElementById(index).setAttribute('data-alt-img', carte);
}

function start(){ //Retourne toutes les cartes
    for (let index = 1; index <= 12; index++) {
        document.getElementById(index).style.backgroundImage = 'url(Images/'+dossier+'/carte.jpg)';   
    }
}

function insert_tableau(verif, carte_nb){ //Insère dans un tableau les cartes qui sont retournées
    tab_OnClick.push(verif); //Tableau des cartes retournées
    id.push(carte_nb); //Tableau des id des cartes retournées
    comparaison();
}

function comparaison(){ //Compare les éléments du tableau généré, si identique supprimer les cartes du plateau

    if(tab_OnClick.length==2){
        if(tab_OnClick[0] == tab_OnClick[1]){
            document.getElementById(id[0]).style.display = 'none'; 
            document.getElementById(id[1]).style.display = 'none'; 
            tab_end.push(tab_OnClick[0]);
            tab_end.push(tab_OnClick[1]);
            tab_OnClick = []; //Vide le tableau des cartes
            id = []; //Vide le tableau des id
            calcul_score(10);  

        }else{ //Sinon retourner les cartes
            for (let index = 0; index < tab_OnClick.length; index++) {
                document.getElementById(id[index]).style.backgroundImage = 'url(Images/'+dossier+'/carte.jpg)';  
            }
            tab_OnClick = [];
            id = [];  
        }   
    }

    if(tab_OnClick.length>2){ //Retourne les cartes si trop de cartes sont retournées (+ de 2)
        for (let index = 0; index <= tab_OnClick.length; index++) {
            document.getElementById(id[index]).style.backgroundImage = 'url(Images/'+dossier+'/carte.jpg)';  
        }
        tab_OnClick = [];
        id = [];  
    }
}

function onClick(carte_nb) { //Retourne la carte quand on clique dessus
    var verif = document.getElementById(carte_nb).style.backgroundImage;
    var carte = document.getElementById(carte_nb).getAttribute('data-alt-img');
    if(verif != 'url("Images/'+dossier+'/carte.jpg")'){
        document.getElementById(carte_nb).style.backgroundImage = 'url(Images/'+dossier+'/carte.jpg)';
    }else{
        var carte = document.getElementById(carte_nb).getAttribute('data-alt-img');
        document.getElementById(carte_nb).style.backgroundImage = 'url(Images/'+dossier+'/'+carte+')';
        setTimeout(function() {insert_tableau(carte, carte_nb)},2000); 
        //Execute la fonction d'insertion des cartes retournées dans le tableau
    }
}

function calcul_score(pts){ //Calcul le score du joueur (score initial de 0)
    score = score + pts;
    document.getElementById('affichage_score').innerHTML = "Ton score : "+score;
    return score;
}

//Chronomètre de 30 sec

var counter = 30;
var intervalId = null;
function finish() {
  clearInterval(intervalId);
  document.getElementById("bip").innerHTML = "TERMINE!";
}
function bip() {
    counter--;
    finJeu(); //Appelle la fonction de fin du jeu
    if(counter == 0){ 
        counter = 30;
        finish();
    }else {	
        document.getElementById("bip").innerHTML = counter + " secondes restantes";
    }	
}
function chrono(){
  intervalId = setInterval(bip, 1000); //Intervale de 1 sec pour le counter
}	

function finJeu(){ //Fin du jeu si tableau des cartes trouvées = 12, si counter = 0

    if (tab_end.length==12 && counter==0){
        document.getElementById("bot").src="Images/"+dossier+"/dialog_02.png";
    }else if(tab_end.length == 12){
        clearInterval(intervalId); 
        var tps = 30 - counter; 
        counter = 30;      
        document.getElementById("bot").src="Images/"+dossier+"/dialog_02.png"; //Affichage du dialogue du perso
        document.getElementById('affichage_tps').innerHTML = "Ton temps est de : "+tps+" secondes";
    }else if (counter==0 && tab_end.length!=12){
        document.getElementById("bot").src="Images/"+dossier+"/dialog_03.png";
        document.getElementById('affichage_tps').innerHTML = "Dommage réessaye";
    }

}

function nouvellePartie(){ //Lancement d'une nouvelle partie

    genererCarte();
    setTimeout(start, 5000);
}


//Démmarage de la musique au premier clic de l'utilisateur (autoplay non compatible avec tous les navigateurs)
var first=true;
      window.addEventListener('mousedown',onmousedown);
 
    function onmousedown(){
       if(!first) return;
       first=false;
       document.getElementById("audio").src="Images/"+dossier+"/musique.mp3";
       audio.play();
    }








    

    


       
        

    
    
  

