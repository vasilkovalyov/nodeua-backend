import { ObjectId } from "mongoose";
import { UserDBModelType } from "../../models/user/user-model-type";

export type PaymentDBModelType = {
  user: string | ObjectId | UserDBModelType;
  status: PaymentStatusType;
  payment_id: string;
  price_currency: string;
  pay_currency: string;
  price_amount: number;
  invoice_url: string;
  order_description: string;
  customer_email?: string;
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
