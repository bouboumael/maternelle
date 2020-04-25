import Alphabet from "./Class/Alphabet.js";

let consigne = $('#consigne');
let corps = $('#corps');
let btn_number = "<button class=\"btn btn-primary col-2\" id='btn_number' type=\"button\">Chiffre</button>";
let btn_letter = "<button class=\"btn btn-success col-2\" id='btn_letter' type=\"button\">Lettre</button>";
let lettre = $('#letter');
let nombre = $('#number');
let saisieLetter = $('#saisie_letter');
let saisieNum = $('#saisie_num');
let success = $('#success');
let error = $('#error');
let smileyS = '<img id="img_success" src="../images/success3.png" alt="">';
let smileyE = '<img id="img_error" src="../images/error1.png" alt="">';
let num = [];
let alphabet = new Alphabet()

$(document).ready(function(){
    $('input').on('change keyup paste', function(){
        $(this).val($(this).val().toUpperCase());
    });
});

let test = function() {
    $('#prenom').text('Les Chiffres et les lettres');
    //$('#acceuil').hide();
    consigne.css('display', '');
    $(corps).append(`<div id="btn_choix" class="mt-3">${btn_letter}${btn_number}</div>`);
    $("#btn_letter").on("click", function(){
        let l = alphabet.letter().toUpperCase()
        $("#btn_number").html('Chiffre');
        $("#btn_letter").html('Lettre suivante');
        saisieNum.css('display', 'none');
        success.css('display', 'none');
        error.css('display', 'none');
        saisieLetter.val('');
        if (nombre.css('display') !== 'none'){
            nombre.css('display', 'none');
        }
        if (lettre.css('display') === 'none'){
            lettre.css('display', '');
        }

        $('#sound').attr('src', sound(l));
        lettre.click(function () {
            if  (success.css('display') === 'none'){
                $('#sound')[0].play();
            }
        });

        lettre.text(l);
        if (saisieLetter.css('display') !== ''){
            saisieLetter.css('display', '');
            if(isMobileDevice()===false){
                saisieLetter.focus();
            }
        }
        validate('letter');
    });

    $("#btn_number").on("click", function(){
        $("#btn_number").html('Chiffre Suivant');
        $("#btn_letter").html('Lettre');
        saisieLetter.css('display', 'none');
        success.css('display', 'none');
        error.css('display', 'none');
        saisieNum.val('');
        if (lettre.css('display') !== 'none'){
            lettre.css('display', 'none');
        }
        if (nombre.css('display') === 'none'){
            nombre.css('display', '');
        }
        if (num.length === 11){
            num = [];
        }
        num = number(num);
        nombre.text(num[0]);
        $('#sound').attr('src', sound(num[0]));
        nombre.click(function () {
            if  (success.css('display') === 'none'){
                $('#sound')[0].play();
            }
        });
        if (saisieNum.css('display') !== ''){
            saisieNum.css('display', '');
            if (isMobileDevice()===true){
                saisieNum.attr('type', 'tel');
            }
            if (isMobileDevice()===false){
                saisieNum.focus();
            }
        }
        validate('number')
    });
};

test();

function number(n) {
    let minNumber = 0;
    let maxNumber = 10;
    let num = Math.floor(Math.random() * (maxNumber + 1) + minNumber);
    while ($.inArray(num, n) !== -1){
        num = Math.floor(Math.random() * (maxNumber + 1) + minNumber);
    }
    n.unshift(num);
    return n;
}

function controle(num1, num2){
    return num1 === num2;
}

function validate (t){
    if(t === 'letter'){
        $(saisieLetter).change(function () {
            let control = controle(saisieLetter.val().toLowerCase(), alphabet.lettre);
            if (control === true) {
                error.css('display', 'none');
                success.css('display', '');
                lettre.text('');
                lettre.append(smileyS);
                saisieLetter.css('display', 'none');
                $('#btn_letter').focus();
            } else {
                success.css('display', 'none');
                error.css('display', '');
                lettre.children($('#img_success')).remove();
                lettre.text(alphabet.lettre.toUpperCase());
                lettre.append(smileyE);
                saisieLetter.val('');
            }
        })
    }else if (t === 'number'){
        $(saisieNum).change(function () {
            let control = controle(parseInt(saisieNum.val()), num[0]);
            if (control === true) {
                error.css('display', 'none');
                success.css('display', '');
                nombre.text('');
                nombre.append(smileyS);
                saisieNum.css('display', 'none');
                $('#btn_number').focus();
            } else {
                success.css('display', 'none');
                error.css('display', '');
                nombre.children($('#img_success')).remove();
                nombre.text(num[0]);
                nombre.append(smileyE);
                saisieNum.val('');
            }
        })
    }
    return '';
}

function isMobileDevice() {
    return !!(navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
        || window.devicePixelRatio === 2);
}

function sound(i) {
    let rep = '../sounds/';
    let extense = '.mp3';
    return rep + i + extense;
}

