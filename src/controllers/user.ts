import { RequestHandler, Response, Request } from "express";
import status from "../utils/status";
import {
  buyNodeService,
  getActiveNodesService,
  getExpiredNodesService,
  profileService
} from "../services/user/user-service";
import { RequestWithAuthUserType } from "../types/request";
import { AuthMessages } from "../constants/response-messages";

export const profileController: RequestHandler = async (req: Request, res: Response) => {
  try {
    const reqWithAuthUser = req as RequestWithAuthUserType;
    const userId = reqWithAuthUser.user.userId;
    const response = await profileService(userId);
    console.log("response", response);
    res.status(status.SUCCESS).json(response);
  } catch (e) {
    if (e instanceof Error) {
      res.status(status.BAD_REQUEST).json({
        message: e.message
      });
    }

    res.status(status.BAD_REQUEST).json({
      message: AuthMessages.errorResponse
    });
  }
};

export const paymentNodeController: RequestHandler = async (req: Request, res: Response) => {
  try {
    const reqWithAuthUser = req as RequestWithAuthUserType;
    const { nodes } = req.body;

    const response = await buyNodeService(reqWithAuthUser.user.userId, nodes);
    res.status(status.SUCCESS).json(response);
  } catch (e) {
    if (e instanceof Error) {
      res.status(status.BAD_REQUEST).json({
        message: e.message
      });
    }

    res.status(status.BAD_REQUEST).json({
      message: AuthMessages.errorResponse
    });
  }
};

export const getActiveNodesController: RequestHandler = async (req: Request, res: Response) => {
  try {
    const reqWithAuthUser = req as RequestWithAuthUserType;
    const response = await getActiveNodesService(reqWithAuthUser.user.userId);
    res.status(status.SUCCESS).json(response);
  } catch (e) {
    if (e instanceof Error) {
      res.status(status.BAD_REQUEST).json({
        message: e.message
      });
    }

    res.status(status.BAD_REQUEST).json({
      message: AuthMessages.errorResponse
    });
  }
};

export const getExpiredNodesController: RequestHandler = async (req: Request, res: Response) => {
  try {
    const reqWithAuthUser = req as RequestWithAuthUserType;
    const response = await getExpiredNodesService(reqWithAuthUser.user.userId);
    res.status(status.SUCCESS).json(response);
  } catch (e) {
    if (e instanceof Error) {
      res.status(status.BAD_REQUEST).json({
        message: e.message
      });
    }
    res.status(status.BAD_REQUEST).json({
      message: AuthMessages.errorResponse
    });
  }
};
