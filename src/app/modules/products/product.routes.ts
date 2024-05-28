import { Router } from "express";
import { productController } from "./product.controller";
import { ZodValidation } from "../../middlewares/zodValidation";
import ProductZodSchema from "./product.validation";

const router = Router();

router
  .get("/search?", productController.searchProduct)
  .post("/", ZodValidation(ProductZodSchema), productController.createProduct)
  .get("/", productController.getAllProducts)
  .get("/:id", productController.getSingleProduct)
  .put("/:id", productController.updateProduct)
  .delete("/:id", productController.deleteProduct);

export const productRouters = router;
