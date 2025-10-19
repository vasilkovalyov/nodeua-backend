import { Request, Response } from "express";
import status from "../utils/status";
import { topUpUserBalanceService } from "../services/user";

export async function topUpBalanceController(req: Request, res: Response) {
  try {
    const { userId, amount } = req.body;
    const response = await topUpUserBalanceService(userId, amount);
    return res.status(status.SUCCESS).json(response);
  } catch (e) {
    if (!(e instanceof Error)) return;
    return res.status(status.BAD_REQUEST).json({
      error: e.message
    });
  }
}
