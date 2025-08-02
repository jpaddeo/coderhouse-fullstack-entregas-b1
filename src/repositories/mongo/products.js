import productModel from './models/product.js';

import { dbConnection } from '../../utils/db.js';

const productsRepository = {
  init: async () => {
    dbConnection();
  },
  add: async (product) => {
    const newProduct = await productModel.create(product);
    return newProduct;
  },
  get: async (id) => {
    const product = await productModel.findById(id);
    return product;
  },
  getAll: async (query, options) => {
    const products = await productModel.paginate(query, options);
    return products;
  },
  update: async (id, updatedProduct) => {
    const product = await productModel.findByIdAndUpdate(id, updatedProduct, {
      new: true,
    });
    return product;
  },
  delete: async (id) => {
    const product = await productModel.findByIdAndDelete(id);
    return product;
  },
};

export default productsRepository;
