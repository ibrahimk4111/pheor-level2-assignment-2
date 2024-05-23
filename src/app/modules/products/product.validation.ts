import { z } from 'zod';

// Define the VariantType schema
const VariantSchema = z.object({
  type: z.string().min(1, { message: "Variant type is required" }),
  value: z.string().min(1, { message: "Variant value is required" })
});

// Define the InventoryType schema
const InventorySchema = z.object({
  quantity: z.number()
    .min(0, { message: "Product Quantity cannot be negative" })
    .nonnegative({ message: "Product Quantity is required and must be a non-negative number" }),
  inStock: z.boolean({ required_error: "Product InStock status is required" })
});

// Define the main ProductType schema
const ProductZodSchema = z.object({
  name: z.string().min(3, { message: "Product name must be at least 3 characters long" }),
  description: z.string().min(10, { message: "Product description must be at least 10 characters long" }),
  price: z.number().min(0, { message: "Price cannot be negative" }),
  category: z.string().min(1, { message: "Product category is required" }),
  tags: z.array(z.string().min(1, { message: "Tag cannot be empty" }))
    .max(10, { message: "Tags exceed the limit of 10" }),
  variants: z.array(VariantSchema),
  inventory: InventorySchema,
});

export default ProductZodSchema;