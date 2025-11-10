
import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { loginUser, registerUser } from "../services/user.service"

export async function registerUserHandler(req: Request, res: Response, next : NextFunction){

    const data = {
        ...req.body
    }
    const user = await registerUser(data)
    res.status(StatusCodes.OK).json({
        message: "User registered successfully",
        data: user,
        success: true
    })
    
}

export async function loginUserHandler(req: Request, res: Response, next : NextFunction){

    const data = {
        ...req.body
    }
    const {token} = await loginUser(data)
    res.setHeader('Authorization', token);
    res.status(StatusCodes.OK).json({
        message: "User logged in successfully",
        data: token,
        success: true
    })
    
}
