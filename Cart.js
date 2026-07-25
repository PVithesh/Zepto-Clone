let CART_KEY = "cartItems";

function getCartItems() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCartItems(cartItems){
    return localStorage.setItem(CART_KEY,JSON.stringify(cartItems));
}

