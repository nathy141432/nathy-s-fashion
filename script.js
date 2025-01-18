const cart = [];
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');

function addToCart(productId, productName, productPrice) {
  // Check if product is already in cart
  const existingProduct = cart.find(item => item.id === productId);
  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
  }
  updateCartUI();
}

function updateCartUI() {
  // Clear the cart items container
  cartItemsContainer.innerHTML = '';

  let total = 0;

  // Populate cart items
  cart.forEach(item => {
    total += item.price * item.quantity;
    const cartItem = document.createElement('div');
    cartItem.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
    cartItemsContainer.appendChild(cartItem);
  });

  // Update total
  cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
}

// Add event listeners to product buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', (e) => {
    const productCard = e.target.closest('.product-card');
    const productId = productCard.dataset.id;
    const productName = productCard.querySelector('h2').textContent;
    const productPrice = parseFloat(productCard.querySelector('p').textContent.replace('$', ''));
    addToCart(productId, productName, productPrice);
  });
});

// Checkout button functionality
document.getElementById('checkout').addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty!');
  } else {
    alert('Thank you for your purchase!');
    cart.length = 0; // Clear cart
    updateCartUI();
  }
});
