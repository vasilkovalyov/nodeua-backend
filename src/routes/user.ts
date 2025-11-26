import express from "express";
import {
  paymentNodeController,
  getActiveNodesController,
  getExpiredNodesController,
  profileController
} from "../controllers/user";

import authMiddleware from "../middlewares/auth";

const router = express.Router();

router.use(authMiddleware);

router.get("/user/profile", profileController);
router.put("/user/buy-node", paymentNodeController);
router.get("/user/active-nodes", getActiveNodesController);
router.get("/user/expired-nodes", getExpiredNodesController);

export default router;
