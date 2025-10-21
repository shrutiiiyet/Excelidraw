import dotenv from "dotenv";

dotenv.config();

export const HTTP_URL = process.env.HTTP_URL || 'http://localhost:3001';
export const envSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
export const WS_URL = process.env.WS_URL;
