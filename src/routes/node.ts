import express from "express";
import { getNodesController, getNodeByIdController, getNodesCartController } from "../controllers/node";
import authMiddleware from "../middlewares/auth";

const router = express.Router();

router.get("/nodes/", getNodesController);
router.get("/nodes-cart/", authMiddleware, getNodesCartController);
router.get("/node/:id", getNodeByIdController);

export default router;
