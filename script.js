
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

function chemin(chemin){ //Définit le chemin en fonction du jeu sélectionné dans l'index
    
    pop_up2();

    if(chemin == 'Poudlard'){
     url = 'game.html?ID=Poudlard';
    }else if(chemin == 'Fantasy'){
        url = 'game.html?ID=Fantasy';
    }else{
     url = 'game.html?ID=Medieval';
    }
    
    
}
let url;
let dossier;
let deck;
page_html();
createCarte();
//Déclaration des variables (tableaux, score...)
var tab = ["carte1.jpg", "carte2.jpg", "carte3.jpg", "carte4.jpg", "carte5.jpg", "carte6.jpg"];
var tab_carte = [];
var score;
score = 0;
var tab_end = [];
setTimeout(start, 5000);
var tab_OnClick = [];
var id = [];
$('#titre').html(dossier);
$("#bot").attr('src', "Images/"+dossier+"/dialog_01.png"); //Affichage du dialogue du perso
$('#audio').attr('src', "Images/"+dossier+"/musique.mp3"); //Définition du chemin vers la musique
$('#body').css("backgroundImage","url(Images/"+dossier+"/background.jpg)");
genererCarte();

function choix_deck(choix){

    deck = choix;
    document.getElementById('pop_up_deck').style.display = "none";
    url = url + "?"+deck;
    document.location.href=url;

}

function page_html(){ //Définition du nom de dossier pour les cartes du deck (en fonction de l'url de la page et de mots clés)
    var page = window.location.href;
    var position = page.indexOf('Poudlard');
    if(position == -1){
        var position2 = page.indexOf('Fantasy');
        if(position2 == -1){
            dossier = 'Medieval';
        }else{
            dossier = 'Fantasy';
            $('#bip').css("color","black");
        }
    }else{

        dossier = 'Poudlard';
    }

    if (page.indexOf('Deck1') == -1) {
        if(page.indexOf('Deck2') == -1){
            deck = 'Deck3';
        }else{
            deck = 'Deck2';
        }   
    }else{
        deck = 'Deck1';
    }

}

