
import type { Response } from "express";
import { HttpStatus } from "../utils/httpStatus";
import type { AuthRequest } from "../utils/request-type";
import { getRoomCanvas } from "@repo/db/services";
import { shapeSchema, type Shape } from "@repo/common/types";

//  Fetch all designs for a specific room
export const getCanvasDesigns = async (req: AuthRequest, res: Response) => {
  const userId = req.auth?.id;
  if (!userId) {
    res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ success: false, error: "Unauthorized" });
    return;
  }

  const { roomId } = req.params;
  if (!roomId) {
    res
      .status(HttpStatus.BAD_REQUEST)
      .json({ success: false, message: "Room ID required" });
    return;
  }

  try {
    const designs = await getRoomCanvas(roomId);

    const Shapes: Shape[] = [];

    for (const d of designs) {
      const parsed = shapeSchema.safeParse(d.design);
      if (parsed.success) {
        Shapes.push(parsed.data);
      } else {
        console.warn(`Invalid shape in design ${d.id}`, parsed.error);
      }
    }

    res.json({ success: true, Shapes });
  } catch (error) {
    if (error)
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ success: false, error: "Failed to fetch canvas designs" });
  }
};
