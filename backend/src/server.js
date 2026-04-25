import express from "express";
import "dotenv/config";
import cors from "cors";
import path from "path";
import http from "http";
import { Server } from "socket.io";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";

import { connectDB } from "./lib/db.js";
connectDB();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: [
            "http://localhost:5173",
            "http://localhost:3000",
            "https://zync-five.vercel.app"
        ],
        methods: ["GET", "POST"]
    }
});

let onlineUsersCount = 0;

io.on("connection", (socket) => {
    onlineUsersCount++;
    io.emit("update_online_users", onlineUsersCount);

    socket.on("disconnect", () => {
        onlineUsersCount--;
        if (onlineUsersCount < 0) onlineUsersCount = 0;
        io.emit("update_online_users", onlineUsersCount);
    });
});

const PORT = process.env.PORT || 5001;

const __dirname = path.resolve();

app.use(
    cors({
        origin: (origin, callback) => {
            const allowedOrigins = [
                "http://localhost:5173",
                "http://localhost:3000",
                "https://zync-five.vercel.app"
            ];

            if (!origin || allowedOrigins.includes(origin)) {
                return callback(null, true);
            }
            return callback(null, true);
        },
        credentials: true,
    })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        if (!req.path.startsWith('/api')) {
            res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
        }
    });
}

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
