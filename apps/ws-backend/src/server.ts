import { WebSocketServer } from "ws";
import { WS_PORT } from "./config";
import { setupWebSocketServer } from "./handlers/wsHandler";

const wss = new WebSocketServer({ port: WS_PORT});

setupWebSocketServer(wss);