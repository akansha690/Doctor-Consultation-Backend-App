

import BaseRepository from './index'
import { AvailabilitySlot } from '../models/availabilitySlots.model';


export class AvailabilitySlotRepository extends BaseRepository<AvailabilitySlot>{
    constructor(){
        super(AvailabilitySlot)
    }
    async softDelete(id:number){
        try {
            const slot = await this.model.findByPk(id);
            if(!slot){
                throw new Error("This hotel is not found for deletion");
            }
            slot.deletedAt = new Date();
            await slot.save();
        } catch (error) {
            throw error;
        }
    }
    async getAllWithFilter(id: number, data: Partial<AvailabilitySlot>){
        try {
            const slots = await this.model.findAll({
                where:{
                    doctorId: id,
                    day: data.day,
                    date: data.date
                }
            })
            return slots
        } catch (error) {
            throw error;
        }
    }
}



