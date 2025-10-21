import { z } from "zod";

/* --------------------- Tool Types --------------------- */
export const shapeTypes = [
  "Rectangle",
  "Diamond",
  "Ellipse",
  "Arrow",
  "Line",
  "Freehand",
  "Text",
  "Selection",
  "Eraser",
] as const;

export type Tool = (typeof shapeTypes)[number];

/* --------------------- Shape Options --------------------- */
export const shapeOptionsSchema = z.object({
  roughness: z.enum(["none", "normal", "high"]),
  strokeStyle: z.enum(["solid", "dashed", "dotted"]),
  strokeWidth: z.enum(["thin", "medium", "thick"]),
  fillStyle: z.enum(["hachure", "solid", "cross-hatch"]),
  fillColor: z.string(),
  strokeColor: z.string(),
  seed: z.number(),
});

export type ShapeOptions = z.infer<typeof shapeOptionsSchema>;

/* --------------------- Shape Schema --------------------- */
export const shapeSchema = z.object({
  id: z.string(),
  type: z.enum(shapeTypes),
  x1: z.number(),
  y1: z.number(),
  x2: z.number(),
  y2: z.number(),
  text: z.string().optional(),
  rotation: z.number().optional(),
  paths: z.array(z.tuple([z.number(), z.number()])).optional(),
  pressures: z.array(z.number()).optional(),
  path: z.array(z.object({ x: z.number(), y: z.number() })).optional(),
  options: shapeOptionsSchema,
});

export type Shape = z.infer<typeof shapeSchema>;

/* --------------------- Incoming Canvas Message (from frontend) --------------------- */
export const canvasMessageSchema = z.object({
  type: z.enum([
    "canvas:draw",
    "canvas:clear",
    "canvas:update",
    "canvas:erase",
  ]),
  room: z.string(),
  data: shapeSchema.optional(),
  shapeId: z.string().optional(),
});

export type CanvasMessage = z.infer<typeof canvasMessageSchema>;

/* --------------------- Broadcast Message (to frontend) --------------------- */

export const BroadcastMessage = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("canvas:draw"),
    userId: z.string(),
    data: shapeSchema,
  }),
  z.object({
    type: z.literal("canvas:update"),
    userId: z.string(),
    shapeId: z.string(),
    data: shapeSchema,
  }),
  z.object({
    type: z.literal("canvas:erase"),
    userId: z.string(),
    shapeId: z.string(),
  }),
  z.object({
    type: z.literal("canvas:clear"),
    message: z.string(),
  }),
  z.object({
    type: z.literal("user:connected"),
    message: z.string(),
    userId: z.string().optional(),
  }),
  z.object({
    type: z.literal("user:disconnected"),
    message: z.string(),
    userId: z.string().optional(),
  }),
  z.object({
    type: z.literal("error"),
    message: z.string(),
  }),
]);

export type OutgoinMessage = z.infer<typeof BroadcastMessage>;
export type IncomingMessage = z.infer<typeof BroadcastMessage>;
