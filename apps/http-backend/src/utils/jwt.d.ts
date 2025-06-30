interface TokenPayload {
    id: string;
}
/**
 * Generate a JWT token for user authentication.
 * @param id - The user ID to encode in the token.
 * @returns The generated JWT token.
 */
export declare const generateToken: (id: string) => string;
/**
 * Decode a JWT token without verifying.
 * @param token - The JWT token to decode.
 * @returns The decoded payload or null if invalid.
 */
export declare const decodeToken: (token: string) => TokenPayload | null;
export {};
//# sourceMappingURL=jwt.d.ts.map