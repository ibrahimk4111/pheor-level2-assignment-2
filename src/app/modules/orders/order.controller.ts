import { Request, Response } from "express";
import { responseHandler } from "../../helpers/responseHandler";
import { productService } from "../products/product.service";
import orderZodSchema from "./order.validation";
import { orderService } from "./order.service";

const createOrder = async( req: Request, res: Response) =>{
  try {
    const {productId, quantity} = req.body;
    const validationResult = orderZodSchema.parse(req.body);
    await productService.updateProductAfterOrderMade(productId, quantity);
    const result = await orderService.createOrderToDB(validationResult);
    responseHandler(req, res, 200, true, "Order created successfully!", result);
  } catch (error) {
    console.log("create order error: ", error)
  }
}

const getAllOrders = async( req: Request, res: Response) =>{
  try {
    const result = await orderService.getAllOrdersFromDB();
    responseHandler(req, res, 200, true, "Order fetched successfully!", result);
  } catch (error) {
    console.log("get all order error: ", error)
  }
}

const getSingleOrder = async( req: Request, res: Response) =>{
  try {
    const result = await orderService.getSingleOrdersFromDB(req.params.id)
    responseHandler(req, res, 200, true, "Order fetched successfully!", result);  
  } catch (error) {
    console.log("get single order error: ", error)
  }
}


const searchOrder = async( req: Request, res: Response) =>{
  try {
    const {email} = req.query;
    const result = await orderService.searchOrdersFromDB(email as string)
    responseHandler(req, res, 200, true, "Order fetched successfully!", result);  
  } catch (error) {
    console.log("search order error: ", error)
  }
}

const updateOrder = async( req: Request, res: Response) =>{
  const result = "updateOrder"
  responseHandler(req, res, 200, true, "order updated successfully!", result);
}

const deleteOrder = async( req: Request, res: Response) =>{
  try {
    const result = await orderService.deleteOrderFromDB(req.params.id)
    responseHandler(req, res, 200, true, "order deleted successfully!", result);
  } catch (error) {
    console.log("search order error: ", error)
  }
}

export const orderController = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  searchOrder,
  updateOrder,
  deleteOrder
}