import type { OutgoinMessage } from "@repo/common/types";
import { WebSocket } from "ws";
interface Rooms {
    [roomId: string]: Set<WebSocket>;
}
export declare const rooms: Rooms;
export declare const addUserToRoom: (socket: WebSocket, roomId: string) => void;
export declare const removeUser: (socket: WebSocket, roomId: string) => void;
export declare const getUsersInRoom: (roomId: string) => WebSocket[];
export declare const isUserInRoom: (socket: WebSocket, roomId: string) => boolean;
export declare const broadcastToRoom: (roomId: string, message: OutgoinMessage, excludeSocket?: WebSocket) => void;
export {};
//# sourceMappingURL=roomManager.d.ts.map