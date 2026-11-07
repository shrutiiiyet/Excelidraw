"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCanvasShape = exports.deleteCanvasShape = exports.getCanvasShape = exports.getRoomCanvas = exports.clearRoomCanvas = exports.deleteUserCanvasInRoom = exports.createCanvas = void 0;
const index_1 = require("../index");
const createCanvas = async ({ roomId, userId, design, }) => {
    return await index_1.client.canvas.create({
        data: {
            id: String(design.id),
            roomId,
            userId,
            design,
        },
    });
};
exports.createCanvas = createCanvas;
const deleteUserCanvasInRoom = async (roomId, userId) => {
    const existingCanvas = await index_1.client.canvas.findFirst({
        where: { roomId: roomId, userId },
    });
    if (!existingCanvas) {
        return null;
    }
    return await index_1.client.canvas.deleteMany({ where: { roomId: roomId, userId } });
};
exports.deleteUserCanvasInRoom = deleteUserCanvasInRoom;
const clearRoomCanvas = async (roomId) => {
    const existingCanvas = await index_1.client.canvas.findMany({
        where: { roomId },
    });
    if (existingCanvas.length === 0) {
        return null;
    }
    return await index_1.client.canvas.deleteMany({
        where: { roomId },
    });
};
exports.clearRoomCanvas = clearRoomCanvas;
const getRoomCanvas = async (roomId) => {
    return await index_1.client.canvas.findMany({
        where: { roomId },
        take: 50,
        orderBy: { createdAt: "desc" },
    });
};
exports.getRoomCanvas = getRoomCanvas;
const getCanvasShape = async (shapeId) => {
    return await index_1.client.canvas.findUnique({
        where: { id: shapeId },
    });
};
exports.getCanvasShape = getCanvasShape;
const deleteCanvasShape = async (shapeId) => {
    return await index_1.client.canvas.delete({
        where: { id: shapeId },
    });
};
exports.deleteCanvasShape = deleteCanvasShape;
const updateCanvasShape = async (shapeId, updateData) => {
    return await index_1.client.canvas.update({
        where: { id: shapeId },
        data: {
            design: updateData,
        },
    });
};
exports.updateCanvasShape = updateCanvasShape;
