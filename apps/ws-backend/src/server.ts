import { WebSocketServer } from "ws";
import { setupWebSocketServer } from "./handlers/wsHandler";
import { createServer } from "node:http";
import { WS_PORT } from "./config";

const server = createServer();

const wss = new WebSocketServer({
  server,
});

setupWebSocketServer(wss);

if (process.env.NODE_ENV !== "test") {
  server.listen(WS_PORT, () => {
    console.log(`WS server listening on port ${WS_PORT}`);
  });
}

export default server;