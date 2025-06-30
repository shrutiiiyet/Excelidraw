"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const env_1 = require("./config/env");
// import routers
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const roomRoutes_1 = __importDefault(require("./routes/roomRoutes"));
const canvasRoutes_1 = __importDefault(require("./routes/canvasRoutes"));
const app = (0, express_1.default)();
// Middleware
// app.use(
//   cors({
//     origin: ["http://localhost:3000", "https://www.cosketch.xyz", FRONTEND_URL],
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.get("/", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Excelidraw!",
    });
});
app.use("/auth", authRoutes_1.default);
app.use("/room", roomRoutes_1.default);
app.use("/canvas", canvasRoutes_1.default);
app.listen(env_1.PORT, () => {
    console.log(`[ server ] is listening on : http://localhost:${env_1.PORT}`);
});
