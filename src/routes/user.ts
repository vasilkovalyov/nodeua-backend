import express from "express";
import {
  topUpBalanceController,
  buyNodeController,
  getActiveNodesController,
  getExpiredNodesController
} from "../controllers/user";

import authMiddleware from "../middlewares/auth";

const router = express.Router();

router.put("/user/top-up-balance", authMiddleware, topUpBalanceController);
router.put("/user/buy-node", authMiddleware, buyNodeController);
router.get("/user/active-nodes", authMiddleware, getActiveNodesController);
router.get("/user/expired-nodes", authMiddleware, getExpiredNodesController);

export default router;
