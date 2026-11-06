import { WebSocketServer } from "ws";
import { setupWebSocketServer } from "./handlers/wsHandler";
import { createServer } from "node:http";
import { WS_PORT } from "./config";

const server = createServer();

const wss = new WebSocketServer({
  port: WS_PORT,
  host: "0.0.0.0",
});

setupWebSocketServer(wss);

console.log(`WS server listening on port ${WS_PORT}`);

export default server;