

import axios from "axios";


export async function getBookingById(bookingId: number){
    try {
        const response = await axios.get(`${process.env.BOOKING_SERVICE_URL}/${bookingId}`)
        return response.data.data
    } catch (error) {
        throw new Error("Failed to get booking details")
    }
}

export async function updateBooking(bookingId: number){
    try {
        const response = await axios.patch(`${process.env.BOOKING_SERVICE_URL}/update/${bookingId}` , {
            status: 'BOOKED'
        })
        return response.data
    } catch (error) {
        throw new Error("Failed to update booking details")
    }
}