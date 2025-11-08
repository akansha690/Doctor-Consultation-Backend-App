

import BaseRepository from './index'
import { DoctorProfile } from '../models/doctorProfile.model'


export class DoctorRepository extends BaseRepository<DoctorProfile>{
    constructor(){
        super(DoctorProfile)
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

    async getWithFilter(data:string){
        try {
            const profiles = await this.model.findAll({
                where:{
                    specialisation : data
                }
            })
            return profiles;
        } catch (error) {
            throw error;
        }
    } 
}



