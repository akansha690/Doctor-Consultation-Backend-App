
import express from "express";
import paymentRouter from "./payment.route";

const v1Router = express.Router();

v1Router.use('/payment', paymentRouter)


export default v1Router;

