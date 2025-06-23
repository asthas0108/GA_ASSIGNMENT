// === server/routes/deal.js ===
import express from "express";
import { authenticate } from "../middlewares/auth.js";
import { createDeal, getDeals, updateDealStatus } from "../controllers/deal.controller.js";
const router = express.Router();

router.post("/", authenticate, createDeal);
router.get("/", authenticate, getDeals);
router.put("/:id/status", authenticate, updateDealStatus);

export default router;