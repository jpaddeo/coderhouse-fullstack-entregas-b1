import cartsRepository from '../repositories/carts.js';

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
  addProduct: async (id, product) => {
    return await cartsRepository.addProduct(id, product);
  },
};

export default cartsService;
