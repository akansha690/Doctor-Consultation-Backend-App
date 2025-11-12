import {z} from "zod";

export const bookingSchema = z.object({

    doctorId : z.number(),
    availabilityId: z.number(),
    price: z.number(),
    // status: z.enum(['BOOKED', 'CANCELLED', 'PENDING'])
    
})

