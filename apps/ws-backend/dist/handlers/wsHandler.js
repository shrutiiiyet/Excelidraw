"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupWebSocketServer = void 0;
const auth_1 = require("../services/auth");
const getToken_1 = require("../services/getToken");
const roomHandler_1 = require("./roomHandler");
const canvasHandler_1 = require("./canvasHandler");
const logger_1 = require("../utils/logger");
const setupWebSocketServer = (wss) => {
    wss.on("connection", (socket, request) => {
        const url = request.url;
        if (!url) {
            logger_1.logger.error("Connection request missing URL");
            socket.close();
            return;
        }
        const token = (0, auth_1.getToken)(url);
        const userAuthenticated = (0, getToken_1.authenticateWebSocket)(token);
        if (!userAuthenticated) {
            logger_1.logger.warn("Unauthorized WebSocket connection attempt");
            socket.close();
            return;
        }
        const userId = userAuthenticated.id;
        logger_1.logger.info(`User ${userId} connected`);
        // Handle incoming messages
        socket.on("message", (data) => {
            try {
                const message = JSON.parse(data.toString());
                switch (message.type) {
                    case "room:join":
                    case "room:leave":
                        (0, roomHandler_1.handleRoomEvent)(socket, message, userId);
                        break;
                    case "canvas:draw":
                    case "canvas:clear":
                    case "canvas:erase":
                    case "canvas:update":
                        (0, canvasHandler_1.handleCanvasEvent)(socket, message, userId);
                        break;
                    default:
                        logger_1.logger.warn(`Unknown message type received: ${message.type}`);
                }
            }
            catch (error) {
                logger_1.logger.error("Invalid message format", error);
            }
        });
        // Handle disconnection
        socket.on("close", () => {
            logger_1.logger.info(`User ${userId} disconnected`);
            (0, roomHandler_1.handleUserDisconnect)(socket, userId); // uses userId to fully clean up rooms
        });
    });
};
exports.setupWebSocketServer = setupWebSocketServer;
