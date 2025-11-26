import express from "express";
import {
  adminNodeCreateController,
  adminNodeUpdateController,
  adminNodesController,
  adminUsersController,
  adminNodeController,
  adminBuyedNodesController,
  adminBuyedNodeController
} from "../controllers/admin-node";

import authMiddleware from "../middlewares/auth";
import isAdminRole from "../middlewares/is-admin-role";

const router = express.Router();

router.use(authMiddleware);
router.use(isAdminRole);

router.post("/admin/create-node", adminNodeCreateController);
router.put("/admin/edit-node", adminNodeUpdateController);
router.get("/admin-nodes/", adminNodesController);
router.get("/admin-users/", adminUsersController);
router.get("/admin-node/:id", adminNodeController);
router.get("/admin-buyed-nodes", adminBuyedNodesController);
router.get("/admin-buyed-nodes/:id", adminBuyedNodeController);

export default router;
