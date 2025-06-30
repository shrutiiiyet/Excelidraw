import { WebSocket } from "ws";
import { logger } from "../utils/logger";
import { deleteUserCanvasInRoom } from "@repo/db/services";
import {
  addUserToRoom,
  isUserInRoom,
  rooms,
  removeUser,
  broadcastToRoom,
} from "../utils/roomManager";

export const handleRoomEvent = async (
  socket: WebSocket,
  message: { type: string; room: string },
  userId: string
) => {
  const { type, room } = message;

  switch (type) {
    case "room:join":
      if (!isUserInRoom(socket, room)) {
        addUserToRoom(socket, room);
        logger.info(`User ${userId} joined room ${room}`);
        broadcastToRoom(
          room,
          {
            type: "user:connected",
            message: `User ${userId} joined`,
          },
          socket
        );
      }
      break;

    case "room:leave":
      if (rooms[room] && isUserInRoom(socket, room)) {
        // Set to true if user's canvas design are to be removed when they leave, else false.
        await removeUserFromRoom(socket, room, userId, true);
      }
      break;
  }
};

// Handle Disconnect (Keep Canvas)
export const handleUserDisconnect = (socket: WebSocket, userId: string) => {
  for (const room in rooms) {
    if (rooms[room] && isUserInRoom(socket, room)) {
      removeUserFromRoom(socket, room, userId, false);
    }
  }
};

// Full Leave (Remove User + Canvas)
export const handleUserLeaveCompletely = async (
  socket: WebSocket,
  userId: string
) => {
  for (const room in rooms) {
    if (rooms[room] && isUserInRoom(socket, room)) {
      await removeUserFromRoom(socket, room, userId, true);
    }
  }
};

// Remove User from Room (Optional Canvas Removal)
export const removeUserFromRoom = async (
  socket: WebSocket,
  room: string,
  userId: string,
  removeCanvas: boolean
) => {
  if (!rooms[room] || !isUserInRoom(socket, room)) {
    logger.warn(
      `User ${userId} tried to leave room ${room}, but either room does not exist or user not in room.`
    );
    return;
  }

  try {
    removeUser(socket, room);

    const roomSize = rooms[room]?.size || 0;
    logger.info(
      `User ${userId} left room ${room}. Remaining users: ${roomSize}`
    );

    if (removeCanvas) {
      try {
        const response = await deleteUserCanvasInRoom(room, userId);
        if (response) {
          logger.info(`User ${userId}'s canvas removed from room ${room}`);
        } else {
          logger.warn(`No canvas found for user ${userId} in room ${room}`);
        }
      } catch (error) {
        logger.error(`Failed to remove canvas for user ${userId}:`, error);
      }
    }
  } catch (err) {
    logger.error(`Error while removing user ${userId} from room ${room}:`, err);
  } finally {
    if (rooms[room]) {
      cleanupRoom(room, socket);
    }
  }
};

// Remove Room if Empty
const cleanupRoom = (room: string, socket: WebSocket) => {
  const userCount = rooms[room]?.size || 0;

  if (userCount === 0) {
    delete rooms[room];
    logger.info(`Room ${room} deleted (no users left).`);
  } else {
    broadcastToRoom(
      room,
      {
        type: "user:disconnected",
        message: `A user left the room`,
      },
      socket
    );
  }
};