interface TokenPayload {
    id: string;
}
/**
 * Verify a JWT token and return the decoded payload.
 * @param token - The JWT token to verify.
 * @returns The decoded payload or null if verification fails.
 */
export declare const verifyToken: (token: string, JWT_SECRET: string) => TokenPayload | null;
export {};
//# sourceMappingURL=verifyToken.d.ts.map