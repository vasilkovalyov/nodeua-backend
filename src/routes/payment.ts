import express from "express";

import authMiddleware from "../middlewares/auth";
import { createInvoiceController, topUpBalanceAfterInvoiceController } from "../controllers/payment";

const router = express.Router();

router.use(authMiddleware);

router.post("/create-invoice", createInvoiceController);
router.post("/top-up-balance", topUpBalanceAfterInvoiceController);

export default router;
