
import { getUserByEmail, 
  createUser, 
  getUserById
 } from "./src/services/userService";

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
} from "./src/services/roomService";

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
} from "./src/services/canvasService";

export {
  deleteUserCanvasInRoom,
  getRoomCanvas,
  createCanvas,
  getCanvasShape,
  deleteCanvasShape,
  updateCanvasShape,
  clearRoomCanvas
};
