import cartsService from './carts.js';
import productsService from './products.js';

export default async function initServices() {
  await productsService.init();
  await cartsService.init();
}
