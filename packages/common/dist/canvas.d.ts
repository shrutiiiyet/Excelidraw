import { z } from "zod";
export declare const shapeTypes: readonly ["Rectangle", "Diamond", "Ellipse", "Arrow", "Line", "Freehand", "Text", "Selection", "Eraser"];
export type Tool = (typeof shapeTypes)[number];
export declare const shapeOptionsSchema: z.ZodObject<{
    roughness: z.ZodEnum<["none", "normal", "high"]>;
    strokeStyle: z.ZodEnum<["solid", "dashed", "dotted"]>;
    strokeWidth: z.ZodEnum<["thin", "medium", "thick"]>;
    fillStyle: z.ZodEnum<["hachure", "solid", "cross-hatch"]>;
    fillColor: z.ZodString;
    strokeColor: z.ZodString;
    seed: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    roughness: "none" | "normal" | "high";
    strokeStyle: "solid" | "dashed" | "dotted";
    strokeWidth: "thin" | "medium" | "thick";
    fillStyle: "solid" | "hachure" | "cross-hatch";
    fillColor: string;
    strokeColor: string;
    seed: number;
}, {
    roughness: "none" | "normal" | "high";
    strokeStyle: "solid" | "dashed" | "dotted";
    strokeWidth: "thin" | "medium" | "thick";
    fillStyle: "solid" | "hachure" | "cross-hatch";
    fillColor: string;
    strokeColor: string;
    seed: number;
}>;
export type ShapeOptions = z.infer<typeof shapeOptionsSchema>;
export declare const shapeSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodEnum<["Rectangle", "Diamond", "Ellipse", "Arrow", "Line", "Freehand", "Text", "Selection", "Eraser"]>;
    x1: z.ZodNumber;
    y1: z.ZodNumber;
    x2: z.ZodNumber;
    y2: z.ZodNumber;
    text: z.ZodOptional<z.ZodString>;
    rotation: z.ZodOptional<z.ZodNumber>;
    paths: z.ZodOptional<z.ZodArray<z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>, "many">>;
    pressures: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    path: z.ZodOptional<z.ZodArray<z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
    }, {
        x: number;
        y: number;
    }>, "many">>;
    options: z.ZodObject<{
        roughness: z.ZodEnum<["none", "normal", "high"]>;
        strokeStyle: z.ZodEnum<["solid", "dashed", "dotted"]>;
        strokeWidth: z.ZodEnum<["thin", "medium", "thick"]>;
        fillStyle: z.ZodEnum<["hachure", "solid", "cross-hatch"]>;
        fillColor: z.ZodString;
        strokeColor: z.ZodString;
        seed: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        roughness: "none" | "normal" | "high";
        strokeStyle: "solid" | "dashed" | "dotted";
        strokeWidth: "thin" | "medium" | "thick";
        fillStyle: "solid" | "hachure" | "cross-hatch";
        fillColor: string;
        strokeColor: string;
        seed: number;
    }, {
        roughness: "none" | "normal" | "high";
        strokeStyle: "solid" | "dashed" | "dotted";
        strokeWidth: "thin" | "medium" | "thick";
        fillStyle: "solid" | "hachure" | "cross-hatch";
        fillColor: string;
        strokeColor: string;
        seed: number;
    }>;
}, "strip", z.ZodTypeAny, {
    options: {
        roughness: "none" | "normal" | "high";
        strokeStyle: "solid" | "dashed" | "dotted";
        strokeWidth: "thin" | "medium" | "thick";
        fillStyle: "solid" | "hachure" | "cross-hatch";
        fillColor: string;
        strokeColor: string;
        seed: number;
    };
    type: "Rectangle" | "Diamond" | "Ellipse" | "Arrow" | "Line" | "Freehand" | "Text" | "Selection" | "Eraser";
    id: string;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    path?: {
        x: number;
        y: number;
    }[] | undefined;
    text?: string | undefined;
    rotation?: number | undefined;
    paths?: [number, number][] | undefined;
    pressures?: number[] | undefined;
}, {
    options: {
        roughness: "none" | "normal" | "high";
        strokeStyle: "solid" | "dashed" | "dotted";
        strokeWidth: "thin" | "medium" | "thick";
        fillStyle: "solid" | "hachure" | "cross-hatch";
        fillColor: string;
        strokeColor: string;
        seed: number;
    };
    type: "Rectangle" | "Diamond" | "Ellipse" | "Arrow" | "Line" | "Freehand" | "Text" | "Selection" | "Eraser";
    id: string;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    path?: {
        x: number;
        y: number;
    }[] | undefined;
    text?: string | undefined;
    rotation?: number | undefined;
    paths?: [number, number][] | undefined;
    pressures?: number[] | undefined;
}>;
export type Shape = z.infer<typeof shapeSchema>;
export declare const canvasMessageSchema: z.ZodObject<{
    type: z.ZodEnum<["canvas:draw", "canvas:clear", "canvas:update", "canvas:erase"]>;
    room: z.ZodString;
    data: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        type: z.ZodEnum<["Rectangle", "Diamond", "Ellipse", "Arrow", "Line", "Freehand", "Text", "Selection", "Eraser"]>;
        x1: z.ZodNumber;
        y1: z.ZodNumber;
        x2: z.ZodNumber;
        y2: z.ZodNumber;
        text: z.ZodOptional<z.ZodString>;
        rotation: z.ZodOptional<z.ZodNumber>;
        paths: z.ZodOptional<z.ZodArray<z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>, "many">>;
        pressures: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        path: z.ZodOptional<z.ZodArray<z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            x: number;
            y: number;
        }, {
            x: number;
            y: number;
        }>, "many">>;
        options: z.ZodObject<{
            roughness: z.ZodEnum<["none", "normal", "high"]>;
            strokeStyle: z.ZodEnum<["solid", "dashed", "dotted"]>;
            strokeWidth: z.ZodEnum<["thin", "medium", "thick"]>;
            fillStyle: z.ZodEnum<["hachure", "solid", "cross-hatch"]>;
            fillColor: z.ZodString;
            strokeColor: z.ZodString;
            seed: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            roughness: "none" | "normal" | "high";
            strokeStyle: "solid" | "dashed" | "dotted";
            strokeWidth: "thin" | "medium" | "thick";
            fillStyle: "solid" | "hachure" | "cross-hatch";
            fillColor: string;
            strokeColor: string;
            seed: number;
        }, {
            roughness: "none" | "normal" | "high";
            strokeStyle: "solid" | "dashed" | "dotted";
            strokeWidth: "thin" | "medium" | "thick";
            fillStyle: "solid" | "hachure" | "cross-hatch";
            fillColor: string;
            strokeColor: string;
            seed: number;
        }>;
    }, "strip", z.ZodTypeAny, {
        options: {
            roughness: "none" | "normal" | "high";
            strokeStyle: "solid" | "dashed" | "dotted";
            strokeWidth: "thin" | "medium" | "thick";
            fillStyle: "solid" | "hachure" | "cross-hatch";
            fillColor: string;
            strokeColor: string;
            seed: number;
        };
        type: "Rectangle" | "Diamond" | "Ellipse" | "Arrow" | "Line" | "Freehand" | "Text" | "Selection" | "Eraser";
        id: string;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        path?: {
            x: number;
            y: number;
        }[] | undefined;
        text?: string | undefined;
        rotation?: number | undefined;
        paths?: [number, number][] | undefined;
        pressures?: number[] | undefined;
    }, {
        options: {
            roughness: "none" | "normal" | "high";
            strokeStyle: "solid" | "dashed" | "dotted";
            strokeWidth: "thin" | "medium" | "thick";
            fillStyle: "solid" | "hachure" | "cross-hatch";
            fillColor: string;
            strokeColor: string;
            seed: number;
        };
        type: "Rectangle" | "Diamond" | "Ellipse" | "Arrow" | "Line" | "Freehand" | "Text" | "Selection" | "Eraser";
        id: string;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        path?: {
            x: number;
            y: number;
        }[] | undefined;
        text?: string | undefined;
        rotation?: number | undefined;
        paths?: [number, number][] | undefined;
        pressures?: number[] | undefined;
    }>>;
    shapeId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type: "canvas:draw" | "canvas:clear" | "canvas:update" | "canvas:erase";
    room: string;
    data?: {
        options: {
            roughness: "none" | "normal" | "high";
            strokeStyle: "solid" | "dashed" | "dotted";
            strokeWidth: "thin" | "medium" | "thick";
            fillStyle: "solid" | "hachure" | "cross-hatch";
            fillColor: string;
            strokeColor: string;
            seed: number;
        };
        type: "Rectangle" | "Diamond" | "Ellipse" | "Arrow" | "Line" | "Freehand" | "Text" | "Selection" | "Eraser";
        id: string;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        path?: {
            x: number;
            y: number;
        }[] | undefined;
        text?: string | undefined;
        rotation?: number | undefined;
        paths?: [number, number][] | undefined;
        pressures?: number[] | undefined;
    } | undefined;
    shapeId?: string | undefined;
}, {
    type: "canvas:draw" | "canvas:clear" | "canvas:update" | "canvas:erase";
    room: string;
    data?: {
        options: {
            roughness: "none" | "normal" | "high";
            strokeStyle: "solid" | "dashed" | "dotted";
            strokeWidth: "thin" | "medium" | "thick";
            fillStyle: "solid" | "hachure" | "cross-hatch";
            fillColor: string;
            strokeColor: string;
            seed: number;
        };
        type: "Rectangle" | "Diamond" | "Ellipse" | "Arrow" | "Line" | "Freehand" | "Text" | "Selection" | "Eraser";
        id: string;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        path?: {
            x: number;
            y: number;
        }[] | undefined;
        text?: string | undefined;
        rotation?: number | undefined;
        paths?: [number, number][] | undefined;
        pressures?: number[] | undefined;
    } | undefined;
    shapeId?: string | undefined;
}>;
export type CanvasMessage = z.infer<typeof canvasMessageSchema>;
export declare const BroadcastMessage: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    type: z.ZodLiteral<"canvas:draw">;
    userId: z.ZodString;
    data: z.ZodObject<{
        id: z.ZodString;
        type: z.ZodEnum<["Rectangle", "Diamond", "Ellipse", "Arrow", "Line", "Freehand", "Text", "Selection", "Eraser"]>;
        x1: z.ZodNumber;
        y1: z.ZodNumber;
        x2: z.ZodNumber;
        y2: z.ZodNumber;
        text: z.ZodOptional<z.ZodString>;
        rotation: z.ZodOptional<z.ZodNumber>;
        paths: z.ZodOptional<z.ZodArray<z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>, "many">>;
        pressures: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        path: z.ZodOptional<z.ZodArray<z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            x: number;
            y: number;
        }, {
            x: number;
            y: number;
        }>, "many">>;
        options: z.ZodObject<{
            roughness: z.ZodEnum<["none", "normal", "high"]>;
            strokeStyle: z.ZodEnum<["solid", "dashed", "dotted"]>;
            strokeWidth: z.ZodEnum<["thin", "medium", "thick"]>;
            fillStyle: z.ZodEnum<["hachure", "solid", "cross-hatch"]>;
            fillColor: z.ZodString;
            strokeColor: z.ZodString;
            seed: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            roughness: "none" | "normal" | "high";
            strokeStyle: "solid" | "dashed" | "dotted";
            strokeWidth: "thin" | "medium" | "thick";
            fillStyle: "solid" | "hachure" | "cross-hatch";
            fillColor: string;
            strokeColor: string;
            seed: number;
        }, {
            roughness: "none" | "normal" | "high";
            strokeStyle: "solid" | "dashed" | "dotted";
            strokeWidth: "thin" | "medium" | "thick";
            fillStyle: "solid" | "hachure" | "cross-hatch";
            fillColor: string;
            strokeColor: string;
            seed: number;
        }>;
    }, "strip", z.ZodTypeAny, {
        options: {
            roughness: "none" | "normal" | "high";
            strokeStyle: "solid" | "dashed" | "dotted";
            strokeWidth: "thin" | "medium" | "thick";
            fillStyle: "solid" | "hachure" | "cross-hatch";
            fillColor: string;
            strokeColor: string;
            seed: number;
        };
        type: "Rectangle" | "Diamond" | "Ellipse" | "Arrow" | "Line" | "Freehand" | "Text" | "Selection" | "Eraser";
        id: string;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        path?: {
            x: number;
            y: number;
        }[] | undefined;
        text?: string | undefined;
        rotation?: number | undefined;
        paths?: [number, number][] | undefined;
        pressures?: number[] | undefined;
    }, {
        options: {
            roughness: "none" | "normal" | "high";
            strokeStyle: "solid" | "dashed" | "dotted";
            strokeWidth: "thin" | "medium" | "thick";
            fillStyle: "solid" | "hachure" | "cross-hatch";
            fillColor: string;
            strokeColor: string;
            seed: number;
        };
        type: "Rectangle" | "Diamond" | "Ellipse" | "Arrow" | "Line" | "Freehand" | "Text" | "Selection" | "Eraser";
        id: string;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        path?: {
            x: number;
            y: number;
        }[] | undefined;
        text?: string | undefined;
        rotation?: number | undefined;
        paths?: [number, number][] | undefined;
        pressures?: number[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "canvas:draw";
    data: {
        options: {
            roughness: "none" | "normal" | "high";
            strokeStyle: "solid" | "dashed" | "dotted";
            strokeWidth: "thin" | "medium" | "thick";
            fillStyle: "solid" | "hachure" | "cross-hatch";
            fillColor: string;
            strokeColor: string;
            seed: number;
        };
        type: "Rectangle" | "Diamond" | "Ellipse" | "Arrow" | "Line" | "Freehand" | "Text" | "Selection" | "Eraser";
        id: string;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        path?: {
            x: number;
            y: number;
        }[] | undefined;
        text?: string | undefined;
        rotation?: number | undefined;
        paths?: [number, number][] | undefined;
        pressures?: number[] | undefined;
    };
    userId: string;
}, {
    type: "canvas:draw";
    data: {
        options: {
            roughness: "none" | "normal" | "high";
            strokeStyle: "solid" | "dashed" | "dotted";
            strokeWidth: "thin" | "medium" | "thick";
            fillStyle: "solid" | "hachure" | "cross-hatch";
            fillColor: string;
            strokeColor: string;
            seed: number;
        };
        type: "Rectangle" | "Diamond" | "Ellipse" | "Arrow" | "Line" | "Freehand" | "Text" | "Selection" | "Eraser";
        id: string;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        path?: {
            x: number;
            y: number;
        }[] | undefined;
        text?: string | undefined;
        rotation?: number | undefined;
        paths?: [number, number][] | undefined;
        pressures?: number[] | undefined;
    };
    userId: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"canvas:update">;
    userId: z.ZodString;
    shapeId: z.ZodString;
    data: z.ZodObject<{
        id: z.ZodString;
        type: z.ZodEnum<["Rectangle", "Diamond", "Ellipse", "Arrow", "Line", "Freehand", "Text", "Selection", "Eraser"]>;
        x1: z.ZodNumber;
        y1: z.ZodNumber;
        x2: z.ZodNumber;
        y2: z.ZodNumber;
        text: z.ZodOptional<z.ZodString>;
        rotation: z.ZodOptional<z.ZodNumber>;
        paths: z.ZodOptional<z.ZodArray<z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>, "many">>;
        pressures: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        path: z.ZodOptional<z.ZodArray<z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            x: number;
            y: number;
        }, {
            x: number;
            y: number;
        }>, "many">>;
        options: z.ZodObject<{
            roughness: z.ZodEnum<["none", "normal", "high"]>;
            strokeStyle: z.ZodEnum<["solid", "dashed", "dotted"]>;
            strokeWidth: z.ZodEnum<["thin", "medium", "thick"]>;
            fillStyle: z.ZodEnum<["hachure", "solid", "cross-hatch"]>;
            fillColor: z.ZodString;
            strokeColor: z.ZodString;
            seed: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            roughness: "none" | "normal" | "high";
            strokeStyle: "solid" | "dashed" | "dotted";
            strokeWidth: "thin" | "medium" | "thick";
            fillStyle: "solid" | "hachure" | "cross-hatch";
            fillColor: string;
            strokeColor: string;
            seed: number;
        }, {
            roughness: "none" | "normal" | "high";
            strokeStyle: "solid" | "dashed" | "dotted";
            strokeWidth: "thin" | "medium" | "thick";
            fillStyle: "solid" | "hachure" | "cross-hatch";
            fillColor: string;
            strokeColor: string;
            seed: number;
        }>;
    }, "strip", z.ZodTypeAny, {
        options: {
            roughness: "none" | "normal" | "high";
            strokeStyle: "solid" | "dashed" | "dotted";
            strokeWidth: "thin" | "medium" | "thick";
            fillStyle: "solid" | "hachure" | "cross-hatch";
            fillColor: string;
            strokeColor: string;
            seed: number;
        };
        type: "Rectangle" | "Diamond" | "Ellipse" | "Arrow" | "Line" | "Freehand" | "Text" | "Selection" | "Eraser";
        id: string;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        path?: {
            x: number;
            y: number;
        }[] | undefined;
        text?: string | undefined;
        rotation?: number | undefined;
        paths?: [number, number][] | undefined;
        pressures?: number[] | undefined;
    }, {
        options: {
            roughness: "none" | "normal" | "high";
            strokeStyle: "solid" | "dashed" | "dotted";
            strokeWidth: "thin" | "medium" | "thick";
            fillStyle: "solid" | "hachure" | "cross-hatch";
            fillColor: string;
            strokeColor: string;
            seed: number;
        };
        type: "Rectangle" | "Diamond" | "Ellipse" | "Arrow" | "Line" | "Freehand" | "Text" | "Selection" | "Eraser";
        id: string;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        path?: {
            x: number;
            y: number;
        }[] | undefined;
        text?: string | undefined;
        rotation?: number | undefined;
        paths?: [number, number][] | undefined;
        pressures?: number[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "canvas:update";
    data: {
        options: {
            roughness: "none" | "normal" | "high";
            strokeStyle: "solid" | "dashed" | "dotted";
            strokeWidth: "thin" | "medium" | "thick";
            fillStyle: "solid" | "hachure" | "cross-hatch";
            fillColor: string;
            strokeColor: string;
            seed: number;
        };
        type: "Rectangle" | "Diamond" | "Ellipse" | "Arrow" | "Line" | "Freehand" | "Text" | "Selection" | "Eraser";
        id: string;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        path?: {
            x: number;
            y: number;
        }[] | undefined;
        text?: string | undefined;
        rotation?: number | undefined;
        paths?: [number, number][] | undefined;
        pressures?: number[] | undefined;
    };
    shapeId: string;
    userId: string;
}, {
    type: "canvas:update";
    data: {
        options: {
            roughness: "none" | "normal" | "high";
            strokeStyle: "solid" | "dashed" | "dotted";
            strokeWidth: "thin" | "medium" | "thick";
            fillStyle: "solid" | "hachure" | "cross-hatch";
            fillColor: string;
            strokeColor: string;
            seed: number;
        };
        type: "Rectangle" | "Diamond" | "Ellipse" | "Arrow" | "Line" | "Freehand" | "Text" | "Selection" | "Eraser";
        id: string;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        path?: {
            x: number;
            y: number;
        }[] | undefined;
        text?: string | undefined;
        rotation?: number | undefined;
        paths?: [number, number][] | undefined;
        pressures?: number[] | undefined;
    };
    shapeId: string;
    userId: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"canvas:erase">;
    userId: z.ZodString;
    shapeId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "canvas:erase";
    shapeId: string;
    userId: string;
}, {
    type: "canvas:erase";
    shapeId: string;
    userId: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"canvas:clear">;
    message: z.ZodString;
}, "strip", z.ZodTypeAny, {
    message: string;
    type: "canvas:clear";
}, {
    message: string;
    type: "canvas:clear";
}>, z.ZodObject<{
    type: z.ZodLiteral<"user:connected">;
    message: z.ZodString;
    userId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    message: string;
    type: "user:connected";
    userId?: string | undefined;
}, {
    message: string;
    type: "user:connected";
    userId?: string | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"user:disconnected">;
    message: z.ZodString;
    userId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    message: string;
    type: "user:disconnected";
    userId?: string | undefined;
}, {
    message: string;
    type: "user:disconnected";
    userId?: string | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"error">;
    message: z.ZodString;
}, "strip", z.ZodTypeAny, {
    message: string;
    type: "error";
}, {
    message: string;
    type: "error";
}>]>;
export type OutgoinMessage = z.infer<typeof BroadcastMessage>;
export type IncomingMessage = z.infer<typeof BroadcastMessage>;
//# sourceMappingURL=canvas.d.ts.map