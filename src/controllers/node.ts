import { Request, Response } from "express";

import {
  getNodeService,
  getAllNodesService,
  getNodesForCart,
  createNodeService,
  updateNodeService,
  getAllNodesForAdminService,
  getNodeForAdminService
} from "../services/node/node-service";
import status from "../utils/status";

import ApiError from "../services/api-error";
import { CreateNodeProps, UpdateNodeProps } from "../models/node/node-model-type";
import { getAllUsersForAdmin } from "../services/user/user-service";

export async function nodesController(req: Request, res: Response) {
  try {
    const nodes = await getAllNodesService();
    return res.status(status.SUCCESS).json(nodes);
  } catch (e) {
    if (!(e instanceof Error)) return;
    return res.status(status.BAD_REQUEST).json({
      message: e.message
    });
  }
}

export async function adminNodesController(req: Request, res: Response) {
  try {
    const nodes = await getAllNodesForAdminService();
    return res.status(status.SUCCESS).json(nodes);
  } catch (e) {
    if (!(e instanceof Error)) return;
    return res.status(status.BAD_REQUEST).json({
      message: e.message
    });
  }
}

export async function adminNodeController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const nodes = await getNodeForAdminService(id);
    return res.status(status.SUCCESS).json(nodes);
  } catch (e) {
    if (!(e instanceof Error)) return;
    return res.status(status.BAD_REQUEST).json({
      message: e.message
    });
  }
}

export async function nodesCartController(req: Request, res: Response) {
  try {
    const ids = req.query.ids as string;
    const nodes = await getNodesForCart(ids.split(","));
    return res.status(status.SUCCESS).json(nodes);
  } catch (e) {
    if (!(e instanceof Error)) return;
    return res.status(status.BAD_REQUEST).json({
      message: e.message
    });
  }
}

export async function nodeController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const node = await getNodeService(id);

    if (node === null) {
      return res.status(status.BAD_REQUEST).json(null);
    }

    return res.status(status.SUCCESS).json(node);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown server error";

    return res.status(status.BAD_REQUEST).json(message);
  }
}

export async function nodeCreateController(req: Request, res: Response) {
  try {
    const node = await createNodeService(req.body as unknown as CreateNodeProps);

    return res.status(status.SUCCESS).json(node);
  } catch (e) {
    if (!(e instanceof ApiError)) return;
    return res.status(status.BAD_REQUEST).json({
      message: e.message
    });
  }
}

export async function nodeUpdateController(req: Request, res: Response) {
  try {
    const node = await updateNodeService(req.body as unknown as UpdateNodeProps);

    return res.status(status.SUCCESS).json(node);
  } catch (e) {
    if (!(e instanceof ApiError)) return;
    return res.status(status.BAD_REQUEST).json({
      message: e.message
    });
  }
}

export async function adminUsersController(req: Request, res: Response) {
  try {
    const nodes = await getAllUsersForAdmin();
    return res.status(status.SUCCESS).json(nodes);
  } catch (e) {
    if (!(e instanceof Error)) return;
    return res.status(status.BAD_REQUEST).json({
      message: e.message
    });
  }
}
