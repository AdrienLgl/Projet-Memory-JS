
var tab = ["carte1.jpg", "carte2.jpg", "carte3.jpg", "carte4.jpg", "carte5.jpg", "carte6.jpg"];
var tab_carte = [];


generateItem();

function generateItem(){


    for (let index = 0; index < tab.length; index++) {

        tab_carte.push(tab[index]);
        tab_carte.push(tab[index]);
        
    }

    randomItem();

}

function randomItem(){

    for (let index = 1; index <= tab.length*2; index++) {

        let carte = tab_carte[Math.floor(Math.random()*tab_carte.length)];
        displayItem(carte, index);

        var i = tab_carte.indexOf(carte);
        tab_carte.splice(i, 1);
    
    }

}

function displayItem(carte, index){

    document.getElementById(index).style.backgroundImage = "url(Images/"+carte+")";
    document.getElementById(index).setAttribute('data-alt-img', carte);

}

function start(){



    for (let index = 1; index <= 12; index++) {

        document.getElementById(index).style.backgroundImage = 'url(Images/carte.jpg)';
        
    }
}

setTimeout(start, 5000);

function onClick(carte_nb) {

    var verif = document.getElementById(carte_nb).style.backgroundImage;

    if(verif != 'url("Images/carte.jpg")'){
        document.getElementById(carte_nb).style.backgroundImage = 'url(Images/carte.jpg)';

    }else{
        var carte = document.getElementById(carte_nb).getAttribute('data-alt-img');
        document.getElementById(carte_nb).style.backgroundImage = 'url(Images/'+carte+')';

    }


}























    

    


       
        

    
    
  

