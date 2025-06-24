import Deal from "../models/deal.model.js";

export const createDeal = async (req, res) => {
  try {
    const { title, description, price, seller } = req.body;
    const deal = await Deal.create({ title, description, price, seller, buyer: req.user.id });

    await deal.populate("buyer").populate("seller");

    req.io.emit("dealCreated", deal);

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
    const updatedDeal = await Deal.findByIdAndUpdate(req.params.id, { status }, { new: true })
    .populate("buyer")
    .populate("seller");
    req.io.emit("dealUpdated", updatedDeal);  
    res.json(updatedDeal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};