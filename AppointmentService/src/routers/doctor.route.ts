
import express from "express";
import { createProfileHandler, getAllProfileHandler, getProfileHandler, getProfilesWithFilterHandler, softDeleteHandler, updateHandler } from "../controllers/doctor.controller";
import { reqValidator } from "../validators";
import { doctorProfileSchema } from "../validators/doctor";

const doctorRouter = express.Router();

doctorRouter.post('/', reqValidator(doctorProfileSchema), createProfileHandler )
doctorRouter.get('/', getAllProfileHandler )
doctorRouter.get('/:id', getProfileHandler )
doctorRouter.get('/filter/:specialisation', getProfilesWithFilterHandler )
doctorRouter.patch('/update/:id', updateHandler )
doctorRouter.delete('/delete/:id', softDeleteHandler )


export default doctorRouter;

