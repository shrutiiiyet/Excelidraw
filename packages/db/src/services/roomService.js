"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoomByRoomId = exports.getRoomIfExists = exports.connectUserWithRoom = exports.getRoomWithUsers = exports.getRoomWithUsersById = exports.removeUserFromRoom = exports.deleteRoom = exports.getRoomsByUserId = exports.getRoomByName = exports.createRoom = void 0;
const index_1 = require("../index");
const createRoom = async (name, userId) => {
    return await index_1.client.room.create({
        data: {
            slug: name,
            adminId: userId,
            users: {
                connect: [{ id: userId }], // Automatically connect the admin as a member
            },
        },
    });
};
exports.createRoom = createRoom;
const getRoomByName = async (roomName) => {
    return await index_1.client.room.findFirst({
        where: {
            slug: roomName,
        },
    });
};
exports.getRoomByName = getRoomByName;
const getRoomsByUserId = async (userId) => {
    return await index_1.client.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            name: true,
            rooms: {
                select: {
                    id: true,
                    slug: true,
                    createdAt: true,
                    users: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            },
        },
    });
};
exports.getRoomsByUserId = getRoomsByUserId;
const deleteRoom = async (roomId) => {
    return await index_1.client.room.delete({
        where: { id: roomId },
    });
};
exports.deleteRoom = deleteRoom;
const removeUserFromRoom = async (roomId, userId) => {
    return await index_1.client.room.update({
        where: { id: roomId },
        data: {
            users: {
                disconnect: [{ id: userId }],
            },
        },
    });
};
exports.removeUserFromRoom = removeUserFromRoom;
const getRoomWithUsersById = async (roomId) => {
    return await index_1.client.room.findUnique({
        where: { id: roomId },
        include: {
            users: true, // Get all users in the room
            admin: true, // Get the admin details
        },
    });
};
exports.getRoomWithUsersById = getRoomWithUsersById;
const getRoomWithUsers = async (roomId) => {
    return await index_1.client.room.findUnique({
        where: { id: roomId },
        include: { users: true },
    });
};
exports.getRoomWithUsers = getRoomWithUsers;
const connectUserWithRoom = async (roomId, userId) => {
    await index_1.client.room.update({
        where: { id: roomId },
        data: { users: { connect: { id: userId } } },
    });
};
exports.connectUserWithRoom = connectUserWithRoom;
const getRoomIfExists = async (roomId) => {
    return await index_1.client.room.findUnique({
        where: { id: roomId },
    });
};
exports.getRoomIfExists = getRoomIfExists;
const getRoomByRoomId = async (roomId) => {
    return await index_1.client.room.findUnique({
        where: { id: roomId },
        include: { users: true },
    });
};
exports.getRoomByRoomId = getRoomByRoomId;
