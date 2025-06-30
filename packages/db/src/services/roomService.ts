import { client } from "../index";

export const createRoom = async (name: string, userId: string) => {
  return await client.room.create({
    data: {
      slug: name,
      adminId: userId,
      users: {
        connect: [{ id: userId }], // Automatically connect the admin as a member
      },
    },
  });
};

export const getRoomByName = async (roomName: string) => {
  return await client.room.findFirst({
    where: {
      slug: roomName,
    },
  });
};

export const getRoomsByUserId = async (userId: string) => {
  return await client.user.findUnique({
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

export const deleteRoom = async (roomId: string) => {
  return await client.room.delete({
    where: { id: roomId },
  });
};

export const removeUserFromRoom = async (roomId: string, userId: string) => {
  return await client.room.update({
    where: { id: roomId },
    data: {
      users: {
        disconnect: [{ id: userId }],
      },
    },
  });
};

export const getRoomWithUsersById = async (roomId: string) => {
  return await client.room.findUnique({
    where: { id: roomId },
    include: {
      users: true, // Get all users in the room
      admin: true, // Get the admin details
    },
  });
};

export const getRoomWithUsers = async (roomId: string) => {
  return await client.room.findUnique({
    where: { id: roomId },
    include: { users: true },
  });
};

export const connectUserWithRoom = async (roomId: string, userId: string) => {
  await client.room.update({
    where: { id: roomId },
    data: { users: { connect: { id: userId } } },
  });
};

export const getRoomIfExists = async (roomId: string) => {
  return await client.room.findUnique({
    where: { id: roomId },
  });
};

export const getRoomByRoomId = async (roomId: string) => {
  return await client.room.findUnique({
    where: { id: roomId },
    include: { users: true },
  });
};