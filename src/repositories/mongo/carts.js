import { cartModel } from './models/cart.js';

import { dbConnection } from '../../utils/db.js';

const cartsRepository = {
  init: async () => {
    dbConnection();
  },
  add: async (cart) => {
    const newCart = await cartModel.create(cart);
    return newCart;
  },
  get: async (id) => {
    const cart = await cartModel.findById(id);
    await cart.populate('products.product');
    return cart;
  },
  delete: async (cartId) => {
    const cart = await cartModel.findById(cartId);
    if (cart) {
      cart.products = [];
      await cart.save();
      return cart;
    }
    return null;
  },
  addProduct: async (cartId, product) => {
    const cart = await cartModel.findById(cartId);
    if (cart) {
      cart.products.push(product);
      await cart.save();
      return cart;
    }
    return null;
  },
  updateProducts: async (cartId, products) => {
    const cart = await cartModel.findById(cartId);
    if (cart) {
      cart.products = products;
      await cart.save();
      return cart;
    }
    return null;
  },
  updateProduct: async (cartId, productId, quantity) => {
    const cart = await cartModel.findById(cartId);
    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) => p.product.toString() === productId
      );
      if (productIndex !== -1) {
        cart.products[productIndex].quantity = quantity;
        await cart.save();
        return cart;
      }
    }
    return null;
  },
  deleteProduct: async (cartId, productId) => {
    const cart = await cartModel.findById(cartId);
    if (cart) {
      cart.products = cart.products.filter(
        (p) => p.product.toString() !== productId
      );
      await cart.save();
      return cart;
    }
    return null;
  },
};

export default cartsRepository;
