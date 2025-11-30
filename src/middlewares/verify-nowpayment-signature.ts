import { RequestHandler, Request, Response, NextFunction } from "express";
import crypto from "crypto";

import status from "../utils/status";

const verifyIpnSignatureMiddleware: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const signature = req.headers["x-nowpayments-sig"];

  if (!signature) {
    console.error("IPN: Signature missing");
    return res.status(status.UNAUTHORIZED).send("No signature");
  }

  const generated = crypto
    .createHmac("sha512", process.env.NOWPAYMENTS_IPN_KEY!)
    .update(JSON.stringify(req.body))
    .digest("hex");

  if (generated !== signature) {
    console.error("IPN: Invalid signature");
    return res.status(status.FORBIDDEN).send("Invalid signature");
  }

  return next();
};

export default verifyIpnSignatureMiddleware;
