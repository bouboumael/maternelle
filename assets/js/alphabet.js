let snail = document.getElementById('snail')
let route = document.getElementById('route')
let course = document.getElementById('course')
let laitue = document.getElementById('laitue')
let btn_debut = document.getElementById('btn-debut')
let success = document.getElementById('success')
let grille_lettre = document.getElementById('grille-lettre')
let largeur
let distance
let time = 5 // temps de l'exercice en seconde
let ms = 10 // fps
let position = 0
let pourcent
let timer
let debut
let start = false
let reduct

//redimenssionement des elements avec la taille de la fenètre
window.onresize = function () {
    debut = (course.clientWidth-route.clientWidth)/2
    snail.style.left = positionLeft('snail')
    laitue.style.left = positionLeft('laitue')
}

//animation du chrono escargot
function move (){
    start = true
    largeur = route.clientWidth
    distance = largeur-100
    pourcent = (ms*(distance/time))/1000
    debut = (course.clientWidth-route.clientWidth)/2
    snail.style.top = "-130px"
    laitue.style.top = course.offsetTop + 40 + "px"
    laitue.style.left = positionLeft('laitue')

    if (laitue.style.visibility === ""){
        laitue.style.visibility = 'visible'
    }

    if (position > largeur - (snail.clientWidth)){
        clearInterval(timer)
        laitue.classList.add('finish')
        reduct = setInterval(function (){
            if (laitue.clientWidth > 1){
                laitueDimension(false)
            }else{
                clearInterval(reduct)
            }
        },100)
    }else{
        if (snail.style.display === ''){
            snail.style.display = 'block'
        }
        snail.style.left = positionLeft('snail')
        position = position + pourcent
    }
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
                timer = setInterval(move, ms)
            }
            btn_debut.innerText = 'Lettre suivante'
        }else{
            clearInterval(timer)
            clearInterval(reduct)
            position = 0
            snail.style.left = positionLeft('snail')
            laitue.classList.remove('finish')
            laitueDimension(true)
            timer = setInterval(move, ms)
        }
    }
}

//dimenssionnement de la laitue
function laitueDimension (s){
    if (s !== true){
        laitue.style.width = (laitue.clientWidth - 2)+"px"
        laitue.style.height = (laitue.clientHeight - 2)+"px"
        laitue.style.left = positionLeft('laitue')
        laitue.style.top = laitue.offsetTop + 1 + "px"
    }else{
        laitue.style.width = '100px'
        laitue.style.height = '100px'
        laitue.style.opacity = ""
        laitue.style.top = course.offsetTop + 40 + "px"
        laitue.style.left = positionLeft('laitue')
    }
}

//positionnement des éléments en css left
function positionLeft(e){
    let left
    switch (e) {
        case 'snail':
            left = debut + position+"px"
            break
        case 'laitue':
            left = (course.offsetLeft+ debut + route.clientWidth) - laitue.clientWidth +"px"
            break
        default:
            break
    }

    return left

}