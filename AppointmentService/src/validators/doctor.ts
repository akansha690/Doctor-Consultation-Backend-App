import {z} from "zod";

export const doctorProfileSchema = z.object({
    age : z.number(),
    specialisation: z.string(),
    education: z.string(),
    experience: z.number(),
    consultationFee: z.number()
})