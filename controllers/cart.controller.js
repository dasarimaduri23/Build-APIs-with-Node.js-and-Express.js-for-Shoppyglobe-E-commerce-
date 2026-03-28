import mongoose from "mongoose";
import Cart from "../models/cart.model.js";
import productsModel from "../models/products.model.js";

// ✅ Get all cart items (for logged-in user)
export async function getAllCartItems(req, res, next) {
    try {
        const userId = req.user.id;

        const cartItems = await Cart.find({ userId }).populate("productId");

        if (cartItems.length === 0) {
            return res.status(200).json({
                status: "success",
                message: "No cart items found",
                data: []
            });
        }

        const cartUpdatedItems = cartItems.map(item => ({
            id: item._id,
            productId: item.productId._id,
            productTitle: item.productId.name,
            productPrice: item.productId.price,
            productQuantity: item.quantity
        }));

        res.status(200).json({
            status: "success",
            message: "Cart items fetched successfully",
            data: {
                length: cartUpdatedItems.length,
                cartItems: cartUpdatedItems
            }
        });

    } catch (error) {
        next(error);
    }
}

// ✅ Get single cart item
export async function getCartItemById(req, res, next) {
    try {
        const { id } = req.params;

        const cartItem = await Cart.findById(id).populate("productId");

        if (!cartItem) {
            return res.status(404).json({
                status: "error",
                message: "Cart item not found"
            });
        }

        res.status(200).json({
            status: "success",
            message: "Cart item fetched successfully",
            data: cartItem
        });

    } catch (error) {
        next(error);
    }
}

// ✅ Add item to cart
export async function addItemToCart(req, res, next) {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;

        // Validate quantity
        if (!quantity || quantity <= 0) {
            return res.status(400).json({
                status: "error",
                message: "Invalid quantity"
            });
        }

        // Check product exists
        const product = await productsModel.findById(productId);
        if (!product) {
            return res.status(404).json({
                status: "error",
                message: "Product not found"
            });
        }

        // Check duplicate item
        const existingItem = await Cart.findOne({ userId, productId });
        if (existingItem) {
            return res.status(400).json({
                status: "error",
                message: "Product already in cart"
            });
        }

        const cartItem = await Cart.create({
            userId,
            productId,
            quantity
        });

        res.status(201).json({
            status: "success",
            message: "Item added to cart",
            data: cartItem
        });

    } catch (error) {
        next(error);
    }
}

// ✅ Update cart item
export async function updateCartItemById(req, res, next) {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        if (!quantity || quantity <= 0) {
            return res.status(400).json({
                status: "error",
                message: "Invalid quantity"
            });
        }

        const updatedItem = await Cart.findByIdAndUpdate(
            id,
            { quantity },
            { new: true, runValidators: true }
        );

        if (!updatedItem) {
            return res.status(404).json({
                status: "error",
                message: "Cart item not found"
            });
        }

        res.status(200).json({
            status: "success",
            message: "Cart item updated successfully",
            data: updatedItem
        });

    } catch (error) {
        next(error);
    }
}

// ✅ Delete single cart item
export async function deleteCartItemById(req, res, next) {
    try {
        const { id } = req.params;

        const deletedItem = await Cart.findByIdAndDelete(id);

        if (!deletedItem) {
            return res.status(404).json({
                status: "error",
                message: "Cart item not found"
            });
        }

        res.status(200).json({
            status: "success",
            message: "Cart item deleted successfully",
            data: deletedItem
        });

    } catch (error) {
        next(error);
    }
}

// ✅ Delete all cart items for logged-in user
export async function deleteAllCartItems(req, res, next) {
    try {
        const userId = req.user.id;

        const result = await Cart.deleteMany({ userId });

        res.status(200).json({
            status: "success",
            message: "All cart items deleted successfully",
            data: result
        });

    } catch (error) {
        next(error);
    }
}