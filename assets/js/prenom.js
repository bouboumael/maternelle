let grille = document.getElementById('grille-lettre')
let bouton = document.getElementById('button')
let prenom = document.getElementById('prenom')
let resultat = document.getElementById('resultat')
let sucses = document.getElementById('success')
let eleve = []
let eleves = lire_fichier()

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
    if (sansAccent(prenom.innerText.toLowerCase()).split("").indexOf(e.innerText.toLowerCase()) !== -1) {
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
            if (sansAccent(prenom.innerText[i]) === l.toLowerCase()){
                result[i] = prenom.innerText[i]
                document.getElementById(id).removeAttribute('onclick')
                break
            }else if (sansAccent(prenom.innerText[i]) === l){
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

//mélange de l'alphabet + lettre en plus
function shuffle(a) {
    var j = 0;
    var valI = '';
    var valJ = valI;
    var l = a.length - 1;
    while(l > -1)
    {
        j = Math.floor(Math.random() * l);
        valI = a[l];
        valJ = a[j];
        a[l] = valJ;
        a[j] = valI;
        l = l - 1;
    }
    return a;
}

//insertion des lettre de l'alphabet dans la grille
function row() {
    let alpha = addPrenom(sansAccent(prenom.innerText.toLowerCase()))
    alpha = alpha.split("");
    alpha = shuffle(alpha)
    let nbLigne = Math.ceil(alpha.length/6)

    //créer une ligne
    let nbId = 1
    for (let i=1; i<= nbLigne; i++){
        let element = document.createElement('div');
        element.setAttribute('class', 'ligne-lettre')
        element.setAttribute('id', 'row-'+i)
        grille.appendChild(element)

        // remplir la ligne de 6 lettres
        let t = 0
        let ligne = document.getElementById('row-'+i);
        do {
            let place = Math.floor(Math.random()*alpha.length)
            let l = alpha[place];
            if (l){
                let lettre = document.createElement('div')
                lettre.setAttribute('class', 'col-2 lettre')
                lettre.setAttribute('id', l+'-'+nbId)
                lettre.setAttribute('onclick', 'select(this)')
                ligne.appendChild(lettre)
                let letter = document.getElementById(l+'-'+nbId)
                letter.innerText = l.toUpperCase()
                alpha.splice(place,1)
                nbId++
            }
            t++
        }while (t < 6 )
    }
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

//Elimine les accents des lettres
function sansAccent (e){
    let accent = [
        /[\300-\306]/g, /[\340-\346]/g, // A, a
        /[\310-\313]/g, /[\350-\353]/g, // E, e
        /[\314-\317]/g, /[\354-\357]/g, // I, i
        /[\322-\330]/g, /[\362-\370]/g, // O, o
        /[\331-\334]/g, /[\371-\374]/g, // U, u
        /[\321]/g, /[\361]/g, // N, n
        /[\307]/g, /[\347]/g, // C, c
    ];
    let noaccent = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];

    let str = e;
    for(let i = 0; i < accent.length; i++){
        str = str.replace(accent[i], noaccent[i]);
    }
    return str;
}

//Ajax lecture fichier text
function lire_fichier() {
    let prenoms = []
    $.ajax({
        type: "GET",
        async: false,
        url: "prenoms.txt",
        error: function (msg) {
            // message en cas d'erreur :
            alert("Assurez vous de la présence du fichier prenoms.txt" +
                "\rVérifiez que ce dernier se nomme exactement prenoms.txt" +
                "\rErreur type: " +msg);
        },
        success: function (data) {
            data = data.split('\r\n')
            for (let i = 0; i < data.length; i++){
                prenoms[i] = data[i]
            }
        }
    })
    return prenoms
}

function addPrenom(p){
    let alpha = 'abcdefghijklmnopqrstuvwxyz'
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
