import { Router } from "express";
import { productController } from "./product.controller";

const router = Router();

router
  .get("/search?", productController.searchProduct)
  .post("/", productController.createProduct)
  .get("/", productController.getAllProducts)
  .get("/:id", productController.getSingleProduct)
  .put("/:id", productController.updateProduct)
  .delete("/:id", productController.deleteProduct);

export const productRouters = router;
