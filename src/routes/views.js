import { Router } from 'express';

import productsService, {
  makePaginatedResponse,
} from '../services/products.js';
import cartsService from '../services/carts.js';

const router = Router();

router.get('/', async (req, res) => {
  const products = await productsService.getAll(req.query);
  res.render('home', {
    title: 'JPA-ECommerce',
    products: JSON.parse(JSON.stringify(products)),
  });
});

router.get('/products', async (req, res) => {
  const products = await productsService.getAll(req.query);
  const parsedResponse = makePaginatedResponse(products, true);
  res.render('products/index', {
    title: 'JPA-ECommerce | Productos',
    data: JSON.parse(JSON.stringify(parsedResponse)),
  });
});

router.get('/carts/:cid', async (req, res) => {
  const { cid } = req.params;
  if (cid) {
    const cart = await cartsService.get(cid);
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: 'Carrito no encontrado' });
    }
    res.render('carts/detail', {
      title: 'JPA-ECommerce | Carrito',
      cart: JSON.parse(JSON.stringify(cart)),
    });
  }
});

router.get('/products/:pid', async (req, res) => {
  const { pid } = req.params;
  if (pid) {
    const product = await productsService.get(pid);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: 'Producto no encontrado' });
    }
    res.render('products/detail', {
      title: 'JPA-ECommerce | Productos',
      product: JSON.parse(JSON.stringify(product)),
    });
  }
});

router.get('/realtimeproducts', async (req, res) => {
  const products = await productsService.getAll();
  res.render('products/realTimeProducts', {
    title: 'JPA-ECommerce | Productos',
    products: JSON.parse(JSON.stringify(products.docs)),
  });
});

export default router;
