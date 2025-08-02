import express from 'express';

import productsService, {
  makePaginatedResponse,
} from '../services/products.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const products = await productsService.getAll(req.query);
  res.status(200).json(makePaginatedResponse(products, true));
});

router.get('/:pid', async (req, res) => {
  const { pid } = req.params;
  if (pid) {
    const product = await productsService.get(pid);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: 'Producto no encontrado' });
    }
    return res.status(200).json({ success: true, payload: product });
  }
  const products = await productsService.getAll();
  res.status(200).json(makePaginatedResponse(products, true));
});

router.post('/', async (req, res) => {
  const newProduct = req.body;
  const product = await productsService.add(newProduct);
  const products = await productsService.getAll();
  req.app.io.emit('socket:products_update', products);
  res.status(201).json({ success: true, payload: product });
});

router.put('/:pid', async (req, res) => {
  const { pid } = req.params;
  const updatedProduct = req.body;
  const product = await productsService.update(pid, updatedProduct);
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: 'Producto no encontrado' });
  }
  const products = await productsService.getAll();
  req.app.io.emit('socket:products_update', products);
  res.json({ success: true, payload: product });
});

router.delete('/:pid', async (req, res) => {
  const { pid } = req.params;
  const deletedProduct = await productsService.delete(pid);
  if (!deletedProduct) {
    return res
      .status(404)
      .json({ success: false, message: 'Producto no encontrado' });
  }
  res.json({ success: true, payload: deletedProduct });
});

export default router;
