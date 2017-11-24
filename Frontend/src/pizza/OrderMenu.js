var API = require("../API");
var PizzaCart = require("./PizzaCart");

var nameIsOk = false;
var telIsOk = false;
var adressIsOk = false;

var patternName = /^[ІіЇїЁёа-яА-Яa-zA-Z\s]+$/;
var patternTel = /^[+]{0,1}\d{4,15}$/;
var patternAdress = /^.{5,}$/;

var name = $("#inputName");
var tel = $("#inputTel");
var adress = $("#inputAdress");

var messageName = $("#nameValid");
var messageTel = $("#telValid");
var messageAdress = $("#adressValid");

$(".input-panel").ready(function(){


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
$(".next-step").click(function () {
    var order = {
        name: name.val(),
        tel: tel.val(),
        adress: adress.val(),
        pizzas: PizzaCart.getPizzaInCart()
    };
    API.createOrder(order,function(err){
        if(err){
            alert("Сталася помилка :(");
            return callback(err);
        }
        alert("Ваше замовлення відправлено!");
    });
});
function fieldValidation(field,pattern,message,messText){
    if(field.val() != ''){
        //console.log(field.val().search(pattern));
        //console.log(pattern.test(field.val()));
        if(pattern.test(field.val())){
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

function initializa(){
    var mapProp = {

    }
}