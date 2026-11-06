export const envSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const HTTP_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"
).replace(/\/+$/, "");

export const WS_URL =
  process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8080";