function addToCart(productId) {
  if (cartId) {
    fetch(`/api/carts/${cartId}/product/${productId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('Producto agregado al carrito exitosamente.');
        } else {
          alert('Error al agregar el producto al carrito.');
        }
      })
      .catch((error) => console.error('Error:', error));
  } else {
    fetch('/api/carts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          cartId = data.payload._id;
          addToCart(productId);
          alert(`Carrito #${cartId} creado y producto agregado exitosamente.`);
        } else {
          alert('Error al crear el carrito o agregar el producto.');
        }
      })
      .catch((error) => console.error('Error:', error));
  }
}
