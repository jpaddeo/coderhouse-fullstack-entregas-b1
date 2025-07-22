import express from 'express';

import productsService from '../services/products.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const products = await productsService.getAll();
  res.json(products);
});

router.get('/:pid', async (req, res) => {
  const { pid } = req.params;
  if (pid) {
    const product = await productsService.get(pid);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    return res.json(product);
  }
  const products = await productsService.getAll();
  res.json(products);
});

router.post('/', async (req, res) => {
  const newProduct = req.body;
  const product = await productsService.add(newProduct);
  const products = await productsService.getAll();
  req.app.io.emit('socket:products_update', products);
  res.status(201).json(product);
});

router.put('/:pid', async (req, res) => {
  const { pid } = req.params;
  const updatedProduct = req.body;
  const product = await productsService.update(pid, updatedProduct);
  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  const products = await productsService.getAll();
  req.app.io.emit('socket:products_update', products);
  res.json(product);
});

router.delete('/:pid', async (req, res) => {
  const { pid } = req.params;
  const deletedProduct = await productsService.delete(pid);
  if (!deletedProduct) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  res.json(deletedProduct);
});

export default router;
