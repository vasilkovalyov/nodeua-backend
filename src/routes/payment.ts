import { Router } from "express";

import authMiddleware from "../middlewares/auth";
import { createInvoiceController, topUpBalanceAfterInvoiceController } from "../controllers/payment";

const router = Router();

router.post("/create-invoice", authMiddleware, createInvoiceController);
router.post("/top-up-balance", authMiddleware, topUpBalanceAfterInvoiceController);

export default router;
