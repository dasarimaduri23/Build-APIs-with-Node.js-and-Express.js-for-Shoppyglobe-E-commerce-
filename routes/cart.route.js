import { Router } from "express";
import {
    addItemToCart,
    deleteAllCartItems,
    deleteCartItemById,
    getAllCartItems,
    getCartItemById,
    updateCartItemById
} from "../controllers/cart.controller.js";

import fieldsMissingValidation from "../middlewares/fieldsMissingValidation.middleware.js";
import verifyJwtToken from "../middlewares/verifyJwtToken.middleware.js";

const cartRouter = Router();

// Protect all routes
cartRouter.use(verifyJwtToken);

// Get all cart items
cartRouter.get("/", getAllCartItems);

// Get single cart item
cartRouter.get("/:id", getCartItemById);

// Add item to cart
cartRouter.post("/", fieldsMissingValidation, addItemToCart);

// Update cart item
cartRouter.put("/:id", fieldsMissingValidation, updateCartItemById);

// Delete single cart item
cartRouter.delete("/:id", deleteCartItemById);

// Delete all cart items
cartRouter.delete("/", deleteAllCartItems);

export default cartRouter;