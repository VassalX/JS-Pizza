var $order = $(".order-page-panel");
var $name = $order.find(".name");
var $tel = $order.find(".tel");
var $adress = $order.find(".adress");
var api = require('../API');
function checkName(){

}
function checkOrder(){
    var nameIsOk = true;
    var telIsOk = true;
    var adressIsOk = true;
    if(nameIsOK && telIsOk && adressIsOk)
        api.createOrder()
}
$order.find(".next-step").click(function () {
    checkOrder();
});
exports.checkOrder = checkOrder;
