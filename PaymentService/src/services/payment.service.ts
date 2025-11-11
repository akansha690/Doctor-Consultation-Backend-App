
// import crypto from 'crypto';

// export async function verifyAndUpdatePayment(signature: string, data:string, event:any, ){
    
//     // verify Razorpay signature
//     const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET!);
//     shasum.update(data);
//     const digest = shasum.digest("hex");

//     if (digest !== signature) {
//       throw new Error("Invalid signature" );
//     }


//     // update payment status
//     await Payment.update(
//       {
//         status: event === "payment.captured" ? "SUCCESS" : "FAILED",
//         razorpayPaymentId: payment.id,
//       },
//       { where: { razorpayOrderId: payment.order_id } }
//     );
// }