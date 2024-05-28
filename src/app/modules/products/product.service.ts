import { ProductType } from "./product.interface";
import { Product } from "./product.model";

const createProductToDB = async (productData: ProductType) => {
  const result = await Product.create(productData);
  return result;
};

const getAllProductsFromDB = async () => {
  const result = await Product.find({});
  if (result.length > 0) {
    return result;
  } else {
    return "No product founded!";
  }
};

const getSingleProductsFromDB = async (_id: string) => {
  const result = await Product.findOne({ _id });
  if (!result) {
    return "product doesn't exist!";
  } else {
    return result;
  }
};

const searchProductsFromDB = async (searchTerm: string) => {
  const foundedProducts = await Product.find({});
  const result = foundedProducts.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (result.length > 0) {
    return result;
  } else {
    return "Not product founded!";
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateProductFromDB = async (_id: string, payload: any) => {
  const result = await Product.updateOne({ _id }, payload);
  return result;
};

const deleteProductFromDB = async (_id: string) => {
  const result = await Product.deleteOne({ _id });
  return result;
};

const updateProductAfterOrderMade = async (_id: string,orderQuantity: number) => {
  const foundedProduct = await Product.findOne({ _id });
  if (!foundedProduct) {
    return "Product is not available!";
  } else {
    let { quantity, inStock } = foundedProduct.inventory;
    if (orderQuantity > quantity) {
      return "Insufficient product.";
    } else {
      quantity = quantity - orderQuantity;
      inStock = quantity <= 0 ? false : inStock;
      await Product.updateOne({ _id }, { inventory: { quantity, inStock } });
      return 'ok'
    }
  }
};

export const productService = {
  createProductToDB,
  getAllProductsFromDB,
  getSingleProductsFromDB,
  updateProductFromDB,
  searchProductsFromDB,
  deleteProductFromDB,
  updateProductAfterOrderMade,
};
