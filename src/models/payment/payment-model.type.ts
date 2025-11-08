import { ObjectId } from "mongoose";
import { UserDBModelType } from "../../models/user/user-model-type";

export type PaymentDBModelType = {
  user: string | ObjectId | UserDBModelType;
  status: PaymentStatusType;
  payment_id: string;
  amount: number;
  payment_url: string;
  currency: string;
  description: string;
};

export type PaymentStatusType =
  | "waiting"
  | "confirming"
  | "confirmed"
  | "sending"
  | "partially_paid"
  | "finished"
  | "failed"
  | "expired";
