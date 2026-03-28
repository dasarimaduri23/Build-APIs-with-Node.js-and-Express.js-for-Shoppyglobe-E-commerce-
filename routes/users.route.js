import express from "express";
import { loginUser, registerUser } from "../controllers/users.controller.js";
import verifyJwtToken from "../middlewares/verifyJwtToken.middleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

export default userRouter;