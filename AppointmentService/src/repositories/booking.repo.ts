

import { AvailabilitySlot } from '../models/availabilitySlots.model';
import { Booking } from '../models/booking.model';
import BaseRepository from './index'
import { createBookingDTO } from '../dto/booking.dto';


export class BookingRepository extends BaseRepository<Booking>{
    constructor(){
        super(Booking)
    }
    async softDelete(id:number){
        try {
            const booking = await this.model.findByPk(id);
            if(!booking){
                throw new Error("This hotel is not found for deletion");
            }
            booking.deletedAt = new Date();
            await booking.save();
        } catch (error) {
            throw error;
        }
    }

     async createBooking(data: createBookingDTO) : Promise<Booking>{
            try {
                const slot = await AvailabilitySlot.findByPk(data.availabilityId);
                if(!slot){
                    throw new Error("slot of availablityId not found")
                }
                if (!slot.isAvailable) {
                    throw new Error("Slot is not available");
                }
                const record = await this.model.create(data);
                slot.isAvailable = false;
                await slot.save();
                return record;
            } catch (error) {
                throw error;
            }
        }
    // async getWithFilter(id: number, data: Partial<Booking>){
    //     try {
    //         const booking = await this.model.findAll({
    //             where:{
    //                 doctorId: id,
    //                 patientId: data.patientId ? data.patientId : undefined,
    //             }
    //         })
    //         return booking;
    //     } catch (error) {
    //         throw error;
    //     }
    // }
    
}



