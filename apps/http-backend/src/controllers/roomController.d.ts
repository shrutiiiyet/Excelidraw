import type { Response } from "express";
import type { AuthRequest } from "../utils/request-type";
export declare const CreateRoom: (req: AuthRequest, res: Response) => Promise<void>;
export declare const joinRoom: (req: AuthRequest, res: Response) => Promise<void>;
export declare const VerifyUserInRoom: (req: AuthRequest, res: Response) => Promise<void>;
export declare const leaveRoom: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getRooms: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=roomController.d.ts.map