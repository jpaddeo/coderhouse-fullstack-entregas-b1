// import cartsRepository from '../repositories/fs/carts.js';
import cartsRepository from '../repositories/mongo/carts.js';

const cartsService = {
  init: async () => {
    await cartsRepository.init();
  },
  add: async (product) => {
    return await cartsRepository.add(product);
  },
  get: async (id) => {
    return await cartsRepository.get(id);
  },
  delete: async (id) => {
    return await cartsRepository.delete(id);
  },
  addProduct: async (id, product) => {
    return await cartsRepository.addProduct(id, product);
  },
  updateProducts: async (id, products) => {
    return await cartsRepository.updateProducts(id, products);
  },
  updateProduct: async (cartId, productId, quantity) => {
    return await cartsRepository.updateProduct(cartId, productId, quantity);
  },
  deleteProduct: async (cartId, productId) => {
    return await cartsRepository.deleteProduct(cartId, productId);
  },
};

export default cartsService;
