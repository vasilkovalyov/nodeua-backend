import { Router } from "express";

import authMiddleware from "../middlewares/auth";
import { createInvoiceController, ipnPaymentInvoiceController } from "../controllers/payment";
import verifyIpnSignatureMiddleware from "../middlewares/verify-nowpayment-signature";

const router = Router();

router.post("/create-invoice", authMiddleware, createInvoiceController);
router.post("/ipn-payment", verifyIpnSignatureMiddleware, ipnPaymentInvoiceController);

export default router;
