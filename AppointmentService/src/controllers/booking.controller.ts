
import {Request , Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { createBooking, getBookingWithFilter, getById, softDelete, update } from "../services/booking.service";

export async function createBookingHandler(req: Request, res: Response, next : NextFunction){

    const booking = await createBooking(req.body)
    res.status(StatusCodes.OK).json({
        message: "Booking created successfully",
        data: booking,
        success: true
    })
    
}


export async function getBookingHandler(req: Request, res: Response, next : NextFunction){

    const id = Number(req.params.id)
    const booking = await getById(id)
    res.status(StatusCodes.OK).json({
        message: " Booking found successfully",
        data: booking,
        success: true
    })
    
}

export async function geBookingWithFilterHandler(req: Request, res: Response, next : NextFunction){

    const data = req.body
    const booking = await getBookingWithFilter(data)
    res.status(StatusCodes.OK).json({
        message: `Booking with found successfully`,
        data: booking,
        success: true
    })
    
}

export async function updateHandler(req: Request, res: Response, next : NextFunction){

    const id = Number(req.params.id)
    const booking = await update(id, req.body)
    res.status(StatusCodes.OK).json({
        message: `Booking updated successfully`,
        data: booking,
        success: true
    })
    
}

export async function softDeleteHandler(req: Request, res: Response, next : NextFunction){

    const id = Number(req.params.id)
    const booking = await  softDelete(id)
    res.status(StatusCodes.OK).json({
        message: `Booking deleted successfully`,
        data: booking,
        success: true
    })
    
}



