import { HTTP_URL } from "@/config";
import axios from "axios";
import { getAuthHeaders } from "./room";

export const getExistingShapes = async (roomId: string) => {
  try {
    const response = await axios.get(
      `${HTTP_URL}/canvas/get-canvas-design/${roomId}`,
      { headers: getAuthHeaders() },
    );

    return response.data.Shapes;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.error || "failed to get canvas shapes",
      );
    }
    throw new Error("Unexpected error occurred while fetching canvas shapes.");
  }
};
