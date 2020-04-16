(function(){
    let head = document.head
    let stylesheet = document.createElement('link')
    let titre = document.title
    switch (titre) {
        case 'Jeux Ecole Maternelle du Plissay':
            stylesheet.setAttribute('rel', 'stylesheet')
            stylesheet.setAttribute('class', 'stylesheet')
            stylesheet.setAttribute('href', 'assets/css/index.css')
            head.append(stylesheet)
            break
        default:

    }
})()