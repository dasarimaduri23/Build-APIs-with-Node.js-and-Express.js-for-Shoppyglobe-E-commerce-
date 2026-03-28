import userModel from "../models/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export async function registerUser(req, res, next) {
    const { firstname, lastname, email, password } = req.body;

    try {
        if (!firstname || !lastname || !email || !password) {
            return res.status(400).json({ message: "All fields required" });
        }

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = await userModel.create({
            firstname,
            lastname,
            email,
            password
        });

        res.status(201).json({
            message: "User registered successfully",
            data: newUser
        });

    } catch (error) {
        console.log("❌ REGISTER ERROR:", error);
        next(error);
    }
}


export async function loginUser(req, res, next) {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "Login successful",
            token
        });

    } catch (error) {
        console.log("❌ LOGIN ERROR:", error);
        next(error);
    }
}