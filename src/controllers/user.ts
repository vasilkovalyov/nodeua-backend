import { Response } from "express";
import status from "../utils/status";
import {
  topUpUserBalanceService,
  paymentNodeService,
  getActiveNodesService,
  getExpiredNodesService
} from "../services/user/user-service";
import { RequestWithAuthUserType } from "../types/token";
import { AuthMessages } from "../constants/response-messages";
import ApiError from "../services/api-error";

export async function topUpBalanceController(req: RequestWithAuthUserType, res: Response) {
  try {
    const { amount } = req.body;
    if (!req.user?.userId) {
      throw ApiError.BadRequestError(AuthMessages.userNotFound);
    }
    const response = await topUpUserBalanceService(req.user.userId, amount);
    return res.status(status.SUCCESS).json(response);
  } catch (e) {
    if (!(e instanceof Error)) return;
    return res.status(status.BAD_REQUEST).json({
      message: e.message
    });
  }
}

export async function paymentNodeController(req: RequestWithAuthUserType, res: Response) {
  try {
    const { nodes } = req.body;
    if (!req.user?.userId) {
      throw ApiError.BadRequestError(AuthMessages.userNotFound);
    }
    const response = await paymentNodeService(req.user.userId, nodes);
    return res.status(status.SUCCESS).json(response);
  } catch (e) {
    if (!(e instanceof Error)) return;
    return res.status(status.BAD_REQUEST).json({
      message: e.message
    });
  }
}

export async function getActiveNodesController(req: RequestWithAuthUserType, res: Response) {
  try {
    if (!req.user?.userId) {
      throw ApiError.BadRequestError(AuthMessages.userNotFound);
    }
    const response = await getActiveNodesService(req.user.userId);
    return res.status(status.SUCCESS).json(response);
  } catch (e) {
    if (!(e instanceof Error)) return;
    return res.status(status.BAD_REQUEST).json({
      message: e.message
    });
  }
}

export async function getExpiredNodesController(req: RequestWithAuthUserType, res: Response) {
  try {
    if (!req.user?.userId) {
      throw ApiError.BadRequestError(AuthMessages.userNotFound);
    }
    const response = await getExpiredNodesService(req.user.userId);
    return res.status(status.SUCCESS).json(response);
  } catch (e) {
    if (!(e instanceof Error)) return;
    return res.status(status.BAD_REQUEST).json({
      message: e.message
    });
  }
}
