import { RequestHandler, Request, Response, NextFunction } from "express";

import status from "../utils/status";
import { AuthMessages } from "../constants/response-messages";
import { RequestWithAuthUserType } from "../types/request";
import userModel from "../models/user/user-model";

const isAdminRoleMiddleware: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reqWithAuthUser = req as RequestWithAuthUserType;
    const isAdminUser = await userModel.findById(reqWithAuthUser.user.userId);

    if (isAdminUser?.role !== "admin") {
      return res.status(status.FORBIDDEN).json({ message: AuthMessages.userNotAdmin });
    }

    return next();
  } catch (err) {
    // return res.status(status.UNAUTHORIZED).json({ message: AuthMessages.unauthorized });
    next(err);
  }
};

export default isAdminRoleMiddleware;
