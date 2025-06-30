import { WebSocketServer } from "ws";
import { PORT } from "./config";
import { setupWebSocketServer } from "./handlers/wsHandler";

const wss = new WebSocketServer({ port: PORT });

setupWebSocketServer(wss);