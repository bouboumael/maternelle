export default class Chrono {

    _largeur
    _distance
    _pourcent
    _debut
    _timer
    _reduct

    constructor(course, route, snail, laitue) {
        this._course = course
        this._route = route
        this._snail = snail
        this._laitue = laitue
        this._position = 0
        this._time = 20
        this._ms = 10
    }

    /**
     * définition des variables de calcul
     */
    define(){
        this.largeur = this.route.clientWidth
        this.distance = this.largeur-100
        this.pourcent = (this.ms*(this.distance/this.time))/1000
        this.debut = (this.course.clientWidth-this.route.clientWidth)/2
    }

    /**
     * start chrono
     */
    start(){
        this.define()
        this.timer = setInterval(this.move.bind(this), this.ms)
    }

    /**
     * stop chrono
     */
    stop(){
        clearInterval(this.timer)
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
        this.laitueDimension(true)
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
        this.laitue.style.left = this.positionLeft('laitue')
        this.laitue.style.top = this.course.offsetTop + ((this.route.height-this.laitue.height)/2) + "px"
    }

    /**
     * animation du chrono escargot
     */
    move (){
        if (this.laitue.style.visibility === ""){
            this.snail.style.top = '-130px'
            this.laitue.style.visibility = 'visible'
            this.laitue.style.top = this.course.offsetTop + ((this.route.height-this.laitue.height)/2) + "px"
            this.laitue.style.left = this.positionLeft('laitue')
        }
        if (this.position > this.largeur - (this.snail.clientWidth)){
            this.stop()
            this.laitue.classList.add('finish')
            this.reduct = setInterval(function (){
                if (this.laitue.clientWidth > 1){
                    this.laitueDimension(false)
                }else{
                    clearInterval(this.reduct)
                }
            }.bind(this),100)
        }else {
            if (this.snail.style.display === '') {
                this.snail.style.display = 'block'
            }
            this.snail.style.left = this.positionLeft('snail')
            this.position = this.position + this.pourcent
        }
    }

    //dimenssionnement de la laitue
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
            this.laitue.style.top = this.course.offsetTop + ((this.route.height-this.laitue.height)/2) + "px"
            this.laitue.style.left = this.positionLeft('laitue')
        }
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
                left = this.debut + this.position+"px"
                break
            case 'laitue':
                left = (this.course.offsetLeft + this.debut + this.route.clientWidth) - this.laitue.clientWidth +"px"
                break
            default:
                break
        }

        return left

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


}