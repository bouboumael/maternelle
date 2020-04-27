import Alphabet from "./Alphabet.js";

export default class Grille extends Alphabet{

    _alphaDouble

    constructor() {
        super();
    }

    /**
     * Insertion des lettres de l'alphabet dans la grille
     */
    fill(alpha, nbLigne, grille, nbLettre = 6) {
        //créer une ligne
        let nbId = 1
        for (let i = 1 ; i<= nbLigne; i++){
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
            }while (t < nbLettre )
        }
    }

    /**
     * Mélange la lettre dans 2 alphabets dont 1 tronqué
     * @returns {*}
     */
    doubleAlphabet(){
        let lettre = "a"
        this.alphaDouble = this.shuffle((this.alpha + this.alpha.substring(0,23)).split(""))
        let nb = 1
        for (let i = 0; i <= this.alphaDouble.length; i++){
            if (nb === 1 && this.alphaDouble[i] === lettre){
                this.alphaDouble.splice(this.alphaDouble.indexOf(lettre), 1)
                nb--
            }
        }
        return this.alphaDouble
    }

    /**
     * SSupprime les lettres de la grille
     */
    removeLetter(){
        let elements = document.querySelectorAll('.ligne-lettre');
        for (let element of elements) {
            element.remove();
        }
    }

    /**
     * Actions quand click sur lettre de la grille
     */
    select(e, objectif) {
        let classDiv = e.classList;
        if (this.sansAccent(objectif.innerText.toLowerCase()).split("").indexOf(e.innerText.toLowerCase()) !== -1) {
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
    }

    get alphaDouble() {
        return this._alphaDouble;
    }

    set alphaDouble(value) {
        this._alphaDouble = value;
    }

}