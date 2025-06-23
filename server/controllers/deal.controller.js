// === server/controllers/deal.js ===
import Deal from "../models/deal.model.js";

export const createDeal = async (req, res) => {
  try {
    const { title, description, price, seller } = req.body;
    const deal = await Deal.create({ title, description, price, seller, buyer: req.user.id });
    res.status(201).json(deal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getDeals = async (req, res) => {
  try {
    const deals = await Deal.find({
      $or: [{ buyer: req.user.id }, { seller: req.user.id }]
    }).populate("buyer seller");
    res.json(deals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateDealStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const deal = await Deal.findByIdAndUpdate(id, { status }, { new: true });
    res.json(deal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};