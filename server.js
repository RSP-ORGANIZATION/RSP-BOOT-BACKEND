import express from "express";
import cors from "cors";
import "dotenv/config";
import { verifyToken } from "./utils/jwt-functions.js";
import authRouter from "./routes/auth-route.js";
import recipeRoute from "./routes/recipe-route.js";
import { connectDB } from "./utils/mongo-connection.js";

const app = express();

app.use(express.json());
app.use(cors());

// * MongoDB connection
connectDB();

const PORT = process.env.PORT || 5000;

// * Secret key for jwt generation
const secretKey = process.env.JWT_SECRET_KEY;

app.use("/", authRouter);
app.use("/recipe", recipeRoute);

app.post("/protected-route", async (req, res) => {
  const token = req.body.token;
  if (!token) return res.status(401).json({ message: "Should login again" });

  try {
    const decoded = verifyToken(token, secretKey);
    return res.json({ message: "Login Succesful", phone: decoded.phone });
  } catch (error) {
    return res.status(404).json({ message: "Invalid or Expired token" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
