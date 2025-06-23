// // === server/models/Message.js ===
// import mongoose from "mongoose";

// const messageSchema = new mongoose.Schema({
//   deal: { type: mongoose.Schema.Types.ObjectId, ref: "Deal" },
//   sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   content: String,
//   timestamp: { type: Date, default: Date.now }
// });

// export default mongoose.model("Message", messageSchema);

// Chat model (models/message.model.js)
import mongoose from "mongoose";
const messageSchema = new mongoose.Schema(
  {
    deal: { type: mongoose.Schema.Types.ObjectId, ref: "Deal", required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);
export default mongoose.model("Message", messageSchema);