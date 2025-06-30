import type { Shape } from "@repo/common/types";
export declare const createCanvas: ({ roomId, userId, design, }: {
    roomId: string;
    userId: string;
    design: Shape;
}) => Promise<{
    id: string;
    createdAt: Date;
    userId: string;
    roomId: string;
    design: import("@prisma/client/runtime/library").JsonValue;
}>;
export declare const deleteUserCanvasInRoom: (roomId: string, userId: string) => Promise<import("@prisma/client").Prisma.BatchPayload | null>;
export declare const clearRoomCanvas: (roomId: string) => Promise<import("@prisma/client").Prisma.BatchPayload | null>;
export declare const getRoomCanvas: (roomId: string) => Promise<{
    id: string;
    createdAt: Date;
    userId: string;
    roomId: string;
    design: import("@prisma/client/runtime/library").JsonValue;
}[]>;
export declare const getCanvasShape: (shapeId: string) => Promise<{
    id: string;
    createdAt: Date;
    userId: string;
    roomId: string;
    design: import("@prisma/client/runtime/library").JsonValue;
} | null>;
export declare const deleteCanvasShape: (shapeId: string) => Promise<{
    id: string;
    createdAt: Date;
    userId: string;
    roomId: string;
    design: import("@prisma/client/runtime/library").JsonValue;
}>;
export declare const updateCanvasShape: (shapeId: string, updateData: Shape) => Promise<{
    id: string;
    createdAt: Date;
    userId: string;
    roomId: string;
    design: import("@prisma/client/runtime/library").JsonValue;
}>;
//# sourceMappingURL=canvasService.d.ts.map