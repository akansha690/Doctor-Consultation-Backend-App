import { createProfileDTO } from "../dto/doctor.dto";
import { DoctorRepository } from "../repositories/doctor.repo";

const doctorRepository = new DoctorRepository();

export async function createProfile(data: createProfileDTO){
    const profile = await doctorRepository.create(data); 
    return profile;
}

export async function getById(id: number){
    const profile = await doctorRepository.findById(id);
    return profile
}
export async function getAll(){
    const allProfiles = await doctorRepository.findAll();
    return allProfiles
}

export async function softDelete(id: number){
    const profile = await doctorRepository.softDelete(id);
    return profile
}

export async function updateProfile(id: number, data: Partial<createProfileDTO>){
    const profile = await doctorRepository.update(id, data);
    return profile
}
export async function getWithFilterProfile(data: string){
    const profile = await doctorRepository.getWithFilter(data);
    return profile
}



