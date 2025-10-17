import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

interface TokenPayload {
  id: string;
}

export const generateToken = (id: string): string => {
  return jwt.sign({ id }, JWT_SECRET as string, { expiresIn: "1d" });
};

export const decodeToken = (token: string): TokenPayload | null => {
  try {
    return jwt.decode(token) as TokenPayload;
  } catch (error) {
    return null;
  }
};