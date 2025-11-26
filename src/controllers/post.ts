import { Request, Response } from "express";
import status from "../utils/status";
import {
  createPostService,
  deletePostService,
  getPostsService,
  updatePostService,
  getPostService
} from "../services/post";
import { AuthMessages } from "../constants/response-messages";

export async function createPostController(req: Request, res: Response) {
  try {
    const response = await createPostService(req.body);
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
}

export async function updatePostController(req: Request, res: Response) {
  try {
    const response = await updatePostService(req.body);
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
}

export async function deletePostController(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const response = await deletePostService(id);
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
}

export async function getPostsController(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const response = await getPostsService(id);
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
}

export async function getPostController(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const response = await getPostService(id);
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
}
