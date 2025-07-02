import {
  createCanvas,
  deleteCanvasShape,
  getCanvasShape,
  updateCanvasShape,
  clearRoomCanvas
  // getRoomIfExists,
} from "@repo/db/services";

import { logger } from "../utils/logger";
import { rooms, broadcastToRoom, isUserInRoom } from "../utils/roomManager";
import { shapeSchema, type CanvasMessage } from "@repo/common/types";
import { WebSocket } from "ws";

export const handleCanvasEvent = async (
  socket: WebSocket,
  message: CanvasMessage,
  userId: string
) => {
  try {
    const { type, room, data, shapeId } = message;

    // Check if the room exists in memory
    if (!room || !rooms[room]) {
      logger.warn(`Canvas event received for non-existent room: ${room}`);
      return;
    }

    // Check if user is in the room
    if (!isUserInRoom(socket, room)) {
      logger.warn(`User ${userId} is not in room ${room}. Ignoring event.`);
      return;
    }

    switch (type) {
      case "canvas:draw": {
        // Validate shape data
        const parsedData = shapeSchema.safeParse(data);
        if (!parsedData.success) {
          logger.warn(
            `Invalid shape data from user ${userId}: ${JSON.stringify(parsedData.error.format())}`
          );
          return;
        }

        const shapeData = parsedData.data;

        try {
          await createCanvas({
            roomId: room,
            userId,
            design: shapeData,
          });

          logger.info(
            `User ${userId} drew a ${shapeData.type} in room ${room}`
          );
          broadcastToRoom(
            room,
            { type: "canvas:draw", userId, data: shapeData },
            socket
          );
        } catch (dbError) {
          logger.error(`Database error while saving shape: ${dbError}`);
          return;
        }
        break;
      }

      case "canvas:clear":
        logger.info(`User ${userId} cleared the canvas in room ${room}`);
        clearRoomCanvas(room);
        broadcastToRoom(
          room,
          {
            type: "canvas:clear",
            message: `User ${userId} cleared the canvas`,
          },
          socket
        );
        break;

      case "canvas:erase":
        try {
          if (!shapeId) {
            logger.warn(
              `User ${userId} attempted to erase without providing a shape ID.`
            );
            return;
          }

          const existingShape = await getCanvasShape(String(shapeId));
          if (!existingShape) {
            logger.warn(`Shape ${shapeId} not found in room ${room}`);
            return;
          }

          await deleteCanvasShape(String(shapeId));
          logger.info(`User ${userId} erased shape ${shapeId} in room ${room}`);

          broadcastToRoom(
            room,
            {
              type: "canvas:erase",
              userId,
              shapeId,
            },
            socket
          );
        } catch (dbError) {
          logger.error(`Database error while erasing shape: ${dbError}`);
        }
        break;

      case "canvas:update": {
        if (!data?.id) {
          logger.warn(`Update event received without a shape ID.`);
          return;
        }

        // Validate shape data
        const parsedData = shapeSchema.safeParse(data);
        if (!parsedData.success) {
          logger.warn(
            `Invalid update data from user ${userId}: ${JSON.stringify(parsedData.error.format())}`
          );
          return;
        }

        try {
          const existingShape = await getCanvasShape(String(data.id));
          if (!existingShape) {
            logger.warn(`Shape ${data.id} not found in room ${room}`);
            return;
          }

          const updatedShape = await updateCanvasShape(String(data.id), data);
          logger.info(
            `User ${userId} updated shape ${data.id} in room ${room}`
          );

          broadcastToRoom(
            room,
            {
              type: "canvas:update",
              userId,
              shapeId: data.id,
              data,
            },
            socket
          );
        } catch (dbError) {
          logger.error(`Database error while updating shape: ${dbError}`);
        }
        break;
      }

      default:
        logger.warn(`Unknown canvas event type: ${type}`);
    }
  } catch (error) {
    logger.error(`Unexpected error handling canvas event: ${error}`);
  }
};