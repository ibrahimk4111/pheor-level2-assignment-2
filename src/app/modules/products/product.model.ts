import { Schema, model } from "mongoose";
import { InventoryType, ProductType, VariantType, isExistsProduct } from "./product.interface";

// Define VariantType schema
const VariantSchema = new Schema<VariantType>({
  type: { 
    type: String, 
    required: [true, 'Variant type is required'], 
    trim: true 
  },
  value: { 
    type: String, 
    required: [true, 'Variant value is required'], 
    trim: true 
  }
});

// Define InventoryType schema
const InventorySchema = new Schema<InventoryType>({
  quantity: { 
    type: Number, 
    required: [true, 'Quantity is required'], 
    min: [0, 'Quantity cannot be negative'] 
  },
  inStock: { 
    type: Boolean, 
    required: [true, 'InStock status is required'] 
  }
});

// Define the main ProductType schema
const ProductSchema = new Schema<ProductType, isExistsProduct>({
  name: { 
    type: String, 
    required: [true, 'Product name is required'], 
    trim: true, 
    minlength: [3, 'Product name must be at least 3 characters long']
  },
  description: { 
    type: String, 
    required: [true, 'Product description is required'], 
    trim: true, 
    minlength: [10, 'Product description must be at least 10 characters long']
  },
  price: { 
    type: Number, 
    required: [true, 'Product price is required'], 
    min: [0, 'Price cannot be negative'] 
  },
  category: { 
    type: String, 
    required: [true, 'Product category is required'], 
    trim: true 
  },
  tags: { 
    type: [String], 
    validate: [arrayLimit, '{PATH} exceeds the limit of 10'] 
  },
  variants: { 
    type: [VariantSchema] 
  },
  inventory: { 
    type: InventorySchema, 
    required: [true, 'Inventory is required']
  }
}, { timestamps: true });

// Custom validator function to limit the number of tags
function arrayLimit(val:string[]) {
  return val.length <= 10;
}


// checking is exists product or not
ProductSchema.statics.isExistsProduct = async function (name:string) {
  return await this.findOne({name})
}
// Create the model
export const Product = model<ProductType, isExistsProduct>('Product', ProductSchema);