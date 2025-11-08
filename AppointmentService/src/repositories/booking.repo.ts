

import { Booking } from '../models/booking.model';
import BaseRepository from './index'


export class BookingRepository extends BaseRepository<Booking>{
    constructor(){
        super(Booking)
    }
    async softDelete(id:number){
        try {
            const doctor = await this.model.findByPk(id);
            if(!doctor){
                throw new Error("This hotel is not found for deletion");
            }
            doctor.deletedAt = new Date();
            await doctor.save();
        } catch (error) {
            throw error;
        }
    }

    async getWithFilter( data: Partial<Booking>){
        try {
            const booking = await this.model.findAll({
                where:{
                    doctorId: data.doctorId,
                    patientId: data.patientId
                }
            })
            return booking;
        } catch (error) {
            throw error;
        }
    }
    
}



