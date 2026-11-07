"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wsHandler_1 = require("./handlers/wsHandler");
const node_http_1 = require("node:http");
const config_1 = require("./config");
const server = (0, node_http_1.createServer)();
const wss = new ws_1.WebSocketServer({
    server,
});
(0, wsHandler_1.setupWebSocketServer)(wss);
if (process.env.NODE_ENV !== "test") {
    server.listen(config_1.WS_PORT, () => {
        console.log(`WS server listening on port ${config_1.WS_PORT}`);
    });
}
exports.default = server;
