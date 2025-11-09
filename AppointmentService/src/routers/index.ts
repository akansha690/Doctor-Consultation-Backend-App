
import express from "express";
import doctorRouter from "./doctor.route";
import slotRouter from "./availability.route";
import bookingRouter from "./booking.route";

const v1Router = express.Router();

v1Router.use('/doctor', doctorRouter)
v1Router.use('/slot', slotRouter)
v1Router.use('/booking', bookingRouter)



export default v1Router;

