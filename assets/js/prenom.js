import Alphabet from "./Class/Alphabet.js";
import Grille from "./Class/Grille.js";
import File from "./Class/File.js";

let alphabet = new Alphabet()
let grille = new Grille()
let file = new File()
let grille_lettre = document.getElementById('grille-lettre')
let bouton = document.getElementById('button')
let prenom = document.getElementById('prenom')
let resultat = document.getElementById('resultat')
let sucses = document.getElementById('success')
let eleve = []
let eleves = file.lire_fichier('prenoms.txt')

//empèche le clique droit
document.oncontextmenu = new Function("return false")

prenom.innerText = controle(eleves[Math.floor(Math.random()*eleves.length)])
row()
resultat.innerHTML = trait(prenom.innerText, false)

bouton.onclick = function () {
    if (sucses.style.display === 'block'){
        sucses.style.display = 'none'
        resultat.style.display = 'block'
    }
    let elements = document.querySelectorAll('.ligne-lettre');
    for (let element of elements) {
        element.remove();
    }
    let p
    do {
        p = controle(eleves[Math.floor(Math.random()*eleves.length)])
    }while (p === false)
    prenom.innerText = p
    row()
    resultat.innerHTML = trait(prenom.innerText, false)
}

grille_lettre.addEventListener('click', function(e){
        select(e.target)
})

//non répétition des prénoms à la suite
function controle(e) {
    if (eleve.length !== eleves.length){
        if (eleve.indexOf(e) === -1){
            eleve.unshift(e)
            return e
        }else{
            return false
        }
    }else{
        eleve = []
        eleve[0] = e
        return e
    }
}

//espace prénom composé
function trait(p, m) {
    let r
    if (m === false){
        for (let i = 0; i < p.length; i++){
            if (i === 0){
                r = '_'
            }else if (p[i] === ' '){
                r = r + '<br/>'
            }else{
                r = r + ' ' + '_'
            }
        }
        return r
    }else if (m === true){
        for (let i = 0; i < p.length; i++){
            if (i === 0){
                r = p[i] + ' '
            }else{
                r = r + p[i] + ' '
            }
        }
        return r
    }

}

//Actions quand click sur lettre de la grille
function select(e) {
    let classDiv = e.classList;
    if (alphabet.sansAccent(prenom.innerText.toLowerCase()).split("").indexOf(e.innerText.toLowerCase()) !== -1) {
        if (classDiv.contains('selected') === true){
            classDiv.remove('selected');
        }else{
            classDiv.add('selected');
        }
    }else{
        classDiv.add('error');
        setTimeout(function(){
            classDiv.remove('error');
        }, 2000)
    }
    controleLettre(e.innerText, e.getAttribute('id'))
    validation(prenom.innerText)
}

//compléter le prénoms résultat en changeant les traits par les lettres
function controleLettre(l, id) {
    let result = resultat.innerText.replace(/ /gi, '')
    result = result.split("")
    for (let i = 0; i < prenom.innerText.length; i++){
        if(result[i] === '_'){
            let lettre = alphabet.sansAccent(prenom.innerText[i])
            if (lettre === l.toLowerCase()){
                result[i] = prenom.innerText[i]
                document.getElementById(id).removeAttribute('onclick')
                break
            }else if (lettre === l){
                result[i] = prenom.innerText[i]
                document.getElementById(id).removeAttribute('onclick')
                break
            }
        }
    }
    let p = ''
    for(let i = 0; i < result.length; i++){
        p = p + result[i]
    }
    resultat.innerText = trait(p, true)
}

//insertion des lettre de l'alphabet dans la grille
function row() {
    let alpha = alphabet.shuffle(addPrenom(alphabet.sansAccent(prenom.innerText.toLowerCase())).split(""))
    grille.fill(alpha,Math.ceil(alpha.length/6),grille_lettre)
}

//Valide le résultat final
function validation(p) {
    let l = document.getElementsByClassName('lettre')
    let result = resultat.innerText.replace(/ /gi, '').split("")
    if(result.indexOf('_') === -1) {
        sucses.style.display = 'block'
        resultat.style.display = 'none'
        for (let i = 0; i < l.length; i++){
            l[i].removeAttribute('onclick')
        }
    }
}

//rajout du prenom daans l'alphabet
function addPrenom(p){
    let alpha = alphabet.alpha
    let rajout = ''
    for (let i = 0; i < alpha.length; i++){
        let nb = 0
        for (let j = 0; j < p.length; j++){
            if (alpha[i] === p[j]){
                nb++
            }
        }

        if (nb > 1){
            nb = nb -1
        }else if (nb === 1){
            nb = 0
        }

        let r = 0
        while (r < nb){
            rajout = rajout + alpha[i]
            r++
        }
    }
    return alpha + rajout
}
