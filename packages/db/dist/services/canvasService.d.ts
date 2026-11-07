export declare const createCanvas: ({ roomId, userId, design, }: {
    roomId: string;
    userId: string;
    design: any;
}) => Promise<{
    id: string;
    createdAt: Date;
    roomId: string;
    userId: string;
    design: import("../../generated/prisma/runtime/library").JsonValue;
}>;
export declare const deleteUserCanvasInRoom: (roomId: string, userId: string) => Promise<import("../../generated/prisma").Prisma.BatchPayload | null>;
export declare const clearRoomCanvas: (roomId: string) => Promise<import("../../generated/prisma").Prisma.BatchPayload | null>;
export declare const getRoomCanvas: (roomId: string) => Promise<{
    id: string;
    createdAt: Date;
    roomId: string;
    userId: string;
    design: import("../../generated/prisma/runtime/library").JsonValue;
}[]>;
export declare const getCanvasShape: (shapeId: string) => Promise<{
    id: string;
    createdAt: Date;
    roomId: string;
    userId: string;
    design: import("../../generated/prisma/runtime/library").JsonValue;
} | null>;
export declare const deleteCanvasShape: (shapeId: string) => Promise<{
    id: string;
    createdAt: Date;
    roomId: string;
    userId: string;
    design: import("../../generated/prisma/runtime/library").JsonValue;
}>;
export declare const updateCanvasShape: (shapeId: string, updateData: any) => Promise<{
    id: string;
    createdAt: Date;
    roomId: string;
    userId: string;
    design: import("../../generated/prisma/runtime/library").JsonValue;
}>;
//# sourceMappingURL=canvasService.d.ts.map