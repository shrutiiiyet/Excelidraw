import { type Request, type Response } from "express";
import type { AuthRequest } from "../utils/request-type";
export declare const signup: (req: Request, res: Response) => Promise<void>;
export declare const signin: (req: Request, res: Response) => Promise<void>;
export declare const me: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=authController.d.ts.map