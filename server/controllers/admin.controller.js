// === server/controllers/admin.js ===
import Deal from "../models/deal.model.js";
import User from "../models/user.model.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalDeals = await Deal.countDocuments();
    const statusBreakdown = await Deal.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);
    const totalUsers = await User.countDocuments();

    res.json({
      totalDeals,
      totalUsers,
      statusBreakdown: statusBreakdown.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {})
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};