
import { statusEnum } from "../models/booking.model"

export type createBookingDTO={
    patientId : number,
    doctorId: number,
    availabilityId: number,
    price : string,
    status: statusEnum
}