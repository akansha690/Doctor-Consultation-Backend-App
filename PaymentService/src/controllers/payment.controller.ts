import { Request, Response } from "express";
import {instance } from "../config/razorpay.config";

export const createOrderHandler = async (req: Request, res: Response) => {
  try {
    const { receipt, amount } = req.body;

    const options = {
      amount: amount * 100, // in paise
      currency: "INR",
      receipt: receipt
    };

    const order = await instance.orders.create(options);

    return res.status(200).json({
      success: true,
      data : order,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Order creation failed" });
  }
};
