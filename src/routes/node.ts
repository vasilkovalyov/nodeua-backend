import express from "express";
import {
  nodesController,
  nodeController,
  nodesCartController,
  nodeCreateController,
  nodeUpdateController,
  adminNodesController,
  adminNodeController
} from "../controllers/node";
import authMiddleware from "../middlewares/auth";
import isAdminRole from "../middlewares/is-admin-role";

const router = express.Router();

router.post("/create-node", authMiddleware, isAdminRole, nodeCreateController);
router.put("/edit-node", authMiddleware, isAdminRole, nodeUpdateController);

router.get("/nodes/", nodesController);
router.get("/admin-nodes/", authMiddleware, isAdminRole, adminNodesController);
router.get("/admin-node/:id", authMiddleware, isAdminRole, adminNodeController);
router.get("/nodes-cart/", authMiddleware, nodesCartController);
router.get("/node/:id", nodeController);

export default router;
