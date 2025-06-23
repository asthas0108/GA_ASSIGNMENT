// === server/controllers/file.js ===
import File from "../models/file.model.js";
import Deal from "../models/deal.model.js";

export const uploadFile = async (req, res) => {
  try {
    const { dealId } = req.params;
    const deal = await Deal.findById(dealId);

    if (!deal || (deal.buyer.toString() !== req.user.id && deal.seller.toString() !== req.user.id)) {
      return res.status(403).json({ message: "Unauthorized access to deal" });
    }

    const file = await File.create({
      deal: dealId,
      uploader: req.user.id,
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path
    });

    res.status(201).json(file);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getDealFiles = async (req, res) => {
  try {
    const { dealId } = req.params;
    const deal = await Deal.findById(dealId);

    if (!deal || (deal.buyer.toString() !== req.user.id && deal.seller.toString() !== req.user.id)) {
      return res.status(403).json({ message: "Unauthorized access to deal" });
    }

    const files = await File.find({ deal: dealId });
    res.json(files);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};