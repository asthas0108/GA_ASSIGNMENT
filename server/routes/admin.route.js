// === server/routes/admin.js ===
import express from "express";
import { authenticate } from "../middlewares/auth.js";
import { getDashboardStats } from "../controllers/admin.controller.js";
const router = express.Router();

router.get("/stats", authenticate, getDashboardStats);

export default router;