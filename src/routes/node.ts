import express from "express";
import {
  nodesController,
  nodeController,
  nodesCartController,
  nodeCreateController,
  nodeUpdateController
} from "../controllers/node";
import authMiddleware from "../middlewares/auth";
import isAdminRole from "../middlewares/is-admin-role";

const router = express.Router();

router.post("/create-node", authMiddleware, isAdminRole, nodeCreateController);
router.put("/update-node", authMiddleware, isAdminRole, nodeUpdateController);

router.get("/nodes/", nodesController);
router.get("/nodes-cart/", authMiddleware, nodesCartController);
router.get("/node/:id", nodeController);

export default router;
