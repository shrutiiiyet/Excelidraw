"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUserFromRoom = exports.handleUserLeaveCompletely = exports.handleUserDisconnect = exports.handleRoomEvent = void 0;
const logger_1 = require("../utils/logger");
const services_1 = require("@repo/db/services");
const roomManager_1 = require("../utils/roomManager");
const handleRoomEvent = async (socket, message, userId) => {
    const { type, room } = message;
    switch (type) {
        case "room:join":
            if (!(0, roomManager_1.isUserInRoom)(socket, room)) {
                (0, roomManager_1.addUserToRoom)(socket, room);
                logger_1.logger.info(`User ${userId} joined room ${room}`);
                (0, roomManager_1.broadcastToRoom)(room, {
                    type: "user:connected",
                    message: `User ${userId} joined`,
                }, socket);
            }
            break;
        case "room:leave":
            if (roomManager_1.rooms[room] && (0, roomManager_1.isUserInRoom)(socket, room)) {
                // Set to true if user's canvas design are to be removed when they leave, else false.
                await (0, exports.removeUserFromRoom)(socket, room, userId, true);
            }
            break;
    }
};
exports.handleRoomEvent = handleRoomEvent;
// Handle Disconnect (Keep Canvas)
const handleUserDisconnect = (socket, userId) => {
    for (const room in roomManager_1.rooms) {
        if (roomManager_1.rooms[room] && (0, roomManager_1.isUserInRoom)(socket, room)) {
            (0, exports.removeUserFromRoom)(socket, room, userId, false);
        }
    }
};
exports.handleUserDisconnect = handleUserDisconnect;
// Full Leave (Remove User + Canvas)
const handleUserLeaveCompletely = async (socket, userId) => {
    for (const room in roomManager_1.rooms) {
        if (roomManager_1.rooms[room] && (0, roomManager_1.isUserInRoom)(socket, room)) {
            await (0, exports.removeUserFromRoom)(socket, room, userId, true);
        }
    }
};
exports.handleUserLeaveCompletely = handleUserLeaveCompletely;
// Remove User from Room (Optional Canvas Removal)
const removeUserFromRoom = async (socket, room, userId, removeCanvas) => {
    if (!roomManager_1.rooms[room] || !(0, roomManager_1.isUserInRoom)(socket, room)) {
        logger_1.logger.warn(`User ${userId} tried to leave room ${room}, but either room does not exist or user not in room.`);
        return;
    }
    try {
        (0, roomManager_1.removeUser)(socket, room);
        const roomSize = roomManager_1.rooms[room]?.size || 0;
        logger_1.logger.info(`User ${userId} left room ${room}. Remaining users: ${roomSize}`);
        if (removeCanvas) {
            try {
                const response = await (0, services_1.deleteUserCanvasInRoom)(room, userId);
                if (response) {
                    logger_1.logger.info(`User ${userId}'s canvas removed from room ${room}`);
                }
                else {
                    logger_1.logger.warn(`No canvas found for user ${userId} in room ${room}`);
                }
            }
            catch (error) {
                logger_1.logger.error(`Failed to remove canvas for user ${userId}:`, error);
            }
        }
    }
    catch (err) {
        logger_1.logger.error(`Error while removing user ${userId} from room ${room}:`, err);
    }
    finally {
        if (roomManager_1.rooms[room]) {
            cleanupRoom(room, socket);
        }
    }
};
exports.removeUserFromRoom = removeUserFromRoom;
// Remove Room if Empty
const cleanupRoom = (room, socket) => {
    const userCount = roomManager_1.rooms[room]?.size || 0;
    if (userCount === 0) {
        delete roomManager_1.rooms[room];
        logger_1.logger.info(`Room ${room} deleted (no users left).`);
    }
    else {
        (0, roomManager_1.broadcastToRoom)(room, {
            type: "user:disconnected",
            message: `A user left the room`,
        }, socket);
    }
};