function createCarte(){
    

    for (let index = 1; index <= 12; index++) {
        $('#plateau').append('<div class="ligne"><div id='+index+' class="carte" onclick="onClick('+index+')" data-alt-img="" data-alt-img2=""></div></div>');  
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
    $('#'+index).css("backgroundImage","url(Images/"+dossier+"/"+deck+"/"+carte+")");
//    document.getElementById(index).style.backgroundImage = "url(Images/"+dossier+"/"+carte+")";
    $('#'+index).css("display", "");
    $('#'+index).attr('data-alt-img', carte)
}

function start(){ //Retourne toutes les cartes
    for (let index = 1; index <= 12; index++) {
        $('#'+index).css('backgroundImage', 'url(Images/'+dossier+'/carte.jpg)');   
    }
}

function insert_tableau(verif, carte_nb){ //Insère dans un tableau les cartes qui sont retournées
    tab_OnClick.push(verif); //Tableau des cartes retournées
    id.push(carte_nb); //Tableau des id des cartes retournées
    setTimeout(function() {comparaison()},2000);
}

function comparaison(){ //Compare les éléments du tableau généré, si identique supprimer les cartes du plateau


    if(tab_OnClick.length>2){ //Retourne les cartes si trop de cartes sont retournées (+ de 2)
        for (let index = 0; index <= tab_OnClick.length; index++) {
            $('#'+id[index]).css('backgroundImage', 'url(Images/'+dossier+'/carte.jpg)');
        }
        tab_OnClick = [];
        id = [];  
    }

    if(tab_OnClick.length==2){
        if(tab_OnClick[0] == tab_OnClick[1]){
            $('#'+id[0]).css('display', 'none');
            $('#'+id[1]).css('display', 'none');
            tab_end.push(tab_OnClick[0]);
            tab_end.push(tab_OnClick[1]);
            tab_OnClick = []; //Vide le tableau des cartes
            id = []; //Vide le tableau des id
            calcul_score(10);  
            finJeu();

        }else{ //Sinon retourner les cartes
            for (let index = 0; index < tab_OnClick.length; index++) {
                $('#'+id[index]).css('backgroundImage', 'url(Images/'+dossier+'/carte.jpg)');
                calcul_score(-5);  
            }
            tab_OnClick = [];
            id = [];  
        }   
    }

    
}

function onClick(carte_nb) { //Retourne la carte quand on clique dessus
    
    var verif = document.getElementById(carte_nb).style.backgroundImage;
    var carte = document.getElementById(carte_nb).getAttribute('data-alt-img');
    if(verif != 'url("Images/'+dossier+'/carte.jpg")'){
        $('#'+carte_nb).css('backgroundImage', 'url(Images/'+dossier+'/carte.jpg)');
    }else{
        var carte = document.getElementById(carte_nb).getAttribute('data-alt-img');
        $('#'+carte_nb).css('backgroundImage', 'url(Images/'+dossier+'/'+deck+'/'+carte+')');
        insert_tableau(carte, carte_nb); 
        //Execute la fonction d'insertion des cartes retournées dans le tableau
    }
}

function calcul_score(pts){ //Calcul le score du joueur (score initial de 0)
    score = score + pts;
    $('#affichage_score').html("Ton score : "+score);
    return score;
}

//Chronomètre de 30 sec

var counter = 30;
var intervalId = null;
function finish() {
  clearInterval(intervalId);
  $('#bip').html("TERMINE!");
}
function bip() {
    counter--;
    finJeu(); //Appelle la fonction de fin du jeu
    if(counter == 0){ 
        counter = 30;
        finish();
    }else {	
        $('#bip').html(counter + " secondes restantes");
    }	
}
function chrono(){
    clearInterval(intervalId);
    counter = 30;
    intervalId = setInterval(function(){bip(counter)}, 1000); //Intervale de 1 sec pour le counter
}	

function finJeu(){ //Fin du jeu si tableau des cartes trouvées = 12, si counter = 0

    if (tab_end.length==12 && counter==0){
        var tps = 0;
        $('#bot').attr('src', "Images/"+dossier+"/dialog_02.png");
        pop_up(tps);
        tab_end = [];
    }else if(tab_end.length == 12){
        clearInterval(intervalId); 
        var tps = 30 - counter;
        counter = 30; 
        $('#bot').attr('src', "Images/"+dossier+"/dialog_02.png"); //Affichage du dialogue du perso
        $('#affichage_tps').html("Ton temps est de : "+tps+" secondes");
        pop_up(tps);
        tab_end = [];
    }else if (counter==0 && tab_end.length!=12){
        pop_up(tps);
        $('#bot').attr('src', "Images/"+dossier+"/dialog_03.png");
        $('#affichage_tps').html("Temps écoulé, réessaye");
        tab_end = [];
    }

}

function nouvellePartie(){ //Lancement d'une nouvelle partie
    $('#bot').attr('src', "Images/"+dossier+"/dialog_01.png"); //Affichage du dialogue du perso
    $('#affichage_tps').html(" ");
    score = 0;
    genererCarte();
    var tab_end = [];
    var tab_OnClick = [];
    setTimeout(start, 5000);
}

function pop_up(tps){
    $('#icone').attr('src', 'Images/Icones/icone_'+dossier+'.png');
    $('#pop_up_score').html('Ton score est de : '+score + 'pts');
    if(tps>=0){
        $('#pop_up').html('Bravo ! Tu as réussi à finir le Memory Game '+dossier);
        $('#pop_up_tps').html('Ton temps est de '+ tps+' sec');
    }else{
        $('#pop_up').html('Dommage... Le temps est écoulé, reessaye.');
        $('#pop_up_tps').html('TERMINE !!');
    }
    
    modal.style.display = "block";
}


function pop_up2(){
    $('#icone').attr('src', 'Images/logo.png');
    $('#pop_up').html('Quel deck choisis-tu ?');
    
    
    document.getElementById("pop_up_deck").style.display = "block";
    
    document.getElementById('echap').onclick = function(){
        document.getElementById('pop_up_deck').style.display = "none";
        
    }

}








/*
//Démmarage de la musique au premier clic de l'utilisateur (autoplay non compatible avec tous les navigateurs)
var first=true;
      window.addEventListener('mousedown',onmousedown);
 
    function onmousedown(){
       if(!first) return;
       first=false;
       $('#audio').attr('src', "Images/"+dossier+"/musique.mp3");
       audio.play();
    }

*/

//Désactivé car l'autoplay marche correctement lorsque le site est en ligne

//Pop up Score

var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close");
var img = document.getElementById("retour");
span.onclick = function() {
    modal.style.display = "none";
}
img.onclick = function(){
    modal.style.display = "none";
    nouvellePartie();
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}




  
        

    
    
  

