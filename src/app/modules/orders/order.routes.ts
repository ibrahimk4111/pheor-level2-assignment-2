import { Router } from "express";
import { orderController } from "./order.controller";
import { ZodValidation } from "../../middlewares/zodValidation";
import orderZodSchema from "./order.validation";

const router = Router();

router
  .get("/search?", orderController.searchOrder)
  .post("/", ZodValidation(orderZodSchema), orderController.createOrder)
  .get("/", orderController.getAllOrders)
  .get("/:id", orderController.getSingleOrder)
  .put("/:id", orderController.updateOrder)
  .delete("/:id", orderController.deleteOrder);

export const orderRouters = router;
