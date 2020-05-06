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

bouton.addEventListener('click', function () {
    if (sucses.style.display === 'block'){
        sucses.style.display = 'none'
        resultat.style.display = 'block'
    }
    grille.removeLetter()
    let p
    do {
        p = controle(eleves[Math.floor(Math.random()*eleves.length)])
    }while (p === false)
    prenom.innerText = p
    row()
    resultat.innerHTML = trait(prenom.innerText, false)
})

grille_lettre.addEventListener('click', function(e){
    let lettreSelect = e.target
    let lettreClass = lettreSelect.classList
    if (sucses.style.display !== 'block' && !lettreClass.contains('selected')){
        grille.select(lettreSelect, prenom)
        controleLettre(lettreSelect.innerText)
        validation()
    }
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
    let r = ''
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

//compléter le prénoms résultat en changeant les traits par les lettres
function controleLettre(l) {
    let result = resultat.innerText.replace(/ /gi, '')
    result = result.split("")
    for (let i = 0; i < prenom.innerText.length; i++){
        if(result[i] === '_'){
            let lettre = alphabet.sansAccent(prenom.innerText[i])
            if (lettre === l.toLowerCase() || lettre === l){
                result[i] = prenom.innerText[i]
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
    grille_lettre.style.display = 'block'
    let alpha = alphabet.shuffle(addPrenom(alphabet.sansAccent(prenom.innerText.toLowerCase())).split(""))
    grille.fill(alpha,Math.ceil(alpha.length/6),grille_lettre)
}

//Valide le résultat final
function validation() {
    let result = resultat.innerText.replace(/ /gi, '').split("")
    if(result.indexOf('_') === -1) {
        sucses.style.display = 'block'
        resultat.style.display = 'none'
    }
}

//rajout du prenom dans l'alphabet
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
