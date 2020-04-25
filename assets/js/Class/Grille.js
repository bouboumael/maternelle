export default class Grille {

//insertion des lettre de l'alphabet dans la grille
    fill(alpha, nbLigne, grille) {
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

}