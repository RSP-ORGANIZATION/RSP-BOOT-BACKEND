import jwt from "jsonwebtoken";

// Store securely (e.g., in environment variables)

// * Function to generate JWT
export function generateToken(userData, secretKey) {
  return jwt.sign(
    userData, // Payload (data)
    secretKey,
    { expiresIn: "7d" } // * Token expiry
  );
}

export function verifyToken(token, secretKey) {
  const userData = jwt.verify(token, secretKey);
  if (!userData) throw new Error("Invalid token");
  return userData;
}
