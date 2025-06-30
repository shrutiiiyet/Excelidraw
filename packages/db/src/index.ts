import { PrismaClient } from "@prisma/client";


// declare global {
//   var client: PrismaClient | undefined;
// }

// const client = global.client ?? new PrismaClient();

// if (process.env.NODE_ENV !== "production") {
//   globalThis.client = client;
// }
const client = new PrismaClient();

export { client };  


import { getUserByEmail, 
  createUser, 
  getUserById
 } from "../src/services/userService";

export { getUserByEmail, createUser, getUserById };

import {
  createRoom,
  getRoomByName,
  getRoomsByUserId,
  getRoomWithUsersById,
  deleteRoom,
  removeUserFromRoom,
  getRoomWithUsers,
  connectUserWithRoom,
  getRoomIfExists,
  getRoomByRoomId
} from "../src/services/roomService";

export {
  createRoom,
  getRoomByName,
  getRoomsByUserId,
  deleteRoom,
  removeUserFromRoom,
  getRoomWithUsersById,
  getRoomWithUsers,
  connectUserWithRoom,
  getRoomIfExists,
  getRoomByRoomId,
};

import {
  createCanvas,
  deleteUserCanvasInRoom,
  getRoomCanvas,
  getCanvasShape,
  deleteCanvasShape,
  updateCanvasShape,
  clearRoomCanvas
} from "../src/services/canvasService";

export {
  deleteUserCanvasInRoom,
  getRoomCanvas,
  createCanvas,
  getCanvasShape,
  deleteCanvasShape,
  updateCanvasShape,
  clearRoomCanvas
};
