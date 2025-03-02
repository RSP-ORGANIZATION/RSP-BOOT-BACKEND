import "dotenv/config";
import { User } from "../schemas/user-schema.js";
import { generateToken } from "../utils/jwt-functions.js";
import bcrypt from "bcrypt";

export const loginUser = async (req, res) => {
  const { phone, password } = req.body;

  const user = await User.findOne({ phone });
  if (!user) return res.status(404).json({ message: "User not found!!" });

  if (bcrypt.compare(password, user.password)) {
    const token = generateToken(
      { phone: user.phone },
      process.env.JWT_SECRET_KEY
    );
    return res.json({ message: "Login successful", token: token });
  } else {
    return res.status(401).json({ message: "Password is incorrect" });
  }
};

export const signupUser = async (req, res) => {
  try {
    const { name, phone, password } = req.body;
    console.log(name, phone, password);

    // ? saltRounds specify for how much times the password will be hashed (higher rounds means more secure, but slow performance)
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({
        message:
          "The provided phone number is already registered to an account",
      });
    }

    const newUser = new User({
      name: name,
      phone: phone,
      password: hashedPassword,
    });
    await newUser.save();

    return res.json({ message: "User created" });
  } catch (error) {
    console.log("Error:", error);
    return res.status(401).json({ message: "something went wrong" });
  }
};
