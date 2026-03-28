import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
        index: true
    },
    imageSrc: {
        type: String,
        required: true,
    }
});

const productsModel = new mongoose.model("products", productSchema);

export default productsModel;