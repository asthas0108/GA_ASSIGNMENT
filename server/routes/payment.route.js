import express from "express";
import razorpay from "../utils/razorpay.js";
import { authenticate } from "../middlewares/auth.js";

const router = express.Router();

router.post("/create-order", authenticate, async (req, res) => {
  const { amount, dealId } = req.body;

  const options = {
    amount: amount * 100, // ₹ → paise
    currency: "INR",
    receipt: `receipt_order_${dealId}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json({ orderId: order.id });
  } catch (err) {
    res.status(500).json({ message: "Payment initiation failed", error: err.message });
  }
});

export default router;
