import { addProduct, deleteProductById, getAllProducts, getProductById, updateProductById } from "../controllers/products.controller.js";
import fieldsMissingValidation from "../middlewares/fieldsMissingValidation.middleware.js";
import express from "express";

const productRouter = express.Router();

// Routers for products
productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById)
productRouter.post("/", fieldsMissingValidation, addProduct);
productRouter.put("/:id", fieldsMissingValidation, updateProductById);
productRouter.delete("/:id", deleteProductById);

export default productRouter;