import mongoose from "mongoose";

export interface orderType {
  email: string;
  productId: mongoose.Types.ObjectId;
  price: number;
  quantity: number;
}

