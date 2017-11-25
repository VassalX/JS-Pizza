var API = require("../API");
var PizzaCart = require("./PizzaCart");

var nameIsOk = false;
var telIsOk = false;
var adressIsOk = false;

var patternName = /^[ІіЇїЁёа-яА-Яa-zA-Z\s]+$/;
var patternTel = /^[+]{0,1}\d{4,15}$/;
var patternAdress = /^.{5,}$/;

var nameField = $("#inputName");
var telField = $("#inputTel");
var adressField = $("#inputAdress");

var messageName = $("#nameValid");
var messageTel = $("#telValid");
var messageAdress = $("#adressValid");

var errorName = "Ім'я має складатися з літер укр., рос. або англ. алфавітів";
var errorTel = "Телефон має складатися лише з цифр, довжина від 5 до 15";
var errorAdress = "Мінімальна довжина адреси п'ять літер";

var orderInfo = $(".order-info");

function initOrderPage() {
    if(document.getElementById("googleMap")){
        google.maps.event.addDomListener(window,'load',function()	{
            var directionsDisplay = new google.maps.DirectionsRenderer();
            var directionService =	new	google.maps.DirectionsService();
            //Тут починаємо працювати з картою
            var mapProp =	{
                center:	new	google.maps.LatLng(50.464379,30.519131),
                zoom:	11
            };
            var html_element =	document.getElementById("googleMap");
            var map	=	new	google.maps.Map(html_element,	 mapProp);
            directionsDisplay.setMap(map);
            directionsDisplay.setOptions( { suppressMarkers: true } );
            //Карта створена і показана
            var point	=	new	google.maps.LatLng(50.464379,30.519131);
            var homeMarker;
            var marker	=	new	google.maps.Marker({
                position:	point,
                map:	map,  //map	- це змінна карти створена за допомогою new google.maps.Map(...)
                icon:	"assets/images/map-icon.png"
            });
            function	geocodeLatLng(latlng,	 callback){//Модуль за роботу з адресою
                var geocoder	=	new	google.maps.Geocoder();
                geocoder.geocode({'location':	latlng},	function(results,	status)	{
                    if	(status	===	google.maps.GeocoderStatus.OK&&	results[1])	{
                        var adress =	results[1].formatted_address;
                        callback(null,	adress);
                    }	else	{
                        callback(new	Error("Can't	find	adress"));
                    }
                });
            }
            google.maps.event.addListener(map,
                'click',function(me){
                    var coordinates	=	me.latLng;
                    geocodeLatLng(coordinates,	function(err,	adress){
                        if(!err)	{//Дізналися адресу
                            if(!homeMarker){
                                homeMarker = new google.maps.Marker({
                                    position: coordinates,
                                    map: map,
                                    icon: "assets/images/home-icon.png"
                                });
                            }else{
                                homeMarker.setPosition(coordinates);
                            }
                            orderInfo.find(".order-adress").text(""+adress);
                            adressField.val(""+adress);
                            checkAdress();
                            calculateRoute(point,coordinates,function(err,result){
                                if(!err){
                                    orderInfo.find(".order-time").text(""+result.duration.text);
                                }else{
                                    console.log(err);
                                }
                            });
                            console.log(adress);
                        }	else	{
                            console.log("Немає адреси");
                        }
                    });
                });
            function	calculateRoute(A_latlng,	 B_latlng,	callback)	{
                directionService.route({
                    origin:	A_latlng,
                    destination:	B_latlng,
                    travelMode:	google.maps.TravelMode["DRIVING"]
                },	function(response,	status)	{
                    if	(	status	==	google.maps.DirectionsStatus.OK )	{
                        directionsDisplay.setDirections(response);
                        var leg	=	response.routes[	0	].legs[	0	];
                        callback(null,	{
                            duration:	leg.duration
                        });
                    }	else	{
                        callback(new	Error("Can'	not	find	direction"));
                    }
                });
            }
        });
    }
}
$(".input-panel").ready(function(){

    nameField.on("input",function(){
        checkName();
    });

    telField.on("input",function() {
        checkTel();
    });

    adressField.on("input",function() {
        checkAdress();
    });
});
function checkName(){
    nameIsOk = fieldValidation(nameField, patternName,messageName,errorName);
    $(".next-step").attr('disabled',!(nameIsOk && telIsOk && adressIsOk));
}
function checkTel(){
    telIsOk = fieldValidation(telField, patternTel, messageTel,errorTel);
    $(".next-step").attr('disabled',!(nameIsOk && telIsOk && adressIsOk));
}
function checkAdress(){
    adressIsOk = fieldValidation(adressField, patternAdress, messageAdress, errorAdress);
    $(".next-step").attr('disabled',!(nameIsOk && telIsOk && adressIsOk));
}
$(".next-step").click(function () {
    var order = {
        name: nameField.val(),
        tel: telField.val(),
        adress: adressField.val(),
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
        if(pattern.test(field.val())){
            message.text("");
            field.addClass("ok");
            field.removeClass("error");
            return true;
        }else{
            message.text(messText);
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

exports.initOrderPage = initOrderPage;