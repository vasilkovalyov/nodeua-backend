import express from "express";
import {
  nodesController,
  nodeController,
  nodesCartController,
  nodeCreateController,
  nodeUpdateController
} from "../controllers/nodes";
import authMiddleware from "../middlewares/auth";

const router = express.Router();

router.get("/nodes/", nodesController);
router.get("/nodes-cart/", authMiddleware, nodesCartController);
router.get("/node/:id", nodeController);
router.post("/create-node", authMiddleware, nodeCreateController);
router.put("/update-node", authMiddleware, nodeUpdateController);

export default router;
