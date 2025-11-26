import { Router } from "express";
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

const router = Router();

router.use(authMiddleware);
router.use(isAdminRole);

router.post("/create-node", adminNodeCreateController);
router.put("/edit-node", adminNodeUpdateController);
router.get("/nodes", adminNodesController);
router.get("/users", adminUsersController);
router.get("/node/:id", adminNodeController);
router.get("/buyed-nodes", adminBuyedNodesController);
router.get("/buyed-nodes/:id", adminBuyedNodeController);

export default router;
