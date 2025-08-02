import express from 'express';

import cartsService from '../services/carts.js';

const router = express.Router();

router.get('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartsService.get(cid);
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: `Carrito ${cid} no encontrado` });
    }
    return res.status(200).json({ success: true, payload: cart });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const cart = await cartsService.add();
    return res.status(201).json({ success: true, payload: cart });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

router.put('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const { products } = req.body;

    const cart = await cartsService.updateProducts(cid, products);

    res.status(200).json({
      success: true,
      payload: cart,
      message: 'Productos del carrito actualizados exitosamente',
    });
  } catch (error) {
    res.status(500).json({ succcess: false, error: error.message });
  }
});

router.delete('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartsServupdateProductsice.delete(cid);

    res.status(200).json({
      success: true,
      payload: cart,
      message: 'Productos del carrito eliminados exitosamente',
    });
  } catch (error) {
    res.status(404).json({ success: false, error: error.message });
  }
});

router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartsService.addProduct(cid, {
      product: pid,
      quantity: 1,
    });
    res.status(201).json({ success: true, payload: cart });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.put('/:cid/product/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 0) {
      return res
        .status(400)
        .json({ success: false, message: 'Cantidad inválida' });
    }

    const cart = await cartsService.updateProduct(cid, pid, quantity);

    res.status(200).json({
      success: true,
      payload: cart,
      message: 'Producto actualizado en el carrito exitosamente',
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.delete('/:cid/product/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const cart = await cartsService.deleteProduct(cid, pid, quantity);

    res.status(200).json({
      success: true,
      payload: cart,
      message: 'Producto eliminado del carrito exitosamente',
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
