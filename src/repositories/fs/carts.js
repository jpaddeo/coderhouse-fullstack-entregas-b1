import path from 'path';
import { readFile, writeFile } from 'fs/promises';

import { createIfNotExistsFile } from '../../utils/files.js';

const CARTS_FILEPATH = path.resolve('data', 'carts.json');

const cartsRepository = {
  init: async () => {
    console.log(
      '[INICIO] - Validación y/o creación de archivo de datos de carritos.'
    );
    await createIfNotExistsFile(CARTS_FILEPATH);
    console.log(
      '[FIN] - Validación y/o creación de archivo de datos de carritos.'
    );
  },
  add: async (cart) => {
    const cartsFile = await readFile(CARTS_FILEPATH, 'utf8');
    const carts = JSON.parse(cartsFile);
    carts.push(cart);
    await writeFile(CARTS_FILEPATH, JSON.stringify(carts, null, 2));
    return carts;
  },
  get: async (id) => {
    const cartsFile = await readFile(CARTS_FILEPATH, 'utf8');
    const carts = JSON.parse(cartsFile);
    return carts.find((cart) => cart.id === id);
  },
  delete: async (cartId) => {
    const cartsFile = await readFile(CARTS_FILEPATH, 'utf8');
    const carts = JSON.parse(cartsFile);
    const cartIndex = carts.findIndex((cart) => cart.id === cartId);
    if (cartIndex !== -1) {
      carts[cartIndex].products = [];
      await writeFile(CARTS_FILEPATH, JSON.stringify(carts, null, 2));
      return carts[cartIndex];
    }
    return null;
  },
  addProduct: async (cartId, product) => {
    const cartsFile = await readFile(CARTS_FILEPATH, 'utf8');
    const carts = JSON.parse(cartsFile);
    const cart = carts.find((c) => c.id === cartId);
    if (cart) {
      cart.products = cart.products.map((p) => {
        if (p.product === product.product) {
          return { ...p, quantity: p.quantity + product.quantity };
        }
        return p;
      });
      await writeFile(CARTS_FILEPATH, JSON.stringify(carts, null, 2));
      return cart;
    }
    return null;
  },
  updateProducts: async (cartId, products) => {
    const cartsFile = await readFile(CARTS_FILEPATH, 'utf8');
    const carts = JSON.parse(cartsFile);
    const cart = carts.find((c) => c.id === cartId);
    if (cart) {
      cart.products = products;
      await writeFile(CARTS_FILEPATH, JSON.stringify(carts, null, 2));
      return cart;
    }
    return null;
  },
  updateProduct: async (cartId, product) => {
    const cartsFile = await readFile(CARTS_FILEPATH, 'utf8');
    const carts = JSON.parse(cartsFile);
    const cart = carts.find((c) => c.id === cartId);
    if (cart) {
      const existingProduct = cart.products.find(
        (p) => p.product === product.product
      );
      if (existingProduct) {
        existingProduct.quantity += product.quantity;
      } else {
        cart.products.push(product);
      }
      await writeFile(CARTS_FILEPATH, JSON.stringify(carts, null, 2));
      return cart;
    }
    return null;
  },
  deleteProduct: async (cartId, productId) => {
    const cartsFile = await readFile(CARTS_FILEPATH, 'utf8');
    const carts = JSON.parse(cartsFile);
    const cart = carts.find((c) => c.id === cartId);
    if (cart) {
      cart.products = cart.products.filter((p) => p.product !== productId);
      await writeFile(CARTS_FILEPATH, JSON.stringify(carts, null, 2));
      return cart;
    }
    return null;
  },
};

export default cartsRepository;
