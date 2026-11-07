interface TokenPayload {
    id: string;
}
export declare const generateToken: (id: string) => string;
export declare const decodeToken: (token: string) => TokenPayload | null;
export {};
//# sourceMappingURL=jwt.d.ts.map