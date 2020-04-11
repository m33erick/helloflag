// Variables globales

const formulaireUI = document.querySelector('#formulaire');
const listeActivitesUI = document.getElementById('listeActivites');
let arrayActivites = [];

// Fonctions

const CreerItem = (activite) => {

    let item = {
        activite: activite,
        etat: false
    }

    arrayActivites.push(item);
    
    return item;

}

const ValiderDB = () => {

    localStorage.setItem('routine', JSON.stringify(arrayActivites));

    LireDB();
}

const LireDB = () => {

    listeActivitesUI.innerHTML = '';

    arrayActivites = JSON.parse(localStorage.getItem('routine'));
    
    if(arrayActivites === null) {

        arrayActivites = [];
    
      }else{

        arrayActivites.forEach(element => {
          if(element.etat) {
            listeActivitesUI.innerHTML += `<div class="alert alert-success" role="alert"><span class="material-icons float-left mr-3">accessibility</span><b>${element.activite}</b> - ${element.etat}<span class="float-right"><span class="material-icons">done</span><span class="material-icons">delete</span></span></div>`
          }else{
            listeActivitesUI.innerHTML += `<div class="alert alert-danger" role="alert"><span class="material-icons float-left mr-3">accessibility</span><b>${element.activite}</b> - ${element.etat}<span class="float-right"><span class="material-icons">done</span><span class="material-icons">delete</span></span></div>`
          }
        });
    }
}

const EliminerDB = (activite) => {
  let indexArray;
  arrayActivites.forEach((element, index) => {
    if( element.activite === activite ) {
      indexArray = index;
    }
  });
  arrayActivites.splice(indexArray, 1);
  ValiderDB();
}

const EditerDB = (activite) => {
  let indexArray = arrayActivites.findIndex((element) => {
    return element.activite === activite
  });
  console.log(arrayActivites[indexArray]);

  arrayActivites[indexArray].etat = true;

  ValiderDB();
}

//EventListener

formulaireUI.addEventListener('submit', (e) => {

    e.preventDefault();
    let activiteUI = document.querySelector('#activite').value;

    CreerItem(activiteUI);
    ValiderDB();

    formulaireUI.reset();

});

document.addEventListener('DOMContentLoaded', LireDB);

listeActivitesUI.addEventListener('click', (e) => {

  e.preventDefault();
  // console.log(e.target.innerHTML);
  // console.log('coucou: ' + e.path[2].childNodes[1].innerHTML);

  if(e.target.innerHTML === 'done' || e.target.innerHTML === 'delete') {
    let texte =e.path[2].childNodes[1].innerHTML;
    if(e.target.innerHTML === 'delete') {
      // action d'éliminer
      EliminerDB(texte);
    }  
    if(e.target.innerHTML === 'done') {
      // action d'éditer
      EditerDB(texte);
    }  
  }

});