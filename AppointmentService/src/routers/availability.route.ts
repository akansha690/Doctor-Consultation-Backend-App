
import express from "express";
import { createSlotHandler, getAllFilteredSlotsHandler, getSlotHandler, softDeleteHandler, updateHandler } from "../controllers/availability.controller";

const slotRouter = express.Router();

slotRouter.post('/', createSlotHandler )
slotRouter.get('/:id', getSlotHandler )
slotRouter.get('/filter/:id', getAllFilteredSlotsHandler )
slotRouter.patch('/update/:id', updateHandler )
slotRouter.delete('/delete/:id', softDeleteHandler )


export default slotRouter;

