import { PaymentStatusType } from "../../models/payment/payment-model.type";

export type CreatePaymentProps = {
  userId: string;
  amount: string;
  success_url: string;
  cancel_url: string;
  description?: string;
  accessToken: string;
};

export type InvoiceCreateProps = Pick<
  CreatePaymentProps,
  "description" | "success_url" | "cancel_url" | "accessToken"
> & {
  order_id: string;
  amount: number;
};

export type CreatePaymentResponseApiProps = {
  id: string;
  cancel_url: string;
  collect_user_data: boolean;
  created_at: string;
  customer_email: string | null;
  payment_url: string;
  ipn_callback_url: string;
  is_fee_paid_by_user: boolean;
  is_fixed_rate: boolean;
  order_description: string;
  order_id: string;
  partially_paid_url: string | null;
  pay_currency: string;
  payout_currency: string | null;
  price_amount: string;
  price_currency: string;
  source: string | null;
  success_url: string;
  token_id: string;
  updated_at: string;
};

export type CreatePaymentResponseAfterSendInvoiceProps = {
  payment_status: PaymentStatusType;
  order_id: string;
  actually_paid: string;
  payment_fee: string;
  payin_hash: string;
  pay_address: string;
  token_id: string;
};

export type FetchResult<T> = {
  data?: T;
  error?: string;
};
