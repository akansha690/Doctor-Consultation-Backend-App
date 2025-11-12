import { Request, Response } from "express";
import {instance } from "../config/razorpay.config";
import { getBookingById, updateBooking } from "../apiGateway/axios";

export const createOrderHandler = async (req: Request, res: Response) => {
  try {
    // console.log("\nNEW REQUEST");

    const bookingId = Number(req.params.bookingId)

    // console.log(bookingId);

    const bookingDetails = await getBookingById(bookingId);
     if (!bookingDetails) {
      return res.status(404).json({ 
        success: false, 
        message: "Booking not found" 
      });
    }
    // console.log(bookingDetails.price);
    

    if (!bookingDetails.price || bookingDetails.price <= 0) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid booking price" 
      });
    }

    const options = {
      amount: bookingDetails.price * 100, // in paise
      currency: "INR",
      receipt: `booking_${bookingId}`
    };

    const order = await instance.orders.create(options);
    await updateBooking(bookingId);

    return res.status(200).json({
      success: true,
      data : order,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Order creation failed" });
  }
};
