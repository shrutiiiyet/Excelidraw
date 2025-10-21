import dotenv from "dotenv";

dotenv.config();

export const HTTP_URL = process.env.NEXT_PUBLIC_HTTP_URL;
export const envSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
export const WS_URL = process.env.NEXT_PUBLIC_WS_URL;
