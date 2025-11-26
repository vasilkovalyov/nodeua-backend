import { Router } from "express";
import {
  createPostController,
  deletePostController,
  getPostsController,
  updatePostController,
  getPostController
} from "../controllers/post";
import authMiddleware from "../middlewares/auth";
import isAdminRole from "../middlewares/is-admin-role";

const router = Router();

router.post("/post", authMiddleware, isAdminRole, createPostController);
router.put("/post", authMiddleware, isAdminRole, updatePostController);
router.delete("/post/:id", authMiddleware, isAdminRole, deletePostController);

router.get("/posts", getPostsController);
router.get("/post/:id", getPostController);

export default router;
