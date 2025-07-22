import path from 'path';
import { readFile, writeFile } from 'fs/promises';

import { createIfNotExistsFile } from '../utils/files.js';

const CARTS_FILEPATH = path.resolve('data', 'carts.json');

const cartsRepository = {
  init: async () => {
    await createIfNotExistsFile(CARTS_FILEPATH);
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
};

export default cartsRepository;
