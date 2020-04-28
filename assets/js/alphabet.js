import Chrono from "./Class/Chrono.js";
import Grille from "./Class/Grille.js";

let snail = document.getElementById('snail')
let route = document.getElementById('route')
let course = document.getElementById('course')
let laitue = document.getElementById('laitue')
let btn_debut = document.getElementById('btn-debut')
let success = document.getElementById('success')
let grille = document.getElementById('grille')
let grille_lettre = document.getElementById('grille_lettre')
let lettre = document.getElementById('lettre')
let start = false
let chrono = new Chrono(course, route, snail, laitue, success, lettre)
let objGrille = new Grille()

document.onkeydown = function (event)
{
    if (event.key === "²"){
        let difficult = prompt("Modifier le temps (seconde) pour la prochaine partie de : ")
        if(!isNaN(difficult)){
            chrono.time = difficult
        }else{
            alert("la saisie n'est pas un nombre : " + difficult)
        }
    } else {
        chrono.stop()
    }
}

//redimenssionement des elements avec la taille de la fenètre
window.onresize = function () {
    chrono.resize(course, route)
    objGrille.centrageLettre(document.getElementsByClassName('selected')[0], grille)
}

//action du bouton
btn_debut.onclick = function(){
    if (btn_debut.innerText === "C'est parti!"){
        btn_debut.innerText = "Première partie"
        course.style.display = 'block'
    }else{
        if (start === false){
            lettre.style.display = 'block'
            course.style.display = 'block'
            grille_lettre.style.display = 'block'
            grille.style.width = route.offsetWidth + "px"
            let alphabet = objGrille.doubleAlphabet()
            objGrille.fill(alphabet,Math.ceil(alphabet.length/6),grille)
            if (course.style.display === 'block'){
                chrono.start()
                start = true
            }
            btn_debut.innerText = 'Lettre suivante'
        }else{
            objGrille.removeLetter()
            let alphabet = objGrille.doubleAlphabet()
            objGrille.fill(alphabet,Math.ceil(alphabet.length/6),grille, 6)
            chrono.reset()
            chrono.start()
        }
    }
}

//Action click sur la grille
grille.addEventListener('click', function(e){
    let lettreSelect = e.target
    let controle = objGrille.select(lettreSelect, lettre)
    if (controle === true){
        objGrille.rotateOn(lettreSelect, grille)
        chrono.stop('GAGNE')
        chrono.resize(course, route)
    }
    e.target.ontransitionend = function () {
            objGrille.rotateOff()
    }
})


