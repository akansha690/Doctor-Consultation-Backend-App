import {z} from "zod";

export const userRegisterSchema = z.object({
    email: z.string(),
    username: z.string(),
    password: z.string(),
    role: z.enum(['DOCTOR', 'PATIENT'])
})