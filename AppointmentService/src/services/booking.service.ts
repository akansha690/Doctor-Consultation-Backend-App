
import { createBookingDTO } from "../dto/booking.dto";
import { BookingRepository } from "../repositories/booking.repo";

const bookingRepository = new BookingRepository();

export async function createBooking(data: createBookingDTO){
    const booking = await bookingRepository.createBooking(data);
    return booking;
}

export async function getById(id: number){
    const getBooking = await bookingRepository.findById(id);
    return getBooking;
}

export async function getAll(){
    const allBooking = await bookingRepository.findAll();
    return allBooking
}

export async function softDelete(id: number){
    const booking = await bookingRepository.softDelete(id);
    return booking
}

export async function update(id: number, data: Partial<createBookingDTO>){
    const booking = await bookingRepository.update(id, data);
    return booking
}

// export async function getBookingWithFilter(id: number, data: Partial<createBookingDTO>){
//     const booking = await bookingRepository.getWithFilter(id , data);
//     return booking
// }



