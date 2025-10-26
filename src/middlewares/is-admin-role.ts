import { Response, NextFunction } from "express";

import status from "../utils/status";
import { AuthMessages } from "../constants/response-messages";
import { RequestWithAuthUserType } from "../types/token";
import userModel from "../models/user/user-model";

export default async function (req: RequestWithAuthUserType, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.userId;

    const isAdminUser = await userModel.findById(userId);

    if (isAdminUser?.role !== "admin") {
      return res.status(status.FORBIDDEN).json({ message: AuthMessages.userNotAdmin });
    }

    return next();
  } catch (err) {
    console.log(err);
    return res.status(status.UNAUTHORIZED).json({ message: AuthMessages.unauthorized });
  }
}
