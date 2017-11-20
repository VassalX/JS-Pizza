var nameIsOk = false;
var telIsOk = false;
var adressIsOk = false;

$(".input-panel").ready(function(){
    var patternName = /^[ЁёІіЇїЄєA-Za-zА-Яа-я\s]+$/;
    var patternTel = /^[0-9]{4,15}/;
    var patternAdress = /.{5,}/;

    var name = $("#inputName");
    var tel = $("#inputTel");
    var adress = $("#inputAdress");

    var messageName = $("#nameValid");
    var messageTel = $("#telValid");
    var messageAdress = $("#adressValid");

    name.blur(function(){
        nameIsOk = fieldValidation(name, patternName,messageName);
        $(".next-step").attr('disabled',!(nameIsOk && telIsOk && adressIsOk));
    });

    tel.blur(function(){//TODO баг какой то
        telIsOk = fieldValidation(tel, patternTel, messageTel);
        $(".next-step").attr('disabled',!(nameIsOk && telIsOk && adressIsOk));
    });

    adress.blur(function(){
        adressIsOk = fieldValidation(adress, patternAdress, messageAdress);
        $(".next-step").attr('disabled',!(nameIsOk && telIsOk && adressIsOk));
    });
});

function fieldValidation(field,pattern,message){
    if(field.val() != ''){
        console.log("1:",field.val().search(pattern));
        if(field.val().search(pattern) == 0){
            message.text("");
            field.addClass("ok");
            field.removeClass("error");
            return true;
        }else{
            message.text("Ви ввели некоректні дані!");
            field.addClass("error");
            field.removeClass("ok");
        }
    }else{
        message.text("Це поле не може бути пустим!");
        field.addClass("error");
        field.removeClass("ok");
    }
    return false;
}