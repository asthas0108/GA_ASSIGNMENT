import express from "express";
import { authenticate } from "../middlewares/auth.js";
import { sendMessage, getMessages } from "../controllers/message.controller.js";
const router = express.Router();

router.post("/send", authenticate, sendMessage);
router.get("/:dealId", authenticate, getMessages);

export default router;