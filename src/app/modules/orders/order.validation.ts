import mongoose from "mongoose";
import { z } from "zod";

const orderZodSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Please provide a valid email address." })
    .transform((str) => str.trim().toLowerCase()),
  productId: z.string().transform((id) => new mongoose.Types.ObjectId(id)), // Transform string to ObjectId
  price: z
    .number()
    .nonnegative({ message: "Price cannot be negative." })
    .refine((value) => value > 0, { message: "Price is required." }),
  quantity: z
    .number()
    .int()
    .min(1, { message: "Quantity must be at least 1." }),
});

export default orderZodSchema;
