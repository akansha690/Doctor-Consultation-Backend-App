
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_TOKEN= process.env.JWT_TOKEN || "your-secret-token-key"

export function JWTMiddleware(req:Request, res:Response, next: NextFunction) {

  if (req.path.startsWith("/user")) return next();

  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token missing" });

  try {
    const decoded = jwt.verify(token, JWT_TOKEN);
    // (req as any).user = {
    //   id: (decoded as any).id,
    //   role: (decoded as any).role,
    //   username: (decoded as any).username
    // };
    req.headers["x-user-id"] = (decoded as any).id;
    req.headers["x-user-role"] = (decoded as any).role;
    req.headers["x-user-username"] = (decoded as any).username;
    // console.log("User has been authenticated", (req as any).user.username);
    
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
}
