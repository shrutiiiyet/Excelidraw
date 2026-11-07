"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.broadcastToRoom = exports.isUserInRoom = exports.getUsersInRoom = exports.removeUser = exports.addUserToRoom = exports.rooms = void 0;
const ws_1 = require("ws");
exports.rooms = {};
// Add user to a room
const addUserToRoom = (socket, roomId) => {
    if (!exports.rooms[roomId])
        exports.rooms[roomId] = new Set();
    exports.rooms[roomId].add(socket);
};
exports.addUserToRoom = addUserToRoom;
// Remove user from a room
const removeUser = (socket, roomId) => {
    if (!exports.rooms[roomId])
        return;
    exports.rooms[roomId].delete(socket);
};
exports.removeUser = removeUser;
// Get all users in a room
const getUsersInRoom = (roomId) => {
    return exports.rooms[roomId] ? Array.from(exports.rooms[roomId]) : [];
};
exports.getUsersInRoom = getUsersInRoom;
// Check if user is in a room
const isUserInRoom = (socket, roomId) => {
    return exports.rooms[roomId]?.has(socket) || false;
};
exports.isUserInRoom = isUserInRoom;
//  Broadcast message to all users in a room
const broadcastToRoom = (roomId, message, excludeSocket) => {
    if (!exports.rooms[roomId])
        return;
    const data = JSON.stringify(message);
    exports.rooms[roomId].forEach((client) => {
        if (client.readyState === ws_1.WebSocket.OPEN && client !== excludeSocket) {
            client.send(data);
        }
    });
};
exports.broadcastToRoom = broadcastToRoom;
