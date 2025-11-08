
import express from "express";
import { createBookingHandler, geBookingWithFilterHandler, getBookingHandler, softDeleteHandler, updateHandler } from "../controllers/booking.controller";

const bookingRouter = express.Router();

bookingRouter.post('/', createBookingHandler )
bookingRouter.get('/:id', getBookingHandler )
bookingRouter.get('/booking/:id', geBookingWithFilterHandler )
bookingRouter.patch('/update/:id', updateHandler )
bookingRouter.delete('/delete/:id', softDeleteHandler )


export default bookingRouter;

