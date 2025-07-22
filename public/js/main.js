function $(selector) {
  return document.querySelector(selector);
}
function createProduct(event) {
  event.preventDefault();
  const newProduct = {
    title: $('#title').value,
    description: $('#description').value,
    code: $('#code').value,
    price: $('#price').value,
    stock: $('#stock').value,
    categories: $('#categories')
      .value.split(',')
      .map((cat) => cat.trim()),
  };
  if (!newProduct.title || !newProduct.price || !newProduct.stock) {
    alert('Debe ingresar al menos el Titulo, Precio y Stock');
    return;
  }
  cleanForm();
  socket.emit('socket:products_create', newProduct);
}
function deleteProduct(pid) {
  socket.emit('socket:products_delete', { pid });
}
function cleanForm() {
  $('#title').value = '';
  $('#description').value = '';
  $('#code').value = '';
  $('#price').value = '';
  $('#stock').value = '';
  $('#categories').value = '';
}
const socket = io();

socket.on('connect', () => {
  console.log('Conectado al servidor de WebSocket');
});
socket.on('disconnect', () => {
  console.log('Desconectado del servidor de WebSocket');
});

socket.on('socket:error', (data) => {
  console.error(data);
  alert(data);
});

socket.on('socket:products_update', (data) => {
  $('.products-box').innerHTML = '';
  let html = '';
  data.forEach((product) => {
    html += `<hr/>
              <div class="product-card">
                  <h3>${product.title}</h3>
                  <p>Categoria: ${product.categories}</p>
                  <p>Descripción: ${product.description}</p>
                  <p>Precio: $ ${product.price}</p>
                  <button id="button-delete" onclick="deleteProduct('${product._id}')">Eliminar</button>
              </div>
              <hr/>`;
  });
  $('.products-box').innerHTML = html;
});
