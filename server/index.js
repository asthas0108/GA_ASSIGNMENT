// === server/index.js ===
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.js";
import redis from "./config/redis.js";
import authRoutes from "./routes/auth.route.js";
import dealRoutes from "./routes/deal.route.js";
import messageRoutes from "./routes/message.route.js";
import adminRoutes from "./routes/admin.route.js";
import userRoutes from "./routes/user.route.js";
import fileRoutes from "./routes/file.route.js";
import chatRoutes from './routes/message.route.js';
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/deals", dealRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use('/api/chat', chatRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => res.send("API running"));


const io = new Server(server, { cors: { origin: "*" } });
io.on("connection", (socket) => {
  socket.on("joinRoom", (dealId) => socket.join(dealId));
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
