let donnees

if (donnees === undefined ){
    pagesJson()
}

function sheets(){
    for (let j = 1; j <nbPage(); j++){
        if(document.getElementById('css-' + j)){
            document.getElementById('css-' + j).remove()
        }
    }
    let head = document.head
    let stylesheet = document.createElement('link')
    let js = document.createElement('script')
    for (let i = 0; i < nbPage(); i++) {
        if (donnees[i].titre === document.title) {
            stylesheet.setAttribute('rel', 'stylesheet')
            stylesheet.setAttribute('class', 'stylesheet')
            stylesheet.setAttribute('id', 'css-'+donnees[i].id)
            stylesheet.setAttribute('href', donnees[i].css)
            head.append(stylesheet)
            if (donnees[i].js !== false){
                js.setAttribute('src', donnees[i].js)
                js.setAttribute('id', 'js-' + donnees[i].id)
                document.body.append(js)
            }
        }
    }
}

function page(e) {
    document.title = e.innerText
    let pages = informations(e.innerText)
    $('body').load(pages.file)
    sheets()
}

//nombre de pages listée dans donnees
function nbPage (){
    let nbPage = 0
    while (donnees[nbPage]){
        nbPage++
    }
    return nbPage
}

//récupère les informations de la page grace au titre et retourne les infos
function informations(titre){
    for (let i = 0; i < nbPage(); i++) {
        if (donnees[i].titre === titre) {
            return donnees[i]
        }
    }
}

//recupère json
function pagesJson() {
    $.ajax({
        type: "Get",
        url: "pages/pages.json",
        dataType: "json",
        async: false,
        success: function(data) {
            donnees = data
            sheets()
        },
        error: function(){
            alert("json not found");
        }
    })
}