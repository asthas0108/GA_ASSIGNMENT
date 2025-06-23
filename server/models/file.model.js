import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  deal: { type: mongoose.Schema.Types.ObjectId, ref: "Deal" },
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  filename: String,
  originalName: String,
  path: String,
  uploadedAt: { type: Date, default: Date.now }
});

export default mongoose.model("File", fileSchema);