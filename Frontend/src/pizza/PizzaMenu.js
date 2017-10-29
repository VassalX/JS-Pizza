/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List = require('../Pizza_List');

//HTML едемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");
var menu_info = [
    "all",
    "meat",
    "pineapple",
    "mushroom",
    "ocean"
];
function showPizzaList(list) {
    //Очищаємо старі піци в кошику
    $pizza_list.html("");

    //Онволення однієї піци
    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});

        var $node = $(html_code);

        $node.find(".buy-big").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
        });
        $node.find(".buy-small").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
        });

        $pizza_list.append($node);
    }

    list.forEach(showOnePizza);
}

function filterPizza(filter) {
    //Масив куди потраплять піци які треба показати
    var pizza_shown = [];

    Pizza_List.forEach(function(pizza){
        //Якщо піца відповідає фільтру
        if(filter === "all" || JSON.stringify(pizza.content).indexOf(filter)!==-1)
            pizza_shown.push(pizza);
        //TODO: зробити фільтри
    });
    $(".pizzaNumber").text(pizza_shown.length);
    //Показати відфільтровані піци
    showPizzaList(pizza_shown);
}

function initialiseMenu() {
    //Показуємо усі піци
    showPizzaList(Pizza_List);
    $(".pizzaNumber").text(Pizza_List.length);
    $(".chosenOption").text($(".active").text());
}

menu_info.forEach(function (menu) {
    var $filterMenu = $("."+menu);
    $filterMenu.click(function () {
        if (!$filterMenu.hasClass("active")){
            $(".chooseButton").removeClass("active");
            $filterMenu.addClass("active");
            filterPizza(menu);
            $(".chosenOption").text($(".active").text());
        }
    });
});

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;