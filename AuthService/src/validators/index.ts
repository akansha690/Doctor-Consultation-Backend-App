
import {  NextFunction, Request, Response} from 'express';
import { ZodSchema  } from 'zod';

export const reqValidator = function(schema : ZodSchema ) {
    return async(req:Request , res:Response , next: NextFunction)=>{
        try {
            await schema.parseAsync(req.body);
            next();
        } catch (error) {
            res.status(404).json({
                message:"incorrect request body"
            })
        }
    }
}