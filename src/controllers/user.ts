import { RequestHandler, Response, Request } from "express";
import status from "../utils/status";
import { buyNodeService, getActiveNodesService, getExpiredNodesService } from "../services/user/user-service";
import { RequestWithAuthUserType } from "../types/request";

export const paymentNodeController: RequestHandler = async (req: Request, res: Response) => {
  try {
    const reqWithAuthUser = req as RequestWithAuthUserType;
    const { nodes } = req.body;

    const response = await buyNodeService(reqWithAuthUser.user.userId, nodes);
    res.status(status.SUCCESS).json(response);
  } catch (e) {
    if (!(e instanceof Error)) return;
    res.status(status.BAD_REQUEST).json({
      message: e.message
    });
  }
};

export const getActiveNodesController: RequestHandler = async (req: Request, res: Response) => {
  try {
    const reqWithAuthUser = req as RequestWithAuthUserType;
    const response = await getActiveNodesService(reqWithAuthUser.user.userId);
    return res.status(status.SUCCESS).json(response);
  } catch (e) {
    if (!(e instanceof Error)) return;
    return res.status(status.BAD_REQUEST).json({
      message: e.message
    });
  }
};

export const getExpiredNodesController: RequestHandler = async (req: Request, res: Response) => {
  try {
    const reqWithAuthUser = req as RequestWithAuthUserType;
    const response = await getExpiredNodesService(reqWithAuthUser.user.userId);
    return res.status(status.SUCCESS).json(response);
  } catch (e) {
    if (!(e instanceof Error)) return;
    return res.status(status.BAD_REQUEST).json({
      message: e.message
    });
  }
};
