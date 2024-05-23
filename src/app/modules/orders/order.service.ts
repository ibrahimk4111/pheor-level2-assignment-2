import { orderType } from "./order.interface";
import { Order } from "./order.model";

const createOrderToDB = async (OrderData: orderType) => {
  const result = await Order.create(OrderData);
  return result;
};

const getAllOrdersFromDB = async () => {
  const result = await Order.find({});
  if (result.length > 0) {
    return result;
  }else{
    return "No order founded!"
  }
};

const getSingleOrdersFromDB = async (_id: string) => {
  const result = await Order.findOne({ _id });
  if (!result) {
    return "Order doesn't exist!";
  } else {
    return result;
  }
};

const searchOrdersFromDB = async (email: string) => {
  const result = await Order.find({email});
  if (result.length > 0) {
    return result;
  } else {
    return "Not Order founded!";
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateOrderFromDB = async (_id: string, payload: any) => {
  const result = await Order.updateOne({ _id }, payload);
  return result;
};

const deleteOrderFromDB = async (_id: string) => {
  const result = await Order.deleteOne({ _id });
  return result;
};


export const orderService = {
  createOrderToDB,
  getAllOrdersFromDB,
  getSingleOrdersFromDB,
  updateOrderFromDB,
  searchOrdersFromDB,
  deleteOrderFromDB,
};
