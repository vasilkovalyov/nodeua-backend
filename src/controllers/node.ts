import { Request, Response } from "express";

import { getNodeService, getAllNodesService, getNodesForCart } from "../services/node/node-service";
import status from "../utils/status";

import { AuthMessages } from "../constants/response-messages";

export async function getNodesController(req: Request, res: Response) {
  try {
    const nodes = await getAllNodesService();
    res.status(status.SUCCESS).json(nodes);
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
}

export async function getNodesCartController(req: Request, res: Response) {
  try {
    const ids = req.query.ids as string;
    const nodes = await getNodesForCart(ids.split(","));
    res.status(status.SUCCESS).json(nodes);
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
}

export async function getNodeByIdController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const node = await getNodeService(id);

    if (node === null) {
      res.status(status.BAD_REQUEST).json(null);
    } else {
      res.status(status.SUCCESS).json(node);
    }
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
}
