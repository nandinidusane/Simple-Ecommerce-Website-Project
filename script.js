let cartItems = [];

function addToCart(productId, productName, price) {
  const item = { id: productId, name: productName, price: price };
  cartItems.push(item);
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById('cart-items');
  cartList.innerHTML = '';
  
  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const listItem = document.createElement('li');
    listItem.innerHTML = cartItem.name + ' - Rs' + cartItem.price;
    cartList.appendChild(listItem);
  }
}

function pay() {
  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const productElement = document.getElementById(cartItem.id);
    productElement.style.display = 'none';
  }
  
  cartItems = [];
  updateCart();
}
