import { WebSocket } from "ws";
export declare const handleRoomEvent: (socket: WebSocket, message: {
    type: string;
    room: string;
}, userId: string) => Promise<void>;
export declare const handleUserDisconnect: (socket: WebSocket, userId: string) => void;
export declare const handleUserLeaveCompletely: (socket: WebSocket, userId: string) => Promise<void>;
export declare const removeUserFromRoom: (socket: WebSocket, room: string, userId: string, removeCanvas: boolean) => Promise<void>;
//# sourceMappingURL=roomHandler.d.ts.map