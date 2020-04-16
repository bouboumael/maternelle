$(document).ready(function(){
    let page = document.location.pathname;
    //local dev
    if (page.search('maternelle') !== -1){
        page = page.replace(/\/maternelle\//g,'')
        page = page.replace(/pages\//g,'')
        page = page.replace(/.html/g, "")
    }else {
        //prod
        page = page.replace(/\/pages\//g,'')
        page = page.replace(/.html/g, "")
    }

    switch (page) {
        case ('chiffres&lettres'):
        case ('prenoms'):
            $('#navbar').load('navbars/navbarPages.html')
            break;
        default:
    }
});

