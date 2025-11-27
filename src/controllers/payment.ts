import { Response, Request } from "express";
import status from "../utils/status";
import { createPaymentService, ipnPaymentInvoiceService } from "../services/payment/payment";
import { RequestWithAuthUserType } from "../types/request";
import { AuthMessages } from "../constants/response-messages";

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
    await ipnPaymentInvoiceService(req.body);
    res.status(status.SUCCESS);
  } catch (e) {
    console.log(e);
  }
}
