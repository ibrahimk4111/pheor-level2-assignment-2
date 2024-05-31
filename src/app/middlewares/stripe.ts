import { RequestHandler, Router } from "express";
import httpStatus from "http-status";
import Stripe from "stripe";
import { config } from "../config";
import { AsyncHandler } from "../helpers/AsyncHandler";
import { responseHandler } from "../helpers/responseHandler";

const stripe = new Stripe(config.stripe_secret as string)

const stripePaymentController:RequestHandler = AsyncHandler(async(req, res) =>{
  const { items } = req.body;
  
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1000 * 100,
    currency: "usd",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });
  responseHandler(res, httpStatus.OK, true, "payment succeed", paymentIntent)
})


// Router to hit
const router = Router();
router.post("/payment", stripePaymentController)
export const stripePaymentRouter = router;