import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { dealId, text } = req.body;
    if (!dealId || !text) {
      return res.status(400).json({ message: "dealId and text are required" });
    }

    // ✅ Ensure req.user exists
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized - no user info" });
    }
    let message = await Message.create({
      deal: dealId,
      sender: req.user.id,
      text,
    });
    message = await message.populate("sender", "name _id");
    req.io.to(dealId).emit("newMessage", message);
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { dealId } = req.params;
    const messages = await Message.find({ deal: dealId }).populate("sender", "name _id");
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};