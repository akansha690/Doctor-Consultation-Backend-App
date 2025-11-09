
import jwt from "jsonwebtoken";

export async function generateToken(payload: object) {
  return jwt.sign(payload, `${process.env.JWT_TOKEN}`, { expiresIn: "1d" }); 
}
