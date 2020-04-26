import Alphabet from "./Class/Alphabet.js"
import Chrono from "./Class/Chrono.js";

let snail = document.getElementById('snail')
let route = document.getElementById('route')
let course = document.getElementById('course')
let laitue = document.getElementById('laitue')
let btn_debut = document.getElementById('btn-debut')
let success = document.getElementById('success')
let grille_lettre = document.getElementById('grille-lettre')
let start = false
let chrono = new Chrono(course, route, snail, laitue)



//redimenssionement des elements avec la taille de la fenètre
window.onresize = function () {
    chrono.resize(course, route)
}

//action du bouton
btn_debut.onclick = function(){
    if (btn_debut.innerText === "C'est parti!"){
        btn_debut.innerText = "Première partie"
        course.style.display = 'block'
        grille_lettre.style.display = 'block'
    }else{
        if (start === false){
            course.style.display = 'block'
            grille_lettre.style.display = 'block'
            if (course.style.display === 'block'){
                //timer = setInterval(move, ms)
                chrono.start()
                start = true
            }
            btn_debut.innerText = 'Lettre suivante'
        }else{
            chrono.reset()
            chrono.start()
        }
    }
}