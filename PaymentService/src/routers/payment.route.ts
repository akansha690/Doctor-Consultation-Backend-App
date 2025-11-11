
import express from "express";
import { createOrderHandler } from "../controllers/payment.controller";
import { webhookHandler } from "../controllers/webhook.controller";

const paymentRouter = express.Router();

paymentRouter.post('/' , createOrderHandler)
paymentRouter.post('/webhook' , webhookHandler)

export default paymentRouter;

