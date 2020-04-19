$(document).ready(function(){
    let page = document.title;
    switch (page) {
        case ('Prénoms de la classe'):
        case ('Les Chiffres et les Lettres'):
            $('#navbar').load('navbar.html')
            break;
        default:
    }
});






