import {z} from "zod";

export const availabilitySlot = z.object({
    doctorId : z.number(),
    day: z.string(),
    date: z.string().transform((val) => new Date(val)),
    isAvailable: z.boolean()
})