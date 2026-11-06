import dotenv from "dotenv";

dotenv.config();

const getRuntimeUrl = (envKey: string, fallback: string) => {
  const value = process.env[envKey];
  return value && value.trim() ? value.trim() : fallback;
};

export const envSiteUrl = getRuntimeUrl(
  "NEXT_PUBLIC_SITE_URL",
  "http://localhost:3000",
);

export const HTTP_URL = getRuntimeUrl(
  "NEXT_PUBLIC_API_URL",
  "http://localhost:3001",
);

export const WS_URL = getRuntimeUrl(
  "NEXT_PUBLIC_WS_URL",
  "ws://localhost:8080",
);
