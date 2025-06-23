// === server/models/Deal.js ===
import mongoose from "mongoose";

const dealSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed", "Cancelled"],
    default: "Pending"
  },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export default mongoose.model("Deal", dealSchema);