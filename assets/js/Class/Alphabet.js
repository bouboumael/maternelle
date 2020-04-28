export default class Alphabet {

    constructor() {
        this._alpha = "abcdefghijklmnopqrstuvwxyz"
        this._tab = [];
    }

    /**
     * créé un tableau de lettre en prenant une lettre au hazard et en le répétant pas
     * puis retourne la lettre rajputée.
     * @returns {*}
     */
    letter() {
        if (this.tab.length === 26 ){
            this.tab = []
        }

        let alph = this._alpha.split("")

        let l = alph[Math.floor(Math.random()*26)];
        while ($.inArray(l, this.tab) !== -1){
            l = alph[Math.floor(Math.random()*26)];
        }
        this.tab.unshift(l);
        return this.lettre
    }

    /**
     * Elimine les accents des lettres
     */
    sansAccent (e){
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

    /**
     * mélange de l'alphabet + lettre en plus
     * @param a
     * @returns {*}
     */
    shuffle(a) {
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

    get alpha() {
        return this._alpha;
    }

    get tab() {
        return this._tab;
    }

    set tab(value) {
        this._tab = value;
    }

    get lettre(){
        return this._tab[0]
    }


}