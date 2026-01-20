import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
 function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}
export {generateToken}
