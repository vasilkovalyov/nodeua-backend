import express from "express";
import { paymentNodeController, getActiveNodesController, getExpiredNodesController } from "../controllers/user";

import authMiddleware from "../middlewares/auth";

const router = express.Router();

router.put("/user/buy-node", authMiddleware, paymentNodeController);
router.get("/user/active-nodes", authMiddleware, getActiveNodesController);
router.get("/user/expired-nodes", authMiddleware, getExpiredNodesController);

export default router;
