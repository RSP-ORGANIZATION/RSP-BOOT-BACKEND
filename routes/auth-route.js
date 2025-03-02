import express from "express";
import "dotenv/config";
import { loginUser, signupUser } from "../controllers/auth-controller.js";

const authRouter = express.Router();

// * Login route
authRouter.post("/login", loginUser);

// * Signup route
authRouter.post("/signup", signupUser);

export default authRouter;
