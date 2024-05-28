import { responseHandler } from "../../helpers/responseHandler";
import { productService } from "../products/product.service";
import { orderService } from "./order.service";
import { AsyncHandler } from "../../helpers/AsyncHandler";
import { RequestHandler } from "express";

const createOrder: RequestHandler = AsyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const message = await productService.updateProductAfterOrderMade(productId, quantity);
  if(message == 'ok'){
    const result = await orderService.createOrderToDB(req.body);
    responseHandler(res, 200, true, "Order created successfully!", result);
  }
});

const getAllOrders: RequestHandler = AsyncHandler(async (req, res) => {
  const result = await orderService.getAllOrdersFromDB();
  responseHandler(res, 200, true, "Order fetched successfully!", result);
});

const getSingleOrder: RequestHandler = AsyncHandler(async (req, res) => {
  const result = await orderService.getSingleOrdersFromDB(req.params.id);
  responseHandler(res, 200, true, "Order fetched successfully!", result);
});

const searchOrder: RequestHandler = AsyncHandler(async (req, res) => {
  const { email } = req.query;
  const result = await orderService.searchOrdersFromDB(email as string);
  responseHandler(res, 200, true, "Order fetched successfully!", result);
});

const updateOrder: RequestHandler = AsyncHandler(async (req, res) => {
  const result = "updateOrder";
  responseHandler(res, 200, true, "order updated successfully!", result);
});

const deleteOrder: RequestHandler = AsyncHandler(async (req, res) => {
  const result = await orderService.deleteOrderFromDB(req.params.id);
  responseHandler(res, 200, true, "order deleted successfully!", result);
});

export const orderController = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  searchOrder,
  updateOrder,
  deleteOrder,
};
