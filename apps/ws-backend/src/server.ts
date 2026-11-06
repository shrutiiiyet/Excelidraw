import { WebSocketServer } from "ws";
import { setupWebSocketServer } from "./handlers/wsHandler";
import { createServer } from "node:http";

const server = createServer();

const wss = new WebSocketServer({
  server,
});

setupWebSocketServer(wss);

export default server;