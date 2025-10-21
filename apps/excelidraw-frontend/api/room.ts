import axios from "axios";

export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Unauthorized: No auth token found.");

  return { Authorization: token };
};

// Create Room
export const createRoom = async (name: string) => {
  try {
    const response = await axios.post(
      'http://localhost:3000/room/create-room',
      { roomName: name },
      { headers: getAuthHeaders() },
    );

    await new Promise((resolve) => setTimeout(resolve, 3000));
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Room creation failed.");
    }
    throw new Error("Unexpected error occurred while creating the room.");
  }
};

// Join Room
export const joinRoom = async (roomId: string) => {
  try {
    const response = await axios.post(
      'http://localhost:3000/room/join-room',
      { roomId },
      { headers: getAuthHeaders() },
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Failed to join room.");
    }
    throw new Error("Unexpected error occurred while joining the room.");
  }
};

// Delete or Leave Room
export const deleteLeaveRoom = async (roomId: string) => {
  try {
    const response = await axios.post(
      'http://localhost:3000/room/leave-or-delete',
      { roomId },
      { headers: getAuthHeaders() },
    );

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.error || "Failed to leave/delete the room.",
      );
    }
    throw new Error(
      "Unexpected error occurred while leaving/deleting the room.",
    );
  }
};

// Get Rooms
export const getRooms = async () => {
  try {
    const response = await axios.get('http://localhost:3000/room/rooms', {
      headers: getAuthHeaders(),
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return response.data;
  } catch (error: unknown) {
    // console.error('Error fetching rooms:', error);

    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        console.warn("Unauthorized! Redirecting to login...");
      }
      throw new Error(error.response?.data?.error || "Failed to fetch rooms.");
    }

    throw new Error("Unexpected error occurred while fetching rooms.");
  }
};

// Get Rooms
export const verifyUserInRoom = async (roomId: string) => {
  try {
    const response = await axios.post(
      'http://localhost:3000/room/verify',
      { roomId },
      { headers: getAuthHeaders() },
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        console.warn("Unauthorized! Redirecting to login...");
      }
      throw new Error(error.response?.data?.error || "Failed to fetch rooms.");
    }

    throw new Error("Unexpected error occurred while fetching rooms.");
  }
};
