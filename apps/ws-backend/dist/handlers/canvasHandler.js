"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCanvasEvent = void 0;
const services_1 = require("@repo/db/services");
const logger_1 = require("../utils/logger");
const roomManager_1 = require("../utils/roomManager");
const types_1 = require("@repo/common/types");
const handleCanvasEvent = async (socket, message, userId) => {
    try {
        const { type, room, data, shapeId } = message;
        // Check if the room exists in memory
        if (!room || !roomManager_1.rooms[room]) {
            logger_1.logger.warn(`Canvas event received for non-existent room: ${room}`);
            return;
        }
        // Check if user is in the room
        if (!(0, roomManager_1.isUserInRoom)(socket, room)) {
            logger_1.logger.warn(`User ${userId} is not in room ${room}. Ignoring event.`);
            return;
        }
        switch (type) {
            case "canvas:draw": {
                // Validate shape data
                const parsedData = types_1.shapeSchema.safeParse(data);
                if (!parsedData.success) {
                    logger_1.logger.warn(`Invalid shape data from user ${userId}: ${JSON.stringify(parsedData.error.format())}`);
                    return;
                }
                const shapeData = parsedData.data;
                try {
                    await (0, services_1.createCanvas)({
                        roomId: room,
                        userId,
                        design: shapeData,
                    });
                    logger_1.logger.info(`User ${userId} drew a ${shapeData.type} in room ${room}`);
                    (0, roomManager_1.broadcastToRoom)(room, { type: "canvas:draw", userId, data: shapeData }, socket);
                }
                catch (dbError) {
                    logger_1.logger.error(`Database error while saving shape: ${dbError}`);
                    return;
                }
                break;
            }
            case "canvas:clear":
                logger_1.logger.info(`User ${userId} cleared the canvas in room ${room}`);
                (0, services_1.clearRoomCanvas)(room);
                (0, roomManager_1.broadcastToRoom)(room, {
                    type: "canvas:clear",
                    message: `User ${userId} cleared the canvas`,
                }, socket);
                break;
            case "canvas:erase":
                try {
                    if (!shapeId) {
                        logger_1.logger.warn(`User ${userId} attempted to erase without providing a shape ID.`);
                        return;
                    }
                    const existingShape = await (0, services_1.getCanvasShape)(String(shapeId));
                    if (!existingShape) {
                        logger_1.logger.warn(`Shape ${shapeId} not found in room ${room}`);
                        return;
                    }
                    await (0, services_1.deleteCanvasShape)(String(shapeId));
                    logger_1.logger.info(`User ${userId} erased shape ${shapeId} in room ${room}`);
                    (0, roomManager_1.broadcastToRoom)(room, {
                        type: "canvas:erase",
                        userId,
                        shapeId,
                    }, socket);
                }
                catch (dbError) {
                    logger_1.logger.error(`Database error while erasing shape: ${dbError}`);
                }
                break;
            case "canvas:update": {
                if (!data?.id) {
                    logger_1.logger.warn(`Update event received without a shape ID.`);
                    return;
                }
                // Validate shape data
                const parsedData = types_1.shapeSchema.safeParse(data);
                if (!parsedData.success) {
                    logger_1.logger.warn(`Invalid update data from user ${userId}: ${JSON.stringify(parsedData.error.format())}`);
                    return;
                }
                try {
                    const existingShape = await (0, services_1.getCanvasShape)(String(data.id));
                    if (!existingShape) {
                        logger_1.logger.warn(`Shape ${data.id} not found in room ${room}`);
                        return;
                    }
                    const updatedShape = await (0, services_1.updateCanvasShape)(String(data.id), data);
                    logger_1.logger.info(`User ${userId} updated shape ${data.id} in room ${room}`);
                    (0, roomManager_1.broadcastToRoom)(room, {
                        type: "canvas:update",
                        userId,
                        shapeId: data.id,
                        data,
                    }, socket);
                }
                catch (dbError) {
                    logger_1.logger.error(`Database error while updating shape: ${dbError}`);
                }
                break;
            }
            default:
                logger_1.logger.warn(`Unknown canvas event type: ${type}`);
        }
    }
    catch (error) {
        logger_1.logger.error(`Unexpected error handling canvas event: ${error}`);
    }
};
exports.handleCanvasEvent = handleCanvasEvent;
