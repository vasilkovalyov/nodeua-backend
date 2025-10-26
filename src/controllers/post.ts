import { Request, Response } from "express";
import status from "../utils/status";
import {
  createPostService,
  deletePostService,
  getPostsService,
  updatePostService,
  getPostService
} from "../services/post";

export async function createPostController(req: Request, res: Response) {
  try {
    const response = await createPostService(req.body);
    return res.status(status.SUCCESS).json(response);
  } catch (e) {
    if (!(e instanceof Error)) return;
    return res.status(status.BAD_REQUEST).json({
      error: e.message
    });
  }
}

export async function updatePostController(req: Request, res: Response) {
  try {
    const response = await updatePostService(req.body);
    return res.status(status.SUCCESS).json(response);
  } catch (e) {
    if (!(e instanceof Error)) return;
    return res.status(status.BAD_REQUEST).json({
      error: e.message
    });
  }
}

export async function deletePostController(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const response = await deletePostService(id);
    return res.status(status.SUCCESS).json(response);
  } catch (e) {
    if (!(e instanceof Error)) return;
    return res.status(status.BAD_REQUEST).json({
      error: e.message
    });
  }
}

export async function getPostsController(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const response = await getPostsService(id);
    return res.status(status.SUCCESS).json(response);
  } catch (e) {
    if (!(e instanceof Error)) return;
    return res.status(status.BAD_REQUEST).json({
      error: e.message
    });
  }
}

export async function getPostController(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const response = await getPostService(id);
    return res.status(status.SUCCESS).json(response);
  } catch (e) {
    if (!(e instanceof Error)) return;
    return res.status(status.BAD_REQUEST).json({
      error: e.message
    });
  }
}
