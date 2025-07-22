import express from 'express';

import cartsService from '../services/carts.js';

const router = express.Router();

router.get('/:cid', async (req, res) => {
  const { cid } = req.params;
  const cart = await cartsService.get(cid);
  if (!cart) {
    return res.status(404).json({ error: `Carrito ${cid} no encontrado` });
  }
  return res.json(cart);
});

router.post('/', async (req, res) => {
  const newCart = req.body;
  const cart = await cartsService.add(newCart);
  res.status(201).json(cart);
});

router.post('/:cid/product/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const cart = await cartsService.addProduct(cid, {
    product: pid,
    quantity: 1,
  });
  res.status(201).json(cart);
});

export default router;
