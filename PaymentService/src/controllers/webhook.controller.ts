import crypto from "crypto";
import Payment from "../models/payment.model"; 
import { Request, Response } from "express";

export const webhookHandler = async (req:Request, res:Response) => {
  try {
    const signature = req.headers["x-razorpay-signature"];
    const data=JSON.stringify(req.body)
    const event = req.body.event;
    const payment = req.body.payload.payment.entity;

    const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!);
    shasum.update(data);
    const digest = shasum.digest("hex");

    if (digest !== signature) {
       return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    // update payment status
    await Payment.update(
        {
        status: event === "payment.captured" ? "SUCCESS" : "FAILED",
        razorpayPaymentId: payment.id,
        },
        { where: { razorpayOrderId: payment.order_id } }
    );
    res.json({ received: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "webhook error" });
  }
};
