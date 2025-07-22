import { Router } from "express";
import productsRepository from "../repositories/products.js";

const router = Router();

router.get("/", async (req, res) => {
  const products = await productsRepository.getAll(req.query);
  res.render("home", {
    title: "JPA-ECommerce",
    products: JSON.parse(JSON.stringify(products)),
  });
});

router.get("/realtimeproducts", async (req, res) => {
  const products = await productsRepository.getAll(req.query);
  res.render("realTimeProducts", {
    title: "JPA-ECommerce | Productos",
    products: JSON.parse(JSON.stringify(products)),
  });
});

export default router;
