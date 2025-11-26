import { Router } from "express";
import {
  paymentNodeController,
  getActiveNodesController,
  getExpiredNodesController,
  profileController
} from "../controllers/user";

import authMiddleware from "../middlewares/auth";

const router = Router();

router.use(authMiddleware);

router.get("/profile", profileController);
router.put("/buy-node", paymentNodeController);
router.get("/active-nodes", getActiveNodesController);
router.get("/expired-nodes", getExpiredNodesController);

export default router;
