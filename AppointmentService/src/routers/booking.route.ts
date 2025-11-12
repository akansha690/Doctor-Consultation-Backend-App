
import express from "express";
import { createBookingHandler, getBookingHandler, softDeleteHandler, updateHandler } from "../controllers/booking.controller";
import { reqValidator } from "../validators";
import { bookingSchema } from "../validators/booking";

const bookingRouter = express.Router();

bookingRouter.post('/', reqValidator(bookingSchema), createBookingHandler )
bookingRouter.get('/:id', getBookingHandler )
bookingRouter.patch('/update/:id', updateHandler )
bookingRouter.delete('/delete/:id', softDeleteHandler )


export default bookingRouter;

