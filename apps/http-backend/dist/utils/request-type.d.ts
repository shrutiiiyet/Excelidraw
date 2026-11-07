import type { Request } from "express";
export type AuthRequest = Request<{
    roomId: string;
}> & {
    auth?: {
        id: string;
    };
};
//# sourceMappingURL=request-type.d.ts.map