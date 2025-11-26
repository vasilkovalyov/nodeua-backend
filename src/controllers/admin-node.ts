import { Request, Response } from "express";

import {
  createNodeService,
  updateNodeService,
  getAllNodesForAdminService,
  getNodeForAdminService,
  getBuyedNodesForAdminService,
  getBuyedNodeForAdminService
} from "../services/admin-node/admin-node-service";
import status from "../utils/status";

import { CreateNodeProps, UpdateNodeProps } from "../models/node/node-model-type";
import { getAllUsersForAdmin } from "../services/user/user-service";
import { AuthMessages } from "../constants/response-messages";

export async function adminNodesController(req: Request, res: Response) {
  try {
    const nodes = await getAllNodesForAdminService();
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

export async function adminNodeController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const nodes = await getNodeForAdminService(id);
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

export async function adminNodeCreateController(req: Request, res: Response) {
  try {
    const node = await createNodeService(req.body as unknown as CreateNodeProps);

    res.status(status.SUCCESS).json(node);
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

export async function adminNodeUpdateController(req: Request, res: Response) {
  try {
    const node = await updateNodeService(req.body as unknown as UpdateNodeProps);

    res.status(status.SUCCESS).json(node);
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

export async function adminUsersController(req: Request, res: Response) {
  try {
    const nodes = await getAllUsersForAdmin();
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

export async function adminBuyedNodesController(req: Request, res: Response) {
  try {
    const nodes = await getBuyedNodesForAdminService();
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

export async function adminBuyedNodeController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const nodes = await getBuyedNodeForAdminService(id);
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
