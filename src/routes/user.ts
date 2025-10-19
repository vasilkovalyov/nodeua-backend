import express from "express";
import { topUpBalanceController } from "../controllers/user";

import authMiddleware from "../middlewares/auth";

const router = express.Router();

router.put("/user/top-up-balance", authMiddleware, topUpBalanceController);

export default router;
