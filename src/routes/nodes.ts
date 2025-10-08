import express from "express";
import { nodesController, nodeController, nodesCartController } from "../controllers/nodes";
import authMiddleware from "../middlewares/auth";

const router = express.Router();

router.get("/nodes/", nodesController);
router.get("/nodes-cart/", authMiddleware, nodesCartController);
router.get("/node/:id", nodeController);

export default router;
