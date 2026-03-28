import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "users"
    },
    productId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "products",
        index: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
        min: [1, "Quantity should be at least 1"]
    }
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;