function viewCart(event) {
  const cartId = document.querySelector('input[name="cid"]').value;
  if (cartId) {
    window.location.href = `/carts/${cartId}`;
  } else {
    alert('Por favor, ingresa un ID de carrito válido.');
  }
}
