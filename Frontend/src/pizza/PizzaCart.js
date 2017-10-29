/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');

//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];

//HTML едемент куди будуть додаватися піци
var $cart = $("#cart");

function addToCart(pizza, size) {
    //Додавання однієї піци в кошик покупок

    //Приклад реалізації, можна робити будь-яким іншим способом
    var isFound = false;
    Cart.forEach(function (cart_item) {
        if(!isFound && cart_item.pizza==pizza && cart_item.size==size) {
            cart_item.quantity += 1;
            isFound = true;
        }
    });
    if(!isFound)
        Cart.push({
            pizza: pizza,
            size: size,
            quantity: 1

        });

    //Оновити вміст кошика на сторінці
    updateCart();
}

function removeFromCart(cart_item) {
    var newCart = [];
    Cart.forEach(function (item) {
        if(item!=cart_item)
            newCart.push(item);
    });
    Cart = newCart;
    //Видалити піцу з кошика
    //TODO: треба зробити

    //Після видалення оновити відображення
    updateCart();
}

function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
    //TODO: ...

    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage

    //Очищаємо старі піци в кошику
    $cart.html("");

    var total = 0;

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);

        var pizza = cart_item.pizza;
        var size = cart_item.size;

        total += pizza[size].price * cart_item.quantity;

        var $node = $(html_code);
        function updatePrice(){

        }
        $node.find(".plus").click(function(){
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;

            //Оновлюємо відображення
            updateCart();
        });
        $node.find(".minus").click(function(){
            //Зменшуємо кількість замовлених піц
            cart_item.quantity -= 1;
            if(cart_item.quantity === 0)
                removeFromCart(cart_item);
            //Оновлюємо відображення
            updateCart();
        });
        $node.find(".delete").click(function () {
            removeFromCart(cart_item);

            updateCart();
        });
        $(".clear_cart").click(function () {
            Cart = [];
            updateCart();
        })
        $(".number_cart").text(Cart.length);
        $("#sum_money").text(total+" грн.");
        if(cart_item.quantity!==0) {
            $cart.append($node);
        }
    }
    $(".number_cart").text(Cart.length);
    $("#sum_money").text(total+" грн.");
    Cart.forEach(showOnePizzaInCart);
}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;