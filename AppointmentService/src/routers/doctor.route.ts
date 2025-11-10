
import express from "express";
import { createProfileHandler, getAllProfileHandler, getProfileHandler, getProfilesWithFilterHandler, softDeleteHandler, updateHandler } from "../controllers/doctor.controller";

const doctorRouter = express.Router();

doctorRouter.post('/', createProfileHandler )
doctorRouter.get('/', getAllProfileHandler )
doctorRouter.get('/:id', getProfileHandler )
doctorRouter.get('/filter/:specialisation', getProfilesWithFilterHandler )
doctorRouter.patch('/update/:id', updateHandler )
doctorRouter.delete('/delete/:id', softDeleteHandler )


export default doctorRouter;

