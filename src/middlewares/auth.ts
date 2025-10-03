import { Response, NextFunction } from "express";
import { validateToken } from "../services/token";
import { TokenDataType, RequestWithAuthUserType } from "../types/token";
import status from "../utils/status";
import { AuthMessages } from "../constants/response-messages";

export default async function (req: RequestWithAuthUserType, res: Response, next: NextFunction) {
  try {
    const headerToken = req.headers.authorization;
    if (!headerToken) {
      return res.status(status.UNAUTHORIZED).json({ message: AuthMessages.unauthorized });
    }
    const token = headerToken.split("Bearer ")[1];
    const userData = await validateToken(token);
    if (!userData) {
      return res.status(status.BAD_REQUEST).json({ message: AuthMessages.destroyedToken });
    }
    req.user = userData as TokenDataType;
    return next();
  } catch (err) {
    console.log(err);
    return res.status(status.UNAUTHORIZED).json({ message: AuthMessages.unauthorized });
  }
}
