
import {Request , Response, NextFunction } from "express";
import { createProfile, getAll, getById, getWithFilterProfile, softDelete, updateProfile } from "../services/doctor.service";
import { StatusCodes } from "http-status-codes";

export async function createProfileHandler(req: Request, res: Response, next : NextFunction){

    const data = {
      fullName: req.body.full_name,
      age: req.body.age,
      specialisation: req.body.specialisation,
      education: req.body.education,
      consultationFee: req.body.consultation_fee,
      experience: req.body.experience
    };
    const profile = await createProfile(data)
    res.status(StatusCodes.OK).json({
        message: "Profile created successfully",
        data: profile,
        success: true
    })
    
}

export async function getAllProfileHandler(req: Request, res: Response, next : NextFunction){

    const profiles = await getAll()
    res.status(StatusCodes.OK).json({
        message: "All Profiles fetched successfully",
        data: profiles,
        success: true
    })
    
}

export async function getProfileHandler(req: Request, res: Response, next : NextFunction){

    const id = Number(req.params.id)
    const profile = await getById(id)
    res.status(StatusCodes.OK).json({
        message: " Profile found successfully",
        data: profile,
        success: true
    })
    
}

export async function getProfilesWithFilterHandler(req: Request, res: Response, next : NextFunction){

    const data = req.body
    const profiles = await getWithFilterProfile(data)
    res.status(StatusCodes.OK).json({
        message: `All Profiles with specialisation ${data} found successfully`,
        data: profiles,
        success: true
    })
    
}

export async function updateHandler(req: Request, res: Response, next : NextFunction){

    const id = Number(req.params.id)
    const profile = await updateProfile(id, req.body)
    res.status(StatusCodes.OK).json({
        message: `Profile updated successfully`,
        data: profile,
        success: true
    })
    
}

export async function softDeleteHandler(req: Request, res: Response, next : NextFunction){

    const id = Number(req.params.id)
    const profile = await softDelete(id)
    res.status(StatusCodes.OK).json({
        message: `Profile deleted successfully`,
        data: profile,
        success: true
    })
    
}



