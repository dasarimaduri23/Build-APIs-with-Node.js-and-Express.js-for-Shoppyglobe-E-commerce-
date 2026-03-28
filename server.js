import express from "express";
import mongoose from "mongoose";   
import errorRoutes from "./middlewares/errorRoutes.middleware.js";
import productRouter from "./routes/products.route.js";
import userRouter from "./routes/users.route.js";
import dotenv from "dotenv";
import cartRouter from "./routes/cart.route.js";



dotenv.config();

export const server = express();
const PORT = process.env.PORT || 3000;

// Middleware
server.use(express.json());


server.use("/users", userRouter);
server.use("/products", productRouter);
server.use("/cart", cartRouter); // JWT handled inside cart router

// Error handler
server.use(errorRoutes);

// DB connection
mongoose
    .connect(`${process.env.MONGODB_URI}/${process.env.DATABASE_NAME}`)
    .then(() => console.log("Database Connection Successful!"))
    .catch(error => console.log("Database Connection Failed!", error));

// Start server
server.listen(PORT, () => {
    console.log("Server running on port", PORT);
});
