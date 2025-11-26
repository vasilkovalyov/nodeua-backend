import { RequestHandler, Request, Response, NextFunction } from "express";
import { validateToken } from "../services/token/token-service";
import { UserMiddlewareAuthParams } from "../types/request";
import status from "../utils/status";
import { AuthMessages } from "../constants/response-messages";

const isAuthUserMiddleware: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.cookies.token;

    if (!accessToken) {
      res.status(status.UNAUTHORIZED).json({ message: AuthMessages.unauthorized });
      return;
    }

    const userData = await validateToken(accessToken);

    if (!userData) {
      res.status(status.BAD_REQUEST).json({ message: AuthMessages.destroyedToken });
      return;
    }

    const tokenData: UserMiddlewareAuthParams = {
      userId: userData.userId
    };

    req.user = tokenData;

    next();
  } catch {
    res.status(status.UNAUTHORIZED).json({ message: AuthMessages.destroyedToken });
  }
};

export default isAuthUserMiddleware;
