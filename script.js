let cartItems = [];

function addToCart(productId, productName, price) {
  const item = { id: productId, name: productName, price: price };
  cartItems.push(item);
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById('cart-items');
  cartList.innerHTML = '';

  cartItems.forEach((cartItem) => {
    const listItem = document.createElement('li');
    listItem.textContent = cartItem.name + ' - ETH' + cartItem.price;
    cartList.appendChild(listItem);
  });
}

function pay()
{
  if (typeof window.ethereum === 'undefined') {
    alert('Please install Metamask to proceed with the payment.');
    return;
  }

  ethereum.request({ method: 'eth_requestAccounts' })
    .then(handleAccounts)
    .catch(handleError);
    // ethereum.request function is part of the Ethereum JavaScript API . function takes an object as its argument, specifying the method and parameters for the request

}

function handleAccounts(accounts) {
  const userAddress = accounts[0];
  const paymentAmount = calculatePaymentAmount();

  ethereum.request({
    method: 'eth_sendTransaction',
    params: [
      {
        from: userAddress,
        to: '0x3Fe9dC4107f1B25DB7d6609454182dDdc185efF7',
        value: paymentAmount,
      },
    ],
  })
    .then(handleTransactionSuccess)
    .catch(handleError);
}

function handleTransactionSuccess(txHash) {
  alert('Payment successful!\nTransaction Hash: ' + txHash);
  removePurchasedProducts();
  // displays an alert with the payment success message and the transaction hash. Then it calls the removePurchasedProducts() function to remove the purchased products from the cart and the website.
}

function handleError(error) {
  alert('Payment failed or an error occurred. Please try again.');
  console.error(error);
}

function calculatePaymentAmount() {
  let totalAmount = 0;

  cartItems.forEach((cartItem) => {
    totalAmount += cartItem.price;
  });

  const paymentAmount = totalAmount * 1e18;

  return paymentAmount.toString();
}

function removePurchasedProducts() {
  const purchasedProducts = [...cartItems];
  cartItems = [];
  updateCart();

  purchasedProducts.forEach((cartItem) => {
    removeProductFromWebsite(cartItem.id);
  });
}

function removeProductFromWebsite(productId) {
  const productElement = document.getElementById(productId);
  if (productElement) {
    productElement.remove();
  }
}

function clearCart() {
  cartItems = [];
  updateCart();
}
