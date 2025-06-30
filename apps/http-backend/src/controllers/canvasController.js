"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCanvasDesigns = void 0;
const httpStatus_1 = require("../utils/httpStatus");
const services_1 = require("@repo/db/services");
const types_1 = require("@repo/common/types");
//  Fetch all designs for a specific room
const getCanvasDesigns = async (req, res) => {
    const userId = req.auth?.id;
    if (!userId) {
        res
            .status(httpStatus_1.HttpStatus.UNAUTHORIZED)
            .json({ success: false, error: "Unauthorized" });
        return;
    }
    const { roomId } = req.params;
    if (!roomId) {
        res
            .status(httpStatus_1.HttpStatus.BAD_REQUEST)
            .json({ success: false, message: "Room ID required" });
        return;
    }
    try {
        const designs = await (0, services_1.getRoomCanvas)(roomId);
        const Shapes = [];
        for (const d of designs) {
            const parsed = types_1.shapeSchema.safeParse(d.design);
            if (parsed.success) {
                Shapes.push(parsed.data);
            }
            else {
                console.warn(`Invalid shape in design ${d.id}`, parsed.error);
            }
        }
        res.json({ success: true, Shapes });
    }
    catch (error) {
        if (error)
            res
                .status(httpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ success: false, error: "Failed to fetch canvas designs" });
    }
};
exports.getCanvasDesigns = getCanvasDesigns;
