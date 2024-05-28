import { RequestHandler } from "express";
import { responseHandler } from "../../helpers/responseHandler";
import { productService } from "./product.service";
import { Product } from "./product.model";
import { AsyncHandler } from "../../helpers/AsyncHandler";

const createProduct: RequestHandler = AsyncHandler (async (req, res) => {
  const { name } = req.body;
  let result;
  if (await Product.isExistsProduct(name)) {
    result = "Product already exist!";
    responseHandler(res, 200, false, "Try another product", result);
  } else {
    result = await productService.createProductToDB(req.body);
    responseHandler(res, 200, true,"Product created successfully!",result);
  }
});

const getAllProducts: RequestHandler = AsyncHandler (async (req, res) => {
  const result = await productService.getAllProductsFromDB();
  responseHandler(res, 200, true, "Product fetched successfully!", result);
});

const getSingleProduct: RequestHandler = AsyncHandler (async (req, res) => {
  const result = await productService.getSingleProductsFromDB(req.params.id);
  responseHandler(res, 200, true, "Product fetched successfully!", result);
});

const searchProduct: RequestHandler = AsyncHandler (async (req, res) => {
  const { searchTerm } = req.query;
  const result = await productService.searchProductsFromDB(
    searchTerm as string
  );
  responseHandler(res, 200, true, "Product searched successfully!", result);
});

const updateProduct: RequestHandler = AsyncHandler (async (req, res) => {
  const result = await productService.updateProductFromDB(
    req.params.id,
    req.body
  );
  responseHandler(res, 200, true, "Product created successfully!", result);
});

const deleteProduct: RequestHandler = AsyncHandler (async (req, res) => {
  const result = await productService.deleteProductFromDB(req.params.id);
  responseHandler(res, 200, true, "Product created successfully!", result);
})

export const productController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  searchProduct,
  updateProduct,
  deleteProduct,
};
