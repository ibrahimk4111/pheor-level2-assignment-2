import { Schema, model } from "mongoose";
import { orderType } from "./order.interface";

const orderSchema = new Schema<orderType>(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address."],
      trim: true,
      lowercase: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      required: [true, "Product ID is required."],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required."],
      min: [0, "Price cannot be negative."],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required."],
      min: [1, "Quantity must be at least 1."],
    },
  },
  {
    timestamps: true,
  }
);

export const Order = model<orderType>("Order", orderSchema)