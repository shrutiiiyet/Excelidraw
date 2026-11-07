"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BroadcastMessage = exports.canvasMessageSchema = exports.shapeSchema = exports.shapeOptionsSchema = exports.shapeTypes = void 0;
const zod_1 = require("zod");
/* --------------------- Tool Types --------------------- */
exports.shapeTypes = [
    "Rectangle",
    "Diamond",
    "Ellipse",
    "Arrow",
    "Line",
    "Freehand",
    "Text",
    "Selection",
    "Eraser",
];
/* --------------------- Shape Options --------------------- */
exports.shapeOptionsSchema = zod_1.z.object({
    roughness: zod_1.z.enum(["none", "normal", "high"]),
    strokeStyle: zod_1.z.enum(["solid", "dashed", "dotted"]),
    strokeWidth: zod_1.z.enum(["thin", "medium", "thick"]),
    fillStyle: zod_1.z.enum(["hachure", "solid", "cross-hatch"]),
    fillColor: zod_1.z.string(),
    strokeColor: zod_1.z.string(),
    seed: zod_1.z.number(),
});
/* --------------------- Shape Schema --------------------- */
exports.shapeSchema = zod_1.z.object({
    id: zod_1.z.string(),
    type: zod_1.z.enum(exports.shapeTypes),
    x1: zod_1.z.number(),
    y1: zod_1.z.number(),
    x2: zod_1.z.number(),
    y2: zod_1.z.number(),
    text: zod_1.z.string().optional(),
    rotation: zod_1.z.number().optional(),
    paths: zod_1.z.array(zod_1.z.tuple([zod_1.z.number(), zod_1.z.number()])).optional(),
    pressures: zod_1.z.array(zod_1.z.number()).optional(),
    path: zod_1.z.array(zod_1.z.object({ x: zod_1.z.number(), y: zod_1.z.number() })).optional(),
    options: exports.shapeOptionsSchema,
});
/* --------------------- Incoming Canvas Message (from frontend) --------------------- */
exports.canvasMessageSchema = zod_1.z.object({
    type: zod_1.z.enum([
        "canvas:draw",
        "canvas:clear",
        "canvas:update",
        "canvas:erase",
    ]),
    room: zod_1.z.string(),
    data: exports.shapeSchema.optional(),
    shapeId: zod_1.z.string().optional(),
});
/* --------------------- Broadcast Message (to frontend) --------------------- */
exports.BroadcastMessage = zod_1.z.discriminatedUnion("type", [
    zod_1.z.object({
        type: zod_1.z.literal("canvas:draw"),
        userId: zod_1.z.string(),
        data: exports.shapeSchema,
    }),
    zod_1.z.object({
        type: zod_1.z.literal("canvas:update"),
        userId: zod_1.z.string(),
        shapeId: zod_1.z.string(),
        data: exports.shapeSchema,
    }),
    zod_1.z.object({
        type: zod_1.z.literal("canvas:erase"),
        userId: zod_1.z.string(),
        shapeId: zod_1.z.string(),
    }),
    zod_1.z.object({
        type: zod_1.z.literal("canvas:clear"),
        message: zod_1.z.string(),
    }),
    zod_1.z.object({
        type: zod_1.z.literal("user:connected"),
        message: zod_1.z.string(),
        userId: zod_1.z.string().optional(),
    }),
    zod_1.z.object({
        type: zod_1.z.literal("user:disconnected"),
        message: zod_1.z.string(),
        userId: zod_1.z.string().optional(),
    }),
    zod_1.z.object({
        type: zod_1.z.literal("error"),
        message: zod_1.z.string(),
    }),
]);
