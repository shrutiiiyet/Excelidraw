import { WebSocketServer } from "ws";
import { getToken } from "../services/auth";
import { authenticateWebSocket } from "../services/getToken";
import {
  handleRoomEvent,
  removeUserFromRoom,
  handleUserDisconnect,
} from "./roomHandler";
import { handleCanvasEvent } from "./canvasHandler";
import { logger } from "../utils/logger";
import { PORT } from "../config";

export const setupWebSocketServer = (wss: WebSocketServer) => {
  wss.on("connection", (socket, request) => {
    const url = request.url;
    if (!url) {
      logger.error("Connection request missing URL");
      socket.close();
      return;
    }

    const token = getToken(url);
    const userAuthenticated = authenticateWebSocket(token);

    if (!userAuthenticated) {
      logger.warn("Unauthorized WebSocket connection attempt");
      socket.close();
      return;
    }

    const userId = userAuthenticated.id;
    logger.info(`User ${userId} connected`);

    // Handle incoming messages
    socket.on("message", (data) => {
      try {
        const message = JSON.parse(data.toString());

        switch (message.type) {
          case "room:join":
          case "room:leave":
            handleRoomEvent(socket, message, userId);
            break;

          case "canvas:draw":
          case "canvas:clear":
          case "canvas:erase":
          case "canvas:update":
            handleCanvasEvent(socket, message, userId);
            break;

          default:
            logger.warn(`Unknown message type received: ${message.type}`);
        }
      } catch (error) {
        logger.error("Invalid message format", error);
      }
    });

    // Handle disconnection
    socket.on("close", () => {
      logger.info(`User ${userId} disconnected`);
      handleUserDisconnect(socket, userId); // uses userId to fully clean up rooms
    });
  });

  wss.on("listening", () => {
    logger.info(`WebSocket server is running on ws://localhost:${PORT}`);
  });
};