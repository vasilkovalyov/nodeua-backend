import { Request, Response } from "express";

import { getNodeService, getAllNodesService, getNodesByIdArrayService } from "../services/nodes";
import status from "../utils/status";
import ApiError from "../services/api-error";

export async function nodesController(req: Request, res: Response) {
  try {
    const nodes = getAllNodesService();
    return res.status(status.SUCCESS).json(nodes);
  } catch (e) {
    if (!(e instanceof Error)) return;
    return res.status(status.BAD_REQUEST).json({
      error: e.message
    });
  }
}

export async function nodesCartController(req: Request, res: Response) {
  try {
    const ids = req.query.ids as string;
    const nodes = getNodesByIdArrayService(ids.split(","));
    return res.status(status.SUCCESS).json(nodes);
  } catch (e) {
    if (!(e instanceof Error)) return;
    return res.status(status.BAD_REQUEST).json({
      error: e.message
    });
  }
}

export async function nodeController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const node = getNodeService(id);

    return res.status(status.SUCCESS).json(node);
  } catch (e) {
    if (!(e instanceof ApiError)) return;
    return res.status(status.BAD_REQUEST).json({
      error: e.message
    });
  }
}
