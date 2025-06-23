import express from "express";
import User from "../models/user.model.js";
const router = express.Router();

router.get("/sellers", async (req, res) => {
  const sellers = await User.find({ role: "seller" }, "_id name");
  res.json(sellers);
});

export default router;
