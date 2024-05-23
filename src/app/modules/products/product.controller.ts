import { Request, Response } from "express";
import { responseHandler } from "../../helpers/responseHandler";
import { productService } from "./product.service";
import ProductZodSchema from "./product.validation";
import { Product } from "./product.model";

const createProduct = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    let result;
    if (await Product.isExistsProduct(name)) {
      result = 'Product already exist!'
      responseHandler(req, res, 200, false, "Try another product", result);
    } else {
      const validationResult = ProductZodSchema.parse(req.body);
      result = await productService.createProductToDB(validationResult);
      responseHandler(req, res, 200, true, "Product created successfully!", result);
    }
  } catch (error) {
    console.log("create Product error: ", error)
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await productService.getAllProductsFromDB();
  responseHandler(req, res, 200, true, "Product fetched successfully!", result);
  } catch (error) {
    console.log("get all Product error: ", error)
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const result = await productService.getSingleProductsFromDB(req.params.id);
    responseHandler(req, res, 200, true, "Product fetched successfully!", result);
  } catch (error) {
    console.log("get single Product error: ", error)
  }
};

const searchProduct = async (req: Request, res: Response) => {
  try {
    const {searchTerm} = req.query;
    const result = await productService.searchProductsFromDB(searchTerm as string);
    responseHandler(req, res, 200, true, "Product searched successfully!", result);
  } catch (error) {
    console.log("search Product error: ", error)
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const result = await productService.updateProductFromDB(req.params.id, req.body)
    responseHandler(req, res, 200, true, "Product created successfully!", result);
  } catch (error) {
    console.log("update Product error: ", error)
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const result = await productService.deleteProductFromDB(req.params.id);
    responseHandler(req, res, 200, true, "Product created successfully!", result);
  } catch (error) {
    console.log("delete Product error: ", error)
  }
};




export const productController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  searchProduct,
  updateProduct,
  deleteProduct,
};
