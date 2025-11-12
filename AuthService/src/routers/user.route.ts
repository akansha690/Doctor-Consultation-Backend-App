
import express from "express";
import { loginUserHandler, registerUserHandler } from "../controllers/user.controller";
import { reqValidator } from "../validators";
import { userRegisterSchema } from "../validators/user.register";
import { userLoginSchema } from "../validators/user.login";

const userRouter = express.Router();

userRouter.post('/', reqValidator(userRegisterSchema), registerUserHandler )
userRouter.get('/login', reqValidator(userLoginSchema), loginUserHandler )

export default userRouter;

