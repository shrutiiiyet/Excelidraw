import { type Shape } from "@repo/common/types";
import { client } from "../index"

export const createCanvas = async ({
  roomId,
  userId,
  design,
}: {
  roomId: string;
  userId: string;
  design: any;
}) => {
  return await client.canvas.create({
    data: {
      id: String(design.id),
      roomId,
      userId,
      design,
    },
  });
};

export const deleteUserCanvasInRoom = async (
  roomId: string,
  userId: string
) => {
  const existingCanvas = await client.canvas.findFirst({
    where: { roomId: roomId, userId },
  });

  if (!existingCanvas) {
    return null;
  }

  return await client.canvas.deleteMany({ where: { roomId: roomId, userId } });
};

export const clearRoomCanvas = async (roomId: string) => {
  const existingCanvas = await client.canvas.findMany({
    where: { roomId },
  });

  if (existingCanvas.length === 0) {
    return null;
  }

  return await client.canvas.deleteMany({
    where: { roomId },
  });
};

export const getRoomCanvas = async (roomId: string) => {
  return await client.canvas.findMany({
    where: { roomId },
    take: 50,
    orderBy: { createdAt: "desc" },
  });
};

export const getCanvasShape = async (shapeId: string) => {
  return await client.canvas.findUnique({
    where: { id: shapeId },
  });
};

export const deleteCanvasShape = async (shapeId: string) => {
  return await client.canvas.delete({
    where: { id: shapeId },
  });
};

export const updateCanvasShape = async (shapeId: string, updateData: any) => {
  return await client.canvas.update({
    where: { id: shapeId },
    data: {
      design: updateData,
    },
  });
};