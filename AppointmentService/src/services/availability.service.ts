import { createSlotDTO } from "../dto/availability.dto";
import { AvailabilitySlotRepository } from "../repositories/availabilitySlots.repo";


const availabilitySlotRepository = new AvailabilitySlotRepository();

export async function createSlot(data: createSlotDTO){
    const slot = await availabilitySlotRepository.create(data); 
    return slot;
}

export async function getById(id: number){
    const getSlot = await availabilitySlotRepository.findById(id);
    return getSlot;
}

export async function getAll(){
    const allSlots = await availabilitySlotRepository.findAll();
    return allSlots
}

export async function softDelete(id: number){
    const slot = await availabilitySlotRepository.softDelete(id);
    return slot
}

export async function update(id: number, data: Partial<createSlotDTO>){
    const slot = await availabilitySlotRepository.update(id, data);
    return slot
}

export async function getAllWithFilter(id: number, data: Partial<createSlotDTO>){
    const slots = await availabilitySlotRepository.getAllWithFilter(id, data);
    return slots
}



