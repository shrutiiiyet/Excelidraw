"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRooms = exports.leaveRoom = exports.VerifyUserInRoom = exports.joinRoom = exports.CreateRoom = void 0;
const httpStatus_1 = require("../utils/httpStatus");
const types_1 = require("@repo/common/types");
const db_1 = require("../../../../packages/db");
const CreateRoom = async (req, res) => {
    try {
        // Validate request body
        const parsedData = types_1.CreateRoomSchema.safeParse(req.body);
        if (!parsedData.success) {
            res.status(httpStatus_1.HttpStatus.BAD_REQUEST).json({
                success: false,
                error: "Invalid Room Name",
            });
            return;
        }
        const { roomName } = parsedData.data;
        // Ensure user is authenticated
        const userId = req.auth?.id;
        if (!userId) {
            res.status(httpStatus_1.HttpStatus.UNAUTHORIZED).json({
                success: false,
                error: "User authentication failed.",
            });
            return;
        }
        // Check if room already exists
        const existingRoom = await (0, db_1.getRoomByName)(roomName);
        if (existingRoom) {
            res.status(httpStatus_1.HttpStatus.CONFLICT).json({
                success: false,
                error: "Room already exists",
            });
            return;
        }
        // Create the room
        const room = await (0, db_1.createRoom)(roomName, userId);
        if (!room) {
            res.status(httpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                error: "Failed to create the room. Please try again later.",
            });
            return;
        }
        res.status(httpStatus_1.HttpStatus.CREATED).json({
            success: true,
            message: "Room Created Successfully",
            roomId: room.id,
            slug: room.slug,
        });
        return;
    }
    catch (error) {
        console.error("Error creating room:", error);
        res.status(httpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            error: "Something went wrong while creating the room.",
        });
        return;
    }
};
exports.CreateRoom = CreateRoom;
// Joining a room
const joinRoom = async (req, res) => {
    const userId = req.auth?.id;
    const { roomId } = req.body;
    if (!userId) {
        res.status(httpStatus_1.HttpStatus.UNAUTHORIZED).json({
            success: false,
            error: "User not authenticated. Please log in.",
        });
        return;
    }
    if (!roomId) {
        res.status(httpStatus_1.HttpStatus.BAD_REQUEST).json({
            success: false,
            error: "Room ID is required.",
        });
        return;
    }
    try {
        const room = await (0, db_1.getRoomWithUsers)(roomId);
        if (!room) {
            res.status(httpStatus_1.HttpStatus.NOT_FOUND).json({
                success: false,
                error: "Room doesn't exist",
            });
            return;
        }
        // Check if the user is already a member
        const isAlreadyMember = room.users.some((user) => user.id === userId);
        if (!isAlreadyMember) {
            await (0, db_1.connectUserWithRoom)(roomId, userId);
        }
        res.status(httpStatus_1.HttpStatus.OK).json({
            success: true,
            message: "Room joined successfully.",
            roomId,
        });
        return;
    }
    catch (error) {
        console.error("Error joining room:", error);
        res.status(httpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            error: "Failed to join the room.",
        });
        return;
    }
};
exports.joinRoom = joinRoom;
const VerifyUserInRoom = async (req, res) => {
    const userId = req.auth?.id;
    const { roomId } = req.body;
    if (!userId) {
        res
            .status(httpStatus_1.HttpStatus.UNAUTHORIZED)
            .json({ success: false, error: "Unauthorized" });
        return;
    }
    if (!roomId) {
        res
            .status(httpStatus_1.HttpStatus.BAD_REQUEST)
            .json({ success: false, message: "Room ID required" });
        return;
    }
    try {
        const room = await (0, db_1.getRoomByRoomId)(roomId);
        if (!room) {
            res.status(httpStatus_1.HttpStatus.NOT_FOUND).json({ message: "Room not found" });
            return;
        }
        const isUserInRoom = room.users.some((user) => user.id === userId);
        if (!isUserInRoom) {
            res.status(403).json({ message: "Access denied. Not in this room." });
            return;
        }
        res
            .status(httpStatus_1.HttpStatus.OK)
            .json({ success: true, message: "User is in the room" });
        return;
    }
    catch {
        res
            .status(httpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: "Server error" });
        return;
    }
};
exports.VerifyUserInRoom = VerifyUserInRoom;
// Leaving a room
const leaveRoom = async (req, res) => {
    const userId = req.auth?.id;
    const { roomId } = req.body;
    if (!userId) {
        res
            .status(httpStatus_1.HttpStatus.UNAUTHORIZED)
            .json({ success: false, error: "Unauthorized" });
        return;
    }
    if (!roomId) {
        res
            .status(httpStatus_1.HttpStatus.BAD_REQUEST)
            .json({ success: false, message: "Room ID required" });
        return;
    }
    try {
        const room = await (0, db_1.getRoomWithUsersById)(roomId);
        if (!room) {
            res
                .status(httpStatus_1.HttpStatus.NOT_FOUND)
                .json({ success: false, message: "Room not found." });
            return;
        }
        if (room.adminId === userId) {
            await (0, db_1.deleteRoom)(roomId);
            res
                .status(httpStatus_1.HttpStatus.OK)
                .json({ success: true, message: "Room deleted." });
            return;
        }
        await (0, db_1.removeUserFromRoom)(roomId, userId);
        res
            .status(httpStatus_1.HttpStatus.OK)
            .json({ success: true, message: "Left the room." });
        return;
    }
    catch {
        res
            .status(httpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ success: false, error: "Server error." });
        return;
    }
};
exports.leaveRoom = leaveRoom;
const getRooms = async (req, res) => {
    try {
        const userId = req.auth?.id;
        if (!userId) {
            res.status(httpStatus_1.HttpStatus.UNAUTHORIZED).json({
                success: false,
                error: "User authentication failed.",
            });
            return;
        }
        const user = await (0, db_1.getRoomsByUserId)(userId);
        if (!user) {
            res.status(httpStatus_1.HttpStatus.NOT_FOUND).json({
                success: false,
                error: "User not found.",
            });
            return;
        }
        if (!user.rooms?.length) {
            res.status(httpStatus_1.HttpStatus.OK).json({
                success: true,
                message: "No rooms available.",
                data: {
                    userName: user.name,
                    rooms: [],
                },
            });
            return;
        }
        const formattedRooms = user.rooms.map((room) => ({
            roomId: room.id,
            slug: room.slug,
            createdAt: room.createdAt, // Sending raw timestamp
            participants: room.users.map((participant) => participant.name), // Correct relation key
            noOfParticipants: room.users.length, // Correct relation key
        }));
        res.status(httpStatus_1.HttpStatus.OK).json({
            success: true,
            message: "Rooms fetched successfully.",
            data: {
                userName: user.name,
                rooms: formattedRooms,
            },
        });
        return;
    }
    catch (error) {
        console.error("Error fetching rooms:", error);
        res.status(httpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            error: "Internal server error.",
        });
        return;
    }
};
exports.getRooms = getRooms;
function isUserInRoom(roomId) {
    throw new Error("Function not implemented.");
}
