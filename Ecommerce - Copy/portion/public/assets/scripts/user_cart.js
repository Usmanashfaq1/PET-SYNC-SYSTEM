document.addEventListener('DOMContentLoaded', function () {
    var cartItemsString = localStorage.getItem('idOfCartItems');
    var cart_list = JSON.parse(cartItemsString) || [];
    alert(cart_list);
});
