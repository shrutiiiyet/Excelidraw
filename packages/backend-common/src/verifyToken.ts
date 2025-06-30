import jwt from "jsonwebtoken";

interface TokenPayload {
  id: string;
}

/**
 * Verify a JWT token and return the decoded payload.
 * @param token - The JWT token to verify.
 * @returns The decoded payload or null if verification fails.
 */

export const verifyToken = (
  token: string,
  JWT_SECRET: string
): TokenPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
};