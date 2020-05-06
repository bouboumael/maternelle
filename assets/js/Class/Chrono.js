import Grille from "./Grille.js";

export default class Chrono{

    _largeur
    _distance
    _pourcent
    _debut
    _timer
    _reduct
    _jump
    _lose

    constructor(course, route, snail, laitue, success, objectif) {
        this._course = course
        this._route = route
        this._snail = snail
        this._laitue = laitue
        this._success = success;
        this._objectif = objectif;
        this._position = 0
        this._time = 15
        this._ms = 10
        this._lose = false
    }

    /**
     * définition des variables de calcul
     */
    define(){
        this.largeur = this.route.clientWidth
        this.distance = this.largeur-this.snail.clientWidth
        this.pourcent = (this.ms*(this.distance/this.time))/1000
        this.debut = (this.course.clientWidth-this.route.clientWidth)/2
    }

    /**
     * start chrono
     */
    start(){
        this.define()
        this.snailTop()
        this.timer = setInterval(this.move.bind(this), this.ms)
    }

    /**
     * stop chrono
     */
    stop(message){
        clearInterval(this.timer)
        if (message){
              this.resultat(message)
        }
    }

    /**
     * reset des éléments du chrono
     */
    reset(){
        this.stop()
        clearInterval(this.reduct)
        this.position = 0
        this.snail.style.left = this.positionLeft('snail')
        this.laitue.classList.remove('finish')
        if (this.success.style.display === "block"){
            this.success.style.display = ''
            this.course.style.display = 'block'
            this.objectif.style.display = 'block'
        }
        this.laitueDimension(true)
    }

    /**
     * affichage fin de partie
     */
    resultat(message){
        this.objectif.style.display = 'none'
        this.success.style.display = "block"
        this.success.innerText = message
        this.snailTop()
    }

    /**
     * replacement des éléments après redimenssionnage de la fenetre
     * @param course
     * @param route
     */
    resize(course, route){
        this.debut = (course.clientWidth-route.clientWidth)/2
        this.course = course
        this.route = route
        this.snail.style.left = this.positionLeft('snail')
        this.snailTop()
        this.laitueDimension(true)
    }

    /**
     * animation du chrono escargot
     */
    move (){
        if (this.laitue.style.visibility === ""){
            this.laitueDimension(true)
            this.snail.style.left = this.positionLeft('snail')
            this.snail.style.visibility = 'visible'
        }
        if (this.position > this.largeur - this.snail.clientWidth){
            this.resultat('PERDU')
            this.animeLose(document.querySelectorAll('.lettre'))
            this.laitueDimension(true)
            this.lose = true
            this.stop()
            this.laitue.classList.add('finish')
            this.reduct = setInterval(function (){
                if (this.laitue.clientWidth > 40){
                    this.laitueDimension(false)
                }else{
                    clearInterval(this.reduct)
                }
            }.bind(this),100)
        }else{
            this.lose = false
            this.snail.style.left = this.positionLeft('snail')
            this.position = this.position + this.pourcent
        }
    }

    /**
     * dimenssionnement de la laitue
     * @param start
     */
    laitueDimension (start){
        if (start !== true){
            this.laitue.style.width = (this.laitue.clientWidth - 2)+"px"
            this.laitue.style.height = (this.laitue.clientHeight - 2)+"px"
            this.laitue.style.left = this.positionLeft('laitue')
            this.laitue.style.top = this.laitue.offsetTop + 1 + "px"
        }else{
            this.laitue.style.width = '100px'
            this.laitue.style.height = '100px'
            this.laitue.style.opacity = ""
            this.laitue.style.visibility = 'visible'
            this.laitue.style.top = this.course.offsetTop + ((this.route.height-this.laitue.height)/2) + "px"
            this.laitue.style.left = this.positionLeft('laitue')
        }
    }

    /**
     * Animation de sautt de la laitue
     */
    laitueJump(laitueTop, routeTop){
        let jumpUp = routeTop
        let laituePosition = laitueTop
        let jump = laituePosition - jumpUp
        let pixeltop = (this.ms*jump)/500
        let up = true
        let nb = 0
        this.jump = setInterval(function () {
            if (up === true) {
                laituePosition = laituePosition - pixeltop
                this.laitue.style.top = laituePosition + "px"
                if (this.laitue.offsetTop < routeTop) {
                    up = false
                    nb++
                }
            }else{
                laituePosition = laituePosition + pixeltop
                this.laitue.style.top = laituePosition + "px"
                if (this.laitue.offsetTop > laitueTop) {
                    up = true
                    nb++
                }
            }
            if (nb === 10){
                this.laitueJumpStop()
            }
            console.log(nb, up)
        }.bind(this), this.ms)
    }

    laitueJumpStop(){
        clearInterval(this.jump)
    }

    /**
     * positionnement de l'escargot en hauteur
     */
    snailTop(){
        this.snail.style.top = this.course.offsetTop + ((this.route.height-this.snail.height)/2) + "px"
    }

    /**
     * positionnement des éléments en css left
     * @param e
     * @returns {string}
     */
    positionLeft(e){
        let left
        switch (e) {
            case 'snail':
                left = this.course.offsetLeft + this.debut + this.position+"px"
                break
            case 'laitue':
                left = (this.course.offsetLeft + this.debut + this.route.clientWidth) - this.laitue.clientWidth +"px"
                break
            default:
                break
        }

        return left

    }

    animeLose (selectors){
        let grille = new Grille()
        selectors.forEach((div) => {
            if (div.innerText.toLowerCase() === this.objectif.innerText.toLowerCase()){
                div.classList.add('selected')
                div.style.backgroundColor = "red"
                grille.rotateOn(div, document.getElementById('grille'))
                let i = 1
                div.ontransitionend = function () {
                    if (i > 2){
                        grille.rotateOff()
                    }
                    i++
                }
            }
        })
    }

    get course() {
        return this._course;
    }

    set course(value) {
        this._course = value;
    }

    get route() {
        return this._route;
    }

    set route(value) {
        this._route = value;
    }

    get snail() {
        return this._snail;
    }

    set snail(value) {
        this._snail = value;
    }

    get laitue() {
        return this._laitue;
    }

    set laitue(value) {
        this._laitue = value;
    }

    get largeur() {
        return this._largeur;
    }

    set largeur(value) {
        this._largeur = value;
    }

    get distance() {
        return this._distance;
    }

    set distance(value) {
        this._distance = value;
    }

    get pourcent() {
        return this._pourcent;
    }

    set pourcent(value) {
        this._pourcent = value;
    }

    get debut() {
        return this._debut;
    }

    set debut(value) {
        this._debut = value;
    }

    get position() {
        return this._position;
    }

    set position(value) {
        this._position = value;
    }

    get timer() {
        return this._timer;
    }

    set timer(value) {
        this._timer = value;
    }

    get time() {
        return this._time;
    }

    set time(value) {
        this._time = value;
    }

    get ms() {
        return this._ms;
    }

    set ms(value) {
        this._ms = value;
    }

    get reduct() {
        return this._reduct;
    }

    set reduct(value) {
        this._reduct = value;
    }

    get success() {
        return this._success;
    }

    set success(value) {
        this._success = value;
    }

    get objectif() {
        return this._objectif;
    }

    set objectif(value) {
        this._objectif = value;
    }


    get jump() {
        return this._jump;
    }

    set jump(value) {
        this._jump = value;
    }

    get lose() {
        return this._lose;
    }

    set lose(value) {
        this._lose = value;
    }
}