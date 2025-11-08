import { Response } from "express";
import status from "../utils/status";
import { createPaymentService, topUpBalanceAfterInvoiceService } from "../services/payment/payment";
import { RequestWithAuthUserType } from "../types/token";
import { AuthMessages } from "../constants/response-messages";
import ApiError from "../services/api-error";
import { verifyNowpaymentsSignature } from "../services/payment/payments.utils";

export async function createInvoiceController(req: RequestWithAuthUserType, res: Response) {
  try {
    if (!req.user?.userId) {
      throw ApiError.BadRequestError(AuthMessages.userNotFound);
    }

    const accessToken = req.headers.authorization;
    const response = await createPaymentService({
      ...req.body,
      accessToken: accessToken,
      userId: req.user.userId
    });
    return res.status(status.SUCCESS).json(response);
  } catch (e) {
    if (!(e instanceof Error)) return;
    return res.status(status.BAD_REQUEST).json({
      message: e.message
    });
  }
}

export async function topUpBalanceAfterInvoiceController(req: RequestWithAuthUserType, res: Response) {
  try {
    const signature = req.headers["x-nowpayments-sig"];

    if (!verifyNowpaymentsSignature(signature as string, req.body)) {
      throw ApiError.BadRequestError(AuthMessages.invalidSignature);
    }

    const response = await topUpBalanceAfterInvoiceService(req.body);
    return res.status(status.SUCCESS).json(response);
  } catch (e) {
    if (!(e instanceof Error)) return;
    return res.status(status.BAD_REQUEST).json({
      message: e.message
    });
  }
}
