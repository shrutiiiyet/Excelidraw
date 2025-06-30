import type { BroadcastMessage, OutgoinMessage } from '@repo/common/types'
import { WebSocket } from "ws";

interface Rooms {
  [roomId: string]: Set<WebSocket>;
}

export const rooms: Rooms = {};

// Add user to a room
export const addUserToRoom = (socket: WebSocket, roomId: string) => {
  if (!rooms[roomId]) rooms[roomId] = new Set();
  rooms[roomId].add(socket);
};

// Remove user from a room
export const removeUser = (socket: WebSocket, roomId: string) => {
  if (!rooms[roomId]) return;

  rooms[roomId].delete(socket);
};

// Get all users in a room
export const getUsersInRoom = (roomId: string): WebSocket[] => {
  return rooms[roomId] ? Array.from(rooms[roomId]) : [];
};

// Check if user is in a room
export const isUserInRoom = (socket: WebSocket, roomId: string): boolean => {
  return rooms[roomId]?.has(socket) || false;
};

//  Broadcast message to all users in a room
export const broadcastToRoom = (
  roomId: string,
  message: OutgoinMessage,
  excludeSocket?: WebSocket
) => {
  if (!rooms[roomId]) return;
  const data = JSON.stringify(message);

  rooms[roomId].forEach((client) => {
    if (client.readyState === WebSocket.OPEN && client !== excludeSocket) {
      client.send(data);
    }
  });
};