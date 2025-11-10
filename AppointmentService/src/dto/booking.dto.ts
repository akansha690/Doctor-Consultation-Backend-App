
import { statusEnum } from "../models/booking.model"

export type createBookingDTO={
    // patientId : number,
    doctorId: number,
    availabilityId: number,
    price : number,
    status?: statusEnum
}