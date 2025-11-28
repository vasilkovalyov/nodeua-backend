import { Response, Request } from "express";
import status from "../utils/status";
import { createPaymentService, topUpBalanceAfterInvoiceService } from "../services/payment/payment";
import { RequestWithAuthUserType } from "../types/request";
import { AuthMessages } from "../constants/response-messages";
import ApiError from "../services/api-error";
import { verifyNowpaymentsSignature } from "../services/payment/payment.utils";
import { IPNPaymentInvoiceRequestProps } from "../services/payment/payment.type";

export async function createInvoiceController(req: Request, res: Response) {
  try {
    const reqWithAuthUser = req as RequestWithAuthUserType;
    const accessToken = req.headers.authorization;
    const response = await createPaymentService({
      accessToken: accessToken as string,
      userId: reqWithAuthUser.user.userId,
      amount: req.body.amount
    });
    res.status(status.SUCCESS).json(response);
  } catch (e) {
    if (e instanceof Error) {
      res.status(status.BAD_REQUEST).json({
        message: e.message
      });
    }

    res.status(status.BAD_REQUEST).json({
      message: AuthMessages.errorResponse
    });
  }
}

export async function ipnPaymentInvoiceController(req: Request, res: Response) {
  try {
    const result = req.body as IPNPaymentInvoiceRequestProps;
    console.log("ipn-payment", result);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
  }
}

export async function topUpBalanceAfterInvoiceController(req: Request, res: Response) {
  try {
    const signature = req.headers["x-nowpayments-sig"];

    if (!verifyNowpaymentsSignature(signature as string, req.body)) {
      throw ApiError.BadRequestError(AuthMessages.invalidSignature);
    }

    const response = await topUpBalanceAfterInvoiceService(req.body);
    res.status(status.SUCCESS).json(response);
  } catch (e) {
    if (e instanceof Error) {
      res.status(status.BAD_REQUEST).json({
        message: e.message
      });
    }

    res.status(status.BAD_REQUEST).json({
      message: AuthMessages.errorResponse
    });
  }
}
