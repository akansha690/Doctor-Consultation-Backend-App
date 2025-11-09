
import express from "express";
import { loginUserHandler, registerUserHandler } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.post('/', registerUserHandler )
userRouter.get('/login', loginUserHandler )

export default userRouter;

