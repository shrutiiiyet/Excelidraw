import dotenv from "dotenv";

dotenv.config();

export const HTTP_PORT = process.env.PORT || 3008;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
export const JWT_SECRET = process.env.JWT_SECRET;
export const FRONTEND_URL = process.env.FRONTEND_URL;
