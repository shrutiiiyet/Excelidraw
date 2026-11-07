"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateWebSocket = void 0;
const config_1 = require("@repo/backend-common/config");
const logger_1 = require("../utils/logger");
const JWT_SECRET = process.env.JWT_SECRET;
const authenticateWebSocket = (token) => {
    try {
        if (!token) {
            logger_1.logger.error("[authenticateWebSocket] No token provided");
            return null;
        }
        const decoded = (0, config_1.verifyToken)(token, JWT_SECRET);
        if (!decoded || !decoded.id) {
            logger_1.logger.error("[authenticateWebSocket] Invalid token");
            return null;
        }
        logger_1.logger.info(`[authenticateWebSocket] User authenticated`);
        return decoded;
    }
    catch (error) {
        logger_1.logger.error("[authenticateWebSocket] JWT verification failed", error);
        return null;
    }
};
exports.authenticateWebSocket = authenticateWebSocket;
