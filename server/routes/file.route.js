import express from "express";
import { authenticate } from "../middlewares/auth.js";
import { upload } from "../middlewares/upload.js";
import { uploadFile, getDealFiles } from "../controllers/file.controller.js";
const router = express.Router();

router.post("/:dealId", authenticate, upload.single("file"), uploadFile);
router.get("/:dealId", authenticate, getDealFiles);

export default router;