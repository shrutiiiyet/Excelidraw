import { verifyToken } from "@repo/backend-common/config";
import { logger } from "../utils/logger";

const JWT_SECRET = process.env.JWT_SECRET as string;

interface DecodedToken {
  id: string;
}

export const authenticateWebSocket = (token: string): DecodedToken | null => {
  try {
    if (!token) {
      logger.error("[authenticateWebSocket] No token provided");
      return null;
    }

    const decoded = verifyToken(token, JWT_SECRET) as DecodedToken;

    if (!decoded || !decoded.id) {
      logger.error("[authenticateWebSocket] Invalid token");
      return null;
    }

    logger.info(`[authenticateWebSocket] User authenticated`);
    return decoded;
  } catch (error) {
    logger.error("[authenticateWebSocket] JWT verification failed", error);
    return null;
  }
};
