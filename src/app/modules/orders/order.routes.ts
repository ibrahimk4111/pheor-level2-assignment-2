import { Router } from "express";
import { orderController } from "./order.controller";

const router = Router();

router
  .get("/search?", orderController.searchOrder)
  .post("/", orderController.createOrder)
  .get("/", orderController.getAllOrders)
  .get("/:id", orderController.getSingleOrder)
  .put("/:id", orderController.updateOrder)
  .delete("/:id", orderController.deleteOrder);

export const orderRouters = router;
