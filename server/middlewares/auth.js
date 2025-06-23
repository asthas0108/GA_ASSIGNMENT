import jwt from "jsonwebtoken";
import redis from "../config/redis.js";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.sendStatus(401);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sessionToken = await redis.get(`session:${decoded.id}`);

    if (sessionToken !== token) return res.sendStatus(401);

    req.user = decoded;
    next();
  } catch (err) {
    res.sendStatus(401);
  }
};