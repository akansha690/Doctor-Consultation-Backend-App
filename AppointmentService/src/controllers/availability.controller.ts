
import {Request , Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { createSlot, getAllWithFilter, getById, softDelete, update } from "../services/availability.service";

export async function createSlotHandler(req: Request, res: Response, next : NextFunction){

    const slot = await createSlot(req.body)
    res.status(StatusCodes.OK).json({
        message: "Slot created successfully",
        data: slot,
        success: true
    })
    
}

export async function getAllFilteredSlotsHandler(req: Request, res: Response, next : NextFunction){

    const id = Number(req.params.id)
    const slots = await getAllWithFilter(id, req.body)
    res.status(StatusCodes.OK).json({
        message: "All Slots fetched successfully",
        data: slots,
        success: true
    })
    
}

export async function getSlotHandler(req: Request, res: Response, next : NextFunction){

    const id = Number(req.params.id)
    const slot = await getById(id)
    res.status(StatusCodes.OK).json({
        message: " Slot found successfully",
        data: slot,
        success: true
    })
    
}


export async function updateHandler(req: Request, res: Response, next : NextFunction){

    const id = Number(req.params.id)
    const slot = await update(id, req.body)
    res.status(StatusCodes.OK).json({
        message: `Slot updated successfully`,
        data: slot,
        success: true
    })
    
}

export async function softDeleteHandler(req: Request, res: Response, next : NextFunction){

    const id = Number(req.params.id)
    const slot = await softDelete(id)
    res.status(StatusCodes.OK).json({
        message: `slot deleted successfully`,
        data: slot,
        success: true
    })
    
}



