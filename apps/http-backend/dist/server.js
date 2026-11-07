"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import routers
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const roomRoutes_1 = __importDefault(require("./routes/roomRoutes"));
const canvasRoutes_1 = __importDefault(require("./routes/canvasRoutes"));
const env_1 = require("./config/env");
const app = (0, express_1.default)();
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
if (process.env.NODE_ENV !== "test") {
    app.listen(env_1.HTTP_PORT, () => {
        console.log(`HTTP server listening on port ${env_1.HTTP_PORT}`);
    });
}
exports.default = app;
