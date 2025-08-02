import path from 'path';
import { randomUUID } from 'crypto';

import { readFile, writeFile } from 'fs/promises';

import { createIfNotExistsFile } from '../../utils/files.js';

const PRODUCTS_FILEPATH = path.resolve('data', 'products.json');

const productsRepository = {
  init: async () => {
    console.log(
      '[INICIO] - Validación y/o creación de archivo de datos de productos.'
    );
    await createIfNotExistsFile(PRODUCTS_FILEPATH);
    console.log(
      '[FIN] - Validación y/o creación de archivo de datos de productos.'
    );
  },
  add: async (product) => {
    const productsFile = await readFile(PRODUCTS_FILEPATH, 'utf8');
    const products = JSON.parse(productsFile);
    products.push({ _id: randomUUID(), ...product });
    await writeFile(PRODUCTS_FILEPATH, JSON.stringify(products, null, 2));
    return products;
  },
  get: async (id) => {
    const productsFile = await readFile(PRODUCTS_FILEPATH, 'utf8');
    const products = JSON.parse(productsFile);
    return products.find((product) => product._id === id);
  },
  getAll: async (query) => {
    const productsFile = await readFile(PRODUCTS_FILEPATH, 'utf8');
    return JSON.parse(productsFile);
  },
  update: async (id, updatedProduct) => {
    const productsFile = await readFile(PRODUCTS_FILEPATH, 'utf8');
    const products = JSON.parse(productsFile);
    const index = products.findIndex((product) => product._id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...updatedProduct };
      await writeFile(PRODUCTS_FILEPATH, JSON.stringify(products, null, 2));
      return products[index];
    }
    return null;
  },
  delete: async (id) => {
    const productsFile = await readFile(PRODUCTS_FILEPATH, 'utf8');
    const products = JSON.parse(productsFile);
    const index = products.findIndex((product) => product._id === id);
    if (index !== -1) {
      const deletedProduct = products.splice(index, 1);
      await writeFile(PRODUCTS_FILEPATH, JSON.stringify(products, null, 2));
      return deletedProduct[0];
    }
    return null;
  },
};

export default productsRepository;
